import { defineField, defineType } from "sanity"

import { texteCourt, texteLong } from "./outils"

/** Page « Questions fréquentes » : les groupes de questions et leurs réponses. */
export const pageFaq = defineType({
  name: "pageFaq",
  title: "Page Questions fréquentes",
  type: "document",
  groups: [
    { name: "hero", title: "Haut de page", default: true },
    { name: "questions", title: "Questions" },
    { name: "fin", title: "Bloc de fin" },
  ],
  fields: [
    texteCourt("heroEyebrow", "Surtitre", undefined, { group: "hero" }),
    texteCourt("heroTitre", "Titre de la page", undefined, { group: "hero" }),
    texteLong("heroLead", "Texte d'introduction", undefined, { group: "hero" }),

    defineField({
      name: "groupes",
      title: "Les groupes de questions",
      type: "array",
      group: "questions",
      description:
        "Chaque groupe a un titre (« Ce que nous proposons »...) et ses questions. Une réponse = un ou plusieurs paragraphes.",
      of: [
        {
          type: "object",
          fields: [
            { name: "titre", title: "Titre du groupe", type: "string" },
            {
              name: "questions",
              title: "Questions",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "question", title: "Question", type: "string" },
                    {
                      name: "reponse",
                      title: "Réponse (un bloc par paragraphe)",
                      type: "array",
                      of: [{ type: "text", rows: 3 }],
                    },
                  ],
                  preview: { select: { title: "question" } },
                },
              ],
            },
          ],
          preview: { select: { title: "titre" } },
        },
      ],
    }),

    texteCourt("finEyebrow", "Surtitre du bloc de fin", undefined, { group: "fin" }),
    texteCourt("finTitre", "Titre du bloc de fin", undefined, { group: "fin" }),
    texteLong("finTexte", "Texte du bloc de fin", undefined, { group: "fin" }),
  ],
  preview: { prepare: () => ({ title: "Page Questions fréquentes" }) },
})
