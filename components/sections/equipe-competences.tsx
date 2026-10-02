import { Icon } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getPage } from "@/lib/cms"
import { competences as competencesDefaut } from "@/lib/content/association"
import { cn } from "@/lib/utils"

/**
 * Les métiers du centre de répit, en deux équipes repliables.
 *
 * Deux groupes réels, déjà distingués par le livret d'accueil et portés par
 * `groupe` sur chaque compétence (lib/content/association.ts) : les
 * professionnels de santé, et le personnel qui fait tourner le lieu de vie.
 *
 * Chaque équipe est un accordéon fermé par défaut (règle client : jamais
 * d'accordéon pré-ouvert). La version précédente déroulait les neuf métiers
 * en deux colonnes toujours ouvertes, ce qui faisait de cette section la plus
 * haute de la page pour une information que la plupart des familles ne
 * lisent qu'en diagonale. L'en-tête de chaque équipe (icône, nom, effectif,
 * phrase de résumé) reste visible : c'est lui qui renseigne au premier
 * regard, le détail par métier s'ouvre à la demande. Côte à côte à partir de
 * `lg`, empilés en dessous.
 *
 * Palette inversée de ce projet : `accent-solid` est le vert du logo,
 * `primary` l'orange (voir globals.css).
 */

const GROUPES = [
  {
    cle: "soin" as const,
    titre: "L'équipe de soin",
    description: "Suivi médical, prescriptions et gestes du quotidien.",
    icone: "soin-infirmier" as const,
  },
  {
    cle: "quotidien" as const,
    titre: "L'équipe du quotidien",
    description: "Repas, entretien des locaux et vie sociale du séjour.",
    icone: "activite" as const,
  },
]

export async function EquipeCompetences() {
  const doc = await getPage("pageEquipe")
  const edites = doc?.competencesListe as { titre?: string; texte?: string }[] | undefined
  /* Métier (titre) et rôle (texte) édités dans le Studio, groupe et icône
     repris du code, position par position. */
  const competences =
    Array.isArray(edites) && edites.length > 0
      ? edites.map((item, i) => {
          const base = competencesDefaut[Math.min(i, competencesDefaut.length - 1)]
          return {
            ...base,
            metier: item.titre?.trim() || base.metier,
            role: item.texte?.trim() || base.role,
          }
        })
      : competencesDefaut
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:items-start lg:gap-6">
      {GROUPES.map((groupe, groupeIndex) => {
        const membres = competences.filter((c) => c.groupe === groupe.cle)

        return (
          <Reveal key={groupe.cle} delay={groupeIndex * 70}>
            <Accordion>
              <AccordionItem
                value={groupe.cle}
                className="border-2 border-accent-solid/40 bg-white px-0 hover:border-accent-solid aria-expanded:border-accent-solid aria-expanded:bg-white aria-expanded:before:bg-accent-solid"
              >
                <AccordionTrigger className="px-5 py-5 text-black hover:text-black sm:px-6 **:data-[slot=accordion-trigger-icon]:border-accent-solid **:data-[slot=accordion-trigger-icon]:text-accent-solid group-aria-expanded/accordion-item:**:data-[slot=accordion-trigger-icon]:bg-accent-solid group-aria-expanded/accordion-item:**:data-[slot=accordion-trigger-icon]:text-white">
                  <span className="flex min-w-0 items-center gap-4">
                    <span
                      aria-hidden
                      className="flex size-12 shrink-0 items-center justify-center rounded-md bg-accent-solid text-white"
                    >
                      <Icon name={groupe.icone} className="size-6" />
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5 text-left">
                      <span className="font-sans text-lg leading-snug font-semibold">
                        {groupe.titre}
                        <span className="nums ml-2 text-base font-medium text-cream-800">
                          {membres.length} métiers
                        </span>
                      </span>
                      <span className="text-sm font-normal text-cream-800">
                        {groupe.description}
                      </span>
                    </span>
                  </span>
                </AccordionTrigger>

                <AccordionContent className="px-5 text-black sm:px-6">
                  <ul className="flex flex-col">
                    {membres.map((membre, index) => (
                      <li
                        key={membre.metier}
                        className={cn(
                          "flex items-start gap-4 py-4",
                          index > 0 && "border-t border-line"
                        )}
                      >
                        <Icon
                          name={membre.icone}
                          aria-hidden
                          className="mt-0.5 size-6 shrink-0 text-primary"
                        />
                        <div className="flex flex-col gap-0.5">
                          <h4 className="font-sans text-base font-semibold text-black">
                            {membre.metier}
                          </h4>
                          <p className="text-sm text-cream-800">{membre.role}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Reveal>
        )
      })}
    </div>
  )
}
