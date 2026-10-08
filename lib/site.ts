/**
 * Configuration du site — RIGUA (Regroupement intergénération le Guadeloupe)
 *
 * SOURCE UNIQUE des informations d'identité et de contact.
 *
 * Le brief (§19) interdit d'inventer un agrément, une capacité d'accueil, un
 * tarif, un délai ou une coordonnée. Tout ce qui n'a pas encore été fourni par
 * Corrine porte donc `aConfirmer: true` et n'est PAS publié :
 *
 *  - le composant <Coordonnee> affiche « à confirmer » au lieu d'une valeur ;
 *  - `lib/jsonld.ts` omet le champ des données structurées, pour ne pas
 *    déclarer à Google une adresse ou un téléphone faux ;
 *  - `docs/informations-a-completer.md` recense tout ce qui reste ouvert.
 *
 * Remplir une valeur = passer `aConfirmer` à false et renseigner le champ.
 * Rien d'autre à faire, tout le site suit.
 */

import type { IconName } from "@/components/icon";

export type Provisoire<T> = {
  valeur: T | null;
  aConfirmer: boolean;
};

function confirme<T>(valeur: T): Provisoire<T> {
  return { valeur, aConfirmer: false };
}

function aConfirmer<T>(): Provisoire<T> {
  return { valeur: null, aConfirmer: true };
}

/** Le nom officiel est désormais confirmé : RIGUA. */
export const NOM_PROVISOIRE = false;

export const site = {
  nom: "RIGUA",
  /** Nom complet développé, tel qu'il figure sur le logo officiel. */
  nomComplet: "Regroupement intergénération le Guadeloupe",
  /** Accroche officielle, reprise du flyer de l'association. */
  accroche: "Votre bien-être, notre priorité au quotidien",
  /** Proposition principale, mot pour mot du brief §9. */
  proposition:
    "Un accompagnement humain et adapté pour les personnes âgées et dépendantes.",
  description:
    "Association loi 1901 qui accompagne les personnes âgées, fragiles ou dépendantes : présence à domicile, accueil de jour, hébergement temporaire et solutions d'urgence.",
  /**
   * Domaine de production. À remplacer avant mise en ligne : il sert de base
   * aux URL canoniques, au sitemap et aux données structurées.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.assorigua.com",
  fondatrice: {
    prenomNom: "Corrine William",
    profession: "infirmière libérale",
  },
  /** Confirmé par le livret d'accueil : « J'ai créé RIGUA... en 2022 ». */
  anneeCreation: 2022,
} as const;

/* --------------------------------------------------------------------------
   COORDONNÉES
   Confirmées par le flyer et le livret d'accueil officiels (docs/FLYERS.pdf,
   docs/LIVRET D'ACCUEIL RIGUA.pdf). Ce qui n'y figure pas reste `aConfirmer`.
   -------------------------------------------------------------------------- */
export const contact = {
  telephone: confirme({ affichage: "05 90 88 68 96", tel: "+590590886896" }),
  /**
   * Ligne de permanence, transférée en dehors des horaires de bureau et le
   * week-end (livret §2). Le flyer demande explicitement de privilégier le SMS
   * ou WhatsApp sur ce numéro pour garantir la bonne réception du message.
   */
  telephoneUrgence: confirme({
    affichage: "06 90 50 66 90",
    tel: "+590690506690",
    smsWhatsApp: true,
  }),
  /**
   * Second portable, cité par le flyer et le livret d'accueil dans le même
   * ordre et à côté du précédent (bureau, 06 90 50 66 90, 06 90 26 16 65) :
   * un numéro de repli, sans consigne SMS/WhatsApp particulière.
   */
  telephoneSecondaire: confirme({
    affichage: "06 90 26 16 65",
    tel: "+590690261665",
  }),
  email: confirme("assorigua@gmail.com"),
  adresse: confirme({
    rue: "Route de Bonnier, Caraque",
    codePostal: "97139",
    ville: "Les Abymes",
    pays: "Guadeloupe",
  }),
  /**
   * Horaires du flyer : permanence le matin, rendez-vous l'après-midi. Le
   * livret d'accueil donne une amplitude différente (8h30-12h00 et
   * 15h30-18h00) — à confirmer avec l'association laquelle est à jour avant
   * de figer définitivement cette information.
   */
  horaires: confirme([
    { jours: "Du lundi au vendredi", heures: "Permanence 8h30 - 12h30" },
    { jours: "Du lundi au vendredi", heures: "Sur rendez-vous 15h00 - 16h00" },
  ]),
  zoneIntervention: confirme(
    "Zone Cap Excellence : Les Abymes, Baie-Mahault et Pointe-à-Pitre",
  ),
  reseaux: confirme<{ nom: string; url: string }[]>([]),
} as const;

/* --------------------------------------------------------------------------
   AVIS GOOGLE
   Fiche Google Business pas encore créée ou pas encore communiquée : le lien
   et les chiffres (note, nombre d'avis) restent `aConfirmer` tant qu'elle ne
   l'est pas. Pas de note ni de compteur inventés (brief §19).
   -------------------------------------------------------------------------- */
export const avisGoogle = aConfirmer<{
  url: string;
  note: number;
  nombreAvis: number;
}>();

/* --------------------------------------------------------------------------
   MENTIONS LÉGALES
   -------------------------------------------------------------------------- */
export const legal = {
  /**
   * Le nom complet développé (site.nomComplet) sert de raison sociale d'usage
   * sur le site ; à confirmer s'il s'agit bien de la raison sociale déposée
   * telle quelle, ou d'une dénomination d'usage distincte.
   */
  /**
   * Confirmée par la facturation et le registre public (recherche-entreprises
   * .api.gouv.fr, SIREN 919216598, association active) : raison sociale,
   * RNA et SIREN relevés le 2 octobre 2026.
   */
  raisonSociale: confirme("REGROUPEMENT INTERGENERATIONNEL GUADELOUPE"),
  formeJuridique: confirme("Association régie par la loi du 1er juillet 1901"),
  rna: confirme("W9G2016268"),
  siren: confirme("919216598"),
  representantLegal: confirme("Corrine William, présidente"),
  /**
   * Hébergeur réel du site (déployé sur Vercel). Pas de numéro de téléphone
   * public : le site web de l'hébergeur tient lieu de coordonnée de contact.
   */
  hebergeur: confirme({
    nom: "Vercel Inc.",
    adresse: "340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis",
    telephone: "https://vercel.com",
  }),
  /** Délai de conservation des demandes, à arrêter avec Corrine. */
  conservationDemandes: aConfirmer<string>(),
  /**
   * Agrément Services à la Personne, confirmé par le flyer et le livret
   * d'accueil. Ce n'est ni un RNA ni un SIREN : c'est un numéro d'agrément
   * délivré au titre des services à la personne (SAP).
   */
  agrementSAP: confirme("SAP919216598"),
} as const;

/* --------------------------------------------------------------------------
   NAVIGATION
   Le brief (§12.1) recommandait huit entrées maximum au premier niveau ; neuf
   avec « Notre équipe », ajoutée à la demande explicite du client pour donner
   à l'équipe pluridisciplinaire sa propre page, plutôt qu'une sous-page de
   « L'association ». Les quatre services, autrefois quatre pages dédiées sous
   un menu déroulant, vivent maintenant en sections ancrées d'une seule page
   « Nos services » (voir app/nos-services/page.tsx) : plus de sous-menu à
   exposer ici, un simple lien suffit.
   -------------------------------------------------------------------------- */
export type LienNav = {
  href: string;
  libelle: string;
  /** Libellé abrégé pour la barre de navigation, quand le titre est long. */
  libelleNav?: string;
  /** Phrase courte affichée dans le menu mobile. */
  resume?: string;
  /** Icône affichée devant le libellé dans le menu mobile. */
  icone?: IconName;
  enfants?: LienNav[];
};

export const navigation: LienNav[] = [
  { href: "/", libelle: "Accueil", icone: "accueil" },
  {
    href: "/l-association",
    libelle: "L'association",
    resume: "Pourquoi elle existe, qui l'anime, comment elle travaille.",
    icone: "famille",
  },
  {
    href: "/nos-services",
    libelle: "Nos services",
    libelleNav: "Services",
    resume: "Les quatre solutions d'accompagnement, sur une seule page.",
    icone: "service-domicile",
  },
  {
    href: "/equipe",
    libelle: "Notre équipe",
    libelleNav: "Équipe",
    resume: "Les professionnels qui interviennent auprès de vous.",
    icone: "soignant",
  },
  {
    href: "/nos-actions",
    libelle: "Nos actions",
    libelleNav: "Actions",
    resume: "Ateliers, sorties, rencontres et nouveaux projets.",
    icone: "atelier",
  },
  {
    href: "/actualites",
    libelle: "Actualités",
    resume: "Ce qui s'est passé récemment dans l'association.",
    icone: "note",
  },
  {
    href: "/tarifs",
    libelle: "Tarifs",
    resume: "Comment se facture chaque service, et quelles aides peuvent s'appliquer.",
    icone: "tarifs",
  },
  {
    href: "/faq",
    libelle: "Questions fréquentes",
    libelleNav: "FAQ",
    resume: "Les réponses aux questions posées au téléphone.",
    icone: "question",
  },
  {
    href: "/contact",
    libelle: "Contact",
    resume: "Nous joindre, nous écrire, venir nous voir.",
    icone: "telephone",
  },
];

export const navigationLegale: LienNav[] = [
  { href: "/mentions-legales", libelle: "Mentions légales" },
  { href: "/politique-de-confidentialite", libelle: "Confidentialité" },
];

/** Action principale du site (brief §23). */
export const actionPrincipale = {
  href: "/prendre-rendez-vous",
  libelle: "Rendez-vous",
};

/* --------------------------------------------------------------------------
   HELPERS
   -------------------------------------------------------------------------- */

/** Vrai si la valeur est renseignée et validée : sert de garde à l'affichage. */
export function estPublie<T>(champ: Provisoire<T>): champ is {
  valeur: T;
  aConfirmer: false;
} {
  return !champ.aConfirmer && champ.valeur !== null;
}

/** URL absolue, pour les canoniques, le sitemap et Open Graph. */
export function urlAbsolue(chemin: string): string {
  return new URL(chemin, site.url).toString();
}

/**
 * Coordonnées du bouton d'appel, partagées entre le header et le FAB
 * (bouton d'appel flottant mobile, components/fab-appel.tsx).
 * Le numéro n'est pas encore connu : le bouton renvoie alors vers /contact.
 */
export function telephoneAppel() {
  if (estPublie(contact.telephone)) {
    return {
      href: `tel:${contact.telephone.valeur.tel}`,
      libelle: contact.telephone.valeur.affichage,
      libelleAccessible: `Appeler le ${contact.telephone.valeur.affichage}`,
    };
  }
  return {
    href: "/contact",
    libelle: "Nous joindre",
    libelleAccessible: "Voir comment nous joindre",
  };
}
