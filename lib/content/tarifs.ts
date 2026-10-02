/**
 * Tarifs.
 *
 * La page explique COMMENT se construit un coût, elle n'affiche aucun montant.
 * Le brief est catégorique (§12.10 et §19) : ne jamais publier de prise en
 * charge financière non confirmée, d'aide publique non vérifiée, de
 * remboursement non validé ni de reste à charge approximatif présenté comme
 * certain. La grille tarifaire doit être obtenue auprès de Corrine.
 *
 * Une page tarifs sans montant peut sembler frustrante. Elle l'est moins qu'un
 * montant faux : une famille qui découvre au téléphone que le prix affiché
 * n'était pas le bon perd sa confiance, et le site aurait travaillé contre
 * l'association.
 */

import type { IconName } from "@/components/icon"

export type ModeTarification = {
  service: string
  /**
   * Slug du service dans lib/content/services.ts. Sert à la fois de lien
   * (`/nos-services#slug`, la page unique n'ayant plus de route dédiée par
   * service) et d'ancre posée sur la ligne/carte correspondante de cette
   * page (`id={slug}`), pour qu'un bouton « Voir le tarif » posé sur un
   * service précis atterrisse directement sur la bonne ligne.
   */
  slug: string
  /** Icône du service, reprise de lib/content/services.ts pour ancrer visuellement la rangée. */
  icone: IconName
  unite: string
  base: string
  /** Ce qui fait varier le montant. */
  variables: string[]
}

export const modesTarification: ModeTarification[] = [
  {
    service: "Service à la personne à domicile",
    slug: "service-a-domicile",
    icone: "service-domicile",
    unite: "Tarif horaire",
    base: "Le temps passé au domicile",
    variables: [
      "La durée de chaque intervention",
      "Le nombre d'interventions par semaine",
      "La nature de l'accompagnement",
      "Le jour et l'horaire, selon les modalités retenues",
    ],
  },
  {
    service: "Accueil de jour",
    slug: "accueil-de-jour",
    icone: "service-jour",
    unite: "Forfait journalier",
    base: "La journée d'accueil",
    variables: [
      "Le nombre de journées par semaine",
      "Les repas, s'ils sont facturés séparément",
      "Le transport, s'il est proposé",
    ],
  },
  {
    service: "Hébergement temporaire",
    slug: "hebergement-temporaire",
    icone: "service-sejour",
    unite: "Tarif journalier",
    base: "La nuitée, accompagnement inclus",
    variables: [
      "La durée totale du séjour",
      "Les prestations comprises dans le tarif",
    ],
  },
  {
    service: "Hébergement d'urgence",
    slug: "hebergement-urgence",
    icone: "service-urgence",
    unite: "Tarif journalier",
    base: "Les mêmes modalités que l'hébergement temporaire",
    variables: [
      "Rien n'est demandé avant que la situation ait été évaluée",
    ],
  },
]

export const etapesDevis: { titre: string; texte: string; icone: IconName }[] = [
  {
    titre: "Un premier échange, gratuit",
    texte:
      "Vous décrivez la situation, nous vous indiquons quel service correspond et sur quelle base il se facture. Rien n'est engagé.",
    icone: "telephone-appel",
  },
  {
    titre: "Une évaluation de la situation",
    texte:
      "Selon le service, par téléphone ou lors d'une visite. C'est cette étape qui détermine le volume d'accompagnement réellement nécessaire, donc le coût.",
    icone: "evaluation",
  },
  {
    titre: "Un devis écrit",
    texte:
      "Détaillé, avec l'unité de facturation, le volume prévu et le total. Vous le lisez chez vous, vous en parlez à qui vous voulez, et vous décidez après.",
    icone: "devis",
  },
  {
    titre: "Un accompagnement qui peut évoluer",
    texte:
      "Si les besoins changent, le devis est revu. Vous n'êtes pas engagé sur un volume qui ne correspond plus à la situation.",
    icone: "evolution",
  },
]

/**
 * `titre` : intitulé court affiché sur le trigger de l'accordéon
 * (components/sections/engagements-accordion.tsx). `texte` : la phrase
 * complète, inchangée, lue dans le panneau déplié — jamais raccourcie,
 * chaque mot y reste opposable tel quel.
 */
export const pointsDeVigilance: { titre: string; texte: string }[] = [
  {
    titre: "Aucun montant publié à l'avance",
    texte:
      "Nous n'affichons aucun montant sur ce site tant que la grille tarifaire n'est pas arrêtée. Un prix approximatif publié comme s'il était certain n'aide personne.",
  },
  {
    titre: "Aucune aide annoncée sans vérification",
    texte:
      "Nous ne vous annoncerons pas une aide financière avant d'avoir vérifié qu'elle s'applique réellement à votre situation et à nos prestations.",
  },
  {
    titre: "Aucun paiement avant le devis",
    texte:
      "Nous ne demandons aucun paiement, aucun acompte et aucune information bancaire avant la signature d'un devis.",
  },
]

/**
 * Dispositifs de financement confirmés par le livret d'accueil §« Financements »
 * et le flyer. Nommés tels quels, sans jamais indiquer un montant, un taux de
 * prise en charge ou une garantie d'éligibilité : ces éléments dépendent de la
 * situation de chacun et sont évalués au cas par cas par l'organisme concerné.
 *
 * Rendu en accordéon dans app/tarifs/page.tsx : chaque nom est déjà une
 * question implicite (« est-ce que ça s'applique chez moi ? »), le format
 * qui déplie l'explication au clic évite d'imposer la lecture des six textes
 * à quelqu'un qui n'en cherche qu'un.
 *
 * `textes` : plusieurs paragraphes par dispositif, qui verse, pour qui, et
 * comment la demande s'articule avec l'accompagnement. Le deuxième
 * paragraphe explique le mécanisme, jamais un montant ou un taux : ce qui
 * distingue les dispositifs entre eux, c'est qui les instruit et à quel
 * moment les solliciter, pas leur valeur en euros.
 */
export const dispositifsFinancement: { nom: string; textes: string[] }[] = [
  {
    nom: "APA (Allocation Personnalisée à l'Autonomie)",
    textes: [
      "Versée par le conseil départemental aux personnes de plus de 60 ans en perte d'autonomie, à leur domicile ou en établissement.",
      "Le degré de perte d'autonomie est mesuré par la grille GIR (groupe iso-ressources) lors d'une évaluation à domicile par une équipe médico-sociale du département. C'est ce classement qui ouvre le droit à l'allocation, pas la demande elle-même.",
    ],
  },
  {
    nom: "PCH (Prestation de Compensation du Handicap)",
    textes: [
      "Versée par le conseil départemental aux personnes en situation de handicap, pour financer les aides humaines, techniques ou l'aménagement du logement que leur situation rend nécessaires.",
      "La demande passe par la maison départementale des personnes handicapées (MDPH), qui évalue les besoins avant d'ouvrir le droit. Elle peut se cumuler avec d'autres aides selon la situation.",
    ],
  },
  {
    nom: "Services ménagers (aide sociale départementale)",
    textes: [
      "Destinés aux personnes dont les ressources sont inférieures au barème de l'aide sociale départementale, pour financer une aide à l'entretien du logement et à la vie quotidienne.",
      "La demande se dépose auprès du centre communal d'action sociale (CCAS) ou directement des services du département, qui étudie le dossier sur critères de ressources.",
    ],
  },
  {
    nom: "Prise en charge par la caisse de retraite",
    textes: [
      "Après évaluation du nombre d'heures nécessaires à domicile, renouvelable chaque année selon les ressources et l'évolution de la situation.",
      "C'est la caisse de retraite de la personne accompagnée (régime général ou régime complémentaire) qui instruit la demande ; le nombre d'heures accordées peut varier d'une année à l'autre.",
    ],
  },
  {
    nom: "Mutuelle ou assurance",
    textes: [
      "Certains contrats couvrent une aide à domicile sur une période définie, notamment à la sortie d'une hospitalisation.",
      "Les conditions dépendent entièrement du contrat souscrit : durée de prise en charge, nombre d'heures, délai de carence. Nous vous invitons à vérifier ces points directement auprès de votre mutuelle ou assureur avant l'intervention.",
    ],
  },
  {
    nom: "Crédit d'impôt de 50 %",
    textes: [
      "Dispositif fiscal national applicable aux dépenses de services à la personne, avec possibilité d'avance immédiate via l'Urssaf sous réserve d'éligibilité.",
      "Il s'applique après paiement, sur la déclaration de revenus, sauf option pour l'avance immédiate qui déduit la part prise en charge directement de la facture. Les conditions d'éligibilité à cette avance sont fixées par l'Urssaf, pas par l'association.",
    ],
  },
]
