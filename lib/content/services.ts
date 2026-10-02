import type { IconName } from "@/components/icon"

/**
 * Les quatre services de l'association.
 *
 * Cette structure alimente à la fois la page « Nos services », les quatre
 * pages détaillées (route dynamique) et la page d'accueil. Une seule source,
 * pour que le vocabulaire ne dérive jamais d'une page à l'autre.
 *
 * Règles de rédaction appliquées ici, issues du brief :
 *  - §19 : aucun agrément, aucune capacité, aucun délai, aucune promesse
 *    d'admission. Ce qui n'est pas confirmé va dans `aValider`, et le site
 *    l'affiche comme tel au lieu de l'inventer ;
 *  - §19 : jamais « clients ». On dit personnes accompagnées, personnes
 *    accueillies, familles, proches, aidants ;
 *  - §5 : pas de jargon. « GIR » est le seul sigle du site, et il est expliqué
 *    à chaque apparition.
 *
 * Densité : les chapôs, besoins et étapes ont été resserrés d'environ moitié
 * (retour client : trop de texte pour rien). La règle est une idée par
 * phrase, une ou deux phrases par bloc. Aucun fait n'a été retiré : le
 * dossier de préadmission garde ses trois entretiens et ses pièces exigées,
 * les capacités et horaires confirmés restent tels quels.
 *
 * Les phrases de famille (`phraseFamille`) disent « mon proche » et non
 * « elle » ou « il » : la personne accompagnée peut être l'un ou l'autre.
 */

export type BlocTexte = {
  titre: string
  texte: string
}

/** Un besoin auquel le service répond, illustré par une icône (brief §12.4). */
export type BesoinService = BlocTexte & {
  icone: IconName
}

/** Un ensemble de prestations apparentées (le logement, la personne, les démarches). */
export type GroupePrestations = {
  titre: string
  icone: IconName
  items: string[]
}

/** Une étape du déroulé : comme `BlocTexte`, avec une icône qui la représente. */
export type EtapeDeroule = BlocTexte & {
  icone: IconName
}

export type Service = {
  slug: string
  /** Titre de page et H1. */
  titre: string
  /** Version courte pour la navigation et les fils d'ariane. */
  titreCourt: string
  icone: IconName
  /** Méta-description de la page dédiée. */
  metaDescription: string
  /**
   * La phrase que prononce une famille au téléphone. C'est l'entrée par la
   * situation : elle précède toujours le nom du service dans l'affichage.
   */
  phraseFamille: string
  /** Une à deux phrases, utilisées sur l'accueil et la page d'index. */
  resume: string
  /** Paragraphe d'ouverture de la page dédiée. */
  chapo: string
  /** Les besoins auxquels le service répond (brief §12.4). */
  besoins: BesoinService[]
  /** Comment cela se passe concrètement. */
  deroule: EtapeDeroule[]
  /** À qui il s'adresse, en langage courant. */
  pourQui: string[]
  /**
   * Prestations couvertes, quand le service en a une (confirmée par le
   * flyer et le livret d'accueil). Absente pour les services qui ne se
   * décrivent pas ainsi (accueil de jour, hébergement).
   *
   * Regroupée par grand ensemble (le logement, la personne, les démarches) :
   * ce sont les trois familles déjà lisibles dans le libellé de chaque
   * prestation, rendues explicites plutôt que laissées à une grille plate de
   * 11 puces sans hiérarchie.
   */
  prestations?: GroupePrestations[]
  /** Horaires propres à ce service, quand ils diffèrent des horaires de bureau. */
  horaires?: string
  /** Capacité d'accueil confirmée, quand elle l'est. */
  capacite?: string
  /** Mode de tarification, jamais un montant. */
  tarification: string
  /** Ce qui reste à valider avec Corrine avant publication définitive. */
  aValider: string[]
  /** Avertissement affiché en encadré, pour le seul parcours urgence. */
  avertissement?: string
  /**
   * Description de la photo attendue sur cette page. Absente quand la page ne
   * doit pas en porter : c'est le cas de la page urgence, où une image
   * ajouterait du bruit là où la famille cherche une information et un numéro.
   */
  photo?: string
  /** Chemin de la photo livrée dans `public/img-services/`, une fois disponible. */
  photoSrc?: string
  /** Alternatif obligatoire dès que `photoSrc` est renseigné : décrit la scène. */
  photoAlt?: string
}

export const services: Service[] = [
  {
    slug: "service-a-domicile",
    titre: "Service à la personne à domicile",
    titreCourt: "Service à domicile",
    icone: "service-domicile",
    metaDescription:
      "Une présence régulière au domicile des personnes âgées, fragiles ou isolées : accompagnement du quotidien, lien social, relais pour les familles.",
    phraseFamille: "Mon proche vit seul et je le sens s'isoler.",
    resume:
      "Une présence régulière chez la personne, pour rompre l'isolement et soutenir le quotidien sans rien bousculer de ses habitudes.",
    chapo:
      "Rester chez soi est souvent le souhait le plus fort. Quelqu'un passe, régulièrement, à des moments convenus : la personne garde son domicile et son rythme, et rien ne se dégrade en silence.",
    besoins: [
      {
        titre: "Rompre l'isolement",
        texte:
          "Une visite attendue redonne un point fixe à la semaine, avant que la solitude ne pèse sur la santé.",
        icone: "lien",
      },
      {
        titre: "Une présence rassurante",
        texte:
          "Savoir que quelqu'un vient fait baisser l'inquiétude d'un cran, pour la personne comme pour ses proches.",
        icone: "securite",
      },
      {
        titre: "Le quotidien, sans le faire à sa place",
        texte:
          "Organisation, gestes de la journée, papiers, rendez-vous : soutenir l'autonomie, jamais la remplacer.",
        icone: "autonomie",
      },
      {
        titre: "Un relais pour la famille",
        texte:
          "Quand les proches sont loin ou travaillent, nous couvrons les moments qu'ils ne peuvent pas assurer, et nous les tenons informés.",
        icone: "famille",
      },
      {
        titre: "Repérer ce qui change",
        texte:
          "Une intervenante régulière voit ce qu'une visite ponctuelle ne voit pas : une fatigue nouvelle, un repas sauté, un logement moins tenu. Elle en parle et oriente.",
        icone: "oeil",
      },
    ],
    deroule: [
      {
        titre: "Un premier échange",
        texte: "Vous appelez ou vous écrivez. Quelques questions simples, sans dossier médical.",
        icone: "telephone",
      },
      {
        titre: "Une visite d'évaluation",
        texte:
          "Nous rencontrons la personne chez elle, avec vous si vous le souhaitez, pour décider de ce qui est utile et à quelle fréquence.",
        icone: "rencontre",
      },
      {
        titre: "Un rythme convenu ensemble",
        texte:
          "Jours, horaires et contenu des interventions écrits noir sur blanc, ajustables si la situation évolue.",
        icone: "document",
      },
      {
        titre: "Un suivi",
        texte:
          "Nous restons joignables, et nous vous appelons si un changement mérite votre attention.",
        icone: "demarche",
      },
    ],
    pourQui: [
      "Une personne âgée qui vit seule et voit peu de monde",
      "Une personne fragile dont le logement devient difficile à tenir",
      "Une personne dont les proches vivent loin ou travaillent",
      "Une personne qui a besoin d'être accompagnée à ses rendez-vous",
      "Un aidant qui ne peut plus assurer seul toutes les visites",
    ],
    /**
     * Liste confirmée par le flyer (page 2, « Nos services ») et détaillée par
     * le livret d'accueil §4 (« Nos prestations »). Regroupée par grand
     * ensemble plutôt que reprise phrase à phrase du livret.
     */
    prestations: [
      {
        titre: "Le logement",
        icone: "entretien",
        items: [
          "Ménage et entretien courant du logement",
          "Repassage et lavage du linge",
          "Préparation et livraison de repas à domicile",
        ],
      },
      {
        titre: "La personne",
        icone: "soin",
        items: [
          "Aide à la toilette, à l'habillage et aux transferts",
          "Garde à domicile de nuit et garde itinérante",
          "Assistance aux personnes âgées ou en situation de handicap",
          "Garde-malade",
          "Soins esthétiques (coiffure, rasage)",
        ],
      },
      {
        titre: "Les démarches",
        icone: "document",
        items: [
          "Accompagnement ou conduite du véhicule (rendez-vous, courses, visites)",
          "Assistance administrative (courriers, factures, démarches)",
          "Assistance informatique",
        ],
      },
    ],
    tarification:
      "Tarif horaire, selon la nature et la durée des interventions. Un devis est établi après la visite d'évaluation.",
    aValider: [
      "La zone géographique couverte",
      "Les jours et horaires d'intervention possibles",
      "Le tarif horaire",
    ],
    photo:
      "Un moment de présence au domicile : une intervenante et une personne âgée assises à une table, en conversation, dans une pièce lumineuse. Pas de blouse, pas de matériel médical visible.",
    photoSrc: "/img-services/service-domicile.png",
    photoAlt:
      "Une intervenante et une personne âgée assises à une table, en conversation dans une pièce lumineuse.",
  },
  {
    slug: "accueil-de-jour",
    titre: "Accueil de jour",
    titreCourt: "Accueil de jour",
    icone: "service-jour",
    metaDescription:
      "Accueil de jour pour personnes âgées et personnes dépendantes : activités, lien social et cadre sécurisé la journée, retour au domicile le soir.",
    phraseFamille: "Mon proche ne peut plus rester seul la journée.",
    resume:
      "La personne est accueillie dans la structure pendant la journée et rentre chez elle le soir. Elle retrouve du monde, la famille retrouve du souffle.",
    chapo:
      "Passer huit ou dix heures seul devient parfois trop long, ou trop risqué, sans que quitter son domicile soit la bonne réponse. La personne vient, participe, déjeune, discute, et rentre dormir chez elle.",
    besoins: [
      {
        titre: "Retrouver du monde",
        texte:
          "Des visages connus, des conversations, des habitudes de groupe : le lien social se reconstruit par la régularité.",
        icone: "rencontre",
      },
      {
        titre: "Entretenir ce qui fonctionne encore",
        texte:
          "Mémoire, gestes, langage, mobilité : des activités qui préservent les capacités existantes, rien d'infantilisant.",
        icone: "activite",
      },
      {
        titre: "Un cadre sécurisé",
        texte:
          "Un lieu adapté et une présence continue, précieux en cas de troubles de la mémoire ou de l'orientation.",
        icone: "securite",
      },
      {
        titre: "Du temps pour les proches",
        texte:
          "Un aidant qui sait son parent bien accompagné peut travailler, se reposer, souffler. C'est ce qui permet de tenir.",
        icone: "repit",
      },
      {
        titre: "Une étape, pas une bascule",
        texte:
          "Souvent, cela repousse une décision plus lourde, ou permet de l'aborder plus sereinement.",
        icone: "evolution",
      },
    ],
    deroule: [
      {
        titre: "Une visite avant de décider",
        texte:
          "Vous venez voir les lieux avec la personne concernée. Voir avant de choisir change tout.",
        icone: "rencontre",
      },
      {
        titre: "Une ou deux journées d'essai",
        texte: "La première venue sert à faire connaissance, pas à valider un dossier.",
        icone: "service-jour",
      },
      {
        titre: "Un rythme régulier",
        texte:
          "Une ou plusieurs journées par semaine, aux mêmes jours autant que possible.",
        icone: "horaires",
      },
      {
        titre: "Le retour à la maison",
        texte:
          "La personne rentre chez elle le soir. Le trajet se règle avec nous à l'inscription.",
        icone: "accueil",
      },
    ],
    pourQui: [
      "Une personne qui reste seule de longues heures dans la journée",
      "Une personne qui s'isole et perd le goût de sortir",
      "Une personne présentant des troubles de la mémoire ou de l'orientation",
      "Un aidant qui a besoin de journées libres, régulièrement",
      "Une famille qui cherche une solution avant d'envisager un hébergement",
    ],
    /**
     * Horaires et capacité confirmés par le livret d'accueil §« Notre
     * organisation » : structure ouverte 24h/24 7j/7, accueil de jour de 9h
     * à 17h, 10 places en journée.
     */
    horaires: "Arrivée à 9h00, départ échelonné jusqu'à 17h00.",
    capacite: "10 places en journée.",
    tarification:
      "Forfait à la journée. Les modalités de repas et de transport, si elles existent, sont facturées à part.",
    aValider: [
      "Le contenu précis des activités proposées",
      "L'existence et les modalités d'un transport",
      "Le forfait journalier",
    ],
    photo:
      "Une activité en petit groupe dans une salle lumineuse : quatre ou cinq personnes autour d'une table, une animatrice debout. Expressions naturelles, pas de pose.",
    photoSrc: "/img-services/accueil-de-jour.png",
    photoAlt:
      "Un petit groupe de personnes âgées autour d'une table pendant une activité, dans une salle lumineuse.",
  },
  {
    slug: "hebergement-temporaire",
    titre: "Hébergement temporaire",
    titreCourt: "Hébergement temporaire",
    icone: "service-sejour",
    metaDescription:
      "Hébergement temporaire pour personnes âgées et personnes dépendantes : sortie d'hospitalisation, absence d'un aidant, répit familial, transition.",
    phraseFamille: "Je sors mon proche d'hospitalisation vendredi.",
    resume:
      "Un séjour de courte durée, quand rentrer à la maison n'est pas encore possible ou quand il n'y a personne pour prendre le relais.",
    chapo:
      "Ni maintien à domicile, ni entrée définitive en établissement : un entre-deux, avec une date de début et une date de fin. La personne est logée et accompagnée le temps nécessaire, et ce temps est posé dès le départ.",
    besoins: [
      {
        titre: "Une sortie d'hospitalisation",
        texte:
          "L'hôpital laisse partir, le domicile n'est pas prêt. Quelques jours ou quelques semaines pour reprendre des forces et organiser la suite.",
        icone: "hopital",
      },
      {
        titre: "L'absence d'un aidant",
        texte:
          "Hospitalisation dans la famille, déplacement, imprévu : le relais est assuré, sans improvisation.",
        icone: "soignant",
      },
      {
        titre: "Un logement momentanément inhabitable",
        texte:
          "Travaux, panne de chauffage, dégât des eaux, adaptation en cours : le temps de régler le problème.",
        icone: "service-domicile",
      },
      {
        titre: "Un répit familial",
        texte:
          "Un séjour permet à l'aidant de s'arrêter vraiment, sans culpabilité et sans laisser un vide.",
        icone: "repit",
      },
      {
        titre: "Une transition",
        texte:
          "Une autre solution est décidée mais pas encore disponible, ou la famille a besoin de temps pour la préparer.",
        icone: "evolution",
      },
    ],
    deroule: [
      {
        titre: "Vous nous exposez la situation",
        texte:
          "Par téléphone de préférence : plus rapide, et on y dit ce qu'on n'écrit pas dans un formulaire.",
        icone: "telephone",
      },
      {
        titre: "Nous évaluons ensemble",
        texte:
          "Pouvons-nous accompagner correctement la personne ? Dire non quand ce n'est pas adapté fait partie du travail.",
        icone: "rencontre",
      },
      {
        titre: "Nous fixons les dates",
        texte: "Arrivée, durée, sortie prévue : ajustables, mais écrites.",
        icone: "agenda",
      },
      {
        titre: "Nous préparons l'arrivée avec vous",
        texte:
          "Quoi apporter, ce qui est déjà sur place, comment se passe la première journée.",
        icone: "service-sejour",
      },
      {
        titre: "Un dossier de préadmission",
        texte:
          "Trois entretiens : remise du dossier, étude, signature du contrat d'accueil. Pièces d'identité, justificatifs de ressources et documents médicaux (dossier du médecin traitant, ordonnances) sont indispensables.",
        icone: "document",
      },
    ],
    pourQui: [
      "Une personne qui sort d'hospitalisation et ne peut pas rentrer seule",
      "Une personne dont l'aidant est momentanément absent",
      "Une personne dont le logement est temporairement inadapté",
      "Un aidant familial qui a besoin d'un vrai temps d'arrêt",
      "Une famille en attente d'une solution plus durable",
    ],
    /**
     * Capacité et horaires de visite confirmés par le livret d'accueil
     * §« Notre organisation » : structure ouverte 24h/24 7j/7, 8 places
     * d'hébergement, visites du lundi au samedi de 15h30 à 17h30.
     */
    capacite: "8 places.",
    horaires: "Visites du lundi au samedi, de 15h30 à 17h30.",
    tarification:
      "Tarif journalier. La durée du séjour et les prestations incluses déterminent le montant total, précisé avant l'arrivée.",
    aValider: [
      "La durée maximale d'un séjour",
      "Les conditions d'admission propres à chaque situation",
      "Ce qui est inclus dans le tarif journalier",
      "Le délai habituel entre la demande et l'accueil",
    ],
    photo:
      "Une chambre claire et habitée, avec des objets personnels : ni chambre d'hôpital, ni chambre d'hôtel. Lumière naturelle, fenêtre visible.",
    /**
     * ATTENTION : image RECONSTITUÉE, pas une photographie de la structure.
     *
     * L'original fourni par l'association (`chambre-triple.webp`, conservé)
     * est la photographie d'un tirage papier : grain d'impression, reflets et
     * voile blanchâtre irrécupérables par retouche. Sur demande explicite du
     * client (13 septembre 2026), la scène a été régénérée en qualité photo à
     * partir de cet original comme référence : même disposition, même
     * mobilier, mêmes couleurs, même point de vue.
     *
     * Conséquence à ne pas perdre de vue : les détails sont recréés, ce n'est
     * donc pas une preuve de l'état réel des lieux. À remplacer par une vraie
     * prise de vue dès que l'association en fournit une (question 17 du
     * questionnaire client), et à faire valider par Corrine avant la mise en
     * ligne sur le domaine définitif.
     */
    photoSrc: "/images/chambre-triple-hd.webp",
    photoAlt:
      "Une chambre de la structure : lits médicalisés à hauteur réglable, poignées de redressement, grande fenêtre ouverte sur la végétation.",
  },
  {
    slug: "hebergement-urgence",
    titre: "Hébergement d'urgence",
    titreCourt: "Hébergement d'urgence",
    icone: "service-urgence",
    metaDescription:
      "Situation urgente concernant une personne âgée ou dépendante : comment nous joindre, ce que nous pouvons envisager, et les limites de notre intervention.",
    phraseFamille: "C'est aujourd'hui, je ne sais pas quoi faire.",
    resume:
      "Quand une situation ne peut pas attendre, un accueil peut être envisagé. Cela passe par un appel, et par une évaluation, jamais par un formulaire.",
    chapo:
      "Une chute, une hospitalisation soudaine dans la famille, un domicile devenu dangereux du jour au lendemain. Nous prenons ces situations au sérieux, et nous préférons vous dire tout de suite comment cela fonctionne plutôt que de laisser croire à une place garantie.",
    besoins: [
      {
        titre: "Ce que nous appelons une situation urgente",
        texte:
          "Le domicile devient risqué à très court terme, l'aidant principal ne peut plus assurer la présence, ou la personne se retrouve sans solution d'un jour à l'autre.",
        icone: "warning",
      },
      {
        titre: "Ce qu'il faut nous dire au téléphone",
        texte:
          "Votre lien avec la personne, ce qui s'est passé et depuis quand, si elle est seule, et si un professionnel de santé suit déjà la situation.",
        icone: "telephone-appel",
      },
      {
        titre: "Ce que nous faisons ensuite",
        texte:
          "Nous évaluons avec vous et nous vous disons franchement ce que nous pouvons faire. Sinon, nous cherchons avec vous vers qui vous tourner.",
        icone: "demarche",
      },
    ],
    deroule: [
      {
        titre: "Appelez, n'écrivez pas",
        texte:
          "Un message écrit peut attendre des heures. Dans l'urgence, seul le téléphone convient.",
        icone: "telephone-appel",
      },
      {
        titre: "Nous évaluons immédiatement",
        texte:
          "Quelques questions suffisent à savoir si un accueil est envisageable, et à quelles conditions.",
        icone: "demarche",
      },
      {
        titre: "Nous répondons clairement",
        texte: "Oui, non, ou pas tout de suite. Jamais une attente sans réponse.",
        icone: "check",
      },
      {
        titre: "Nous organisons ou nous orientons",
        texte:
          "Si l'accueil est possible, nous préparons l'arrivée. Sinon, nous vous indiquons les autres démarches à engager.",
        icone: "orienteur",
      },
    ],
    pourQui: [
      "Un proche confronté à une situation qui se dégrade en quelques heures",
      "Une famille dont l'aidant principal vient d'être hospitalisé",
      "Un professionnel de santé qui cherche une solution rapide pour un patient",
      "Une personne dont le domicile est devenu subitement inhabitable",
    ],
    tarification:
      "Les mêmes modalités que l'hébergement temporaire s'appliquent. Rien n'est demandé avant que la situation ait été évaluée.",
    aValider: [
      "Les horaires pendant lesquels un appel urgent peut être traité",
      "Le délai de réponse que l'association peut réellement tenir",
      "Le numéro dédié aux situations urgentes, s'il diffère du numéro principal",
      "La procédure interne en cas d'urgence",
    ],
    avertissement:
      "Aucune admission n'est garantie sans évaluation préalable de la situation, et nous ne pouvons pas promettre un accueil immédiat. Si la personne est en danger immédiat ou si son état de santé se dégrade, appelez le 15 (SAMU) ou le 112.",
    /* Ce service vivait auparavant sur sa propre page dédiée, sans photo :
       une image y aurait ajouté du bruit à côté d'un numéro qu'une famille en
       urgence cherche avant tout. Sur la page unique « Nos services », ce
       bloc n'est plus qu'une section parmi quatre dans un rythme continu ; y
       garder le seul bloc sans photo casse ce rythme plus qu'il ne protège
       quoi que ce soit. Même image sobre que la carte d'accueil
       (services-orienteur.tsx) : un détail de téléphone, non anxiogène,
       cohérent avec les trois autres photos de service. */
    photo:
      "Gros plan sur une main composant un numéro de téléphone, ambiance calme, sans mise en scène d'urgence.",
    photoSrc: "/img-services/hebergement-urgence.jpg",
    photoAlt:
      "Gros plan sur une main composant un numéro de téléphone, ambiance calme.",
  },
]

export function serviceParSlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export const slugsServices = services.map((s) => s.slug)
