import { Icon, type IconName } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import { fusionListe, getPage } from "@/lib/cms"
import { publics } from "@/lib/content/association"

/**
 * À qui s'adressent les services.
 *
 * Liste directe, sans interaction. La version précédente était un rang de six
 * pastilles cliquables (`role="tablist"`) qui révélaient une fiche de trois à
 * quatre lignes : sur téléphone, cela faisait six boutons à explorer un par un
 * pour lire six paragraphes, alors que l'information tient en une ligne par
 * profil (retour client). Les textes ont été raccourcis de moitié dans
 * lib/content/association.ts, et le GIR reste expliqué là où il apparaît.
 *
 * Pas de grille de cartes (règle #2 du design system) : des rangées séparées
 * par un filet, deux colonnes à partir de `sm`, pastille verte à pictogramme
 * blanc comme partout ailleurs sur le site.
 *
 * Palette inversée du projet (voir globals.css) : `accent-solid` est le vert
 * du logo, `primary` l'orange.
 */
const ICONES: Record<string, IconName> = {
  "Personnes âgées vivant seules": "accueil",
  "Personnes dépendantes ou fragiles": "soin",
  "Personnes isolées": "lien",
  "Personnes en situation de handicap": "autonomie",
  "Troubles cognitifs ou maladies apparentées": "soignant",
  "Retour à domicile différé": "hopital",
  "Proches et aidants": "famille",
}

export async function Publics() {
  const doc = await getPage("pageAssociation")
  const liste = fusionListe(doc?.publicsListe, publics)
  return (
    <ul className="grid gap-x-10 sm:grid-cols-2">
      {liste.map((profil, index) => (
        <Reveal as="li" key={profil.titre} delay={Math.min(index, 3) * 60}>
          <div className="flex items-start gap-4 border-t border-white/25 py-5">
            <span
              aria-hidden
              className="flex size-11 shrink-0 items-center justify-center rounded-md bg-accent-solid text-white"
            >
              <Icon
                name={
                  ICONES[publics[Math.min(index, publics.length - 1)].titre] ?? "famille"
                }
                className="size-6"
              />
            </span>
            <div className="flex min-w-0 flex-col gap-1">
              <h3 className="font-sans text-lg leading-snug font-semibold">
                {profil.titre}
              </h3>
              <p className="text-base opacity-90">{profil.texte}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </ul>
  )
}
