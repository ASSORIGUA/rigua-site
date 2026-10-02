"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

import { Icon } from "@/components/icon"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  actionPrincipale,
  navigation,
  site,
  telephoneAppel,
} from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * En-tête du site.
 *
 * Pas de menu déroulant, volontairement. Les quatre services vivent en
 * sections ancrées d'une seule page « Nos services » (voir
 * app/nos-services/page.tsx) : un sous-menu qui reproduirait ces quatre
 * ancres au clavier ou au survol ajouterait une interaction à découvrir pour
 * une liste déjà visible dès l'arrivée sur la page. Le menu mobile traite
 * donc « Nos services » comme n'importe quelle autre entrée de premier
 * niveau, un simple lien.
 *
 * La bascule vers le menu compact se fait à 1280px et non à 1024px : sept
 * entrées, un numéro de téléphone et un bouton d'action ne tiennent pas dans
 * 960px de contenu sans réduire le texte sous 16px, ce que le design system
 * interdit.
 */

function LienNavigation({
  href,
  children,
  actif,
}: {
  href: string
  children: React.ReactNode
  actif: boolean
}) {
  return (
    <Link
      href={href}
      aria-current={actif ? "page" : undefined}
      className={cn(
        "relative flex h-11 shrink-0 items-center rounded-md border-2 px-2.5 text-base font-medium whitespace-nowrap transition-colors",
        actif
          ? "border-primary text-foreground"
          : "border-transparent text-muted-foreground hover:border-primary hover:text-foreground"
      )}
    >
      {children}
    </Link>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOuvert, setMenuOuvert] = React.useState(false)
  const tel = telephoneAppel()

  const estActif = React.useCallback(
    (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href),
    [pathname]
  )

  return (
    <>
      {/* Bandeau urgence. Non collant : il informe, il ne poursuit pas le
          visiteur. Le brief §14 demande un accès rapide aux demandes urgentes,
          et §6.4 interdit toute promesse d'accueil immédiat, d'où la
          formulation. Caché sous 640px : sur mobile, il pousserait le hero hors
          du premier écran, et le lien « Besoin d'une solution urgente ? » du
          hero assure déjà l'accès rapide exigé par le brief. */}
      <div data-surface="deep" className="hidden bg-background sm:block">
        <div className="container-site flex flex-wrap items-center justify-between gap-x-6 py-0.5">
          <p className="text-base text-muted-foreground">
            Situation urgente concernant une personne âgée ou dépendante ?
          </p>
          {/* min-h-11 : mesuré à 24px de haut au premier audit, sous le
              plancher de 44px que s'impose le design system. */}
          <Link
            href="/nos-services#hebergement-urgence"
            className="flex min-h-11 items-center gap-2 text-base font-semibold text-accent-ink underline decoration-2 underline-offset-4 hover:decoration-current"
          >
            <Icon name="service-urgence" className="size-5" aria-hidden />
            Ce qu&apos;il faut faire
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-background">
        <div className="container-site flex items-center gap-4 py-3 xl:gap-10">
          {/* Logo et nom. Le lien porte le nom en texte : un logo seul comme
              retour à l'accueil n'est pas évident pour tout le monde. */}
          {/* Deux régimes, et il a fallu les deux mesures pour les trouver.
              À partir de 1280px : `shrink-0`, sinon la navigation comprime ce
              bloc et compte tenu de la largeur du logo, le pousse hors cadre.
              En dessous : `min-w-0` obligatoire, sinon ce bloc pousse le bouton
              de menu hors écran à 375px. */}
          <Link
            href="/"
            className="flex min-h-11 min-w-0 items-center gap-2.5 rounded-md xl:shrink-0"
            aria-label={`${site.nom}, retour à l'accueil`}
          >
            <Logo variant="brand" className="h-11.25 w-auto shrink-0 sm:h-12.5" />
            <span className="font-heading text-lg leading-tight font-bold text-accent-action sm:text-xl">
              {site.nom}
            </span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navigation.map((lien) => (
                <li key={lien.href}>
                  <LienNavigation href={lien.href} actif={estActif(lien.href)}>
                    {lien.libelleNav ?? lien.libelle}
                  </LienNavigation>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <Button
              className="hidden sm:inline-flex"
              render={<Link href={actionPrincipale.href} />}
            >
              {actionPrincipale.libelle}
            </Button>

            <Sheet open={menuOuvert} onOpenChange={setMenuOuvert}>
              <SheetTrigger
                render={
                  <Button variant="outline" size="icon" className="xl:hidden" />
                }
              >
                <Icon name="menu" label="Ouvrir le menu" />
              </SheetTrigger>

              <SheetContent side="right" className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2.5 font-heading text-lg font-medium text-foreground">
                    <Logo variant="brand" className="h-9 w-auto shrink-0" />
                    <span className="text-accent-action">{site.nom}</span>
                  </SheetTitle>
                </SheetHeader>

                <nav aria-label="Navigation du site" className="px-6 pb-6">
                  <ul className="flex flex-col divide-y divide-line">
                    {navigation.map((lien) => (
                      <li key={lien.href} className="py-1">
                        <Link
                          href={lien.href}
                          onClick={() => setMenuOuvert(false)}
                          aria-current={
                            estActif(lien.href) ? "page" : undefined
                          }
                          className={cn(
                            "flex min-h-11 items-center gap-3 py-2.5 text-lg",
                            estActif(lien.href)
                              ? "font-semibold text-foreground"
                              : "text-foreground"
                          )}
                        >
                          {lien.icone ? (
                            <Icon
                              name={lien.icone}
                              aria-hidden
                              className="size-6 shrink-0 text-accent-ink"
                            />
                          ) : null}
                          {lien.libelle}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-col gap-3">
                    <Button
                      size="lg"
                      render={<Link href={actionPrincipale.href} />}
                      onClick={() => setMenuOuvert(false)}
                    >
                      <Icon name="agenda" aria-hidden />
                      {actionPrincipale.libelle}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      render={<Link href={tel.href} />}
                      onClick={() => setMenuOuvert(false)}
                      aria-label={tel.libelleAccessible}
                    >
                      <Icon name="telephone-appel" aria-hidden />
                      Appelez-nous
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}
