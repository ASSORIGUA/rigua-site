import Image from "next/image"
import * as React from "react"

import { Eyebrow } from "@/components/eyebrow"
import { type IconName } from "@/components/icon"
import { ParallaxeFlottant, ParallaxeFond } from "@/components/motion/parallaxe"
import { TraitTitre } from "@/components/motion/trait-titre"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

/**
 * Section de page.
 *
 * Existe pour une seule raison : rendre impossible l'erreur documentée dans
 * app/globals.css. Poser un fond avec `bg-surface-sand` sans l'attribut
 * `data-surface` change la couleur du fond SANS basculer les tokens de texte,
 * et le texte secondaire tombe sous le seuil AA. Ce composant met toujours les
 * deux ensemble, donc le cas ne peut pas se produire.
 *
 * Le rythme des sections est : papier, crème clair, papier, vert foncé profond.
 * Jamais trois surfaces identiques à la suite.
 */

export type Surface = "papier" | "warm" | "sand" | "deep"

const SURFACE_ATTR: Record<Surface, string | undefined> = {
  papier: undefined,
  warm: "warm",
  sand: "sand",
  deep: "deep",
}

/**
 * Fond photo optionnel.
 *
 * Trois voiles : `clair` (défaut sur papier/warm/sand), `sombre` (défaut sur
 * `deep`) et `photo`, un simple noir à 20 % qui laisse l'image quasiment
 * intacte. `photo` suppose que le texte posé dessus est clair et porte son
 * propre contraste : à ne pas utiliser sous du texte foncé.
 *
 * L'image est posée dans un calque `absolute inset-0` séparé du contenu, avec
 * un voile qui garantit le contraste du texte par-dessus (règle #11 du design
 * system : jamais d'opacité de texte sous 0,85, donc c'est le voile qui
 * s'assombrit/s'éclaircit, jamais le texte qui se rend transparent). Deux
 * voiles seulement : `clair` pour les surfaces papier/warm/sand, `sombre`
 * pour `deep`, où le texte est déjà blanc.
 *
 * `srcMobile`/`srcDesktop` : même patron que le fond du hero (deux fichiers
 * WebP déjà recadrés à la prise de vue, portrait et paysage, plutôt qu'un
 * seul fichier redimensionné au vol) : voir la légende du hero dans
 * app/page.tsx pour le raisonnement complet.
 */
type SectionImage = {
  srcMobile: string
  srcDesktop: string
  /**
   * `sombre` sur les surfaces déjà foncées (deep) où le texte est blanc.
   * `photo` : noir à 20 %, l'image reste pleinement visible. Exige que la
   * section bascule ses tokens de texte en clair (`surface="deep"`).
   */
  voile?: "clair" | "sombre" | "photo"
}

/**
 * Motif décoratif transparent, distinct de `image` : pas de photo pleine
 * cadre, pas de voile de lisibilité. Le motif est un PNG/WebP à fond
 * transparent avec des illustrations concentrées sur les bords et un centre
 * vide, pensé pour se superposer au fond de couleur existant de la section
 * (`data-surface`/`bg-background`) plutôt que de le remplacer. Aucun voile
 * n'est nécessaire ici en principe : le texte vit dans la zone centrale vide
 * du motif.
 *
 * `voileMobile` déroge à cette règle : certaines sections (contenu long,
 * section courte) rapprochent le texte des illustrations de coin sous `sm`.
 * Un voile très léger, mobile uniquement, garantit alors le contraste sans
 * recourir à `image` (qui masquerait le motif sur desktop aussi).
 */
type SectionMotif = {
  srcMobile: string
  srcDesktop: string
  /** Léger voile clair, mobile uniquement. Absent par défaut. */
  voileMobile?: boolean
}

/**
 * Quatre illustrations de coin, une par angle de la section.
 *
 * Remplace `motif` pour les sections qui ont reçu un jeu de 4 PNG dédiés
 * (voir docs/image-prompts-light-sections.md) : contrairement à `motif`
 * (une seule image étirée en `object-cover` sur toute la section), chaque
 * fichier ici est un carré à fond transparent dont le dessin se concentre
 * dans UN angle précis et s'estompe vers le centre. `object-contain`
 * partout : jamais de recadrage ni de déformation d'un motif dessiné pour
 * un coin donné. Coin absent -> non rendu, aucune des quatre positions
 * n'est obligatoire.
 */
type SectionCorners = {
  topLeft?: string
  topRight?: string
  bottomLeft?: string
  bottomRight?: string
}

const CORNER_POSITION: Record<keyof SectionCorners, string> = {
  topLeft: "top-0 left-0",
  topRight: "top-0 right-0",
  bottomLeft: "bottom-0 left-0",
  bottomRight: "bottom-0 right-0",
}

export function Section({
  surface = "papier",
  children,
  className,
  tight = false,
  grain = false,
  image,
  motif,
  coins,
  ...props
}: React.ComponentProps<"section"> & {
  surface?: Surface
  /** Rythme vertical réduit, pour les sections d'appoint. */
  tight?: boolean
  /** Grain très léger. Réservé aux surfaces vert foncé. */
  grain?: boolean
  /** Image de fond avec voile de lisibilité. Absente par défaut. */
  image?: SectionImage
  /** Motif décoratif transparent en bordure, sans voile. Absent par défaut. */
  motif?: SectionMotif
  /** Quatre illustrations de coin transparentes. Absentes par défaut. */
  coins?: SectionCorners
}) {
  const voile = image?.voile ?? (surface === "deep" ? "sombre" : "clair")

  return (
    <section
      data-surface={SURFACE_ATTR[surface]}
      className={cn(
        "relative bg-background",
        tight ? "section-y-tight" : "section-y",
        grain && surface === "deep" && "grain",
        className
      )}
      {...props}
    >
      {image ? (
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          {/* Parallaxe douce sur le fond photo : le calque est légèrement
              plus haut que la section et glisse pendant la traversée. Jamais
              sur le fond du hero (règle absolue), uniquement ici, sur les
              sections de contenu. */}
          <ParallaxeFond>
            <Image
              src={image.srcMobile}
              alt=""
              fill
              sizes="100vw"
              className="object-cover sm:hidden"
            />
            <Image
              src={image.srcDesktop}
              alt=""
              fill
              sizes="100vw"
              className="hidden object-cover sm:block"
            />
          </ParallaxeFond>
          {/* Voile de lisibilité.

              `clair` était un aplat uni `bg-background/82` : un blanc cassé à
              82 % sur toute la surface, qui délavait complètement la photo au
              lieu de la laisser vivre derrière le texte (retour client :
              « une ombre blanche trop forte dessus »). Il devient un dégradé
              vertical, dense là où le texte commence et beaucoup plus léger en
              bas : la photo redevient perceptible sans que le contraste du
              texte descende sous le seuil AA, puisque le texte vit dans la
              partie haute et médiane de la section.

              `sombre` suit la même logique sur les surfaces `deep`, où le
              texte est blanc : dense en haut, plus ouvert en bas. */}
          <div
            className={cn(
              "absolute inset-0",
              voile === "photo" && "bg-black/20",
              voile === "sombre" &&
                "bg-gradient-to-b from-black/55 via-black/45 to-black/25",
              voile === "clair" &&
                "bg-gradient-to-b from-background/88 via-background/78 to-background/50"
            )}
          />
        </div>
      ) : null}
      {motif ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <Image
            src={motif.srcMobile}
            alt=""
            fill
            sizes="100vw"
            className="object-cover sm:hidden"
          />
          <Image
            src={motif.srcDesktop}
            alt=""
            fill
            sizes="100vw"
            className="hidden object-cover sm:block"
          />
          {motif.voileMobile ? (
            <div className="absolute inset-0 bg-background/60 sm:hidden" />
          ) : null}
        </div>
      ) : null}
      {coins ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {(Object.entries(coins) as [keyof SectionCorners, string | undefined][]).map(
            ([position, src]) =>
              src ? (
                /* Dérive parallaxe légère, sens alterné haut/bas pour que
                   les quatre coins ne bougent pas d'un seul bloc. */
                <ParallaxeFlottant
                  key={position}
                  direction={position.startsWith("top") ? 1 : -1}
                  amplitude={16}
                  className={cn(
                    "absolute size-[clamp(9rem,22vw,18rem)]",
                    CORNER_POSITION[position]
                  )}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 18rem, 22vw"
                    className="object-contain"
                  />
                </ParallaxeFlottant>
              ) : null
          )}
        </div>
      ) : null}
      <div className="container-site relative">{children}</div>
    </section>
  )
}

/**
 * En-tête de section : libellé, titre, chapô.
 *
 * Pas de numéros d'étapes décoratifs (01 / 02 / 03) que produisent la plupart
 * des maquettes : ici, seule la timeline du parcours est numérotée, parce
 * qu'elle est réellement une séquence.
 */
export function SectionHeading({
  eyebrow,
  eyebrowIcone,
  titre,
  lead,
  leadPleineLargeur = false,
  leadClassName,
  niveau = 2,
  centre = false,
  className,
  children,
}: {
  eyebrow?: string
  /** Icône posée dans un petit cadre avant le libellé. Voir components/eyebrow.tsx. */
  eyebrowIcone?: IconName
  titre: React.ReactNode
  lead?: React.ReactNode
  /**
   * Désactive `measure` (68ch) sur le chapô. Réservé aux sections dont le
   * contenu qui suit est déjà large (ex. les deux panneaux métiers de
   * /equipe) : la ligne de lecture confortable reste la règle par défaut,
   * ce prop est l'exception explicite plutôt qu'un changement global.
   */
  leadPleineLargeur?: boolean
  /**
   * Surcharge ponctuelle de la couleur du chapô (ex. blanc plein sur une
   * section `deep` à fort contraste). Par défaut `text-muted-foreground`,
   * déjà conforme AA sur toutes les surfaces : n'utiliser ce prop que pour
   * un besoin visuel explicite, pas comme raccourci systématique.
   */
  leadClassName?: string
  /** 1 uniquement quand la section EST le titre de page. */
  niveau?: 1 | 2 | 3
  centre?: boolean
  className?: string
  /** Action posée à droite du titre sur grand écran. */
  children?: React.ReactNode
}) {
  const Titre = `h${niveau}` as "h1" | "h2" | "h3"

  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col gap-5 lg:mb-16",
        centre && "items-center text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-4",
          children &&
            "lg:flex-row lg:items-end lg:justify-between lg:gap-10"
        )}
      >
        <div className={cn("flex flex-col gap-4", centre && "items-center")}>
          {eyebrow ? <Eyebrow icone={eyebrowIcone}>{eyebrow}</Eyebrow> : null}
          {/* Filet ocre tracé sous le titre, en SVG plutôt qu'en
              `border-bottom` : l'épaisseur varie sur la longueur et les
              extrémités sont irrégulières, ce qui donne un trait dessiné
              plutôt qu'un souligné d'éditeur de texte. Il marque les titres de
              section comme une signature du site, là où ils se distinguaient
              seulement par leur taille.
              Largeur limitée à une portion du titre et aligné à gauche (ou
              centré avec le titre) : il souligne le début du titre, il ne le
              barre pas. `aria-hidden` puisque purement décoratif. */}
          <div className={cn("flex flex-col gap-2.5", centre && "items-center")}>
            <Titre className={cn(!centre && "measure", centre && "mx-auto")}>
              {titre}
            </Titre>
            {/* Trait animé : se dessine de gauche à droite à l'entrée dans
                le viewport (voir components/motion/trait-titre.tsx). */}
            <TraitTitre className="h-2 w-32 text-accent sm:w-40" />
          </div>
        </div>
        {children ? <div className="shrink-0">{children}</div> : null}
      </div>

      {lead ? (
        <p
          className={cn(
            !leadPleineLargeur && "measure",
            "text-lg text-muted-foreground",
            centre && "mx-auto",
            leadClassName
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  )
}
