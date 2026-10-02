/**
 * Génère lib/icons/bundle.ts depuis @iconify-json/solar.
 *
 * Pourquoi un générateur plutôt que @iconify/react au runtime :
 *  - le site est rendu côté serveur, les icônes doivent être dans le HTML
 *    initial (SEO, pas de scintillement, pas de requête vers l'API Iconify) ;
 *  - la contrainte RGPD du brief interdit un appel réseau tiers non nécessaire ;
 *  - on n'embarque que les icônes réellement utilisées, pas les 7 401 du jeu.
 *
 * Le manifeste ci-dessous est la SEULE source de vérité des icônes du site.
 * Les composants n'écrivent jamais un nom Iconify : ils utilisent un nom
 * sémantique. Changer de jeu d'icônes = éditer ce fichier, rien d'autre.
 *
 * Régénérer :  npm run icons
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "lib/icons/bundle.ts");

/* --------------------------------------------------------------------------
   MANIFESTE
   Variante `linear` pour le chrome d'interface : le trait seul reste net à
   16-20px. Variante `line-duotone` pour le contenu : trait plus aplat à
   opacity .5, donc bicolore, comme le logo.
   -------------------------------------------------------------------------- */
const MANIFEST = {
  // --- Chrome d'interface (linear) ---
  "chevron-down": "solar:alt-arrow-down-linear",
  "chevron-up": "solar:alt-arrow-up-linear",
  "chevron-left": "solar:alt-arrow-left-linear",
  "chevron-right": "solar:alt-arrow-right-linear",
  "arrow-right": "solar:arrow-right-linear",
  "arrow-right-circle": "solar:round-arrow-right-linear",
  "arrow-right-double": "solar:double-alt-arrow-right-linear",
  "arrow-left": "solar:arrow-left-linear",
  "arrow-up": "solar:arrow-up-linear",
  "arrow-down": "solar:arrow-down-linear",
  "lien-externe": "solar:arrow-right-up-linear",
  menu: "solar:hamburger-menu-linear",
  more: "solar:menu-dots-linear",
  search: "solar:magnifer-linear",
  spinner: "solar:refresh-linear",
  oeil: "solar:eye-linear",

  // --- États et messages (line-duotone) ---
  success: "solar:check-circle-line-duotone",
  info: "solar:info-circle-line-duotone",
  warning: "solar:danger-triangle-line-duotone",
  error: "solar:close-circle-line-duotone",

  // --- Navigation principale ---
  accueil: "solar:home-2-line-duotone",

  // --- Les quatre services de l'association ---
  // Variante `linear` ici (pas duotone comme le reste du contenu) : dans le
  // sous-menu Services, l'opacité .5 du duotone rendait ces icônes plus
  // ternes que le token --accent-ink qui les colore, à la mesure.
  "service-domicile": "solar:home-smile-linear",
  "service-jour": "solar:sun-linear",
  "service-sejour": "solar:bed-linear",
  "service-urgence": "solar:siren-rounded-linear",

  // --- L'Orienteur : entrer par la situation, pas par le catalogue ---
  orienteur: "solar:signpost-line-duotone",
  hopital: "solar:hospital-line-duotone",
  coordination: "solar:routing-2-line-duotone",

  // --- Valeurs, publics, accompagnement ---
  soin: "solar:hand-heart-line-duotone",
  "medical-humain": "solar:heart-pulse-line-duotone",
  famille: "solar:users-group-two-rounded-line-duotone",
  sante: "solar:stethoscope-line-duotone",
  "soin-infirmier": "solar:syringe-line-duotone",
  dignite: "solar:health-line-duotone",
  autonomie: "solar:walking-round-line-duotone",
  accessibilite: "solar:accessibility-line-duotone",
  repit: "solar:armchair-line-duotone",
  ecoute: "solar:chat-round-dots-line-duotone",
  lien: "solar:heart-angle-line-duotone",
  securite: "solar:shield-check-line-duotone",
  nuit: "solar:moon-sleep-line-duotone",
  activite: "solar:tea-cup-line-duotone",
  nature: "solar:leaf-line-duotone",
  soignant: "solar:medical-kit-line-duotone",
  /* Équipe du quotidien (page /equipe) : agent de service et cuisinière
     réutilisaient l'icône « soin » (main + cœur), pensée pour l'accompagnement
     humain, pas pour l'entretien des locaux ni la cuisine. Deux noms distincts,
     trouvés au rendu. */
  entretien: "solar:washing-machine-line-duotone",
  cuisine: "solar:chef-hat-line-duotone",

  // --- Informations pratiques ---
  horaires: "solar:clock-circle-line-duotone",
  capacite: "solar:people-nearby-line-duotone",
  agenda: "solar:calendar-line-duotone",
  telephone: "solar:phone-rounded-line-duotone",
  "telephone-appel": "solar:phone-calling-rounded-line-duotone",
  email: "solar:letter-line-duotone",
  adresse: "solar:map-point-line-duotone",
  document: "solar:document-text-line-duotone",
  demarche: "solar:clipboard-check-line-duotone",
  /* Étapes du devis (page tarifs) : évaluation, devis écrit, accompagnement
     évolutif. Distinctes de `document`/`demarche` déjà utilisées ailleurs. */
  evaluation: "solar:checklist-line-duotone",
  devis: "solar:clipboard-text-line-duotone",
  evolution: "solar:refresh-circle-line-duotone",
  tarifs: "solar:wallet-money-line-duotone",
  question: "solar:question-circle-line-duotone",
  note: "solar:notebook-minimalistic-line-duotone",
  etoile: "solar:star-angle-line-duotone",
  "etoile-pleine": "solar:star-bold",
  transport: "solar:bus-line-duotone",

  // --- Vie de l'association ---
  atelier: "solar:palette-line-duotone",
  sortie: "solar:map-line-duotone",
  rencontre: "solar:users-group-rounded-line-duotone",
  photo: "solar:gallery-line-duotone",

  // --- Pages légales ---
  confidentialite: "solar:lock-keyhole-line-duotone",
  /* Même dessin que `document`, volontairement. `solar:scale-line-duotone`
     avait été choisi d'abord, en pensant à une balance de justice : chez Solar,
     « scale » désigne le redimensionnement, et l'icône affichée était une
     flèche de mise à l'échelle. Trouvé au rendu, pas à la lecture du nom. */
  legal: "solar:document-text-line-duotone",
  /* Statut associatif (loi 1901, pas d'actionnaire) : un insigne officiel
     plutôt qu'un cœur ou une main, déjà pris par `soin`/`lien`. */
  association: "solar:medal-ribbon-star-line-duotone",
};

/* --------------------------------------------------------------------------
   PRIMITIVES MAISON
   Solar n'a ni coche nue ni croix nue : seulement des versions cerclées, qui
   feraient un cercle dans un cercle sur un bouton de fermeture ou une case à
   cocher. On les dessine, dans le même langage : grille 24, currentColor,
   extrémités arrondies. La coche est à 2.5 pour rester lisible à 16px.
   -------------------------------------------------------------------------- */
const HOUSE = {
  check:
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m5 12.75l4.5 4.5L19 6.75"/>',
  close:
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M17.5 6.5l-11 11m0-11l11 11"/>',
  minus:
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2.5" d="M6 12h12"/>',
  /* L'Orienteur utilise un + / − plutôt qu'un chevron, pour ne pas ressembler
     à l'accordéon de la FAQ. Solar n'a que des versions cerclées. */
  plus: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2.5" d="M12 6v12M6 12h12"/>',
  dot: '<circle cx="12" cy="12" r="5" fill="currentColor"/>',
  /* Aucune icône de guillemet dans Solar (recherché : "quote", 0 résultat).
     Dessinée à la main dans le même langage que les autres primitives. */
  guillemet:
    '<path fill="currentColor" d="M3 12.5C3 8.36 5.69 5.1 9.86 4l.9 2.06C7.94 6.9 6.4 8.6 6.1 11H9.5a1.5 1.5 0 0 1 1.5 1.5v4A1.5 1.5 0 0 1 9.5 18h-5A1.5 1.5 0 0 1 3 16.5zm10.5 0c0-4.14 2.69-7.4 6.86-8.5l.9 2.06c-2.82.84-4.36 2.54-4.66 4.94H20a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-5a1.5 1.5 0 0 1-1.5-1.5z"/>',
};

/* -------------------------------------------------------------------------- */

const setCache = new Map();
function loadSet(prefix) {
  if (!setCache.has(prefix)) {
    const path = require.resolve(`@iconify-json/${prefix}/icons.json`);
    setCache.set(prefix, JSON.parse(readFileSync(path, "utf8")));
  }
  return setCache.get(prefix);
}

const entries = [];
const problems = [];

for (const [semantic, ref] of Object.entries(MANIFEST)) {
  const [prefix, iconName] = ref.split(":");
  const set = loadSet(prefix);
  const icon = set.icons?.[iconName] ?? set.aliases?.[iconName];
  if (!icon) {
    problems.push(`${semantic} -> ${ref} introuvable dans le jeu ${prefix}`);
    continue;
  }
  const resolved = icon.parent ? set.icons[icon.parent] : icon;
  if (!resolved?.body) {
    problems.push(`${semantic} -> ${ref} sans corps SVG exploitable`);
    continue;
  }
  entries.push({
    semantic,
    source: ref,
    body: resolved.body,
    width: resolved.width ?? set.width ?? 24,
    height: resolved.height ?? set.height ?? 24,
  });
}

for (const [semantic, body] of Object.entries(HOUSE)) {
  entries.push({ semantic, source: "pa (maison)", body, width: 24, height: 24 });
}

if (problems.length) {
  console.error("Icônes non résolues :");
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}

entries.sort((a, b) => a.semantic.localeCompare(b.semantic, "fr"));

const licences = [...setCache.keys()].map((prefix) => {
  const info = JSON.parse(
    readFileSync(require.resolve(`@iconify-json/${prefix}/info.json`), "utf8")
  );
  const parts = [`${info.name ?? prefix} — ${info.license?.title ?? "licence inconnue"}`];
  if (info.author?.name) parts.push(`par ${info.author.name}`);
  if (info.license?.url) parts.push(info.license.url);
  return parts.join(" — ");
});

const q = (s) => JSON.stringify(s);
const out = `// Fichier généré par scripts/build-icons.mjs — ne pas éditer à la main.
// Régénérer : npm run icons
//
// Jeux d'icônes embarqués :
${licences.map((l) => `//   - ${l}`).join("\n")}
//
// ${entries.length} icônes, rendues en SVG inline côté serveur.

export type IconName =
${entries.map((e) => `  | ${q(e.semantic)}`).join("\n")};

export type IconData = {
  readonly body: string;
  readonly viewBox: string;
  /** Référence d'origine, pour retrouver l'icône dans le jeu source. */
  readonly source: string;
};

export const ICONS: Readonly<Record<IconName, IconData>> = {
${entries
  .map(
    (e) =>
      `  ${q(e.semantic)}: {\n    body: ${q(e.body)},\n    viewBox: ${q(
        `0 0 ${e.width} ${e.height}`
      )},\n    source: ${q(e.source)},\n  },`
  )
  .join("\n")}
};

export const ICON_NAMES = Object.keys(ICONS) as readonly IconName[];
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, out, "utf8");
console.log(
  `lib/icons/bundle.ts écrit — ${entries.length} icônes (${
    entries.length - Object.keys(HOUSE).length
  } Solar + ${Object.keys(HOUSE).length} maison).`
);
