import Link from "next/link"

import { Eyebrow } from "@/components/eyebrow"
import { Icon } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { Button } from "@/components/ui/button"
import { actionPrincipale } from "@/lib/site"

/**
 * Bande d'appel à l'action, en fin de page.
 *
 * Présente sur toutes les pages sauf les pages légales. Surface vert foncé, la même
 * que le pied de page juste en dessous : les deux forment un seul bloc sombre
 * en bas de page plutôt que d'alterner une fois de trop.
 *
 * Deux portes de sortie, dans l'ordre d'engagement croissant : être rappelé,
 * prendre rendez-vous. Le brief §20 liste l'appel direct comme troisième
 * action prioritaire ; il reste disponible via le numéro affiché dans le
 * header et le pied de page, sans être répété ici.
 */
export function CtaBand({
  titre = "Parlons de votre situation",
  texte = "Un premier échange suffit souvent à savoir quelle solution correspond. Il est gratuit et il n'engage à rien.",
}: {
  titre?: string
  texte?: string
}) {
  return (
    <Section
      surface="deep"
      grain
      tight
      image={{
        srcMobile: "/img-bg/prendre-contact-bg-mobile.webp",
        srcDesktop: "/img-bg/prendre-contact-bg-desktop.webp",
      }}
    >
      <div className="flex flex-col gap-10">
        <Reveal className="flex flex-col gap-5">
          <Eyebrow icone="telephone">Prendre contact</Eyebrow>
          <h2>{titre}</h2>
          <p className="measure text-lg text-muted-foreground">{texte}</p>
        </Reveal>

        <Reveal
          delay={70}
          className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <Button size="lg" render={<Link href={actionPrincipale.href} />}>
            <Icon name="agenda" aria-hidden />
            {actionPrincipale.libelle}
          </Button>
          <Button
            variant="outline"
            size="lg"
            // Surcharge complète du variant `outline` sur cette section :
            // il pose un fond `bg-surface` et une bordure verte, tous deux
            // invisibles sur le vert foncé de `deep`. Ici, contour et texte
            // blancs sur fond transparent.
            className="border-white bg-transparent text-white hover:bg-white hover:text-green-900"
            render={<Link href="/contact" />}
          >
            <Icon name="telephone-appel" aria-hidden />
            Demander à être rappelé
          </Button>
        </Reveal>
      </div>
    </Section>
  )
}
