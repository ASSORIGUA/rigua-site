# Prompts ChatGPT — images de fond (placeholder temporaire)

⚠️ **Ces images sont un pis-aller.** Le brief (§10) interdit les visuels de
banque d'images ou générés artificiellement pour représenter la structure, les
personnes accompagnées ou l'équipe : voir [docs/photos-a-fournir.md](photos-a-fournir.md).
Utiliser ces prompts pour habiller les sections en attendant les vraies
photos, puis **remplacer par un vrai reportage photo** dès qu'il est
disponible. Ce document couvre actuellement les deux sections de
`app/nos-services/page.tsx` qui n'ont pas encore d'image de fond ; voir
« Sections déjà résolues » plus bas pour ce qui est hors périmètre.

Chaque image sert de fond de section pleine largeur, avec un voile posé
par-dessus (`components/section.tsx`, prop `image`) : elle peut donc être
sombre ou chargée sans nuire à la lisibilité du texte. Le composant attend
une paire de fichiers, un recadrage mobile et un recadrage desktop
(`srcMobile` / `srcDesktop`), tous deux en **WebP, 2000px de large minimum
pour le desktop, orientation paysage**. Le voile posé par `Section` est
« clair » sur les surfaces `warm` et `sand` (texte sombre dessus) et
« sombre » sur `surface="deep"` (texte clair dessus) — la photo n'a donc
pas besoin d'être elle-même très contrastée, seulement de rester dans la
palette du site (voir [docs/direction-visuelle.md](direction-visuelle.md)
§3) : verts profonds, orange doux, crème et papier — jamais de bleu, de
gris froid ou de couleur saturée hors palette.

## 1. Comment cela se passe

Section de `app/nos-services/page.tsx` (⚠️ pas celle du même nom sur la
page d'accueil, qui a déjà ses fichiers), `surface="deep" grain`, voile
**sombre** — le texte y est déjà blanc, donc la photo peut être plus
sombre/contrastée sans risque de lisibilité, et doit rester dans les
verts profonds de la charte plutôt que virer au noir neutre. Fichiers
attendus :

- `public/img-bg/nos-services-comment-cela-se-passe-mobile.png` ✅ déposé
- `public/img-bg/nos-services-comment-cela-se-passe-desktop.png` ✅ déposé

> Photo réaliste en tons sombres et profonds, dominante vert forêt/vert
> bouteille plutôt que noir ou bleu, plan large d'un couloir ou d'une
> entrée de maison individuelle en fin de journée, porte d'entrée
> entrouverte avec un rai de lumière chaude qui entre, un téléphone fixe ou
> un carnet de rendez-vous posé sur une console en bois dans la
> pénombre. Aucune personne visible dans le cadre. Pas de bleu, pas de
> couleur saturée hors palette, pas de flash, pas de texte ni de logo dans
> l'image. Style photographie éditoriale, grain léger, pas de rendu 3D,
> pas de HDR excessif. Format paysage 16:9, centre de l'image assez sombre
> et peu chargé pour laisser un titre et un texte blancs se lire
> par-dessus.

Prompt dédié au recadrage mobile (portrait, sujet recentré) :

> Même scène, même lumière, même dominante vert profond, même absence de
> personnage, cadrée en portrait serré sur la porte d'entrée et la
> console en bois, avec le centre de l'image assez sombre et dégagé de
> tout détail pour laisser un titre et un texte blancs se lire par-dessus.
> Format portrait 4:5.

## 2. Si vous hésitez

Section de la page `app/nos-services/page.tsx`, `surface="warm"`, voile
clair. **Cette section n'a actuellement aucune image de fond** (pas de
prop `image` sur ce `<Section>`) : à ajouter au composant une fois les
fichiers déposés. Fichiers attendus, même convention que ci-dessus :

- `public/img-bg/nos-services-si-vous-hesitez-mobile.png` ✅ déposé
- `public/img-bg/nos-services-si-vous-hesitez-desktop.png` ✅ déposé

La section aide une famille qui ne sait pas encore quel service demander
à partir de sa situation plutôt que d'un nom de service (`Orienteur`) :
l'image doit évoquer l'hésitation qui se résout, pas l'urgence ni la
tristesse.

> Photo réaliste, lumière naturelle douce de fin de matinée, plan large
> d'une table de cuisine ou de salon dans une maison individuelle
> française, avec deux tasses de thé ou de café posées face à face et un
> carnet ouvert avec un stylo, comme au début d'une conversation posée.
> Aucune personne visible dans le cadre, seulement les objets qui
> suggèrent l'échange. Palette chaude et douce proche de la charte du site
> (crème, bois clair, une touche de vert sauge ou d'orange terracotta très
> désaturé), pas de couleurs saturées, pas de bleu, pas de flash, pas de
> texte ni de logo dans l'image. Style photographie éditoriale, pas
> d'illustration, pas de rendu 3D. Format paysage 16:9, centre de l'image
> dégagé pour laisser un titre et un texte se lire par-dessus.

Prompt dédié au recadrage mobile (portrait, sujet recentré) :

> Même scène, même lumière, même absence de personnage, cadrée en portrait
> serré sur les deux tasses et le carnet ouvert, avec le centre de l'image
> dégagé de tout détail pour laisser un titre et un texte se lire
> par-dessus. Format portrait 4:5.

## Sections déjà résolues

Les sections « Comment cela se passe », « Pourquoi nous » et « La vie de
l'association » **de la page d'accueil** (`app/page.tsx`) ont déjà leurs
fichiers `.webp` mobile/desktop en place et ne sont pas couvertes par ce
document. Ne pas les régénérer.

## Après génération

Les 4 fichiers ci-dessus sont déjà déposés dans `public/img-bg/` et la
prop `image={{ srcMobile, srcDesktop }}` est déjà câblée sur les deux
`<Section>` correspondants dans `app/nos-services/page.tsx`.

Reste à faire :

1. Vérifier le rendu à 375, 768, 1280, 1440 et 1920px : le voile de
   `Section` doit garder le texte lisible (contraste AA) sur toute la
   largeur de l'image, y compris aux découpes de `object-cover` sur mobile.
2. Remplacer par une vraie photo dès qu'elle existe, sans autre changement
   de code (même prop `image`, juste le fichier).
