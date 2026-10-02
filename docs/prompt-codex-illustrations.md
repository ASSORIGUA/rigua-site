# Prompt Codex — illustrations des sections claires (accueil)

Prompt à copier tel quel dans Codex pour générer les 4 illustrations de
sections à fond clair de la page d'accueil.

---

Génère 4 images d'illustration pour le site RIGUA (association loi 1901,
accompagnement de personnes âgées/dépendantes), une par section à fond clair
de la page d'accueil, puis dépose-les dans `public/assets/`.

## Sections concernées (fond clair uniquement — ne pas en faire pour les
sections à fond rouge foncé "deep")

1. **services** — « Reconnaissez-vous votre situation ? » (orientation par
   situation vécue, pas par catalogue de services)
2. **parcours** — « Quatre étapes, du premier appel à l'accompagnement »
   (déroulé simple, rassurant)
3. **en-savoir-plus** — « Qui nous accompagnons, et comment »
4. **faq** — questions fréquentes des familles

## Style impératif

- **Illustration graphique/abstraite uniquement. Aucun visage, aucune
  silhouette humaine réaliste, aucune photo.** Le site interdit toute image
  d'illustration qui simule une vraie photo (personne, lieu) tant qu'elle
  n'a pas été fournie par le client — ces images ne doivent donc jamais
  ressembler à des photos ni à des personnes reconnaissables. Rester sur des
  motifs décoratifs : formes organiques douces, textures, motifs
  géométriques discrets, éléments évoquant le lien intergénérationnel de
  façon symbolique (jamais figurative).
- Registre calme, sobre, éditorial — surtout **pas** enjoué/saturé façon
  secteur associatif classique (pas de style « clipart », pas de dessin
  bonhomme souriant, pas de doodle).
- **Fond transparent obligatoire** (PNG ou WebP avec alpha). Ce sont des
  motifs de bordure, pas des aplats pleins : concentrer les éléments
  graphiques sur les bords/coins de l'image et laisser le centre
  **complètement vide/transparent**, car le texte de la section vient se
  poser dessus.
- Aucun texte, aucun lettrage dans l'image.
- Aucun angle arrondi façon "pill" dans les formes (le design system bannit
  les pills partout) — préférer des formes à coins nets ou légèrement
  arrondis (rayon discret, jamais un cercle plein en guise de bouton/forme).

## Palette stricte — ne pas en sortir, ne rien inventer

Utiliser exclusivement ces couleurs (dérivées du logo officiel) :

- Rouge encre : `#520003`
- Rouge : `#b5041d`
- Orange : `#f45c00` (clair) / `#cf4700` (foncé)
- Vert : `#008551`
- Crème / blanc cassé : `#fefbf6`

Fond transparent partout ailleurs. Ne pas utiliser de bleu, de rose, de
jaune vif ou toute couleur hors de cette liste.

## Livrables et format

Pour chacune des 4 sections, générer deux fichiers (comme le reste du site) :

- `public/assets/{nom-section}-illustration-desktop.webp` — format paysage,
  large (≈ 1920×640px, ratio ~3:1), motif concentré sur les bords gauche/droit
  et centre vide
- `public/assets/{nom-section}-illustration-mobile.webp` — format portrait
  (≈ 750×1000px, ratio ~3:4), motif concentré en haut/bas, centre vide

Noms de fichiers attendus :
- `public/assets/services-illustration-desktop.webp` /
  `public/assets/services-illustration-mobile.webp`
- `public/assets/parcours-illustration-desktop.webp` /
  `public/assets/parcours-illustration-mobile.webp`
- `public/assets/en-savoir-plus-illustration-desktop.webp` /
  `public/assets/en-savoir-plus-illustration-mobile.webp`
- `public/assets/faq-illustration-desktop.webp` /
  `public/assets/faq-illustration-mobile.webp`

Poids raisonnable (viser < 150 Ko par fichier, comme les motifs existants
dans `public/img-bg/`).

## Ne pas faire

- Ne pas toucher aux fichiers existants dans `public/img-bg/`.
- Ne pas générer d'image pour les sections à fond rouge foncé (« deep ») :
  Association, Actualités, Témoignages, ni pour le hero.
- Ne pas intégrer les images dans le code (`components/section.tsx`,
  `app/page.tsx`) : je m'en charge séparément après validation visuelle.
- Ne rien inventer visuellement qui suggère un agrément, un logo, un
  certificat ou une donnée factuelle sur l'association.
