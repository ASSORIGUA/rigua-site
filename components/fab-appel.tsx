"use client"

import Link from "next/link"
import * as React from "react"

import { Icon } from "@/components/icon"
import { actionPrincipale } from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * Bouton de rendez-vous flottant (FAB), mobile uniquement.
 *
 * Le header n'a plus d'accès équivalent en dessous de `xl` (site-header.tsx) :
 * ce FAB porte seul cet accès, avec un avantage que le header n'aurait pas eu
 * — `position: fixed` le garde à l'écran pendant tout le scroll, pas
 * seulement en haut de page. Pointe vers `actionPrincipale`
 * (`/prendre-rendez-vous`, lib/site.ts), l'action principale du site
 * (brief §23). Libellé affiché à côté de l'icône, pas seulement l'icône
 * seule : au premier coup d'œil, un visiteur pressé doit reconnaître
 * l'action, pas deviner ce qu'un bouton carré représente.
 *
 * `xl:hidden` : à partir de `xl`, le header retrouve sa barre de navigation
 * complète (voir site-header.tsx), où un numéro ou un lien "Nous joindre"
 * redevient accessible sans scroller ; le FAB deviendrait redondant.
 *
 * Rayon 8px comme tout le reste du design system (jamais de pill), pas un
 * cercle : un FAB rond est le réflexe le plus copié, la rupture visuelle
 * avec les concurrents est justement de ne jamais arrondir en pill.
 *
 * Coin bas droit : le Toaster de confirmation de formulaire
 * (components/ui/sonner.tsx) est ancré au même coin. Pour éviter que le FAB
 * ne se retrouve sous la première notification, le Toaster reçoit un
 * `offset` qui le pousse au-dessus de la hauteur du FAB (voir sonner.tsx).
 *
 * Masqué tant que le hero de l'accueil (`#hero-accueil`, voir
 * hero-accueil.tsx) OU le pied de page (`#site-footer`, voir
 * site-footer.tsx) est visible : le hero porte déjà ses propres CTA, et le
 * pied de page affiche les mêmes coordonnées (bloc « Nous joindre ») — dans
 * les deux cas, le FAB par-dessus serait redondant. Sur une page sans hero
 * (tarifs, contact, l'association...), le FAB restait sinon affiché en
 * permanence jusqu'au bas de page, où il recouvrait le lien téléphone et une
 * partie de l'e-mail du footer. Sur les pages qui n'ont ni l'un ni l'autre,
 * les éléments observés n'existent pas et le FAB s'affiche dès le premier
 * rendu.
 */
export function FabAppel() {
  /* `null` tant qu'on ne sait pas si un hero ou un footer sont déjà entrés
     dans le viewport : évite un flash du FAB avant que l'effet n'ait eu le
     temps de le masquer sur l'accueil. Rendu comme "visible" (false) pour ne
     pas non plus le masquer par défaut sur les pages sans hero ni footer
     visible au premier rendu. */
  const [masqueHero, setMasqueHero] = React.useState<boolean | null>(null)
  const [masqueFooter, setMasqueFooter] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    const hero = document.getElementById("hero-accueil")
    const footer = document.getElementById("site-footer")

    if (typeof IntersectionObserver === "undefined") {
      // queueMicrotask, pas un appel synchrone : même correctif que dans
      // components/reveal.tsx et components/ui/carousel.tsx, pour la même
      // raison (un setState synchrone dans le corps d'un effet déclenche un
      // rendu en cascade).
      queueMicrotask(() => {
        setMasqueHero(false)
        setMasqueFooter(false)
      })
      return
    }

    const disconnects: Array<() => void> = []

    if (hero) {
      const observer = new IntersectionObserver(
        ([entry]) => setMasqueHero(entry.isIntersecting),
        { threshold: 0.1 }
      )
      observer.observe(hero)
      disconnects.push(() => observer.disconnect())
    } else {
      queueMicrotask(() => setMasqueHero(false))
    }

    if (footer) {
      const observer = new IntersectionObserver(
        ([entry]) => setMasqueFooter(entry.isIntersecting),
        { threshold: 0.1 }
      )
      observer.observe(footer)
      disconnects.push(() => observer.disconnect())
    } else {
      queueMicrotask(() => setMasqueFooter(false))
    }

    return () => disconnects.forEach((disconnect) => disconnect())
  }, [])

  // `null` (état initial, avant que l'effet ne détermine la réponse) se
  // comporte comme "masqué" : sur l'accueil, ça évite un flash du FAB avant
  // que l'observer ne le cache derrière le hero ou le footer.
  const visible = masqueHero === false && masqueFooter === false

  return (
    <Link
      href={actionPrincipale.href}
      aria-label={`${actionPrincipale.libelle}, prendre rendez-vous`}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={cn(
        "fixed right-4 bottom-4 z-40 flex h-14 items-center gap-2.5 rounded-md bg-primary px-5 text-base font-semibold whitespace-nowrap text-primary-foreground shadow-lg transition-[opacity,transform] duration-200 ease-out hover:bg-primary-hover xl:hidden",
        !visible && "pointer-events-none translate-y-3 opacity-0"
      )}
    >
      <Icon name="agenda" aria-hidden className="size-6 shrink-0" />
      {actionPrincipale.libelle}
    </Link>
  )
}
