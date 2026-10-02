import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Message d'alerte — Présence & Autonomie
 *
 * Trois usages précis sur ce site :
 *  - `urgent` : le rappel de la procédure en cas de situation urgente, et le
 *    rappel qu'aucune admission immédiate n'est garantie sans évaluation.
 *    Le brief interdit toute promesse d'accueil immédiat : ce message est le
 *    garde-fou éditorial ;
 *  - `info` : les précisions de cadre (tarifs indicatifs, conditions
 *    d'admission à confirmer, minimisation des données du formulaire) ;
 *  - `success` : la confirmation d'envoi d'une demande.
 *
 * Écarts par rapport au composant shadcn d'origine : texte 16px au lieu de
 * 14px, respiration doublée, et un vrai jeu de variantes colorées. L'original
 * n'avait que `default` et `destructive`, tous deux sur fond de carte, donc
 * visuellement indistincts.
 */
const alertVariants = cva(
  [
    "group/alert relative grid w-full gap-1 rounded-md border px-5 py-4 text-left font-sans text-base",
    "has-data-[slot=alert-action]:pr-16",
    "has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-3.5",
    "*:[svg]:row-span-2 *:[svg]:mt-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-6",
  ],
  {
    variants: {
      variant: {
        info: "border-line bg-surface-warm text-foreground",
        urgent:
          "border-urgent/30 bg-urgent-surface text-urgent-on-surface *:data-[slot=alert-description]:text-urgent-on-surface",
        success: "border-primary/25 bg-green-50 text-foreground",
        /* Conservé pour compatibilité avec les exemples shadcn. */
        default: "border-line bg-surface-warm text-foreground",
        destructive:
          "border-urgent/30 bg-urgent-surface text-urgent-on-surface *:data-[slot=alert-description]:text-urgent-on-surface",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-semibold group-has-[>svg]/alert:col-start-2",
        "[&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-base leading-relaxed text-pretty text-muted-foreground",
        "[&_a]:font-semibold [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-4",
        "[&_p:not(:last-child)]:mb-3",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-3 right-3", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants }
