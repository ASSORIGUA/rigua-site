<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Design system — Présence & Autonomie

La direction visuelle complète est dans [docs/direction-visuelle.md](docs/direction-visuelle.md).
À lire avant toute décision visuelle. Ci-dessous, les règles qui se cassent le plus facilement.

## Couleurs

- Toute la palette dérive de `public/logo.svg`. **Ne jamais inventer une couleur.**
- Jamais de hex brut dans un composant : passer par les tokens de `app/globals.css`.
- Trois rôles pour l'ocre, à ne pas confondre :
  `--accent` (l'aplat) · `--accent-foreground` (l'encre **sur** un aplat ocre) · `--accent-ink` (l'ocre **comme** encre).
- Une section qui change de fond passe par `<Section surface="warm|sand|deep">`, qui pose
  `data-surface` **et** `bg-background` ensemble. Jamais `bg-surface-sand` ni `bg-navy-900`
  en direct : ces utilitaires posent le fond sans basculer les tokens de texte, et le
  texte secondaire tombe sous le seuil AA.
- La règle `[data-surface] { color: var(--foreground) }` de `globals.css` **n'est pas
  décorative, ne pas la retirer**. Sans elle, un `<p>` sans classe de couleur hérite la
  valeur calculée sur `body`, soit du marine sur les sections marine : ratio 1:1.
- Jamais d'opacité sous 0,85 sur un texte lisible. La hiérarchie se fait par la taille, le
  grammage et la couleur, pas par l'alpha.

## Échelle

- Cible tactile 44×44px minimum, corps 16px minimum. Le public est âgé ou proche de
  personnes âgées : ce sont des planchers, pas des préférences.
- Rayon 8px (`rounded-md`). **Aucun pill nulle part** : c'est la rupture visuelle voulue avec
  les concurrents du secteur, qui en utilisent tous.
- Titres : Newsreader, uniquement à 24px et plus. En dessous, Inclusive Sans.

## Composants

- `components/ui/*` est déjà retravaillé. Un `npx shadcn add` réinstalle la version d'origine :
  après tout ajout, reprendre l'échelle (44px / 16px / rayon 8px) et remplacer les icônes.
- **Pas de grille de cartes** pour les services ou les avantages. Rangées alternées, timeline,
  accordéon ou tableau selon le contenu.
- Carousel : toujours le composant `carousel.tsx` (Embla). Jamais de scroll-snap CSS maison.
- Toute cellule de grid ou item de flex contenant un `<Table>` a besoin de `min-w-0`.

## Icônes

- Iconify, jeu `solar`. Lucide est désinstallé, ne pas le réintroduire.
- Les composants n'écrivent jamais un nom Iconify : ils utilisent un nom sémantique via
  `<Icon name="..." />`. Pour ajouter une icône, éditer le manifeste de
  `scripts/build-icons.mjs` puis `npm run icons`.
- **Regarder l'icône avant de la valider.** Les noms Solar trompent : `scale` est le
  redimensionnement, pas la balance de justice. Vérifier sur `/design-system`.
- `<Icon>` ne doit jamais être passé à une prop `render` de Base UI : `render` clone
  l'élément et lui injecte des enfants, ce qui casse le SVG injecté. Le passer en enfant.

## Logo

- `public/logo.svg` est le master. Les variantes et `components/logo.tsx` sont **générées** :
  `npm run logo`. Ne pas les éditer à la main.
- Sur fond marine, utiliser la variante `inverse` : le contour marine du master y disparaît.
- `currentColor` ne fonctionne pas dans une balise `<img>`. La variante `mono` exige le
  composant `<Logo variant="mono" />`.

## Contenu et vérité

Le brief interdit d'inventer un agrément, une certification, un tarif, une capacité
d'accueil, un délai ou une coordonnée. Ce n'est pas une préférence éditoriale, c'est
la contrainte n°1 du projet.

- Tout ce qui n'est pas confirmé vit dans `lib/site.ts` avec `aConfirmer: true`, et le
  site affiche « à confirmer » au lieu d'une valeur. **Ne jamais remplir un champ pour
  faire joli.**
- `lib/jsonld.ts` omet du balisage tout champ non confirmé. Une adresse inventée dans
  un bloc JSON-LD se retrouve dans la fiche Google et devient très difficile à corriger.
- Le texte des pages vient de `lib/content/*`. Une même phrase ne doit exister qu'à un
  seul endroit : c'est ce qui empêche le vocabulaire de dériver d'une page à l'autre.
- Jamais « clients ». On dit personnes accompagnées, personnes accueillies, familles,
  proches, aidants. `GIR` est le seul sigle du site et il est expliqué à chaque apparition.
- Les photos passent par `<PhotoSlot>`, qui réserve l'emplacement et décrit le cadrage
  attendu. Ne pas y mettre d'image d'illustration en attendant les vraies.

## Formulaire

- Le seul garde anti-robot est le champ leurre. **Ne pas rajouter de garde de délai
  minimal** : il a été essayé, il jetait de vraies demandes avec une confirmation
  d'envoi. Pas de captcha tiers non plus, ce serait un transfert de données.
- Sans `RESEND_API_KEY`, `DEMANDES_EMAIL_TO` et `DEMANDES_EMAIL_FROM`, la production
  échoue explicitement et renvoie vers le téléphone. Ne jamais faire répondre
  « demande envoyée » quand rien n'est parti.
- `DEMANDES_DEMO=1` pour la recette : la confirmation s'affiche et le dit.

## Vérification

Le rendu, pas le code. Ces défauts ont tous été trouvés à la mesure et aucun à la
relecture : paragraphes marine sur fond marine, en-tête coupé à 1280px, tableau qui
élargit ses ancêtres, cibles à 21px, icône qui ne représente pas ce que son nom dit.

Avant de considérer un changement terminé : `npx tsc --noEmit`, `npm run lint`,
`npm run build`, puis mesurer le rendu à 375, 768, 1280, 1440 et 1920px.

## Commandes

```bash
npm run icons    # régénère lib/icons/bundle.ts depuis le manifeste
npm run logo     # régénère les variantes du logo et components/logo.tsx
npm run assets   # les deux
```

`/design-system` est la page de référence vivante (non indexée) : y vérifier tout changement.

## Documentation

- [docs/direction-visuelle.md](docs/direction-visuelle.md) — la direction et ses raisons
- [docs/informations-a-completer.md](docs/informations-a-completer.md) — ce qui manque et son effet
- [docs/photos-a-fournir.md](docs/photos-a-fournir.md) — les prises de vue à réaliser
