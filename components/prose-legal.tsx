import * as React from "react"

import { Eyebrow } from "@/components/eyebrow"
import { Icon } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import { estPublie, type Provisoire } from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * Mise en forme des pages légales.
 *
 * Ces pages sont longues, denses, et personne ne les lit en entier : elles sont
 * consultées par recherche, pour un point précis. D'où des titres explicites,
 * un sommaire, et des paragraphes courts. Le corps reste à 16px comme partout
 * ailleurs : réduire le texte des mentions légales, comme le font beaucoup de
 * sites, revient à les rendre volontairement illisibles.
 */

export function ArticleLegal({
  titre,
  id,
  numero,
  children,
}: {
  titre: string
  id: string
  /**
   * Rang de la section dans le sommaire (1-indexé). Reprend la numérotation
   * de `SommaireLegal` pour donner un repère visuel constant : sur une page
   * longue où 10 titres de même style se succèdent, le chiffre en encre orange
   * marque le début de chaque section plus fiablement qu'une simple bordure.
   */
  numero: number
  children: React.ReactNode
}) {
  return (
    <Reveal>
      <section
        id={id}
        /* scroll-mt : l'en-tête est collant. */
        className="scroll-mt-24 border-t border-line py-9"
      >
        <h2 className="mb-5 flex items-baseline gap-3 font-sans text-xl leading-snug font-semibold">
          <span className="step-num shrink-0 tabular-nums" aria-hidden>
            {String(numero).padStart(2, "0")}
          </span>
          {titre}
        </h2>
        <div className="measure flex flex-col gap-4 text-base leading-relaxed">
          {children}
        </div>
      </section>
    </Reveal>
  )
}

/**
 * Valeur légale à compléter.
 *
 * Une mention légale incomplète est un défaut de conformité, pas un détail de
 * mise en page : elle doit donc se voir, à l'écran comme dans le code. Un
 * encadré orange nomme précisément la donnée manquante plutôt qu'un discret
 * « [à compléter] » qu'on oublie de remplacer.
 */
export function ValeurLegale<T>({
  champ,
  libelle,
  rendu,
}: {
  champ: Provisoire<T>
  /** Nom de la donnée manquante, tel qu'il faut le demander. */
  libelle: string
  rendu?: (valeur: T) => React.ReactNode
}) {
  if (estPublie(champ)) {
    return <>{rendu ? rendu(champ.valeur) : String(champ.valeur)}</>
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-xs border border-accent bg-muted px-2 py-0.5",
        "text-base font-semibold text-accent-ink"
      )}
    >
      <Icon name="warning" className="size-4 shrink-0" aria-hidden />
      {libelle} à compléter
    </span>
  )
}

export function SommaireLegal({
  entrees,
}: {
  entrees: { id: string; titre: string }[]
}) {
  return (
    <Reveal>
      {/* pb-24 : sous `lg`, ce sommaire n'est pas sticky (voir la grille dans
          les pages appelantes) et défile normalement dans le flux. Le FAB
          de rendez-vous (components/fab-appel.tsx, `fixed`, visible jusqu'à `xl`)
          peut alors se retrouver juste au-dessus de la dernière entrée en
          fin de scroll et la recouvrir. La marge réserve la hauteur du FAB
          (h-14, 56px) plus un espace de respiration, uniquement sur les
          largeurs où il reste affiché ; au-delà de `xl` la grille passe en
          sticky et le FAB a disparu, donc plus besoin de la réserver. */}
      <nav
        aria-label="Sommaire"
        className="flex flex-col gap-4 pb-24 xl:pb-0"
      >
        <Eyebrow icone="document">Sommaire</Eyebrow>
        <ol className="flex flex-col gap-1">
          {entrees.map((entree, index) => (
            <li key={entree.id}>
              <a
                href={`#${entree.id}`}
                className="flex min-h-11 items-center gap-3 text-base text-primary underline decoration-accent decoration-2 underline-offset-4 hover:decoration-primary"
              >
                <span className="step-num tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {entree.titre}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </Reveal>
  )
}
