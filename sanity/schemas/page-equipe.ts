import { defineType } from "sanity"

import {
  enTeteDeSection,
  listeDeTextes,
  listeTitreTexte,
  texteCourt,
  texteLong,
} from "./outils"

/** Page « Notre équipe ». */
export const pageEquipe = defineType({
  name: "pageEquipe",
  title: "Page Notre équipe",
  type: "document",
  groups: [
    { name: "hero", title: "Haut de page", default: true },
    { name: "gouvernance", title: "Présidence" },
    { name: "repit", title: "Équipe du centre de répit" },
    { name: "domicile", title: "Aides à domicile" },
    { name: "continuite", title: "Continuité" },
    { name: "cta", title: "Bandeau de contact" },
  ],
  fields: [
    texteCourt("heroEyebrow", "Surtitre", undefined, { group: "hero" }),
    texteCourt("heroTitre", "Titre de la page", undefined, { group: "hero" }),
    texteLong("heroLead", "Texte d'introduction", undefined, { group: "hero" }),

    texteCourt("gouvEyebrow", "Surtitre", undefined, { group: "gouvernance" }),
    texteLong(
      "gouvTexte",
      "Paragraphe de présentation",
      "Le paragraphe sous le nom de la présidente.",
      { group: "gouvernance", rows: 4 },
    ),

    ...enTeteDeSection("repit", "Section centre de répit", "repit"),
    listeTitreTexte(
      "competencesListe",
      "Les métiers de l'équipe",
      "Titre = le métier, texte = son rôle. L'ordre d'origine distingue les métiers du soin (6 premiers) de ceux du quotidien.",
      { group: "repit" },
    ),
    texteLong(
      "noteCompetences",
      "Note sous la liste",
      "L'encadré affiché sous les métiers.",
      { group: "repit", rows: 3 },
    ),

    ...enTeteDeSection("dom", "Section aides à domicile", "domicile"),
    listeDeTextes(
      "domPeuvent",
      "Ce qu'elles peuvent faire",
      "Une ligne par point.",
      { group: "domicile" },
    ),
    listeDeTextes(
      "domNeFontPas",
      "Ce qu'elles ne font pas",
      "Une ligne par point.",
      { group: "domicile" },
    ),
    texteLong(
      "domNote",
      "Note sous « Ce qu'elles ne font pas »",
      undefined,
      { group: "domicile", rows: 2 },
    ),

    ...enTeteDeSection("cont", "Section continuité", "continuite"),
    listeTitreTexte(
      "contCartes",
      "Les deux encarts",
      "Titre et texte de chaque encart (absence, cahier de liaison).",
      { group: "continuite" },
    ),

    texteCourt("ctaTitre", "Titre du bandeau", undefined, { group: "cta" }),
    texteLong("ctaTexte", "Texte du bandeau", undefined, { group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "Page Notre équipe" }) },
})
