# Prompts génération d'images — lot 2 (pages service, Équipe, Tarifs)

⚠️ **Ces images sont un pis-aller.** Le brief (§10) interdit les visuels de
banque d'images ou générés artificiellement pour représenter la structure, les
personnes accompagnées ou l'équipe : voir [docs/photos-a-fournir.md](photos-a-fournir.md).
Elles habillent temporairement des sections qui n'ont aujourd'hui aucune
image de fond, en attendant un vrai reportage photo.

Ce document reprend le pattern déjà appliqué à `app/nos-services/page.tsx`
(voir [docs/prompts-images-fond-ia.md](prompts-images-fond-ia.md)) et
l'étend à **6 pages, 6 sections, 12 fichiers**.

## Le pattern à reproduire

Chaque section concernée est un composant `<Section surface="deep" grain>`
(`components/section.tsx`) : fond vert profond, grain léger, texte déjà
blanc. Lui donner une image de fond se fait par la prop `image`, qui pose
un **voile sombre** par-dessus la photo pour garantir le contraste du
texte — la photo elle-même n'a donc pas besoin d'être très contrastée,
seulement de rester dans la palette du site.

```tsx
<Section
  surface="deep"
  grain
  image={{
    srcMobile: "/img-bg/<nom>-mobile.png",
    srcDesktop: "/img-bg/<nom>-desktop.png",
  }}
>
```

Contraintes techniques, identiques pour les 12 fichiers :

- **Format PNG**, pas de fichier `.jpg` ni `.webp` (convention déjà en
  place pour les fichiers `nos-services-*` les plus récents dans
  `public/img-bg/`).
- **Desktop : 1672×941px** (ratio 16:9 paysage).
- **Mobile : 941×1672px** (ratio 9:16 portrait — recadrage dédié, pas le
  même fichier redimensionné).
- Centre de l'image assez sombre et peu chargé en détail pour laisser un
  titre et un texte **blancs** se lire par-dessus, dans les deux formats.
- Palette : dominante **vert forêt / vert bouteille profond**, jamais de
  bleu, de gris froid ou de couleur saturée hors charte. Une touche
  d'orange terracotta très désaturé est acceptable en accent discret,
  jamais en dominante. Voir [docs/direction-visuelle.md](direction-visuelle.md)
  §3 pour la palette de référence.
- Aucune personne visible, reconnaissable ou non — silhouette y compris.
  Aucun visage, aucune scène figurative avec un personnage.
- Aucun texte, aucun lettrage, aucun logo généré dans l'image.
- Style photographie éditoriale réaliste, grain léger, pas d'illustration,
  pas de rendu 3D, pas de HDR excessif, pas de filtre superposé.
- Chaque paire mobile/desktop doit rester reconnaissable comme la même
  scène recadrée différemment, pas deux scènes différentes.

## Où déposer les fichiers

Tous dans `public/img-bg/`, aux noms exacts indiqués sous chaque prompt
ci-dessous (déjà au format attendu par le composant `Section`).

---

## 1. Service à domicile — section « Comment cela commence »

Page : `app/nos-services/[slug]/page.tsx` avec `slug: "service-a-domicile"`
(section « Déroulé », eyebrow « Étape par étape »). Le service : une
présence régulière chez une personne âgée qui vit seule, pour rompre
l'isolement sans bousculer ses habitudes.

Fichiers :
- `public/img-bg/service-a-domicile-deroule-mobile.png`
- `public/img-bg/service-a-domicile-deroule-desktop.png`

> Photo réaliste en tons sombres et profonds, dominante vert forêt/vert
> bouteille plutôt que noir ou bleu, plan rapproché d'une table basse ou
> d'un guéridon dans un salon de maison individuelle en fin de journée,
> avec un plaid en tricot plié, une tasse vide et une lampe à abat-jour
> allumée projetant une lumière chaude et douce dans la pénombre
> environnante. Aucune personne visible dans le cadre. Ambiance intime et
> habitée, pas triste, pas clinique. Pas de bleu, pas de couleur saturée
> hors palette, pas de flash. Style photographie éditoriale, grain léger,
> pas de rendu 3D. Format paysage 16:9, centre de l'image assez sombre et
> peu chargé pour laisser un titre et un texte blancs se lire par-dessus.

Prompt dédié au recadrage mobile (portrait, sujet recentré) :

> Même scène, même lumière chaude en contre-point du vert profond
> ambiant, même absence de personnage, cadrée en portrait serré sur la
> lampe allumée et le plaid replié, centre de l'image assez sombre et
> dégagé de tout détail pour laisser un titre et un texte blancs se lire
> par-dessus. Format portrait 9:16.

---

## 2. Accueil de jour — section « Comment cela commence »

Page : `app/nos-services/[slug]/page.tsx` avec `slug: "accueil-de-jour"`.
Le service : la personne est accueillie en journée dans la structure,
activités et lien social, retour au domicile le soir.

Fichiers :
- `public/img-bg/accueil-de-jour-deroule-mobile.png`
- `public/img-bg/accueil-de-jour-deroule-desktop.png`

> Photo réaliste en tons sombres et profonds, dominante vert forêt/vert
> bouteille, plan large d'une salle commune associative vide en fin de
> journée après le départ des participants, chaises repoussées autour
> d'une grande table en bois, une fenêtre haute laissant entrer un dernier
> rayon de lumière chaude du couchant. Aucune personne visible dans le
> cadre. Ambiance calme et rassurante, pas clinique, pas triste. Pas de
> bleu, pas de couleur saturée hors palette, pas de flash. Style
> photographie éditoriale, grain léger, pas de rendu 3D. Format paysage
> 16:9, centre de l'image assez sombre et peu chargé pour laisser un
> titre et un texte blancs se lire par-dessus.

Prompt dédié au recadrage mobile (portrait, sujet recentré) :

> Même scène, même lumière de fin de journée, même absence de
> personnage, cadrée en portrait serré sur la table en bois et les
> chaises repoussées, centre de l'image assez sombre et dégagé de tout
> détail pour laisser un titre et un texte blancs se lire par-dessus.
> Format portrait 9:16.

---

## 3. Hébergement temporaire — section « Comment cela commence »

Page : `app/nos-services/[slug]/page.tsx` avec
`slug: "hebergement-temporaire"`. Le service : un séjour de courte durée,
une date d'arrivée et une date de sortie posées dès le départ.

Fichiers :
- `public/img-bg/hebergement-temporaire-deroule-mobile.png`
- `public/img-bg/hebergement-temporaire-deroule-desktop.png`

> Photo réaliste en tons sombres et profonds, dominante vert forêt/vert
> bouteille, plan rapproché d'une chambre simple et habitée en fin de
> journée : une valise ouverte posée sur un fauteuil, un lit fait avec un
> dessus-de-lit sobre, une lumière chaude de lampe de chevet allumée.
> Aucune personne visible dans le cadre. Ambiance de transition apaisée,
> ni hôpital ni hôtel, pas clinique. Pas de bleu, pas de couleur saturée
> hors palette, pas de flash. Style photographie éditoriale, grain léger,
> pas de rendu 3D. Format paysage 16:9, centre de l'image assez sombre et
> peu chargé pour laisser un titre et un texte blancs se lire par-dessus.

Prompt dédié au recadrage mobile (portrait, sujet recentré) :

> Même scène, même lumière chaude de lampe de chevet, même absence de
> personnage, cadrée en portrait serré sur la valise ouverte et le lit
> fait, centre de l'image assez sombre et dégagé de tout détail pour
> laisser un titre et un texte blancs se lire par-dessus. Format portrait
> 9:16.

---

## 4. Hébergement d'urgence — section « Ce que vous faites, dans l'ordre »

Page : `app/nos-services/[slug]/page.tsx` avec
`slug: "hebergement-urgence"`. Le service : une situation qui ne peut pas
attendre. Ton particulièrement sobre : pas d'anxiété visuelle ajoutée, le
brief interdit déjà toute image sur le hero de cette page précise (voir
`app/nos-services/[slug]/page.tsx`, commentaire ligne ~79) — cette
seconde image, plus bas dans la page et après l'avertissement, peut
exister mais doit rester particulièrement calme, jamais dramatique.

Fichiers :
- `public/img-bg/hebergement-urgence-deroule-mobile.png`
- `public/img-bg/hebergement-urgence-deroule-desktop.png`

> Photo réaliste en tons sombres et profonds, dominante vert forêt/vert
> bouteille, plan rapproché d'un téléphone fixe décroché posé sur une
> table en bois près d'une fenêtre, à la nuit tombée, avec une seule
> lumière chaude et douce en contre-jour. Composition sobre, beaucoup
> d'espace négatif, aucune tension ni dramatisation visuelle : calme
> plutôt qu'anxiogène. Aucune personne visible dans le cadre. Pas de
> bleu, pas de couleur saturée hors palette, pas de flash, pas de rouge
> (couleur réservée au balisage du parcours urgence dans l'interface,
> jamais dans une photo). Style photographie éditoriale, grain léger, pas
> de rendu 3D, pas de HDR excessif. Format paysage 16:9, centre de
> l'image assez sombre et peu chargé pour laisser un titre et un texte
> blancs se lire par-dessus.

Prompt dédié au recadrage mobile (portrait, sujet recentré) :

> Même scène, même calme, même absence de personnage et de rouge, cadrée
> en portrait serré sur le téléphone décroché et la lumière en
> contre-jour, centre de l'image assez sombre et dégagé de tout détail
> pour laisser un titre et un texte blancs se lire par-dessus. Format
> portrait 9:16.

---

## 5. Équipe — section « Le service à domicile »

Page : `app/equipe/page.tsx`, section `surface="deep" grain`, eyebrow
« Le service à domicile », titre « Ce que fait une aide à domicile, et ce
qu'elle ne fait pas ». Thème d'origine du visuel : la régularité d'un
visage connu, le cahier de liaison partagé entre intervenants — repris ici
comme fond de la section service à domicile.

Fichiers :
- `public/img-bg/equipe-service-domicile-mobile.png`
- `public/img-bg/equipe-service-domicile-desktop.png`

> Photo réaliste en tons sombres et profonds, dominante vert forêt/vert
> bouteille, plan rapproché d'un cahier relié ouvert posé sur une table en
> bois, pages lignées visibles mais sans texte lisible, un stylo posé à
> côté, éclairé par une lumière chaude et douce de lampe en fin de
> journée. Aucune personne visible dans le cadre. Ambiance de continuité
> et de soin, pas clinique, pas administrative. Pas de bleu, pas de
> couleur saturée hors palette, pas de flash. Style photographie
> éditoriale, grain léger, pas de rendu 3D. Format paysage 16:9, centre de
> l'image assez sombre et peu chargé pour laisser un titre et un texte
> blancs se lire par-dessus.

Prompt dédié au recadrage mobile (portrait, sujet recentré) :

> Même scène, même lumière chaude de lampe, même absence de personnage,
> cadrée en portrait serré sur le cahier ouvert et le stylo, centre de
> l'image assez sombre et dégagé de tout détail pour laisser un titre et
> un texte blancs se lire par-dessus. Format portrait 9:16.

---

## 6. Tarifs — section « Nos engagements »

Page : `app/tarifs/page.tsx`, section `surface="deep" grain`, eyebrow
« Nos engagements », titre « Trois choses que nous ne ferons pas ».
Thème : des engagements écrits, opposables, la transparence sur ce qui
n'est pas encore arrêté.

Fichiers :
- `public/img-bg/tarifs-engagements-mobile.png`
- `public/img-bg/tarifs-engagements-desktop.png`

> Photo réaliste en tons sombres et profonds, dominante vert forêt/vert
> bouteille, plan rapproché d'une feuille de papier posée sur un bureau en
> bois avec un stylo à côté, sans aucun texte lisible sur la feuille,
> éclairée par une lumière chaude et douce de lampe de bureau en fin de
> journée. Aucune personne visible dans le cadre. Ambiance sobre et
> sérieuse, celle d'un document qu'on s'engage à respecter, pas clinique,
> pas commerciale. Pas de bleu, pas de couleur saturée hors palette, pas
> de flash. Style photographie éditoriale, grain léger, pas de rendu 3D.
> Format paysage 16:9, centre de l'image assez sombre et peu chargé pour
> laisser un titre et un texte blancs se lire par-dessus.

Prompt dédié au recadrage mobile (portrait, sujet recentré) :

> Même scène, même lumière chaude de lampe de bureau, même absence de
> personnage, cadrée en portrait serré sur la feuille et le stylo, centre
> de l'image assez sombre et dégagé de tout détail pour laisser un titre
> et un texte blancs se lire par-dessus. Format portrait 9:16.

---

## Récapitulatif des fichiers attendus (12 au total)

| Page | Section | Mobile (941×1672) | Desktop (1672×941) |
|---|---|---|---|
| Service à domicile | Comment cela commence | `service-a-domicile-deroule-mobile.png` | `service-a-domicile-deroule-desktop.png` |
| Accueil de jour | Comment cela commence | `accueil-de-jour-deroule-mobile.png` | `accueil-de-jour-deroule-desktop.png` |
| Hébergement temporaire | Comment cela commence | `hebergement-temporaire-deroule-mobile.png` | `hebergement-temporaire-deroule-desktop.png` |
| Hébergement d'urgence | Ce que vous faites, dans l'ordre | `hebergement-urgence-deroule-mobile.png` | `hebergement-urgence-deroule-desktop.png` |
| Équipe | Le service à domicile | `equipe-service-domicile-mobile.png` | `equipe-service-domicile-desktop.png` |
| Tarifs | Nos engagements | `tarifs-engagements-mobile.png` | `tarifs-engagements-desktop.png` |

## Instruction pour Codex

Générer les 12 fichiers PNG ci-dessus (un prompt desktop 16:9 et un prompt
mobile 9:16 par ligne du tableau, tels que rédigés dans les sections 1 à
6), aux dimensions exactes indiquées (1672×941 desktop, 941×1672 mobile),
et les déposer directement dans `public/img-bg/` avec les noms de fichier
exacts ci-dessus. Ne pas générer d'autre fichier, ne pas toucher aux
fichiers déjà présents dans `public/img-bg/`. Ne pas modifier de code
React/TSX : l'intégration des props `image` sur les `<Section>`
correspondants est faite séparément, après validation visuelle des
fichiers.

## Après génération (intégration, hors périmètre Codex)

1. Vérifier chaque paire à l'œil : palette bien dans les verts profonds de
   la charte, aucune personne ni silhouette, centre assez sombre et peu
   chargé pour la lisibilité du texte blanc par-dessus.
2. Ajouter la prop `image={{ srcMobile, srcDesktop }}` sur la `<Section>`
   correspondante dans chacun des 6 fichiers de page.
3. Vérifier le rendu à 375, 768, 1280, 1440 et 1920px : le voile sombre de
   `Section` doit garder le texte lisible (contraste AA) sur toute la
   largeur de l'image, y compris aux découpes de `object-cover` sur
   mobile.
4. Remplacer par une vraie photo dès qu'elle existe, sans autre
   changement de code (même prop `image`, juste le fichier).
