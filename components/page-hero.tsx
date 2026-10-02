import Image from "next/image"
import * as React from "react"

import { Eyebrow } from "@/components/eyebrow"
import { type IconName } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

/**
 * Illustrations de coin transparentes du hero, une à gauche, une à droite.
 *
 * Même esprit que la prop `coins` de `components/section.tsx` : des PNG/WebP
 * à fond transparent, motif concentré dans un angle, centre vide pour le
 * titre. Ici deux fichiers par cadrage (`left`/`right`) et deux cadrages
 * (`desktop`/`mobile`), voir docs/prompts-hero-pages-secondaires.md pour la
 * génération. `object-contain`, jamais de recadrage.
 */
type PageHeroImage = {
  left: { desktop: string; mobile: string }
  right: { desktop: string; mobile: string }
}

/**
 * Construit les quatre chemins à partir du nom de base déposé dans
 * `public/page-hero/` (voir docs/prompts-hero-pages-secondaires.md).
 * Ex. `pageHeroImage("contact")` ->
 * `/page-hero/contact-hero-left-desktop.webp`, etc.
 */
export function pageHeroImage(nom: string): PageHeroImage {
  return {
    left: {
      desktop: `/page-hero/${nom}-hero-left-desktop.webp`,
      mobile: `/page-hero/${nom}-hero-left-mobile.webp`,
    },
    right: {
      desktop: `/page-hero/${nom}-hero-right-desktop.webp`,
      mobile: `/page-hero/${nom}-hero-right-mobile.webp`,
    },
  }
}

/**
 * En-tête des pages intérieures.
 *
 * Fond sable clair, jamais marine : les sections marine sont réservées aux
 * points d'appui à l'intérieur des pages et au pied de page. Un en-tête sombre
 * sur chaque page rendrait le site lourd, alors que le brief demande un univers
 * clair et lumineux (§10).
 *
 * Le fil d'Ariane visuel a été retiré ; `fil` et `filCourant` restent acceptés
 * uniquement pour nourrir le balisage JSON-LD `BreadcrumbList` (SEO, invisible)
 * généré à part dans chaque page via `jsonLdFilAriane`.
 */
export function PageHero({
  eyebrow,
  eyebrowIcone,
  titre,
  filCourant,
  fil,
  image,
  children,
  className,
}: {
  eyebrow?: string
  /** Icône posée dans un petit cadre avant le libellé. Voir components/eyebrow.tsx. */
  eyebrowIcone?: IconName
  titre: string
  /** Non affiché : conservé pour compatibilité avec les appels existants. */
  filCourant?: string
  lead?: React.ReactNode
  /** Non affiché : conservé pour compatibilité avec les appels existants. */
  fil?: { href: string; libelle: string }[]
  /** Illustrations de coin transparentes. Absentes par défaut (fond plat). */
  image?: PageHeroImage
  /** Actions posées sous le chapô. */
  children?: React.ReactNode
  className?: string
}) {
  void filCourant
  void fil

  return (
    <section
      data-surface="warm"
      className={cn("relative overflow-hidden bg-background pt-8", className)}
    >
      {image ? (
        /* Fond transparent des deux côtés : les motifs se posent en calque
           superposé (absolute), derrière le texte (`z-0` vs `z-10` sur le
           bloc de texte), plutôt que de leur réserver une bande dans le flux
           qui ajoute un vide de mise en page. Mobile : ancrés en haut du
           bandeau, assez grands pour rester lisibles (`object-contain`, pas
           de recadrage). Desktop : calage en coin, centré verticalement sur
           toute la hauteur du bandeau. */
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Fichiers mobile rognés sur leur bbox de contenu opaque (voir
              historique de génération) : le vide autour du dessin a déjà
              été éliminé à la source, `object-contain` seul suffit ici, plus
              besoin de zoom/scale compensatoire ni de grand conteneur. */}
          {/* Mobile : motifs réduits et atténués (`opacity-55`), pour rester
              un décor derrière le texte. À 36vw ils dépassaient le retrait du
              bloc de texte (26vw) et se lisaient au premier plan, à côté du
              titre, comme des icônes de contenu. */}
          <div className="absolute left-0 top-0 size-[clamp(6rem,24vw,8rem)] opacity-55 sm:hidden">
            <Image
              src={image.left.mobile}
              alt=""
              fill
              sizes="24vw"
              className="object-contain object-top-left"
            />
          </div>
          <div className="absolute right-0 top-0 size-[clamp(6rem,24vw,8rem)] opacity-55 sm:hidden">
            <Image
              src={image.right.mobile}
              alt=""
              fill
              sizes="28vw"
              className="object-contain object-top-right"
            />
          </div>
          <div className="absolute left-0 top-1/2 hidden size-[clamp(26rem,50vw,54rem)] -translate-y-1/2 sm:block">
            <Image
              src={image.left.desktop}
              alt=""
              fill
              sizes="(min-width: 1280px) 54rem, 50vw"
              className="object-contain object-left"
            />
          </div>
          <div className="absolute right-0 top-1/2 hidden size-[clamp(26rem,50vw,54rem)] -translate-y-1/2 sm:block">
            <Image
              src={image.right.desktop}
              alt=""
              fill
              sizes="(min-width: 1280px) 54rem, 50vw"
              className="object-contain object-right"
            />
          </div>
        </div>
      ) : null}
      <div
        className={cn(
          "container-site section-pb-tight relative z-10 flex flex-col gap-8",
          image && "pt-[clamp(4rem,18vw,6rem)] sm:pt-0"
        )}
      >
        <Reveal className="flex flex-col gap-5">
          {eyebrow ? <Eyebrow icone={eyebrowIcone}>{eyebrow}</Eyebrow> : null}
          <h1 className="measure">{titre}</h1>
          {/* Le chapô (`lead`) n'est plus rendu, sur décision client : chaque
              page commençait par un paragraphe d'introduction avant son
              contenu, jugé inutile à lire et lourd à défiler. La prop reste
              acceptée pour ne pas casser les pages qui la passent encore ; le
              texte qui mérite d'être conservé est à déplacer dans la première
              section de la page concernée, pas ici. */}
          {children ? (
            <div className="mt-3 flex flex-wrap items-center gap-4">{children}</div>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}
