import { cn } from "@/lib/utils"

/**
 * Squelette de chargement — RIGUA
 *
 * Crème 200 plutôt que le gris d'origine, pour rester dans la gamme de la
 * marque, et rayon 8px comme le reste. Réserve la place du contenu à venir :
 * une page qui saute au chargement est particulièrement pénalisante pour un
 * visiteur qui lit lentement.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-cream-200", className)}
      {...props}
    />
  )
}

export { Skeleton }
