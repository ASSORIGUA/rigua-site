import type { Metadata } from "next"
import Link from "next/link"

import { TelephoneLien } from "@/components/contact-info"
import { Eyebrow } from "@/components/eyebrow"
import { DemandeForm } from "@/components/forms/demande-form"
import { Icon } from "@/components/icon"
import { PageHero, pageHeroImage } from "@/components/page-hero"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPage, t } from "@/lib/cms"
import { TYPES_RENDEZ_VOUS } from "@/lib/demande"

export const metadata: Metadata = {
  title: "Prendre rendez-vous",
  description:
    "Demandez un premier échange téléphonique, une visite de la structure ou une évaluation de la situation. Gratuit, sans engagement, sans document à fournir.",
  alternates: { canonical: "/prendre-rendez-vous" },
}

export default async function PrendreRendezVous() {
  const doc = await getPage("pageRdv")
  return (
    <>
      <PageHero
        eyebrow={t(doc, "heroEyebrow", "Prendre rendez-vous")}
        eyebrowIcone="agenda"
        titre={t(doc, "heroTitre", "Parlons de votre situation")}
        image={pageHeroImage("prendre-rendez-vous")}
        filCourant="Prendre rendez-vous"
        fil={[{ href: "/", libelle: "Accueil" }]}
        lead={
          <p>
            {t(
              doc,
              "heroLead",
              "Ce formulaire ne réserve pas automatiquement un créneau, et c'est volontaire : un rendez-vous se cale mieux en parlant. Nous vous rappelons pour convenir du moment qui vous arrange.",
            )}
          </p>
        }
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          {/* ---------- Formulaire ---------- */}
          <div className="flex min-w-0 flex-col">
            <Reveal>
              <Card className="p-2">
                <CardHeader className="gap-3">
                  <Eyebrow icone="agenda">Votre demande</Eyebrow>
                  <CardTitle>Dites-nous où vous en êtes</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-8">
                  <Alert>
                    <Icon name="info" />
                    <AlertTitle>Nous ne demandons que le nécessaire</AlertTitle>
                    <AlertDescription>
                      Aucun document médical, aucun compte rendu, aucune
                      ordonnance. Nous ne demandons pas non plus le nom de la
                      personne concernée : ce n&apos;est pas utile pour un
                      premier contact.
                    </AlertDescription>
                  </Alert>

                  <DemandeForm mode="rendez-vous" />
                </CardContent>
              </Card>
            </Reveal>
          </div>

          {/* ---------- Colonne d'appui ---------- */}
          <aside className="flex min-w-0 flex-col gap-10">
            <Reveal delay={70}>
              <Card className="p-2">
                <CardHeader className="gap-3">
                  <Eyebrow icone="telephone-appel">Vous préférez appeler ?</Eyebrow>
                  <CardTitle>C&apos;est souvent plus simple</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <p className="text-base text-muted-foreground">
                    {t(
                      doc,
                      "appelTexte",
                      "Un appel de quinze minutes remplace souvent un formulaire et deux échanges de messages. N'hésitez pas, même si vous ne savez pas encore quoi demander.",
                    )}
                  </p>
                  <TelephoneLien taille="grand" />
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={140}>
              <Card className="p-2">
                <CardHeader className="gap-3">
                  <Eyebrow icone="rencontre">Les quatre types d&apos;échange</Eyebrow>
                </CardHeader>
                <CardContent>
                  <dl className="flex flex-col gap-5">
                    {TYPES_RENDEZ_VOUS.map((type) => (
                      <div key={type.valeur} className="flex flex-col gap-1">
                        <dt className="font-semibold">{type.libelle}</dt>
                        <dd className="text-base text-muted-foreground">
                          {type.aide}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={210}>
              <Alert variant="urgent">
                <Icon name="warning" />
                <AlertTitle>Si c&apos;est urgent aujourd&apos;hui</AlertTitle>
                <AlertDescription>
                  <p>
                    Ce formulaire n&apos;est pas le bon canal : un message écrit
                    peut attendre plusieurs heures avant d&apos;être lu. Appelez-nous.
                  </p>
                  <div className="mt-4">
                    <Button
                      variant="urgent"
                      render={<Link href="/nos-services#hebergement-urgence" />}
                    >
                      Lire la procédure d&apos;urgence
                      <Icon name="arrow-right" aria-hidden />
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            </Reveal>
          </aside>
        </div>
      </Section>
    </>
  )
}
