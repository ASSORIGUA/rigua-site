import Link from "next/link"

import { Icon } from "@/components/icon"
import { PhotoSlot } from "@/components/photo-slot"
import { Reveal } from "@/components/reveal"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getActualites } from "@/lib/cms"
import { dateLongue, type Actualite } from "@/lib/content/actions"
import { cn } from "@/lib/utils"

/**
 * Liste des actualités.
 *
 * La carte est le seul composant que le design system autorise pour une
 * actualité (jamais pour un service, jamais pour un avantage). Ici elle est
 * justifiée : chaque entrée est un objet autonome, daté, avec un lien propre.
 * Chaque carte réserve un emplacement photo (`PhotoSlot`) au-dessus du texte :
 * vide tant que `photoSrc` n'est pas renseigné dans `lib/content/actions.ts`,
 * même patron que les cartes de service (voir services-orienteur.tsx).
 *
 * Carrousel Embla à tous les breakpoints (jamais de scroll-snap CSS maison,
 * voir components/ui/carousel.tsx) — même patron que <ServicesOrienteur> :
 * une carte à 85% de largeur sous `sm`, deux à partir de `sm`, environ trois
 * à partir de `lg`. Les flèches passent de part et d'autre du conteneur à
 * partir de `lg` (place suffisante pour les sortir du cadre des cartes), et
 * restent en dessous, avec le CTA de section entre elles, en dessous de `lg`.
 *
 * Un effet « carte centrale en avant-plan » (échelle/opacité variables,
 * `align: "center"`, `loop: true`) a été essayé puis abandonné : la
 * combinaison boucle infinie + peu de slides visibles par rapport au total +
 * tailles de slide qui changent est une limitation documentée d'Embla
 * (issues GitHub #149 et #118), qui produisait un chevauchement intermittent
 * non reproductible de façon fiable. Cartes de largeur égale ici, plus
 * simple et stable.
 */
export async function ActualitesListe({
  limite,
  className,
  cta,
}: {
  limite?: number
  className?: string
  /** Rendu au centre, entre les flèches du carrousel, sous `lg` uniquement. */
  cta?: React.ReactNode
}) {
  const actualitesAffichables = await getActualites()
  const entrees = limite
    ? actualitesAffichables.slice(0, limite)
    : actualitesAffichables

  return (
    <div className={cn(className)}>
      <Carousel opts={{ align: "start" }} className="lg:px-16">
        <CarouselContent>
          {entrees.map((actu, index) => (
            <CarouselItem
              key={actu.slug}
              className="basis-[85%] sm:basis-1/2 lg:basis-1/3"
            >
              <Reveal delay={Math.min(index, 3) * 70} className="h-full">
                <CarteActualite actu={actu} />
              </Reveal>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="max-lg:hidden" />
        <CarouselNext className="max-lg:hidden" />

        <div className="mt-8 flex items-center justify-center gap-4 lg:hidden">
          <CarouselPrevious className="static my-0 translate-x-0" />
          {cta}
          <CarouselNext className="static my-0 translate-x-0" />
        </div>
      </Carousel>
    </div>
  )
}

function CarteActualite({ actu }: { actu: Actualite }) {
  return (
    // La carte entière est un seul lien. Deux liens vers la même page (le
    // titre puis « Lire ») donnent une cible étroite et un doublon dans la
    // liste des liens d'un lecteur d'écran. Ici, toute la surface de la
    // carte est cliquable.
    <Link
      href={`/actualites/${actu.slug}`}
      className="group/carte flex h-full flex-col overflow-hidden rounded-xl border border-primary/40 bg-surface transition-colors duration-200 hover:border-primary"
    >
      <PhotoSlot
        ratio="4/3"
        description={actu.photo ?? "Un moment de l'événement décrit."}
        src={actu.photoSrc}
        alt={actu.photoAlt}
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 85vw"
        className="rounded-none border-0 border-b border-primary/40"
      />

      <article className="flex flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary">{actu.categorie}</Badge>
          <time dateTime={actu.date} className="nums text-sm text-muted-foreground">
            {dateLongue(actu.date)}
          </time>
        </div>

        <h3 className="line-clamp-2 min-h-[3.09375rem] font-sans text-lg leading-snug font-semibold underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-200 group-hover/carte:decoration-accent">
          {actu.titre}
        </h3>

        <p className="line-clamp-3 text-base text-muted-foreground">
          {actu.resume}
        </p>

        <span className="inline-flex w-fit items-center gap-2 rounded-md bg-secondary py-2 pr-3 pl-4 text-base font-semibold text-primary transition-colors duration-200 ease-brand group-hover/carte:bg-primary group-hover/carte:text-primary-foreground">
          Lire
          <Icon
            name="arrow-right-double"
            aria-hidden
            className="size-5 transition-transform duration-200 ease-brand group-hover/carte:translate-x-1"
          />
        </span>
      </article>
    </Link>
  )
}
