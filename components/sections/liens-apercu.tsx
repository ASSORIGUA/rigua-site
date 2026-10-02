import Link from "next/link"

import { Icon, type IconName } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import { buttonVariants } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

/**
 * Cartes « coin corné » pour les quatre sujets développés ailleurs sur le
 * site, réservées à la page d'accueil.
 *
 * Écart assumé à la règle « pas de grille de cartes » du design system : ces
 * quatre blocs ne sont pas des services ni des avantages (ce que la règle
 * vise), mais des liens de sommaire vers d'autres pages. Le traitement reste
 * sobre pour ne pas dériver vers les cartes à glow/tilt 3D que le brief
 * exclut explicitement (§10) : fond plein, rayon 8px, aucune rotation.
 *
 * Signature de la carte : un coin biseauté en haut à gauche (clip-path),
 * doublé d'un aplat orange positionné derrière ce même coin. Le biseau grandit
 * au survol/focus, seul mouvement de la carte — une bordure comme repère
 * d'interaction plutôt qu'un simple contour statique.
 *
 * Sous `sm`, un carrousel Embla (jamais de scroll-snap CSS maison, voir
 * components/ui/carousel.tsx) — même patron que <ActualitesListe> et
 * <ServicesOrienteur> : une carte à 85% de largeur, le CTA de section entre
 * les flèches (prop `cta`), plutôt qu'un bouton flottant après le carrousel.
 * La grille 2x2 reprend à partir de `sm:`, où deux colonnes tiennent
 * confortablement et où le CTA de section retrouve sa place habituelle,
 * rendue par l'appelant (voir components/sections/en-savoir-plus.tsx).
 */
export function LiensApercu({
  items,
  cta,
}: {
  items: {
    titre: string
    texte: string
    href: string
    icone: IconName
  }[]
  /** Rendu au centre, entre les flèches du carrousel, sous `sm` uniquement. */
  cta?: React.ReactNode
}) {
  return (
    <>
      <Carousel opts={{ align: "start" }} className="sm:hidden">
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={item.titre} className="basis-[85%]">
              <Reveal delay={Math.min(index, 3) * 70} className="h-full">
                <CarteApercu item={item} />
              </Reveal>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-8 flex items-center justify-center gap-4">
          <CarouselPrevious className="static my-0 translate-x-0" />
          {cta}
          <CarouselNext className="static my-0 translate-x-0" />
        </div>
      </Carousel>

      <ul className="hidden gap-5 sm:grid sm:grid-cols-2">
        {items.map((item, index) => (
          <Reveal as="li" key={item.titre} delay={Math.min(index, 3) * 70}>
            <CarteApercu item={item} />
          </Reveal>
        ))}
      </ul>
    </>
  )
}

function CarteApercu({
  item,
}: {
  item: { titre: string; texte: string; href: string; icone: IconName }
}) {
  return (
    <Link
      href={item.href}
      className="group/folio [clip-path:polygon(1.75rem_0,100%_0,100%_100%,0_100%,0_1.75rem)] relative flex h-full flex-col gap-4 bg-surface p-6 shadow-subtle transition-[clip-path,box-shadow] duration-200 ease-brand hover:[clip-path:polygon(2.5rem_0,100%_0,100%_100%,0_100%,0_2.5rem)] hover:shadow-raised focus-visible:[clip-path:polygon(2.5rem_0,100%_0,100%_100%,0_100%,0_2.5rem)] focus-visible:shadow-raised sm:p-8"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-10 w-10 bg-accent [clip-path:polygon(0_0,100%_0,0_100%)]"
      />

      <Icon
        name={item.icone}
        aria-hidden
        className="relative size-8 shrink-0 text-primary"
      />

      <div className="relative flex min-w-0 flex-1 flex-col gap-2">
        <h3 className="font-serif text-xl leading-snug font-medium sm:text-2xl">
          {item.titre}
        </h3>
        <p className="text-base text-muted-foreground">{item.texte}</p>
      </div>

      <span
        className={buttonVariants({
          variant: "outline",
          size: "sm",
          className: "relative self-start border-line-strong! bg-surface",
        })}
      >
        En savoir plus
        <Icon
          name="arrow-right"
          aria-hidden
          className="size-4 transition-transform duration-200 ease-brand group-hover/folio:translate-x-1"
        />
      </span>
    </Link>
  )
}
