import type { Metadata } from "next"

import { Eyebrow } from "@/components/eyebrow"
import { Icon } from "@/components/icon"
import { JsonLd } from "@/components/json-ld"
import { PageHero, pageHeroImage } from "@/components/page-hero"
import { PhotoSlot } from "@/components/photo-slot"
import { Reveal } from "@/components/reveal"
import { Section, SectionHeading } from "@/components/section"
import { CtaBand } from "@/components/sections/cta-band"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { EquipeCompetences } from "@/components/sections/equipe-competences"
import { getPage, t } from "@/lib/cms"
import { noteCompetences } from "@/lib/content/association"
import { estPublie, legal, site } from "@/lib/site"
import { jsonLdFilAriane } from "@/lib/jsonld"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Notre équipe",
  description:
    "L'équipe pluridisciplinaire de RIGUA : médecin référent, infirmiers, aides-soignants, kinésithérapeutes, orthophonistes, auxiliaires de vie et coach sportif qui accompagnent les personnes accueillies.",
  alternates: { canonical: "/equipe" },
}

/**
 * Ce qui peut faire une aide à domicile, confirmé par le livret d'accueil
 * officiel (§8 « Les intervenants »). Volontairement distinct de la liste des
 * prestations sur /nos-services#service-a-domicile : ici, on décrit ce qu'une
 * intervenante est habilitée à faire au fil de sa journée, pas le catalogue
 * de services que l'association propose.
 */
const INTERVENANTES_PEUVENT = [
  "Les courses et déplacements extérieurs, sur le territoire du lieu de vie",
  "L'aide à la préparation des repas, le service, la vaisselle",
  "Les soins sommaires d'hygiène et d'habillage",
  "Les transferts de position : se lever, se coucher, s'asseoir",
  "La vérification de la bonne prise médicamenteuse",
  "Le lavage et le repassage du linge de la personne accompagnée",
  "L'entretien courant du logement et du linge",
]

const INTERVENANTES_NE_FONT_PAS = [
  "Les soins qui exigent un diplôme officiel",
  "L'entretien des pièces inoccupées, caves, garages et greniers",
  "Recevoir une délégation de pouvoir, une donation ou un dépôt de valeurs",
  "Des tâches pour un tiers non concerné par la prise en charge",
]

export default async function Equipe() {
  const doc = await getPage("pageEquipe")
  const domPeuvent =
    Array.isArray(doc?.domPeuvent) && doc.domPeuvent.length > 0
      ? (doc.domPeuvent as string[]).filter((l) => l?.trim())
      : INTERVENANTES_PEUVENT
  const domNeFontPas =
    Array.isArray(doc?.domNeFontPas) && doc.domNeFontPas.length > 0
      ? (doc.domNeFontPas as string[]).filter((l) => l?.trim())
      : INTERVENANTES_NE_FONT_PAS
  const contCartes = (doc?.contCartes ?? []) as { titre?: string; texte?: string }[]
  return (
    <>
      <PageHero
        eyebrow={t(doc, "heroEyebrow", "Qui intervient")}
        eyebrowIcone="soignant"
        titre={t(doc, "heroTitre", "Une équipe pluridisciplinaire, pas une seule personne")}
        image={pageHeroImage("equipe")}
        filCourant="Notre équipe"
        fil={[{ href: "/", libelle: "Accueil" }]}
        lead={
          <p>
            {t(
              doc,
              "heroLead",
              `${site.nom} mobilise des professionnels aux compétences complémentaires : à domicile, une aide à domicile formée et encadrée ; au centre de répit, une équipe soignante coordonnée autour d'un projet de soins personnalisé.`,
            )}
          </p>
        }
      />

      {/* ---------- Gouvernance ---------- */}
      <Section>
        {/* `items-center` : le texte de cette section est court (trois lignes
            plus une mention), la photo bien plus haute. Aligné en haut, tout
            l'écart tombait sous le texte et laissait un grand vide à gauche.
            Centré, l'écart se répartit de part et d'autre. */}
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-6">
            <Reveal className="flex flex-col gap-5">
              <Eyebrow icone="famille">{t(doc, "gouvEyebrow", "Fondation et présidence")}</Eyebrow>
              <h2>{site.fondatrice.prenomNom}</h2>
            </Reveal>
            <Reveal delay={70} className="flex flex-col gap-5">
              <p className="nums text-lg leading-relaxed">
                {t(
                  doc,
                  "gouvTexte",
                  `${site.fondatrice.prenomNom} a fondé ${site.nom} en ${site.anneeCreation}, après avoir constaté comme ${site.fondatrice.profession} qu'une personne bien soignée mais seule ne va pas bien. Elle préside aujourd'hui l'association.`,
                )}
              </p>
              {estPublie(legal.representantLegal) ? (
                <div className="flex items-start gap-3 border-t border-line pt-5">
                  <Icon
                    name="famille"
                    aria-hidden
                    className="mt-0.5 size-5 shrink-0 text-accent-ink"
                  />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Représentante légale
                    <br />
                    <span className="font-semibold text-foreground">
                      {legal.representantLegal.valeur}
                    </span>
                  </p>
                </div>
              ) : null}
            </Reveal>
          </div>

          {/* Largeur bornée et calage à droite : à pleine largeur de colonne,
              le portrait dominait la section (retour client : « beaucoup trop
              grande »). */}
          <Reveal delay={140} className="w-full lg:max-w-[19rem] lg:justify-self-end">
            {/* Portrait vertical (1600 × 2974), cadre carré.
                Le 3/4 d'origine faisait près du double de la hauteur du texte
                et creusait un vide sous la colonne de gauche ; un 4/3 paysage
                ne laisserait voir que 40 % de la photo, recadrage bien trop
                serré pour un portrait en pied. Le carré en montre 54 % pour
                une hauteur égale à sa largeur, soit environ un tiers de moins
                que le 3/4. Point d'intérêt remonté au niveau du visage,
                qu'un cadrage centré coupait. */}
            <PhotoSlot
              ratio="1/1"
              ratioMobile="1/1"
              description="Un portrait ou une scène de la présidente en situation d'accompagnement, avec son autorisation écrite. À défaut, une photo du siège ou du centre de répit."
              src="/images/corrine-william.webp"
              alt="Corrine William, fondatrice et présidente de l'association"
              sizes="(min-width: 1024px) 22rem, 100vw"
              focus="50% 18%"
              className="border-2 border-emerald-500"
            />
          </Reveal>
        </div>
      </Section>

      {/* ---------- Équipe du centre de répit ---------- */}
      <Section surface="warm">
        <SectionHeading
          eyebrow={t(doc, "repitEyebrow", "Le centre de répit")}
          eyebrowIcone="soignant"
          titre={t(doc, "repitTitre", "Une équipe soignante coordonnée")}
          lead={t(
            doc,
            "repitLead",
            "Dès l'arrivée d'une personne accueillie, ces professionnels construisent avec elle et son médecin traitant un projet de soins personnalisé. Aucun nom, aucun diplôme individuel : les compétences sont décrites par métier.",
          )}
          leadPleineLargeur
        />
        <EquipeCompetences />
        <div className="mt-8 rounded-md border border-line-strong border-l-4 border-l-accent bg-surface p-6 sm:p-7">
          <p className="text-base text-muted-foreground">
            {t(doc, "noteCompetences", noteCompetences)}
          </p>
        </div>
      </Section>

      {/* ---------- Les intervenantes à domicile ---------- */}
      <Section
        surface="deep"
        grain
        image={{
          srcMobile: "/img-bg/equipe-service-domicile-mobile.png",
          srcDesktop: "/img-bg/equipe-service-domicile-desktop.png",
        }}
      >
        <SectionHeading
          eyebrow={t(doc, "domEyebrow", "Le service à domicile")}
          eyebrowIcone="service-domicile"
          titre={t(doc, "domTitre", "Ce que fait une aide à domicile, et ce qu'elle ne fait pas")}
          lead={t(
            doc,
            "domLead",
            "Les aides à domicile sont recrutées, encadrées et formées. Elles observent la plus stricte neutralité et respectent le mode de vie de chacun : ne les confondez pas avec une employée de maison.",
          )}
          leadPleineLargeur
        />
        {/* Deux accordéons fermés (règle client), côte à côte à partir de
            `lg`, à la place des deux colonnes toujours déroulées : la section
            était la plus haute de la page. Cartes blanches à couleurs fixes,
            posées sur un fond photo `deep` : les jetons de surface y
            pointeraient vers du blanc sur blanc. */}
        <div className="grid gap-4 lg:grid-cols-2 lg:items-start lg:gap-6">
          {[
            {
              cle: "peuvent",
              titre: "Ce qu'elles peuvent faire",
              icone: "check" as const,
              items: domPeuvent,
              note: null,
            },
            {
              cle: "ne-font-pas",
              titre: "Ce qu'elles ne font pas",
              icone: "error" as const,
              items: domNeFontPas,
              note: t(
                doc,
                "domNote",
                "En cas de doute sur une tâche, l'aide à domicile en réfère toujours à l'encadrement avant d'intervenir.",
              ),
            },
          ].map((groupe, groupeIndex) => (
            <Reveal key={groupe.cle} delay={groupeIndex * 70}>
              <Accordion>
                <AccordionItem
                  value={groupe.cle}
                  className="border-2 border-white/30 bg-white px-0 hover:border-accent-solid aria-expanded:border-accent-solid aria-expanded:bg-white aria-expanded:before:bg-accent-solid"
                >
                  <AccordionTrigger className="px-5 py-5 text-black hover:text-black sm:px-6 **:data-[slot=accordion-trigger-icon]:border-accent-solid **:data-[slot=accordion-trigger-icon]:text-accent-solid group-aria-expanded/accordion-item:**:data-[slot=accordion-trigger-icon]:bg-accent-solid group-aria-expanded/accordion-item:**:data-[slot=accordion-trigger-icon]:text-white">
                    <span className="flex min-w-0 items-center gap-4">
                      <span
                        aria-hidden
                        className="flex size-12 shrink-0 items-center justify-center rounded-md bg-accent-solid text-white"
                      >
                        <Icon name={groupe.icone} className="size-6" />
                      </span>
                      <span className="font-sans text-lg leading-snug font-semibold">
                        {groupe.titre}
                        <span className="nums ml-2 text-base font-medium text-cream-800">
                          {groupe.items.length} points
                        </span>
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 text-black sm:px-6">
                    <ul className="flex flex-col">
                      {groupe.items.map((item, index) => (
                        <li
                          key={item}
                          className={cn(
                            "flex items-start gap-3 py-3",
                            index > 0 && "border-t border-line"
                          )}
                        >
                          <Icon
                            name={groupe.icone}
                            aria-hidden
                            className="mt-1 size-4 shrink-0 text-accent-solid"
                          />
                          <span className="text-base text-cream-900">{item}</span>
                        </li>
                      ))}
                    </ul>
                    {groupe.note ? (
                      <p className="mt-2 border-t border-line pt-4 text-sm text-cream-800">
                        {groupe.note}
                      </p>
                    ) : null}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Continuité et remplacement ---------- */}
      {/* `sand` et non `deep` : la section précédente et le bandeau de contact
          qui suit sont tous deux en `deep`. Trois fonds vert foncé d'affilée
          effaçaient la rupture que cette surface est censée produire (règle
          du design system : jamais deux surfaces identiques à la suite). Les
          deux cartes imposent leur propre fond `bg-paper` et des couleurs
          fixes, elles rendent à l'identique sur l'une ou l'autre surface. */}
      <Section surface="sand">
        <SectionHeading
          eyebrow={t(doc, "contEyebrow", "Continuité du service")}
          eyebrowIcone="coordination"
          titre={t(doc, "contTitre", "La même personne, autant que possible")}
          lead={t(
            doc,
            "contLead",
            "La régularité d'un visage connu fait une grande partie de l'efficacité de l'accompagnement, en particulier lorsqu'il existe des troubles de la mémoire.",
          )}
        />
        {/* Deux idées courtes plutôt que deux paragraphes : une pastille
            d'icône (même langage que components/sections/aidants.tsx) réduit
            la densité de texte blanc sur ce fond vert profond, la section la
            plus chargée en lecture continue de la page. */}
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
          <Reveal className="flex flex-col gap-4 rounded-md border-2 border-accent bg-paper p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-accent-solid">
                <Icon name="evolution" aria-hidden className="size-6 text-accent-solid-foreground" />
              </span>
              <h3 className="font-sans text-lg font-semibold text-green-900">
                {contCartes[0]?.titre?.trim() || "En cas d'absence"}
              </h3>
            </div>
            <p className="text-base text-cream-800">
              {contCartes[0]?.texte?.trim() ||
                "Remplacement aux mêmes jours et heures, dans la mesure du possible, week-ends et jours fériés compris."}
            </p>
          </Reveal>
          <Reveal
            delay={70}
            className="flex flex-col gap-4 rounded-md border-2 border-accent bg-paper p-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-accent-solid">
                <Icon name="note" aria-hidden className="size-6 text-accent-solid-foreground" />
              </span>
              <h3 className="font-sans text-lg font-semibold text-green-900">
                {contCartes[1]?.titre?.trim() || "Le cahier de liaison"}
              </h3>
            </div>
            <p className="text-base text-cream-800">
              {contCartes[1]?.texte?.trim() ||
                "Attribué à chaque personne accompagnée, consulté et complété par tous les intervenants : aide à domicile, médecin, infirmière, famille."}
            </p>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        {...(t(doc, "ctaTitre", "") ? { titre: t(doc, "ctaTitre", "") } : {})}
        {...(t(doc, "ctaTexte", "") ? { texte: t(doc, "ctaTexte", "") } : {})}
      />

      <JsonLd
        data={jsonLdFilAriane([
          { nom: "Accueil", href: "/" },
          { nom: "Notre équipe", href: "/equipe" },
        ])}
      />
    </>
  )
}
