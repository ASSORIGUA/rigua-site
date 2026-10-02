"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

import { Icon } from "@/components/icon"
import { PhotoSlot } from "@/components/photo-slot"
import { Reveal } from "@/components/reveal"
import { Badge } from "@/components/ui/badge"
import {
  actualitesAffichables as actualitesParDefaut,
  dateLongue,
  type Actualite,
} from "@/lib/content/actions"
import { cn } from "@/lib/utils"

/**
 * Les actualités en grille filtrable, pour la page dédiée.
 *
 * Le carrousel de <ActualitesListe> reste le bon format sur l'accueil, où les
 * actualités sont un aperçu parmi d'autres sections. Sur la page Actualités
 * en revanche, c'est le contenu principal : un carrousel y oblige à faire
 * défiler horizontalement pour savoir ce qui existe, et ne permet pas de
 * chercher. D'où une grille, plus deux filtres.
 *
 * Filtres : par catégorie (les valeurs présentes, pas la liste théorique du
 * type) et par année (déduite des dates). Les deux se combinent. Les listes
 * sont construites à partir des entrées réelles : une catégorie sans article
 * n'apparaît jamais, et l'ajout d'une actualité ne demande aucune mise à jour
 * du filtre.
 *
 * Le tri reste antéchronologique dans tous les cas (déjà garanti par
 * `actualitesAffichables`), avec une bascule pour repartir des plus anciennes.
 */
export function ActualitesFiltrees({
  actualites: actualitesAffichables = actualitesParDefaut,
}: {
  /** La liste à afficher, fournie par la page (Sanity sinon défaut). */
  actualites?: Actualite[]
}) {
  const [categorie, setCategorie] = useState<string>("Toutes")
  const [annee, setAnnee] = useState<string>("Toutes")
  const [recent, setRecent] = useState(true)

  const categories = useMemo(() => {
    const vues = new Set(actualitesAffichables.map((actu) => actu.categorie))
    return ["Toutes", ...Array.from(vues)]
  }, [actualitesAffichables])

  const annees = useMemo(() => {
    const vues = new Set(
      actualitesAffichables.map((actu) => actu.date.slice(0, 4))
    )
    return ["Toutes", ...Array.from(vues).sort((a, b) => b.localeCompare(a))]
  }, [actualitesAffichables])

  const entrees = useMemo(() => {
    const filtrees = actualitesAffichables.filter((actu) => {
      const bonneCategorie = categorie === "Toutes" || actu.categorie === categorie
      const bonneAnnee = annee === "Toutes" || actu.date.startsWith(annee)
      return bonneCategorie && bonneAnnee
    })
    return recent
      ? filtrees
      : [...filtrees].sort((a, b) => a.date.localeCompare(b.date))
  }, [actualitesAffichables, categorie, annee, recent])

  /**
   * Sous trois actualités, filtrer n'a pas d'objet : les barres de filtre
   * prendraient plus de place que la liste qu'elles trient, et un filtre à
   * une seule valeur possible se lit comme une commande cassée. La page
   * publie alors la grille seule, et les filtres apparaissent d'eux-mêmes
   * dès que l'association a publié assez d'actualités.
   */
  const filtrable = actualitesAffichables.length >= 3

  return (
    <div className="flex flex-col gap-10">
      {filtrable ? (
        <div className="flex flex-col gap-5">
          {categories.length > 2 ? (
            <GroupeFiltre
              libelle="Sujet"
              valeurs={categories}
              actif={categorie}
              onChange={setCategorie}
            />
          ) : null}
          {annees.length > 2 ? (
            <GroupeFiltre
              libelle="Année"
              valeurs={annees}
              actif={annee}
              onChange={setAnnee}
            />
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
            <p aria-live="polite" className="text-base text-muted-foreground">
              {entrees.length}{" "}
              {entrees.length > 1 ? "actualités affichées" : "actualité affichée"}
            </p>
            <button
              type="button"
              onClick={() => setRecent((valeur) => !valeur)}
              className="flex min-h-11 items-center gap-2 rounded-md border border-line px-4 text-base font-medium transition-colors hover:border-primary"
            >
              <Icon name="agenda" aria-hidden className="size-5" />
              {recent ? "Plus récentes d'abord" : "Plus anciennes d'abord"}
            </button>
          </div>
        </div>
      ) : null}

      {entrees.length === 0 ? (
        <p className="measure text-base text-muted-foreground">
          Aucune actualité ne correspond à ce filtre. Choisissez un autre sujet
          ou une autre année.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {entrees.map((actu, index) => (
            <Reveal
              key={actu.slug}
              delay={Math.min(index, 5) * 60}
              className="h-full"
            >
              <CarteActualite actu={actu} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}

function GroupeFiltre({
  libelle,
  valeurs,
  actif,
  onChange,
}: {
  libelle: string
  valeurs: string[]
  actif: string
  onChange: (valeur: string) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
      <span className="eyebrow shrink-0 text-muted-foreground">{libelle} :</span>
      {valeurs.map((valeur) => {
        const selectionne = valeur === actif
        return (
          <button
            key={valeur}
            type="button"
            aria-pressed={selectionne}
            onClick={() => onChange(valeur)}
            className={cn(
              "min-h-11 rounded-md border-2 px-3 text-base font-medium transition-colors",
              selectionne
                ? "border-primary bg-primary text-primary-foreground"
                : "border-line text-foreground hover:border-primary"
            )}
          >
            {valeur}
          </button>
        )
      })}
    </div>
  )
}

function CarteActualite({
  actu,
}: {
  actu: Actualite
}) {
  return (
    <Link
      href={`/actualites/${actu.slug}`}
      className="group/carte flex h-full flex-col overflow-hidden rounded-xl border border-primary/40 bg-surface transition-colors duration-200 hover:border-primary"
    >
      <PhotoSlot
        ratio="4/3"
        description={actu.photo ?? "Un moment de l'événement décrit."}
        src={actu.photoSrc}
        alt={actu.photoAlt}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="rounded-none border-0 border-b border-primary/40"
      />

      <article className="flex flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary">{actu.categorie}</Badge>
          <time dateTime={actu.date} className="nums text-sm text-muted-foreground">
            {dateLongue(actu.date)}
          </time>
        </div>

        <h3 className="line-clamp-2 font-sans text-lg leading-snug font-semibold underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-200 group-hover/carte:decoration-accent">
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
