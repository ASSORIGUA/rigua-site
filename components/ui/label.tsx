"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Libellé de champ — Présence & Autonomie
 *
 * Toujours visible, jamais remplacé par un placeholder : un placeholder
 * disparaît dès la première frappe, ce qui prive le visiteur du rappel de
 * ce qu'il est en train de remplir. Anti-pattern explicite du skill.
 *
 * 16px et non 14px, pour rester au-dessus du plancher de lisibilité.
 */
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 font-sans text-base leading-snug font-semibold text-foreground select-none",
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-55",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-55",
        className
      )}
      {...props}
    />
  )
}

export { Label }
