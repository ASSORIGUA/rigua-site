/**
 * Témoignages de familles accompagnées.
 *
 * ⚠️ BROUILLON À VALIDER AVANT MISE EN LIGNE — texte provisoire réaliste,
 * rédigé pour montrer la section en place, PAS des citations recueillies.
 * Le brief interdit d'inventer un fait vérifiable (agrément, tarif, délai),
 * mais un témoignage est une parole nominative : publier un faux témoignage
 * attribué à une personne serait pire qu'une case vide.
 *
 * Avant mise en ligne :
 *   1. Recueillir de vrais témoignages, avec l'accord écrit de leur auteur
 *      pour la publication sur ce site (voir docs/photos-a-fournir.md pour le
 *      même principe appliqué aux photos).
 *   2. Remplacer chaque entrée ci-dessous par la citation réelle.
 *   3. Retirer ce commentaire une fois la liste alimentée par de vrais avis.
 */
export const temoignages: {
  citation: string
  prenom: string
  ville: string
  lien: string
  note: number
}[] = [
  {
    citation:
      "Ma mère vit seule depuis le décès de mon père. Les passages réguliers lui ont redonné des journées avec du monde autour d'elle, pas seulement des soins.",
    prenom: "Sylvie B.",
    ville: "Sainte-Marie",
    lien: "Fille d'une personne accompagnée",
    note: 5,
  },
  {
    citation:
      "On nous a écoutés avant de nous vendre quoi que ce soit. La première question a été : qu'est-ce qui vous inquiète, pas quel service voulez-vous.",
    prenom: "Jean-Paul R.",
    ville: "Saint-Denis",
    lien: "Fils d'une personne accompagnée",
    note: 5,
  },
  {
    citation:
      "L'hébergement temporaire nous a permis de souffler pendant les travaux chez mes parents. Elle est revenue chez elle reposée, pas juste hébergée.",
    prenom: "Nadège L.",
    ville: "Le Tampon",
    lien: "Aidante familiale",
    note: 5,
  },
  {
    citation:
      "Mon père ne voulait entendre parler d'aucune structure. L'accueil de jour lui a été présenté comme un essai, sans engagement, et c'est ce qui l'a décidé.",
    prenom: "Marc H.",
    ville: "Saint-Paul",
    lien: "Fils d'une personne accompagnée",
    note: 5,
  },
  {
    citation:
      "On est sortis de l'hôpital un vendredi soir sans solution. Ils ont trouvé une place le temps qu'on s'organise, ce qui a évité un retour à la maison trop tôt.",
    prenom: "Isabelle F.",
    ville: "Saint-Pierre",
    lien: "Fille d'une personne accompagnée",
    note: 5,
  },
]
