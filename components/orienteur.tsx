import Link from "next/link"

import { Icon } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { situations } from "@/lib/content/orienteur"
import { cn } from "@/lib/utils"

/**
 * L'ORIENTEUR, le composant différenciant du site.
 *
 * Il occupe la place que les trois concurrents du secteur donnent tous à une
 * rangée de cercles d'icônes intitulée « nos prestations ». Eux entrent par le
 * catalogue. Ici on entre par la situation, formulée dans les mots du
 * visiteur, parce que c'est ainsi qu'une famille arrive : « il ne peut plus
 * rester seul la journée », pas « je cherche un accueil de jour ».
 *
 * ACCORDÉON, sur demande explicite du client.
 *
 * Une note de ce fichier défendait auparavant l'inverse : tout garder ouvert,
 * au motif que masquer les cinq réponses derrière un clic revient à parier que
 * le visiteur cliquera. L'argument reste valable dans l'absolu, mais la mise en
 * page dépliée a été jugée « trop proche d'un tableau » et trop lourde, et le
 * choix appartient au client. Deux garde-fous conservent l'essentiel de
 * l'intention d'origine :
 *  - la PREMIÈRE situation est ouverte par défaut, donc la mécanique se
 *    comprend sans avoir à cliquer ;
 *  - la phrase du visiteur, qui est la vraie porte d'entrée, reste toujours
 *    visible : c'est elle qui sert d'intitulé. Seule la réponse se replie.
 *
 * Posé sur une section à fond photographique (`surface="deep"`, voile `photo`),
 * chaque item reçoit un fond plein plutôt qu'un simple cadre : sur une image,
 * une bordure fine suffit rarement à détacher un bloc de texte.
 */
export function Orienteur({ className }: { className?: string }) {
  return (
    // Aucune situation ouverte par défaut (règle client : jamais d'accordéon
    // pré-ouvert). La phrase du visiteur reste l'intitulé toujours visible.
    <Accordion className={cn("flex flex-col gap-3", className)}>
      {situations.map((situation, index) => (
        <Reveal key={situation.id} delay={Math.min(index, 4) * 60}>
          {/* Couleurs FIXES partout dans cet item, jamais les jetons de surface.
              La section englobante est en `deep`, où le projet redéfinit
              `--primary` en blanc cassé et `--secondary` en vert foncé. Une
              première version utilisait ces jetons sur une carte blanche :
              au survol le texte passait en blanc sur blanc, et à l'ouverture
              le fond devenait vert foncé sous du texte noir. C'est ce que le
              client décrivait comme « le texte disparaît quand je
              sélectionne ». Les états `aria-expanded` et `hover` de
              l'accordéon de base sont donc surchargés un à un. */}
          <AccordionItem
            value={`situation-${situation.id}`}
            className={cn(
              "border-2 px-0",
              // La situation urgente est entièrement rouge (demande client) :
              // fond plein, pas seulement une bordure teintée. Les autres
              // restent blanches.
              situation.urgent
                ? "border-urgent bg-urgent hover:border-urgent aria-expanded:border-urgent aria-expanded:bg-urgent aria-expanded:before:bg-white"
                : "border-white/30 bg-white hover:border-white aria-expanded:border-white aria-expanded:bg-white"
            )}
          >
            <AccordionTrigger
              className={cn(
                "px-4 sm:px-5",
                situation.urgent
                  ? "text-white hover:text-white/80 **:data-[slot=accordion-trigger-icon]:border-white/60 **:data-[slot=accordion-trigger-icon]:text-white group-aria-expanded/accordion-item:**:data-[slot=accordion-trigger-icon]:border-white group-aria-expanded/accordion-item:**:data-[slot=accordion-trigger-icon]:bg-white group-aria-expanded/accordion-item:**:data-[slot=accordion-trigger-icon]:text-urgent"
                  : "text-black hover:text-emerald-800 **:data-[slot=accordion-trigger-icon]:border-emerald-700 **:data-[slot=accordion-trigger-icon]:text-emerald-800 group-aria-expanded/accordion-item:**:data-[slot=accordion-trigger-icon]:bg-emerald-700 group-aria-expanded/accordion-item:**:data-[slot=accordion-trigger-icon]:text-white"
              )}
            >
              <span className="flex min-w-0 items-center gap-4">
                <span
                  aria-hidden
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-md",
                    situation.urgent
                      ? "bg-white/20 text-white"
                      : "bg-emerald-50 text-emerald-800"
                  )}
                >
                  <Icon name={situation.icone} className="size-6" />
                </span>
                <span className="font-heading min-w-0 text-xl leading-snug font-medium sm:text-2xl">
                  {situation.phrase}
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent
              className={cn(
                "px-4 sm:px-5",
                situation.urgent ? "text-white/90" : "text-cream-800"
              )}
            >
              <div className="flex flex-col gap-3 pl-15">
                <h3
                  className={cn(
                    "font-sans text-lg leading-snug font-semibold",
                    situation.urgent ? "text-white" : "text-black"
                  )}
                >
                  {situation.reponseTitre}
                </h3>
                <p className="measure text-base">{situation.reponseTexte}</p>
                <p
                  className={cn(
                    "measure border-t pt-3 text-base",
                    situation.urgent ? "border-white/30" : "border-line"
                  )}
                >
                  <span
                    className={cn(
                      "font-semibold",
                      situation.urgent ? "text-white" : "text-black"
                    )}
                  >
                    Ensuite :{" "}
                  </span>
                  {situation.ensuite}
                </p>
                <Link
                  href={situation.action.href}
                  className={cn(
                    "inline-flex w-fit items-center gap-2 rounded-md px-4 py-2.5 text-base font-semibold transition-colors",
                    situation.urgent
                      ? "bg-white text-urgent hover:bg-white/90"
                      : "bg-emerald-700 text-white hover:bg-emerald-800"
                  )}
                >
                  {situation.action.libelle}
                  <Icon name="arrow-right" aria-hidden className="size-5" />
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Reveal>
      ))}
    </Accordion>
  )
}
