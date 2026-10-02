"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

import { Icon } from "@/components/icon"

/**
 * Notifications — Présence & Autonomie
 *
 * Sert d'accusé de réception aux formulaires : demande envoyée, rappel
 * demandé, message transmis. Ce sont des moments où la famille a besoin
 * d'être rassurée, donc le message doit être lisible et rester affiché
 * assez longtemps pour être lu sans se presser.
 *
 * Écarts par rapport au composant shadcn d'origine :
 *  - `theme` figé sur `light`. L'original lit `useTheme()` de next-themes ;
 *    sans ThemeProvider il retombe sur `system`, ce qui afficherait des
 *    notifications sombres à un visiteur dont l'OS est en mode sombre, sur
 *    un site entièrement clair ;
 *  - durée portée à 7 secondes, texte 16px ;
 *  - icônes Solar, position basse à droite pour ne pas masquer l'en-tête ;
 *  - `mobileOffset` relevé : le FAB de rendez-vous (components/fab-appel.tsx) est
 *    fixé au même coin sous `xl`, 56px de haut + 16px de marge. Sans cet
 *    écart, la première notification s'affiche exactement dessus.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="bottom-right"
      duration={7000}
      mobileOffset={{ bottom: "88px", right: "16px" }}
      className="toaster group"
      icons={{
        success: (
          <Icon name="success" className="size-5 text-primary" />
        ),
        info: <Icon name="info" className="size-5 text-primary" />,
        warning: (
          <Icon name="warning" className="size-5 text-accent-ink" />
        ),
        error: <Icon name="error" className="size-5 text-urgent" />,
        loading: (
          <Icon name="spinner" className="size-5 animate-spin text-primary" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--line)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "cn-toast font-sans! text-base! shadow-overlay! border! border-line!",
          title: "font-semibold!",
          description: "text-muted-foreground! text-sm!",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
