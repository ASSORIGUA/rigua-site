import type { Metadata } from "next"
import Link from "next/link"

import { EmailLien, TelephoneLien } from "@/components/contact-info"
import { PageHero, pageHeroImage } from "@/components/page-hero"
import {
  ArticleLegal,
  SommaireLegal,
  ValeurLegale,
} from "@/components/prose-legal"
import { Section } from "@/components/section"
import { contact, estPublie, legal, site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Éditeur du site, hébergement, propriété intellectuelle, liens et responsabilité.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
}

const SOMMAIRE = [
  { id: "editeur", titre: "Éditeur du site" },
  { id: "responsable", titre: "Responsable de la publication" },
  { id: "hebergement", titre: "Hébergement" },
  { id: "propriete", titre: "Propriété intellectuelle" },
  { id: "responsabilite", titre: "Responsabilité" },
  { id: "liens", titre: "Liens vers d'autres sites" },
  { id: "donnees", titre: "Données personnelles et cookies" },
  { id: "litige", titre: "Droit applicable" },
]

export default function MentionsLegales() {
  return (
    <>
      <PageHero
        eyebrow="Informations légales"
        eyebrowIcone="legal"
        titre="Mentions légales"
        image={pageHeroImage("mentions-legales")}
        fil={[{ href: "/", libelle: "Accueil" }]}
        lead={
          <p>
            Éditeur du site, hébergement, propriété intellectuelle,
            responsabilité et données personnelles : tout ce que la loi demande
            de publier figure sur cette page.
          </p>
        }
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[16rem_min(68ch,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SommaireLegal entrees={SOMMAIRE} />
          </div>

          <div className="flex min-w-0 flex-col">
            <ArticleLegal id="editeur" numero={1} titre="Éditeur du site">
              <p>
                Le présent site est édité par{" "}
                <ValeurLegale
                  champ={legal.raisonSociale}
                  libelle="Nom officiel de l'association"
                />
                , {legal.formeJuridique.valeur}.
              </p>
              <p>
                Dénomination utilisée sur ce site : {site.nom} ({site.nomComplet}).
              </p>
              <ul className="flex flex-col gap-2">
                <li>
                  Numéro RNA :{" "}
                  <ValeurLegale champ={legal.rna} libelle="Numéro RNA" />
                </li>
                <li>
                  Numéro SIREN :{" "}
                  <ValeurLegale champ={legal.siren} libelle="Numéro SIREN" />
                </li>
                <li>
                  Siège social :{" "}
                  <ValeurLegale
                    champ={contact.adresse}
                    libelle="Adresse du siège"
                    rendu={(a) => `${a.rue}, ${a.codePostal} ${a.ville}`}
                  />
                </li>
              </ul>
              <div className="flex flex-col gap-2">
                <span>Contact :</span>
                {estPublie(contact.telephone) ? <TelephoneLien /> : null}
                <EmailLien />
              </div>
            </ArticleLegal>

            <ArticleLegal id="responsable" numero={2} titre="Responsable de la publication">
              <p>
                <ValeurLegale
                  champ={legal.representantLegal}
                  libelle="Nom du représentant légal"
                />
                , en qualité de représentant légal de l&apos;association.
              </p>
              <p>
                Toute demande relative au contenu de ce site peut être adressée à
                l&apos;association par téléphone ou par e-mail.
              </p>
            </ArticleLegal>

            <ArticleLegal id="hebergement" numero={3} titre="Hébergement">
              <p>
                Le site est hébergé par{" "}
                <ValeurLegale
                  champ={legal.hebergeur}
                  libelle="Identité de l'hébergeur"
                  rendu={(h) => `${h.nom}, ${h.adresse}, ${h.telephone}`}
                />
                .
              </p>
            </ArticleLegal>

            <ArticleLegal id="propriete" numero={4} titre="Propriété intellectuelle">
              <p>
                L&apos;ensemble des contenus de ce site, textes, mise en page,
                logo et éléments graphiques, est protégé par le droit
                d&apos;auteur. Toute reproduction ou représentation, totale ou
                partielle, sans autorisation écrite préalable est interdite.
              </p>
              <p>
                Les icônes sont issues du jeu Solar, distribué sous licence
                Creative Commons Attribution 4.0. Les polices Newsreader et
                Inclusive Sans sont distribuées sous SIL Open Font License 1.1.
              </p>
              <p>
                Aucune photographie de personne reconnaissable n&apos;est publiée
                sans autorisation écrite de l&apos;intéressé ou de son
                représentant légal. Une autorisation peut être retirée à tout
                moment, et la photographie est alors retirée du site.
              </p>
            </ArticleLegal>

            <ArticleLegal id="responsabilite" numero={5} titre="Responsabilité">
              <p>
                Les informations publiées sur ce site sont fournies à titre
                indicatif. Elles ne constituent ni un diagnostic, ni un conseil
                médical, ni un engagement contractuel.
              </p>
              <p>
                En particulier, aucune information figurant sur ce site ne vaut
                garantie d&apos;admission, de disponibilité d&apos;une place, de
                délai de prise en charge ou de tarif. Ces éléments sont
                déterminés au cas par cas, après évaluation de la situation, et
                confirmés par écrit.
              </p>
              <p>
                En cas d&apos;urgence vitale, composez le 15 ou le 112. Ce site
                n&apos;est pas un service d&apos;urgence.
              </p>
            </ArticleLegal>

            <ArticleLegal id="liens" numero={6} titre="Liens vers d'autres sites">
              <p>
                Ce site peut renvoyer vers des sites tiers, notamment
                institutionnels. L&apos;association n&apos;exerce aucun contrôle
                sur leur contenu et ne saurait en être tenue responsable.
              </p>
            </ArticleLegal>

            <ArticleLegal id="donnees" numero={7} titre="Données personnelles et cookies">
              <p>
                Le traitement des données transmises par les formulaires est
                décrit dans la{" "}
                <Link
                  href="/politique-de-confidentialite"
                  className="font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4"
                >
                  politique de confidentialité
                </Link>
                .
              </p>
              <p>
                Ce site ne dépose aucun cookie publicitaire, aucun cookie de
                mesure d&apos;audience et aucun traceur tiers. Aucune bannière de
                consentement n&apos;est donc nécessaire : il n&apos;y a rien à
                consentir.
              </p>
            </ArticleLegal>

            <ArticleLegal id="litige" numero={8} titre="Droit applicable">
              <p>
                Le présent site est soumis au droit français. En cas de litige, et
                à défaut de résolution amiable, les tribunaux français sont seuls
                compétents.
              </p>
            </ArticleLegal>
          </div>
        </div>
      </Section>
    </>
  )
}
