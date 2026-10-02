import Link from "next/link"

import { TelephoneLien } from "@/components/contact-info"
import { Icon } from "@/components/icon"
import { PhotoSlot } from "@/components/photo-slot"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section"
import { BesoinsListe } from "@/components/sections/besoins-liste"
import { PourQui } from "@/components/sections/pour-qui"
import { Prestations } from "@/components/sections/prestations"
import { EtapesFrise } from "@/components/sections/etapes-frise"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import type { Service } from "@/lib/content/services"
import { cn } from "@/lib/utils"

/**
 * Un service, en entier, dans la page unique « Nos services ».
 *
 * Remplace les quatre anciennes pages `/nos-services/[slug]` (brief : « une
 * seule page services, plus de sous-pages, plus de menu déroulant »). Chaque
 * bloc porte son propre `id` (le slug du service) : c'est l'ancre que visent
 * désormais le header (bandeau urgence), le hero, l'Orienteur et le pied de
 * page, à la place d'une route dédiée.
 *
 * Structure inspirée de la page « Prestations » d'incendieoi.fr/services
 * (référence donnée par le client) : un chapô en tête d'article, une photo,
 * une liste de points vérifiables, une action « Appeler » + une action tarif.
 * Adaptée au ton et aux composants déjà validés du site plutôt que reprise
 * telle quelle : ici la « liste de points » reste `BesoinsListe` (déjà
 * conforme au design system, jamais une grille de cartes), le déroulé garde
 * sa numérotation d'étapes (accordéon, première étape ouverte), et les
 * prestations/pratique gardent leur propre traitement. Ce que la référence
 * apporte : tout tient sur UNE page, chaque service est un article complet
 * et autonome, terminé par un CTA double (parler à quelqu'un / voir le
 * tarif).
 *
 * Quatre services complets empilés font une page longue : Besoins et Pour
 * qui passent en carousel (jamais masqués, juste glissables), Déroulé et
 * Prestations en accordéon (repliés sauf le premier item). Voir le
 * commentaire de chaque sous-composant pour le détail.
 *
 * Alternance visuelle par index (pair/impair) via `inverse` : la photo passe
 * à droite un service sur deux, comme sur la référence, pour que la page ne
 * lise pas comme une liste répétitive alors que quatre services s'y
 * succèdent. Sous `lg`, tout s'empile dans le même ordre (photo puis texte).
 */
export function ServiceBloc({
  service,
  index,
  sombre = false,
}: {
  service: Service
  index: number
  /** La <Section> englobante est en `data-surface="deep"`. */
  sombre?: boolean
}) {
  const urgence = service.slug === "hebergement-urgence"
  const inverse = index % 2 === 1

  /**
   * Repères affichés sous le chapô. Uniquement des champs déjà confirmés dans
   * lib/content/services.ts : un champ absent ne produit aucune ligne, et rien
   * n'est reformulé en une valeur que le livret d'accueil ne dit pas. La règle
   * du projet est de ne jamais afficher une capacité, un horaire ou un délai
   * qui n'a pas été validé par l'association.
   */
  const reperes = [
    service.capacite
      ? { libelle: "Capacité", valeur: service.capacite }
      : null,
    service.horaires
      ? { libelle: "Horaires", valeur: service.horaires }
      : null,
  ].filter((repere): repere is { libelle: string; valeur: string } =>
    Boolean(repere)
  )

  return (
    <div id={service.slug} className="scroll-mt-24">
      <SectionHeading
        eyebrow={service.titreCourt}
        eyebrowIcone={service.icone}
        titre={service.phraseFamille}
        lead={service.resume}
      />

      {/* ---------- Avertissement, urgence uniquement ---------- */}
      {service.avertissement ? (
        <Reveal className="mb-10">
          <Alert variant="urgent">
            <Icon name="warning" />
            <AlertTitle>Ce que nous ne pouvons pas promettre</AlertTitle>
            <AlertDescription>
              <p>{service.avertissement}</p>
              <div className="mt-4">
                <TelephoneLien taille="grand" />
              </div>
            </AlertDescription>
          </Alert>
        </Reveal>
      ) : null}

      {/* ---------- Chapô, photo, repères ---------- */}
      {/* La photo remplit la hauteur de la colonne de texte (`remplirHauteur`)
          au lieu de garder un ratio fixe : à ratio fixe, la colonne la plus
          courte laissait un vide sous elle, très visible à partir de `lg`.
          Les trois repères sous le chapô (unité de facturation, horaires,
          capacité) sortent des sous-sections du bas, où ils étaient noyés en
          fin d'article : ce sont les premières questions posées au téléphone,
          elles méritent d'être lisibles sans défiler. Aucune donnée nouvelle,
          uniquement des champs déjà présents dans lib/content/services.ts, et
          rien ne s'affiche quand le champ n'est pas confirmé. */}
      <div
        className={cn(
          "grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16",
          inverse && "lg:[&>*:first-child]:order-2"
        )}
      >
        {service.photo ? (
          <Reveal>
            <PhotoSlot
              ratio="4/3"
              description={service.photo}
              src={service.photoSrc}
              alt={service.photoAlt}
              remplirHauteur
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </Reveal>
        ) : (
          <div aria-hidden className="hidden lg:block" />
        )}

        <Reveal delay={70} className="flex flex-col gap-6">
          <p className="text-lg leading-relaxed">{service.chapo}</p>

          {reperes.length > 0 ? (
            <dl className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3">
              {reperes.map((repere) => (
                <div
                  key={repere.libelle}
                  className="flex flex-col gap-1 bg-surface p-4"
                >
                  <dt className="eyebrow text-muted-foreground">
                    {repere.libelle}
                  </dt>
                  <dd className="font-sans text-base leading-snug font-semibold">
                    {repere.valeur}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant={urgence ? "urgent" : "default"}
              render={<Link href="/prendre-rendez-vous" />}
            >
              <Icon name="agenda" aria-hidden />
              Parler de votre situation
            </Button>
            <Button variant="outline" render={<Link href="/tarifs" />}>
              Voir le tarif
              <Icon name="arrow-right" aria-hidden />
            </Button>
          </div>
        </Reveal>
      </div>

      {/* ---------- Besoins ---------- */}
      <div className="mt-14 lg:mt-16">
        <SectionHeading
          niveau={3}
          eyebrow="Les besoins auxquels ce service répond"
          eyebrowIcone="question"
          titre={
            urgence
              ? "Comment nous traitons une situation urgente"
              : "Dans quels cas y faire appel"
          }
          className="mb-8 lg:mb-10"
        />
        <BesoinsListe besoins={service.besoins} sombre={sombre} />
      </div>

      {/* ---------- Déroulé ---------- */}
      {/* Frise d'étapes (components/sections/etapes-frise.tsx) : carrés
          numérotés reliés par un trait, texte visible sans clic. Deux
          versions précédentes ont été rejetées : une timeline dépliée trop
          longue, puis un accordéon dont les items, larges et plats, ne
          montraient que trois mots chacun. Les textes d'étapes ont été
          raccourcis dans lib/content/services.ts pour tenir dans une colonne
          de frise. */}
      {/* `id` repris de la section générique supprimée sur /nos-services : le
          bouton « Voir le déroulé complet » de la page d'accueil pointe sur
          cette ancre. */}
      {/* Panneau à fond propre (demande client : « mets-lui un autre
          arrière-plan »). `bg-secondary` est le crème du design system, une
          teinte plus soutenue que le papier de la section : le déroulé se
          détache du reste de la fiche sans introduire de couleur nouvelle. */}
      <div
        id="comment-cela-se-passe"
        className="mt-14 scroll-mt-32 rounded-md bg-secondary px-5 py-8 sm:px-8 sm:py-10 lg:mt-16"
      >
        <SectionHeading
          niveau={3}
          eyebrow="Comment cela se passe"
          eyebrowIcone="demarche"
          titre={urgence ? "Ce que vous faites, dans l'ordre" : "Comment cela commence"}
          className="mb-8 lg:mb-10"
        />
        <EtapesFrise etapes={service.deroule} cle={service.slug} />
      </div>

      {/* ---------- Pour qui ---------- */}
      <div className="mt-14 lg:mt-16">
        <PourQui profils={service.pourQui} sombre={sombre} />
      </div>

      {/* ---------- Prestations ---------- */}
      {/* Horaires et capacité ne sont plus repris ici : ils sont remontés dans
          les repères, sous le chapô. Les répéter en fin d'article ajoutait une
          sous-section de plus à un gabarit déjà long, pour une information que
          le lecteur a déjà croisée. */}
      {service.prestations ? (
        <div className="mt-14 lg:mt-16">
          <Prestations groupes={service.prestations} sombre={sombre} />
        </div>
      ) : null}
    </div>
  )
}
