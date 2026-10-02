import type { IconName } from "@/components/icon"

/**
 * L'Orienteur — le composant différenciant du site.
 *
 * Les trois concurrents du secteur (adapa01, petits-fils, ouihelp) placent au
 * même endroit une rangée de cercles d'icônes multicolores intitulée « nos
 * prestations ». Ils organisent donc l'entrée du site par le CATALOGUE.
 *
 * Or une famille n'arrive pas en pensant « je cherche un accueil de jour ».
 * Elle arrive en pensant « mon père ne peut plus rester seul la journée ».
 * Le brief le dit deux fois : les questions récurrentes au téléphone (§2) sont
 * toutes des situations, et la priorité UX n°3 (§20) est « savoir si la
 * situation de son proche peut correspondre ».
 *
 * D'où l'entrée par la SITUATION, formulée dans les mots du visiteur. Chaque
 * situation ouvre trois choses et rien de plus : ce que nous proposons, ce qui
 * se passe ensuite, une seule action. Pas de score, pas de questionnaire à
 * étapes, pas de formulaire déguisé.
 */

export type Situation = {
  id: string
  /** La phrase du visiteur. Reste à la première personne, sans jargon. */
  phrase: string
  icone: IconName
  /** Le nom du service concerné. */
  reponseTitre: string
  /** Pourquoi ce service répond à cette situation. Deux phrases maximum. */
  reponseTexte: string
  /** Ce qui se passe concrètement après la prise de contact. */
  ensuite: string
  action: {
    libelle: string
    href: string
  }
  /** Parcours urgence : bascule la couleur et le canal de contact. */
  urgent?: boolean
}

export const situations: Situation[] = [
  {
    id: "isolement",
    phrase: "Mon proche vit seul et je le sens s'isoler.",
    icone: "lien",
    reponseTitre: "Service à la personne à domicile",
    reponseTexte:
      "Quelqu'un passe régulièrement, à des jours convenus. La personne garde son domicile et ses habitudes, et la semaine retrouve des points fixes.",
    ensuite:
      "Nous venons évaluer la situation chez elle, avec vous si vous le souhaitez, puis nous convenons ensemble d'un rythme.",
    action: {
      libelle: "Voir le service à domicile",
      href: "/nos-services#service-a-domicile",
    },
  },
  {
    id: "journee",
    phrase: "Mon proche ne peut plus rester seul la journée.",
    icone: "service-jour",
    reponseTitre: "Accueil de jour",
    reponseTexte:
      "La personne est accueillie dans la structure pendant la journée et rentre chez elle le soir. Elle retrouve du monde et un cadre, sans quitter son logement.",
    ensuite:
      "Vous venez visiter les lieux avec elle, puis nous proposons une première journée pour faire connaissance.",
    action: {
      libelle: "Voir l'accueil de jour",
      href: "/nos-services#accueil-de-jour",
    },
  },
  {
    id: "hospitalisation",
    phrase: "Je sors mon proche d'hospitalisation et le domicile n'est pas prêt.",
    icone: "hopital",
    reponseTitre: "Hébergement temporaire",
    reponseTexte:
      "Un séjour court, avec une date de début et une date de sortie posées dès le départ. Le temps de reprendre des forces et d'organiser le retour.",
    ensuite:
      "Appelez-nous : nous regardons ensemble si nous pouvons accompagner correctement la personne, et nous fixons les dates.",
    action: {
      libelle: "Voir l'hébergement temporaire",
      href: "/nos-services#hebergement-temporaire",
    },
  },
  {
    id: "repit",
    phrase: "J'accompagne mon parent tous les jours et je n'en peux plus.",
    icone: "repit",
    reponseTitre: "Accueil de jour ou hébergement temporaire",
    reponseTexte:
      "Selon la durée dont vous avez besoin : des journées libres chaque semaine, ou un séjour complet qui vous permet de vous arrêter vraiment.",
    ensuite:
      "Dites-nous simplement de combien de temps vous avez besoin. Nous vous dirons laquelle des deux solutions convient.",
    action: {
      libelle: "Demander un temps de répit",
      href: "/prendre-rendez-vous",
    },
  },
  {
    id: "urgence",
    phrase: "C'est aujourd'hui, je ne sais pas quoi faire.",
    icone: "service-urgence",
    reponseTitre: "Situation urgente",
    reponseTexte:
      "Un accueil peut être envisagé, après évaluation de la situation. Nous vous répondrons franchement, y compris si nous ne pouvons pas accueillir.",
    ensuite:
      "Appelez-nous, n'écrivez pas : un message écrit peut attendre plusieurs heures avant d'être lu.",
    action: {
      libelle: "Lire la procédure d'urgence",
      href: "/nos-services#hebergement-urgence",
    },
    urgent: true,
  },
]
