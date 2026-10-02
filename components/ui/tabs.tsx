"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Onglets — Présence & Autonomie
 *
 * Écart notable : la variante par défaut est `line` (onglet souligné), pas
 * `segmented`. Le registre du site est éditorial et le filet orange qui marque
 * l'onglet actif est le même langage que le reste des interactions. Le
 * conteneur segmenté gris de l'original ressemble à un contrôle d'application,
 * pas à une navigation de contenu.
 *
 * Le reste : onglets 44px de haut et texte 16px au lieu de 32px / 14px, et
 * un indicateur orange au lieu d'un trait gris foncé.
 */
function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn("group/tabs flex gap-6 data-horizontal:flex-col", className)}
      {...props}
    />
  )
}

/**
 * Les deux variantes passent à la ligne (`flex-wrap`) au lieu de rester sur
 * une seule rangée. Constaté à 375px : trois onglets en `inline-flex` sans
 * retour à la ligne débordaient de 55px et faisaient défiler toute la page.
 * Le retour à la ligne est préférable à un défilement horizontal masqué :
 * un visiteur ne devine pas qu'une rangée d'onglets peut se faire glisser.
 * D'où aussi `h-auto` plutôt qu'une hauteur fixe, et `min-w-0`.
 */
const tabsListVariants = cva(
  [
    "group/tabs-list flex min-w-0 flex-wrap items-center text-muted-foreground",
    "group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col group-data-vertical/tabs:items-stretch",
  ],
  {
    variants: {
      variant: {
        /* Onglets soulignés, alignés à gauche, posés sur un filet. */
        line: "w-full justify-start gap-x-1 rounded-none border-b border-line group-data-vertical/tabs:border-b-0 group-data-vertical/tabs:border-r",
        /* Contrôle segmenté, réservé aux bascules courtes (2 ou 3 options). */
        segmented:
          "w-fit max-w-full justify-center gap-1 rounded-md border border-line bg-muted p-1",
      },
    },
    defaultVariants: {
      variant: "line",
    },
  }
)

function TabsList({
  className,
  variant = "line",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-transparent px-4 py-2",
        "font-sans text-base font-semibold whitespace-nowrap text-muted-foreground",
        "transition-colors duration-150 ease-out",
        "group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start",
        "hover:text-foreground",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:opacity-55 aria-disabled:pointer-events-none aria-disabled:opacity-55",
        "data-active:text-foreground",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
        /* Variante segmentée : l'onglet actif prend une surface blanche. */
        "group-data-[variant=segmented]/tabs-list:flex-1 group-data-[variant=segmented]/tabs-list:data-active:bg-surface group-data-[variant=segmented]/tabs-list:data-active:shadow-subtle",
        /* Variante soulignée : filet orange sous l'onglet actif. */
        "after:absolute after:bg-accent after:opacity-0 after:transition-opacity after:duration-150",
        "group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:-bottom-px group-data-horizontal/tabs:after:h-0.75",
        "group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-px group-data-vertical/tabs:after:w-0.75",
        "group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-base outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
