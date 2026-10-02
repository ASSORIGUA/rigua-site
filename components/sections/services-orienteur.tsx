import Image from "next/image"
import Link from "next/link"

import { Icon } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getServices } from "@/lib/cms"
import type { Service } from "@/lib/content/services"
import { cn } from "@/lib/utils"

/**
 * Les quatre services, en cartes avec photo — accueil uniquement.
 *
 * Écart assumé à la règle « pas de grille de cartes » du design system : les
 * photos livrées justifient un traitement visuel différent de l'accordéon
 * précédent, en cohérence avec le CTA de chaque service (voir aussi
 * components/sections/liens-apercu.tsx, même exception). Chaque carte part
 * toujours de la phrase que prononce une famille au téléphone
 * (`phraseFamille`), pas du nom du service — c'est ce qui différencie ce bloc
 * d'un vrai catalogue de produits.
 *
 * Carrousel Embla à tous les breakpoints (jamais de scroll-snap CSS maison,
 * voir components/ui/carousel.tsx), une seule carte visible à 85% sous `sm`
 * et environ deux à partir de `lg`. Les flèches sont posées de part et
 * d'autre du conteneur plutôt qu'en dessous : à partir de `lg`, il y a la
 * place de les sortir du cadre des cartes.
 */
export async function ServicesOrienteur() {
  const services = await getServices()
  return (
    <>
      <Carousel opts={{ align: "start" }} className="lg:px-16">
        <CarouselContent>
          {services.map((service, index) => (
            <CarouselItem
              key={service.slug}
              className="basis-[88%] sm:basis-[42%] lg:basis-[36%]"
            >
              <Reveal delay={Math.min(index, 3) * 70} className="h-full">
                <CarteService service={service} />
              </Reveal>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="max-lg:hidden" />
        <CarouselNext className="max-lg:hidden" />

        <div className="mt-8 flex items-center justify-center gap-4 lg:hidden">
          <CarouselPrevious className="static my-0 translate-x-0" />
          <Reveal>
            <Button render={<Link href="/nos-services" />}>
              Voir tous les services
              <Icon name="arrow-right" aria-hidden />
            </Button>
          </Reveal>
          <CarouselNext className="static my-0 translate-x-0" />
        </div>
      </Carousel>

      <Reveal className="mt-10 hidden justify-center lg:flex">
        <Button render={<Link href="/nos-services" />}>
          Voir tous les services
          <Icon name="arrow-right" aria-hidden />
        </Button>
      </Reveal>
    </>
  )
}

function CarteService({
  service,
}: {
  service: Service
}) {
  const urgence = service.slug === "hebergement-urgence"

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border-2 border-primary/40 bg-background">
      <div className="relative aspect-4/3 shrink-0 bg-muted">
        {service.photoSrc ? (
          <Image
            src={service.photoSrc}
            alt={service.photoAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 85vw"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-md border-2",
              urgence ? "border-urgent text-urgent" : "border-accent-action text-accent-action"
            )}
          >
            <Icon name={service.icone} className="size-5" />
          </span>
          <span
            className={cn(
              "eyebrow",
              urgence ? "text-urgent" : "text-emerald-500"
            )}
          >
            {service.titreCourt}
          </span>
        </div>

        <h3 className="font-heading text-lg leading-snug font-medium text-foreground sm:text-xl">
          {service.phraseFamille}
        </h3>

        <p className="measure flex-1 text-base text-muted-foreground">
          {service.resume}
        </p>

        <Button
          variant={urgence ? "urgent" : "default"}
          className="mt-1 w-full sm:w-auto sm:self-start"
          render={<Link href={`/nos-services#${service.slug}`} />}
        >
          {service.titreCourt}
          <Icon name="arrow-right-circle" aria-hidden />
        </Button>
      </div>
    </div>
  )
}
