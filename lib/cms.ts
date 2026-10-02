import { cache } from "react"

import { imageSanity, safeFetch } from "@/lib/sanity/client"
import {
  actualites as actualitesDefaut,
  actualitesAffichables as actualitesAffichablesDefaut,
  type Actualite,
} from "@/lib/content/actions"
import { temoignages as temoignagesDefaut } from "@/lib/content/temoignages"
import { faq as faqDefaut, type GroupeFaq, type Question } from "@/lib/content/faq"
import { services as servicesDefaut, type Service } from "@/lib/content/services"

/**
 * Couche d'accès au contenu : Sanity sinon défaut.
 *
 * Chaque fonction renvoie le contenu publié dans Sanity quand il existe, et
 * replie champ par champ sur le contenu en dur de `lib/content/*` sinon.
 * Le site ne se vide jamais : un champ laissé vide dans le Studio affiche
 * la valeur d'origine.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export type DocCms = Record<string, any> | null

/** Le document unique d'un type donné (singleton de page). */
export const getPage = cache(async (type: string): Promise<DocCms> => {
  return safeFetch<Record<string, any>>(`*[_type == $type][0]`, { type })
})

/** La valeur du champ si elle est renseignée, sinon la valeur par défaut. */
export function t(doc: DocCms, champ: string, defaut: string): string {
  const valeur = doc?.[champ]
  return typeof valeur === "string" && valeur.trim() !== "" ? valeur.trim() : defaut
}

/**
 * Fusionne une liste éditée dans le Studio avec la liste par défaut du code.
 * Les champs non textuels (icône, lien, image...) sont repris de l'entrée
 * par défaut de même position : le client édite les textes, le site garde
 * la mise en forme.
 */
export function fusionListe<T extends Record<string, any>>(
  editee: Record<string, any>[] | undefined | null,
  defauts: readonly T[],
): T[] {
  if (!Array.isArray(editee) || editee.length === 0) return [...defauts]
  return editee.map((item, i) => {
    const base = defauts[Math.min(i, defauts.length - 1)]
    const propre: Record<string, any> = {}
    for (const [cle, valeur] of Object.entries(item)) {
      if (typeof valeur === "string" && valeur.trim() !== "") propre[cle] = valeur.trim()
      if (Array.isArray(valeur) && valeur.length > 0) propre[cle] = valeur
    }
    return { ...base, ...propre } as T
  })
}

/* --------------------------------------------------------------------------
   ACTUALITÉS : gérées à 100 % dans Sanity dès la première publication.
   -------------------------------------------------------------------------- */

type ActualiteSanity = {
  titre?: string
  slug?: { current?: string }
  date?: string
  categorie?: Actualite["categorie"]
  resume?: string
  paragraphes?: string[]
  photo?: unknown
  photoAlt?: string
  photoSecondaire?: unknown
  photoSecondaireAlt?: string
}

function versActualite(a: ActualiteSanity): Actualite | null {
  if (!a.titre || !a.slug?.current || !a.date) return null
  const photoSrc = imageSanity(a.photo as never, 1600)
  const photoSecondaireSrc = imageSanity(a.photoSecondaire as never, 1600)
  return {
    slug: a.slug.current,
    titre: a.titre,
    date: a.date,
    categorie: a.categorie ?? "Vie de l'association",
    resume: a.resume ?? "",
    paragraphes: Array.isArray(a.paragraphes) ? a.paragraphes.filter(Boolean) : [],
    ...(photoSrc
      ? { photo: a.photoAlt ?? a.titre, photoSrc, photoAlt: a.photoAlt ?? a.titre }
      : {}),
    ...(photoSecondaireSrc
      ? { photoSecondaireSrc, photoSecondaireAlt: a.photoSecondaireAlt ?? a.titre }
      : {}),
  }
}

const REQUETE_ACTUALITES = `*[_type == "actualite" && defined(slug.current)] | order(date desc) {
  titre, slug, date, categorie, resume, paragraphes,
  photo, photoAlt, photoSecondaire, photoSecondaireAlt
}`

/**
 * Les actualités à afficher : celles de Sanity dès qu'il y en a au moins
 * une, sinon la liste du code (avec sa logique d'exemples de mise en page).
 */
export const getActualites = cache(async (): Promise<Actualite[]> => {
  const docs = await safeFetch<ActualiteSanity[]>(REQUETE_ACTUALITES)
  if (docs && docs.length > 0) {
    const propres = docs
      .map(versActualite)
      .filter((a): a is Actualite => a !== null)
    if (propres.length > 0) return propres
  }
  return actualitesAffichablesDefaut
})

/** Une actualité par identifiant d'URL, dans Sanity puis dans le code. */
export async function getActualite(slug: string): Promise<Actualite | undefined> {
  const liste = await getActualites()
  const trouvee = liste.find((a) => a.slug === slug)
  if (trouvee) return trouvee
  return actualitesDefaut.find((a) => a.slug === slug)
}

/** Vrai si la liste affichée ne contient que des exemples de mise en page. */
export async function getActualitesEnModeExemple(): Promise<boolean> {
  const liste = await getActualites()
  return liste.every((a) => (a as { exemple?: true }).exemple === true)
}

/* --------------------------------------------------------------------------
   TÉMOIGNAGES
   -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
   SERVICES : quatre documents `service`, fusionnés sur ceux du code par
   leur identifiant. Les icônes et photos restent gérées par le code.
   -------------------------------------------------------------------------- */

type ServiceSanity = {
  slugService?: string
  titre?: string
  titreCourt?: string
  phraseFamille?: string
  resume?: string
  chapo?: string
  besoins?: { titre?: string; texte?: string }[]
  deroule?: { titre?: string; texte?: string }[]
  pourQui?: string[]
  prestations?: { titre?: string; items?: string[] }[]
  horaires?: string
  capacite?: string
  tarification?: string
  avertissement?: string
}

const REQUETE_SERVICES = `*[_type == "service"] | order(ordre asc) {
  slugService, titre, titreCourt, phraseFamille, resume, chapo,
  besoins, deroule, pourQui, prestations, horaires, capacite,
  tarification, avertissement
}`

function champ(valeur: string | undefined, defaut: string): string {
  return valeur && valeur.trim() !== "" ? valeur.trim() : defaut
}

export const getServices = cache(async (): Promise<Service[]> => {
  const docs = await safeFetch<ServiceSanity[]>(REQUETE_SERVICES)
  if (!docs || docs.length === 0) return servicesDefaut
  return servicesDefaut.map((defaut) => {
    const edite = docs.find((d) => d.slugService === defaut.slug)
    if (!edite) return defaut
    const besoins =
      Array.isArray(edite.besoins) && edite.besoins.length > 0
        ? edite.besoins.map((b, i) => {
            const base = defaut.besoins[Math.min(i, defaut.besoins.length - 1)]
            return {
              titre: champ(b.titre, base.titre),
              texte: champ(b.texte, base.texte),
              icone: base.icone,
            }
          })
        : defaut.besoins
    const deroule =
      Array.isArray(edite.deroule) && edite.deroule.length > 0
        ? edite.deroule.map((e, i) => {
            const base = defaut.deroule[Math.min(i, defaut.deroule.length - 1)]
            return {
              titre: champ(e.titre, base.titre),
              texte: champ(e.texte, base.texte),
              icone: base.icone,
            }
          })
        : defaut.deroule
    const prestations =
      Array.isArray(edite.prestations) && edite.prestations.length > 0
        ? edite.prestations.map((g, i) => {
            const base = defaut.prestations?.[
              Math.min(i, (defaut.prestations?.length ?? 1) - 1)
            ]
            return {
              titre: champ(g.titre, base?.titre ?? ""),
              icone: base?.icone ?? ("document" as const),
              items:
                Array.isArray(g.items) && g.items.length > 0
                  ? g.items.filter((item) => item?.trim())
                  : (base?.items ?? []),
            }
          })
        : defaut.prestations
    return {
      ...defaut,
      titre: champ(edite.titre, defaut.titre),
      titreCourt: champ(edite.titreCourt, defaut.titreCourt),
      phraseFamille: champ(edite.phraseFamille, defaut.phraseFamille),
      resume: champ(edite.resume, defaut.resume),
      chapo: champ(edite.chapo, defaut.chapo),
      besoins,
      deroule,
      pourQui:
        Array.isArray(edite.pourQui) && edite.pourQui.length > 0
          ? edite.pourQui.filter((l) => l?.trim())
          : defaut.pourQui,
      ...(prestations ? { prestations } : {}),
      ...(champ(edite.horaires, defaut.horaires ?? "")
        ? { horaires: champ(edite.horaires, defaut.horaires ?? "") }
        : {}),
      ...(champ(edite.capacite, defaut.capacite ?? "")
        ? { capacite: champ(edite.capacite, defaut.capacite ?? "") }
        : {}),
      tarification: champ(edite.tarification, defaut.tarification),
      ...(champ(edite.avertissement, defaut.avertissement ?? "")
        ? { avertissement: champ(edite.avertissement, defaut.avertissement ?? "") }
        : {}),
    }
  })
})

/* --------------------------------------------------------------------------
   FAQ : groupes et questions édités dans le singleton `pageFaq`.
   Les liens « voir la page » restent gérés par le code : ils sont reportés
   depuis le groupe/la question par défaut de même position.
   -------------------------------------------------------------------------- */

type QuestionSanity = { question?: string; reponse?: string[] }
type GroupeFaqSanity = { titre?: string; questions?: QuestionSanity[] }

export const getFaq = cache(async (): Promise<GroupeFaq[]> => {
  const doc = await getPage("pageFaq")
  const groupes = doc?.groupes as GroupeFaqSanity[] | undefined
  if (!Array.isArray(groupes) || groupes.length === 0) return faqDefaut
  const fusionnes = groupes
    .map((groupe, i): GroupeFaq | null => {
      const base = faqDefaut[Math.min(i, faqDefaut.length - 1)]
      const questions = (groupe.questions ?? [])
        .map((q, j): Question | null => {
          if (!q.question?.trim()) return null
          const questionBase = base.questions[j]
          const reponse = (q.reponse ?? []).filter(
            (p) => typeof p === "string" && p.trim() !== "",
          )
          if (reponse.length === 0) return null
          return {
            question: q.question.trim(),
            reponse,
            ...(questionBase?.lien ? { lien: questionBase.lien } : {}),
          }
        })
        .filter((q): q is Question => q !== null)
      if (!groupe.titre?.trim() || questions.length === 0) return null
      return { id: base.id, titre: groupe.titre.trim(), questions }
    })
    .filter((g): g is GroupeFaq => g !== null)
  return fusionnes.length > 0 ? fusionnes : faqDefaut
})

type Temoignage = (typeof temoignagesDefaut)[number]

const REQUETE_TEMOIGNAGES = `*[_type == "temoignage"] | order(ordre asc) {
  citation, prenom, ville, lien, note
}`

export const getTemoignages = cache(async (): Promise<Temoignage[]> => {
  const docs = await safeFetch<Partial<Temoignage>[]>(REQUETE_TEMOIGNAGES)
  if (docs && docs.length > 0) {
    const propres = docs
      .filter((d) => d.citation && d.prenom)
      .map((d) => ({
        citation: d.citation!,
        prenom: d.prenom!,
        ville: d.ville ?? "",
        lien: d.lien ?? "",
        note: typeof d.note === "number" ? d.note : 5,
      }))
    if (propres.length > 0) return propres
  }
  return [...temoignagesDefaut]
})
