"use client"

import * as React from "react"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"

/**
 * Parallaxe au défilement, réservée aux sections de CONTENU.
 *
 * Règle absolue du projet : JAMAIS de parallaxe ni de zoom sur le fond du
 * hero. Ces composants ne doivent être posés que sur les fonds photo de
 * section, les illustrations décoratives et les images de contenu.
 *
 * Trois garde-fous :
 *  - `prefers-reduced-motion` coupe tout déplacement (le contenu est rendu
 *    tel quel, sans transformation) ;
 *  - uniquement `transform` : aucun reflow, aucune animation de dimension ;
 *  - amplitudes faibles. Le public du site est âgé ou proche de personnes
 *    âgées : la parallaxe doit donner de la profondeur, pas du vertige.
 */

/**
 * Fond photo de section : le calque glisse lentement pendant que la section
 * traverse l'écran. Le conteneur est volontairement plus haut que la section
 * (`-inset-y-[8%]`) pour que le déplacement ne découvre jamais de bord nu.
 */
export function ParallaxeFond({
  children,
  amplitude = 36,
}: {
  children: React.ReactNode
  /** Déplacement total en pixels, du haut vers le bas de la traversée. */
  amplitude?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduit = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [-amplitude, amplitude])

  if (reduit) {
    return <div className="absolute inset-0">{children}</div>
  }

  return (
    <div ref={ref} className="absolute inset-0">
      <motion.div className="absolute inset-x-0 -inset-y-[8%] will-change-transform" style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}

/**
 * Élément flottant : une dérive verticale douce et amortie au défilement,
 * pour les illustrations de coin et les images de contenu. `direction: -1`
 * inverse le sens, pour que deux éléments voisins ne bougent pas en bloc.
 */
export function ParallaxeFlottant({
  children,
  className,
  amplitude = 20,
  direction = 1,
}: {
  children: React.ReactNode
  className?: string
  amplitude?: number
  direction?: 1 | -1
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduit = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const brut = useTransform(
    scrollYProgress,
    [0, 1],
    [amplitude * direction, -amplitude * direction],
  )
  /* Le ressort lisse les à-coups de molette sans retarder le geste. */
  const y = useSpring(brut, { stiffness: 120, damping: 24, mass: 0.6 })

  if (reduit) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div ref={ref} className={cn("will-change-transform", className)} style={{ y }}>
      {children}
    </motion.div>
  )
}
