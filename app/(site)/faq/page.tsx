import type { Metadata } from "next"
import Link from "next/link"

import { Eyebrow } from "@/components/eyebrow"
import { Icon } from "@/components/icon"
import { JsonLd } from "@/components/json-ld"
import { PageHero, pageHeroImage } from "@/components/page-hero"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { FaqRecherche } from "@/components/sections/faq-recherche"
import { Button } from "@/components/ui/button"
import { getFaq, getPage, t } from "@/lib/cms"
import { jsonLdFaq } from "@/lib/jsonld"

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "Les réponses aux questions que les familles posent au téléphone : services proposés, publics accueillis, GIR, démarches, délais, tarifs et professionnels.",
  alternates: { canonical: "/faq" },
}

export default async function Faq() {
  const [doc, faq] = await Promise.all([getPage("pageFaq"), getFaq()])
  return (
    <>
      <PageHero
        eyebrow={t(doc, "heroEyebrow", "Questions fréquentes")}
        eyebrowIcone="question"
        titre={t(doc, "heroTitre", "Les questions que vous nous posez")}
        image={pageHeroImage("faq")}
        filCourant="Questions fréquentes"
        fil={[{ href: "/", libelle: "Accueil" }]}
        lead={
          <p>
            {t(
              doc,
              "heroLead",
              "Ce ne sont pas des questions inventées pour remplir une page : ce sont celles qui reviennent au téléphone, semaine après semaine. Les réponses sont volontairement complètes.",
            )}
          </p>
        }
      />

      <FaqRecherche groupes={faq} />

      {/* ---------- Question absente ---------- */}
      {/* Surface deep + fond photo : reprend le traitement visuel de CtaBand
          (retiré de cette page) puisque cette section en tient déjà le rôle
          de bloc de sortie final. */}
      <Section
        surface="deep"
        grain
        tight
        image={{
          srcMobile: "/img-bg/prendre-contact-bg-mobile.webp",
          srcDesktop: "/img-bg/prendre-contact-bg-desktop.webp",
        }}
      >
        <div className="flex flex-col gap-10">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow icone="question">
              {t(doc, "finEyebrow", "Votre question n'y est pas")}
            </Eyebrow>
            <h2>{t(doc, "finTitre", "Alors posez-la")}</h2>
            <p className="measure text-lg text-muted-foreground">
              {t(
                doc,
                "finTexte",
                "Cette page existe pour vous éviter un appel, pas pour le remplacer. Si votre situation ne ressemble à aucune des réponses ci-dessus, c'est une raison de nous joindre, pas de renoncer.",
              )}
            </p>
          </Reveal>
          <Reveal
            delay={70}
            className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Button size="lg" render={<Link href="/contact" />}>
              <Icon name="telephone-appel" aria-hidden />
              Nous joindre
            </Button>
            <Button
              variant="outline"
              size="lg"
              render={<Link href="/prendre-rendez-vous" />}
            >
              Prendre rendez-vous
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* Données structurées FAQPage : les questions sont réelles et les
          réponses validées, donc le balisage ne déclare rien de faux. */}
      <JsonLd data={jsonLdFaq(faq.flatMap((g) => g.questions))} />
    </>
  )
}
