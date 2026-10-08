import type { Metadata } from "next";

import { Icon } from "@/components/icon";
import { PageHero, pageHeroImage } from "@/components/page-hero";
import { PhotoSlot } from "@/components/photo-slot";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeading } from "@/components/section";
import { Aidants } from "@/components/sections/aidants";
import { CtaBand } from "@/components/sections/cta-band";
import { OrigineCarte } from "@/components/sections/origine-carte";
import { Publics } from "@/components/sections/publics";
import { ValeurCarte } from "@/components/sections/valeur-carte";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { fusionListe, getPage, t } from "@/lib/cms";
import {
  charteQualite,
  explicationGir,
  origine,
  valeurs,
} from "@/lib/content/association";
import { estPublie, legal, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "L'association",
  description:
    "Une association loi 1901 fondée par une infirmière libérale pour compléter le soin par une présence humaine, sociale et médico-sociale auprès des personnes âgées et dépendantes.",
  alternates: { canonical: "/l-association" },
};

export default async function LAssociation() {
  const doc = await getPage("pageAssociation");
  const partisPris = fusionListe(doc?.partisBlocs, origine.paragraphes);
  const valeursListe = fusionListe(doc?.valeursListe, valeurs);
  return (
    <>
      <PageHero
        eyebrow={t(doc, "heroEyebrow", "Qui nous sommes")}
        eyebrowIcone="accueil"
        titre={t(doc, "heroTitre", "Une association née d'un constat de terrain")}
        image={pageHeroImage("association")}
        filCourant="L'association"
        fil={[{ href: "/", libelle: "Accueil" }]}
        lead={
          <p className="nums">
            {site.nomComplet} ({site.nom}) est une association loi 1901, fondée
            en {site.anneeCreation} par {site.fondatrice.prenomNom},{" "}
            {site.fondatrice.profession}.
          </p>
        }
      />

      {/* ---------- Origine ---------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-stretch lg:gap-16">
          <div className="flex flex-col gap-6">
            <Reveal className="flex flex-col gap-5">
              <h2>{t(doc, "origineTitre", "Le soin était assuré, et il manquait quelque chose")}</h2>
            </Reveal>
            <Reveal delay={70} className="flex flex-col gap-5">
              <p className="text-lg leading-relaxed">{t(doc, "origineConstat", origine.constat)}</p>
              <p className="text-lg leading-relaxed">{t(doc, "origineReponse", origine.reponse)}</p>
            </Reveal>
            {estPublie(legal.agrementSAP) ? (
              <Reveal delay={140}>
                <div className="flex flex-col gap-5 border-t border-line pt-6">
                  <div className="flex items-start gap-3">
                    <Icon
                      name="legal"
                      aria-hidden
                      className="mt-0.5 size-6 shrink-0 text-accent-ink"
                    />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Agrément Services à la Personne
                      <br />
                      <span className="font-semibold text-foreground">
                        {legal.agrementSAP.valeur}
                      </span>
                    </p>
                  </div>
                  <Separator />
                  <p className="measure text-sm leading-relaxed text-muted-foreground">
                    {t(doc, "charteQualite", charteQualite)}
                  </p>
                </div>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={140} className="flex lg:h-full">
            <PhotoSlot
              src="/images/association-salle-commune.webp"
              alt="La salle commune de la structure, avec des fauteuils et une table basse près de grandes baies vitrées donnant sur un jardin."
              ratio="4/3"
              remplirHauteur
              className="w-full"
              description="Un lieu de la structure, vide ou faiblement occupé : salle commune, entrée, jardin. Lumière naturelle, mobilier entretenu. Sert à montrer que le lieu existe et qu'il est soigné."
              sizes="(min-width: 1024px) 44vw, 100vw"
            />
          </Reveal>
        </div>
      </Section>

      {/* ---------- Ce qui nous distingue ---------- */}
      {/* `deep` + voile `photo` (noir à 20 %) à la place de `warm` + voile
          clair : la photo était délavée en un aplat beige et les cartes
          grises par-dessus ne se détachaient pas (retour client : « trop
          blanc, trop pâle, texte pas toujours lisible »). Le texte de la
          section passe en clair par les jetons de `deep` ; les cartes, elles,
          imposent leur propre fond blanc et des couleurs fixes. L'alternance
          des fonds de la page reste : uni, photo, uni, photo, uni. */}
      <Section
        surface="deep"
        image={{
          srcMobile: "/img-bg/l-association-partie-pris-mobile.png",
          srcDesktop: "/img-bg/l-association-partie-pris-desktop.png",
          voile: "photo",
        }}
      >
        <SectionHeading
          eyebrow={t(doc, "partisEyebrow", "Notre façon de travailler")}
          eyebrowIcone="demarche"
          titre={t(doc, "partisTitre", "Quatre partis pris")}
          lead={t(
            doc,
            "partisLead",
            "Chacun a une conséquence concrète sur ce que nous acceptons, et sur ce que nous refusons.",
          )}
        />

        {/* Sous sm, ces titres sont des phrases complètes (« Nous n'écartons
            pas les situations lourdes »), pas des libellés courts : même
            resserrée à w-28, la colonne de titre les cassait en une
            colonne étroite façon ransom note, plutôt qu'un tableau lisible
            — vérifié à 360px. Un carousel Embla (jamais de scroll-snap CSS
            maison, voir components/ui/carousel.tsx) par bloc à la place,
            chaque carte étant `OrigineCarte` : rangée de titre teintée,
            puis texte replié à 3 lignes avec un bouton « Voir plus » à
            chevron — les textes de ce bloc dépassent souvent 3 lignes sur
            une carte à 85% de la largeur, un repli par défaut évite qu'une
            carte déborde largement la hauteur de ses voisines dans le
            carousel. `basis-[85%]` fait dépasser la carte suivante (indice
            de glissement), CarouselDots reflète la position sans bouton
            précédent/suivant.

            À partir de sm, le tableau pleine largeur a été abandonné au
            profit du même motif de carte, non repliée : à la mesure, une
            colonne de titre assez large pour les phrases complètes
            écrasait la colonne de texte, et le filet horizontal entre
            lignes lisait comme un tableau de données plutôt qu'un propos
            éditorial. Les quatre cartes s'empilent en pleine largeur,
            chacune avec sa rangée de titre teintée et sa rangée de texte
            entière — assez de place en pleine largeur pour ne pas avoir
            besoin de replier. */}
        <Carousel opts={{ align: "start" }} className="sm:hidden">
          <CarouselContent>
            {partisPris.map((bloc) => (
              <CarouselItem key={bloc.titre} className="basis-[85%]">
                {/* h-full : CarouselContent pose items-stretch, mais la
                    carte doit elle-même remplir la hauteur de la rangée
                    la plus haute pour que les cadres bordés s'alignent. */}
                <OrigineCarte bloc={bloc} className="h-full" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-4" />
        </Carousel>

        <div className="hidden flex-col gap-4 sm:flex">
          {partisPris.map((bloc) => (
            <div
              key={bloc.titre}
              className="flex flex-col overflow-hidden rounded-md bg-white"
            >
              {/* Rangée de titre en aplat vert plein, texte du corps en
                  couleurs fixes : la carte est posée sur une photo, un
                  cadre gris et un fond `muted` ne s'en détachaient pas. */}
              {/* `bg-accent-solid` : le vert du logo, le même que sur toutes
                  les pastilles du site. `emerald-700` était un ton plus sombre
                  que partout ailleurs. */}
              <p className="flex items-center gap-2.5 bg-accent-solid px-5 py-3 font-sans text-lg leading-snug font-semibold text-accent-solid-foreground">
                <Icon
                  name={bloc.icone}
                  aria-hidden
                  className="size-6 shrink-0 text-white"
                />
                {bloc.titre}
              </p>
              <p className="nums px-5 py-4 text-base text-cream-800">{bloc.texte}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- Valeurs ---------- */}
      <Section>
        <SectionHeading
          eyebrow={t(doc, "valeursEyebrow", "Nos valeurs")}
          eyebrowIcone="dignite"
          titre={t(doc, "valeursTitre", "Six mots, et ce qu'ils engagent")}
          lead={t(
            doc,
            "valeursLead",
            "Le brief de ce projet en listait onze. Nous en avons gardé six : au-delà, une page de valeurs ne dit plus rien de particulier.",
          )}
        />

        {/* Sous md, 3 cartes par ligne n'ont plus la place (vérifié à
            768px) : chaque valeur devient une carte de carousel (Embla,
            comme app/tarifs et components/sections/publics), toutes rondes
            (l'alternance rond/carré est réservée à la grille desktop).

            Les cartes sont maintenant compactes (icône + titre, la
            description vit dans un popover au clic) : `basis-[45%]` montre
            l'amorce de deux cartes suivantes en guise d'indice de
            glissement plutôt que le `basis-[92%]` d'origine, calibré pour
            une carte pleine largeur. CarouselDots reflète la position sans
            jamais être cliquable : ce carousel n'a pas de bouton
            précédent/suivant. */}
        <Reveal className="md:hidden">
          <Carousel opts={{ align: "start" }}>
            <CarouselContent>
              {valeursListe.map((valeur) => (
                <CarouselItem key={valeur.titre} className="basis-[45%]">
                  <ValeurCarte valeur={valeur} arrondie />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots className="mt-5" />
          </Carousel>
        </Reveal>

        {/* Desktop/tablette large : 6 cartes, 3 par ligne. Les deux colonnes
            de côté sont arrondies, la colonne du milieu reste carrée — ce
            contraste de forme tient lieu de signature visuelle, plutôt
            qu'une grille de cartes identiques. items-center : sans lui, la
            grille étire la carte carrée (item unique de sa colonne) à la
            hauteur du cercle voisin, qui domine la rangée. */}
        <div className="hidden items-center gap-6 md:grid md:grid-cols-3">
          {valeursListe.map((valeur, index) => (
            <Reveal key={valeur.titre} delay={Math.min(index, 3) * 70}>
              <ValeurCarte valeur={valeur} arrondie={index % 3 !== 1} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Publics ---------- */}
      <Section
        surface="deep"
        grain
        image={{
          srcMobile: "/img-bg/l-association-qui-nous-accompagnon-mobile.png",
          srcDesktop: "/img-bg/l-association-qui-nous-accompagnon-desktop.png",
        }}
      >
        <SectionHeading
          eyebrow={t(doc, "publicsEyebrow", "Qui nous accompagnons")}
          eyebrowIcone="famille"
          titre={t(doc, "publicsTitre", "Nous n'écartons pas les situations lourdes")}
          lead={t(
            doc,
            "publicsLead",
            "Sous réserve de nos capacités d'accueil et de l'évaluation de chaque situation.",
          )}
        />
        <Publics />
        <Reveal className="mt-10">
          <p className="border-l-2 border-accent pl-5 text-base text-muted-foreground">
            <span className="font-semibold text-foreground">
              Qu&apos;est-ce que le GIR ?{" "}
            </span>
            {t(doc, "explicationGir", explicationGir)}
          </p>
        </Reveal>
      </Section>

      {/* ---------- Aidants ---------- */}
      <Section surface="sand">
        <SectionHeading
          eyebrow={t(doc, "aidantsEyebrow", "Familles et aidants")}
          eyebrowIcone="famille"
          titre={t(doc, "aidantsTitre", "En tant que proche, vous êtes accompagné aussi")}
        />
        <Aidants />
      </Section>

      <CtaBand
        {...(t(doc, "ctaTitre", "") ? { titre: t(doc, "ctaTitre", "") } : {})}
        {...(t(doc, "ctaTexte", "") ? { texte: t(doc, "ctaTexte", "") } : {})}
      />
    </>
  );
}
