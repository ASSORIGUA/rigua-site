import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import { Icon } from "@/components/icon"
import { cn } from "@/lib/utils"

/**
 * Fil d'Ariane — Présence & Autonomie
 *
 * Le site compte quatorze pages, dont quatre pages de service imbriquées.
 * Le fil d'Ariane est là pour que le visiteur sache toujours où il est et
 * puisse remonter d'un niveau sans passer par le menu.
 *
 * Écarts : texte 15px au lieu de 14px, séparateur orange, et lien souligné
 * au survol plutôt qu'un simple changement de teinte.
 */
function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="Fil d'Ariane"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-2 font-sans text-sm wrap-break-word text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        /* min-h-11 : un fil d'Ariane fait 21px de haut par défaut. Le plancher
           de 44px du design system s'applique aussi à lui, d'autant que c'est
           souvent la seule remontée disponible pour un visiteur arrivé depuis
           une recherche Google sur une page profonde. */
        className: cn(
          "inline-flex min-h-11 items-center rounded-xs underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-150 ease-out",
          "hover:text-primary hover:decoration-accent",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "breadcrumb-link",
    },
  })
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("text-accent-ink [&>svg]:size-4", className)}
      {...props}
    >
      {children ?? <Icon name="chevron-right" />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-5 items-center justify-center", className)}
      {...props}
    >
      <Icon name="more" className="size-4" />
      <span className="sr-only">Pages intermédiaires</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
