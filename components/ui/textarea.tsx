import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Zone de texte — Présence & Autonomie
 * Mêmes règles que le champ de saisie : 16px partout, bordure visible,
 * fond plein. `field-sizing-content` laisse le champ grandir avec le texte
 * plutôt que d'imposer une barre de défilement interne.
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-28 w-full rounded-md border-2 border-line-strong bg-white px-4 py-3",
        "font-sans text-base leading-relaxed text-foreground",
        "transition-[border-color,box-shadow] duration-150 ease-out",
        "outline-none",
        "placeholder:text-muted-foreground",
        "hover:border-primary",
        "focus-visible:border-accent-solid focus-visible:ring-3 focus-visible:ring-accent-solid/30",
        "disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/25",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
