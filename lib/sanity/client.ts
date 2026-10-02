import { createClient, type SanityClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0]

/**
 * Client Sanity : lecture seule, côté serveur.
 *
 * Tout est piloté par variables d'environnement : tant que
 * NEXT_PUBLIC_SANITY_PROJECT_ID n'est pas renseigné, le site fonctionne
 * exactement comme avant, sur le contenu en dur de `lib/content/*`.
 * C'est le principe « Sanity sinon défaut » : le site ne se vide JAMAIS,
 * même si Sanity est vide, mal configuré ou hors ligne.
 *
 * `useCdn: false` : site vitrine à faible trafic, le client veut voir ses
 * modifications tout de suite après « Publish ». Le cache se fait côté
 * Next (revalidate) plutôt que côté CDN Sanity.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"
export const apiVersion = "2025-01-01"

export const sanityActif = Boolean(projectId)

const client: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "published",
    })
  : null

/** Fréquence de rafraîchissement du contenu publié, en secondes. */
const REVALIDATE = 60

/**
 * Requête GROQ tolérante : renvoie `null` si Sanity n'est pas configuré ou
 * si la requête échoue. L'appelant replie alors sur le contenu par défaut.
 */
export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!client) return null
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: REVALIDATE },
    })
  } catch (erreur) {
    console.error("[sanity] requête échouée :", erreur)
    return null
  }
}

const builder = projectId ? imageUrlBuilder({ projectId, dataset }) : null

/** URL d'une image Sanity, ou `null` si la source est absente. */
export function imageSanity(
  source: SanityImageSource | null | undefined,
  largeur?: number,
): string | null {
  if (!builder || !source) return null
  let image = builder.image(source).auto("format")
  if (largeur) image = image.width(largeur)
  return image.url()
}
