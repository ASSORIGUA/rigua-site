"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"

import { Icon } from "@/components/icon"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * Panneau latéral — Présence & Autonomie
 *
 * C'est le composant de la navigation mobile. Le brief impose une navigation
 * simple, des zones cliquables larges et un accès direct à l'appel : le
 * panneau doit donc être généreux, pas un tiroir étroit.
 *
 * Écarts par rapport au sheet shadcn d'origine :
 *  - voile à 45 % de marine au lieu de 10 % de noir ;
 *  - largeur portée à 92 % / 26rem au lieu de 75 % / 24rem ;
 *  - titre en 22-26px, bouton de fermeture 44px, croix nue `pa:close` ;
 *  - libellés en français.
 */
function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-green-950/45 transition-opacity duration-200",
        "supports-backdrop-filter:backdrop-blur-sm",
        "data-ending-style:opacity-0 data-starting-style:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding font-sans text-base text-popover-foreground shadow-overlay",
          "transition duration-260 ease-brand",
          "data-ending-style:opacity-0 data-starting-style:opacity-0",
          // `h-svh` et non `h-full` : `h-full` suit la hauteur du conteneur,
          // qui sur mobile inclut la zone masquée par la barre d'adresse, si
          // bien que le bas du menu (dernier lien, téléphone) tombait hors de
          // l'écran. `svh` correspond à la hauteur visible barre déployée.
          "data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-svh data-[side=right]:w-[92%] data-[side=right]:border-l data-[side=right]:border-line data-[side=right]:sm:max-w-md",
          "data-[side=right]:data-ending-style:translate-x-10 data-[side=right]:data-starting-style:translate-x-10",
          "data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-svh data-[side=left]:w-[92%] data-[side=left]:border-r data-[side=left]:border-line data-[side=left]:sm:max-w-md",
          "data-[side=left]:data-ending-style:-translate-x-10 data-[side=left]:data-starting-style:-translate-x-10",
          "data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:max-h-[85dvh] data-[side=bottom]:rounded-t-xl data-[side=bottom]:border-t data-[side=bottom]:border-line",
          "data-[side=bottom]:data-ending-style:translate-y-10 data-[side=bottom]:data-starting-style:translate-y-10",
          "data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:rounded-b-xl data-[side=top]:border-b data-[side=top]:border-line",
          "data-[side=top]:data-ending-style:-translate-y-10 data-[side=top]:data-starting-style:-translate-y-10",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                variant="outline"
                className="absolute top-3 right-3"
                size="icon"
              />
            }
          >
            <Icon name="close" className="size-5" />
            <span className="sr-only">Fermer le menu</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex flex-col gap-1.5 border-b border-line p-6 pr-16",
        className
      )}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "mt-auto flex flex-col gap-3 border-t border-line bg-muted p-6",
        className
      )}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-2xl leading-tight font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-base text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
