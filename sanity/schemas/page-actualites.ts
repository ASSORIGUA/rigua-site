import { defineType } from "sanity"

import { enTeteDeSection, texteCourt, texteLong } from "./outils"

/** Page « Actualités » : textes de la page. Les articles ont leur propre entrée. */
export const pageActualites = defineType({
  name: "pageActualites",
  title: "Page Actualités",
  type: "document",
  groups: [
    { name: "hero", title: "Haut de page", default: true },
    { name: "liste", title: "Liste" },
    { name: "cta", title: "Bandeau de contact" },
  ],
  fields: [
    texteCourt("heroEyebrow", "Surtitre", undefined, { group: "hero" }),
    texteCourt("heroTitre", "Titre de la page", undefined, { group: "hero" }),
    texteLong("heroLead", "Texte d'introduction", undefined, { group: "hero" }),
    ...enTeteDeSection("liste", "Section liste", "liste"),
    texteCourt("ctaTitre", "Titre du bandeau", undefined, { group: "cta" }),
    texteLong("ctaTexte", "Texte du bandeau", undefined, { group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Page Actualités" }) },
})
