# Informations à compléter avant mise en ligne

Le site est fonctionnellement complet. Ce qui suit est ce qu'il ne peut pas
inventer, et qui doit venir de l'association.

Tant qu'une information manque, le site l'annonce comme manquante plutôt que de
l'approximer. Ce n'est pas un oubli : le brief l'interdit explicitement (§19), et
un numéro de téléphone inventé qu'une famille composerait pour rien serait le pire
service à rendre à ce projet.

## 1. Bloquant pour la mise en ligne

Sans ces éléments, le site ne doit pas être publié.

### Coordonnées — `lib/site.ts`, objet `contact`

| Champ | Effet aujourd'hui |
|---|---|
| `telephone` | Le bouton d'appel de l'en-tête renvoie vers `/contact`. Partout ailleurs : « Numéro à confirmer ». |
| `email` | « Adresse e-mail à confirmer ». |
| `adresse` | « Adresse à confirmer », et le champ est absent des données structurées. |
| `horaires` | « Horaires à confirmer ». |
| `zoneIntervention` | « Zone à confirmer ». |

Renseigner : passer `aConfirmer` à `false` et remplir `valeur`. Tout le site suit,
y compris le balisage Schema.org et le pied de page.

```ts
telephone: confirme({ affichage: "05 12 34 56 78", tel: "+33512345678" }),
```

### Mentions légales — `lib/site.ts`, objet `legal`

`raisonSociale`, `rna` ou `siren`, `representantLegal`, `hebergeur`. Ces champs
apparaissent dans un encadré ocre « à compléter » directement sur la page
`/mentions-legales`, pour qu'ils ne puissent pas être oubliés.

L'absence de ces mentions est un défaut de conformité, pas une case vide.

### Réception des demandes — variables d'environnement

Le formulaire est complet et validé, mais **il ne transmet rien tant que la boîte
de réception n'est pas configurée**. En production sans configuration, il affiche
un message d'échec explicite et renvoie vers le téléphone : il ne prétend jamais
avoir envoyé une demande qui n'est pas partie.

```bash
RESEND_API_KEY=re_xxxxx        # ou remplacer l'adaptateur dans lib/notify.ts
DEMANDES_EMAIL_TO=contact@…     # la boîte qui reçoit les demandes
DEMANDES_EMAIL_FROM=site@…      # expéditeur, sur un domaine vérifié
NEXT_PUBLIC_SITE_URL=https://…  # base des URL canoniques et du sitemap
```

`DEMANDES_DEMO=1` fait fonctionner le parcours en mode démonstration : la
confirmation s'affiche, la demande est écrite dans le journal du serveur, et
l'écran indique clairement qu'aucun e-mail n'est parti. À utiliser pour faire
valider le parcours à Corrine, jamais en production.

**Vérifier de bout en bout après configuration** : envoyer une demande réelle et
confirmer qu'elle arrive bien dans la boîte.

### Identité

- Le **nom officiel** de l'association. « Présence & Autonomie » est un nom de
  projet, et le pied de page le dit.
- Le **slogan exact**. La phrase actuellement affichée dans l'en-tête, « Un
  accompagnement humain et adapté », vient du brief §9 ; ce n'est pas un slogan
  validé.

## 2. Contenus qui enrichissent les pages

Ces éléments manquent sans empêcher la publication. Chaque page concernée le
signale déjà à ses visiteurs.

### Par service — `lib/content/services.ts`, champ `aValider`

| Service | Ce qui manque |
|---|---|
| Service à domicile | Liste exacte des prestations, zone couverte, jours et horaires d'intervention, tarif horaire |
| Accueil de jour | Jours et horaires d'ouverture, capacité, contenu des activités, transport, forfait journalier |
| Hébergement temporaire | Durée maximale d'un séjour, nombre de places, conditions d'admission, prestations incluses, délai habituel |
| Hébergement d'urgence | Horaires de traitement d'un appel urgent, délai de réponse tenable, numéro dédié éventuel, procédure interne |

### Tarifs — `lib/content/tarifs.ts`

La grille tarifaire complète, ce que comprend chaque forfait, les aides
financières vérifiées, les modalités de règlement, les frais complémentaires.

La page `/tarifs` explique la méthode de calcul sans afficher aucun montant. Elle
reste utile en l'état, et sera plus utile encore avec les chiffres.

### Professionnels — `lib/content/association.ts`

La liste exacte des intervenants disponibles et leurs modalités d'intervention.
Aucun nom, titre, diplôme ni spécialité n'est affiché : le brief §7 l'interdit
sans validation. Les compétences sont décrites par métier.

Les agréments, certifications et partenariats **réellement obtenus** : rien n'est
affiché aujourd'hui, et rien ne doit l'être sans preuve.

### Actualités — `lib/content/actions.ts`

La page `/actualites` contient trois entrées d'exemple, marquées comme telles à
l'écran et exclues du sitemap et de l'indexation. Elles montrent la mise en page.

Publier une vraie actualité : ajouter une entrée **sans** la propriété `exemple`.
Les exemples disparaissent automatiquement dès qu'une entrée réelle existe.

### Photos

Voir [photos-a-fournir.md](photos-a-fournir.md) : la liste des prises de vue,
les cadrages attendus, ce qu'il faut éviter, et la règle d'autorisation.

## 3. Choix à valider avec Corrine

Des décisions ont été prises pour pouvoir avancer. Elles sont réversibles.

1. **Le formulaire ne réserve pas de créneau automatiquement.** Il recueille le
   type d'échange souhaité et le moment de la journée, puis l'association
   rappelle. Un agenda en libre-service supposerait des disponibilités connues et
   tenables, et un rendez-vous se cale mieux en parlant.
2. **Le nom de la personne concernée n'est pas demandé**, alors que le brief §15
   l'autorisait. Ce n'est pas utile à un premier contact, et c'est une donnée
   nominative de tiers que la personne concernée n'a pas consentie.
3. **Le niveau GIR est demandé mais facultatif**, avec la mention explicite que ne
   pas le connaître ne change rien à la réponse.
4. **Aucun cookie, aucune mesure d'audience.** Le site n'a donc pas de bannière de
   consentement. Ajouter des statistiques de visite plus tard impliquerait soit un
   outil sans cookie, soit une bannière : à décider en connaissance de cause.
5. **Six valeurs affichées** sur les onze du brief §8. Au-delà, une page de valeurs
   ne distingue plus rien.
