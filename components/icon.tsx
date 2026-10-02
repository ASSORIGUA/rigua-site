import { ICONS, type IconName } from "@/lib/icons/bundle";
import { cn } from "@/lib/utils";

export type { IconName };

type IconProps = Omit<
  React.ComponentPropsWithoutRef<"svg">,
  "children" | "dangerouslySetInnerHTML" | "viewBox"
> & {
  name: IconName;
  /**
   * Texte alternatif. Sans `label`, l'icône est traitée comme décorative et
   * masquée aux lecteurs d'écran : c'est le cas par défaut, une icône
   * accompagne presque toujours un texte déjà lisible.
   * À renseigner uniquement quand l'icône porte seule le sens (bouton
   * sans libellé, par exemple).
   */
  label?: string;
};

/**
 * Icône du design system. Rendue en SVG inline côté serveur : présente dans
 * le HTML initial, aucune requête réseau, aucun JavaScript.
 *
 * Taille : `1em` par défaut, donc l'icône suit la taille du texte qui
 * l'entoure. Passer une classe `size-*` pour forcer une taille.
 *
 * Le contenu injecté vient de lib/icons/bundle.ts, généré à la compilation
 * depuis @iconify-json/solar : ce n'est jamais une donnée utilisateur.
 *
 * Contrainte d'usage : ne jamais passer <Icon> à une prop `render` de Base UI.
 * `render` clone l'élément fourni et lui injecte des enfants, alors que <Icon>
 * définit `dangerouslySetInnerHTML` ; React refuse les deux à la fois et le
 * rendu échoue. Passer l'icône en enfant du composant Base UI à la place.
 */
export function Icon({ name, label, className, ...props }: IconProps) {
  const icon = ICONS[name];

  return (
    <svg
      viewBox={icon.viewBox}
      width="1em"
      height="1em"
      className={cn("inline-block shrink-0", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...props}
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}
