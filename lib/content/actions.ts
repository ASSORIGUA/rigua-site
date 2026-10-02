import type { IconName } from "@/components/icon"

/**
 * Nos actions et actualités.
 *
 * Deux contenus distincts, et la distinction est volontaire.
 *
 * 1. `typesActions` : ce que l'association organise au fil de l'année. C'est du
 *    contenu éditorial durable, dérivé du brief §6.5. Il est vrai aujourd'hui.
 *
 * 2. `actualites` : le flux daté. Le brief §19 interdit d'inventer des
 *    événements, des partenariats ou des bilans. Les trois entrées ci-dessous
 *    portent donc `exemple: true` et s'affichent avec une mention visible
 *    « exemple de mise en page ». Elles montrent à Corrine la forme que
 *    prendront ses publications, sans faire passer une invention pour un fait.
 *
 * Publier une vraie actualité : ajouter une entrée SANS `exemple`, et retirer
 * les exemples. Les entrées d'exemple disparaissent automatiquement de la page
 * dès qu'une vraie actualité existe (voir `actualitesAffichables`).
 */

export const typesActions: {
  titre: string
  texte: string
  icone: IconName
}[] = [
  {
    titre: "Ateliers",
    texte:
      "Des séances en petit groupe, à jour et heure fixes. La régularité compte autant que le contenu : c'est elle qui transforme une activité en repère dans la semaine.",
    icone: "atelier",
  },
  {
    titre: "Sorties",
    texte:
      "Sortir du logement et de la structure, même pour peu de temps. Un déplacement préparé et accompagné reste possible bien plus longtemps qu'on ne le croit.",
    icone: "sortie",
  },
  {
    titre: "Temps de rencontre",
    texte:
      "Des moments où les personnes accompagnées, les familles et les professionnels se retrouvent ensemble. C'est souvent là que les proches se rendent compte qu'ils ne sont pas les seuls.",
    icone: "rencontre",
  },
  {
    titre: "Nouveaux projets",
    texte:
      "L'association a environ un an. Des services et des actions se mettent en place progressivement, et cette page suivra leur avancement.",
    icone: "note",
  },
]

export type Actualite = {
  slug: string
  titre: string
  /** Date ISO. Sert au tri, à <time> et au sitemap. */
  date: string
  categorie: "Atelier" | "Sortie" | "Rencontre" | "Projet" | "Vie de l'association"
  /** Une à deux phrases pour la liste. */
  resume: string
  /** Corps de l'article, un paragraphe par entrée. */
  paragraphes: string[]
  /** Description de la photo attendue. */
  photo?: string
  /** Chemin de la photo livrée dans `public/img-actualites/`, une fois disponible. */
  photoSrc?: string
  /** Alternatif obligatoire dès que `photoSrc` est renseigné : décrit la scène. */
  photoAlt?: string
  /**
   * Seconde photo, affichée dans le corps de l'article seulement (jamais dans
   * la vignette de liste, qui reste à une image pour garder des cartes de
   * hauteur régulière).
   */
  photoSecondaireSrc?: string
  /** Obligatoire dès que `photoSecondaireSrc` est renseigné. */
  photoSecondaireAlt?: string
  /**
   * Entrée de démonstration, pas un fait. Affichée avec une mention explicite,
   * et masquée dès qu'une vraie actualité est publiée.
   */
  exemple?: true
}

export const actualites: Actualite[] = [
  /**
   * Première actualité réelle. Photos fournies par l'association et
   * remasterisées (les originaux étaient des clichés de téléphone).
   *
   * ATTENTION : `actualitesAffichables` masque toutes les entrées `exemple`
   * dès qu'une entrée réelle existe. Publier celle-ci retire donc les cinq
   * exemples de mise en page du site. C'est le comportement voulu, mais il
   * suppose que les autorisations écrites des personnes reconnaissables sur
   * ces deux photos soient bien signées (règle non négociable de la rubrique,
   * voir docs/photos-a-fournir.md).
   */
  {
    slug: "sortie-champetre",
    titre: "Une journée à la campagne",
    date: "2026-08-30",
    categorie: "Sortie",
    resume:
      "Un déjeuner partagé en plein air, préparé sur place, et un sorbet tourné à la main devant tout le monde.",
    paragraphes: [
      "La journée s'est tenue à l'ombre, autour de deux grandes tables installées sous un barnum. Le repas a été préparé sur place et servi à la même heure pour tout le monde, sans service en décalé : c'est ce qui fait qu'une sortie ressemble à un repas de famille plutôt qu'à une prestation.",
      "Un des participants a tourné le sorbet coco à la sorbetière, à la main, pendant que les autres attendaient leur part. Ce genre de moment ne se programme pas dans un planning d'animation : il arrive parce que le cadre le permet.",
      "Les personnes accompagnées, les proches et les intervenants étaient présents ensemble, sans distinction de table.",
    ],
    photo:
      "Le repas sous le barnum, personnes attablées, lumière naturelle, aucune pose.",
    photoSrc: "/images/sortie-repas.webp",
    photoAlt:
      "Des personnes âgées et leurs accompagnants attablés sous un barnum en plein air, en conversation avant le repas.",
    photoSecondaireSrc: "/images/sortie-sorbetiere.webp",
    photoSecondaireAlt:
      "Un participant tourne à la main une sorbetière en bois, assis à l'ombre d'un arbre, entouré du groupe.",
  },
  {
    slug: "exemple-atelier-memoire",
    titre: "Un atelier mémoire chaque semaine",
    date: "2026-06-15",
    categorie: "Atelier",
    resume:
      "Une séance hebdomadaire en petit groupe, animée autour d'exercices simples et de conversation.",
    paragraphes: [
      "Voici la forme que prendra une actualité publiée sur ce site : un titre, une date, une catégorie, deux ou trois paragraphes, et une photo si elle est disponible et autorisée.",
      "Le texte reste court et concret. Ce que les familles lisent avec le plus d'attention, ce ne sont pas les intentions mais les détails : combien de personnes, à quel rythme, dans quelle salle, animé par qui.",
      "Cette entrée est un exemple de mise en page. Elle disparaîtra dès la première publication réelle.",
    ],
    photo:
      "L'atelier en cours : quatre à six personnes autour d'une table, l'animatrice debout ou assise parmi elles.",
    photoSrc: "/img-actualites/atelier-memoire.webp",
    photoAlt:
      "Un groupe de personnes âgées assises autour d'une table, une animatrice debout parmi elles, en train de manipuler des photographies pour un exercice de mémoire.",
    exemple: true,
  },
  {
    slug: "exemple-sortie-printemps",
    titre: "Une sortie au printemps",
    date: "2026-05-02",
    categorie: "Sortie",
    resume:
      "Une demi-journée à l'extérieur, préparée à l'avance et accompagnée du départ au retour.",
    paragraphes: [
      "Deuxième exemple de mise en page. Il montre comment se présente une actualité munie d'une photo en pleine largeur.",
      "Les photos publiées supposent une autorisation écrite des personnes reconnaissables, ou de leur représentant légal. Sans autorisation, l'actualité est publiée sans photo : c'est la seule règle non négociable de cette rubrique.",
    ],
    photo:
      "Un moment de la sortie, en extérieur, lumière naturelle. Visages calmes et naturels, jamais de pose.",
    photoSrc: "/img-actualites/sortie-printemps.webp",
    photoAlt:
      "Un groupe de personnes marchant ensemble sur un chemin ombragé, en pleine conversation, accompagnées par une aidante.",
    exemple: true,
  },
  {
    slug: "exemple-rencontre-familles",
    titre: "Un temps d'échange avec les familles",
    date: "2026-03-20",
    categorie: "Rencontre",
    resume:
      "Un rendez-vous ouvert aux proches, pour poser les questions qu'on ne pose pas au téléphone.",
    paragraphes: [
      "Troisième exemple. Celui-ci montre une actualité avec une photo prise pendant le temps d'échange lui-même, plutôt qu'à côté de la scène.",
      "Cette rubrique est faite pour être alimentée régulièrement, même brièvement. Trois lignes publiées chaque mois valent mieux qu'un long bilan une fois par an : elles montrent une association vivante, ce que le brief demande explicitement.",
    ],
    photo:
      "Le temps d'échange en cours : plusieurs personnes assises en cercle, dans un salon ou une pièce commune, conversation naturelle.",
    photoSrc: "/img-actualites/rencontre-familles.webp",
    photoAlt:
      "Un groupe de personnes assises en cercle dans un salon lumineux, en pleine conversation autour d'une table basse avec des boissons chaudes.",
    exemple: true,
  },
  {
    slug: "exemple-nouvel-atelier-gestes",
    titre: "Un nouvel atelier autour des gestes du quotidien",
    date: "2026-02-10",
    categorie: "Projet",
    resume:
      "Un atelier pensé pour entretenir les gestes du quotidien, en petit groupe, sans viser la performance.",
    paragraphes: [
      "Quatrième exemple. Il montre une actualité classée « Projet », pour une action qui démarre plutôt qu'un rendez-vous déjà installé.",
      "Le contenu précis de cet atelier reste à définir avec l'équipe avant toute première séance réelle.",
    ],
    photo:
      "L'atelier en cours : un petit groupe autour d'une table, manipulant des objets du quotidien, une aidante parmi eux.",
    photoSrc: "/img-actualites/atelier-gestes-quotidien.webp",
    photoAlt:
      "Un petit groupe de personnes âgées et une aidante autour d'une table, en train de manipuler du tissu, des boutons et des couverts pour un atelier de gestes du quotidien.",
    exemple: true,
  },
  {
    slug: "exemple-sortie-marche",
    titre: "Une sortie au marché du centre-ville",
    date: "2026-01-14",
    categorie: "Sortie",
    resume:
      "Une matinée au marché, à son rythme, accompagnée du départ au retour.",
    paragraphes: [
      "Cinquième exemple. Une sortie plus courte que celle du printemps, pour montrer que le format s'adapte à ce qui est possible ce jour-là.",
      "Le choix du lieu et la fréquence de ce type de sortie restent à confirmer.",
    ],
    photo:
      "Un moment de la sortie au marché, devant les étals, accompagnement discret d'une aidante.",
    photoSrc: "/img-actualites/sortie-marche.webp",
    photoAlt:
      "Trois personnes devant un étal de fruits et légumes sur un marché, en train de choisir des produits ensemble.",
    exemple: true,
  },
  {
    slug: "exemple-rencontre-professionnels",
    titre: "Une rencontre avec les professionnels du secteur",
    date: "2025-12-05",
    categorie: "Vie de l'association",
    resume:
      "Un temps d'échange avec d'autres professionnels de l'accompagnement, pour mieux orienter les familles.",
    paragraphes: [
      "Sixième et dernier exemple. Il montre une actualité classée « Vie de l'association », catégorie réservée à ce qui concerne l'association elle-même plutôt qu'une activité proposée aux personnes accompagnées.",
      "Le contenu de cette rencontre reste à préciser avant toute publication réelle.",
    ],
    photo:
      "La rencontre en cours : plusieurs professionnels autour d'une table de travail, échange en petit comité.",
    photoSrc: "/img-actualites/rencontre-professionnels.webp",
    photoAlt:
      "Un groupe de professionnels réunis autour d'une table de travail avec un ordinateur portable et des documents, en pleine discussion.",
    exemple: true,
  },
]

/**
 * Les actualités à afficher. Dès qu'une vraie actualité existe, les exemples
 * s'effacent : la page ne mélange jamais démonstration et information.
 */
export const actualitesAffichables: Actualite[] = (() => {
  const reelles = actualites.filter((a) => !a.exemple)
  const liste = reelles.length > 0 ? reelles : actualites
  return [...liste].sort((a, b) => b.date.localeCompare(a.date))
})()

export const enModeExemple = actualitesAffichables.every((a) => a.exemple)

export function actualiteParSlug(slug: string): Actualite | undefined {
  return actualites.find((a) => a.slug === slug)
}

/** Date lisible en français, sans dépendance de formatage au runtime client. */
export function dateLongue(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso))
}
