import { defineType } from "sanity"

import { enTeteDeSection, listeTitreTexte, texteCourt, texteLong } from "./outils"

/** Page « Contact ». Les coordonnées restent gérées dans le code (données vérifiées). */
export const pageContact = defineType({
  name: "pageContact",
  title: "Page Contact",
  type: "document",
  groups: [
    { name: "hero", title: "Haut de page", default: true },
    { name: "urgence", title: "Situation urgente" },
    { name: "fin", title: "Bloc de fin" },
  ],
  fields: [
    texteCourt("heroEyebrow", "Surtitre", undefined, { group: "hero" }),
    texteCourt("heroTitre", "Titre de la page", undefined, { group: "hero" }),
    texteLong("heroLead", "Texte d'introduction", undefined, { group: "hero" }),

    ...enTeteDeSection("urgence", "Section situation urgente", "urgence"),
    listeTitreTexte(
      "urgenceEtapes",
      "Les étapes à suivre",
      "Titre et texte de chaque étape, dans l'ordre.",
      { group: "urgence" },
    ),
    texteCourt("alerteTitre", "Titre de l'encadré d'avertissement", undefined, {
      group: "urgence",
    }),
    texteLong("alerteTexte", "Texte de l'encadré d'avertissement", undefined, {
      group: "urgence",
    }),

    texteCourt("finEyebrow", "Surtitre du bloc de fin", undefined, { group: "fin" }),
    texteCourt("finTitre", "Titre du bloc de fin", undefined, { group: "fin" }),
    texteLong("finTexte", "Texte du bloc de fin", undefined, { group: "fin" }),
  ],
  preview: { prepare: () => ({ title: "Page Contact" }) },
})
