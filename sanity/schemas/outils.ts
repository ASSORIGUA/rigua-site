import { defineField } from "sanity"

/**
 * Petits constructeurs partagés par les schémas de pages.
 *
 * Tous les libellés sont écrits pour le client, sans jargon : « Surtitre »
 * plutôt que « eyebrow », « Texte d'introduction » plutôt que « lead ».
 */

type Groupe = { group?: string }

/** Champ texte court (une ligne). */
export function texteCourt(
  name: string,
  title: string,
  description?: string,
  options: Groupe = {},
) {
  return defineField({ name, title, type: "string", description, ...options })
}

/** Champ texte long (plusieurs lignes). */
export function texteLong(
  name: string,
  title: string,
  description?: string,
  options: Groupe & { rows?: number } = {},
) {
  const { rows = 3, ...reste } = options
  return defineField({ name, title, type: "text", rows, description, ...reste })
}

/**
 * Les trois champs d'un en-tête de section : surtitre, titre, introduction.
 * `prefixe` distingue les sections d'une même page (ex. « servicesTitre »).
 */
export function enTeteDeSection(
  prefixe: string,
  nomSection: string,
  group?: string,
) {
  return [
    texteCourt(
      `${prefixe}Eyebrow`,
      `${nomSection} : surtitre`,
      "La petite ligne affichée au-dessus du titre de la section.",
      { group },
    ),
    texteCourt(
      `${prefixe}Titre`,
      `${nomSection} : titre`,
      "Le titre de la section.",
      { group },
    ),
    texteLong(
      `${prefixe}Lead`,
      `${nomSection} : introduction`,
      "La ou les phrases affichées sous le titre de la section.",
      { group },
    ),
  ]
}

/** Une liste de blocs « titre + texte » (valeurs, besoins, étapes...). */
export function listeTitreTexte(
  name: string,
  title: string,
  description?: string,
  options: Groupe & { avecRole?: boolean } = {},
) {
  const { avecRole, ...reste } = options
  return defineField({
    name,
    title,
    type: "array",
    description,
    of: [
      {
        type: "object",
        fields: [
          { name: "titre", title: "Titre", type: "string" },
          { name: "texte", title: "Texte", type: "text", rows: 3 },
          ...(avecRole
            ? [
                {
                  name: "votreRole",
                  title: "Votre rôle (ce que la famille fait à cette étape)",
                  type: "text" as const,
                  rows: 2,
                },
              ]
            : []),
        ],
        preview: { select: { title: "titre", subtitle: "texte" } },
      },
    ],
    ...reste,
  })
}

/** Une liste de textes simples (un paragraphe par entrée). */
export function listeDeTextes(
  name: string,
  title: string,
  description?: string,
  options: Groupe = {},
) {
  return defineField({
    name,
    title,
    type: "array",
    description,
    of: [{ type: "text", rows: 3 }],
    ...options,
  })
}
