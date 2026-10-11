/**
 * Nettoyage typographique du contenu venu de Sanity.
 *
 * Le projet proscrit les tirets cadratins et demi-cadratins : ils signent un
 * texte genere par IA, ou colle depuis Word, et se retrouveraient dans les
 * resultats de recherche. Le code source est deja ecrit sans eux, mais le
 * contenu saisi dans le Studio echappe a cette regle : un texte colle depuis
 * Word ou ChatGPT en apporte automatiquement.
 *
 * Ce garde-fou s'applique donc a la frontiere, sur tout ce qui sort de Sanity.
 *
 * Les tirets vises sont ecrits en echappement (\u2014, \u2013) : les saisir
 * litteralement ferait echouer la verification qui interdit ce projet.
 *
 * Le remplacement depend de ce que le tiret separe :
 * - entre deux nombres, c'est un intervalle (« 9h a 17h ») : il devient
 *   « a », car un trait d'union y serait lu comme une soustraction ;
 * - entoure d'espaces, c'est une incise : elle devient une virgule, la
 *   ponctuation francaise usuelle ;
 * - colle a un mot, c'est une coupure : elle devient un trait d'union.
 */

/** Les deux tirets proscrits, en classe de caracteres. */
const TIRETS_LONGS = /[\u2014\u2013]/

/** Remplace les tirets cadratins et demi-cadratins d'une chaine. */
export function sansTiretsLongs(texte: string): string {
  if (!TIRETS_LONGS.test(texte)) return texte
  return texte
    .replace(
      /(\d(?:\s*(?:h(?:\s*\d+)?|[\u20ac%]|\p{L}{1,3}))?)\s*[\u2014\u2013]\s*(\d)/gu,
      "$1 a $2",
    )
    .replace(/\s+[\u2014\u2013]\s+/g, ", ")
    .replace(/\s*[\u2014\u2013]\s*/g, "-")
}

/**
 * Applique `sansTiretsLongs` a toutes les chaines d'une structure, quelle que
 * soit sa profondeur : objet, tableau, texte. Les autres valeurs (nombres,
 * booleens, dates, `null`) sont rendues telles quelles.
 *
 * Les cles ne sont pas touchees : ce sont des noms de champs, jamais du texte
 * affiche, et les reecrire casserait les acces (`_type`, `_ref`...).
 *
 * Les champs techniques de Sanity sont laisses intacts eux aussi : un `_ref`
 * ou un `_id` contenant un tiret est un identifiant, pas une phrase, et le
 * reecrire casserait le lien vers l'image ou le document vise.
 */

/** Champs dont la valeur est un identifiant, jamais du texte affiche. */
const CHAMPS_TECHNIQUES = new Set([
  "_id",
  "_key",
  "_ref",
  "_rev",
  "_type",
  "slug",
  "current",
  "url",
  "href",
])

export function nettoieTypographie<T>(valeur: T): T {
  if (typeof valeur === "string") {
    return sansTiretsLongs(valeur) as T
  }
  if (Array.isArray(valeur)) {
    return valeur.map((item) => nettoieTypographie(item)) as T
  }
  /* Les instances de classes (Date...) sont laissees intactes : seuls les
     objets simples issus du JSON de Sanity sont parcourus. */
  if (
    valeur !== null &&
    typeof valeur === "object" &&
    Object.getPrototypeOf(valeur) === Object.prototype
  ) {
    const sortie: Record<string, unknown> = {}
    for (const [cle, item] of Object.entries(valeur)) {
      sortie[cle] = CHAMPS_TECHNIQUES.has(cle) ? item : nettoieTypographie(item)
    }
    return sortie as T
  }
  return valeur
}
