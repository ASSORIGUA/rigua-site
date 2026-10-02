import Link from "next/link"

import { Icon } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { getTemoignages } from "@/lib/cms"
import { avisGoogle, estPublie } from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * Témoignages de familles accompagnées.
 *
 * Une carte à la fois sous `lg` (une seule citation, en grand, jamais une
 * grille de 3 cartes identiques d'un coup sur mobile), trois cartes visibles
 * côte à côte à partir de `lg` : à cette largeur il y a la place de montrer
 * qu'il existe d'autres avis sans que chaque citation devienne illisible. Le
 * corps de citation redescend à `text-xl` à partir de `lg` pour compenser la
 * largeur de carte plus étroite (3 colonnes plutôt qu'une pleine largeur).
 * Le guillemet géant en filigrane sert de repère visuel plutôt qu'une barre
 * latérale colorée (pattern IA banni, voir design-god §anti-cartes).
 *
 * Fond de carte blanc avec un fin contour en `emerald-500` (le vert émeraude
 * exact du logo, `--pa-emerald-500`, pas le `--accent` générique plus pâle) :
 * un aplat opaque détache la carte sans dépendre du contraste de la photo
 * dessous, avec un trait modéré (3px, allégé depuis les 4px d'origine)
 * pour ne pas alourdir la carte tout en restant visible.
 * Citation en `amber-700` (= `--accent-action-hover`, le hover du bouton
 * `default`) et étoiles en `emerald-500` — demande explicite, à ne pas
 * généraliser ailleurs.
 * Un séparateur fin détache la citation du bloc identité (prénom, lien de
 * parenté, ville), qui reste en noir plutôt que dans la couleur de citation.
 *
 * Pas de portrait : aucune personne n'a signé d'autorisation d'image pour
 * cette section (voir docs/photos-a-fournir.md, même principe). L'identité
 * tient au prénom, à l'initiale du nom et à la ville.
 */
export async function Temoignages() {
  const temoignages = await getTemoignages()
  return (
    <div className="flex flex-col gap-10">
      <Carousel opts={{ align: "start" }} className="group/temoignages">
        <CarouselContent>
          {temoignages.map((temoignage) => (
            <CarouselItem key={temoignage.prenom} className="basis-full lg:basis-1/3">
              <Reveal className="relative flex h-full flex-col overflow-hidden rounded-md border-3 border-emerald-500 bg-white px-7 py-10 sm:px-12 sm:py-14 lg:px-7 lg:py-9">
                <Icon
                  name="guillemet"
                  aria-hidden
                  className="absolute top-8 right-7 size-14 text-amber-700/25 sm:top-10 sm:right-12 sm:size-20 lg:top-7 lg:right-7 lg:size-12"
                />

                <div className="relative flex flex-1 flex-col gap-8">
                  <div className="flex gap-1" aria-hidden>
                    {Array.from({ length: 5 }, (_, index) => (
                      <Icon
                        key={index}
                        name="etoile-pleine"
                        className={
                          index < temoignage.note
                            ? "size-5 text-emerald-500"
                            : "size-5 text-emerald-500/25"
                        }
                      />
                    ))}
                  </div>

                  <p className="measure flex-1 font-serif text-2xl leading-snug text-amber-700 italic sm:text-3xl lg:text-xl">
                    {temoignage.citation}
                  </p>

                  <hr className="border-t-2 border-black/15" />

                  <div className="flex flex-col gap-0.5">
                    <span className="font-sans text-base font-semibold text-black">
                      {temoignage.prenom}
                    </span>
                    <span className="text-sm text-black/85">
                      {temoignage.lien} · {temoignage.ville}
                    </span>
                  </div>
                </div>
              </Reveal>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Mobile : CTA "avis Google" entre les flèches, même patron que
            <ActualitesListe> (voir sa légende) : libellé court, il doit tenir
            entre deux boutons 44px sur un écran de 375px. */}
        <div className="mt-8 flex items-center justify-center gap-4 sm:hidden">
          <CarouselPrevious className="static my-0 translate-x-0" />
          <BoutonAvisGoogle court />
          <CarouselNext className="static my-0 translate-x-0" />
        </div>

        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>

      <Reveal delay={70} className="hidden justify-center sm:flex">
        <BoutonAvisGoogle />
      </Reveal>
    </div>
  )
}

/**
 * Bouton "Voir nos avis Google", toujours actif (jamais `disabled`) : tant
 * que l'URL Google Business n'est pas fournie dans `avisGoogle`
 * (lib/site.ts), il renvoie vers /contact, même patron que
 * `telephoneAppel()` pour le téléphone. Un bouton grisé aurait affiché un
 * cul-de-sac ; un lien vers /contact reste une action utile.
 */
function BoutonAvisGoogle({
  className,
  court = false,
}: {
  className?: string
  court?: boolean
}) {
  if (!estPublie(avisGoogle)) {
    return (
      <Button
        size={court ? "default" : "lg"}
        className={cn(className)}
        render={<Link href="/contact" />}
      >
        <Icon name="etoile-pleine" aria-hidden />
        Voir nos avis Google
      </Button>
    )
  }

  return (
    <Button
      size={court ? "default" : "lg"}
      className={cn(className)}
      render={<Link href={avisGoogle.valeur.url} target="_blank" rel="noopener noreferrer" />}
    >
      <Icon name="etoile-pleine" aria-hidden />
      {court
        ? "Nos avis Google"
        : `Voir nos avis Google (${avisGoogle.valeur.note.toLocaleString("fr-FR")}/5, ${avisGoogle.valeur.nombreAvis} avis)`}
    </Button>
  )
}
