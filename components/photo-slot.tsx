import type { CSSProperties } from "react"
import Image from "next/image"

import { Eyebrow } from "@/components/eyebrow"
import { Icon } from "@/components/icon"
import { ParallaxeFond } from "@/components/motion/parallaxe"
import { cn } from "@/lib/utils"

/**
 * Emplacement photo.
 *
 * Le brief demande de vraies photos de la structure, de l'équipe et des
 * activités (§10), et interdit les visuels de banques d'images trop
 * reconnaissables. Ces photos n'existent pas encore : elles font partie des
 * contenus à récupérer auprès de Corrine (§17).
 *
 * Plutôt que de meubler avec des images d'illustration qu'il faudrait ensuite
 * retirer, ce composant réserve l'emplacement exact, au bon format, et affiche
 * la photo attendue. Trois conséquences utiles :
 *  - la mise en page est déjà celle du site final, aucun décalage à la
 *    livraison des photos ;
 *  - la liste des prises de vue à réaliser se lit directement sur la maquette,
 *    et docs/photos-a-fournir.md la reprend ;
 *  - il est impossible d'oublier un placeholder en production, il se voit.
 *
 * Livrer une photo : passer `src` et `alt`. Rien d'autre à changer.
 */
export function PhotoSlot({
  description,
  src,
  alt,
  ratio = "4/3",
  ratioMobile,
  remplirHauteur = false,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  focus,
  parallaxe = true,
}: {
  /** Ce que la photo doit montrer. Devient la consigne de prise de vue. */
  description: string
  src?: string
  /** Obligatoire dès que `src` est renseigné. */
  alt?: string
  ratio?: "4/3" | "3/2" | "16/9" | "1/1" | "3/4"
  /**
   * Ratio distinct en dessous de `lg:`, pour raccourcir une photo pensée en
   * portrait sur desktop mais trop haute une fois empilée sur mobile.
   * `ratio` s'applique alors à partir de `lg:`.
   */
  ratioMobile?: "4/3" | "3/2" | "16/9" | "1/1" | "3/4"
  /**
   * À partir de `lg:`, abandonne le ratio fixe : la photo remplit toute la
   * hauteur de sa cellule de grid (recadrée en `object-cover`), pour
   * s'aligner sur un bloc de texte voisin dont la longueur varie selon le
   * contenu plutôt qu'un ratio arbitraire. Le parent grid doit alors poser
   * `items-stretch` (pas `items-start`) à partir de `lg:`. Ratio normal en
   * dessous de `lg:`, où les blocs ne sont plus côte à côte.
   */
  remplirHauteur?: boolean
  className?: string
  priority?: boolean
  sizes?: string
  /**
   * Légère parallaxe de la photo dans son cadre au défilement. Activée par
   * défaut sur toute photo livrée ; passer `false` pour une image qui ne
   * doit pas bouger (ex. posée dans un carrousel déjà animé).
   */
  parallaxe?: boolean
  /**
   * Point d'ancrage du recadrage `object-cover`, quand le sujet n'est pas
   * centré dans la source (ex. un portrait haut-cadré recadré en format
   * plus court que l'original : sans ça, `object-cover` centre et coupe la
   * tête). Valeur CSS `object-position`, ex. "50% 20%".
   */
  focus?: string
}) {
  const cadre = cn(
    "relative overflow-hidden rounded-xl border border-line bg-muted",
    remplirHauteur && "lg:h-full",
    className
  )
  // `aspectRatio` en style inline s'applique à toutes les tailles, sans media
  // query : pour que `remplirHauteur` puisse l'annuler à partir de `lg:`
  // (classe `lg:aspect-auto`), le ratio doit passer par une variable CSS
  // consommée par une classe Tailwind responsive, jamais par `style` direct.
  const style =
    ratioMobile || remplirHauteur
      ? ({
          "--photo-ratio-mobile": ratioMobile ?? ratio,
          "--photo-ratio": ratio,
        } as CSSProperties)
      : { aspectRatio: ratio }
  const ratioClass = cn(
    ratioMobile || remplirHauteur
      ? "aspect-(--photo-ratio-mobile) lg:aspect-(--photo-ratio)"
      : undefined,
    remplirHauteur && "lg:aspect-auto"
  )

  if (src) {
    const image = (
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={focus ? { objectPosition: focus } : undefined}
      />
    )
    return (
      <div className={cn(cadre, ratioClass)} style={style}>
        {parallaxe ? <ParallaxeFond amplitude={18}>{image}</ParallaxeFond> : image}
      </div>
    )
  }

  return (
    <div
      className={cn(cadre, ratioClass)}
      style={style}
      role="img"
      aria-label={`Emplacement réservé pour une photo : ${description}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-7 text-center">
        <Icon name="photo" className="size-10 text-accent-ink" aria-hidden />
        <Eyebrow>Photo à fournir</Eyebrow>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
