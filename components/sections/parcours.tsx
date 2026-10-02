import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { parcours } from "@/lib/content/association";

/**
 * Le parcours d'accompagnement, en timeline.
 *
 * Numéroté, et c'est le seul endroit numéroté du site : ces quatre étapes sont
 * réellement une séquence, l'ordre porte de l'information. Ailleurs, des
 * marqueurs 01 / 02 / 03 seraient décoratifs.
 *
 * La ligne verticale est un pseudo-élément sur le <li>, pas un élément à part :
 * elle s'arrête donc naturellement au dernier item, sans calcul de hauteur.
 */
export function Parcours() {
  return (
    <ol className="flex flex-col">
      {parcours.map((etape, index) => (
        <Reveal as="li" key={etape.titre} delay={index * 70}>
          <div className="relative flex gap-6 last:pb-0 sm:gap-8">
            {/* Colonne du repère : ligne verticale + pastille d'icône. */}
            <div className="relative flex shrink-0 flex-col items-center">
              <span className="flex size-14 items-center justify-center rounded-md border border-line bg-surface">
                <Icon
                  name={etape.icone}
                  aria-hidden
                  className="size-7 text-primary"
                />
              </span>
              {index < parcours.length - 1 ? (
                <span aria-hidden className="mt-3 w-0.5 flex-1 bg-line" />
              ) : null}
            </div>

            <div className="flex min-w-0 flex-col gap-4 pt-1 pb-6">
              <span className="step-num">
                Étape {index + 1} sur {parcours.length}
              </span>
              <h3 className="font-sans text-xl leading-snug font-semibold">
                {etape.titre}
              </h3>
              <p className="measure text-base text-muted-foreground">
                {etape.texte}
              </p>
              <p className="flex items-start gap-3 rounded-md border border-line bg-surface px-4 py-3 text-base">
                <Icon
                  name="check"
                  aria-hidden
                  className="mt-1 size-4 shrink-0 text-accent-ink"
                />
                <span>
                  <span className="font-semibold">
                    Ce que vous avez à faire :{" "}
                  </span>
                  <span className="text-muted-foreground">
                    {etape.votreRole}
                  </span>
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
