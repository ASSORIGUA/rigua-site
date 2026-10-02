import type { Metadata } from "next"
import Link from "next/link"

import { Coordonnees, TelephoneLien } from "@/components/contact-info"
import { Eyebrow } from "@/components/eyebrow"
import { DemandeForm } from "@/components/forms/demande-form"
import { Icon } from "@/components/icon"
import { PageHero, pageHeroImage } from "@/components/page-hero"
import { Reveal } from "@/components/reveal"
import { Section, SectionHeading } from "@/components/section"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getPage, t } from "@/lib/cms"
import { actionPrincipale } from "@/lib/site"

/** Les quatre étapes par défaut de la section « Situation urgente ». */
const ETAPES_URGENCE = [
  {
    titre: "Si la personne est en danger immédiat",
    texte: "Appelez le 15 (SAMU) ou le 112. L'urgence vitale relève d'eux, pas de nous.",
  },
  {
    titre: "Sinon, appelez-nous, n'écrivez pas",
    texte:
      "Un message écrit peut attendre plusieurs heures avant d'être lu. Dans l'urgence, le téléphone est le seul canal adapté.",
  },
  {
    titre: "Dites-nous l'essentiel",
    texte:
      "Qui vous êtes et votre lien avec la personne, ce qui s'est passé, depuis quand, si elle est actuellement seule, et si un professionnel de santé suit déjà la situation.",
  },
  {
    titre: "Nous vous répondrons franchement",
    texte:
      "Oui, non, ou pas tout de suite. Si nous ne pouvons pas accueillir, nous cherchons avec vous vers qui vous tourner.",
  },
]

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Nous joindre par téléphone ou par e-mail, demander à être rappelé, et la procédure à suivre en cas de situation urgente.",
  alternates: { canonical: "/contact" },
}

export default async function Contact() {
  const doc = await getPage("pageContact")
  const etapesEditees = (doc?.urgenceEtapes ?? []) as { titre?: string; texte?: string }[]
  const etapesUrgence =
    etapesEditees.length > 0
      ? etapesEditees.map((item, i) => {
          const base = ETAPES_URGENCE[Math.min(i, ETAPES_URGENCE.length - 1)]
          return {
            titre: item.titre?.trim() || base.titre,
            texte: item.texte?.trim() || base.texte,
          }
        })
      : ETAPES_URGENCE
  return (
    <>
      <PageHero
        eyebrow={t(doc, "heroEyebrow", "Contact")}
        eyebrowIcone="telephone"
        titre={t(doc, "heroTitre", "Nous joindre")}
        image={pageHeroImage("contact")}
        fil={[{ href: "/", libelle: "Accueil" }]}
        lead={
          <p>
            {t(
              doc,
              "heroLead",
              "Le téléphone reste le meilleur canal : il permet de dire les choses qu'on n'écrit pas dans un formulaire. Si vous préférez que nous vous rappelions, laissez-nous simplement votre numéro.",
            )}
          </p>
        }
      />

      {/* ---------- Coordonnées + demande de rappel ---------- */}
      <Section>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="flex min-w-0 flex-col gap-10">
            <Reveal>
              <Card className="p-2">
                <CardHeader className="gap-3">
                  <Eyebrow icone="adresse">Coordonnées</Eyebrow>
                  <CardTitle>Nous appeler, nous écrire, venir</CardTitle>
                </CardHeader>
                <CardContent>
                  <Coordonnees />
                </CardContent>
              </Card>
            </Reveal>
          </div>

          {/* ---------- Formulaire court ---------- */}
          <div className="flex min-w-0 flex-col">
            <Reveal delay={70}>
              <Card className="p-2">
                <CardHeader className="gap-3">
                  <Eyebrow icone="telephone-appel">Être rappelé</Eyebrow>
                  <CardTitle>Quatre champs, pas plus</CardTitle>
                  <CardDescription>
                    Pour une demande détaillée ou un rendez-vous, utilisez plutôt
                    le{" "}
                    <Link
                      href={actionPrincipale.href}
                      className="font-semibold text-primary hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4"
                    >
                      formulaire de rendez-vous
                    </Link>
                    .
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DemandeForm mode="rappel" />
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------- Urgence ---------- */}
      <Section surface="warm">
        <SectionHeading
          eyebrow={t(doc, "urgenceEyebrow", "Situation urgente")}
          eyebrowIcone="warning"
          titre={t(doc, "urgenceTitre", "Ce qu'il faut faire, et dans quel ordre")}
          lead={t(
            doc,
            "urgenceLead",
            "Nous préférons vous dire tout de suite comment cela fonctionne réellement, plutôt que de laisser croire à une place garantie.",
          )}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <ol className="flex flex-col">
              {etapesUrgence.map((etape, index) => (
                <Reveal as="li" key={etape.titre} delay={Math.min(index, 3) * 70}>
                  <div className="flex items-center gap-6 border-t border-line py-6 sm:gap-8">
                    <span
                      className="nums flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold tabular-nums text-primary-foreground"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <div className="flex min-w-0 flex-col gap-2">
                      <h3 className="font-sans text-lg leading-snug font-semibold">
                        {etape.titre}
                      </h3>
                      <p className="measure text-base text-muted-foreground">
                        {etape.texte}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={70} className="flex flex-col gap-6">
            <Alert variant="urgent">
              <Icon name="warning" />
              <AlertTitle>{t(doc, "alerteTitre", "Aucune admission n'est garantie")}</AlertTitle>
              <AlertDescription>
                {t(
                  doc,
                  "alerteTexte",
                  "Un accueil peut être envisagé après évaluation de la situation. Nous ne pouvons pas promettre un accueil immédiat, et nous ne le promettrons pas.",
                )}
              </AlertDescription>
            </Alert>

            <div className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-6">
              <Eyebrow icone="telephone">Numéros d&apos;urgence nationaux</Eyebrow>
              <ul className="flex flex-col gap-2">
                {[
                  { numero: "15", tel: "tel:15", libelle: "SAMU, urgence médicale" },
                  { numero: "112", tel: "tel:112", libelle: "Numéro d'urgence européen" },
                  {
                    numero: "3977",
                    tel: "tel:3977",
                    libelle:
                      "Maltraitance envers les personnes âgées et les adultes en situation de handicap",
                  },
                ].map((u) => (
                  <li key={u.numero} className="flex items-start gap-3">
                    {/* min-h-11 : ce sont des numéros à composer dans
                        l'urgence, la cible doit être franche. */}
                    <a
                      href={u.tel}
                      className="nums inline-flex min-h-11 w-16 shrink-0 items-center text-xl font-bold text-primary underline decoration-accent decoration-2 underline-offset-4"
                    >
                      {u.numero}
                    </a>
                    <span className="self-center text-base text-muted-foreground">
                      {u.libelle}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              variant="outline"
              render={<Link href="/nos-services#hebergement-urgence" />}
            >
              Lire la page hébergement d&apos;urgence
              <Icon name="arrow-right" aria-hidden />
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* ---------- Rappel téléphone ----------
          Surface `deep`, comme la bande CTA de fin de page (components/sections/cta-band.tsx) :
          demandé explicitement pour aligner ces deux blocs d'appel à l'action.
          Fusionne avec le pied de page juste en dessous, lui aussi en vert
          foncé (rupture volontairement sacrifiée ici). */}
      <Section
        surface="deep"
        image={{
          srcMobile: "/img-bg/prendre-contact-bg-mobile.webp",
          srcDesktop: "/img-bg/prendre-contact-bg-desktop.webp",
        }}
      >
        <div className="flex flex-col items-start gap-6">
          <Reveal className="flex flex-col gap-4">
            <Eyebrow icone="telephone-appel">{t(doc, "finEyebrow", "Le plus direct")}</Eyebrow>
            <h2 className="text-2xl">
              {t(doc, "finTitre", "Un appel de quinze minutes suffit souvent")}
            </h2>
            <p className="measure text-lg text-muted-foreground">
              {t(
                doc,
                "finTexte",
                "Un premier échange suffit souvent à savoir quelle solution correspond. Il est gratuit et il n'engage à rien.",
              )}
            </p>
          </Reveal>
          <Reveal
            delay={70}
            className="flex shrink-0 items-center rounded-md border border-line bg-surface px-6 py-5"
          >
            <TelephoneLien taille="grand" libelle="Appelez-nous" souligne={false} />
          </Reveal>
        </div>
      </Section>
    </>
  )
}
