import { defineType } from "sanity"

import { texteCourt, texteLong } from "./outils"

/** Page « Prendre rendez-vous ». Le formulaire reste géré par le code. */
export const pageRdv = defineType({
  name: "pageRdv",
  title: "Page Prendre rendez-vous",
  type: "document",
  groups: [{ name: "hero", title: "Haut de page", default: true }],
  fields: [
    texteCourt("heroEyebrow", "Surtitre", undefined, { group: "hero" }),
    texteCourt("heroTitre", "Titre de la page", undefined, { group: "hero" }),
    texteLong("heroLead", "Texte d'introduction", undefined, { group: "hero" }),
    texteLong(
      "appelTexte",
      "Texte « Vous préférez appeler ? »",
      "Le paragraphe de la carte à droite du formulaire.",
      { group: "hero", rows: 3 },
    ),
  ],
  preview: { prepare: () => ({ title: "Page Prendre rendez-vous" }) },
})
