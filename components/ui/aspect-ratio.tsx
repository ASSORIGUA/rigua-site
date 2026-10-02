import { cn } from "@/lib/utils"

/**
 * Ratio d'image — Présence & Autonomie
 *
 * Réserve la place de l'image avant son chargement. Sur ce site les photos
 * sont nombreuses (structure, équipe, activités) : sans ratio déclaré, chaque
 * image qui arrive décale le texte déjà lu. C'est le composant qui empêche
 * ça, à utiliser autour de chaque visuel de contenu.
 *
 * Aucun écart de style : le composant est purement structurel.
 */
function AspectRatio({
  ratio,
  className,
  ...props
}: React.ComponentProps<"div"> & { ratio: number }) {
  return (
    <div
      data-slot="aspect-ratio"
      style={
        {
          "--ratio": ratio,
        } as React.CSSProperties
      }
      className={cn("relative aspect-(--ratio)", className)}
      {...props}
    />
  )
}

export { AspectRatio }
