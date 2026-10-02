import { Icon } from "@/components/icon"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { BesoinService } from "@/lib/content/services"
import { cn } from "@/lib/utils"

/**
 * « Dans quels cas y faire appel » — page de service.
 *
 * Un carousel Embla à tous les breakpoints (jamais de scroll-snap CSS
 * maison, voir components/ui/carousel.tsx), plutôt qu'une liste verticale
 * dépliée en desktop : sur la page « Nos services », cette liste se répète
 * quatre fois (une par service), à 5 rangées chacune. En liste verticale,
 * cela représentait vingt rangées pleine largeur rien que pour cette
 * section. En carousel, chaque service tient dans la largeur d'écran
 * disponible et se parcourt en glissant, ce qui raccourcit sensiblement le
 * défilement de la page sans retirer d'information.
 *
 * Sous `sm`, une carte à 88% de large avec `CarouselDots` (pas de flèches :
 * l'unique façon d'avancer est le glissement tactile, cohérent avec le
 * reste du site). À partir de `sm`, deux à trois cartes visibles selon la
 * largeur, flèches `CarouselPrevious`/`CarouselNext` sorties du cadre des
 * cartes à partir de `lg`, où il y a la place de les poser de part et
 * d'autre (même pattern que components/sections/services-orienteur.tsx).
 *
 * `sombre` : sur un bloc de service posé en `data-surface="deep"`, le fond
 * de carte par défaut (`bg-surface`, redéfini en vert très foncé sur cette
 * surface) devient quasi indissociable du fond de la section : le contraste
 * carte/fond, pas seulement texte/fond, disparaît. Plutôt que de redéfinir
 * `--surface` globalement (utilisé aussi par CtaBand et Parcours, où ce
 * rapprochement est voulu), cette carte précise reçoit un traitement propre
 * quand elle vit sur `deep` : fond blanc plein, bordure verte (le vert du
 * pictogramme, pas la couleur d'ancrage marine/brun de `deep`), texte foncé.
 */
export function BesoinsListe({
  besoins,
  sombre = false,
}: {
  besoins: BesoinService[]
  /** La section englobante est en `data-surface="deep"`. */
  sombre?: boolean
}) {
  return (
    <Carousel opts={{ align: "start" }} className="lg:px-16">
      <CarouselContent>
        {besoins.map((besoin) => (
          <CarouselItem
            key={besoin.titre}
            className="basis-[88%] sm:basis-[46%] lg:basis-[31%]"
          >
            {/* h-full : CarouselContent pose items-stretch, la carte doit
                remplir la hauteur de la rangée la plus haute pour que les
                cadres bordés s'alignent. */}
            {/* Le cadre de la carte est désormais posé par CarteBesoin
                elle-même (un `ring`, qui ne décale pas le contenu et ne se
                cumule pas avec le bandeau de tête). */}
            <CarteBesoin besoin={besoin} sombre={sombre} className="h-full" />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* bg-surface (par défaut sur les flèches) se fond aussi dans `deep` :
          même surcharge que la carte, fond blanc et bordure verte. */}
      <CarouselPrevious
        className={cn(
          "max-lg:hidden",
          sombre && "border-2 border-emerald-500 bg-white text-black hover:border-emerald-600"
        )}
      />
      <CarouselNext
        className={cn(
          "max-lg:hidden",
          sombre && "border-2 border-emerald-500 bg-white text-black hover:border-emerald-600"
        )}
      />

      <CarouselDots className="mt-6 lg:hidden" />
    </Carousel>
  )
}

/**
 * La carte elle-même. Toujours une carte pleine largeur de son slide, jamais
 * une grille (brief design system, §Composants) ; `min-w-0` sur le texte
 * pour qu'un mot long ne pousse pas l'icône hors cadre. Médaillon posé en
 * coin haut-droit : seule mise en page qui tienne aussi bien à 88% de 360px
 * (mobile) qu'à 31% d'un container large (desktop), le texte s'empilant
 * pleine largeur en dessous dans les deux cas.
 */
function CarteBesoin({
  besoin,
  sombre = false,
  className,
}: {
  besoin: BesoinService
  sombre?: boolean
  className?: string
}) {
  // Fond blanc, bordure ocre de 2 px (choix client, après deux essais rejetés :
  // un cadre gris jugé fade, puis un aplat vert plein). La bordure est un
  // `border`, dessiné à l'intérieur de la boîte, et non un `ring`, dessiné à
  // l'extérieur : c'est ce qui, combiné à l'`overflow-hidden` du carrousel
  // englobant, faisait trancher le haut et le bas des cartes. Le carrousel a
  // en plus reçu une marge verticale (voir components/ui/carousel.tsx).
  // Aucun débordement, aucun mouvement au survol : seule la bordure change.
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-md border-2 bg-white transition-colors duration-300 ease-brand",
        // Attention à la palette inversée de ce projet (voir globals.css) :
        // `primary` est l'ORANGE du logo, `accent-solid` le VERT. Bordure
        // orange, médaillon vert plein à pictogramme blanc.
        sombre
          ? "border-emerald-500/70"
          : "border-primary hover:border-primary/70",
        className
      )}
    >
      <div className="flex min-w-0 flex-col gap-3 px-5 pt-6 pb-6">
        <span
          aria-hidden
          className={cn(
            "flex size-12 items-center justify-center rounded-md",
            sombre ? "bg-emerald-50 text-emerald-800" : "bg-accent-solid text-white"
          )}
        >
          <Icon name={besoin.icone} className="size-6" />
        </span>
        {/* Couleurs fixes des deux côtés, jamais les tokens de surface : la
            carte impose son propre fond (blanc en `sombre`, vert plein
            sinon), indépendant du `data-surface` de la section englobante.
            Les tokens `--foreground`/`--muted-foreground` y pointeraient vers
            la mauvaise valeur et le texte deviendrait illisible. */}
        <h3 className="text-lg leading-snug font-semibold text-black">
          {besoin.titre}
        </h3>
        <p className="text-base text-cream-800">{besoin.texte}</p>
      </div>
    </div>
  )
}
