"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

import { Icon } from "@/components/icon"
import { Section } from "@/components/section"
import { ServiceBloc } from "@/components/sections/service-bloc"
import type { Service } from "@/lib/content/services"
import { cn } from "@/lib/utils"

/**
 * Les quatre services : un menu en tuiles, puis le service choisi en entier.
 *
 * Historique de cette page, utile avant d'y toucher :
 *  1. quatre pages `/nos-services/[slug]` séparées ;
 *  2. les quatre articles empilés sur une seule page (2 497 mots, 57 titres
 *     de niveau 3, le même gabarit répété quatre fois) ;
 *  3. des onglets, avec une simple rangée de raccourcis textuels ;
 *  4. cet état.
 *
 * Ce que le passage 3 → 4 corrige, sur retour client :
 *  - la rangée de raccourcis ne se lisait pas comme une navigation. Elle est
 *    remplacée par quatre tuiles avec photo, nom du service, la phrase que
 *    prononce une famille, et un « En savoir plus » explicite : le geste à
 *    faire est visible sans avoir à le deviner ;
 *  - la page manquait de contraste. Le menu est posé sur `deep` (le vert
 *    foncé du site), le service affiché juste après sur une surface claire :
 *    la rupture se voit au premier coup d'œil, au lieu d'un enchaînement de
 *    blancs cassés ;
 *  - la tuile active est marquée par un liseré ocre plein et un décalage,
 *    pas seulement par une teinte de fond, pour rester lisible en plein
 *    soleil comme sur un écran mal réglé.
 *
 * Mécanique : un état local plutôt que `ui/tabs` (Base UI), parce que chaque
 * service doit porter sa propre <Section> avec sa surface et son image de
 * fond, alors que les panneaux de Base UI vivent dans un conteneur commun.
 * Les ancres `#slug` restent fonctionnelles (le header, le hero, l'Orienteur
 * et le pied de page y renvoient) : lues au montage et à chaque `hashchange`.
 *
 * Accessibilité : `role="tablist"`, `aria-selected`, et des `<a href="#slug">`
 * plutôt que des `<button>`, pour qu'une URL partagée ou une navigation sans
 * JavaScript atteigne quand même le bon service.
 */

export function ServicesOnglets({ services }: { services: Service[] }) {
  const [actif, setActif] = useState(services[0]?.slug ?? "")
  const panneauRef = useRef<HTMLDivElement>(null)
  /**
   * `svh` (small viewport height) et non `vh`/`dvh` pour la hauteur des
   * vignettes : `svh` correspond à la hauteur écran barre d'adresse déployée
   * et ne change plus quand celle-ci se rétracte au scroll. Les photos étant
   * en `fill` + `object-cover`, une unité qui varie ferait recadrer l'image
   * pendant le défilement, ce que le design system interdit. Les bornes
   * `clamp()` figent en plus la hauteur entre deux valeurs en `rem`.
   */

  useEffect(() => {
    const depuisHash = () => {
      const slug = window.location.hash.replace("#", "")
      if (slug && services.some((service) => service.slug === slug)) {
        setActif(slug)
      }
    }
    depuisHash()
    window.addEventListener("hashchange", depuisHash)
    return () => window.removeEventListener("hashchange", depuisHash)
  }, [services])

  const choisir = (slug: string) => {
    setActif(slug)
    history.replaceState(null, "", `#${slug}`)
    panneauRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const service = services.find((entree) => entree.slug === actif) ?? services[0]
  if (!service) return null

  return (
    <>
      {/* ---------- Le menu : une bande de quatre vignettes ---------- */}
      {/* Pas de titre ni de chapô ici : le hero de la page porte déjà
          « Quatre solutions, qui se combinent souvent » et l'explication du
          fait qu'elles se combinent. Les répéter juste en dessous faisait lire
          deux fois la même chose à deux écrans d'intervalle.
          Pleine largeur, sans gouttière ni conteneur : les quatre vignettes se
          touchent et vont d'un bord à l'autre de l'écran, ce qui les fait lire
          comme une barre de navigation posée sous le hero plutôt que comme une
          grille de cartes de contenu (que le design system interdit par
          ailleurs pour les services). Le texte est posé sur la photo, en bas,
          sur un dégradé sombre qui garantit le contraste. */}
      <nav
        role="tablist"
        aria-label="Choisir un service"
        className={cn(
          "grid grid-cols-2 lg:grid-cols-4",
          // Vignettes compactes, en proportion fixe, plutôt qu'étirées sur la
          // hauteur d'écran. Étirer la bande à `100svh` déformait les photos
          // (une vignette de 4/5 tirée sur un demi-écran haut) : la contrainte
          // « tout tenir sur un écran » se règle en réduisant la hauteur des
          // vignettes, pas en les étirant. À 2 rangées de 26vh sous `lg`, la
          // bande occupe environ la moitié d'un écran de téléphone, laissant
          // voir le début de la fiche du service. Les bornes en `rem` évitent
          // qu'une vignette devienne illisible sur un écran très court ou
          // démesurée sur un grand écran.
          "[--vignette:26svh] [&>a]:h-[clamp(9rem,var(--vignette),13rem)]",
          "lg:[--vignette:34svh] lg:[&>a]:h-[clamp(13rem,var(--vignette),20rem)]"
        )}
      >
        {services.map((entree) => {
          const selectionne = entree.slug === service.slug
          return (
            <a
              key={entree.slug}
              role="tab"
              aria-selected={selectionne}
              href={`#${entree.slug}`}
              onClick={(evenement) => {
                evenement.preventDefault()
                choisir(entree.slug)
              }}
              className={cn(
                "group/tuile relative flex h-full flex-col justify-end overflow-hidden text-left",
                // Le liseré ocre du service affiché est posé en inset plutôt
                // qu'en `border` : une bordure décalerait le contenu de 4px et
                // ferait sauter la vignette au changement d'onglet.
                selectionne && "z-10"
              )}
            >
              {entree.photoSrc ? (
                <Image
                  src={entree.photoSrc}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className={cn(
                    "object-cover transition-transform duration-500 ease-brand",
                    !selectionne && "group-hover/tuile:scale-105"
                  )}
                />
              ) : (
                <span aria-hidden className="absolute inset-0 bg-primary" />
              )}

              {/* Voile de lisibilité. Plus dense sur la vignette affichée pour
                  la distinguer sans changer la photo. */}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-0 bg-gradient-to-t transition-colors duration-300",
                  selectionne
                    ? "from-cream-900/95 via-cream-900/70 to-cream-900/25"
                    : "from-cream-900/90 via-cream-900/45 to-transparent"
                )}
              />

              {selectionne ? (
                <span
                  aria-hidden
                  className="absolute inset-0 border-4 border-accent"
                />
              ) : null}

              <span className="relative flex flex-col gap-1.5 p-4 sm:p-5">
                <Icon
                  name={entree.icone}
                  aria-hidden
                  className="size-6 text-white/85"
                />
                <span className="font-sans text-base leading-snug font-semibold text-white sm:text-lg">
                  {entree.titreCourt}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 text-sm font-semibold",
                    selectionne ? "text-accent" : "text-white/85"
                  )}
                >
                  {selectionne ? "Affiché ci-dessous" : "En savoir plus"}
                  <Icon
                    name="arrow-right"
                    aria-hidden
                    className="size-4 transition-transform duration-200 group-hover/tuile:translate-x-1"
                  />
                </span>
              </span>
            </a>
          )
        })}
      </nav>

      {/* ---------- Le service choisi ---------- */}
      {/* Pas d'image de fond ici, volontairement : la bande de vignettes juste
          au-dessus est déjà entièrement photographique, et la fiche contient
          sa propre photo de service en pleine colonne. Trois couches d'image
          d'affilée écrasaient le texte et enchaînaient deux fonds photo, ce
          que la règle d'alternance interdit. La section suivante
          (« Si vous hésitez ») reprend une image de fond : l'alternance est
          donc photo, uni, photo. */}
      <div ref={panneauRef} className="scroll-mt-24">
        <Section surface="papier">
          <ServiceBloc
            key={service.slug}
            service={service}
            index={services.indexOf(service)}
            sombre={false}
          />
        </Section>
      </div>
    </>
  )
}
