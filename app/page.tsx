import type { Metadata } from "next";
import Link from "next/link";

import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/section";
import { ActualitesListe } from "@/components/sections/actualites-liste";
import { AssociationApercu } from "@/components/sections/association-apercu";
import { CtaBand } from "@/components/sections/cta-band";
import { EnSavoirPlus } from "@/components/sections/en-savoir-plus";
import { FaqApercu } from "@/components/sections/faq-apercu";
import { HeroAccueil } from "@/components/sections/hero-accueil";
import { ParcoursApercu } from "@/components/sections/parcours-apercu";
import { PourquoiNous } from "@/components/sections/pourquoi-nous";
import { ServicesOrienteur } from "@/components/sections/services-orienteur";
import { Temoignages } from "@/components/sections/temoignages";
import { Button } from "@/components/ui/button";
import { getPage, t } from "@/lib/cms";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  /* Titre absolu : la page d'accueil porte la proposition complète plutôt
     qu'un « Accueil | ... » qui ne dit rien à personne dans un résultat de
     recherche. */
  title: {
    absolute: `${site.nom} | Accompagnement des personnes âgées, fragiles ou dépendantes`,
  },
  description:
    "Association loi 1901 fondée par une infirmière libérale : présence à domicile, accueil de jour, hébergement temporaire et solutions d'urgence pour les personnes âgées ou dépendantes, et soutien aux familles.",
  alternates: { canonical: "/" },
};

export default async function Accueil() {
  const doc = await getPage("pageAccueil");
  return (
    <>
      <HeroAccueil
        badge={t(doc, "heroBadge", "Personnes âgées, fragiles ou dépendantes")}
        titre={t(doc, "heroTitre", "Un accompagnement humain et adapté.")}
        texte={t(
          doc,
          "heroTexte",
          "À domicile, en accueil de jour ou en hébergement adapté : nous accompagnons les personnes âgées, fragiles ou dépendantes, et nous soutenons aussi leurs proches.",
        )}
        boutonServices={t(doc, "heroBoutonServices", "Découvrir nos services")}
        lienUrgence={t(doc, "heroLienUrgence", "Besoin d'une solution urgente ?")}
      />

      {/* ---------- Par quoi commencer ---------- */}
      <Section
        surface="warm"
        coins={{
          topLeft: "/assets/services-corner-top-left.png",
          topRight: "/assets/services-corner-top-right.png",
          bottomLeft: "/assets/services-corner-bottom-left.png",
          bottomRight: "/assets/services-corner-bottom-right.png",
        }}
      >
        <SectionHeading
          eyebrow={t(doc, "servicesEyebrow", "Services")}
          eyebrowIcone="service-domicile"
          titre={t(doc, "servicesTitre", "Reconnaissez-vous votre situation ?")}
          lead={t(
            doc,
            "servicesLead",
            "Vous n'avez pas besoin de savoir quel service demander. Chaque solution part de ce que vous vivez, pas d'un nom de service.",
          )}
          centre
          leadPleineLargeur
        />
        <ServicesOrienteur />
      </Section>

      {/* ---------- Comment cela se passe ---------- */}
      <Section
        surface="sand"
        image={{
          srcMobile: "/img-bg/comment-cela-se-passe-bg-mobile.webp",
          srcDesktop: "/img-bg/comment-cela-se-passe-bg-desktop.webp",
        }}
      >
        <SectionHeading
          eyebrow={t(doc, "parcoursEyebrow", "Comment cela se passe")}
          eyebrowIcone="demarche"
          titre={t(doc, "parcoursTitre", "Quatre étapes, du premier appel à l'accompagnement")}
          lead={t(doc, "parcoursLead", "Aucun document médical demandé pour poser une question.")}
          centre
          leadPleineLargeur
        />
        <ParcoursApercu />
      </Section>

      {/* ---------- L'association ---------- */}
      <Section
        coins={{
          topLeft: "/assets/association-corner-top-left.png",
          topRight: "/assets/association-corner-top-right.png",
          bottomLeft: "/assets/association-corner-bottom-left.png",
          bottomRight: "/assets/association-corner-bottom-right.png",
        }}
      >
        <AssociationApercu />
      </Section>

      {/* ---------- Pourquoi nous ---------- */}
      <Section
        surface="deep"
        grain
        image={{
          srcMobile: "/img-bg/pourquoi-nous-bg-mobile.webp",
          srcDesktop: "/img-bg/pourquoi-nous-bg-desktop.webp",
        }}
      >
        <SectionHeading
          eyebrow={t(doc, "pourquoiEyebrow", "Pourquoi nous")}
          eyebrowIcone="dignite"
          titre={t(doc, "pourquoiTitre", "Trois faits, pas un argumentaire")}
          lead={t(
            doc,
            "pourquoiLead",
            "Rien ici n'est une promesse commerciale : ce sont des faits vérifiables sur l'association.",
          )}
          leadClassName="text-foreground"
        />
        <PourquoiNous />
      </Section>

      {/* ---------- En savoir plus ---------- */}
      <Section
        surface="sand"
        coins={{
          topLeft: "/assets/en-savoir-plus-corner-top-left.png",
          topRight: "/assets/en-savoir-plus-corner-top-right.png",
          bottomLeft: "/assets/en-savoir-plus-corner-bottom-left.png",
          bottomRight: "/assets/en-savoir-plus-corner-bottom-right.png",
        }}
      >
        <SectionHeading
          eyebrow={t(doc, "allerEyebrow", "Aller plus loin")}
          eyebrowIcone="lien"
          titre={t(doc, "allerTitre", "Qui nous accompagnons, et comment")}
          lead={t(doc, "allerLead", "Chaque sujet mérite plus que quelques lignes : il a sa page.")}
        />
        <EnSavoirPlus />
      </Section>

      {/* ---------- Actualités ---------- */}
      <Section
        coins={{
          topLeft: "/assets/actualites-corner-top-left.png",
          topRight: "/assets/actualites-corner-top-right.png",
          bottomLeft: "/assets/actualites-corner-bottom-left.png",
          bottomRight: "/assets/actualites-corner-bottom-right.png",
        }}
      >
        <SectionHeading
          eyebrow={t(doc, "actuEyebrow", "Actualités")}
          eyebrowIcone="agenda"
          titre={t(doc, "actuTitre", "Ateliers, sorties, rencontres")}
          lead={t(
            doc,
            "actuLead",
            "L'association organise des activités au fil de l'année. Cette rubrique en rend compte.",
          )}
          centre
          leadPleineLargeur
        />
        <ActualitesListe
          limite={5}
          cta={
            <Button
              size="default"
              className="lg:hidden"
              render={<Link href="/actualites" />}
            >
              Actualités
              <Icon name="arrow-right" aria-hidden />
            </Button>
          }
        />

        <Reveal delay={210} className="mt-10 hidden justify-center lg:flex">
          <Button render={<Link href="/actualites" />}>
            Voir toutes les actualités
            <Icon name="arrow-right" aria-hidden />
          </Button>
        </Reveal>
      </Section>

      {/* ---------- Témoignages ---------- */}
      <Section
        surface="deep"
        grain
        image={{
          srcMobile: "/img-bg/la-vie-de-l-association-bg-mobile.webp",
          srcDesktop: "/img-bg/la-vie-de-l-association-bg-desktop.webp",
        }}
      >
        <SectionHeading
          eyebrow={t(doc, "temoEyebrow", "Elles en parlent")}
          eyebrowIcone="guillemet"
          titre={t(doc, "temoTitre", "Ce que disent les familles accompagnées")}
          lead={t(
            doc,
            "temoLead",
            "Trois avis parmi ceux recueillis auprès des familles, avec leur accord pour publication.",
          )}
          centre
        />
        <Temoignages />
      </Section>

      {/* ---------- FAQ, aperçu ---------- */}
      <Section
        surface="warm"
        coins={{
          topLeft: "/assets/faq-corner-top-left.png",
          topRight: "/assets/faq-corner-top-right.png",
          bottomLeft: "/assets/faq-corner-bottom-left.png",
          bottomRight: "/assets/faq-corner-bottom-right.png",
        }}
      >
        <FaqApercu />
      </Section>

      <CtaBand
        titre={t(doc, "ctaTitre", "Parlons de votre situation")}
        texte={t(
          doc,
          "ctaTexte",
          "Un premier échange suffit souvent à savoir quelle solution correspond. Il est gratuit et il n'engage à rien.",
        )}
      />
    </>
  );
}
