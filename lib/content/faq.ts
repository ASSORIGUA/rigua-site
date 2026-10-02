/**
 * Questions fréquentes.
 *
 * Ce ne sont pas des questions inventées : ce sont celles que les familles
 * posent réellement au téléphone, listées telles quelles au brief §2. C'est
 * l'objectif premier du site, réduire les demandes répétitives, donc les
 * réponses doivent être complètes et ne renvoyer nulle part quand c'est
 * possible.
 *
 * Une réponse qui n'est pas encore connue le dit. Elle n'invente ni délai, ni
 * capacité, ni tarif, ni agrément (brief §19).
 */

export type Question = {
  question: string
  /** Réponse en texte brut. Un paragraphe par entrée du tableau. */
  reponse: string[]
  /** Lien vers la page qui développe, quand il y en a une. */
  lien?: { libelle: string; href: string }
}

export type GroupeFaq = {
  id: string
  titre: string
  questions: Question[]
}

export const faq: GroupeFaq[] = [
  {
    id: "services",
    titre: "Ce que nous proposons",
    questions: [
      {
        question: "Quels services proposez-vous ?",
        reponse: [
          "Quatre. Un service à la personne à domicile, pour les personnes qui vivent encore chez elles. Un accueil de jour, où la personne passe la journée dans la structure et rentre chez elle le soir. Un hébergement temporaire, pour un séjour court. Et la possibilité d'un accueil lorsque la situation est urgente.",
          "Ces quatre solutions se combinent souvent. Une famille commence par des visites à domicile, ajoute des journées d'accueil quand cela ne suffit plus, et fait appel à un séjour temporaire au moment d'une hospitalisation.",
        ],
        lien: { libelle: "Voir les quatre services", href: "/nos-services" },
      },
      {
        question: "Existe-t-il une solution d'accueil en journée ?",
        reponse: [
          "Oui. La personne est accueillie dans la structure pendant la journée, participe aux activités, déjeune, et rentre chez elle le soir.",
          "C'est souvent la solution la mieux acceptée, parce qu'elle ne demande pas de quitter son logement. Elle permet aussi aux proches de disposer de journées libres, régulièrement.",
        ],
        lien: {
          libelle: "Voir l'accueil de jour",
          href: "/nos-services#accueil-de-jour",
        },
      },
      {
        question: "Proposez-vous un hébergement temporaire ?",
        reponse: [
          "Oui, avec une date de début et une date de sortie fixées dès le départ. Cela répond aux sorties d'hospitalisation, à l'absence momentanée d'un aidant, à un logement inhabitable ou à un besoin de répit familial.",
          "La structure compte 8 places. La durée maximale d'un séjour reste à préciser.",
        ],
        lien: {
          libelle: "Voir l'hébergement temporaire",
          href: "/nos-services#hebergement-temporaire",
        },
      },
      {
        question: "Pouvez-vous intervenir dans une situation urgente ?",
        reponse: [
          "Un accueil peut être envisagé, après évaluation de la situation. Nous ne pouvons pas promettre un accueil immédiat, et aucune admission n'est garantie sans évaluation préalable.",
          "Dans ce cas, appelez-nous plutôt que d'écrire : un message peut attendre plusieurs heures avant d'être lu. Si la personne est en danger immédiat, appelez le 15 ou le 112.",
        ],
        lien: {
          libelle: "Lire la procédure d'urgence",
          href: "/nos-services#hebergement-urgence",
        },
      },
    ],
  },
  {
    id: "publics",
    titre: "Qui peut être accompagné",
    questions: [
      {
        question: "Qui pouvez-vous accueillir ?",
        reponse: [
          // Personnes en situation de handicap et « ou maladies apparentées »
          // ajoutés à la demande de l'association (retour du 9 septembre 2026).
          "Des personnes âgées dépendantes, fragiles ou isolées, des personnes en situation de handicap, ainsi que des personnes présentant des troubles cognitifs ou maladies apparentées. Nous accompagnons aussi les proches et les aidants, qui sont souvent ceux qui appellent.",
          "Chaque situation est évaluée individuellement. Nous préférons vous dire non que d'accueillir une personne que nous ne pourrions pas accompagner correctement.",
        ],
      },
      {
        question: "Accompagnez-vous les personnes très dépendantes ?",
        reponse: [
          "L'association peut accompagner des personnes classées de GIR 1 à GIR 4, sous réserve de ses capacités réelles, de ses conditions d'admission et de l'évaluation de chaque situation.",
          "Un niveau de dépendance élevé n'est donc pas un motif d'exclusion. C'est une raison de regarder la situation de près avant de s'engager.",
        ],
      },
      {
        question: "Qu'est-ce que le GIR, exactement ?",
        reponse: [
          "La grille AGGIR classe la perte d'autonomie en six niveaux, de GIR 1 pour la plus importante à GIR 6 pour la plus légère. Elle est évaluée par une équipe médico-sociale, généralement lors d'une demande d'allocation personnalisée d'autonomie auprès du département.",
          "Si vous ne connaissez pas le GIR de votre proche, ce n'est pas un obstacle : dites-nous simplement ce qu'il arrive encore à faire seul et ce qui demande de l'aide.",
        ],
      },
      {
        question: "Faut-il un accord du médecin ?",
        reponse: [
          "Pas pour nous contacter, ni pour poser une question. Selon le service et la situation, nous pouvons être amenés à échanger avec le médecin traitant ou les professionnels qui suivent déjà la personne, avec son accord.",
        ],
      },
    ],
  },
  {
    id: "demarches",
    titre: "Faire une demande",
    questions: [
      {
        question: "Comment déposer une demande ?",
        reponse: [
          "Par téléphone, ou en remplissant le formulaire de demande du site. Le formulaire ne demande que ce qui est nécessaire au premier contact : de quoi vous rappeler, et de quoi comprendre la situation.",
          "Vous pouvez aussi simplement demander à être rappelé, en indiquant le moment qui vous arrange.",
        ],
        lien: {
          libelle: "Faire une demande",
          href: "/prendre-rendez-vous",
        },
      },
      {
        question: "Comment prendre rendez-vous ?",
        reponse: [
          "Le formulaire de rendez-vous vous permet d'indiquer le type d'échange souhaité, un premier appel, une visite de la structure ou une évaluation de la situation, et le moment de la journée qui vous convient.",
          "Nous vous recontactons pour confirmer un créneau précis. Le site ne réserve pas automatiquement : c'est volontaire, un rendez-vous se cale mieux en parlant.",
        ],
        lien: {
          libelle: "Prendre rendez-vous",
          href: "/prendre-rendez-vous",
        },
      },
      {
        question: "Quels documents faut-il fournir ?",
        reponse: [
          "Aucun pour un premier échange. Nous ne demandons ni compte rendu médical, ni ordonnance, ni dossier à cette étape.",
          "Les pièces nécessaires à une admission vous seront indiquées après l'évaluation, une fois que nous saurons quelle solution correspond.",
        ],
      },
      {
        question: "Quels sont les délais de prise en charge ?",
        reponse: [
          "Ils dépendent du service et des places disponibles au moment de la demande. Nous ne pouvons pas annoncer de délai type avant d'avoir confirmé nos capacités d'accueil.",
          "Ce que nous pouvons dire : nous vous répondons franchement, y compris quand la réponse est que nous ne pouvons pas accueillir tout de suite.",
        ],
      },
    ],
  },
  {
    id: "cout",
    titre: "Le coût",
    questions: [
      {
        question: "Quels sont les tarifs ?",
        reponse: [
          "Le service à domicile est facturé à l'heure. L'accueil de jour fonctionne au forfait journalier. L'hébergement temporaire est facturé à la journée.",
          "La grille tarifaire précise n'est pas encore publiée sur ce site. Elle vous est communiquée lors du premier échange, et un devis écrit est établi après l'évaluation de la situation.",
        ],
        lien: { libelle: "Comprendre la tarification", href: "/tarifs" },
      },
      {
        question: "Existe-t-il des aides financières ?",
        reponse: [
          "Plusieurs dispositifs peuvent s'appliquer selon la situation : l'APA et la PCH auprès du conseil départemental, une prise en charge par la caisse de retraite ou par certaines mutuelles, et le crédit d'impôt de 50 % applicable aux services à la personne, avec une avance immédiate possible via l'Urssaf.",
          "Nous ne pouvons pas confirmer sur ce site quel dispositif s'applique à votre situation ni quel montant il représente : ce serait présenter une estimation comme une certitude. Posez-nous la question lors du premier échange, nous vous dirons ce qui est vérifié.",
        ],
      },
      {
        question: "Le premier échange est-il payant ?",
        reponse: [
          "Non. Appeler, poser une question, demander à être rappelé et obtenir un devis ne coûtent rien et n'engagent à rien.",
        ],
      },
    ],
  },
  {
    id: "equipe",
    titre: "Qui intervient",
    questions: [
      {
        question: "Quels professionnels interviennent ?",
        reponse: [
          // Auxiliaires de vie familiale et sociale et coach sportif ajoutés
          // à la demande de l'association (retour du 9 septembre 2026).
          "L'association a été fondée par une infirmière libérale. Selon les situations, elle comprend ou travaille avec un médecin référent, un infirmier coordinateur, des infirmiers, des aides-soignants, des kinésithérapeutes, des orthophonistes, des auxiliaires de vie familiale et sociale et un coach sportif, ainsi qu'avec l'équipe du centre de répit (agent de service, cuisinière, animateurs).",
          "Les modalités précises d'intervention de chaque professionnel restent à préciser. Nous préférons ne rien afficher plutôt que d'annoncer une compétence qui ne serait pas mobilisable.",
        ],
        lien: { libelle: "En savoir plus sur l'association", href: "/l-association" },
      },
      {
        question: "Est-ce toujours la même personne qui vient à domicile ?",
        reponse: [
          "C'est l'objectif : la régularité d'un visage connu fait une grande partie de l'efficacité de l'accompagnement, en particulier lorsqu'il existe des troubles de la mémoire.",
          "Les modalités exactes d'organisation des interventions restent à préciser.",
        ],
      },
    ],
  },
]

/** Toutes les questions à plat, pour les données structurées FAQPage. */
export const toutesLesQuestions: Question[] = faq.flatMap((g) => g.questions)
