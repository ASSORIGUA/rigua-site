# Prompts d'illustrations — coins des sections manquantes (page d'accueil)

Ce fichier liste, pour chaque section de la page d'accueil (`app/page.tsx`)
dont les assets **n'ont pas encore été générés**, un prompt de génération
d'illustration vectorielle (texte→image) prêt à l'emploi, ainsi que le nom
de fichier attendu une fois l'image produite.

## Périmètre de ce fichier

Les 5 sections retenues pour recevoir des illustrations de coin sont :

1. Services
2. L'association
3. Aller plus loin
4. Actualités
5. FAQ

Sur ces 5, **3 ont déjà leurs 4 assets** dans `public/assets/` (générés lors
d'une précédente passe Codex) :

| Section | Statut | Fichiers |
|---|---|---|
| Services | ✅ déjà générés | `services-corner-{top-left,top-right,bottom-left,bottom-right}.png` |
| Aller plus loin | ✅ déjà générés | `en-savoir-plus-corner-{top-left,top-right,bottom-left,bottom-right}.png` (le composant s'appelle `EnSavoirPlus`, d'où le préfixe `en-savoir-plus-`) |
| FAQ | ✅ déjà générés | `faq-corner-{top-left,top-right,bottom-left,bottom-right}.png` |

**Ce fichier ne couvre donc que les 2 sections encore manquantes :**
**L'association** et **Actualités**. Ne pas régénérer les 3 sections
ci-dessus.

(Un jeu d'assets `parcours-corner-*.png`, généré par erreur pour la
section « Comment cela se passe » qui ne fait pas partie de la liste
retenue, a été supprimé.)

Destination : **`public/assets/`** (dossier distinct des photos de fond de
`public/img-bg/`, qui ne sont pas modifiées par cette génération).

## Principe des quatre coins

Chaque section utilise **4 images**, une par coin (haut-gauche,
haut-droite, bas-gauche, bas-droite). Les quatre motifs d'une même section
forment une famille cohérente (même thème, même couleur de trait) mais ne
sont pas de simples rotations les uns des autres : chaque prompt est
composé pour son coin précis.

## Style commun à respecter sur toutes les illustrations

- Illustration vectorielle en ligne fine (line-art), pas de remplissage
  plein sauf accents ponctuels très discrets, registre éditorial et
  apaisé — jamais « clipart » associatif, jamais de dessin bonhomme
  souriant, jamais de doodle à main levée.
- **Une seule couleur de trait par fichier**, au choix parmi
  `#b5041d` (rouge de marque), `#cf4700` (orange foncé) ou `#008551`
  (vert), jamais deux couleurs mélangées dans une même illustration,
  jamais de dégradé ni d'ombre portée.
- Fond entièrement transparent (PNG ou SVG), aucun cadre, aucun rectangle
  de fond.
- Motifs symboliques et abstraits uniquement : **aucun visage, aucune
  silhouette humaine réaliste, aucune scène figurative.** Le lien social,
  le soin, la mémoire, la convivialité se suggèrent par des objets ou des
  formes (mains stylisées à la limite de l'abstraction, motifs organiques
  doux, éléments calendaires/temporels, formes de dialogue), jamais par
  une scène ou un personnage reconnaissable — cette règle est la même que
  celle qui interdit au site de poser une photo d'illustration à la place
  d'une vraie photo non fournie.
- Composition pensée pour un coin : le motif se déploie depuis l'angle de
  la page vers le centre, en s'estompant ou en réduisant sa densité de
  trait à mesure qu'il s'éloigne du coin, jamais un motif centré qu'on
  aurait simplement poussé dans un angle.
- Aucun angle en forme de pastille/pill plein : le design system bannit
  les pills partout. Préférer des formes à coins nets ou à rayon discret.
- Aucun texte, aucun lettrage, aucun logo dans l'image.
- Format source recommandé : SVG si l'outil le permet ; sinon PNG
  1200×1200 minimum, fond transparent, recadrable en carré selon le coin.

## 1. L'association — 4 coins

Section : `components/sections/association-apercu.tsx`
Thème : « Ce que le soin ne couvre pas » — l'origine de l'association (une
infirmière libérale), l'isolement qu'elle comble, le lien social ajouté au
soin.

**Prompt (coin haut-gauche) :**

> Minimalist single-line vector illustration of a simple outlined house
> with a small heart above the roofline, thin continuous line art, one
> solid colour #b5041d on a fully transparent background, composed to sit
> in the top-left corner of a webpage with the motif radiating from the
> corner and thinning out toward the center, no text, no shading, no
> gradient, calm editorial line-drawing style, no realistic human figure

**Prompt (coin haut-droite) :**

> Minimalist single-line vector illustration of a simple stethoscope
> outline curled into a loose loop, thin continuous line art, one solid
> colour #b5041d on a fully transparent background, composed to sit in
> the top-right corner of a webpage with the motif radiating from the
> corner and thinning out toward the center, no text, no shading, no
> gradient, calm editorial line-drawing style, no realistic human figure

**Prompt (coin bas-gauche) :**

> Minimalist single-line vector illustration of two abstract concentric
> circles slightly overlapping, suggesting two people linked together,
> thin continuous line art, one solid colour #b5041d on a fully
> transparent background, composed to sit in the bottom-left corner of a
> webpage with the motif radiating from the corner and thinning out
> toward the center, no text, no shading, no gradient, calm editorial
> line-drawing style, purely abstract, no human figure

**Prompt (coin bas-droite) :**

> Minimalist single-line vector illustration of an open hand outline
> cradling a small leaf, thin continuous line art, one solid colour
> #b5041d on a fully transparent background, composed to sit in the
> bottom-right corner of a webpage with the motif radiating from the
> corner and thinning out toward the center, no text, no shading, no
> gradient, calm editorial line-drawing style, no realistic human figure

Fichiers à produire :

- `public/assets/association-corner-top-left.png` (ou `.svg`)
- `public/assets/association-corner-top-right.png` (ou `.svg`)
- `public/assets/association-corner-bottom-left.png` (ou `.svg`)
- `public/assets/association-corner-bottom-right.png` (ou `.svg`)

## 2. Actualités — 4 coins

Section : `components/sections/actualites-liste.tsx`
Thème : « Ateliers, sorties, rencontres » — les activités organisées par
l'association au fil de l'année, la convivialité, le calendrier des
événements.

**Prompt (coin haut-gauche) :**

> Minimalist single-line vector illustration of an open calendar page with
> one date circled, no numerals legible, thin continuous line art, one
> solid colour #cf4700 on a fully transparent background, composed to sit
> in the top-left corner of a webpage with the motif radiating from the
> corner and thinning out toward the center, no text, no shading, no
> gradient, calm editorial line-drawing style

**Prompt (coin haut-droite) :**

> Minimalist single-line vector illustration of a simple picture frame
> outline hung slightly tilted, thin continuous line art, one solid
> colour #cf4700 on a fully transparent background, composed to sit in
> the top-right corner of a webpage with the motif radiating from the
> corner and thinning out toward the center, no text, no shading, no
> gradient, calm editorial line-drawing style

**Prompt (coin bas-gauche) :**

> Minimalist single-line vector illustration of a small potted plant with
> a few leaves next to a simple teacup outline, thin continuous line art,
> one solid colour #cf4700 on a fully transparent background, composed to
> sit in the bottom-left corner of a webpage with the motif radiating from
> the corner and thinning out toward the center, no text, no shading, no
> gradient, calm editorial line-drawing style

**Prompt (coin bas-droite) :**

> Minimalist single-line vector illustration of a few musical notes
> floating above a simple curved bench outline, thin continuous line art,
> one solid colour #cf4700 on a fully transparent background, composed to
> sit in the bottom-right corner of a webpage with the motif radiating
> from the corner and thinning out toward the center, no text, no
> shading, no gradient, calm editorial line-drawing style

Fichiers à produire :

- `public/assets/actualites-corner-top-left.png` (ou `.svg`)
- `public/assets/actualites-corner-top-right.png` (ou `.svg`)
- `public/assets/actualites-corner-bottom-left.png` (ou `.svg`)
- `public/assets/actualites-corner-bottom-right.png` (ou `.svg`)

## Récapitulatif des fichiers attendus (8 au total, sections manquantes uniquement)

| Section | Haut-gauche | Haut-droite | Bas-gauche | Bas-droite |
|---|---|---|---|---|
| L'association | `association-corner-top-left.png` | `association-corner-top-right.png` | `association-corner-bottom-left.png` | `association-corner-bottom-right.png` |
| Actualités | `actualites-corner-top-left.png` | `actualites-corner-top-right.png` | `actualites-corner-bottom-left.png` | `actualites-corner-bottom-right.png` |

**Instruction pour Codex** : déposer les 8 fichiers ci-dessus tels quels
(mêmes noms, extension `.svg` si le générateur produit du SVG, sinon
`.png`) dans `public/assets/`, qui existe déjà et contient les assets des
sections Services, Aller plus loin et FAQ — ne pas les toucher ni les
régénérer. Ne générer que les 8 fichiers listés ici, pour les sections
L'association et Actualités uniquement. Ne pas générer d'image pour les
autres sections de la page d'accueil (hero, Comment cela se passe,
Pourquoi nous, Témoignages). Ne pas intégrer les images dans le code
(`components/section.tsx`, `app/page.tsx`) — intégration faite séparément
après validation visuelle.
