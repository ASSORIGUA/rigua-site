"use client"

import * as React from "react"

import { Icon } from "@/components/icon"
import { cn } from "@/lib/utils"

/**
 * Note de cadrage pour les deux blocs « Modes de tarification » / « Ce qui
 * fait varier le montant » de app/tarifs/page.tsx, juste avant le
 * tableau/carousel qu'elle précède.
 *
 * Signature visuelle : un tampon de dossier, légèrement pivoté, posé sur le
 * coin de la carte — pas un bandeau d'alerte icône + texte sur fond teinté.
 * Cette page ne peut confirmer aucun chiffre (lib/site.ts, `aConfirmer`) :
 * le tampon rend cette idée visible comme un objet (« info » posée en marge
 * du dossier) plutôt que de la dire une fois de plus en toutes lettres. Le
 * corps de la carte reprend le filet pointillé d'un formulaire à valider ;
 * le tampon, en plein orange et légèrement désaxé, est la seule touche
 * décorative de la page — cohérent avec « dépenser l'audace à un seul
 * endroit ».
 *
 * Desktop (sm et plus) : texte affiché en entier, jamais de bouton. La note
 * tient sur une ou deux lignes courtes, l'espace ne manque pas.
 * Mobile : repliée à 2 lignes par défaut, « Voir plus » la déplie. Le
 * bouton n'existe que sous sm (`sm:hidden`), jamais un élément interactif
 * simplement masqué en CSS au-dessus.
 *
 * Volontairement un composant client isolé (pas tout app/tarifs/page.tsx) :
 * le reste de la page reste un Server Component, seul l'état déplié/replié
 * du mobile a besoin d'interactivité.
 */
export function TarifsInfoNote({
  texte,
  className,
}: {
  texte: React.ReactNode
  className?: string
}) {
  const [ouvert, setOuvert] = React.useState(false)

  return (
    <div
      className={cn(
        "relative rounded-md border border-dashed border-line-strong bg-surface p-4 pt-5 sm:py-3.5 sm:pr-32 sm:pl-5",
        className
      )}
    >
      {/* Le tampon : rectangle plein, pivoté, ancré au coin supérieur droit
          et débordant légèrement de la carte — l'objet qui porte tout le
          sens (« ceci reste à vérifier »). bg-accent-solid + son binôme
          accent-solid-foreground (blanc, --pa-paper) plutôt que bg-accent +
          accent-foreground : --accent est l'émeraude de signal et ne porte
          jamais de texte blanc (voir globals.css), alors qu'accent-solid est
          le vert saturé prévu précisément pour un aplat plein avec texte
          blanc dessus (même paire que components/eyebrow.tsx). Rotation
          fixe, aucune animation : ce n'est pas un badge d'état qui change,
          c'est une marque posée une fois. */}
      <span
        aria-hidden
        className="absolute -top-3 -right-2 flex -rotate-6 items-center gap-1.5 rounded-md bg-accent-solid px-2.5 py-1.5 shadow-raised sm:top-1/2 sm:right-4 sm:-translate-y-1/2"
      >
        <Icon name="info" aria-hidden className="size-3.5 shrink-0 text-accent-solid-foreground" />
        <span className="font-sans text-[0.6875rem] leading-none font-bold tracking-widest text-accent-solid-foreground uppercase">
          Info
        </span>
      </span>

      <p
        className={cn(
          "text-sm text-muted-foreground sm:text-[0.9375rem]",
          !ouvert && "line-clamp-2 sm:line-clamp-none"
        )}
      >
        {texte}
      </p>

      {/* Bouton mobile uniquement : sous sm il porte le seul moyen de
          déplier la note ; au-dessus de sm elle est déjà entière et le
          bouton n'a plus de rôle, donc il n'est pas généré. */}
      <button
        type="button"
        onClick={() => setOuvert((v) => !v)}
        aria-expanded={ouvert}
        className="mt-2 flex min-h-11 items-center gap-1.5 rounded-md bg-secondary px-3 font-semibold text-accent-ink hover:bg-cream-300 hover:text-primary sm:hidden"
      >
        <Icon name="oeil" aria-hidden className="size-4 shrink-0" />
        {ouvert ? "Voir moins" : "Voir plus"}
      </button>
    </div>
  )
}
