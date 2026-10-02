import Link from "next/link"

import { Icon } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { getPage } from "@/lib/cms"
import { parcours as parcoursDefaut } from "@/lib/content/association"
import { cn } from "@/lib/utils"

/**
 * Version abrégée du parcours, réservée à la page d'accueil.
 *
 * Le détail complet (texte de chaque étape, « ce que vous avez à faire ») vit
 * dans <Parcours>, sur /nos-services : ce composant n'en reprend que les
 * titres, numérotés, en frise horizontale à partir de `lg:`. Rien d'autre
 * n'est dupliqué ici.
 *
 * Sous `lg`, la frise horizontale ne tient pas : la version mobile est une
 * timeline verticale à trois colonnes (texte gauche / ligne + pastille /
 * texte droite), avec une seule colonne de texte remplie par étape, en
 * alternance. Même pastille numérotée qu'en desktop (carré agrandi, icône
 * plus grande, cercle numéroté orange à cheval sur la bordure haute) : seule
 * l'orientation diffère. La ligne centrale est un trait continu sur le
 * conteneur (`bg-primary/40` en arrière-plan de la colonne du milieu), pas
 * des demi-segments par pastille : elle traverse tout l'empilement sans
 * étape manquante entre deux `<li>`.
 */
export async function ParcoursApercu() {
  const doc = await getPage("pageAccueil")
  const edites = doc?.parcoursEtapes as { titre?: string; texte?: string }[] | undefined
  const parcours =
    Array.isArray(edites) && edites.length > 0
      ? edites.map((item, i) => {
          const base = parcoursDefaut[Math.min(i, parcoursDefaut.length - 1)]
          return {
            ...base,
            titre: item.titre?.trim() || base.titre,
            texte: item.texte?.trim() || base.texte,
          }
        })
      : parcoursDefaut
  return (
    <>
      {/* minmax(0, 1fr), pas 1fr seul : une piste `1fr` a un minimum implicite
          de `auto`, donc son contenu (le texte le plus long, non coupé) peut
          la forcer plus large que l'autre colonne `1fr` symétrique. C'était
          la vraie cause de l'asymétrie gauche/droite : minmax(0, ...) retire
          ce minimum et force les deux colonnes de texte à rester strictement
          égales, quel que soit le texte.

          Même pastille numérotée qu'en desktop (carré agrandi, icône plus
          grande, cercle orange à cheval sur la bordure haute) : seule
          l'orientation change, verticale ici contre horizontale à partir de
          `lg:`. Plus de libellé « Étape X sur 4 », le numéro dans le cercle
          suffit. */}
      <ol className="grid grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] lg:hidden">
        {parcours.map((etape, index) => {
          const gauche = index % 2 === 0
          return (
            // `contents` : le <li> ne crée pas sa propre boîte, ses trois
            // enfants deviennent directement des items de la grille du <ol>.
            // C'est ce qui garantit que les deux colonnes de texte gauche et
            // droite ont exactement la même largeur (1fr chacune) sur toute
            // la liste : avec un <li> en `grid-cols-subgrid` à la place, la
            // largeur réelle des colonnes pouvait varier d'un item à l'autre
            // selon son contenu, d'où l'asymétrie constatée.
            <li key={etape.titre} className="contents">
              <Reveal delay={index * 70} className={cn("pr-3 text-right", !gauche && "invisible")}>
                {gauche ? <EtapeTexte etape={etape} /> : null}
              </Reveal>

              {/* Colonne centrale : la ligne est un unique trait continu en
                  arrière-plan (bg-primary/40 posé sur toute la hauteur de la
                  colonne, même teinte que le trait horizontal desktop), la
                  pastille vient par-dessus. Deux items consécutifs n'ont donc
                  pas de gap entre eux : c'est ce qui faisait une ligne coupée
                  avant, quand chaque item portait ses propres demi-segments
                  séparés par le gap du <ol>. `py-6` (plutôt que `py-3`) :
                  étire la timeline verticalement, plus d'air entre chaque
                  pastille. */}
              <div className="relative flex items-center justify-center py-6">
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-primary/40",
                    index === 0 && "top-1/2",
                    index === parcours.length - 1 && "bottom-1/2"
                  )}
                />
                <span className="relative flex size-16 shrink-0 items-center justify-center rounded-md border border-line bg-surface">
                  <span className="absolute -top-3 left-1/2 flex size-6 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    {index + 1}
                  </span>
                  <Icon name={etape.icone} aria-hidden className="size-8 text-primary" />
                </span>
              </div>

              <Reveal delay={index * 70} className={cn("pl-3", gauche && "invisible")}>
                {!gauche ? <EtapeTexte etape={etape} /> : null}
              </Reveal>
            </li>
          )
        })}
      </ol>

      {/* Ligne unique en arrière-plan, pas un demi-segment par item : avec
          un `gap-6` entre items de grille, deux demi-segments qui
          s'arrêtent chacun au bord de leur item laissent le gap sans trait
          entre eux, d'où la coupure visible entre chaque pastille.
          Un seul trait, enfant direct de ce même <ol> (donc positionné par
          rapport à sa largeur totale, gap inclus) : son centre va de 12,5%
          (centre de la 1ʳᵉ colonne sur 4 colonnes égales) à 87,5% (centre
          de la 4ᵉ). Ces fractions restent exactes quel que soit le `gap`,
          puisque CSS Grid les calcule déjà par rapport à la largeur totale
          du conteneur. `top-10` : centre vertical de la pastille `size-20`.
          Le trait passe SOUS les pastilles (bg-surface, un fond opaque, le
          masque à leur endroit) grâce à l'ordre du DOM (rendu en premier,
          donc en dessous en l'absence de z-index).

          Le numéro (01/02/03/04) remplace ici le libellé « Étape X sur 4 » :
          pastille circulaire à cheval sur la bordure haute du carré d'icône,
          fond `--primary` (orange) et texte `--primary-foreground` (blanc),
          seul indicateur d'ordre dans cette version abrégée. */}
      <ol className="relative hidden lg:grid lg:grid-cols-4 lg:gap-6">
        <span
          aria-hidden
          className="absolute top-10 right-[12.5%] left-[12.5%] h-0.5 bg-primary/40"
        />
        {parcours.map((etape, index) => (
          <Reveal as="li" key={etape.titre} delay={index * 70}>
            <div className="relative flex flex-col items-center gap-3 text-center">
              <span className="relative flex size-20 items-center justify-center rounded-md border border-line bg-surface">
                <span className="absolute -top-3.5 left-1/2 flex size-7 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <Icon name={etape.icone} aria-hidden className="size-10 text-primary" />
              </span>
              <h3 className="font-sans text-lg leading-snug font-semibold">
                {etape.titre}
              </h3>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-10 flex justify-center">
        {/* Ancre précise, pas la page : le bouton promet « le déroulé », il
            doit arriver sur la section du déroulé, pas en haut de la page. */}
        <Button render={<Link href="/nos-services#comment-cela-se-passe" />}>
          Voir le déroulé complet
          <Icon name="arrow-right" aria-hidden />
        </Button>
      </Reveal>
    </>
  )
}

function EtapeTexte({ etape }: { etape: (typeof parcoursDefaut)[number] }) {
  return (
    <div className="flex min-w-0 flex-col gap-1 py-6">
      <h3 className="font-sans text-base leading-snug font-semibold text-balance lg:text-lg">
        {etape.titre}
      </h3>
    </div>
  )
}
