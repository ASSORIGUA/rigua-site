"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"

import { Icon } from "@/components/icon"
import { cn } from "@/lib/utils"

/**
 * Liste déroulante — Présence & Autonomie
 *
 * Utilisée pour le service recherché, la tranche d'âge, le niveau GIR.
 *
 * Écarts par rapport au select shadcn d'origine :
 *  - déclencheur en pleine largeur et 44px de haut au lieu de `w-fit` / 32px :
 *    dans un formulaire, un select qui s'adapte à son contenu casse
 *    l'alignement de la colonne de champs ;
 *  - options à 44px de haut minimum, texte 16px : sur mobile, une option de
 *    28px est presque impossible à viser ;
 *  - surlignage d'option en crème plutôt qu'en orange : l'orange est la couleur
 *    de signal du site, l'user en surbrillance de liste la banaliserait.
 */
const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1.5", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex min-w-0 flex-1 text-left", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-md border-2 border-line-strong bg-white py-2 pr-3 pl-4",
        "font-sans text-base text-foreground",
        "transition-[border-color,box-shadow] duration-150 ease-out outline-none select-none",
        "data-[size=default]:min-h-12 data-[size=sm]:min-h-10",
        "hover:border-primary",
        "focus-visible:border-accent-solid focus-visible:ring-3 focus-visible:ring-accent-solid/30",
        "disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/25",
        "data-placeholder:text-muted-foreground",
        "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
        className
      )}
      {...props}
    >
      {children}
      {/* Icon passe en enfant, pas via `render` : le `render` de Base UI clone
          l'élément et lui injecte des enfants, ce qui entre en conflit avec le
          SVG injecté par <Icon>. Voir le commentaire de components/icon.tsx. */}
      <SelectPrimitive.Icon className="pointer-events-none flex shrink-0 text-accent-ink transition-transform duration-150 ease-out group-aria-expanded:-rotate-180">
        <Icon name="chevron-down" className="size-5" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            "relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-44 origin-(--transform-origin)",
            "overflow-x-hidden overflow-y-auto rounded-md border border-line bg-popover text-popover-foreground shadow-overlay",
            "duration-100 data-[align-trigger=true]:animate-none",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-97",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-97",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        "px-3 pt-2 pb-1 font-sans text-2xs font-semibold tracking-widest uppercase text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex min-h-11 w-full cursor-pointer items-center gap-2 rounded-sm py-2.5 pr-10 pl-3",
        "font-sans text-base outline-hidden select-none",
        "focus:bg-secondary focus:text-secondary-foreground",
        "data-disabled:pointer-events-none data-disabled:opacity-55",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
        "*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 items-start gap-2 [&>svg]:mt-0.5">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-3 flex size-5 items-center justify-center text-accent-ink" />
        }
      >
        <Icon name="check" className="pointer-events-none size-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1.5 h-px bg-line", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1.5 text-muted-foreground",
        className
      )}
      {...props}
    >
      <Icon name="chevron-up" className="size-4" />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1.5 text-muted-foreground",
        className
      )}
      {...props}
    >
      <Icon name="chevron-down" className="size-4" />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
