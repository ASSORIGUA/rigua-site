"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import { Icon } from "@/components/icon"
import { cn } from "@/lib/utils"

/**
 * Case à cocher — Présence & Autonomie
 *
 * Écarts par rapport à la case shadcn d'origine :
 *  - 20px au lieu de 16px, avec une zone de clic étendue par `after:` bien
 *    au-delà du carré visible, pour atteindre 44px de cible réelle ;
 *  - bordure `--input` (crème 600) : une case à peine visible est le premier
 *    obstacle d'un formulaire de consentement, et celui-ci est obligatoire
 *    (RGPD) sur le formulaire de demande ;
 *  - la coche est la primitive maison `pa:check` : Solar ne fournit que des
 *    coches cerclées, qui dessineraient un cercle dans un carré.
 */
function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-5 shrink-0 items-center justify-center rounded-xs border-2 border-input bg-surface",
        "transition-colors duration-150 ease-out outline-none",
        "after:absolute after:-inset-x-3 after:-inset-y-3",
        "hover:border-primary",
        "focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:opacity-55",
        "group-has-disabled/field:opacity-55",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/25",
        "data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground",
        "aria-invalid:aria-checked:border-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <Icon name="check" className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
