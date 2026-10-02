import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

/**
 * Champ de saisie — Présence & Autonomie
 *
 * Écarts par rapport au champ shadcn d'origine :
 *  - hauteur 44px, texte 16px à toutes les tailles d'écran. Le `md:text-sm`
 *    d'origine ramenait le texte à 14px sur desktop : trop petit ici, et
 *    sous 16px iOS zoome automatiquement à la mise au point.
 *  - bordure `--input` (crème 600, 4,07:1 sur blanc) au lieu d'un gris
 *    presque invisible : le brief demande des champs clairement identifiables.
 *  - fond blanc plein, pas transparent, pour que le champ se lise comme une
 *    zone à remplir même posé sur une section crème.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        // Bordure de 2 px et fond blanc plein : à 1 px gris sur `bg-surface`,
        // les champs se confondaient avec le fond de la section et le
        // formulaire se lisait comme une suite de libellés. Le focus passe
        // au vert du logo (`accent-solid`), plus visible que l'anneau orange.
        "h-12 w-full min-w-0 rounded-md border-2 border-line-strong bg-white px-4 py-2",
        "font-sans text-base text-foreground",
        "transition-[border-color,box-shadow] duration-150 ease-out",
        "outline-none",
        "placeholder:text-muted-foreground",
        "file:mr-3 file:inline-flex file:h-8 file:cursor-pointer file:rounded-sm file:border-0 file:bg-secondary file:px-3 file:text-sm file:font-semibold file:text-secondary-foreground",
        "hover:border-primary",
        "focus-visible:border-accent-solid focus-visible:ring-3 focus-visible:ring-accent-solid/30",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/25",
        className
      )}
      {...props}
    />
  )
}

export { Input }
