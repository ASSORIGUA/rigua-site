"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Tableau — Présence & Autonomie
 *
 * C'est le composant de la page Tarifs. Le brief est explicite : présenter
 * les modes de tarification sans jamais faire passer une estimation pour une
 * information confirmée. Un tableau lisible, avec une légende, est le format
 * honnête pour ça, et il remplace la grille de cartes de prix.
 *
 * Écarts par rapport au tableau shadcn d'origine :
 *  - texte 16px, cellules à 16px de padding au lieu de 8px ;
 *  - `whitespace-nowrap` retiré des cellules : un libellé de prestation fait
 *    souvent une phrase, l'empêcher de passer à la ligne provoquait un
 *    défilement horizontal permanent ;
 *  - le conteneur porte le filet et le rayon, et c'est lui qui défile
 *    horizontalement ;
 *  - en-tête en capitales interlettrées sur fond crème ;
 *  - filets en `border-line-strong`, pas `border-line` : sur les tableaux
 *    utilisés en pleine largeur (page Tarifs, pages de service), le filet
 *    clair par défaut se voyait à peine et le tableau se lisait comme un
 *    bloc de texte non structuré plutôt que comme une grille de lignes.
 *

 * ⚠️ Contrainte de mise en page. `overflow-x: auto` ne suffit pas à empêcher
 * un tableau large d'élargir ses ancêtres : pour un bloc en flux normal, le
 * navigateur fait quand même remonter la largeur `min-content` du tableau.
 * Vérifié à 375px sur ce projet, une colonne de grille de 335px se résolvait
 * à 410px et faisait déborder toute la page.
 * Le `min-w-0` ci-dessous règle le cas où le conteneur est lui-même un enfant
 * de flex ou de grid. Sinon, TOUTE cellule de grid ou item de flex qui
 * contient un tableau doit porter `min-w-0`.
 *
 * Indice de défilement (`sm:hidden` ci-dessous) : sous 640px, le tableau
 * déborde presque toujours de son conteneur (vérifié à 375px : 411px de
 * contenu pour 318px de largeur visible). `overflow-x: auto` permet de
 * swiper, mais rien ne le signale visuellement — le bord droit du tableau
 * est simplement coupé net à la largeur du viewport, ce qui peut se lire
 * comme un tableau cassé plutôt que comme un tableau à faire défiler. Le
 * fondu est purement décoratif (`pointer-events-none`) : il ne gêne jamais
 * le geste de défilement en dessous. À partir de `sm`, les colonnes tiennent
 * sans défilement horizontal sur ce contenu, l'indice disparaît.
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full min-w-0 overflow-x-auto rounded-xl border border-line-strong"
    >
      <table
        data-slot="table"
        className={cn(
          "w-full caption-bottom border-collapse font-sans text-base",
          className
        )}
        {...props}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-background to-transparent sm:hidden"
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("bg-surface-warm [&_tr]:border-b [&_tr]:border-line-strong", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-line-strong bg-surface-warm font-semibold [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-line-strong transition-colors duration-150 ease-out",
        "hover:bg-surface-warm has-aria-expanded:bg-surface-warm data-[state=selected]:bg-secondary",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      scope="col"
      className={cn(
        "h-12 px-4 text-left align-middle text-2xs font-semibold tracking-widest uppercase text-muted-foreground",
        "has-[[role=checkbox]]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-4 py-4 align-top leading-relaxed has-[[role=checkbox]]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      /* Alignée sur le padding des cellules (16px) et refermée en bas, sinon
         la légende flotte dans le cadre du conteneur. */
      className={cn(
        "px-4 pt-4 pb-5 text-left text-sm leading-relaxed text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
