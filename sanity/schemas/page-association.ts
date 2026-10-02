import { defineType } from "sanity"

import { enTeteDeSection, listeTitreTexte, texteCourt, texteLong } from "./outils"

/** Page « L'association » : origine, partis pris, valeurs, publics, aidants. */
export const pageAssociation = defineType({
  name: "pageAssociation",
  title: "Page L'association",
  type: "document",
  groups: [
    { name: "hero", title: "Haut de page", default: true },
    { name: "origine", title: "Origine" },
    { name: "partis", title: "Partis pris" },
    { name: "valeurs", title: "Valeurs" },
    { name: "publics", title: "Qui nous accompagnons" },
    { name: "aidants", title: "Familles et aidants" },
    { name: "cta", title: "Bandeau de contact" },
  ],
  fields: [
    /* ---------- Haut de page ---------- */
    texteCourt("heroEyebrow", "Surtitre", "La petite ligne au-dessus du titre.", {
      group: "hero",
    }),
    texteCourt("heroTitre", "Titre de la page", undefined, { group: "hero" }),

    /* ---------- Origine ---------- */
    texteCourt("origineTitre", "Titre de la section", undefined, { group: "origine" }),
    texteLong(
      "origineConstat",
      "Premier paragraphe (le constat)",
      undefined,
      { group: "origine", rows: 5 },
    ),
    texteLong(
      "origineReponse",
      "Second paragraphe (la réponse)",
      undefined,
      { group: "origine", rows: 4 },
    ),
    texteLong(
      "charteQualite",
      "Mention charte qualité",
      "La phrase affichée sous le numéro d'agrément.",
      { group: "origine", rows: 2 },
    ),

    /* ---------- Partis pris ---------- */
    ...enTeteDeSection("partis", "Section partis pris", "partis"),
    listeTitreTexte(
      "partisBlocs",
      "Les quatre partis pris",
      "Titre et texte de chaque bloc.",
      { group: "partis" },
    ),

    /* ---------- Valeurs ---------- */
    ...enTeteDeSection("valeurs", "Section valeurs", "valeurs"),
    listeTitreTexte(
      "valeursListe",
      "Les six valeurs",
      "Le mot et la phrase qui l'engage.",
      { group: "valeurs" },
    ),

    /* ---------- Publics ---------- */
    ...enTeteDeSection("publics", "Section qui nous accompagnons", "publics"),
    listeTitreTexte(
      "publicsListe",
      "Les publics accompagnés",
      "Titre et précision de chaque situation.",
      { group: "publics" },
    ),
    texteLong(
      "explicationGir",
      "Explication du GIR",
      "Le texte « Qu'est-ce que le GIR ? » affiché sous la liste.",
      { group: "publics", rows: 3 },
    ),

    /* ---------- Aidants ---------- */
    texteCourt("aidantsEyebrow", "Surtitre", undefined, { group: "aidants" }),
    texteCourt("aidantsTitre", "Titre de la section", undefined, { group: "aidants" }),
    texteLong(
      "aidantsChapo",
      "Paragraphe d'introduction",
      undefined,
      { group: "aidants", rows: 3 },
    ),
    listeTitreTexte(
      "aidantsPoints",
      "Les quatre points de soutien",
      "Titre et texte de chaque point.",
      { group: "aidants" },
    ),

    /* ---------- Bandeau de contact ---------- */
    texteCourt("ctaTitre", "Titre du bandeau", undefined, { group: "cta" }),
    texteLong("ctaTexte", "Texte du bandeau", undefined, { group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Page L'association" }) },
})
