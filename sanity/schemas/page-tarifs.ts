import { defineField, defineType } from "sanity"

import { enTeteDeSection, texteCourt, texteLong } from "./outils"

/** Page « Tarifs ». La règle du site reste : aucun montant non confirmé. */
export const pageTarifs = defineType({
  name: "pageTarifs",
  title: "Page Tarifs",
  type: "document",
  groups: [
    { name: "hero", title: "Haut de page", default: true },
    { name: "services", title: "Par service" },
    { name: "aides", title: "Aides financières" },
  ],
  fields: [
    texteCourt("heroEyebrow", "Surtitre", undefined, { group: "hero" }),
    texteCourt("heroTitre", "Titre de la page", undefined, { group: "hero" }),
    texteLong("heroLead", "Texte d'introduction", undefined, { group: "hero" }),

    ...enTeteDeSection("modes", "Section par service", "services"),
    defineField({
      name: "modesListe",
      title: "Les lignes de facturation",
      type: "array",
      group: "services",
      description:
        "Une ligne par service : son nom, ce qui est facturé, et l'unité (ou le montant une fois la grille arrêtée).",
      of: [
        {
          type: "object",
          fields: [
            { name: "titre", title: "Service", type: "string" },
            { name: "texte", title: "Ce qui est facturé", type: "string" },
            {
              name: "unite",
              title: "Unité ou montant",
              type: "string",
              description: "Exemple : « Tarif horaire », ou « 25 € / heure » une fois confirmé.",
            },
          ],
          preview: { select: { title: "titre", subtitle: "unite" } },
        },
      ],
    }),

    ...enTeteDeSection("aides", "Section aides", "aides"),
    defineField({
      name: "aidesListe",
      title: "Les dispositifs d'aide",
      type: "array",
      group: "aides",
      description: "Le nom de chaque dispositif, une pastille par nom.",
      of: [{ type: "string" }],
    }),
    texteLong(
      "aidesFinal",
      "Texte de fin de page",
      "Le paragraphe affiché à côté du bouton « Obtenir un devis ».",
      { group: "aides", rows: 3 },
    ),
  ],
  preview: { prepare: () => ({ title: "Page Tarifs" }) },
})
