"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"

import { Icon } from "@/components/icon"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * Carousel — Présence & Autonomie
 *
 * Embla, jamais un scroll-snap CSS maison : le pattern maison a bloqué le
 * défilement vertical sur plusieurs projets, sur Safari iOS en particulier.
 *
 * Deux corrections par rapport au composant shadcn d'origine :
 *  - l'état initial passe par `queueMicrotask` au lieu d'un appel synchrone
 *    dans le corps de l'effet. Embla émet `init` de façon synchrone dans son
 *    constructeur, donc avant que React puisse s'y abonner : s'abonner à
 *    `init` laisse `canScrollPrev` / `canScrollNext` bloqués à `false` et les
 *    deux flèches grisées en permanence. On ne s'y abonne pas, on appelle
 *    `onSelect` soi-même dès que l'api existe ;
 *  - le nettoyage retire aussi `reInit`, qui restait abonné dans l'original.
 *
 * Redesign : flèches 44px à rayon 8px, jamais de bouton circulaire, et
 * libellés en français.
 *
 * Ne jamais poser de `touch-action` en CSS sur le conteneur ou les items :
 * cela court-circuite la gestion tactile d'Embla.
 *
 * `CarouselDots` : variante sans flèches, pour les carousels qui remplacent
 * un tableau sous sm (voir app/tarifs, app/nos-services,
 * app/l-association). Le point ne fait que refléter la position, il n'est
 * jamais cliquable : ces carousels n'ont pas de bouton contrôleur, l'unique
 * façon d'avancer est le glissement tactile, donc un point interactif
 * promettrait une action qu'il n'offre pas.
 */
type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel doit être utilisé dans un <Carousel />")
  }

  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    // Défilement au touchpad et à la molette, en plus du drag tactile/souris
    // qu'Embla gère déjà nativement. `forceWheelAxis` verrouille sur l'axe du
    // carousel : sans lui, un simple scroll vertical de page serait capté par
    // un carousel horizontal au survol.
    [
      WheelGesturesPlugin({
        forceWheelAxis: orientation === "horizontal" ? "x" : "y",
      }),
      ...(plugins ?? []),
    ]
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return

    // Voir l'en-tête du fichier : ne pas écouter "init", et ne pas appeler
    // onSelect en synchrone ici (cela déclencherait set-state-in-effect).
    queueMicrotask(() => onSelect(api))
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api.off("reInit", onSelect)
      api.off("select", onSelect)
    }
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      {/* `py-1.5` en horizontal : le conteneur parent est `overflow-hidden`
          (contrainte d'Embla) et, sans marge verticale, les slides en
          `items-stretch` touchent ses bords haut et bas. Tout ce qu'une carte
          dessine à sa lisière (bordure, `ring`, ombre) était alors tranché au
          pixel, ce qui donnait l'impression d'un cadre invisible autour du
          carrousel. Constaté sur les cartes des services et de l'association. */}
      <div
        className={cn(
          "flex items-stretch",
          orientation === "horizontal" ? "-ml-5 py-1.5" : "-mt-5 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-5" : "pt-5",
        className
      )}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute touch-manipulation bg-surface disabled:opacity-35",
        orientation === "horizontal"
          ? "inset-y-0 -left-14 my-auto"
          : "-top-14 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <Icon name="chevron-left" className="size-5" />
      <span className="sr-only">Élément précédent</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute touch-manipulation bg-surface disabled:opacity-35",
        orientation === "horizontal"
          ? "inset-y-0 -right-14 my-auto"
          : "-bottom-14 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <Icon name="chevron-right" className="size-5" />
      <span className="sr-only">Élément suivant</span>
    </Button>
  )
}

function CarouselDots({ className, ...props }: React.ComponentProps<"div">) {
  const { api } = useCarousel()
  const [slides, setSlides] = React.useState<number[]>([])
  const [selected, setSelected] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    const onInit = () => setSlides(api.scrollSnapList().map((_, index) => index))
    const onSelect = () => setSelected(api.selectedScrollSnap())

    // Même raisonnement que l'effet principal du carousel plus haut : pas
    // d'appel synchrone dans le corps de l'effet, et pas d'abonnement à
    // "init" (émis avant que ce useEffect ne puisse s'y abonner).
    queueMicrotask(() => {
      onInit()
      onSelect()
    })
    api.on("reInit", onInit)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api.off("reInit", onInit)
      api.off("reInit", onSelect)
      api.off("select", onSelect)
    }
  }, [api])

  if (slides.length <= 1) return null

  return (
    <div
      aria-hidden
      data-slot="carousel-dots"
      className={cn("flex items-center justify-center gap-2", className)}
      {...props}
    >
      {slides.map((index) => (
        <span
          key={index}
          className={cn(
            "size-1.5 shrink-0 rounded-full transition-colors duration-200 ease-brand",
            index === selected ? "bg-accent-ink" : "bg-line-strong"
          )}
        />
      ))}
    </div>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  useCarousel,
}
