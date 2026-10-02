import { defineType } from "sanity"

import { enTeteDeSection, listeTitreTexte, texteCourt, texteLong } from "./outils"

/** Page « Nos services » : textes de la page. Les fiches vivent dans « Service ». */
export const pageServices = defineType({
  name: "pageServices",
  title: "Page Nos services",
  type: "document",
  groups: [
    { name: "hero", title: "Haut de page", default: true },
    { name: "orienteur", title: "Si vous hésitez" },
    { name: "comparer", title: "Comparer" },
    { name: "cta", title: "Bandeau de contact" },
  ],
  fields: [
    texteCourt("heroEyebrow", "Surtitre", undefined, { group: "hero" }),
    texteCourt("heroTitre", "Titre de la page", undefined, { group: "hero" }),
    texteLong("heroLead", "Texte d'introduction", undefined, { group: "hero" }),

    ...enTeteDeSection("orienteur", "Section si vous hésitez", "orienteur"),

    ...enTeteDeSection("comparer", "Section comparer", "comparer"),
    listeTitreTexte(
      "comparerBlocs",
      "Les deux cas de figure",
      "Titre et texte de chaque cas (la nuit chez soi, la nuit dans la structure).",
      { group: "comparer" },
    ),

    texteCourt("ctaTitre", "Titre du bandeau", undefined, { group: "cta" }),
    texteLong("ctaTexte", "Texte du bandeau", undefined, { group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Page Nos services" }) },
})
