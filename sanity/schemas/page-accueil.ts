import { defineType } from "sanity"

import { enTeteDeSection, listeTitreTexte, texteCourt, texteLong } from "./outils"

/**
 * Page d'accueil : tous ses textes éditoriaux, regroupés par section.
 * Un onglet du Studio = une section de la page, dans l'ordre d'affichage.
 */
export const pageAccueil = defineType({
  name: "pageAccueil",
  title: "Page d'accueil",
  type: "document",
  groups: [
    { name: "hero", title: "Bloc principal", default: true },
    { name: "services", title: "Services" },
    { name: "parcours", title: "Comment cela se passe" },
    { name: "association", title: "L'association" },
    { name: "pourquoi", title: "Pourquoi nous" },
    { name: "aller", title: "Aller plus loin" },
    { name: "actualites", title: "Actualités" },
    { name: "temoignages", title: "Témoignages" },
    { name: "faq", title: "Questions fréquentes" },
    { name: "cta", title: "Bandeau de contact" },
  ],
  fields: [
    /* ---------- Bloc principal (hero) ---------- */
    texteCourt(
      "heroBadge",
      "Pastille au-dessus du titre",
      "La petite étiquette affichée au-dessus du grand titre.",
      { group: "hero" },
    ),
    texteCourt("heroTitre", "Grand titre", "Le titre principal du site.", { group: "hero" }),
    texteLong(
      "heroTexte",
      "Texte d'introduction",
      "Le paragraphe affiché sous le grand titre (masqué sur téléphone).",
      { group: "hero" },
    ),
    texteCourt("heroBoutonServices", "Bouton secondaire", "Le libellé du bouton blanc.", {
      group: "hero",
    }),
    texteCourt("heroLienUrgence", "Lien urgence", "Le lien souligné sous les boutons.", {
      group: "hero",
    }),

    /* ---------- Services ---------- */
    ...enTeteDeSection("services", "Section services", "services"),

    /* ---------- Parcours ---------- */
    ...enTeteDeSection("parcours", "Section parcours", "parcours"),
    listeTitreTexte(
      "parcoursEtapes",
      "Les quatre étapes",
      "Titre et texte de chaque étape, dans l'ordre.",
      { group: "parcours" },
    ),

    /* ---------- L'association ---------- */
    texteCourt("assoEyebrow", "Surtitre", undefined, { group: "association" }),
    texteCourt("assoTitre", "Titre", undefined, { group: "association" }),
    texteLong(
      "assoTexte",
      "Paragraphe",
      "Le paragraphe de présentation de l'association.",
      { group: "association", rows: 5 },
    ),
    texteCourt("assoBouton", "Libellé du bouton", undefined, { group: "association" }),

    /* ---------- Pourquoi nous ---------- */
    ...enTeteDeSection("pourquoi", "Section pourquoi nous", "pourquoi"),
    listeTitreTexte(
      "pourquoiReperes",
      "Les trois faits",
      "Titre et détail de chaque fait. Gardez-en trois : au-delà, la section s'allonge.",
      { group: "pourquoi" },
    ),
    texteCourt("pourquoiBouton", "Libellé du bouton", undefined, { group: "pourquoi" }),

    /* ---------- Aller plus loin ---------- */
    ...enTeteDeSection("aller", "Section aller plus loin", "aller"),
    listeTitreTexte(
      "allerLiens",
      "Les quatre sujets",
      "Titre et texte de chaque carte. Les liens de destination restent gérés par le site.",
      { group: "aller" },
    ),

    /* ---------- Actualités ---------- */
    ...enTeteDeSection("actu", "Section actualités", "actualites"),

    /* ---------- Témoignages ---------- */
    ...enTeteDeSection("temo", "Section témoignages", "temoignages"),

    /* ---------- FAQ ---------- */
    texteCourt("faqEyebrow", "Surtitre", undefined, { group: "faq" }),
    texteCourt("faqTitre", "Titre", undefined, { group: "faq" }),
    texteLong("faqTexte", "Texte d'introduction", undefined, { group: "faq" }),

    /* ---------- Bandeau de contact ---------- */
    texteCourt("ctaTitre", "Titre du bandeau", undefined, { group: "cta" }),
    texteLong("ctaTexte", "Texte du bandeau", undefined, { group: "cta" }),
  ],
  preview: {
    prepare: () => ({ title: "Page d'accueil" }),
  },
})
