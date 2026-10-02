import { defineType } from "sanity"

import { enTeteDeSection, listeTitreTexte, texteCourt, texteLong } from "./outils"

/** Page « Nos actions » : les quatre familles d'actions. */
export const pageActions = defineType({
  name: "pageActions",
  title: "Page Nos actions",
  type: "document",
  groups: [
    { name: "hero", title: "Haut de page", default: true },
    { name: "familles", title: "Familles d'actions" },
    { name: "cta", title: "Bandeau de contact" },
  ],
  fields: [
    texteCourt("heroEyebrow", "Surtitre", undefined, { group: "hero" }),
    texteCourt("heroTitre", "Titre de la page", undefined, { group: "hero" }),
    texteLong("heroLead", "Texte d'introduction", undefined, { group: "hero" }),
    ...enTeteDeSection("familles", "Section familles d'actions", "familles"),
    listeTitreTexte(
      "famillesListe",
      "Les familles d'actions",
      "Titre et texte de chaque famille (ateliers, sorties, rencontres, projets).",
      { group: "familles" },
    ),
    texteCourt("ctaTitre", "Titre du bandeau", undefined, { group: "cta" }),
    texteLong("ctaTexte", "Texte du bandeau", undefined, { group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Page Nos actions" }) },
})
