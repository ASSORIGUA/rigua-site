import type { Metadata } from "next"

import { PageHero, pageHeroImage } from "@/components/page-hero"
import { Section, SectionHeading } from "@/components/section"
import { ActualitesFiltrees } from "@/components/sections/actualites-filtrees"
import { CtaBand } from "@/components/sections/cta-band"
import { getActualites, getPage, t } from "@/lib/cms"

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Les actualités de l'association : ateliers, sorties, temps de rencontre et nouveaux projets, au fil de l'année.",
  alternates: { canonical: "/actualites" },
}

export default async function Actualites() {
  const [doc, actualites] = await Promise.all([
    getPage("pageActualites"),
    getActualites(),
  ])
  return (
    <>
      <PageHero
        eyebrow={t(doc, "heroEyebrow", "La vie de l'association")}
        eyebrowIcone="accueil"
        titre={t(doc, "heroTitre", "Nos actualités")}
        image={pageHeroImage("actualites")}
        filCourant="Actualités"
        fil={[{ href: "/", libelle: "Accueil" }]}
        lead={
          <p>
            {t(
              doc,
              "heroLead",
              "Une association se juge autant à ce qu'elle organise qu'à ce qu'elle annonce. Cette page rend compte des activités menées au fil de l'année.",
            )}
          </p>
        }
      />

      <Section>
        <SectionHeading
          eyebrow={t(doc, "listeEyebrow", "Actualités")}
          eyebrowIcone="agenda"
          titre={t(doc, "listeTitre", "Ce qui s'est passé récemment")}
          lead={t(
            doc,
            "listeLead",
            "Trois lignes publiées chaque mois valent mieux qu'un long bilan une fois par an. Filtrez par sujet ou par année.",
          )}
          centre
        />
        <ActualitesFiltrees actualites={actualites} />
      </Section>

      <CtaBand
        titre={t(doc, "ctaTitre", "Envie de nous rencontrer ?")}
        texte={t(
          doc,
          "ctaTexte",
          "Les temps de rencontre sont ouverts aux proches. Le plus simple est de nous appeler pour savoir quand a lieu le prochain.",
        )}
      />
    </>
  )
}
