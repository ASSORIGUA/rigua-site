# Direction Visuelle Unique — RIGUA — 26 juillet 2026 (palette mise à jour le 16 août 2026)

> Document produit selon le protocole `design-sources` (5 étapes), avant toute décision de code.
> Secteur : association loi 1901, services à la personne, médico-social.
> Cible : familles, proches et aidants d'une personne âgée, dépendante ou fragile.

---

## 1. Sources consultées

| Source | Méthode | Pattern extrait |
|---|---|---|
| **adapa01.fr** (association départementale) | Scraping branding (Firecrawl) | Montserrat unique, 3 couleurs vives simultanées (orange `#F59C00`, teal `#0090A4`, magenta `#CA1B63`), boutons pill `1000px`, thème WordPress générique |
| **petits-fils.com** (leader premium du secteur) | Screenshot + audit DOM (Playwright) | Montserrat 60px, bleu saturé `#0067DA`, photo découpée d'une senior souriante posée sur une arche jaune, rangée de 6 cercles d'icônes multicolores |
| **ouihelp.fr** (aide à domicile) | Screenshot + audit DOM (Playwright) | Source Sans + Baloo, corail `#ED656A`, pills `40px`, effet surligneur fluo sur le texte, étoiles griffonnées à la main, grille 3 colonnes de réassurance sous le hero |
| **21st.dev** | MCP `get_inspiration` | Aucun composant sectoriel pertinent. Confirme que le hero et les sections doivent être codés à la main (trop spécifiques au client) |
| **Iconify** (7 401 icônes Solar) | MCP `search_icons` + requête locale | Jeu `solar` variante `line-duotone` : trait + aplat semi-opaque, donc bicolore par construction |

## 2. Opportunité de différenciation

**Ce que font TOUS les concurrents, sans exception :**

1. Sans-serif géométrique (Montserrat ou proche), en gras, partout.
2. Une à trois couleurs très saturées, choisies pour paraître « gaies ».
3. Boutons pill (`border-radius` 40 à 1000px).
4. Une rangée de cercles d'icônes multicolores juste sous le hero.
5. Une photo de senior souriante détourée sur une forme colorée.
6. Une organisation du contenu **par service** : « voici nos 5 prestations ».
7. Un registre commercial, parfois infantilisant (surligneurs fluo, doodles).

Le secteur confond « rassurant » avec « enjoué et saturé ». Résultat : tous ces sites se ressemblent, et aucun ne s'adresse à un adulte qui traverse un moment difficile.

**Ce que personne ne fait :**

> **Entrer par la situation, pas par le catalogue de services.**

Une famille n'arrive pas en pensant « je cherche un accueil de jour ». Elle arrive en pensant *« mon père ne peut plus rester seul la journée »*, *« je sors ma mère de l'hôpital vendredi »*, *« je n'en peux plus, j'ai besoin de souffler »*. Le brief le dit deux fois : les questions récurrentes au téléphone (§2) sont toutes des situations, et la priorité UX n°3 (§20) est « savoir si la situation de son proche peut correspondre ».

Différenciation retenue : **un registre éditorial calme, désaturé, très lisible, et une entrée par la situation.**

## 3. Palette

> **Mise à jour du 16 août 2026.** Le nom officiel de l'association a été confirmé :
> **RIGUA** (Regroupement Intergénération le Guadeloupe), et remplace le nom de
> projet provisoire « Présence & Autonomie ». Le fichier fourni, `public/logo_rigua.svg`,
> est un badge officiel (PNG encapsulé, dégradés et typographie circulaire — voir §8),
> radicalement différent de l'ancien logo générique marine/sable sur lequel la
> palette ci-dessous était initialement bâtie. La palette entière a donc été
> reconstruite par échantillonnage des pixels du vrai logo. Rien n'est inventé.

Entièrement dérivée du logo officiel (`public/logo_rigua.svg`), aucune couleur inventée.
Le badge contient quatre teintes : vert émeraude (anneau, pictogramme), orange/vermillon
en dégradé (médaillon), rouge profond (anneau extérieur) et blanc cassé (disque central).

| Rôle | Hex | Origine | Usage |
|---|---|---|---|
| **Encre** | `#00381c` | Vert du logo, assombri (green-900) | Texte courant, titres |
| **Vert** | `#00532d` | Vert du logo, assombri (green-800) | CTA primaire, liens, structure |
| **Vert logo** | `#03a667` | Logo (anneau et pictogramme, exact) | Primitive de référence, rarement utilisée telle quelle |
| **Crème** | `#dfd8cc` | Disque central du logo, désaturé en échelle | Sections chaleureuses, aplats |
| **Papier** | `#fdfbf7` | Crème désaturée à peine | Fond dominant du site |
| **Orange** | `#fb9272` | Dégradé du médaillon, éclairci (orange-400) | Couleur de signal : filets, états actifs, remplissage duotone des icônes |
| **Rouge** | `#b70413` | Logo (anneau extérieur, exact — red-600) | Uniquement le parcours « urgence » |

**Le CTA primaire est le vert du logo, pas une couleur d'accent inventée.** Blanc sur `#00532d` = **9,21:1 (AAA)**. Sur un site dont la contrainte n°1 est l'accessibilité et dont le public est âgé ou proche de personnes âgées, le contraste maximal sur l'action principale est un choix de fond, pas un défaut.

L'orange ne porte jamais de texte blanc : il reçoit de l'encre verte (6,02:1) ou sert de filet et de remplissage d'icône.

**Contrastes vérifiés** (script OKLab, ratios WCAG réels) :

| Couple | Ratio | Niveau |
|---|---|---|
| Encre `#00381c` sur papier | 12,88 | AAA |
| Vert `#00532d` sur papier | 8,90 | AAA |
| Blanc sur vert (CTA) | 9,21 | AAA |
| Texte secondaire (cream-800) sur papier | 8,27 | AAA |
| Papier sur vert profond (sections sombres) | 12,88 | AAA |
| Crème sur vert profond | 9,44 | AAA |
| Orange clair (orange-300) sur vert profond | 7,95 | AAA |
| Bordure de champ (cream-600) sur blanc | 4,10 | AA |
| Blanc sur rouge (urgence) | 6,90 | AA |

Aucune opacité de texte inférieure à 0,85 n'est nécessaire nulle part : **règle #11 respectée par construction.**

### Deux rôles distincts pour l'orange

L'orange a deux emplois qu'il ne faut pas confondre, et les confondre produirait le même bug qu'avant avec l'ocre : sur les sections vertes, les libellés de section et les chevrons deviendraient invisibles.

| Token | Rôle | Valeur |
|---|---|---|
| `--accent` | l'aplat orange lui-même (filets, indicateurs) | orange 400 sur fond clair, orange 300 sur vert |
| `--accent-foreground` | l'encre posée **sur** un aplat orange plein | vert profond |
| `--accent-ink` | l'orange utilisé **comme** encre (libellés, chevrons) | orange 800 sur fond clair, orange 300 sur vert |

`--accent-ink` vaut orange 800 sur les fonds clairs, seule valeur de la famille orange qui passe AA sur toutes les surfaces claires à la fois : 7,92:1 sur papier, 6,43:1 sur crème claire, 5,80:1 sur crème.

## 4. Typographie

| Rôle | Police | Grammages | Justification |
|---|---|---|---|
| **Titres** | **Newsreader** (variable, axes `opsz` + `wght`) | 400 / 500 / 600 | Serif de lecture à faible contraste, dessinée pour l'écran, avec taille optique réelle. Elle apporte de la chaleur et de la dignité sans le clinquant d'un serif d'apparat. |
| **Corps et interface** | **Inclusive Sans** (variable) | 400 / 500 / 600 / 700 | Humaniste conçue explicitement pour la lisibilité et l'accessibilité : grande hauteur d'x, ouvertures larges, formes non ambiguës. La contrainte n°1 du brief est la lisibilité, la police porte cette contrainte dans son nom. |

Deux polices, pas trois. Les libellés monospace sont remplacés par de l'Inclusive Sans en capitales avec interlettrage : cela évite une troisième famille tout en gardant le rôle typographique.

**Newsreader est réservée aux titres ≥ 24px.** Jamais sur un libellé, un bouton, un tag ou un texte d'interface (règle #8).

Rejetées et pourquoi : Montserrat (police du secteur, la reconnaissance est immédiate) ; Inter (défaut de l'IA) ; Cormorant Garamond + Raleway (pairing déjà utilisé sur Dien Chan, en repos) ; Playfair / DM Serif Display (serif d'apparat à fort contraste, cluster IA n°1).

## 5. Formes et structure

- **Rayon de bordure : 8px** (secteur santé : « confiance sans mollesse »). Boutons compris.
  **Aucun pill.** C'est le signe visuel le plus immédiat de rupture avec les trois concurrents.
- **Cible tactile minimum 44×44px** partout. Bouton par défaut : hauteur 44px, texte 16px.
  L'échelle par défaut de shadcn (32px de haut, texte 14px) est trop petite pour ce public : elle est relevée dans tous les composants.
- **Zéro grille de cartes** pour les services et les avantages (règle #2) :
  - 4 services → rangées alternées texte / photo
  - publics accueillis → liste éditoriale
  - parcours en 4 étapes → timeline
  - FAQ → accordéon
  - tarifs → tableau
  - équipe → liste éditoriale
- **Rythme des sections** : papier → crème clair → papier avec texture photo → vert profond → papier. Jamais trois sections de même tonalité à la suite.
- **Site multipage** (14 routes prévues au brief), navigation persistante.

## 6. Animations

| Élément | Traitement |
|---|---|
| Révélation au scroll | opacité 0→1 + `translateY(20px→0)`, 700ms, `cubic-bezier(0.22, 1, 0.36, 1)`, `once: true` |
| Listes | stagger 70ms, 4 items maximum en cascade |
| Survol des rangées de service | le filet orange s'étend de 0 à 100 % de largeur (`scaleX`), pas de `translateY` |
| Fond du hero | **fixe. Aucun parallaxe, aucun zoom.** Hauteur gelée en px au premier paint (anti-zoom iOS, règle #10) |
| Carousel | Embla via le composant shadcn, jamais de scroll-snap CSS maison (règle #17) |
| Interdit sur ce projet | tilt 3D, curseur personnalisé, confettis, glitch, particules, texte scramblé. Le sujet ne s'y prête pas. |

**Framer Motion n'a finalement pas été installé.** La direction ci-dessus ne
demande qu'une chose : une opacité et une translation de 20px, une seule fois, à
l'entrée dans le viewport. Un `IntersectionObserver` et deux propriétés CSS y
suffisent (`components/reveal.tsx`, 60 lignes). Pour un public qui consulte
souvent depuis un téléphone ancien et une connexion modeste, 40 Ko de JavaScript
pour un fondu est un mauvais échange.

Trois garanties dans ce composant :

- l'état masqué est rendu côté serveur, donc pas de flash de contenu déjà en place ;
- un `<noscript>` dans le layout annule la classe : sans JavaScript, tout le
  contenu reste visible. Sur un site d'information, une animation ne doit jamais
  pouvoir cacher une information ;
- `prefers-reduced-motion` court-circuite l'observateur et affiche immédiatement.

## 7. Icônes

**Iconify, jeu `solar`, variante `line-duotone`** (7 401 icônes, CC BY 4.0).

Le choix n'est pas arbitraire : `line-duotone` dessine un **trait plein plus un aplat semi-opaque**, c'est-à-dire une icône bicolore par construction. C'est cohérent avec le badge RIGUA lui-même, qui superpose un tracé plein (pictogramme vert) et des aplats de couleur (médaillon orange, anneau rouge). Les icônes prolongent cette logique bicolore au lieu de cohabiter avec le logo sans rapport visuel.

- `line-duotone` : icônes de contenu et de service (24px et plus)
- `linear` : chrome d'interface (chevrons, fermeture, navigation)
- Les deux primitives absentes de Solar (coche nue, croix nue) sont ajoutées comme collection maison `pa:`, au même langage graphique (grille 24, trait 1,5, extrémités arrondies), utilisables via la même API.

Lucide est désinstallé du projet.

## 8. Logo : un seul fichier officiel, non éditable

Le logo officiel de RIGUA (`public/logo_rigua.svg`) est un badge circulaire fourni
par l'association : anneau rouge portant le texte, médaillon en dégradé orange,
anneau vert émeraude autour du pictogramme central (une personne âgée aidée par
un aidant), disque blanc cassé. Contrairement à l'ancien logo générique, ce
fichier n'est **pas un vecteur éditable** : c'est un PNG officiel (dégradés,
typographie circulaire) encapsulé dans une balise `<image>` à l'intérieur d'un
wrapper SVG, fourni tel quel pour préserver le rendu exact du badge. Impossible
d'en extraire des couleurs par variable CSS ou d'y appliquer `currentColor` —
la palette de la section 3 a été établie par échantillonnage direct des pixels
du PNG, pas par lecture du code SVG.

Conséquence sur l'intégration : plus de variantes générées, plus de `npm run logo`.
Le fond du fichier est transparent, donc le même badge s'adapte déjà à toute
surface (papier, crème, vert profond) sans variante de couleur à produire.

| Fichier | Usage | Nature |
|---|---|---|
| `public/logo_rigua.svg` | seul fichier de logo, toutes surfaces | PNG officiel encapsulé, fond transparent |
| `components/logo.tsx` | usage in-app | rend directement `logo_rigua.svg`, prop `variant` conservée pour compatibilité mais sans effet |

La prop `variant` de `<Logo>` (`brand` / `inverse` / `mono`) ne change plus rien
au rendu : elle reste acceptée par les appelants existants (en-tête, pied de
page, `/design-system`) pour ne pas casser leur signature, mais un seul fichier
sert désormais dans tous les cas.

## 9. Deux pièges de mise en page, corrigés dans les composants

Les deux ont été trouvés en mesurant le rendu à 375px, pas à la lecture du code.

**Le tableau élargissait ses ancêtres.** `overflow-x: auto` ne suffit pas : pour un bloc en flux normal, le navigateur fait quand même remonter la largeur `min-content` du tableau. Une colonne de grille de 335px se résolvait à 410px et faisait déborder toute la page de 55px. `contain: inline-size` sur le conteneur ne change rien. La seule correction est `min-w-0` sur les cellules de grid et les items de flex qui contiennent un tableau, ce qui est documenté sur le composant.

**La liste d'onglets ne passait pas à la ligne.** Trois onglets en `inline-flex` sur une seule rangée débordaient de 55px. Corrigé par `flex-wrap` plutôt que par un défilement horizontal : un visiteur ne devine pas qu'une rangée d'onglets peut se faire glisser, et le public de ce site encore moins.

## 9 bis. Quatre défauts trouvés en construisant les pages

Tous les quatre par la mesure ou la capture d'écran, aucun à la relecture du code.

**Les paragraphes étaient invisibles sur les sections marine, à 1:1.** C'est le
plus grave. `color: var(--foreground)` n'était déclaré que sur `body`, où la
variable était donc résolue une fois pour toutes en marine. Redéfinir
`--foreground` sur une section ne rejoue pas cette déclaration : un `<p>` sans
classe de couleur continuait d'hériter la valeur calculée au niveau de `body`, soit
du marine sur du marine. Les titres échappaient au problème, la couche de base leur
appliquant `color: var(--foreground)` résolu localement, ce qui rendait le défaut
invisible à la lecture. Corrigé par une règle unique, `[data-surface] { color: var(--foreground) }`.

**Solar appelle « scale » son icône de redimensionnement.** Le libellé
« Association loi 1901 » de la page d'accueil affichait donc une flèche de mise à
l'échelle, choisie en pensant à une balance de justice. Un nom d'icône ne se
vérifie qu'à l'œil.

**L'en-tête ne tenait pas dans 1280px.** Marque, six entrées de navigation et deux
boutons libellés mesuraient 1414px pour 1376px disponibles, et le bouton d'action
principal se retrouvait coupé hors écran. Corrigé par des libellés de navigation
abrégés, un espacement resserré, et le bouton d'appel réduit à son icône jusqu'à
1536px. Les deux régimes du bloc de marque ont demandé deux mesures opposées :
`shrink-0` et `whitespace-nowrap` au-delà de 1280px, `min-w-0` et retour à la ligne
en dessous, sinon le nom sur une seule ligne poussait le bouton de menu hors écran
à 375px.

**Le garde de délai minimal du formulaire jetait de vraies demandes.** Il rejetait
toute soumission arrivant moins de 2,5 s après l'ouverture de la page, avec une
confirmation d'envoi. Le test fonctionnel l'a pris en défaut immédiatement.
L'asymétrie tranche : perdre en silence la demande d'une famille au sujet d'une
personne vulnérable est infiniment plus grave que recevoir un courrier indésirable.
Il a été retiré. Restent le champ leurre, la case de consentement obligatoire et
la validation stricte du téléphone, sans aucun captcha tiers.

## 10. Composant différenciant : L'Orienteur

Un bloc de triage, placé juste sous le hero, à la place de la rangée de cercles multicolores que font les trois concurrents.

Le visiteur choisit sa **situation**, formulée dans ses mots à lui :

- « Elle vit seule et s'isole »
- « Je sors mon proche d'hospitalisation »
- « J'ai besoin de souffler quelques jours »
- « Il ne peut plus rester seul la journée »
- « C'est urgent, aujourd'hui »

Chaque situation ouvre la réponse : le service concerné, ce qui se passe ensuite, et une seule action. Pas de formulaire, pas de score, pas de questionnaire à étapes. Une phrase reconnue, une réponse claire.

C'est le seul endroit du site où l'on dépense de l'audace. Tout le reste reste calme et discipliné.

### Réalisation : `<details name="orienteur">`, donc zéro JavaScript

Le composant le plus important du site est bâti sur des balises natives. L'attribut
`name` donne le comportement d'accordéon exclusif sans une ligne de script.

Trois conséquences, toutes vérifiées au navigateur avec JavaScript désactivé :

1. il fonctionne avant l'hydratation, et même sans JavaScript du tout ;
2. le contenu des cinq panneaux est dans le HTML initial, donc indexable : les
   cinq situations et les quatre services sont lus par un moteur de recherche
   sans exécuter quoi que ce soit ;
3. rien à réparer si le JavaScript échoue, puisqu'il n'y en a pas.

Le marqueur natif est remplacé par un `+` / `−` et non par un chevron : la FAQ
utilise déjà un chevron rotatif, et les deux blocs ne doivent pas se confondre.
Sur un navigateur qui ignore encore `name`, plusieurs panneaux peuvent rester
ouverts : c'est la seule conséquence, et elle est bénigne.

Le nom du service est en libellé capitales, la phrase de la famille en titre
Newsreader. C'est l'inverse de la hiérarchie des concurrents, et c'est le sujet
même de la différenciation : on se reconnaît dans une situation, pas dans une
nomenclature.

## 11. Anti-répétition — vérifié

> Le fichier `APPRENTISSAGES.md` référencé par le skill `design-sources` pointe vers un chemin macOS absent de cette machine. La vérification est faite contre les patterns que le skill liste explicitement comme étant au repos.

- [x] Pairing différent de Dien Chan (Cormorant Garamond + Raleway) → Newsreader + Inclusive Sans
- [x] Fond différent de `#FAF7F2` + accents dorés → papier `#fdfbf7` + orange dérivé du logo
- [x] Pas de hero split texte gauche / image droite sur fond crème
- [x] Pas de marquee défilant en section réassurance
- [x] Pas de cluster IA n°1 (crème + serif d'apparat + terracotta) : le serif est un serif de lecture, l'accent est un orange dérivé de la marque, et le fond n'est pas un simple crème générique
- [x] Pas de palette blanc + bleu + vert
- [x] Pas de grille de 3 cartes icône + titre + texte sous le hero
- [x] Pas de `border-radius` 50px sur les boutons
- [x] Zéro tiret cadratin dans les contenus produits
- [x] Zéro emoji dans le code

## 12. Vérification du site complet

> Audit réalisé sur la palette marine/sable/ocre initiale, avant la migration vers
> la palette RIGUA du 16 août 2026 (§3). Les ratios de contraste ont été
> recalculés pour chaque nouveau token (§3) ; une nouvelle passe Playwright sur
> le rendu réel, aux mêmes 5 largeurs, reste à rejouer après cette migration.

Mesuré sur le rendu de production, pas sur le code.

| Contrôle | Portée | Résultat |
|---|---|---|
| Contraste WCAG AA | 16 pages × 5 largeurs (375, 768, 1280, 1440, 1920) | **zéro échec**, ratio minimum 4,56:1 |
| Opacité de texte | idem | **aucune** sous 0,85 |
| Débordement horizontal | idem | **aucun** |
| Cibles tactiles | idem | **aucune** sous 44 × 44px |
| Structure de titres | idem | un seul `h1` par page, aucun niveau sauté |
| Requêtes réseau tierces | page d'accueil | **aucune** |
| L'Orienteur sans JavaScript | 5 situations | ouverture, fermeture, exclusivité, contenu dans le HTML |
| Formulaire | parcours complet | erreurs listées et focalisées, valeurs conservées, libellés cliquables, confirmation |
| Données structurées | accueil et FAQ | aucun téléphone ni adresse inventés publiés, 4 services, 17 questions |
| Menu mobile | 375px | ouverture, 13 liens, fermeture au clavier |

`npm run build` compile les 14 pages en statique, `npx tsc --noEmit` et
`npm run lint` sortent sans erreur.

## 13. À valider avec Corrine avant livraison

La direction ci-dessus est construite sur le logo, seul élément d'identité officiel disponible.

La liste complète de ce qui reste ouvert, avec l'effet exact de chaque manque sur
le site, est dans [informations-a-completer.md](informations-a-completer.md).
Les prises de vue à réaliser sont dans [photos-a-fournir.md](photos-a-fournir.md).

**Aucune photo d'illustration n'a été posée en attendant.** Les emplacements sont
réservés au bon format et affichent le cadrage attendu : les vraies photos se
posent dedans sans rien décaler. Aucun agrément, certification, tarif, capacité
d'accueil, délai ni coordonnée n'est affiché avant validation.
