"use client"

import { useState } from "react"

import { Eyebrow } from "@/components/eyebrow"
import { Icon } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import type { GroupePrestations } from "@/lib/content/services"
import { cn } from "@/lib/utils"

/**
 * « Ce que cela couvre » : les prestations, en pastilles qui se déploient.
 *
 * Remplace un accordéon en rangées pleine largeur (demande client : « trois
 * ronds avec écrit logement ; quand on clique, le rond devient un ovale,
 * s'agrandit vers le bas et le texte apparaît »).
 *
 * Mécanique : les trois groupes sont posés en ligne. Le groupe fermé est un
 * disque (`rounded-full`, ratio carré) portant son pictogramme et son nom ;
 * ouvert, il s'étire en hauteur, son rayon se resserre en ovale large
 * (`rounded-[2.5rem]`) et la liste apparaît dessous. Un seul groupe ouvert à
 * la fois : les trois disques restent alignés et la hauteur de la ligne ne
 * saute pas.
 *
 * Pourquoi pas `ui/accordion` : ce composant impose des rangées rectangulaires
 * pleine largeur, alors que la forme est ici l'essentiel de l'interaction. La
 * mécanique reste accessible (`<button aria-expanded>` + région liée par
 * `id`), et le contenu est bien dans le DOM quand il est masqué, jamais
 * conditionné par du JavaScript.
 *
 * Palette inversée du projet (voir globals.css) : `accent-solid` est le vert
 * du logo, `primary` l'orange.
 */
export function Prestations({
  groupes,
  sombre = false,
}: {
  groupes: GroupePrestations[]
  /** La section englobante est en `data-surface="deep"`. */
  sombre?: boolean
}) {
  const [ouvert, setOuvert] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-8">
      <Reveal className="flex flex-col gap-5 lg:max-w-2xl">
        <Eyebrow icone="check">Ce que cela couvre</Eyebrow>
        <h2>Les prestations comprises</h2>
        <p
          className={cn(
            "text-base",
            sombre ? "text-cream-200" : "text-muted-foreground"
          )}
        >
          Trois familles de prestations. Ouvrez celle qui vous concerne.
        </p>
      </Reveal>

      {/* `items-start` : chaque carte garde sa hauteur propre. Avec
          `items-stretch` (défaut), ouvrir une carte étirait les deux autres à
          la même hauteur, ce qui faisait bouger toute la rangée. */}
      <div className="grid gap-5 sm:grid-cols-3 sm:items-start">
        {groupes.map((groupe, index) => {
          const actif = ouvert === groupe.titre
          const idPanneau = `prestations-${groupe.titre.replace(/\s+/g, "-").toLowerCase()}`

          return (
            <Reveal key={groupe.titre} delay={Math.min(index, 2) * 70}>
              <div
                className={cn(
                  "flex flex-col overflow-hidden bg-white transition-[border-radius] duration-300 ease-brand",
                  // Fermé : galet très arrondi. Ouvert : le rayon se resserre
                  // et le panneau descend.
                  actif ? "rounded-[2rem]" : "rounded-[3rem]",
                  sombre
                    ? "border-2 border-emerald-500"
                    : "border-2 border-primary"
                )}
              >
                <button
                  type="button"
                  aria-expanded={actif}
                  aria-controls={idPanneau}
                  onClick={() => setOuvert(actif ? null : groupe.titre)}
                  className={cn(
                    "group/rond flex flex-col items-center justify-center gap-3 px-6 py-7 text-center transition-colors duration-200",
                    // Hauteur libre dans les deux états, avec un plancher
                    // commun. `aspect-square` sur l'état fermé a été retiré :
                    // il imposait une hauteur égale à la largeur de la
                    // colonne, donc variable avec la fenêtre, et à
                    // l'ouverture la carte perdait d'un coup cette contrainte,
                    // ce qui faisait sauter la mise en page.
                    "min-h-[11rem]"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-14 items-center justify-center rounded-full transition-colors duration-200",
                      actif
                        ? "bg-accent-solid text-white"
                        : "bg-accent-solid/15 text-accent-ink group-hover/rond:bg-accent-solid group-hover/rond:text-white"
                    )}
                  >
                    <Icon name={groupe.icone} className="size-7" />
                  </span>
                  <span className="font-sans text-lg leading-snug font-semibold text-black">
                    {groupe.titre}
                  </span>
                  {/* Libellé explicite : « Voir les 3 » ne disait pas de quoi
                      il s'agissait. Le nombre reste utile (il annonce la
                      longueur de la liste), mais suivi de son objet. */}
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-accent-ink">
                    {actif
                      ? "Replier"
                      : `Voir les ${groupe.items.length} prestations`}
                    <Icon
                      name="chevron-down"
                      aria-hidden
                      className={cn(
                        "size-4 transition-transform duration-300 ease-brand",
                        actif && "-rotate-180"
                      )}
                    />
                  </span>
                </button>

                <div
                  id={idPanneau}
                  hidden={!actif}
                  className="px-6 pb-7"
                >
                  <ul className="flex flex-col gap-3 border-t border-line pt-5">
                    {groupe.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Icon
                          name="check"
                          aria-hidden
                          className="mt-1 size-4 shrink-0 text-accent-solid"
                        />
                        <span className="text-base text-cream-900">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
