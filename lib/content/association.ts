import type { IconName } from "@/components/icon"

/**
 * Le récit de l'association : origine, publics, parcours, compétences, valeurs.
 *
 * Tout ce qui suit est dérivé du brief. Aucun nom de professionnel, aucun
 * diplôme, aucun agrément, aucune certification : le brief §7 l'interdit
 * explicitement tant que la liste n'est pas validée. Les compétences sont donc
 * décrites par métier, jamais par personne.
 */

/* --------------------------------------------------------------------------
   POURQUOI L'ASSOCIATION EXISTE
   -------------------------------------------------------------------------- */
export const origine = {
  constat:
    "En exerçant comme infirmière libérale, Corrine William a vu revenir la même chose chez beaucoup de ses patients : les soins étaient assurés, et pourtant quelque chose manquait. Des journées sans personne à qui parler. Un logement qui devient trop grand. Une famille qui fait ce qu'elle peut, à distance, en s'épuisant. Et aucune solution disponible le jour où rentrer chez soi n'est plus possible tout de suite.",
  reponse:
    "L'association est née de ce constat. Elle ne remplace pas le soin : elle ajoute ce que le soin ne couvre pas. La présence, le lien, l'accompagnement social, et une solution de repli quand le domicile ne suffit plus, pour un temps ou pour une nuit.",
  paragraphes: [
    {
      titre: "Le médical et l'humain ne se séparent pas",
      texte:
        "Une personne bien soignée mais seule ne va pas bien. L'association a été fondée par une professionnelle de santé, et cette origine se voit dans la façon de travailler : les besoins sont observés avec un regard soignant, et traités avec des moyens humains et sociaux.",
      icone: "medical-humain" as IconName,
    },
    {
      titre: "Nous n'écartons pas les situations lourdes",
      texte:
        "L'association peut accompagner des personnes classées de GIR 1 à GIR 4, c'est-à-dire des situations allant d'une perte d'autonomie importante à une autonomie partielle. Chaque situation est évaluée individuellement, en fonction de nos capacités réelles et de nos conditions d'admission.",
      icone: "accessibilite" as IconName,
    },
    {
      titre: "La famille fait partie de l'accompagnement",
      texte:
        "Ce sont presque toujours les proches qui appellent, et ce sont eux qui portent la charge au quotidien. Nous les tenons informés, nous répondons à leurs questions, et nous considérons leur épuisement comme un motif d'intervention légitime.",
      icone: "famille" as IconName,
    },
    {
      titre: "Une association, pas une entreprise de services",
      texte:
        "L'association est régie par la loi de 1901. Elle n'a pas d'actionnaire à rémunérer, et ce que nous facturons sert l'accompagnement. Cela ne nous dispense pas d'être rigoureux : c'est précisément ce qui nous y oblige.",
      icone: "association" as IconName,
    },
  ],
} as const

/* --------------------------------------------------------------------------
   VALEURS
   Six, pas onze. Le brief §8 en liste onze : les afficher toutes dilue le
   propos et ressemble à une page de valeurs générique.
   -------------------------------------------------------------------------- */
export const valeurs: { titre: string; texte: string; icone: IconName }[] = [
  {
    titre: "Dignité",
    texte:
      "Une personne dépendante reste une personne adulte. Nous ne parlons pas à sa place, nous ne décidons pas sans elle, et nous ne la réduisons jamais à son niveau d'autonomie.",
    icone: "dignite",
  },
  {
    titre: "Écoute",
    texte:
      "Le premier échange sert à comprendre, pas à vendre. Beaucoup de familles appellent sans savoir formuler ce dont elles ont besoin : c'est notre travail de le formuler avec elles.",
    icone: "ecoute",
  },
  {
    titre: "Sécurité",
    texte:
      "Des lieux adaptés, une présence continue pendant les heures d'accueil, et des professionnels qui savent repérer ce qui change.",
    icone: "securite",
  },
  {
    titre: "Autonomie",
    texte:
      "Soutenir sans faire à la place. Chaque geste qu'une personne peut encore accomplir seule est un geste qu'il faut lui laisser.",
    icone: "autonomie",
  },
  {
    titre: "Lien social",
    texte:
      "L'isolement abîme la santé aussi sûrement qu'une maladie. Recréer des occasions de voir du monde fait partie de l'accompagnement, pas de l'animation.",
    icone: "lien",
  },
  {
    titre: "Continuité",
    texte:
      "Une situation évolue. L'accompagnement doit pouvoir suivre, changer de forme, s'intensifier ou s'alléger, sans que la famille reparte de zéro.",
    icone: "coordination",
  },
]

/* --------------------------------------------------------------------------
   PUBLICS ACCOMPAGNÉS
   Liste éditoriale, pas grille de cartes (règle du design system). Formulée du
   point de vue de la situation vécue, pour ne pas réduire les personnes à leur
   niveau de dépendance (brief §12.5).
   -------------------------------------------------------------------------- */
export const publics: { titre: string; texte: string }[] = [
  {
    titre: "Personnes âgées vivant seules",
    texte: "Avec ou sans perte d'autonomie déclarée.",
  },
  {
    titre: "Personnes dépendantes ou fragiles",
    texte: "De GIR 1 à GIR 4. Un niveau de dépendance élevé n'exclut pas.",
  },
  {
    titre: "Personnes isolées",
    texte: "Éloignement familial, veuvage, mobilité réduite.",
  },
  {
    titre: "Personnes en situation de handicap",
    texte: "Adultes en situation de handicap, selon la nature de l'accompagnement.",
  },
  {
    titre: "Troubles cognitifs ou maladies apparentées",
    texte: "Mémoire, orientation, langage : un cadre stable aide.",
  },
  {
    titre: "Retour à domicile différé",
    texte: "Après une hospitalisation, pendant des travaux.",
  },
  {
    titre: "Proches et aidants",
    texte: "Accompagnés eux aussi, sans dossier à monter.",
  },
]

/** Explication du sigle GIR. Affichée partout où le sigle apparaît. */
export const explicationGir =
  "La grille AGGIR classe la perte d'autonomie de GIR 1, la plus importante, à GIR 6, la plus légère. Elle est évaluée par une équipe médico-sociale, généralement dans le cadre d'une demande d'APA auprès du département."

/* --------------------------------------------------------------------------
   PARCOURS D'ACCOMPAGNEMENT (brief §12.6)
   Quatre étapes, en timeline. Jamais en grille de cartes.
   -------------------------------------------------------------------------- */
export const parcours: {
  titre: string
  texte: string
  icone: IconName
  /** Ce que la famille a à faire à cette étape. */
  votreRole: string
}[] = [
  {
    titre: "Prendre contact",
    texte:
      "Un appel, un message ou une demande de rendez-vous. Nous ne demandons aucun document médical à cette étape, et aucun dossier n'est nécessaire pour poser une question.",
    icone: "telephone-appel",
    votreRole: "Décrire la situation avec vos mots, même sans savoir quel service demander.",
  },
  {
    titre: "Évaluer la situation",
    texte:
      "Nous recueillons les informations utiles et nous analysons les besoins réels : ce qui manque, à quel moment de la journée, et depuis combien de temps. Selon les cas, cela se fait par téléphone ou lors d'une visite.",
    icone: "demarche",
    votreRole: "Nous dire ce que vous constatez, y compris ce qui vous inquiète sans certitude.",
  },
  {
    titre: "Proposer une solution adaptée",
    texte:
      "Nous vous indiquons ce qui correspond à la situation, en fonction des besoins et de nos possibilités d'accueil. Si nous ne sommes pas la bonne réponse, nous vous le disons et nous vous orientons.",
    icone: "coordination",
    votreRole: "Poser toutes vos questions, y compris celles sur le coût.",
  },
  {
    titre: "Organiser l'accompagnement",
    texte:
      "La prise en charge, l'accueil ou l'hébergement est préparé avec vous : les dates, le rythme, ce qu'il faut apporter, comment se passe la première fois.",
    icone: "agenda",
    votreRole: "Préparer l'arrivée avec nous, et associer la personne concernée à chaque décision.",
  },
]

/* --------------------------------------------------------------------------
   COMPÉTENCES
   Par métier, jamais par personne (brief §7). Aucun nom, aucun diplôme,
   aucune spécialité non validée. Liste confirmée et complétée par le livret
   d'accueil §« Les professionnels de santé » (volet répit : accueil de jour
   et hébergement), en plus des métiers du volet domicile.
   -------------------------------------------------------------------------- */
export const competences: {
  metier: string
  role: string
  icone: IconName
  /**
   * Deux cercles réels autour d'une personne accueillie, pas une catégorie
   * décorative : le brief et le livret d'accueil distinguent déjà les
   * professionnels de santé (soin, prescriptions, suivi médical) du
   * personnel qui fait tourner le lieu de vie au quotidien (repas, hygiène
   * des locaux, activités). La page reprend cette séparation pour donner
   * du rythme à une liste de neuf métiers, sans en inventer le principe.
   */
  groupe: "soin" | "quotidien"
}[] = [
  {
    metier: "Médecin référent",
    role: "Élabore un projet de soins personnalisé dès l'arrivée, en collaboration avec l'équipe soignante et le médecin traitant.",
    icone: "soin-infirmier",
    groupe: "soin",
  },
  {
    metier: "Infirmier coordinateur",
    role: "Coordonne les soins entre les services hospitaliers, les professionnels libéraux et les partenaires de santé, du séjour au retour à domicile.",
    icone: "coordination",
    groupe: "soin",
  },
  {
    metier: "Infirmiers",
    role: "Regard soignant sur l'évolution de l'état de santé, coordination avec le médecin traitant et les professionnels qui suivent déjà la personne.",
    icone: "soin-infirmier",
    groupe: "soin",
  },
  {
    metier: "Aides-soignants",
    role: "Accompagnement des gestes du quotidien, dans le respect de ce que la personne peut encore faire elle-même.",
    icone: "soin",
    groupe: "soin",
  },
  {
    metier: "Kinésithérapeutes",
    role: "Entretien de la mobilité et prévention des chutes, en lien avec les prescriptions existantes.",
    icone: "autonomie",
    groupe: "soin",
  },
  {
    metier: "Orthophonistes",
    role: "Accompagnement du langage et de la déglutition, lorsque ces fonctions sont touchées.",
    icone: "ecoute",
    groupe: "soin",
  },
  /* Auxiliaires de vie et coach sportif ajoutés à la demande de
     l'association (retour du 9 septembre 2026). L'auxiliaire de vie relève
     de l'accompagnement du quotidien, pas du soin médical ; le coach sportif
     est rattaché au même groupe, aux côtés des animateurs. */
  {
    metier: "Auxiliaires de vie familiale et sociale",
    role: "Accompagnement du quotidien à domicile et dans la vie sociale : gestes de la journée, courses, démarches, sorties.",
    icone: "famille",
    groupe: "quotidien",
  },
  {
    metier: "Coach sportif",
    role: "Activité physique adaptée aux capacités de chacun, pour entretenir la mobilité et l'équilibre.",
    icone: "activite",
    groupe: "quotidien",
  },
  {
    metier: "Agent de service",
    role: "Assure l'entretien et l'hygiène des locaux, pour le confort du séjour.",
    icone: "soin",
    groupe: "quotidien",
  },
  {
    metier: "Cuisinière",
    role: "Prépare les repas journaliers selon le régime alimentaire de chacun, en lien avec la diététicienne.",
    icone: "soin",
    groupe: "quotidien",
  },
  {
    metier: "Animateurs",
    role: "Accompagnent la socialisation, la mobilité et le bien-être au quotidien, et organisent les activités et sorties avec l'équipe soignante.",
    icone: "lien",
    groupe: "quotidien",
  },
]

export const noteCompetences =
  "L'association travaille avec ces professionnels ou les associe à l'accompagnement selon les situations. Certaines interventions (sophrologie, orthophonie, podologie) sont prises en charge selon les besoins. La liste exacte des intervenants disponibles et leurs modalités d'intervention seront précisées après validation.";

/**
 * Adhésion déclarative confirmée par le mot de la présidente du livret
 * d'accueil : « Nous sommes adhérents à la charte nationale de qualité des
 * services à la personne. » Ce n'est pas un agrément réglementaire (à la
 * différence du numéro SAP) : le formuler comme une adhésion, jamais comme
 * une certification officielle.
 */
export const charteQualite =
  "L'association a adhéré à la charte nationale de qualité des services à la personne.";

/* --------------------------------------------------------------------------
   SOUTIEN AUX AIDANTS (brief §12.8)
   -------------------------------------------------------------------------- */
export const soutienAidants = {
  chapo:
    "Accompagner un proche s'installe rarement par décision : cela commence par un coup de main, puis devient tous les jours. Vous n'avez pas besoin d'attendre de ne plus y arriver pour appeler.",
  points: [
    {
      titre: "Du temps, réellement libre",
      texte:
        "Des journées d'accueil régulières, ou un séjour complet, sans avoir à rester joignable.",
      icone: "repit" as IconName,
    },
    {
      titre: "Quelqu'un à qui parler",
      texte:
        "Un échange avec un professionnel, sans dossier à monter. Poser une question ne vous engage à rien.",
      icone: "ecoute" as IconName,
    },
    {
      titre: "De l'aide pour s'y retrouver",
      texte:
        "Les démarches sont nombreuses et mal expliquées. Nous vous indiquons vers qui vous tourner, même quand il ne s'agit pas de nous.",
      icone: "demarche" as IconName,
    },
    {
      titre: "Un relais qui tient",
      texte:
        "Une solution organisée à l'avance vaut mieux qu'une solution improvisée dans l'urgence.",
      icone: "securite" as IconName,
    },
  ],
}
