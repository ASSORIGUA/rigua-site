"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"

/**
 * Séparateur — Présence & Autonomie
 *
 * Deux tons possibles : `line` (crème, par défaut) pour séparer sans appuyer,
 * et `accent` (orange, épaisseur 2px, longueur courte) comme filet éditorial
 * sous un titre de section. Le filet orange court est un motif récurrent du
 * site : il remplace les traits de séparation pleine largeur.
 */
function Separator({
  className,
  orientation = "horizontal",
  tone = "line",
  ...props
}: SeparatorPrimitive.Props & { tone?: "line" | "accent" }) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      data-tone={tone}
      orientation={orientation}
      className={cn(
        "shrink-0",
        tone === "accent"
          ? "bg-accent data-horizontal:h-0.5 data-horizontal:w-14 data-vertical:w-0.5 data-vertical:self-stretch"
          : "bg-line data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
