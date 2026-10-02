"use client"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { Icon } from "@/components/icon"
import { cn } from "@/lib/utils"

/**
 * Accordéon « Trois choses que nous ne ferons pas » — app/tarifs/page.tsx.
 *
 * Composant dédié plutôt qu'une variante de components/ui/accordion.tsx :
 * ce bloc vit sur `surface="deep"` et devait rester visuellement distinct
 * de l'accordéon FAQ (cadre plus/minus carré) pour ne pas laisser croire aux
 * deux mêmes questions/réponses. Choisi après comparatif avec l'utilisateur
 * (trois styles présentés) : « carte détachée » — chaque engagement est une
 * carte crème posée sur le fond marine, qui se soulève légèrement à
 * l'ouverture, plutôt qu'une ligne pleine largeur ou un simple filet.
 *
 * Toujours Base UI (@base-ui/react/accordion), même primitive que l'accordéon
 * FAQ : seul l'habillage change, pas le comportement (clavier, aria-expanded,
 * animation de hauteur via --accordion-panel-height).
 */
function EngagementsAccordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="engagements-accordion"
      className={cn("flex w-full flex-col gap-3", className)}
      {...props}
    />
  )
}

function EngagementsAccordionItem({
  className,
  ...props
}: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="engagements-accordion-item"
      className={cn(
        "group/engagement rounded-md bg-cream-100 shadow-subtle",
        "transition-[transform,box-shadow] duration-200 ease-out",
        "aria-expanded:-translate-y-0.5 aria-expanded:shadow-overlay aria-expanded:duration-260 aria-expanded:ease-brand",
        className
      )}
      {...props}
    />
  )
}

function EngagementsAccordionTrigger({
  className,
  children,
  numero,
  ...props
}: AccordionPrimitive.Trigger.Props & {
  /** Rang affiché dans la puce carrée, 1 à 3. */
  numero: number
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="engagements-accordion-trigger"
        className={cn(
          "group/trigger flex min-h-11 flex-1 items-center gap-3.5 rounded-md px-4 py-4 text-left sm:gap-4 sm:px-5",
          "font-sans text-lg leading-snug font-semibold text-green-900",
          "transition-[color,transform] duration-150 ease-out outline-none active:scale-[0.99]",
          "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-green-900",
          className
        )}
        {...props}
      >
        <span
          aria-hidden
          // bg-accent-solid + accent-solid-foreground (blanc, --pa-paper) :
          // même paire que components/eyebrow.tsx et le tampon info de
          // tarifs-info-note.tsx pour un aplat émeraude plein portant du
          // texte blanc. --accent seul ne porte jamais de texte blanc (voir
          // globals.css) : accent-solid est le vert saturé prévu pour ça.
          className="nums flex size-8 shrink-0 items-center justify-center rounded-md bg-accent-solid text-base font-bold text-accent-solid-foreground"
        >
          {numero}
        </span>
        <span className="flex-1">{children}</span>
        <Icon
          name="chevron-down"
          aria-hidden
          className="size-5 shrink-0 text-emerald-800 transition-transform duration-200 ease-out group-aria-expanded/trigger:-rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function EngagementsAccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="engagements-accordion-content"
      className={cn(
        // Pas de `measure` (68ch) : chaque panneau ne porte qu'une phrase
        // courte (voir pointsDeVigilance dans lib/content/tarifs.ts), qui se
        // scinde déjà en 1-2 lignes par elle-même. Plafonner la largeur ne
        // faisait que laisser une bande vide à droite de la carte, qui va
        // pourtant jusqu'à son bord pour le titre juste au-dessus.
        "h-(--accordion-panel-height) overflow-hidden pl-[calc(2rem+0.875rem+1.25rem)] pr-5 text-base leading-relaxed text-green-800 sm:pl-[calc(2rem+1rem+1.25rem)]",
        "transition-[height] duration-200 ease-out",
        "data-ending-style:h-0 data-starting-style:h-0",
        className
      )}
      {...props}
    >
      <div className="pb-5">{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export {
  EngagementsAccordion,
  EngagementsAccordionItem,
  EngagementsAccordionTrigger,
  EngagementsAccordionContent,
}
