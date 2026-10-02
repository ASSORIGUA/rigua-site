import Link from "next/link"

import { Eyebrow } from "@/components/eyebrow"
import { Icon } from "@/components/icon"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { navigation } from "@/lib/site"

/**
 * Page 404.
 *
 * Une page introuvable est un moment de découragement, et le public de ce site
 * abandonne vite. Elle propose donc les vraies portes de sortie plutôt qu'un
 * message d'erreur et un lien vers l'accueil.
 */
export const metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <Section>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5">
          <Eyebrow icone="error">Erreur 404</Eyebrow>
          <h1 className="measure">Cette page n&apos;existe pas ou plus</h1>
          <p className="measure text-lg text-muted-foreground">
            Le lien est peut-être ancien, ou l&apos;adresse comporte une erreur de
            frappe. Voici les pages les plus consultées.
          </p>
        </div>

        <nav aria-label="Pages du site">
          <ul className="flex flex-col">
            {navigation
              .filter((lien) => lien.href !== "/")
              .map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    className="rule-grow group/lien -mx-4 flex min-h-16 items-center justify-between gap-6 border-t border-line px-4 py-4"
                  >
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="font-sans text-lg font-semibold">
                        {lien.libelle}
                      </span>
                      {lien.resume ? (
                        <span className="text-base text-muted-foreground">
                          {lien.resume}
                        </span>
                      ) : null}
                    </span>
                    <Icon
                      name="arrow-right"
                      aria-hidden
                      className="size-6 shrink-0 text-primary transition-transform duration-200 ease-brand group-hover/lien:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="flex flex-wrap gap-4 border-t border-line pt-8">
          <Button render={<Link href="/" />}>
            <Icon name="arrow-left" aria-hidden />
            Retour à l&apos;accueil
          </Button>
          <Button variant="outline" render={<Link href="/contact" />}>
            <Icon name="telephone-appel" aria-hidden />
            Nous joindre
          </Button>
        </div>
      </div>
    </Section>
  )
}
