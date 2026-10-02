import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { Icon } from "@/components/icon"
import { cn } from "@/lib/utils"

/**
 * Accordéon — Présence & Autonomie
 *
 * C'est le composant de la FAQ, et la FAQ est une pièce centrale du site :
 * le brief liste douze questions qui reviennent au téléphone. L'accordéon
 * remplace la grille de cartes interdite par la règle #2.
 *
 * Écarts par rapport à l'accordéon shadcn d'origine :
 *  - question en 18px au lieu de 14px, respiration verticale doublée ;
 *  - un indicateur plus/moins dans un cadre carré par défaut, au lieu d'un
 *    chevron qui pivote seul : même langage que l'Orienteur
 *    (services-orienteur.tsx), pour que les deux accordéons du site se
 *    répondent visuellement. `AccordionTrigger` accepte `icon="chevron"`
 *    pour revenir à un simple chevron sans cadre, réservé aux accordéons
 *    posés dans une liste de navigation (menu mobile) : là, le cadre casse
 *    l'alignement avec les autres liens de la liste, qui n'en ont pas ;
 *  - l'item ouvert se détache par un cadre et un fond, pas seulement par le
 *    texte qui apparaît en dessous : sur une longue liste de questions,
 *    l'item actif doit se repérer sans lire chaque titre. Pas de barre
 *    latérale colorée sur le panneau : c'est le pattern IA générique que le
 *    design system bannit explicitement pour ce genre de bloc ;
 *  - `hover:underline` remplacé par un changement de couleur : un souligné
 *    au survol sur un titre de question fait croire à un lien sortant.
 */
/**
 * `hiddenUntilFound` est posé par défaut sur toutes les instances : sans lui,
 * Base UI démonte le contenu des panneaux fermés, qui disparaît alors du HTML
 * rendu côté serveur. Constaté sur /equipe, où les neuf métiers (« Médecin
 * référent », « Kinésithérapeutes »...) n'étaient plus indexables ni
 * trouvables par la recherche du navigateur depuis leur passage en accordéon.
 * Avec cette option, le panneau reste dans le document en `hidden="until-found"`
 * et le navigateur l'ouvre automatiquement quand la recherche y tombe.
 */
function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      hiddenUntilFound
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "group/accordion-item relative overflow-hidden rounded-md border border-line-strong px-1 transition-colors duration-200 ease-out",
        // État ouvert : en plus de la bordure ocre, un filet vertical ocre
        // plein sur le bord gauche et un fond plus franc. La version
        // précédente ne se distinguait que par `bg-secondary/40`, une teinte
        // si pâle que l'item ouvert se repérait surtout au texte apparu en
        // dessous : sur une liste de cinq étapes, l'état actif ne se lisait
        // pas au premier regard.
        "before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-accent before:opacity-0 before:transition-opacity before:duration-200",
        "aria-expanded:border-accent aria-expanded:bg-secondary/70 aria-expanded:before:opacity-100",
        "hover:border-accent/60",
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  icon = "plus-minus",
  ...props
}: AccordionPrimitive.Trigger.Props & {
  /** `plus-minus` (défaut) : cadre carré, pour la FAQ. `chevron` : simple
   *  chevron sans cadre, pour un accordéon posé dans une liste de nav. */
  icon?: "plus-minus" | "chevron"
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex flex-1 items-center justify-between gap-6 rounded-sm px-4 py-5 text-left",
          "font-sans text-lg leading-snug font-semibold text-foreground",
          "transition-[color,transform] duration-150 ease-out outline-none active:scale-[0.99]",
          "hover:text-primary",
          "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "aria-disabled:pointer-events-none aria-disabled:opacity-55",
          className
        )}
        {...props}
      >
        {children}
        {icon === "chevron" ? (
          <Icon
            name="chevron-down"
            data-slot="accordion-trigger-icon"
            aria-hidden
            className="size-5 shrink-0 text-accent-ink transition-transform duration-200 ease-out group-aria-expanded/accordion-trigger:-rotate-180"
          />
        ) : (
          <span
            aria-hidden
            data-slot="accordion-trigger-icon"
            // Ouvert : le médaillon se remplit en ocre plein plutôt que de
            // changer seulement de couleur de bordure. C'est le repère le plus
            // rapide à lire dans une liste d'items.
            className="flex size-9 shrink-0 items-center justify-center rounded-md border border-line-strong text-accent-ink transition-colors duration-200 ease-out group-aria-expanded/accordion-trigger:border-accent group-aria-expanded/accordion-trigger:bg-accent group-aria-expanded/accordion-trigger:text-accent-foreground"
          >
            <Icon name="plus" className="size-4 group-aria-expanded/accordion-trigger:hidden" />
            <Icon
              name="minus"
              className="hidden size-4 group-aria-expanded/accordion-trigger:block"
            />
          </span>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn(
        "h-(--accordion-panel-height) overflow-hidden px-4 text-base leading-relaxed text-muted-foreground",
        "transition-[height] duration-200 ease-out",
        "data-ending-style:h-0 data-starting-style:h-0",
        "[&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:decoration-accent [&_a]:decoration-2 [&_a]:underline-offset-4",
        "[&_a:hover]:decoration-primary",
        "[&_p:not(:last-child)]:mb-4",
        className
      )}
      {...props}
    >
      <div className="pt-0 pb-6">{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
