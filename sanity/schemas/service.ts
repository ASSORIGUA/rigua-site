import { defineField, defineType } from "sanity"

/**
 * Un des quatre services de l'association.
 *
 * Les quatre documents sont créés par l'import initial, un par service du
 * site, reliés par leur identifiant (`slugService`). Ne pas en créer de
 * nouveaux : un service supplémentaire demande une évolution du site.
 * Chaque champ laissé vide reprend le texte d'origine du site.
 */
export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups: [
    { name: "presentation", title: "Présentation", default: true },
    { name: "besoins", title: "Besoins" },
    { name: "deroule", title: "Déroulé" },
    { name: "pratique", title: "Infos pratiques" },
  ],
  fields: [
    defineField({
      name: "slugService",
      title: "Identifiant technique",
      type: "string",
      description: "Relie cette fiche au service du site. Ne pas modifier.",
      readOnly: true,
      group: "presentation",
    }),
    defineField({
      name: "ordre",
      title: "Ordre d'affichage",
      type: "number",
      group: "presentation",
    }),
    defineField({
      name: "titre",
      title: "Nom du service",
      type: "string",
      group: "presentation",
    }),
    defineField({
      name: "titreCourt",
      title: "Nom court",
      type: "string",
      description: "Utilisé dans les onglets et les raccourcis.",
      group: "presentation",
    }),
    defineField({
      name: "phraseFamille",
      title: "La phrase d'une famille",
      type: "string",
      description: "La phrase qu'une famille prononce au téléphone, affichée avant le nom du service.",
      group: "presentation",
    }),
    defineField({
      name: "resume",
      title: "Court résumé",
      type: "text",
      rows: 2,
      description: "Une à deux phrases, utilisées sur la page d'accueil.",
      group: "presentation",
    }),
    defineField({
      name: "chapo",
      title: "Paragraphe d'ouverture",
      type: "text",
      rows: 4,
      group: "presentation",
    }),
    defineField({
      name: "besoins",
      title: "Les besoins auxquels le service répond",
      type: "array",
      group: "besoins",
      of: [
        {
          type: "object",
          fields: [
            { name: "titre", title: "Titre", type: "string" },
            { name: "texte", title: "Texte", type: "text", rows: 3 },
          ],
          preview: { select: { title: "titre" } },
        },
      ],
    }),
    defineField({
      name: "deroule",
      title: "Comment cela se passe",
      type: "array",
      group: "deroule",
      of: [
        {
          type: "object",
          fields: [
            { name: "titre", title: "Titre de l'étape", type: "string" },
            { name: "texte", title: "Texte", type: "text", rows: 3 },
          ],
          preview: { select: { title: "titre" } },
        },
      ],
    }),
    defineField({
      name: "pourQui",
      title: "À qui il s'adresse",
      type: "array",
      description: "Une ligne par situation.",
      group: "pratique",
      of: [{ type: "text", rows: 2 }],
    }),
    defineField({
      name: "prestations",
      title: "Prestations couvertes",
      type: "array",
      description: "Seul le service à domicile en a. Laisser vide pour les autres.",
      group: "pratique",
      of: [
        {
          type: "object",
          fields: [
            { name: "titre", title: "Titre du groupe", type: "string" },
            {
              name: "items",
              title: "Prestations",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
          preview: { select: { title: "titre" } },
        },
      ],
    }),
    defineField({
      name: "horaires",
      title: "Horaires",
      type: "string",
      group: "pratique",
    }),
    defineField({
      name: "capacite",
      title: "Capacité d'accueil",
      type: "string",
      description: "N'indiquer que des chiffres confirmés.",
      group: "pratique",
    }),
    defineField({
      name: "tarification",
      title: "Mode de tarification",
      type: "text",
      rows: 2,
      description: "Jamais un montant : seulement la façon dont le service se facture.",
      group: "pratique",
    }),
    defineField({
      name: "avertissement",
      title: "Avertissement",
      type: "text",
      rows: 3,
      description: "Encadré d'avertissement (utilisé par l'hébergement d'urgence).",
      group: "pratique",
    }),
  ],
  orderings: [
    { title: "Ordre d'affichage", name: "ordreAsc", by: [{ field: "ordre", direction: "asc" }] },
  ],
  preview: { select: { title: "titre", subtitle: "phraseFamille" } },
})
