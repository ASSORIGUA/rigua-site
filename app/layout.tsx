import type { Metadata, Viewport } from "next";
import { Newsreader, Inclusive_Sans } from "next/font/google";

import { FabAppel } from "@/components/fab-appel";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { jsonLdAssociation, jsonLdSite } from "@/lib/jsonld";
import { site } from "@/lib/site";
import "./globals.css";

/* Titres. Serif de lecture à faible contraste, avec taille optique réelle :
   le dessin du glyphe se réajuste selon la taille affichée. */
const display = Newsreader({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

/* Corps et interface. Humaniste dessinée pour la lisibilité :
   grande hauteur d'x, ouvertures larges, formes non ambiguës. */
const body = Inclusive_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nom} | ${site.accroche} pour les personnes âgées et dépendantes`,
    template: `%s | ${site.nom}`,
  },
  description: site.description,
  applicationName: site.nom,
  icons: { icon: "/logo_rigua.svg" },
  /* Le brief §11 impose des numéros directement cliquables. */
  formatDetection: { telephone: true },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.nom,
    url: site.url,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fdfbf7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <head>
        {/* Filet de sécurité des révélations au scroll : sans JavaScript,
            l'observateur ne tourne pas et le contenu resterait à opacité 0.
            Sur un site d'information, une animation ne doit jamais pouvoir
            masquer du contenu. Voir components/reveal.tsx. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                ".reveal{opacity:1 !important;transform:none !important}",
            }}
          />
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {/* Lien d'évitement : première cible au clavier, invisible sinon. */}
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:flex focus:h-11 focus:items-center focus:rounded-md focus:bg-primary focus:px-5 focus:font-semibold focus:text-primary-foreground"
        >
          Aller au contenu principal
        </a>

        <TooltipProvider>
          <SiteHeader />
          {/* Le FAB de rendez-vous (voir fab-appel.tsx) est `fixed`, donc hors du
              flux : pas de padding réservé ici. Il se masque déjà lui-même
              dès que le hero ou le pied de page entre dans le viewport. */}
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </TooltipProvider>

        <FabAppel />
        <Toaster />
        <JsonLd data={jsonLdAssociation()} />
        <JsonLd data={jsonLdSite()} />
      </body>
    </html>
  );
}
