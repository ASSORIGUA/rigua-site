"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import { cn } from "@/lib/utils"

/**
 * Groupe de boutons radio — Présence & Autonomie
 *
 * Utilisé pour les choix uniques du formulaire de demande : type de
 * rendez-vous, degré d'urgence, relation avec la personne concernée.
 *
 * Écarts par rapport au composant shadcn d'origine :
 *  - 20px au lieu de 16px, zone de clic étendue à 44px par `after:` ;
 *  - bordure 2px en `--input`, visible sur fond blanc comme sur fond crème ;
 *  - espacement du groupe porté à 12px : des options collées se lisent mal
 *    quand chacune tient sur deux lignes de texte.
 */
function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-5 shrink-0 rounded-full border-2 border-input bg-surface",
        "transition-colors duration-150 ease-out outline-none",
        "after:absolute after:-inset-x-3 after:-inset-y-3",
        "hover:border-primary",
        "focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:opacity-55",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/25",
        "aria-invalid:aria-checked:border-primary",
        "data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex size-full items-center justify-center"
      >
        <span className="size-2 rounded-full bg-primary-foreground" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
