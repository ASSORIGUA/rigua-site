"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

/**
 * Le filet ocre dessiné sous les titres de section, version animée : le
 * trait se trace de gauche à droite à l'entrée dans le viewport, comme un
 * coup de crayon. Une seule fois (`once`), et pas du tout si l'utilisateur
 * préfère réduire les animations.
 */
export function TraitTitre({ className }: { className?: string }) {
  const ref = React.useRef<SVGSVGElement>(null)
  const visible = useInView(ref, { once: true, amount: 0.6 })
  const reduit = useReducedMotion()

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 240 10"
      preserveAspectRatio="none"
      className={className}
    >
      <motion.path
        d="M2 7.2 C 42 3.1, 88 8.4, 130 4.6 S 206 2.4, 238 5.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        initial={{ pathLength: reduit ? 1 : 0 }}
        animate={{ pathLength: visible || reduit ? 1 : 0 }}
        transition={{ duration: reduit ? 0 : 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />
    </svg>
  )
}
