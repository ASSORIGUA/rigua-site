import type { Metadata } from "next"
import Link from "next/link"

import { Icon } from "@/components/icon"
import { PageHero, pageHeroImage } from "@/components/page-hero"
import { Reveal } from "@/components/reveal"
import { Section, SectionHeading } from "@/components/section"
import { Button } from "@/components/ui/button"
import { getPage, t } from "@/lib/cms"
import { dispositifsFinancement, modesTarification } from "@/lib/content/tarifs"

/**
 * Tarifs, version courte.
 *
 * La version précédente faisait 808 mots rendus pour zéro montant affiché :
 * un tableau à trois colonnes doublé d'un carrousel mobile, quatre étapes de
 * devis, trois engagements en accordéon, six dispositifs d'aide détaillés et
 * une liste de « ce qui reste à obtenir ». Une page qui explique longuement
 * pourquoi elle est vide se justifie elle-même au lieu de renseigner.
 *
 * La grille tarifaire est demandée à l'association (questionnaire, section
 * 1 : taux horaires, journée, nuitée, majorations, reste à charge, et le
 * choix entre prix exacts ou « à partir de »). En attendant, trois blocs :
 *  1. l'unité de facturation de chaque service, une ligne par service ;
 *  2. les aides qui peuvent s'appliquer, en liste, sans détail ;
 *  3. le bandeau de contact.
 * Rien d'autre. La règle du projet tient : aucun montant, aucun délai, aucune
 * promesse d'aide qui n'aurait pas été vérifiée pour la situation.
 *
 * Quand les tarifs arriveront, la colonne « unité » de la liste est l'endroit
 * naturel pour poser le montant, sans changer la structure de la page.
 */

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Comment se facture chaque service de l'association, quelles aides peuvent s'appliquer, et comment obtenir un devis écrit gratuit.",
  alternates: { canonical: "/tarifs" },
}

export default async function Tarifs() {
  const doc = await getPage("pageTarifs")
  const modesEdites = (doc?.modesListe ?? []) as {
    titre?: string
    texte?: string
    unite?: string
  }[]
  const modes =
    modesEdites.length > 0
      ? modesEdites.map((item, i) => {
          const base = modesTarification[Math.min(i, modesTarification.length - 1)]
          return {
            ...base,
            service: item.titre?.trim() || base.service,
            base: item.texte?.trim() || base.base,
            unite: item.unite?.trim() || base.unite,
          }
        })
      : modesTarification
  const aides =
    Array.isArray(doc?.aidesListe) && doc.aidesListe.length > 0
      ? (doc.aidesListe as string[]).filter((nom) => nom?.trim())
      : dispositifsFinancement.map((d) => d.nom)
  return (
    <>
      <PageHero
        eyebrow={t(doc, "heroEyebrow", "Tarifs")}
        eyebrowIcone="tarifs"
        titre={t(doc, "heroTitre", "Comment se facture chaque service")}
        image={pageHeroImage("tarifs")}
        filCourant="Tarifs"
        fil={[{ href: "/", libelle: "Accueil" }]}
        lead={
          <p>
            {t(
              doc,
              "heroLead",
              "La grille tarifaire est en cours de finalisation. Les montants sont communiqués lors du premier échange, puis confirmés par un devis écrit, gratuit et sans engagement.",
            )}
          </p>
        }
      />

      {/* ---------- Unité de facturation par service ---------- */}
      {/* Une rangée par service, empilée, plutôt qu'un tableau : un tableau à
          trois colonnes ne tenait pas sous 640px et exigeait un carrousel de
          secours. Ici la même mise en page sert à toutes les largeurs. À
          partir de `sm`, l'unité passe à droite sur la même ligne. */}
      <Section>
        <SectionHeading
          eyebrow={t(doc, "modesEyebrow", "Par service")}
          eyebrowIcone="service-domicile"
          titre={t(doc, "modesTitre", "Une unité de facturation par service")}
          lead={t(
            doc,
            "modesLead",
            "Le montant dépend du volume d'accompagnement réellement nécessaire, fixé après évaluation de la situation.",
          )}
        />

        <div className="flex flex-col">
          {modes.map((mode, index) => (
            <Reveal key={mode.slug} delay={Math.min(index, 3) * 60}>
              <Link
                href={`/nos-services#${mode.slug}`}
                className="group/ligne flex flex-col gap-3 border-t border-line py-6 transition-colors hover:bg-secondary/40 sm:flex-row sm:items-center sm:gap-8"
              >
                <span
                  aria-hidden
                  className="flex size-12 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground"
                >
                  <Icon name={mode.icone} className="size-6" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="font-sans text-lg leading-snug font-semibold underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover/ligne:decoration-accent">
                    {mode.service}
                  </span>
                  <span className="text-base text-muted-foreground">
                    {mode.base}
                  </span>
                </span>
                <span className="inline-flex w-fit shrink-0 items-center rounded-md border-2 border-accent px-3 py-1.5 text-base font-semibold text-accent-ink">
                  {mode.unite}
                </span>
              </Link>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>

        <Reveal className="mt-8 flex flex-wrap items-center gap-3">
          <Button render={<Link href="/prendre-rendez-vous" />}>
            <Icon name="agenda" aria-hidden />
            Demander un devis
          </Button>
          <Button variant="outline" render={<Link href="/nos-services" />}>
            Voir les services
            <Icon name="arrow-right" aria-hidden />
          </Button>
        </Reveal>
      </Section>

      {/* ---------- Aides financières ---------- */}
      {/* Liste des dispositifs, sans le détail de chacun : lequel s'applique
          dépend de la situation, et l'annoncer ici reviendrait à promettre
          une aide avant de l'avoir vérifiée. Le nom suffit pour qu'une famille
          reconnaisse un dispositif dont on lui a déjà parlé et sache qu'il
          peut être étudié. */}
      <Section
        surface="deep"
        image={{
          srcMobile: "/img-bg/tarifs-engagements-mobile.png",
          srcDesktop: "/img-bg/tarifs-engagements-desktop.png",
          voile: "photo",
        }}
      >
        <SectionHeading
          eyebrow={t(doc, "aidesEyebrow", "Aides financières")}
          eyebrowIcone="tarifs"
          titre={t(doc, "aidesTitre", "Ce qui peut réduire le reste à charge")}
          lead={t(
            doc,
            "aidesLead",
            "Selon la situation, un ou plusieurs de ces dispositifs peuvent s'appliquer. Nous vérifions lesquels avec vous, avant tout devis.",
          )}
        />

        <ul className="flex flex-wrap gap-3">
          {aides.map((nom, index) => (
            <li key={nom}>
              <Reveal
                delay={Math.min(index, 5) * 50}
                className="flex min-h-11 items-center gap-2.5 rounded-md bg-white px-4 py-2.5 font-sans text-base font-semibold text-black"
              >
                <Icon
                  name="check"
                  aria-hidden
                  className="size-5 shrink-0 text-emerald-700"
                />
                {nom}
              </Reveal>
            </li>
          ))}
        </ul>

        {/* L'appel à l'action final vit ici, pas dans un <CtaBand> séparé :
            le bandeau de contact est lui aussi en `deep` sur fond photo, et
            l'enchaîner juste après cette section posait deux fonds photo et
            deux surfaces identiques à la suite. La page se termine donc sur
            trois sections : uni, uni, photo. */}
        <Reveal className="mt-10 flex flex-col gap-4 border-t border-white/25 pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p className="measure text-lg leading-relaxed">
            {t(
              doc,
              "aidesFinal",
              "Le premier échange est gratuit : il permet de vous dire sur quelle base se facture le service qui vous concerne, puis d'établir un devis écrit.",
            )}
          </p>
          <Button
            size="lg"
            className="shrink-0"
            render={<Link href="/prendre-rendez-vous" />}
          >
            <Icon name="agenda" aria-hidden />
            Obtenir un devis
          </Button>
        </Reveal>
      </Section>
    </>
  )
}
