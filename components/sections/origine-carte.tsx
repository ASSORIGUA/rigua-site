"use client"

import * as React from "react"

import { Icon } from "@/components/icon"
import { cn } from "@/lib/utils"
import type { origine } from "@/lib/content/association"

/**
 * Carte d'un bloc « Le médical et l'humain… » (carousel mobile, app/l-association).
 *
 * Repliée à 3 lignes par défaut (`line-clamp-3`), avec un bouton
 * « Voir plus » / « Voir moins » à chevron — même principe que `ValeurCarte`,
 * mais chevron plutôt qu'œil : ce bloc déplie un paragraphe déjà entièrement
 * visible en version desktop (carte pleine largeur), pas un contenu qui reste
 * caché sur les deux formats. Le chevron qui pivote à 180° signale un repli
 * de contenu en place, motif déjà utilisé par l'accordéon Engagements et le
 * carousel Tarifs — pas une révélation nouvelle comme l'œil de ValeurCarte.
 */
export function OrigineCarte({
  bloc,
  className,
}: {
  bloc: (typeof origine.paragraphes)[number]
  className?: string
}) {
  const [ouvert, setOuvert] = React.useState(false)

  return (
    <div
      className={cn(
        // Fond blanc imposé et couleurs fixes, jamais les jetons de surface :
        // cette carte vit dans une section `deep` à fond photo, où `bg-muted`
        // devient vert foncé et `text-foreground` blanc. Même traitement que
        // la version desktop dans app/l-association/page.tsx.
        "flex h-full flex-col overflow-hidden rounded-md bg-white",
        className
      )}
    >
      <p className="flex items-center gap-2.5 bg-accent-solid px-4 py-3 font-sans text-lg leading-snug font-semibold text-accent-solid-foreground">
        <Icon name={bloc.icone} aria-hidden className="size-6 shrink-0 text-white" />
        {bloc.titre}
      </p>
      <div className="flex flex-1 flex-col gap-1 px-4 py-3">
        <p
          className={cn(
            "nums text-base text-cream-800",
            !ouvert && "line-clamp-3"
          )}
        >
          {bloc.texte}
        </p>
        <button
          type="button"
          onClick={() => setOuvert((v) => !v)}
          aria-expanded={ouvert}
          className="-ml-2 flex min-h-11 items-center gap-1.5 self-start rounded-md px-2 font-semibold text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900"
        >
          {ouvert ? "Voir moins" : "Voir plus"}
          <Icon
            name="chevron-down"
            aria-hidden
            className={cn(
              "size-4 shrink-0 transition-transform duration-200 ease-out",
              ouvert && "-rotate-180"
            )}
          />
        </button>
      </div>
    </div>
  )
}
