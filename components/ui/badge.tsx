import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Badge — Présence & Autonomie
 *
 * Écarts par rapport au badge shadcn d'origine :
 *  - `rounded-4xl` (pill) remplacé par 4px. Un badge est une étiquette, pas
 *    une gélule : la forme quasi carrée le distingue nettement d'un bouton.
 *  - capitales et interlettrage : c'est le même langage typographique que
 *    l'utilitaire `eyebrow`, ce qui évite d'introduire une troisième police
 *    pour les libellés.
 *  - hauteur 24px au lieu de 20px, texte 12px : lisible sans loupe.
 *
 * Usages prévus : niveaux GIR, statut d'une actualité, type de rendez-vous.
 */
const badgeVariants = cva(
  [
    "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1.5",
    "overflow-hidden rounded-xs border px-2 py-0.5",
    "font-sans text-2xs leading-none font-semibold tracking-widest uppercase whitespace-nowrap",
    "transition-colors duration-150 ease-out",
    "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
    "[&>svg]:pointer-events-none [&>svg]:size-3.5!",
  ],
  {
    variants: {
      variant: {
        /* Vert émeraude sur aplat très clair : couleur de marque. L'ocre est
           réservé à l'utilitaire `eyebrow`, jamais réutilisé sur un badge. */
        default:
          "border-primary/35 bg-primary/12 text-primary [a]:hover:bg-primary/22",
        solid:
          "border-transparent bg-primary text-primary-foreground [a]:hover:bg-primary-hover",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a]:hover:bg-cream-300",
        outline:
          "border-line-strong bg-transparent text-foreground [a]:hover:bg-secondary",
        /* Blanc plein : lisible sur une photo ou un aplat foncé (hero),
           là où `outline` ou `default` n'offrent pas assez de contraste. */
        paper: "border-transparent bg-paper text-green-900 [a]:hover:bg-cream-300",
        urgent:
          "border-urgent/35 bg-urgent-surface text-urgent-on-surface [a]:hover:bg-amber-100",
        destructive:
          "border-urgent/35 bg-urgent-surface text-urgent-on-surface [a]:hover:bg-amber-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
