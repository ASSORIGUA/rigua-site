import Image from "next/image"

import { cn } from "@/lib/utils"

/**
 * Marque RIGUA.
 *
 * `public/logo_rigua.svg` est le seul fichier de logo : un PNG officiel
 * (dégradés, typographie circulaire) encapsulé dans une balise <image>, donc
 * pas un vecteur éditable. Impossible d'en extraire des couleurs ou d'y
 * appliquer `currentColor` — voir AGENTS.md.
 *
 * Le fond de ce fichier est transparent : il s'adapte déjà à toute surface
 * (claire, crème, vert foncé). Il n'y a donc plus de variante de couleur à
 * choisir. La prop `variant` reste acceptée pour compatibilité avec les
 * appels existants (site-header, site-footer, design-system) mais n'a plus
 * d'effet sur le rendu.
 *
 * Pas de `fill` : les appelants ne fixent souvent qu'une seule dimension
 * (`h-11.25 w-auto`), incompatible avec un parent `fill` qui exige les deux.
 * `width`/`height` intrinsèques + `w-auto h-auto` laissent l'utilitaire de
 * l'appelant contraindre la dimension de son choix, l'autre suit le ratio.
 */
export type LogoVariant = "brand" | "inverse" | "mono"

type LogoProps = Omit<
  React.ComponentPropsWithoutRef<"img">,
  "src" | "alt" | "children" | "width" | "height"
> & {
  /** Conservée pour compatibilité. Sans effet : le logo s'adapte à tout fond. */
  variant?: LogoVariant
  /** Texte alternatif. Omettre uniquement si le nom de l'association est déjà lisible juste à côté. */
  label?: string
}

export function Logo({
  variant,
  label = "RIGUA",
  className,
  ...props
}: LogoProps) {
  /* `variant` n'a plus d'effet : accepté pour compatibilité, jamais transmis
     au DOM (sinon React avertit sur un attribut `variant` inconnu sur <img>). */
  void variant

  return (
    <Image
      src="/logo_rigua.svg"
      alt={label}
      width={80}
      height={80}
      priority
      className={cn("h-auto w-20 shrink-0 object-contain", className)}
      {...props}
    />
  )
}
