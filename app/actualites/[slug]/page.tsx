import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Icon } from "@/components/icon"
import { PageHero, pageHeroImage } from "@/components/page-hero"
import { PhotoSlot } from "@/components/photo-slot"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { CtaBand } from "@/components/sections/cta-band"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getActualite, getActualites } from "@/lib/cms"
import { dateLongue } from "@/lib/content/actions"

/* Les actualités publiées dans Sanity après le build restent accessibles :
   la page est générée à la demande puis mise en cache (ISR). */
export async function generateStaticParams() {
  const liste = await getActualites()
  return liste.map((actu) => ({ slug: actu.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const actu = await getActualite(slug)
  if (!actu) return {}

  return {
    title: actu.titre,
    description: actu.resume,
    alternates: { canonical: `/actualites/${slug}` },
    /* Les entrées d'exemple ne doivent pas être indexées : ce sont des
       démonstrations de mise en page, pas des informations. */
    robots: (actu as { exemple?: true }).exemple
      ? { index: false, follow: true }
      : undefined,
    openGraph: {
      type: "article",
      publishedTime: actu.date,
      title: actu.titre,
      description: actu.resume,
    },
  }
}

export default async function PageActualite({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const actu = await getActualite(slug)
  if (!actu) notFound()

  return (
    <>
      <PageHero
        eyebrow={actu.categorie}
        eyebrowIcone="agenda"
        titre={actu.titre}
        image={pageHeroImage("actualites")}
      />

      <Section>
        {/*
          Le repère de date vit dans une colonne à part à partir de `lg`, pas
          dans un second badge sous le titre : la catégorie est déjà dite par
          l'eyebrow du hero, la répéter dans un badge identique deux fois dans
          les 200 premiers pixels n'ajoutait rien. Cette rubrique est un
          journal daté plus qu'un blog (§19 du brief : « trois lignes publiées
          chaque mois valent mieux qu'un long bilan une fois par an ») : la
          date mérite d'être le repère structurant, pas une mention en petit.
        */}
        <div className="grid gap-10 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <Reveal
            as="header"
            className="flex flex-row items-center gap-4 lg:flex-col lg:items-start lg:gap-5"
          >
            <div className="flex flex-col gap-1">
              <span className="eyebrow text-accent-ink">Publié le</span>
              <time
                dateTime={actu.date}
                className="font-serif text-2xl leading-tight font-medium text-balance"
              >
                {dateLongue(actu.date)}
              </time>
            </div>
            <Separator
              tone="line"
              orientation="vertical"
              className="h-10 lg:hidden"
            />
            <Separator tone="accent" className="hidden lg:block" />
            <Link
              href="/actualites"
              className="hidden items-center gap-2 text-sm font-semibold text-primary underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-200 hover:decoration-current lg:inline-flex"
            >
              <Icon name="arrow-left" aria-hidden />
              Toutes les actualités
            </Link>
          </Reveal>

          <article className="flex flex-col gap-9">
            <Reveal>
              <p className="measure text-xl leading-relaxed">{actu.resume}</p>
            </Reveal>

            {actu.photo ? (
              <Reveal delay={70} className="flex flex-col gap-3">
                {/*
                  Cadre éditorial : un liseré en retrait de la photo, dans le
                  ton orange de la marque. Réservé à cette page (la carte de
                  la liste garde son cadrage plein bord, voir
                  actualites-liste.tsx) : ici la photo est la pièce à
                  conviction d'un article unique, pas une vignette parmi
                  d'autres, elle mérite d'être présentée comme telle.
                */}
                <div className="relative p-2.5 sm:p-3.5">
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-lg border-2 border-accent"
                  />
                  <PhotoSlot
                    ratio="16/9"
                    description={actu.photo}
                    src={actu.photoSrc}
                    alt={actu.photoAlt}
                    sizes="(min-width: 1024px) 70vw, 100vw"
                    className="shadow-[0_18px_40px_-24px_rgb(0_56_28_/_0.35)]"
                  />
                </div>
                {actu.photoSrc ? (
                  <p className="measure text-sm text-muted-foreground italic">
                    {actu.photo}
                  </p>
                ) : null}
              </Reveal>
            ) : null}

            <Reveal delay={140} className="flex flex-col gap-5">
              {actu.paragraphes.map((paragraphe) => (
                <p
                  key={paragraphe.slice(0, 40)}
                  className="measure text-lg leading-relaxed"
                >
                  {paragraphe}
                </p>
              ))}
            </Reveal>

            {/* Seconde photo, après le texte : elle illustre un moment que les
                paragraphes viennent de raconter, elle n'a donc pas de sens
                avant eux. Jamais dans la vignette de liste. */}
            {actu.photoSecondaireSrc ? (
              <Reveal className="flex flex-col gap-3">
                <PhotoSlot
                  ratio="16/9"
                  description={actu.photoSecondaireAlt ?? ""}
                  src={actu.photoSecondaireSrc}
                  alt={actu.photoSecondaireAlt}
                  sizes="(min-width: 1024px) 70vw, 100vw"
                />
              </Reveal>
            ) : null}

            <Reveal className="flex flex-col gap-6 border-t border-line pt-8">
              <Button
                variant="outline"
                className="w-fit lg:hidden"
                render={<Link href="/actualites" />}
              >
                <Icon name="arrow-left" aria-hidden />
                Toutes les actualités
              </Button>
            </Reveal>
          </article>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
