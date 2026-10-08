/**
 * Layout racine du Studio Sanity.
 *
 * Le Studio est une application à part entière : il gère sa propre mise en
 * page et occupe tout l'écran. Il lui faut donc un layout racine distinct de
 * celui du site (`app/(site)/layout.tsx`), sans en-tête, pied de page, bouton
 * flottant ni styles globaux, sinon les deux mises en page se superposent et
 * l'interface d'édition devient inutilisable.
 *
 * Ce fichier porte ses propres `<html>` et `<body>` : c'est ce qu'exige un
 * second layout racine (voir la documentation Next.js sur les route groups).
 * Pas d'import de `globals.css` ici, volontairement : le Studio embarque sa
 * propre feuille de styles.
 */
export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
