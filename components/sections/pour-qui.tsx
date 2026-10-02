import { Icon } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

/**
 * « Pour qui », fiche de service.
 *
 * Deux mises en page selon la largeur, pour le même contenu :
 *  - sous `sm`, un carrousel Embla (jamais de scroll-snap CSS maison) : sur
 *    un écran étroit, faire glisser quatre ou cinq situations vers la gauche
 *    prend moins de place qu'une liste empilée, et c'est le geste que le
 *    client a demandé pour cette section sur téléphone ;
 *  - à partir de `sm`, une liste numérotée sur deux colonnes, sans carrousel :
 *    il y avait la place d'afficher tout, et un carrousel de trois cartes
 *    visibles sur cinq cachait de l'information pour rien.
 *
 * Le titre est « Pour qui », rien de plus : l'ancien « Vous vous
 * reconnaissez ? » s'adressait à la personne accompagnée, alors que celui qui
 * lit est presque toujours un proche.
 *
 * Numéros en aplat vert (`accent-solid`, le vert du logo, palette inversée de
 * ce projet : `primary` est l'orange), texte en noir sur blanc. En `sombre`
 * (section `deep`), mêmes couleurs fixes : la carte impose son fond.
 */
export function PourQui({
  profils,
  sombre = false,
}: {
  profils: string[]
  /** La section englobante est en `data-surface="deep"`. */
  sombre?: boolean
}) {
  return (
    <div className="flex flex-col gap-8">
      <Reveal className="flex flex-col gap-3 lg:max-w-2xl">
        <h2>Pour qui</h2>
        <p className={cn("text-base", sombre ? "text-cream-200" : "text-muted-foreground")}>
          {/* `{" "}` explicite : JSX supprime l'espace en fin de ligne, ce qui
              collait le nombre au mot suivant (« 4situations »). */}
          {profils.length}{" "}
          situations parmi les plus fréquentes. Si la vôtre n&apos;y figure pas,
          appelez-nous : nous vous dirons franchement si nous sommes la bonne
          réponse.
        </p>
      </Reveal>

      {/* Mobile : carrousel. */}
      <Carousel opts={{ align: "start" }} className="sm:hidden">
        <CarouselContent>
          {profils.map((profil, index) => (
            <CarouselItem key={profil} className="basis-[85%]">
              <Situation numero={index + 1} texte={profil} className="h-full" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots className="mt-5" />
      </Carousel>

      {/* Tablette et plus : deux colonnes, tout visible. */}
      {/* Nombre impair de situations : la dernière occupe les deux colonnes,
          pour que la grille reste un rectangle plein (trois à gauche et deux
          à droite laissaient un trou en bas à droite). */}
      <ol className="hidden gap-3 sm:grid sm:grid-cols-2">
        {profils.map((profil, index) => (
          <Reveal
            as="li"
            key={profil}
            delay={Math.min(index, 4) * 60}
            className={cn(
              profils.length % 2 === 1 &&
                index === profils.length - 1 &&
                "sm:col-span-2"
            )}
          >
            <Situation numero={index + 1} texte={profil} className="h-full" />
          </Reveal>
        ))}
      </ol>
    </div>
  )
}

function Situation({
  numero,
  texte,
  className,
}: {
  numero: number
  texte: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-md border-2 border-accent-solid/40 bg-white px-5 py-4 transition-colors duration-200 hover:border-accent-solid",
        className
      )}
    >
      <span
        aria-hidden
        className="nums flex size-9 shrink-0 items-center justify-center rounded-md bg-accent-solid text-base font-semibold text-white"
      >
        {numero}
      </span>
      <span className="min-w-0 pt-1 text-base leading-snug text-black sm:text-lg">
        {texte}
      </span>
      <Icon
        name="check"
        aria-hidden
        className="mt-1.5 ml-auto size-5 shrink-0 text-accent-solid"
      />
    </div>
  )
}
