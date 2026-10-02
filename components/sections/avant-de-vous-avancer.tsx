import { Eyebrow } from "@/components/eyebrow"
import { Icon } from "@/components/icon"

/**
 * Note de clôture « Avant de vous avancer » — dernier bloc de la section
 * Aides financières sur app/tarifs/page.tsx.
 *
 * Signature visuelle : une carte de dossier pleine, détachée de
 * l'accordéon au-dessus par une vraie marge (posée par le conteneur
 * appelant, pas par ce composant) — pas un simple filet `border-t` au-dessus
 * de deux colonnes de texte nu, qui laissait ce dernier mot de la page se
 * fondre dans le fond warm environnant. Elle rejoint `tarifs-info-note.tsx`
 * sans en reprendre le motif (tampon rotatif) ni celui de
 * `engagements-accordion.tsx` (puce carrée numérotée) : cette page a déjà
 * utilisé un motif de dossier chacun, la carte de clôture devait en trouver
 * un troisième plutôt que de répéter.
 *
 * La liste de droite change de registre : plus des puces `minus` neutres,
 * mais de petites cases cochées (`check` sur fond papier, bordure en
 * tirets) qui rejouent la logique du formulaire — « voici ce qui reste à
 * cocher au premier échange » — cohérent avec le sens du texte de gauche.
 *
 * `bg-surface` : la carte reste plus claire que le fond `surface="warm"` de
 * la section, pour se détacher comme un papier posé dessus plutôt que de
 * fusionner avec lui.
 */
export function AvantDeVousAvancer({
  texte,
  items,
}: {
  texte: React.ReactNode
  items: string[]
}) {
  return (
    <div className="rounded-md border border-line-strong bg-surface shadow-raised p-6 sm:p-10">
      {/* Eyebrow sorti du flex à deux colonnes : il n'a pas d'équivalent
          côté liste, le garder dans la colonne de gauche décalait tout le
          texte d'une ligne par rapport aux puces de droite (voir capture :
          la 1ʳᵉ puce s'alignait sur le badge, pas sur « Nous ne pouvons
          pas… »). Posé en pleine largeur au-dessus, les deux colonnes
          démarrent alors toutes les deux à leur propre première ligne de
          contenu, au même niveau. */}
      <Eyebrow icone="info" className="mb-4 sm:mb-6">
        Avant de vous avancer
      </Eyebrow>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
        {/* lg:flex-1 (pas une largeur fixe) : la liste de droite ne fait
            jamais plus de ~340px de contenu réel (case cochée + texte le
            plus long, « Les modalités de facturation et de règlement »),
            mais lui donner tout l'espace restant du flex laissait un grand
            vide à droite de ce contenu — visible sur la capture à 1440px.
            En passant le texte de gauche en `flex-1` et la liste en
            `lg:w-auto lg:shrink-0` bornée à sa largeur de contenu, c'est la
            colonne de gauche qui récupère l'espace inutilisé : le texte
            s'étale sur des lignes plus longues au lieu de laisser du blanc
            de part et d'autre du séparateur. */}
        <p className="text-base text-muted-foreground lg:flex-1">{texte}</p>

        {/* Séparateur vertical desktop uniquement : sous lg les deux blocs
            s'empilent et un filet horizontal ferait doublon avec l'espace
            déjà posé par `gap-6`. */}
        <div aria-hidden className="hidden w-px shrink-0 bg-line lg:block" />

        <ul className="flex flex-col gap-3 lg:w-auto lg:shrink-0">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex size-6 shrink-0 items-center justify-center rounded-md border border-dashed border-accent-subtle bg-surface-warm"
              >
                <Icon name="check" aria-hidden className="size-3.5 text-accent-ink" />
              </span>
              <span className="text-base text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
