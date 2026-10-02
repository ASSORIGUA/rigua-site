import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Carte — Présence & Autonomie
 *
 * Attention à l'usage : les cartes sont INTERDITES pour présenter les quatre
 * services et les avantages (règle #2, une grille de cartes est la signature
 * n°1 d'un site généré). Les services passent en rangées alternées
 * texte / photo, les publics en liste éditoriale, le parcours en timeline.
 *
 * La carte reste légitime pour : le conteneur du formulaire de demande, le
 * bloc coordonnées et urgence, un élément d'actualité dans le carousel.
 *
 * Un seul style de carte sur tout le site, celui-ci : surface blanche, filet
 * crème, aucune ombre au repos. Au survol d'une carte cliquable, le filet
 * se fonce et une ombre très douce apparaît. Aucun déplacement : sur un site
 * dont le public est âgé, une carte qui bouge sous le curseur désoriente.
 */
function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl border border-line bg-card py-(--card-spacing) font-sans text-base text-card-foreground",
        "transition-[border-color,box-shadow] duration-260 ease-brand",
        "[--card-spacing:--spacing(6)] data-[size=sm]:[--card-spacing:--spacing(4)]",
        "has-data-[slot=card-footer]:pb-0 data-[size=sm]:has-data-[slot=card-footer]:pb-0",
        "has-[>img:first-child]:pt-0",
        "*:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        "[&:is(a,button)]:hover:border-primary/45 [&:is(a,button)]:hover:shadow-raised",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-2 rounded-t-xl px-(--card-spacing)",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
        "[.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

/** Titre de carte. 22-26px en Newsreader : au-dessus du plancher de 24px
 *  sous lequel un serif de lecture n'a plus d'intérêt (règle #8).
 *  En taille `sm`, la carte repasse en sans-serif pour la même raison. */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-2xl leading-tight font-medium text-card-foreground",
        "group-data-[size=sm]/card:font-sans group-data-[size=sm]/card:text-lg group-data-[size=sm]/card:font-semibold",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-base leading-relaxed text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-3 rounded-b-xl border-t border-line bg-muted p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
