/**
 * Import initial du contenu dans Sanity.
 *
 * Pré-remplit le dataset avec les textes actuels du site, pour que le
 * Studio affiche les vrais contenus plutôt que des champs vides.
 *
 * Idempotent : `createOrReplace` avec des _id stables. Relançable sans
 * doublons. ATTENTION : relancer ÉCRASE les modifications faites dans le
 * Studio sur ces documents. À ne lancer qu'à l'installation.
 *
 * Usage :
 *   export SANITY_TOKEN=<token Editor>        # jamais dans un fichier
 *   npx tsx scripts/sanity-seed.ts
 *
 * Variables lues : NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
 * (via .env.local si présent), SANITY_TOKEN.
 */

import { createClient } from "@sanity/client"
import { createReadStream, existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

import { actualites, typesActions } from "../lib/content/actions"
import {
  competences,
  explicationGir,
  origine,
  parcours,
  publics,
  soutienAidants,
  valeurs,
  charteQualite,
  noteCompetences,
} from "../lib/content/association"
import { faq } from "../lib/content/faq"
import { services } from "../lib/content/services"
import { dispositifsFinancement, modesTarification } from "../lib/content/tarifs"

/* .env.local : lecture minimale, sans dépendance dotenv. */
const cheminEnv = join(process.cwd(), ".env.local")
if (existsSync(cheminEnv)) {
  for (const ligne of readFileSync(cheminEnv, "utf8").split("\n")) {
    const m = ligne.match(/^([A-Z_]+)=(.*)$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, "")
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"
const token = process.env.SANITY_TOKEN

if (!projectId) {
  console.error("NEXT_PUBLIC_SANITY_PROJECT_ID manquant (dans .env.local ou l'environnement).")
  process.exit(1)
}
if (!token) {
  console.error("SANITY_TOKEN manquant : export SANITY_TOKEN=<token Editor> puis relancer.")
  process.exit(1)
}

const client = createClient({ projectId, dataset, token, apiVersion: "2025-01-01", useCdn: false })

function cle(prefixe: string, i: number) {
  return `${prefixe}-${String(i + 1).padStart(2, "0")}`
}

function blocs(prefixe: string, liste: { titre: string; texte: string }[]) {
  return liste.map((item, i) => ({
    _key: cle(prefixe, i),
    _type: "object",
    titre: item.titre,
    texte: item.texte,
  }))
}

async function uploadImage(cheminPublic: string): Promise<string | null> {
  const chemin = join(process.cwd(), "public", cheminPublic.replace(/^\//, ""))
  if (!existsSync(chemin)) {
    console.warn(`  image absente, ignorée : ${cheminPublic}`)
    return null
  }
  const asset = await client.assets.upload("image", createReadStream(chemin), {
    filename: cheminPublic.split("/").pop(),
  })
  return asset._id
}

async function main() {
  console.log(`Import vers ${projectId}/${dataset}...`)

  /* ---------- Singletons de pages ---------- */
  const docs: Record<string, Record<string, unknown>> = {
    pageAccueil: {
      heroBadge: "Personnes âgées, fragiles ou dépendantes",
      heroTitre: "Un accompagnement humain et adapté.",
      heroTexte:
        "À domicile, en accueil de jour ou en hébergement adapté : nous accompagnons les personnes âgées, fragiles ou dépendantes, et nous soutenons aussi leurs proches.",
      heroBoutonServices: "Découvrir nos services",
      heroLienUrgence: "Besoin d'une solution urgente ?",
      servicesEyebrow: "Services",
      servicesTitre: "Reconnaissez-vous votre situation ?",
      servicesLead:
        "Vous n'avez pas besoin de savoir quel service demander. Chaque solution part de ce que vous vivez, pas d'un nom de service.",
      parcoursEyebrow: "Comment cela se passe",
      parcoursTitre: "Quatre étapes, du premier appel à l'accompagnement",
      parcoursLead: "Aucun document médical demandé pour poser une question.",
      parcoursEtapes: blocs(
        "etape",
        parcours.map((e) => ({ titre: e.titre, texte: e.texte })),
      ),
      assoEyebrow: "L'association",
      assoTitre: "Ce que le soin ne couvre pas",
      assoTexte:
        "Une infirmière libérale a vu, chez beaucoup de ses patients, ce que le soin seul ne couvre pas : l'isolement, un logement devenu trop grand, une famille qui s'épuise. L'association est née de ce constat, pour ajouter la présence et le lien social au soin déjà assuré.",
      assoBouton: "En savoir plus sur l'association",
      pourquoiEyebrow: "Pourquoi nous",
      pourquoiTitre: "Trois faits, pas un argumentaire",
      pourquoiLead:
        "Rien ici n'est une promesse commerciale : ce sont des faits vérifiables sur l'association.",
      pourquoiReperes: blocs("repere", [
        {
          titre: "Association loi 1901",
          texte: "Pas d'actionnaire à rémunérer : ce que nous facturons sert l'accompagnement.",
        },
        {
          titre: "Fondée par une infirmière libérale",
          texte:
            "Les besoins sont observés avec un regard soignant, et traités avec des moyens humains et sociaux.",
        },
        {
          titre: "Accompagnement de GIR 1 à GIR 4",
          texte:
            "Un niveau de dépendance élevé n'est pas un motif d'exclusion, sous réserve de l'évaluation de chaque situation.",
        },
      ]),
      pourquoiBouton: "Découvrir l'origine de l'association",
      allerEyebrow: "Aller plus loin",
      allerTitre: "Qui nous accompagnons, et comment",
      allerLead: "Chaque sujet mérite plus que quelques lignes : il a sa page.",
      allerLiens: blocs("lien", [
        {
          titre: "Des situations, pas des catégories",
          texte:
            "Personnes âgées, dépendantes, fragiles ou isolées, et leurs proches : à qui nous nous adressons.",
        },
        {
          titre: "Un coût pensé service par service",
          texte:
            "Aucun tarif n'est publié tant qu'il n'est pas arrêté : ce que nous facturons, et pourquoi.",
        },
        {
          titre: "Un regard soignant, des moyens humains",
          texte:
            "Qui intervient et avec quelles compétences, fondé sur l'origine infirmière de l'association.",
        },
        {
          titre: "En tant que proche, vous êtes accompagné aussi",
          texte:
            "Le soutien apporté aux familles et aux aidants, pas seulement à la personne accompagnée.",
        },
      ]),
      actuEyebrow: "Actualités",
      actuTitre: "Ateliers, sorties, rencontres",
      actuLead:
        "L'association organise des activités au fil de l'année. Cette rubrique en rend compte.",
      temoEyebrow: "Elles en parlent",
      temoTitre: "Ce que disent les familles accompagnées",
      temoLead:
        "Trois avis parmi ceux recueillis auprès des familles, avec leur accord pour publication.",
      faqEyebrow: "Questions fréquentes",
      faqTitre: "Ce que les familles nous demandent",
      faqTexte:
        "Ce ne sont pas des questions inventées pour remplir une page : ce sont celles qui reviennent au téléphone.",
      ctaTitre: "Parlons de votre situation",
      ctaTexte:
        "Un premier échange suffit souvent à savoir quelle solution correspond. Il est gratuit et il n'engage à rien.",
    },

    pageAssociation: {
      heroEyebrow: "Qui nous sommes",
      heroTitre: "Une association née d'un constat de terrain",
      origineTitre: "Le soin était assuré, et il manquait quelque chose",
      origineConstat: origine.constat,
      origineReponse: origine.reponse,
      charteQualite,
      partisEyebrow: "Notre façon de travailler",
      partisTitre: "Quatre partis pris",
      partisLead:
        "Chacun a une conséquence concrète sur ce que nous acceptons, et sur ce que nous refusons.",
      partisBlocs: blocs(
        "parti",
        origine.paragraphes.map((p) => ({ titre: p.titre, texte: p.texte })),
      ),
      valeursEyebrow: "Nos valeurs",
      valeursTitre: "Six mots, et ce qu'ils engagent",
      valeursLead:
        "Le brief de ce projet en listait onze. Nous en avons gardé six : au-delà, une page de valeurs ne dit plus rien de particulier.",
      valeursListe: blocs(
        "valeur",
        valeurs.map((v) => ({ titre: v.titre, texte: v.texte })),
      ),
      publicsEyebrow: "Qui nous accompagnons",
      publicsTitre: "Nous n'écartons pas les situations lourdes",
      publicsLead:
        "Sous réserve de nos capacités d'accueil et de l'évaluation de chaque situation.",
      publicsListe: blocs("public", publics),
      explicationGir,
      aidantsEyebrow: "Familles et aidants",
      aidantsTitre: "En tant que proche, vous êtes accompagné aussi",
      aidantsChapo: soutienAidants.chapo,
      aidantsPoints: blocs(
        "aidant",
        soutienAidants.points.map((p) => ({ titre: p.titre, texte: p.texte })),
      ),
    },

    pageServices: {
      heroEyebrow: "Nos services",
      heroTitre: "Quatre solutions, qui se combinent souvent",
      heroLead:
        "Une famille commence rarement par le bon service, et ce n'est pas grave : les quatre se combinent, et l'accompagnement change de forme quand la situation change. Vous n'avez pas à choisir seul.",
      orienteurEyebrow: "Si vous hésitez",
      orienteurTitre: "Partez de votre situation",
      orienteurLead: "La même chose, formulée comme on la vit.",
      comparerEyebrow: "Comparer",
      comparerTitre: "Où se trouve la personne, la nuit ?",
      comparerLead:
        "C'est la question qui distingue le plus clairement les quatre solutions. Le reste se décide à l'évaluation.",
      comparerBlocs: blocs("comparer", [
        {
          titre: "La personne dort chez elle, tous les soirs",
          texte:
            "Le domicile reste le lieu de vie. L'accompagnement s'ajoute par-dessus, quelques heures par semaine ou quelques journées.",
        },
        {
          titre: "La personne dort dans la structure, pour un temps défini",
          texte:
            "Le séjour a une date de début et une date de sortie prévue. Il ne s'agit pas d'une entrée définitive en établissement.",
        },
      ]),
    },

    pageEquipe: {
      heroEyebrow: "Qui intervient",
      heroTitre: "Une équipe pluridisciplinaire, pas une seule personne",
      heroLead:
        "RIGUA mobilise des professionnels aux compétences complémentaires : à domicile, une aide à domicile formée et encadrée ; au centre de répit, une équipe soignante coordonnée autour d'un projet de soins personnalisé.",
      gouvEyebrow: "Fondation et présidence",
      gouvTexte:
        "Corrine William a fondé RIGUA en 2022, après avoir constaté comme infirmière libérale qu'une personne bien soignée mais seule ne va pas bien. Elle préside aujourd'hui l'association.",
      repitEyebrow: "Le centre de répit",
      repitTitre: "Une équipe soignante coordonnée",
      repitLead:
        "Dès l'arrivée d'une personne accueillie, ces professionnels construisent avec elle et son médecin traitant un projet de soins personnalisé. Aucun nom, aucun diplôme individuel : les compétences sont décrites par métier.",
      competencesListe: blocs(
        "metier",
        competences.map((c) => ({ titre: c.metier, texte: c.role })),
      ),
      noteCompetences,
      domEyebrow: "Le service à domicile",
      domTitre: "Ce que fait une aide à domicile, et ce qu'elle ne fait pas",
      domLead:
        "Les aides à domicile sont recrutées, encadrées et formées. Elles observent la plus stricte neutralité et respectent le mode de vie de chacun : ne les confondez pas avec une employée de maison.",
      domPeuvent: [
        "Les courses et déplacements extérieurs, sur le territoire du lieu de vie",
        "L'aide à la préparation des repas, le service, la vaisselle",
        "Les soins sommaires d'hygiène et d'habillage",
        "Les transferts de position : se lever, se coucher, s'asseoir",
        "La vérification de la bonne prise médicamenteuse",
        "Le lavage et le repassage du linge de la personne accompagnée",
        "L'entretien courant du logement et du linge",
      ],
      domNeFontPas: [
        "Les soins qui exigent un diplôme officiel",
        "L'entretien des pièces inoccupées, caves, garages et greniers",
        "Recevoir une délégation de pouvoir, une donation ou un dépôt de valeurs",
        "Des tâches pour un tiers non concerné par la prise en charge",
      ],
      domNote:
        "En cas de doute sur une tâche, l'aide à domicile en réfère toujours à l'encadrement avant d'intervenir.",
      contEyebrow: "Continuité du service",
      contTitre: "La même personne, autant que possible",
      contLead:
        "La régularité d'un visage connu fait une grande partie de l'efficacité de l'accompagnement, en particulier lorsqu'il existe des troubles de la mémoire.",
      contCartes: blocs("carte", [
        {
          titre: "En cas d'absence",
          texte:
            "Remplacement aux mêmes jours et heures, dans la mesure du possible, week-ends et jours fériés compris.",
        },
        {
          titre: "Le cahier de liaison",
          texte:
            "Attribué à chaque personne accompagnée, consulté et complété par tous les intervenants : aide à domicile, médecin, infirmière, famille.",
        },
      ]),
    },

    pageActions: {
      heroEyebrow: "La vie de l'association",
      heroTitre: "Nos actions",
      heroLead:
        "Une association se juge autant à ce qu'elle organise qu'à ce qu'elle annonce. Cette page présente les quatre familles d'actions menées au fil de l'année.",
      famillesEyebrow: "Au fil de l'année",
      famillesTitre: "Quatre familles d'actions",
      famillesLead:
        "Elles se répètent, et c'est voulu : la régularité transforme une activité en repère dans la semaine, ce qui est précisément son intérêt.",
      famillesListe: blocs(
        "famille",
        typesActions.map((a) => ({ titre: a.titre, texte: a.texte })),
      ),
    },

    pageActualites: {
      heroEyebrow: "La vie de l'association",
      heroTitre: "Nos actualités",
      heroLead:
        "Une association se juge autant à ce qu'elle organise qu'à ce qu'elle annonce. Cette page rend compte des activités menées au fil de l'année.",
      listeEyebrow: "Actualités",
      listeTitre: "Ce qui s'est passé récemment",
      listeLead:
        "Trois lignes publiées chaque mois valent mieux qu'un long bilan une fois par an. Filtrez par sujet ou par année.",
      ctaTitre: "Envie de nous rencontrer ?",
      ctaTexte:
        "Les temps de rencontre sont ouverts aux proches. Le plus simple est de nous appeler pour savoir quand a lieu le prochain.",
    },

    pageTarifs: {
      heroEyebrow: "Tarifs",
      heroTitre: "Comment se facture chaque service",
      heroLead:
        "La grille tarifaire est en cours de finalisation. Les montants sont communiqués lors du premier échange, puis confirmés par un devis écrit, gratuit et sans engagement.",
      modesEyebrow: "Par service",
      modesTitre: "Une unité de facturation par service",
      modesLead:
        "Le montant dépend du volume d'accompagnement réellement nécessaire, fixé après évaluation de la situation.",
      modesListe: modesTarification.map((m, i) => ({
        _key: cle("mode", i),
        _type: "object",
        titre: m.service,
        texte: m.base,
        unite: m.unite,
      })),
      aidesEyebrow: "Aides financières",
      aidesTitre: "Ce qui peut réduire le reste à charge",
      aidesLead:
        "Selon la situation, un ou plusieurs de ces dispositifs peuvent s'appliquer. Nous vérifions lesquels avec vous, avant tout devis.",
      aidesListe: dispositifsFinancement.map((d) => d.nom),
      aidesFinal:
        "Le premier échange est gratuit : il permet de vous dire sur quelle base se facture le service qui vous concerne, puis d'établir un devis écrit.",
    },

    pageFaq: {
      heroEyebrow: "Questions fréquentes",
      heroTitre: "Les questions que vous nous posez",
      heroLead:
        "Ce ne sont pas des questions inventées pour remplir une page : ce sont celles qui reviennent au téléphone, semaine après semaine. Les réponses sont volontairement complètes.",
      groupes: faq.map((groupe, i) => ({
        _key: cle("groupe", i),
        _type: "object",
        titre: groupe.titre,
        questions: groupe.questions.map((q, j) => ({
          _key: cle(`q${i + 1}`, j),
          _type: "object",
          question: q.question,
          reponse: q.reponse,
        })),
      })),
      finEyebrow: "Votre question n'y est pas",
      finTitre: "Alors posez-la",
      finTexte:
        "Cette page existe pour vous éviter un appel, pas pour le remplacer. Si votre situation ne ressemble à aucune des réponses ci-dessus, c'est une raison de nous joindre, pas de renoncer.",
    },

    pageContact: {
      heroEyebrow: "Contact",
      heroTitre: "Nous joindre",
      heroLead:
        "Le téléphone reste le meilleur canal : il permet de dire les choses qu'on n'écrit pas dans un formulaire. Si vous préférez que nous vous rappelions, laissez-nous simplement votre numéro.",
      urgenceEyebrow: "Situation urgente",
      urgenceTitre: "Ce qu'il faut faire, et dans quel ordre",
      urgenceLead:
        "Nous préférons vous dire tout de suite comment cela fonctionne réellement, plutôt que de laisser croire à une place garantie.",
      urgenceEtapes: blocs("urgence", [
        {
          titre: "Si la personne est en danger immédiat",
          texte: "Appelez le 15 (SAMU) ou le 112. L'urgence vitale relève d'eux, pas de nous.",
        },
        {
          titre: "Sinon, appelez-nous, n'écrivez pas",
          texte:
            "Un message écrit peut attendre plusieurs heures avant d'être lu. Dans l'urgence, le téléphone est le seul canal adapté.",
        },
        {
          titre: "Dites-nous l'essentiel",
          texte:
            "Qui vous êtes et votre lien avec la personne, ce qui s'est passé, depuis quand, si elle est actuellement seule, et si un professionnel de santé suit déjà la situation.",
        },
        {
          titre: "Nous vous répondrons franchement",
          texte:
            "Oui, non, ou pas tout de suite. Si nous ne pouvons pas accueillir, nous cherchons avec vous vers qui vous tourner.",
        },
      ]),
      alerteTitre: "Aucune admission n'est garantie",
      alerteTexte:
        "Un accueil peut être envisagé après évaluation de la situation. Nous ne pouvons pas promettre un accueil immédiat, et nous ne le promettrons pas.",
      finEyebrow: "Le plus direct",
      finTitre: "Un appel de quinze minutes suffit souvent",
      finTexte:
        "Un premier échange suffit souvent à savoir quelle solution correspond. Il est gratuit et il n'engage à rien.",
    },

    pageRdv: {
      heroEyebrow: "Prendre rendez-vous",
      heroTitre: "Parlons de votre situation",
      heroLead:
        "Ce formulaire ne réserve pas automatiquement un créneau, et c'est volontaire : un rendez-vous se cale mieux en parlant. Nous vous rappelons pour convenir du moment qui vous arrange.",
      appelTexte:
        "Un appel de quinze minutes remplace souvent un formulaire et deux échanges de messages. N'hésitez pas, même si vous ne savez pas encore quoi demander.",
    },
  }

  for (const [type, champs] of Object.entries(docs)) {
    await client.createOrReplace({ _id: type, _type: type, ...champs })
    console.log(`  ${type} : OK`)
  }

  /* ---------- Services (4 fiches) ---------- */
  for (const [i, s] of services.entries()) {
    await client.createOrReplace({
      _id: `service-${s.slug}`,
      _type: "service",
      slugService: s.slug,
      ordre: i + 1,
      titre: s.titre,
      titreCourt: s.titreCourt,
      phraseFamille: s.phraseFamille,
      resume: s.resume,
      chapo: s.chapo,
      besoins: blocs(
        `besoin-${s.slug}`,
        s.besoins.map((b) => ({ titre: b.titre, texte: b.texte })),
      ),
      deroule: blocs(
        `etape-${s.slug}`,
        s.deroule.map((e) => ({ titre: e.titre, texte: e.texte })),
      ),
      pourQui: s.pourQui,
      ...(s.prestations
        ? {
            prestations: s.prestations.map((g, j) => ({
              _key: cle(`presta-${s.slug}`, j),
              _type: "object",
              titre: g.titre,
              items: g.items,
            })),
          }
        : {}),
      ...(s.horaires ? { horaires: s.horaires } : {}),
      ...(s.capacite ? { capacite: s.capacite } : {}),
      tarification: s.tarification,
      ...(s.avertissement ? { avertissement: s.avertissement } : {}),
    })
    console.log(`  service ${s.slug} : OK`)
  }

  /* ---------- Actualités réelles (jamais les exemples) ---------- */
  for (const actu of actualites.filter((a) => !a.exemple)) {
    const photoId = actu.photoSrc ? await uploadImage(actu.photoSrc) : null
    const photoSecondaireId = actu.photoSecondaireSrc
      ? await uploadImage(actu.photoSecondaireSrc)
      : null
    await client.createOrReplace({
      _id: `actualite-${actu.slug}`,
      _type: "actualite",
      titre: actu.titre,
      slug: { _type: "slug", current: actu.slug },
      date: actu.date,
      categorie: actu.categorie,
      resume: actu.resume,
      paragraphes: actu.paragraphes,
      ...(photoId
        ? {
            photo: { _type: "image", asset: { _type: "reference", _ref: photoId } },
            photoAlt: actu.photoAlt,
          }
        : {}),
      ...(photoSecondaireId
        ? {
            photoSecondaire: {
              _type: "image",
              asset: { _type: "reference", _ref: photoSecondaireId },
            },
            photoSecondaireAlt: actu.photoSecondaireAlt,
          }
        : {}),
    })
    console.log(`  actualité ${actu.slug} : OK`)
  }

  /* Témoignages : volontairement PAS importés. Ceux du code sont des
     brouillons à valider ; le client ajoutera les vrais dans le Studio,
     et le site basculera dessus automatiquement. */

  console.log("Import terminé.")
}

main().catch((erreur) => {
  console.error(erreur)
  process.exit(1)
})
