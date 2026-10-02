import type { Metadata } from "next"
import Link from "next/link"

import { Icon } from "@/components/icon"
import { PageHero, pageHeroImage } from "@/components/page-hero"
import { PhotoSlot } from "@/components/photo-slot"
import { Reveal } from "@/components/reveal"
import { Section, SectionHeading } from "@/components/section"
import { CtaBand } from "@/components/sections/cta-band"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { fusionListe, getPage, t } from "@/lib/cms"
import { typesActions } from "@/lib/content/actions"

export const metadata: Metadata = {
  title: "Nos actions",
  description:
    "Ateliers, sorties, temps de rencontre et nouveaux projets : ce que l'association organise au fil de l'année.",
  alternates: { canonical: "/nos-actions" },
}

export default async function NosActions() {
  const doc = await getPage("pageActions")
  const familles = fusionListe(doc?.famillesListe, typesActions)
  return (
    <>
      <PageHero
        eyebrow={t(doc, "heroEyebrow", "La vie de l'association")}
        eyebrowIcone="accueil"
        titre={t(doc, "heroTitre", "Nos actions")}
        image={pageHeroImage("nos-actions")}
        filCourant="Nos actions"
        fil={[{ href: "/", libelle: "Accueil" }]}
        lead={
          <p>
            {t(
              doc,
              "heroLead",
              "Une association se juge autant à ce qu'elle organise qu'à ce qu'elle annonce. Cette page présente les quatre familles d'actions menées au fil de l'année.",
            )}
          </p>
        }
      />

      {/* ---------- Ce que nous organisons ---------- */}
      <Section>
        <SectionHeading
          eyebrow={t(doc, "famillesEyebrow", "Au fil de l'année")}
          eyebrowIcone="agenda"
          titre={t(doc, "famillesTitre", "Quatre familles d'actions")}
          lead={t(
            doc,
            "famillesLead",
            "Elles se répètent, et c'est voulu : la régularité transforme une activité en repère dans la semaine, ce qui est précisément son intérêt.",
          )}
        />

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start lg:gap-16">
          {/* Mobile/tablette : accordéon, une seule famille dépliée à la fois.
              Desktop (lg:) : liste toujours dépliée, cf. règle "pas de grille
              de cartes" — ici un vrai accordéon plutôt qu'une simple rangée
              alternée, pour limiter la hauteur de page sur petit écran. */}
          <Accordion className="lg:hidden">
            {familles.map((type, index) => (
              <Reveal key={type.titre} delay={Math.min(index, 3) * 70}>
                <AccordionItem value={type.titre}>
                  <AccordionTrigger>
                    <span className="flex items-center gap-4">
                      <Icon
                        name={type.icone}
                        aria-hidden
                        className="size-7 shrink-0 text-primary"
                      />
                      {type.titre}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>{type.texte}</AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>

          <dl className="hidden lg:flex lg:flex-col">
            {familles.map((type, index) => (
              <Reveal key={type.titre} delay={Math.min(index, 3) * 70}>
                <div className="flex gap-5 border-t border-line py-7">
                  <Icon
                    name={type.icone}
                    aria-hidden
                    className="mt-0.5 size-9 shrink-0 text-primary"
                  />
                  <div className="flex min-w-0 flex-col gap-2">
                    <dt className="font-sans text-lg leading-snug font-semibold">
                      {type.titre}
                    </dt>
                    <dd className="text-base text-muted-foreground">
                      {type.texte}
                    </dd>
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={140}>
            <PhotoSlot
              src="/images/actions-apercu.webp"
              alt="Un atelier en cours autour d'une grande table en bois : plusieurs personnes assises, l'animatrice debout parmi elles, dans une pièce lumineuse."
              ratio="3/4"
              ratioMobile="3/2"
              description="Un atelier en cours, vu de côté : quatre à six personnes autour d'une table, l'animatrice parmi elles. Gestes en train de se faire, aucune pose face à l'objectif."
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
          </Reveal>
        </div>

        <Reveal delay={210} className="mt-12 flex justify-center">
          <Button render={<Link href="/actualites" />}>
            Voir nos actualités
            <Icon name="arrow-right" aria-hidden />
          </Button>
        </Reveal>
      </Section>

      <CtaBand
        {...(t(doc, "ctaTitre", "") ? { titre: t(doc, "ctaTitre", "") } : {})}
        {...(t(doc, "ctaTexte", "") ? { texte: t(doc, "ctaTexte", "") } : {})}
      />
    </>
  )
}
