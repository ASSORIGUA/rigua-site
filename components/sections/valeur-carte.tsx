"use client"

import { Icon } from "@/components/icon"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { valeurs } from "@/lib/content/association"

/**
 * Carte d'une valeur, dans la grille de 6 (app/l-association).
 *
 * Reprend la forme d'origine de cette grille — deux formes, à la demande
 * explicite du brief visuel (contraire à la règle générale « aucun rond
 * nulle part » du design system, volontairement mise de côté ici) :
 *  - `arrondie` : les deux colonnes de côté, un cercle ;
 *  - carré : la colonne du milieu, sans rayon.
 * Le contraste de forme entre les deux est la signature de cette grille,
 * pas une couleur ou une icône différente. Bordure doublée dans les deux
 * cas : un cadre extérieur (`border-2`) et, à distance fixe à l'intérieur,
 * un second filet porté par un vrai `<div>` (`inset-2`/`inset-1.5`) plutôt
 * qu'un `outline` — un outline ne suit pas fidèlement un contour circulaire
 * sur tous les moteurs, alors qu'une boîte réelle épouse exactement le même
 * contour que le cadre extérieur.
 *
 * La carte elle-même n'est plus cliquable dans son ensemble : icône et
 * titre sont statiques, et un bouton « Voir plus » à chevron — même motif
 * que `OrigineCarte`, chevron qui pivote à 180° plutôt que l'œil utilisé
 * jusqu'ici — sert de déclencheur explicite au `Popover` (déjà re-skinné,
 * voir components/ui/popover.tsx) qui affiche le texte complet. Ce diamètre
 * plus compact que la version précédente est permis par le fait que le
 * texte ne vit plus jamais dans la carte, tronqué ou non : plus besoin d'un
 * gabarit calibré pour loger « Dignité » en entier.
 */
export function ValeurCarte({
  valeur,
  arrondie,
  className,
}: {
  valeur: (typeof valeurs)[number]
  /** true = carte ronde (colonnes de côté) ; false = carte carrée (milieu). */
  arrondie: boolean
  className?: string
}) {
  const bouton = (
    <Popover>
      <PopoverTrigger className="flex min-h-11 items-center gap-1 rounded-md px-1.5 text-sm font-semibold whitespace-nowrap text-accent-ink data-popup-open:text-primary [&[data-popup-open]_svg]:-rotate-180">
        Voir plus
        <Icon
          name="chevron-down"
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-200 ease-out"
        />
      </PopoverTrigger>
      <PopoverContent className="w-64 gap-2 p-3">
        <PopoverTitle className="text-base">{valeur.titre}</PopoverTitle>
        <PopoverDescription className="text-sm leading-snug">
          {valeur.texte}
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  )

  if (arrondie) {
    return (
      <div
        className={cn(
          "relative isolate mx-auto aspect-square w-full max-w-48 rounded-full border-2 border-line-strong p-1.5",
          className
        )}
      >
        <div className="flex h-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-full border-2 border-line-strong bg-surface p-4 text-center">
          <Icon name={valeur.icone} aria-hidden className="size-7 shrink-0 text-primary" />
          <span className="font-sans text-base leading-snug font-semibold">
            {valeur.titre}
          </span>
          {bouton}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative w-full border-2 border-line-strong p-1.5", className)}>
      <div className="flex w-full flex-col items-center gap-1.5 border-2 border-line-strong bg-surface p-4 text-center">
        <Icon name={valeur.icone} aria-hidden className="size-7 shrink-0 text-primary" />
        <span className="font-sans text-base leading-snug font-semibold">
          {valeur.titre}
        </span>
        {bouton}
      </div>
    </div>
  )
}
