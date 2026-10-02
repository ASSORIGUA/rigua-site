"use client"

import { useState } from "react"

import { Icon } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import type { EtapeDeroule } from "@/lib/content/services"
import { cn } from "@/lib/utils"

/**
 * Le déroulé d'un service, en frise d'étapes repliées.
 *
 * Chaque étape est un carré vert numéroté suivi de son titre. Le texte de
 * l'étape est masqué derrière un « En savoir plus » : à l'état replié, la
 * frise ne montre que la séquence (quatre ou cinq intitulés courts), ce qui
 * tient sur une fraction d'écran au lieu d'un pavé de quatre paragraphes
 * (retour client : « là, directement, il y a toutes les informations, et ça
 * prend beaucoup d'espace »).
 *
 * Chaque étape s'ouvre indépendamment : contrairement à un accordéon, on peut
 * vouloir comparer deux étapes. Rien n'est ouvert au chargement (règle
 * client). Le texte est dans le DOM en permanence, seulement masqué par
 * `hidden` : il reste lisible sans JavaScript et indexable.
 *
 * Deux dispositions pour le même balisage :
 *  - à partir de `lg`, une rangée : autant de colonnes que d'étapes, trait
 *    horizontal derrière les carrés ;
 *  - en dessous, une colonne : carré à gauche, trait vertical, texte à droite.
 *
 * Palette inversée du projet (voir globals.css) : `accent-solid` est le vert
 * du logo, `primary` l'orange.
 */
export function EtapesFrise({
  etapes,
  cle,
}: {
  etapes: EtapeDeroule[]
  /** Préfixe des clés et des identifiants, le slug du service. */
  cle: string
}) {
  const [ouvertes, setOuvertes] = useState<Set<number>>(new Set())

  const basculer = (index: number) =>
    setOuvertes((actuelles) => {
      const suivantes = new Set(actuelles)
      if (suivantes.has(index)) suivantes.delete(index)
      else suivantes.add(index)
      return suivantes
    })

  return (
    <ol
      className={cn(
        "relative flex flex-col gap-0 lg:grid lg:items-start lg:gap-6",
        "lg:grid-cols-[repeat(var(--colonnes),minmax(0,1fr))]",
        // Trait horizontal derrière les carrés, à partir de `lg` : à la
        // hauteur du centre des carrés (h-16, soit 2rem), du premier au dernier.
        "lg:before:absolute lg:before:top-8 lg:before:left-8 lg:before:right-8 lg:before:h-0.5 lg:before:bg-accent-solid/40"
      )}
      style={{ ["--colonnes" as string]: etapes.length }}
    >
      {etapes.map((etape, index) => {
        const derniere = index === etapes.length - 1
        const ouverte = ouvertes.has(index)
        const idTexte = `${cle}-etape-${index}`

        return (
          <Reveal
            as="li"
            key={`${cle}-${etape.titre}`}
            delay={Math.min(index, 4) * 70}
            className="relative flex gap-5 lg:flex-col lg:gap-4"
          >
            {/* Colonne du repère (mobile) / tête de colonne (desktop). */}
            <div className="relative flex shrink-0 flex-col items-center lg:items-start">
              <span
                aria-hidden
                className="nums relative z-10 flex size-16 shrink-0 items-center justify-center rounded-md bg-accent-solid text-2xl font-semibold text-white shadow-sm"
              >
                {index + 1}
              </span>
              {!derniere ? (
                <span
                  aria-hidden
                  className="w-0.5 flex-1 bg-accent-solid/40 lg:hidden"
                />
              ) : null}
            </div>

            <div className="flex min-w-0 flex-col items-start gap-2 pt-1 pb-8 lg:pb-0">
              <h4 className="flex items-start gap-2 font-sans text-lg leading-snug font-semibold">
                <Icon
                  name={etape.icone}
                  aria-hidden
                  className="mt-0.5 size-5 shrink-0 text-accent-ink"
                />
                {etape.titre}
              </h4>

              <button
                type="button"
                aria-expanded={ouverte}
                aria-controls={idTexte}
                onClick={() => basculer(index)}
                className="flex min-h-11 items-center gap-1.5 text-base font-semibold text-accent-ink underline decoration-2 underline-offset-4 transition-colors hover:text-primary"
              >
                {ouverte ? "Replier" : "En savoir plus"}
                <Icon
                  name="chevron-down"
                  aria-hidden
                  className={cn(
                    "size-4 transition-transform duration-300 ease-brand",
                    ouverte && "-rotate-180"
                  )}
                />
              </button>

              <p
                id={idTexte}
                hidden={!ouverte}
                className="text-base text-muted-foreground"
              >
                {etape.texte}
              </p>
            </div>
          </Reveal>
        )
      })}
    </ol>
  )
}
