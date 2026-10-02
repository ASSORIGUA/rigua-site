"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Révélation au scroll.
 *
 * Pourquoi pas Framer Motion : la direction visuelle ne demande qu'une chose,
 * une opacité et une translation de 20px, une seule fois, à l'entrée dans le
 * viewport. Un IntersectionObserver et deux propriétés CSS y suffisent. Pour ce
 * site, dont le public consulte souvent depuis un téléphone ancien et une
 * connexion modeste, 40 Ko de JavaScript pour un fondu serait un mauvais
 * échange. Cette décision est consignée dans docs/direction-visuelle.md §6.
 *
 * Trois garanties :
 *  - l'état masqué est posé par une classe rendue côté serveur, donc pas de
 *    flash de contenu déjà en place ;
 *  - le <noscript> du layout annule cette classe : si JavaScript ne s'exécute
 *    pas, tout le contenu reste visible. Une animation ne doit jamais pouvoir
 *    cacher de l'information sur un site d'information ;
 *  - `prefers-reduced-motion` court-circuite l'observateur : le contenu est
 *    affiché immédiatement, sans transition.
 *
 * L'observateur reste actif après la première révélation : l'élément revient
 * masqué en sortant du viewport et se révèle à nouveau à chaque entrée, pour
 * que l'animation rejoue à chaque passage (et pas seulement au premier).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode
  className?: string
  /** Décalage en ms, pour une cascade. Quatre éléments maximum, 70ms de pas. */
  delay?: number
  as?: "div" | "li" | "section" | "article" | "header"
}) {
  /* L'union de balises rend le type de `ref` incompatible avec chacun de ses
     membres : on élargit la balise en ElementType et on garde le typage sur la
     ref elle-même, qui est la seule chose que ce composant manipule. */
  const Composant = Tag as React.ElementType
  const ref = React.useRef<HTMLElement | null>(null)
  const [revele, setRevele] = React.useState(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduit || typeof IntersectionObserver === "undefined") {
      /* queueMicrotask et non setRevele() en direct : un setState synchrone
         dans le corps d'un effet déclenche un rendu en cascade. Même correctif
         que dans components/ui/carousel.tsx, pour la même raison. */
      queueMicrotask(() => setRevele(true))
      return
    }

    /* Déjà dans le viewport au chargement : on révèle sans attendre un scroll
       qui pourrait ne jamais venir.

       `rootMargin` à zéro et `threshold` à 0 : la version précédente
       (`-12%` en bas, seuil 6 %) ne révélait pas un élément dont seul le haut
       dépassait dans le dernier huitième de l'écran. À l'arrivée sur une page,
       le premier bloc sous le pli restait donc invisible tant qu'on ne
       défilait pas, alors qu'il était déjà dans la zone visible : l'écran
       paraissait vide (retour client). Désormais, un seul pixel visible
       suffit, à l'entrée comme au chargement. */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setRevele(entry.isIntersecting)
        }
      },
      { rootMargin: "0px", threshold: 0 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Composant
      ref={ref}
      className={cn("reveal", className)}
      data-revealed={revele ? "true" : undefined}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Composant>
  )
}
