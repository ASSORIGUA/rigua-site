/**
 * Formulaire de demande : schéma, validation, anti-spam.
 *
 * Validation écrite à la main, sans bibliothèque. Deux raisons : le formulaire
 * a douze champs et des règles simples, et le brief §21 impose une gestion
 * prudente des données personnelles. Moins de dépendances traversées par des
 * données de santé, moins de surface à auditer.
 *
 * PRINCIPE DE MINIMISATION (brief §15)
 * Ce que le formulaire demande : de quoi rappeler la personne, et de quoi
 * comprendre la situation. Rien d'autre.
 *
 * Ce qui a été volontairement écarté, alors que le brief l'autorisait :
 *  - le nom du proche concerné : inutile pour un premier contact, c'est une
 *    donnée nominative de tiers que la personne concernée n'a pas consentie ;
 *  - sa tranche d'âge : n'oriente aucune décision au premier échange ;
 *  - tout document, compte rendu, ordonnance ou diagnostic.
 *
 * Le GIR est demandé, parce que le brief le prévoit, mais il reste facultatif
 * et le libellé dit explicitement qu'on peut l'ignorer.
 */

export const RELATIONS = [
  { valeur: "enfant", libelle: "Son enfant" },
  { valeur: "conjoint", libelle: "Son conjoint ou sa conjointe" },
  { valeur: "proche", libelle: "Un autre proche, un voisin, un ami" },
  { valeur: "aidant", libelle: "Son aidant familial au quotidien" },
  { valeur: "professionnel", libelle: "Un professionnel qui oriente une famille" },
  { valeur: "personne", libelle: "La personne concernée elle-même" },
] as const

export const SERVICES_DEMANDES = [
  { valeur: "domicile", libelle: "Service à la personne à domicile" },
  { valeur: "jour", libelle: "Accueil de jour" },
  { valeur: "temporaire", libelle: "Hébergement temporaire" },
  { valeur: "urgence", libelle: "Situation urgente" },
  { valeur: "inconnu", libelle: "Je ne sais pas encore lequel convient" },
] as const

export const TYPES_RENDEZ_VOUS = [
  {
    valeur: "telephone",
    libelle: "Un premier échange téléphonique",
    aide: "Une vingtaine de minutes pour comprendre la situation. C'est le point de départ le plus fréquent.",
  },
  {
    valeur: "visite",
    libelle: "Une visite de la structure",
    aide: "Voir les lieux, avec la personne concernée si elle le souhaite.",
  },
  {
    valeur: "evaluation",
    libelle: "Une évaluation de la situation",
    aide: "Sur place ou au domicile, pour déterminer ce qui serait réellement utile.",
  },
  {
    valeur: "informations",
    libelle: "Une simple demande d'informations",
    aide: "Vous cherchez à comprendre avant d'envisager quoi que ce soit.",
  },
] as const

export const MOMENTS = [
  { valeur: "matin", libelle: "Plutôt le matin" },
  { valeur: "apres-midi", libelle: "Plutôt l'après-midi" },
  { valeur: "indifferent", libelle: "Peu importe" },
] as const

export const NIVEAUX_URGENCE = [
  {
    valeur: "informatif",
    libelle: "Je m'informe, rien de pressé",
  },
  {
    valeur: "semaines",
    libelle: "Dans les prochaines semaines",
  },
  {
    valeur: "jours",
    libelle: "Dans les prochains jours",
  },
] as const

export const GIR = [
  { valeur: "inconnu", libelle: "Je ne sais pas" },
  { valeur: "1-2", libelle: "GIR 1 ou 2" },
  { valeur: "3-4", libelle: "GIR 3 ou 4" },
  { valeur: "5-6", libelle: "GIR 5 ou 6" },
  { valeur: "aucun", libelle: "Aucune évaluation n'a été faite" },
] as const

export type ModeDemande = "rendez-vous" | "rappel"

export type Demande = {
  mode: ModeDemande
  prenomNom: string
  telephone: string
  email: string
  relation: string
  service: string
  typeRendezVous: string
  moment: string
  urgence: string
  gir: string
  situation: string
}

export type Erreurs = Partial<Record<keyof Demande | "consentement" | "_global", string>>

export type EtatDemande =
  | { statut: "vide" }
  | { statut: "erreur"; erreurs: Erreurs; valeurs: Partial<Demande> }
  | { statut: "envoye"; reference: string; parCourriel: boolean }

/* --------------------------------------------------------------------------
   VALIDATION
   Les messages disent quoi faire, pas ce qui est invalide. « Indiquez un
   numéro où nous pouvons vous joindre » est actionnable ; « champ invalide »
   ne l'est pas.
   -------------------------------------------------------------------------- */

function texte(donnees: FormData, cle: string): string {
  const brut = donnees.get(cle)
  return typeof brut === "string" ? brut.trim() : ""
}

/**
 * Téléphone français, tolérant : espaces, points, tirets, indicatif +33.
 * Un formulaire qui refuse « 06.12.34.56.78 » fait perdre du monde en route.
 */
const TELEPHONE = /^(?:\+33|0033|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

function estValeurConnue(
  valeur: string,
  liste: readonly { valeur: string }[]
): boolean {
  return liste.some((option) => option.valeur === valeur)
}

export type ResultatValidation =
  | { ok: true; demande: Demande }
  | { ok: false; erreurs: Erreurs; valeurs: Partial<Demande> }
  /** Rejet silencieux : on répond « envoyé » au robot sans rien transmettre. */
  | { ok: false; robot: true }

export function validerDemande(donnees: FormData): ResultatValidation {
  /* --- Anti-spam (brief §21) ---
     Un seul garde : le champ leurre. Il ne demande aucun effort au visiteur et
     n'envoie rien à un tiers, contrairement à un captcha, qui serait un
     transfert de données de navigation incompatible avec le reste de la
     politique de confidentialité de ce site.

     UN GARDE DE DÉLAI MINIMAL A ÉTÉ ESSAYÉ PUIS RETIRÉ. Il rejetait toute
     soumission arrivant moins de 2,5 s après l'ouverture de la page. Le test
     fonctionnel l'a pris en défaut immédiatement : une soumission rapide, par
     exemple avec le remplissage automatique du navigateur sur le formulaire
     court, recevait une confirmation alors que la demande était jetée.
     L'asymétrie tranche la question : perdre en silence la demande d'une
     famille au sujet d'une personne vulnérable est infiniment plus grave que
     recevoir un e-mail indésirable. Le leurre, la case de consentement
     obligatoire et la validation stricte du téléphone suffisent. */
  const leurre = texte(donnees, "societe")
  if (leurre !== "") return { ok: false, robot: true }

  const modeBrut = texte(donnees, "mode")
  const mode: ModeDemande = modeBrut === "rappel" ? "rappel" : "rendez-vous"

  const valeurs: Demande = {
    mode,
    prenomNom: texte(donnees, "prenomNom"),
    telephone: texte(donnees, "telephone"),
    email: texte(donnees, "email"),
    relation: texte(donnees, "relation"),
    service: texte(donnees, "service"),
    typeRendezVous: texte(donnees, "typeRendezVous"),
    moment: texte(donnees, "moment"),
    urgence: texte(donnees, "urgence"),
    gir: texte(donnees, "gir"),
    situation: texte(donnees, "situation"),
  }

  const erreurs: Erreurs = {}

  if (valeurs.prenomNom.length < 2) {
    erreurs.prenomNom = "Indiquez votre prénom et votre nom, pour que nous sachions à qui nous parlons."
  } else if (valeurs.prenomNom.length > 120) {
    erreurs.prenomNom = "Ce nom est trop long pour être exact. Vérifiez la saisie."
  }

  if (valeurs.telephone === "") {
    erreurs.telephone = "Indiquez un numéro où nous pouvons vous joindre : c'est ainsi que nous répondons."
  } else if (!TELEPHONE.test(valeurs.telephone)) {
    erreurs.telephone = "Ce numéro ne semble pas complet. Dix chiffres, par exemple 06 12 34 56 78."
  }

  /* L'e-mail reste facultatif : une partie du public n'en utilise pas. */
  if (valeurs.email !== "" && !EMAIL.test(valeurs.email)) {
    erreurs.email = "Cette adresse e-mail semble incomplète. Vous pouvez aussi laisser ce champ vide."
  }

  if (mode === "rendez-vous") {
    if (!estValeurConnue(valeurs.relation, RELATIONS)) {
      erreurs.relation = "Indiquez votre lien avec la personne concernée."
    }
    if (!estValeurConnue(valeurs.service, SERVICES_DEMANDES)) {
      erreurs.service = "Choisissez un service, ou « je ne sais pas encore » si vous hésitez."
    }
    if (!estValeurConnue(valeurs.typeRendezVous, TYPES_RENDEZ_VOUS)) {
      erreurs.typeRendezVous = "Choisissez le type d'échange qui vous conviendrait."
    }
    if (valeurs.gir !== "" && !estValeurConnue(valeurs.gir, GIR)) {
      erreurs.gir = "Choisissez une réponse dans la liste, ou « je ne sais pas »."
    }
    if (valeurs.urgence !== "" && !estValeurConnue(valeurs.urgence, NIVEAUX_URGENCE)) {
      erreurs.urgence = "Choisissez une réponse dans la liste."
    }
    if (valeurs.situation.length < 15) {
      erreurs.situation =
        "Décrivez la situation en quelques mots. Deux phrases suffisent, et cela nous évite de vous rappeler pour rien."
    }
  }

  if (valeurs.moment !== "" && !estValeurConnue(valeurs.moment, MOMENTS)) {
    erreurs.moment = "Choisissez un moment dans la liste."
  }

  if (valeurs.situation.length > 4000) {
    erreurs.situation = "Ce message est très long. Résumez l'essentiel, nous en reparlerons de vive voix."
  }

  if (texte(donnees, "consentement") !== "oui") {
    erreurs.consentement =
      "Nous avons besoin de votre accord pour utiliser ces informations et vous répondre."
  }

  if (Object.keys(erreurs).length > 0) {
    return { ok: false, erreurs, valeurs }
  }

  return { ok: true, demande: valeurs }
}

/* --------------------------------------------------------------------------
   MISE EN FORME POUR TRANSMISSION
   -------------------------------------------------------------------------- */

function libelle(
  valeur: string,
  liste: readonly { valeur: string; libelle: string }[]
): string {
  return liste.find((o) => o.valeur === valeur)?.libelle ?? "non précisé"
}

export function resumerDemande(demande: Demande): string {
  const lignes: string[] = [
    demande.mode === "rappel"
      ? "DEMANDE DE RAPPEL"
      : "DEMANDE DE RENDEZ-VOUS",
    "",
    `Nom              : ${demande.prenomNom}`,
    `Téléphone        : ${demande.telephone}`,
    `E-mail           : ${demande.email || "non communiqué"}`,
    `Moment de rappel : ${demande.moment ? libelle(demande.moment, MOMENTS) : "non précisé"}`,
  ]

  if (demande.mode === "rendez-vous") {
    lignes.push(
      `Lien avec la personne : ${libelle(demande.relation, RELATIONS)}`,
      `Service souhaité      : ${libelle(demande.service, SERVICES_DEMANDES)}`,
      `Type de rendez-vous   : ${libelle(demande.typeRendezVous, TYPES_RENDEZ_VOUS)}`,
      `Délai souhaité        : ${demande.urgence ? libelle(demande.urgence, NIVEAUX_URGENCE) : "non précisé"}`,
      `Niveau GIR            : ${demande.gir ? libelle(demande.gir, GIR) : "non communiqué"}`
    )
  }

  if (demande.situation) {
    lignes.push("", "Situation décrite :", demande.situation)
  }

  return lignes.join("\n")
}
