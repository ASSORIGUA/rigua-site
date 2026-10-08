import type { Metadata } from "next"
import Link from "next/link"

import { EmailLien } from "@/components/contact-info"
import { Icon } from "@/components/icon"
import { PageHero, pageHeroImage } from "@/components/page-hero"
import {
  ArticleLegal,
  SommaireLegal,
  ValeurLegale,
} from "@/components/prose-legal"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { legal } from "@/lib/site"

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Quelles données sont collectées par ce site, pourquoi, combien de temps elles sont conservées, et comment exercer vos droits.",
  alternates: { canonical: "/politique-de-confidentialite" },
}

const SOMMAIRE = [
  { id: "principe", titre: "Le principe" },
  { id: "collecte", titre: "Ce qui est collecté" },
  { id: "non-collecte", titre: "Ce qui n'est pas collecté" },
  { id: "finalite", titre: "À quoi cela sert" },
  { id: "base-legale", titre: "Base légale" },
  { id: "destinataires", titre: "Qui y a accès" },
  { id: "duree", titre: "Combien de temps" },
  { id: "cookies", titre: "Cookies et mesure d'audience" },
  { id: "securite", titre: "Sécurité" },
  { id: "droits", titre: "Vos droits" },
]

export default function PolitiqueDeConfidentialite() {
  return (
    <>
      <PageHero
        eyebrow="Vos données"
        eyebrowIcone="confidentialite"
        titre="Politique de confidentialité"
        image={pageHeroImage("politique-confidentialite")}
        fil={[{ href: "/", libelle: "Accueil" }]}
        lead={
          <p>
            Ce site collecte le strict minimum : de quoi vous rappeler, et de quoi
            comprendre votre situation. Cette page dit précisément quoi, pourquoi,
            pendant combien de temps, et comment le faire supprimer.
          </p>
        }
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[16rem_min(68ch,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SommaireLegal entrees={SOMMAIRE} />
          </div>

          <div className="flex min-w-0 flex-col">
            <Reveal className="pb-9">
              <Alert>
                <Icon name="confidentialite" />
                <AlertTitle>En une phrase</AlertTitle>
                <AlertDescription>
                  Aucun cookie, aucun traceur, aucune mesure d&apos;audience,
                  aucune revente. Les seules données traitées sont celles que vous
                  écrivez volontairement dans un formulaire, et elles servent
                  uniquement à vous répondre.
                </AlertDescription>
              </Alert>
            </Reveal>

            <ArticleLegal id="principe" numero={1} titre="Le principe : minimisation">
              <p>
                Le public de ce site est constitué de familles qui traversent un
                moment difficile, et les personnes concernées sont vulnérables. La
                règle appliquée est donc la plus stricte : ne demander que ce qui
                est indispensable au premier contact, et rien de plus.
              </p>
              <p>
                Concrètement, plusieurs informations que nous aurions pu demander
                ont été volontairement retirées du formulaire. Elles sont listées
                plus bas.
              </p>
            </ArticleLegal>

            <ArticleLegal id="collecte" numero={2} titre="Ce qui est collecté">
              <p>
                Uniquement via les formulaires de demande de rendez-vous et de
                rappel, et uniquement si vous les remplissez :
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "Votre prénom et votre nom",
                  "Votre numéro de téléphone",
                  "Votre adresse e-mail, si vous choisissez de la donner",
                  "Le moment de la journée où vous préférez être appelé",
                  "Votre lien avec la personne concernée",
                  "Le service qui vous intéresse et le type d'échange souhaité",
                  "Le délai dans lequel vous cherchez une solution",
                  "Le niveau GIR de la personne concernée, si vous choisissez de l'indiquer",
                  "La description de la situation que vous rédigez librement",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Icon
                      name="minus"
                      aria-hidden
                      className="mt-2 size-3 shrink-0 text-accent-ink"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Le niveau GIR est une information relative à l&apos;autonomie
                d&apos;une personne. Il est facultatif, et le formulaire le dit
                explicitement : ne pas le renseigner ne change rien à notre
                réponse.
              </p>
            </ArticleLegal>

            <ArticleLegal id="non-collecte" numero={3} titre="Ce qui n'est pas collecté">
              <ul className="flex flex-col gap-2">
                {[
                  "Le nom de la personne concernée : ce n'est pas utile pour un premier contact, et cette personne n'a pas consenti à ce que vous le transmettiez.",
                  "Aucun diagnostic, compte rendu médical, ordonnance ou document de santé. Le formulaire vous demande d'ailleurs de ne pas en écrire.",
                  "Aucune donnée bancaire. Aucun paiement n'est demandé avant la signature d'un devis.",
                  "Aucune adresse postale, aucune date de naissance, aucun numéro de sécurité sociale.",
                  "Aucune donnée de navigation à des fins publicitaires ou statistiques.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Icon
                      name="close"
                      aria-hidden
                      className="mt-1 size-4 shrink-0 text-urgent-on-surface"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ArticleLegal>

            <ArticleLegal id="finalite" numero={4} titre="À quoi cela sert">
              <p>
                À une seule chose : vous recontacter et traiter votre demande. Ces
                informations ne sont ni revendues, ni louées, ni utilisées à des
                fins commerciales ou publicitaires, ni exploitées pour constituer
                un fichier de prospection.
              </p>
            </ArticleLegal>

            <ArticleLegal id="base-legale" numero={5} titre="Base légale">
              <p>
                Votre consentement, recueilli par la case à cocher du formulaire.
                Sans cette case cochée, le formulaire n&apos;est pas transmis.
              </p>
              <p>
                Ce consentement peut être retiré à tout moment, sans avoir à se
                justifier, en nous le demandant.
              </p>
            </ArticleLegal>

            <ArticleLegal id="destinataires" numero={6} titre="Qui y a accès">
              <p>
                Les personnes de l&apos;association chargées de traiter les
                demandes, et elles seules.
              </p>
              <p>
                La transmission technique du formulaire passe par un service
                d&apos;acheminement de messages (Web3Forms), qui transmet la
                demande à notre boîte de réception sans l&apos;exploiter. Le site
                est hébergé par Vercel Inc. (États-Unis). Ces prestataires
                peuvent traiter des données en dehors de l&apos;Union
                européenne ; ces transferts sont encadrés par les clauses
                contractuelles types de la Commission européenne. Aucune donnée
                n&apos;est utilisée à d&apos;autres fins que le traitement de
                votre demande.
              </p>
              <p>
                Aucune donnée n&apos;est transmise à un réseau social, à un
                annonceur ou à un service d&apos;analyse d&apos;audience. Ce site
                ne charge aucun script tiers : les icônes et les polices sont
                servies depuis le site lui-même.
              </p>
            </ArticleLegal>

            <ArticleLegal id="duree" numero={7} titre="Combien de temps">
              <p>
                Votre demande est conservée le temps de la traiter, puis pendant{" "}
                <ValeurLegale
                  champ={legal.conservationDemandes}
                  libelle="Durée de conservation"
                />
                .
              </p>
              <p>
                Si votre demande n&apos;aboutit pas à un accompagnement, elle est
                supprimée sans que vous ayez à le demander.
              </p>
            </ArticleLegal>

            <ArticleLegal id="cookies" numero={8} titre="Cookies et mesure d'audience">
              <p>
                Ce site ne dépose aucun cookie. Ni cookie publicitaire, ni cookie
                de mesure d&apos;audience, ni traceur tiers, ni pixel de suivi.
              </p>
              <p>
                C&apos;est la raison pour laquelle vous ne voyez pas de bannière de
                consentement en arrivant : il n&apos;y a rien à consentir. Ces
                bannières sont une conséquence du pistage, pas une obligation en
                soi.
              </p>
            </ArticleLegal>

            <ArticleLegal id="securite" numero={9} titre="Sécurité">
              <p>
                Les échanges avec ce site sont chiffrés (HTTPS). Les formulaires
                sont protégés contre les envois automatisés sans recourir à un
                captcha : un captcha tiers transmettrait des données de navigation
                à un service extérieur, ce qui contredirait tout ce qui précède.
              </p>
            </ArticleLegal>

            <ArticleLegal id="droits" numero={10} titre="Vos droits">
              <p>
                Vous disposez d&apos;un droit d&apos;accès, de rectification,
                d&apos;effacement, de limitation et d&apos;opposition sur les
                données vous concernant, ainsi que du droit de retirer votre
                consentement.
              </p>
              <p>
                Pour les exercer, contactez l&apos;association par téléphone ou par
                e-mail. Aucune justification n&apos;est nécessaire pour demander
                l&apos;effacement d&apos;une demande.
              </p>
              <div className="flex flex-col gap-2">
                <EmailLien />
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 w-fit items-center font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4"
                >
                  Voir toutes nos coordonnées
                </Link>
              </div>
              <p>
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez
                introduire une réclamation auprès de la Commission nationale de
                l&apos;informatique et des libertés (CNIL), 3 place de Fontenoy,
                TSA 80715, 75334 Paris Cedex 07.
              </p>
            </ArticleLegal>
          </div>
        </div>
      </Section>
    </>
  )
}
