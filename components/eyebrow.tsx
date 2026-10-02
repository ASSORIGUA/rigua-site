import { Icon, type IconName } from "@/components/icon"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

/**
 * Libellé de section : le composant `Badge` du design system, en aplat vert
 * émeraude plein et saturé (`--accent-solid`, jamais atténué), texte et
 * icône en `--accent-solid-foreground` (blanc). Remplace l'ancien
 * `<span className="eyebrow">texte</span>`, qui ne portait que la couleur et
 * l'interlettrage, sans aplat de fond.
 *
 * `--accent-solid` plutôt que `--accent` : sur `data-surface="deep"`, `--accent`
 * est délibérément éclairci (vert clair) pour rester lisible comme encre/trait
 * sur le fond marine — un aplat de badge n'a pas cette contrainte et doit au
 * contraire porter la teinte pleine du logo, pas une version atténuée.
 * `--accent-solid` vaut cette même teinte saturée sur toutes les surfaces.
 *
 * Taille de texte alignée sur l'utilitaire `eyebrow` de globals.css
 * (12px, interlettrage 0,14em) : ce composant reprend le gabarit visuel
 * déjà utilisé partout ailleurs pour un libellé de section, pas celui,
 * plus resserré, des badges de statut (GIR, type de rendez-vous). L'icône
 * est agrandie à 20px (`size-5`) : la taille par défaut du Badge (14px)
 * disparaissait à côté du texte en capitales.
 *
 * `icone` reste optionnelle : certains eyebrows (méta-navigation interne,
 * comme les blocs de contenu factuel ou juridique) n'ont pas de symbole
 * naturel et restent en texte seul plutôt que de forcer une icône arbitraire.
 */
export function Eyebrow({
  icone,
  children,
  className,
}: {
  icone?: IconName
  children: React.ReactNode
  className?: string
}) {
  return (
    <Badge
      className={cn(
        "h-auto w-fit justify-start gap-1.5 border-transparent bg-accent-solid px-2.5 py-1 text-left text-xs tracking-[0.14em] whitespace-normal text-accent-solid-foreground [&>svg]:size-5! [&>svg]:shrink-0",
        className
      )}
    >
      {icone ? <Icon name={icone} aria-hidden /> : null}
      {children}
    </Badge>
  )
}
