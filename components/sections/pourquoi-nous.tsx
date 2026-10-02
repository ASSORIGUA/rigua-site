import Link from "next/link"

import { Icon, type IconName } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { getPage, t } from "@/lib/cms"

/** Les trois repères vérifiés sur l'association, développés en rangées. */
const REPERES: { texte: string; detail: string; icone: IconName }[] = [
  {
    texte: "Association loi 1901",
    detail:
      "Pas d'actionnaire à rémunérer : ce que nous facturons sert l'accompagnement.",
    icone: "legal",
  },
  {
    texte: "Fondée par une infirmière libérale",
    detail:
      "Les besoins sont observés avec un regard soignant, et traités avec des moyens humains et sociaux.",
    icone: "sante",
  },
  {
    texte: "Accompagnement de GIR 1 à GIR 4",
    detail:
      "Un niveau de dépendance élevé n'est pas un motif d'exclusion, sous réserve de l'évaluation de chaque situation.",
    icone: "accessibilite",
  },
]

/**
 * Trois faits vérifiables sur l'association, sortis du hero pour ne pas
 * l'alourdir.
 *
 * Sous `sm`, les rangées (icône + titre + détail toujours visible) prennent
 * trop de hauteur d'écran l'une sous l'autre : un accordéon condense les
 * trois faits à leur seul titre, le détail se dépliant au clic. À partir de
 * `sm:`, l'espace horizontal absorbe mieux les rangées complètes, donc
 * l'accordéon redevient la liste habituelle. Les deux rendus partagent la
 * même donnée `REPERES`, jamais de grille de cartes (règle du design
 * system) dans un cas comme dans l'autre.
 */
export async function PourquoiNous() {
  const doc = await getPage("pageAccueil")
  /* Les textes édités dans le Studio remplacent ceux du code, position par
     position ; l'icône reste celle du code. */
  const edites = doc?.pourquoiReperes as { titre?: string; texte?: string }[] | undefined
  const reperes =
    Array.isArray(edites) && edites.length > 0
      ? edites.map((item, i) => {
          const base = REPERES[Math.min(i, REPERES.length - 1)]
          return {
            texte: item.titre?.trim() || base.texte,
            detail: item.texte?.trim() || base.detail,
            icone: base.icone,
          }
        })
      : REPERES
  return (
    <>
      {/* La vitre dépolie (backdrop-blur) est posée sur chaque item, en dehors
          du <Reveal> : le flou reste visible dès le premier rendu, seul le
          contenu (icône + texte) apparaît avec l'animation. `Reveal` ne peut
          pas envelopper `AccordionTrigger`/`AccordionContent` eux-mêmes (Base
          UI attend Header/Trigger/Panel en enfants directs de Item), donc
          l'animation porte sur le contenu interne du trigger, et sur le
          contenu du panneau. Même logique que la version `sm:` ci-dessous, où
          le flou vit sur le <ul> et non sur les <Reveal as="li"> qu'il
          contient. */}
      <Accordion className="sm:hidden">
        {reperes.map((repere, index) => (
          <AccordionItem
            key={repere.texte}
            value={repere.texte}
            className="border-paper/70 bg-black/40 backdrop-blur-sm aria-expanded:border-paper aria-expanded:bg-black/55"
          >
            <AccordionTrigger className="text-paper hover:text-paper">
              <Reveal delay={index * 70} className="flex items-center gap-4">
                <Icon
                  name={repere.icone}
                  aria-hidden
                  className="size-7 shrink-0 text-accent-ink"
                />
                <span className="nums">{repere.texte}</span>
              </Reveal>
            </AccordionTrigger>
            <AccordionContent className="text-paper">
              {repere.detail}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <ul className="hidden rounded-lg border border-paper/70 bg-black/40 px-6 backdrop-blur-sm sm:flex sm:flex-col">
        {reperes.map((repere, index) => (
          <Reveal
            as="li"
            key={repere.texte}
            delay={index * 70}
            className="border-paper/70 not-first:border-t"
          >
            <div className="flex gap-5 py-7">
              <Icon
                name={repere.icone}
                aria-hidden
                className="mt-0.5 size-8 shrink-0 text-accent-ink"
              />
              <div className="flex min-w-0 flex-col gap-1.5">
                <h3 className="nums text-lg leading-snug font-semibold text-paper">
                  {repere.texte}
                </h3>
                <p className="text-base text-paper">
                  {repere.detail}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-10 flex justify-center">
        <Button render={<Link href="/l-association" />}>
          {t(doc, "pourquoiBouton", "Découvrir l'origine de l'association")}
          <Icon name="arrow-right" aria-hidden />
        </Button>
      </Reveal>
    </>
  )
}
