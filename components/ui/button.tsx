import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Bouton — Présence & Autonomie
 *
 * Écarts assumés par rapport au bouton shadcn d'origine :
 *  - hauteur par défaut 44px au lieu de 32px, texte 16px au lieu de 14px.
 *    Le public du site est âgé ou proche de personnes âgées : la cible
 *    tactile de 44px et le corps de 16px sont des planchers, pas des options.
 *  - rayon 8px, jamais de pill. Les trois concurrents du secteur utilisent
 *    tous des pills : c'est le signe de rupture visuelle le plus immédiat.
 *  - variante `urgent` pour le parcours « besoin d'une solution urgente ».
 *  - au clic, léger tassement plutôt qu'une translation, pour éviter de
 *    décaler la ligne de texte voisine.
 */
const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center gap-2",
    "rounded-md border border-transparent bg-clip-padding",
    "font-sans font-semibold whitespace-nowrap",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out",
    "outline-none select-none",
    "focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-[0.985]",
    "disabled:pointer-events-none disabled:opacity-55",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-5",
  ],
  {
    variants: {
      variant: {
        /* Action principale. Fond ocre foncé : texte blanc pur. */
        default:
          "bg-accent-action text-white shadow-subtle hover:bg-accent-action-hover",
        /* Action secondaire de même poids visuel, sans aplat : transparent,
           donc posé aussi bien sur papier que sur fond marine (cta-band).
           `text-foreground` bascule déjà noir/blanc pur selon la surface. */
        /* Bordure de 2px en vert d'ancrage, sur fond plein clair, et non un
           filet gris pâle sur fond transparent : le bouton secondaire se
           lisait comme un simple bout de texte souligné, alors qu'il porte
           des actions réelles (voir un tarif, ouvrir une fiche). Le fond
           blanc le détache aussi des sections à fond photographique, où un
           bouton transparent disparaissait dans l'image. */
        outline:
          "border-2 border-primary bg-surface text-primary shadow-subtle hover:bg-primary hover:text-primary-foreground",
        secondary:
          "bg-secondary text-black hover:bg-cream-300",
        /* Transparent, même raisonnement que `outline`. */
        ghost: "text-foreground hover:bg-secondary",
        /* Parcours urgence uniquement. Fond ocre foncé : texte blanc pur. */
        urgent:
          "bg-urgent text-white shadow-subtle hover:bg-urgent/92",
        /* Fond clair (surface d'alerte) : texte noir pur. */
        destructive:
          "bg-urgent-surface text-black hover:bg-amber-100 focus-visible:ring-urgent/40",
        /* Lien : souligné en permanence, jamais un « lien » qui ne se voit
           qu'au survol. Le public doit repérer les liens sans les chercher.
           Transparent : suit `--foreground` comme `outline`/`ghost`. */
        link: "h-auto px-0 text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:decoration-primary",
      },
      size: {
        default: "h-11 px-5 text-base",
        sm: "h-10 px-4 text-sm [&_svg:not([class*='size-'])]:size-4",
        lg: "h-13 px-7 text-lg [&_svg:not([class*='size-'])]:size-6",
        icon: "size-11",
        "icon-sm": "size-10 [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-13 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  render,
  nativeButton,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      render={render}
      /* `render` fournit toujours un <Link>, jamais un <button> : sans ce
         garde, Base UI attend un <button> natif et avertit à chaque bouton
         qui navigue (variante shadcn d'origine, non ajustée pour Next.js). */
      nativeButton={nativeButton ?? !render}
      {...props}
    />
  )
}

export { Button, buttonVariants }
