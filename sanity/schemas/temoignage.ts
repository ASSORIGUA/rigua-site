import { defineField, defineType } from "sanity"

/**
 * Un témoignage de famille accompagnée.
 *
 * Règle non négociable du projet : ne publier que des témoignages réels,
 * recueillis avec l'accord écrit de leur auteur. Tant qu'aucun témoignage
 * n'existe ici, le site affiche les brouillons du code (à valider).
 */
export const temoignage = defineType({
  name: "temoignage",
  title: "Témoignage",
  type: "document",
  fields: [
    defineField({
      name: "citation",
      title: "Témoignage",
      type: "text",
      rows: 4,
      description: "La citation, telle que la personne l'a formulée.",
      validation: (regle) => regle.required().error("Le texte du témoignage est obligatoire."),
    }),
    defineField({
      name: "prenom",
      title: "Prénom et initiale",
      type: "string",
      description: "Exemple : « Sylvie B. ». Jamais le nom complet.",
      validation: (regle) => regle.required().error("Indiquez au moins un prénom."),
    }),
    defineField({
      name: "ville",
      title: "Ville",
      type: "string",
    }),
    defineField({
      name: "lien",
      title: "Lien avec la personne accompagnée",
      type: "string",
      description: "Exemple : « Fille d'une personne accompagnée », « Aidante familiale ».",
    }),
    defineField({
      name: "note",
      title: "Note sur 5",
      type: "number",
      initialValue: 5,
      validation: (regle) => regle.min(1).max(5),
    }),
    defineField({
      name: "ordre",
      title: "Ordre d'affichage",
      type: "number",
      description: "Le plus petit numéro s'affiche en premier.",
      initialValue: 1,
    }),
  ],
  orderings: [
    { title: "Ordre d'affichage", name: "ordreAsc", by: [{ field: "ordre", direction: "asc" }] },
  ],
  preview: {
    select: { title: "prenom", subtitle: "citation" },
  },
})
