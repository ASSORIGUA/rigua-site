import { Eyebrow } from "@/components/eyebrow"
import { Icon, type IconName } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

/**
 * « Pratique » — horaires et capacité d'accueil, page de service.
 *
 * Remplace une `dl` à deux lignes qui flottait seule dans la section (surtout
 * visible à partir de `lg`, où le bloc ne remplissait qu'un tiers de la
 * largeur du conteneur pour une hauteur de section entière). Le contenu ne
 * change pas — toujours seulement `horaires` et `capacite`, tels que
 * confirmés par le livret d'accueil (lib/content/services.ts) — mais chaque
 * ligne devient une carte à part entière : médaillon d'icône, libellé, valeur
 * en gros, et une phrase de contexte qui reformule la même information sans
 * en ajouter (jamais de nouveau chiffre, jamais de délai inventé). Le rythme
 * visuel reprend celui de BesoinsListe : cadre bordé unique, rangées qui
 * passent en 2 colonnes à partir de `sm` puisqu'il n'y a jamais plus de deux
 * lignes ici (horaires + capacité), jamais une grille de cartes séparées.
 *
 * `sombre` : voir le commentaire équivalent dans besoins-liste.tsx — sur un
 * bloc de service en `data-surface="deep"`, la carte passe en fond blanc et
 * bordure verte plutôt que de suivre les tokens de surface.
 */

type LignePratique = {
  icone: IconName
  libelle: string
  valeur: string
  /** Reformulation de la même donnée, pas une donnée supplémentaire. */
  contexte: string
}

export function PratiqueInfos({
  horaires,
  capacite,
  sombre = false,
}: {
  horaires?: string
  capacite?: string
  /** La section englobante est en `data-surface="deep"`. */
  sombre?: boolean
}) {
  const lignes: LignePratique[] = [
    horaires
      ? {
          icone: "horaires",
          libelle: "Horaires",
          valeur: horaires,
          contexte: "À prévoir pour organiser l'arrivée et le départ.",
        }
      : null,
    capacite
      ? {
          icone: "capacite",
          libelle: "Capacité d'accueil",
          valeur: capacite,
          contexte: "Le nombre de personnes que la structure accueille en même temps.",
        }
      : null,
  ].filter((ligne): ligne is LignePratique => ligne !== null)

  if (lignes.length === 0) return null

  return (
    <div className="flex flex-col gap-8">
      <Reveal className="flex flex-col gap-5">
        <Eyebrow icone="horaires">Pratique</Eyebrow>
        <h2>Ce qu&apos;il faut savoir pour organiser la venue</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Deux repères confirmés par notre livret d&apos;accueil, à connaître
          avant la première visite.
        </p>
      </Reveal>

      <div
        className={cn(
          "grid overflow-hidden rounded-md sm:grid-cols-2",
          sombre ? "border-2 border-emerald-500" : "border border-line-strong"
        )}
      >
        {lignes.map((ligne, index) => (
          <Reveal
            key={ligne.libelle}
            delay={index * 70}
            className={cn(
              index > 0 && (sombre ? "border-t-2 sm:border-t-0 sm:border-l-2" : "border-t sm:border-t-0 sm:border-l"),
              index > 0 && (sombre ? "border-emerald-500" : "border-line-strong")
            )}
          >
            <div
              className={cn(
                "flex h-full flex-col gap-4 px-6 py-7 sm:px-8",
                sombre ? "bg-white" : "bg-surface"
              )}
            >
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-md",
                  sombre ? "border-2 border-emerald-500 bg-emerald-50" : "border border-line-strong bg-muted"
                )}
              >
                <Icon
                  name={ligne.icone}
                  aria-hidden
                  className={cn("size-5", sombre ? "text-emerald-700" : "text-accent-ink")}
                />
              </span>
              <div className="flex min-w-0 flex-col gap-2">
                <span
                  className={cn(
                    "text-sm font-semibold tracking-wide uppercase",
                    sombre ? "text-cream-700" : "text-muted-foreground"
                  )}
                >
                  {ligne.libelle}
                </span>
                <p
                  className={cn(
                    "nums text-xl leading-snug font-semibold",
                    sombre && "text-black"
                  )}
                >
                  {ligne.valeur}
                </p>
                <p className={cn("text-base", sombre ? "text-cream-800" : "text-muted-foreground")}>
                  {ligne.contexte}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
