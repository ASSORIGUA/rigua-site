import Link from "next/link"

import { Eyebrow } from "@/components/eyebrow"
import { Icon } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { getFaq, getPage, t } from "@/lib/cms"

/** Quatre questions représentatives, une par thème : services, publics, démarches, coût. */
const QUESTIONS_ACCUEIL = [
  "Quels services proposez-vous ?",
  "Qui pouvez-vous accueillir ?",
  "Comment déposer une demande ?",
  "Quels sont les tarifs ?",
]

/**
 * Aperçu de la FAQ sur la page d'accueil.
 *
 * Volontairement pas le même patron que /faq (accordéon centré pleine
 * largeur, groupé par thème) : ici, colonne fixe à gauche (titre, contexte,
 * lien vers la page complète) et accordéon à droite. Les deux pages
 * utilisent le même <Accordion> (Base UI, voir components/ui/accordion.tsx) ;
 * seule la disposition autour change, pour que l'accueil ne ressemble pas à
 * un résumé de la page FAQ mais à une entrée en matière.
 *
 * Quatre questions parmi celles réellement posées au téléphone (brief §2),
 * une par thème. Le détail complet vit sur /faq.
 *
 * Le bouton "Voir toutes les questions" est rendu deux fois, chacun visible
 * sur un seul breakpoint (`lg:hidden` / `hidden lg:block`) : sur mobile il
 * suit l'accordéon, en fin de section, plutôt qu'avant (un lien vers "plus
 * de questions" a plus de sens après avoir vu les quatre premières). Sur
 * `lg:`, il reste dans la colonne collante de gauche, avec le titre.
 */
export async function FaqApercu() {
  const doc = await getPage("pageAccueil")
  const groupes = await getFaq()
  const toutes = groupes.flatMap((g) => g.questions)
  const trouvees = QUESTIONS_ACCUEIL.map((intitule) =>
    toutes.find((q) => q.question === intitule)
  ).filter((q) => q !== undefined)
  /* Si le client a reformulé ses questions dans le Studio, les intitulés du
     code ne correspondent plus : on prend alors la première question de
     chacun des quatre premiers thèmes. */
  const questions =
    trouvees.length > 0
      ? trouvees
      : groupes.slice(0, 4).flatMap((g) => g.questions.slice(0, 1))

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
      <Reveal className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
        <Eyebrow icone="question">{t(doc, "faqEyebrow", "Questions fréquentes")}</Eyebrow>
        <h2>{t(doc, "faqTitre", "Ce que les familles nous demandent")}</h2>
        <p className="measure text-lg text-muted-foreground">
          {t(
            doc,
            "faqTexte",
            "Ce ne sont pas des questions inventées pour remplir une page : ce sont celles qui reviennent au téléphone.",
          )}
        </p>
        <Button className="hidden w-fit lg:inline-flex" render={<Link href="/faq" />}>
          Voir toutes les questions
          <Icon name="arrow-right" aria-hidden />
        </Button>
      </Reveal>

      <div className="flex flex-col gap-8">
        <Reveal delay={70}>
          <Accordion>
            {questions.map((question) => (
              <AccordionItem key={question.question} value={question.question}>
                <AccordionTrigger>{question.question}</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4">
                    {question.reponse.map((paragraphe) => (
                      <p key={paragraphe.slice(0, 40)} className="nums">
                        {paragraphe}
                      </p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal delay={140} className="flex justify-center lg:hidden">
          <Button className="w-fit" render={<Link href="/faq" />}>
            Voir toutes les questions
            <Icon name="arrow-right" aria-hidden />
          </Button>
        </Reveal>
      </div>
    </div>
  )
}
