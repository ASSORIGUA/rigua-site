import { defineField, defineType } from "sanity"

/**
 * Une actualité du site : la rubrique est gérée à 100 % depuis le Studio.
 *
 * Dès qu'au moins une actualité est publiée ici, le site affiche la liste
 * Sanity et ignore les exemples de mise en page intégrés au code.
 */
export const actualite = defineType({
  name: "actualite",
  title: "Actualité",
  type: "document",
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      description: "Le titre de l'actualité, affiché dans la liste et en haut de l'article.",
      validation: (regle) => regle.required().error("Le titre est obligatoire."),
    }),
    defineField({
      name: "slug",
      title: "Identifiant d'URL",
      type: "slug",
      description:
        "L'adresse de la page (exemple : sortie-champetre). Cliquez sur « Generate » pour le créer automatiquement à partir du titre.",
      options: { source: "titre", maxLength: 96 },
      validation: (regle) => regle.required().error("Cliquez sur « Generate » pour créer l'identifiant."),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description: "La date de l'événement ou de la publication. Sert au tri de la liste.",
      options: { dateFormat: "DD/MM/YYYY" },
      validation: (regle) => regle.required().error("La date est obligatoire."),
    }),
    defineField({
      name: "categorie",
      title: "Catégorie",
      type: "string",
      description: "Sert au filtre de la page Actualités.",
      options: {
        list: [
          { title: "Atelier", value: "Atelier" },
          { title: "Sortie", value: "Sortie" },
          { title: "Rencontre", value: "Rencontre" },
          { title: "Projet", value: "Projet" },
          { title: "Vie de l'association", value: "Vie de l'association" },
        ],
        layout: "radio",
      },
      validation: (regle) => regle.required().error("Choisissez une catégorie."),
    }),
    defineField({
      name: "resume",
      title: "Court résumé",
      type: "text",
      rows: 3,
      description: "Une à deux phrases, affichées dans la liste des actualités.",
      validation: (regle) => regle.required().error("Le résumé est obligatoire."),
    }),
    defineField({
      name: "paragraphes",
      title: "Texte de l'article",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      description: "Le corps de l'article : ajoutez un bloc par paragraphe.",
      validation: (regle) => regle.min(1).error("Écrivez au moins un paragraphe."),
    }),
    defineField({
      name: "photo",
      title: "Photo principale",
      type: "image",
      description:
        "Affichée dans la liste et dans l'article. N'ajoutez une photo de personnes reconnaissables qu'avec leur autorisation écrite.",
      options: { hotspot: true },
    }),
    defineField({
      name: "photoAlt",
      title: "Description de la photo principale",
      type: "string",
      description:
        "Décrit la scène pour les personnes malvoyantes et les moteurs de recherche. Obligatoire dès qu'une photo est ajoutée.",
      hidden: ({ document }) => !document?.photo,
    }),
    defineField({
      name: "photoSecondaire",
      title: "Seconde photo (facultative)",
      type: "image",
      description: "Affichée dans le corps de l'article seulement, jamais dans la liste.",
      options: { hotspot: true },
    }),
    defineField({
      name: "photoSecondaireAlt",
      title: "Description de la seconde photo",
      type: "string",
      hidden: ({ document }) => !document?.photoSecondaire,
    }),
  ],
  orderings: [
    {
      title: "Date (plus récente d'abord)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "titre", subtitle: "date", media: "photo" },
  },
})
