import type { MetadataRoute } from "next"

import { getActualites } from "@/lib/cms"
import { urlAbsolue } from "@/lib/site"

/**
 * Plan du site.
 *
 * Exclusion volontaire : les actualités marquées `exemple`, qui sont des
 * démonstrations de mise en page. Les référencer reviendrait à faire indexer
 * par Google un contenu qui dit lui-même qu'il n'est pas réel.
 *
 * Les quatre services n'ont plus de route dédiée (§ page unique « Nos
 * services », voir app/nos-services/page.tsx) : `/nos-services` seul suffit,
 * les ancres `#slug` ne sont pas des URL indexables séparément.
 *
 * `lastModified` est fixé à la date de dernière révision du contenu et non à
 * `new Date()` : un sitemap qui prétend que toutes les pages ont changé à chaque
 * build perd toute valeur d'indication pour un moteur.
 */

/** Dernière révision du contenu éditorial. À mettre à jour avec les contenus. */
const REVISION = "2026-07-26"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const actualites = await getActualites()
  const pages: MetadataRoute.Sitemap = [
    { url: urlAbsolue("/"), priority: 1, changeFrequency: "monthly" },
    { url: urlAbsolue("/l-association"), priority: 0.8, changeFrequency: "yearly" },
    { url: urlAbsolue("/nos-services"), priority: 0.9, changeFrequency: "monthly" },
    { url: urlAbsolue("/nos-actions"), priority: 0.6, changeFrequency: "monthly" },
    { url: urlAbsolue("/actualites"), priority: 0.7, changeFrequency: "weekly" },
    { url: urlAbsolue("/tarifs"), priority: 0.8, changeFrequency: "monthly" },
    {
      url: urlAbsolue("/prendre-rendez-vous"),
      priority: 0.9,
      changeFrequency: "yearly",
    },
    { url: urlAbsolue("/faq"), priority: 0.8, changeFrequency: "monthly" },
    { url: urlAbsolue("/contact"), priority: 0.9, changeFrequency: "yearly" },
    {
      url: urlAbsolue("/mentions-legales"),
      priority: 0.2,
      changeFrequency: "yearly",
    },
    {
      url: urlAbsolue("/politique-de-confidentialite"),
      priority: 0.3,
      changeFrequency: "yearly",
    },
  ]

  const pagesActualites: MetadataRoute.Sitemap = actualites
    .filter((actu) => !(actu as { exemple?: true }).exemple)
    .map((actu) => ({
      url: urlAbsolue(`/actualites/${actu.slug}`),
      lastModified: actu.date,
      priority: 0.5,
      changeFrequency: "yearly",
    }))

  return [...pages, ...pagesActualites].map((entree) => ({
    lastModified: REVISION,
    ...entree,
  }))
}
