# Prompts Codex — illustrations de fond pour les hero des pages secondaires

Ce fichier liste, pour chaque page secondaire du site (toutes sauf l'accueil,
dont le hero est une vraie photo, voir `components/sections/hero-accueil.tsx`),
un prompt de génération d'image prêt à copier dans Codex, avec le nom de
fichier attendu et sa destination.

**Instruction pour Codex : déposer tous les fichiers produits dans
`public/page-hero/`, avec les noms exacts indiqués sous chaque prompt.** Ce
dossier n'existe pas encore, le créer. Ne rien déposer dans `public/img-bg/`
ni `public/assets/` : ces dossiers appartiennent à d'autres jeux d'images déjà
en place (fond du hero d'accueil, illustrations de coin des sections claires)
et ne doivent pas être touchés.

## Pourquoi une illustration, pas une photo

`components/page-hero.tsx` est aujourd'hui un aplat de couleur sans image :
c'est un choix de prudence, pas un défaut — le brief interdit toute photo
d'illustration posée à la place d'une vraie photo non fournie
([docs/photos-a-fournir.md](photos-a-fournir.md)). Une **illustration
graphique abstraite**, qui ne prétend représenter ni un lieu ni une personne
réelle, ne tombe pas sous cette interdiction : c'est le même principe déjà
appliqué aux illustrations de coin des sections claires de l'accueil
([docs/image-prompts-light-sections.md](image-prompts-light-sections.md)),
étendu ici au bandeau de hero de chaque page intérieure.

Chaque page reçoit sa propre image, cohérente avec son sujet mais dessinée
dans un seul et même langage graphique — sinon le site perd la cohérence que
la charte protège.

## Style impératif, commun à toutes les images

- **Illustration vectorielle abstraite/symbolique uniquement. Aucun visage,
  aucune silhouette humaine réaliste, aucune scène figurative, aucune photo
  ni rendu photoréaliste.** Les motifs suggèrent leur sujet par des objets et
  des formes (une main stylisée à la limite de l'abstraction, un motif
  organique, une icône de dossier ou de calendrier), jamais par une scène
  reconnaissable ou un personnage.
- Registre calme, éditorial, désaturé — **surtout pas** le registre gai et
  saturé du secteur (pas de style « clipart » associatif, pas de bonhomme
  souriant, pas de doodle à main levée, pas d'étoile ni de surligneur fluo).
- Composition pensée pour un **bandeau large et bas** : la page-hero occupe
  toute la largeur mais une hauteur modeste (elle contient un titre, un
  chapô, parfois un bouton). Les motifs se concentrent donc **sur les bords
  gauche et droit**, avec un centre horizontal large et vide où le texte vient
  se poser. Ne jamais centrer un motif dense au milieu de l'image.
- **Fond transparent obligatoire** (PNG ou WebP avec alpha) : l'image se pose
  par-dessus le fond sable clair de `PageHero` (`data-surface="warm"`), elle
  ne le remplace pas.
- Aucun texte, aucun lettrage, aucun logo dans l'image.
- **Aucune forme en pastille/pill** : le design system bannit les pills
  partout (règle n°1 de la charte). Préférer des formes à coins nets ou à
  rayon discret (8px maximum perçu), jamais un cercle plein en guise de
  bouton ou de fond de motif.
- Trait fin continu (line-art), remplissage plein réservé à des accents très
  ponctuels et discrets. Jamais de dégradé, jamais d'ombre portée, jamais de
  texture bruitée.

## Palette stricte — ne pas en sortir, ne rien inventer

Les mêmes couleurs que le reste du site, dérivées du logo officiel RIGUA.
**Une seule couleur de trait par image**, au choix parmi :

- Rouge encre : `#520003`
- Rouge : `#b5041d`
- Orange clair : `#f45c00` / Orange foncé : `#cf4700`
- Vert : `#008551`

Fond transparent partout ailleurs. Pas de bleu, pas de rose, pas de jaune vif,
pas de couleur hors de cette liste. Le choix de couleur par page est indiqué
sous chaque prompt ; il reprend la tonalité déjà utilisée pour le même sujet
ailleurs sur le site quand elle existe (l'urgence reste rouge, la vie
associative reste orange, le reste est vert).

## Format et livrables

Comme les autres fonds à deux orientations du site (hero d'accueil,
`Section` prop `image`), chaque page reçoit **deux fichiers** : un cadrage
large pour desktop, un cadrage plus étroit pour mobile, où le bandeau est
proportionnellement plus haut par rapport à sa largeur.

- `{nom}-hero-desktop.webp` — paysage large, environ 1920×420px (ratio ~4,6:1),
  motifs concentrés sur les bords gauche/droit, large zone centrale vide
- `{nom}-hero-mobile.webp` — plus carré, environ 750×560px (ratio ~1,3:1),
  motifs resserrés vers les bords, zone centrale vide conservée

Fond transparent (alpha) dans les deux cas, poids raisonnable (viser
< 120 Ko par fichier). Format WebP ; PNG accepté si le générateur ne produit
pas de WebP directement, à convertir ensuite.

Destination unique : **`public/page-hero/`**.

---

## 1. L'association — `/l-association`

Thème : l'origine associative, une infirmière libérale qui complète le soin
par une présence humaine. Couleur : **vert** `#008551`.

> Minimalist single-line vector illustration for a wide website banner, thin
> continuous line art, one solid colour #008551 on a fully transparent
> background. Motifs concentrated near the left and right edges only, wide
> empty center: on the left a simple outlined house with a small heart above
> the roofline, on the right two abstract concentric circles slightly
> overlapping suggesting two people linked together. Calm editorial
> line-drawing style, no shading, no gradient, no text, no realistic human
> figure, no pill or rounded-pellet shapes.

Fichiers : `public/page-hero/association-hero-desktop.webp`,
`public/page-hero/association-hero-mobile.webp`

## 2. Nos services — `/nos-services`

Thème : quatre solutions qui se combinent, entrée par la situation vécue.
Couleur : **vert** `#008551`.

> Minimalist single-line vector illustration for a wide website banner, thin
> continuous line art, one solid colour #008551 on a fully transparent
> background. Motifs concentrated near the left and right edges only, wide
> empty center: on the left a simple outlined open door with soft light rays
> suggested by a few short straight lines, on the right a small outlined
> compass or signpost shape suggesting orientation and choice. Calm editorial
> line-drawing style, no shading, no gradient, no text, no realistic human
> figure, no pill or rounded-pellet shapes.

Fichiers : `public/page-hero/nos-services-hero-desktop.webp`,
`public/page-hero/nos-services-hero-mobile.webp`

## 3. Service à domicile — `/nos-services/service-a-domicile`

Thème : présence régulière au domicile, lien social, quotidien soutenu.
Couleur : **vert** `#008551`.

> Minimalist single-line vector illustration for a wide website banner, thin
> continuous line art, one solid colour #008551 on a fully transparent
> background. Motifs concentrated near the left and right edges only, wide
> empty center: on the left a simple outlined house with a small window,
> on the right an outlined teacup with a thin steam curl above it. Calm
> editorial line-drawing style, no shading, no gradient, no text, no
> realistic human figure, no pill or rounded-pellet shapes.

Fichiers : `public/page-hero/service-a-domicile-hero-desktop.webp`,
`public/page-hero/service-a-domicile-hero-mobile.webp`

## 4. Accueil de jour — `/nos-services/accueil-de-jour`

Thème : activités en petit groupe la journée, retour au domicile le soir.
Couleur : **orange foncé** `#cf4700`.

> Minimalist single-line vector illustration for a wide website banner, thin
> continuous line art, one solid colour #cf4700 on a fully transparent
> background. Motifs concentrated near the left and right edges only, wide
> empty center: on the left a simple outlined sun with a few short rays, on
> the right a round table seen from a soft angle with two or three simple
> outlined chairs around it, no people. Calm editorial line-drawing style, no
> shading, no gradient, no text, no realistic human figure, no pill or
> rounded-pellet shapes.

Fichiers : `public/page-hero/accueil-de-jour-hero-desktop.webp`,
`public/page-hero/accueil-de-jour-hero-mobile.webp`

## 5. Hébergement temporaire — `/nos-services/hebergement-temporaire`

Thème : un séjour court, un entre-deux avec une date de début et de fin.
Couleur : **orange foncé** `#cf4700`.

> Minimalist single-line vector illustration for a wide website banner, thin
> continuous line art, one solid colour #cf4700 on a fully transparent
> background. Motifs concentrated near the left and right edges only, wide
> empty center: on the left a simple outlined suitcase, on the right an
> outlined calendar page with two dates marked by small circles (start and
> end, no legible numerals). Calm editorial line-drawing style, no shading, no
> gradient, no text, no realistic human figure, no pill or rounded-pellet
> shapes.

Fichiers : `public/page-hero/hebergement-temporaire-hero-desktop.webp`,
`public/page-hero/hebergement-temporaire-hero-mobile.webp`

## 6. Hébergement d'urgence — pas d'image, volontairement

`docs/photos-a-fournir.md` exclut déjà toute photo sur cette page : « le
sujet est anxiogène, une image ajouterait du bruit là où la famille cherche
une information et un numéro ». La même retenue s'applique à une illustration
de hero. **Ne pas générer d'image pour `/nos-services/hebergement-urgence` :
le fond sable plat actuel de `PageHero` reste inchangé sur cette page.**

## 7. Tarifs — `/tarifs`

Thème : comment se construit le coût, devis, aides financières. Couleur :
**vert** `#008551`.

> Minimalist single-line vector illustration for a wide website banner, thin
> continuous line art, one solid colour #008551 on a fully transparent
> background. Motifs concentrated near the left and right edges only, wide
> empty center: on the left a simple outlined document sheet with a few short
> horizontal lines suggesting text (no legible words), on the right a small
> outlined balance scale, perfectly level. Calm editorial line-drawing style,
> no shading, no gradient, no text, no realistic human figure, no pill or
> rounded-pellet shapes.

Fichiers : `public/page-hero/tarifs-hero-desktop.webp`,
`public/page-hero/tarifs-hero-mobile.webp`

## 8. Équipe — `/equipe`

Thème : une équipe pluridisciplinaire, continuité du service. Couleur :
**vert** `#008551`.

> Minimalist single-line vector illustration for a wide website banner, thin
> continuous line art, one solid colour #008551 on a fully transparent
> background. Motifs concentrated near the left and right edges only, wide
> empty center: on the left three small abstract overlapping circles of equal
> size suggesting a coordinated team, on the right a simple outlined open
> hand cradling a small leaf. Calm editorial line-drawing style, no shading,
> no gradient, no text, no realistic human figure, no pill or rounded-pellet
> shapes.

Fichiers : `public/page-hero/equipe-hero-desktop.webp`,
`public/page-hero/equipe-hero-mobile.webp`

## 9. Nos actions — `/nos-actions`

Thème : ateliers, sorties, rencontres, calendrier des activités. Couleur :
**orange foncé** `#cf4700` (déjà la couleur de la vie associative, voir
`image-prompts-light-sections.md`).

> Minimalist single-line vector illustration for a wide website banner, thin
> continuous line art, one solid colour #cf4700 on a fully transparent
> background. Motifs concentrated near the left and right edges only, wide
> empty center: on the left an open calendar page with one date circled (no
> legible numerals), on the right a few simple musical notes floating above a
> thin curved bench outline. Calm editorial line-drawing style, no shading, no
> gradient, no text, no realistic human figure, no pill or rounded-pellet
> shapes.

Fichiers : `public/page-hero/nos-actions-hero-desktop.webp`,
`public/page-hero/nos-actions-hero-mobile.webp`

## 10. Actualités — `/actualites`

Thème : la vie de l'association au fil du temps, les événements passés.
Couleur : **orange foncé** `#cf4700`.

> Minimalist single-line vector illustration for a wide website banner, thin
> continuous line art, one solid colour #cf4700 on a fully transparent
> background. Motifs concentrated near the left and right edges only, wide
> empty center: on the left a simple outlined picture frame hung slightly
> tilted, on the right a small potted plant with a few leaves next to a thin
> outlined teacup. Calm editorial line-drawing style, no shading, no
> gradient, no text, no realistic human figure, no pill or rounded-pellet
> shapes.

Fichiers : `public/page-hero/actualites-hero-desktop.webp`,
`public/page-hero/actualites-hero-mobile.webp`

> Note : la page dynamique `/actualites/[slug]` (chaque article) réutilise
> `PageHero` avec un `eyebrow` variable (la catégorie de l'article). Elle peut
> réutiliser **la même paire de fichiers** que la page d'index `/actualites`
> ci-dessus plutôt qu'un jeu par article : ne pas générer d'image
> supplémentaire pour cette route.

## 11. FAQ — `/faq`

Thème : les questions que posent les familles. Couleur : **vert** `#008551`.

> Minimalist single-line vector illustration for a wide website banner, thin
> continuous line art, one solid colour #008551 on a fully transparent
> background. Motifs concentrated near the left and right edges only, wide
> empty center: on the left a simple outlined speech bubble with a question
> mark drawn as a thin continuous line (not a typographic character), on the
> right a small outlined open book. Calm editorial line-drawing style, no
> shading, no gradient, no text, no realistic human figure, no pill or
> rounded-pellet shapes.

Fichiers : `public/page-hero/faq-hero-desktop.webp`,
`public/page-hero/faq-hero-mobile.webp`

## 12. Contact — `/contact`

Thème : joindre par téléphone, laisser un numéro pour être rappelé. Couleur :
**vert** `#008551`.

> Minimalist single-line vector illustration for a wide website banner, thin
> continuous line art, one solid colour #008551 on a fully transparent
> background. Motifs concentrated near the left and right edges only, wide
> empty center: on the left a simple outlined classic telephone handset, on
> the right an outlined envelope with a thin diagonal fold line. Calm
> editorial line-drawing style, no shading, no gradient, no text, no
> realistic human figure, no pill or rounded-pellet shapes.

Fichiers : `public/page-hero/contact-hero-desktop.webp`,
`public/page-hero/contact-hero-mobile.webp`

## 13. Prendre rendez-vous — `/prendre-rendez-vous`

Thème : parler de sa situation, premier échange. Couleur : **vert** `#008551`.

> Minimalist single-line vector illustration for a wide website banner, thin
> continuous line art, one solid colour #008551 on a fully transparent
> background. Motifs concentrated near the left and right edges only, wide
> empty center: on the left a simple outlined calendar page with one date
> circled (no legible numerals), on the right an outlined classic telephone
> handset. Calm editorial line-drawing style, no shading, no gradient, no
> text, no realistic human figure, no pill or rounded-pellet shapes.

Fichiers : `public/page-hero/prendre-rendez-vous-hero-desktop.webp`,
`public/page-hero/prendre-rendez-vous-hero-mobile.webp`

## 14. Mentions légales — `/mentions-legales`

Thème : informations légales, éditeur, hébergement. Couleur : **vert**
`#008551`, très discret (ces pages restent volontairement sobres).

> Minimalist single-line vector illustration for a wide website banner, thin
> continuous line art, one solid colour #008551 on a fully transparent
> background. Motifs concentrated near the left and right edges only, wide
> empty center: on the left a simple outlined document sheet with a small
> official-looking seal shape (plain circle outline, no emblem inside), on
> the right a thin outlined fountain pen at a slight angle. Calm editorial
> line-drawing style, extremely restrained, no shading, no gradient, no text,
> no realistic human figure, no pill or rounded-pellet shapes.

Fichiers : `public/page-hero/mentions-legales-hero-desktop.webp`,
`public/page-hero/mentions-legales-hero-mobile.webp`

## 15. Politique de confidentialité — `/politique-de-confidentialite`

Thème : les données, leur usage, la sécurité. Couleur : **vert** `#008551`.

> Minimalist single-line vector illustration for a wide website banner, thin
> continuous line art, one solid colour #008551 on a fully transparent
> background. Motifs concentrated near the left and right edges only, wide
> empty center: on the left a simple outlined shield shape, on the right an
> outlined document sheet with a small padlock shape above its top edge. Calm
> editorial line-drawing style, extremely restrained, no shading, no
> gradient, no text, no realistic human figure, no pill or rounded-pellet
> shapes.

Fichiers : `public/page-hero/politique-confidentialite-hero-desktop.webp`,
`public/page-hero/politique-confidentialite-hero-mobile.webp`

---

## Récapitulatif des fichiers attendus

| Page | Route | Couleur | Fichiers |
|---|---|---|---|
| L'association | `/l-association` | vert `#008551` | `association-hero-{desktop,mobile}.webp` |
| Nos services (index) | `/nos-services` | vert `#008551` | `nos-services-hero-{desktop,mobile}.webp` |
| Service à domicile | `/nos-services/service-a-domicile` | vert `#008551` | `service-a-domicile-hero-{desktop,mobile}.webp` |
| Accueil de jour | `/nos-services/accueil-de-jour` | orange `#cf4700` | `accueil-de-jour-hero-{desktop,mobile}.webp` |
| Hébergement temporaire | `/nos-services/hebergement-temporaire` | orange `#cf4700` | `hebergement-temporaire-hero-{desktop,mobile}.webp` |
| Hébergement d'urgence | `/nos-services/hebergement-urgence` | — | **aucune image, volontairement** |
| Tarifs | `/tarifs` | vert `#008551` | `tarifs-hero-{desktop,mobile}.webp` |
| Équipe | `/equipe` | vert `#008551` | `equipe-hero-{desktop,mobile}.webp` |
| Nos actions | `/nos-actions` | orange `#cf4700` | `nos-actions-hero-{desktop,mobile}.webp` |
| Actualités (index + articles) | `/actualites`, `/actualites/[slug]` | orange `#cf4700` | `actualites-hero-{desktop,mobile}.webp` (les deux routes partagent le même jeu) |
| FAQ | `/faq` | vert `#008551` | `faq-hero-{desktop,mobile}.webp` |
| Contact | `/contact` | vert `#008551` | `contact-hero-{desktop,mobile}.webp` |
| Prendre rendez-vous | `/prendre-rendez-vous` | vert `#008551` | `prendre-rendez-vous-hero-{desktop,mobile}.webp` |
| Mentions légales | `/mentions-legales` | vert `#008551` | `mentions-legales-hero-{desktop,mobile}.webp` |
| Politique de confidentialité | `/politique-de-confidentialite` | vert `#008551` | `politique-confidentialite-hero-{desktop,mobile}.webp` |

Soit **13 pages illustrées** (26 fichiers), plus la page d'urgence
volontairement sans image. La page d'accueil garde sa photo existante et
n'est pas concernée par ce fichier.

## Ne pas faire

- Ne pas toucher aux fichiers existants de `public/img-bg/` ou
  `public/assets/`.
- Ne pas générer d'image pour `/nos-services/hebergement-urgence` ni pour la
  page d'accueil.
- Ne pas générer de second jeu de fichiers pour `/actualites/[slug]` : cette
  route réutilise le jeu `actualites-hero-*`.
- Ne pas intégrer les images dans le code (`components/page-hero.tsx`, les
  pages de `app/`) : intégration faite séparément après validation visuelle
  du rendu de chaque image.
- Ne rien inventer visuellement qui suggère un agrément, un logo, un
  certificat ou une donnée factuelle sur l'association.

## Après génération

1. Créer le dossier `public/page-hero/` s'il n'existe pas et y déposer les
   26 fichiers avec les noms exacts ci-dessus.
2. Vérifier chaque image à l'œil : centre bien vide sur toute la largeur où
   le titre et le chapô doivent s'afficher, aucune forme en pill, une seule
   couleur de trait par fichier.
3. Intégration dans `components/page-hero.tsx` (ajout d'une prop `image`,
   sur le même patron que `Section`) : à faire dans une passe de code
   séparée, après validation visuelle.
