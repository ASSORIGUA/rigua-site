import type { Metadata } from "next"

import { Icon } from "@/components/icon"
import { Orienteur } from "@/components/orienteur"
import { PageHero, pageHeroImage } from "@/components/page-hero"
import { Reveal } from "@/components/reveal"
import { Section, SectionHeading } from "@/components/section"
import { CtaBand } from "@/components/sections/cta-band"
import { ServicesOnglets } from "@/components/sections/services-onglets"
import { Badge } from "@/components/ui/badge"
import { getPage, getServices, t } from "@/lib/cms"

/**
 * Nos services — page unique.
 *
 * Les quatre anciennes pages `/nos-services/[slug]` sont réunies ici, à la
 * demande du client, sur le modèle d'incendieoi.fr/services : un article
 * complet par prestation sur une seule page plutôt que quatre pages séparées
 * derrière un menu déroulant (voir aussi components/site-header.tsx et le
 * champ `enfants` retiré de `navigation` dans lib/site.ts).
 *
 * La barre de filtre de la référence (ancres « Hydrants & PI », « RIA »...)
 * devient ici une rangée de raccourcis vers les quatre ancres `#slug` posées
 * par chaque <ServiceBloc>. Pas de scroll-spy ni de mise en évidence de
 * section active : à seulement quatre entrées sur une page qu'on lit de haut
 * en bas, ce serait de la mécanique en plus pour un bénéfice qu'on ne verrait
 * pas.
 *
 * Chaque bloc alterne de surface (clair / marine foncé, voir plus bas) pour
 * rester lisible comme quatre articles distincts plutôt qu'un unique bloc de
 * texte continu, sans jamais répéter deux fois de suite la même surface
 * (règle du design system, voir components/section.tsx).
 */

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Quatre solutions d'accompagnement sur une seule page : service à la personne à domicile, accueil de jour, hébergement temporaire et hébergement d'urgence pour les personnes âgées ou dépendantes.",
  alternates: { canonical: "/nos-services" },
}

export default async function NosServices() {
  const [doc, services] = await Promise.all([
    getPage("pageServices"),
    getServices(),
  ])
  const comparerBlocs = (doc?.comparerBlocs ?? []) as {
    titre?: string
    texte?: string
  }[]
  return (
    <>
      <PageHero
        eyebrow={t(doc, "heroEyebrow", "Nos services")}
        eyebrowIcone="service-domicile"
        titre={t(doc, "heroTitre", "Quatre solutions, qui se combinent souvent")}
        image={pageHeroImage("nos-services")}
        filCourant="Nos services"
        fil={[{ href: "/", libelle: "Accueil" }]}
        lead={
          <p>
            {t(
              doc,
              "heroLead",
              "Une famille commence rarement par le bon service, et ce n'est pas grave : les quatre se combinent, et l'accompagnement change de forme quand la situation change. Vous n'avez pas à choisir seul.",
            )}
          </p>
        }
      />

      {/* ---------- Les quatre services, un à la fois ---------- */}
      {/* Les quatre <ServiceBloc> étaient empilés ici, chacun dans sa propre
          <Section> avec une surface alternée. Mesuré sur cette version :
          2 497 mots et 57 titres de niveau 3 pour la seule page, soit une
          vingtaine d'écrans sur mobile, avec le même gabarit répété quatre
          fois. L'alternance de surfaces cherchait à casser cette répétition,
          sans y parvenir : ce qui lasse n'est pas la couleur du fond mais le
          fait de relire quatre fois la même succession de sous-sections.
          Les onglets suppriment la cause plutôt que le symptôme (un seul
          service monté à la fois) et rendent au passage la barre de
          raccourcis utile pendant toute la lecture, puisqu'elle est
          collante. Voir components/sections/services-onglets.tsx. */}
      <ServicesOnglets services={services} />

      {/* ---------- Entrée par la situation ---------- */}
      {/* `deep` + voile `photo` : la photo reste pleinement visible sous un
          simple noir à 20 %, et la section bascule ses tokens de texte en
          clair pour rester lisible par-dessus. L'ancien `sand` + voile clair
          délavait l'image jusqu'à en faire un aplat beige. */}
      <Section
        surface="deep"
        image={{
          srcMobile: "/img-bg/nos-services-si-vous-hesitez-mobile.png",
          srcDesktop: "/img-bg/nos-services-si-vous-hesitez-desktop.png",
          voile: "photo",
        }}
      >
        <SectionHeading
          eyebrow={t(doc, "orienteurEyebrow", "Si vous hésitez")}
          eyebrowIcone="orienteur"
          titre={t(doc, "orienteurTitre", "Partez de votre situation")}
          lead={t(doc, "orienteurLead", "La même chose, formulée comme on la vit.")}
        />
        <Orienteur />
      </Section>

      {/* ---------- Ce que chaque service demande ---------- */}
      <Section>
        <SectionHeading
          eyebrow={t(doc, "comparerEyebrow", "Comparer")}
          titre={t(doc, "comparerTitre", "Où se trouve la personne, la nuit ?")}
          lead={t(
            doc,
            "comparerLead",
            "C'est la question qui distingue le plus clairement les quatre solutions. Le reste se décide à l'évaluation.",
          )}
        />

        <div className="flex flex-col">
          {[
            {
              titre:
                comparerBlocs[0]?.titre?.trim() ||
                "La personne dort chez elle, tous les soirs",
              services: ["Service à domicile", "Accueil de jour"],
              texte:
                comparerBlocs[0]?.texte?.trim() ||
                "Le domicile reste le lieu de vie. L'accompagnement s'ajoute par-dessus, quelques heures par semaine ou quelques journées.",
              icone: "service-domicile" as const,
            },
            {
              titre:
                comparerBlocs[1]?.titre?.trim() ||
                "La personne dort dans la structure, pour un temps défini",
              services: ["Hébergement temporaire", "Hébergement d'urgence"],
              texte:
                comparerBlocs[1]?.texte?.trim() ||
                "Le séjour a une date de début et une date de sortie prévue. Il ne s'agit pas d'une entrée définitive en établissement.",
              icone: "service-sejour" as const,
            },
          ].map((bloc, index) => (
            <Reveal key={bloc.titre} delay={index * 70}>
              <div className="flex flex-col gap-5 border-t border-line py-9 md:flex-row md:gap-12">
                <Icon
                  name={bloc.icone}
                  aria-hidden
                  className="size-11 shrink-0 text-primary"
                />
                <div className="flex min-w-0 flex-col gap-3">
                  <h3 className="font-sans text-xl leading-snug font-semibold">
                    {bloc.titre}
                  </h3>
                  <p className="measure text-base text-muted-foreground">
                    {bloc.texte}
                  </p>
                  <ul className="mt-1 flex flex-wrap gap-2">
                    {bloc.services.map((nom) => (
                      <li key={nom}>
                        <Badge className="h-auto gap-1.5 px-3 py-1.5 text-sm normal-case">
                          <Icon name="check" aria-hidden className="size-4!" />
                          {nom}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Parcours ---------- */}
      {/* La section « Le même parcours, quel que soit le service » (<Parcours>)
          vivait ici. Retirée : elle racontait la même séquence que la frise
          « Comment cela commence » de chaque fiche de service (contact,
          évaluation, proposition, organisation), en version abstraite juste
          après la version concrète. Deux sections d'étapes sur une même page
          faisaient lire deux fois le même déroulé.
          C'est la frise par service qui est conservée : elle est propre au
          service consulté, et donc plus utile qu'un parcours générique.
          L'ancre `#comment-cela-se-passe` est reprise par la frise dans
          components/sections/service-bloc.tsx, pour que le bouton « Voir le
          déroulé complet » de la page d'accueil continue de fonctionner.
          Le composant <Parcours> n'a plus d'appelant : la page d'accueil
          utilise <ParcoursApercu>, qui est un composant distinct. Il est
          conservé en l'état, prêt à resservir, plutôt que supprimé. */}
      <CtaBand
        {...(t(doc, "ctaTitre", "") ? { titre: t(doc, "ctaTitre", "") } : {})}
        {...(t(doc, "ctaTexte", "") ? { texte: t(doc, "ctaTexte", "") } : {})}
      />
    </>
  )
}
