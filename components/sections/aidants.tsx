import { Icon } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import { fusionListe, getPage, t } from "@/lib/cms"
import { soutienAidants } from "@/lib/content/association"

/**
 * Soutien aux familles et aux aidants (brief §12.8).
 *
 * Cette section s'adresse directement au visiteur, pas à la personne
 * accompagnée : c'est presque toujours l'aidant qui lit le site, et son propre
 * épuisement est un motif de demande légitime.
 *
 * Grille de quatre cartes (deux par deux à partir de `sm`) à la place du rail
 * vertical précédent : le rail étirait quatre courtes idées sur toute la
 * hauteur d'un écran, avec beaucoup de blanc entre chaque (retour client).
 * Les quatre formes de soutien sont des propositions équivalentes, pas une
 * séquence ; la grille le dit mieux qu'une ligne qui les relie.
 *
 * Même gabarit de carte que le reste du site : fond blanc, bordure orange,
 * pastille verte à pictogramme blanc (palette inversée du projet :
 * `primary` est l'orange, `accent-solid` le vert du logo).
 */
export async function Aidants() {
  const doc = await getPage("pageAssociation")
  const points = fusionListe(doc?.aidantsPoints, soutienAidants.points)
  return (
    <div className="flex flex-col gap-8">
      <Reveal>
        <p className="measure text-lg leading-relaxed">
          {t(doc, "aidantsChapo", soutienAidants.chapo)}
        </p>
      </Reveal>

      <ul className="grid gap-4 sm:grid-cols-2">
        {points.map((point, index) => (
          <Reveal as="li" key={point.titre} delay={Math.min(index, 3) * 70}>
            <div className="flex h-full gap-4 rounded-md border-2 border-primary bg-white p-5 transition-colors duration-200 hover:border-primary/70">
              <span
                aria-hidden
                className="flex size-12 shrink-0 items-center justify-center rounded-md bg-accent-solid text-white"
              >
                <Icon name={point.icone} className="size-6" />
              </span>
              <div className="flex min-w-0 flex-col gap-1.5">
                <h3 className="font-sans text-lg leading-snug font-semibold text-black">
                  {point.titre}
                </h3>
                <p className="text-base text-cream-800">{point.texte}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  )
}
