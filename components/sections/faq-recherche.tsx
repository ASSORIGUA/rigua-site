"use client"

import * as React from "react"
import Link from "next/link"

import { Icon } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import type { GroupeFaq, Question } from "@/lib/content/faq"
import { cn } from "@/lib/utils"

/**
 * Normalisation pour la recherche : minuscules et accents retirés, pour
 * qu'une recherche sans accent ("gir", "medecin") trouve quand même les
 * questions accentuées. Le public visé tape souvent vite, au téléphone.
 */
function normaliser(texte: string) {
  return texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
}

function questionCorrespond(question: Question, requete: string) {
  if (!requete) return true
  const cible = normaliser(
    [question.question, ...question.reponse].join(" ")
  )
  /* Chaque mot de la requête doit apparaître quelque part : une recherche à
     plusieurs mots ("tarif domicile") ne doit pas exiger qu'ils se suivent. */
  return normaliser(requete)
    .split(/\s+/)
    .filter(Boolean)
    .every((mot) => cible.includes(mot))
}

/**
 * Passage en surbrillance de la portion de texte qui correspond à la
 * requête. Ne surligne que le premier mot de la requête, pour rester lisible
 * quand plusieurs mots sont tapés : l'objectif est d'aider l'œil à retrouver
 * la question, pas de reproduire un moteur de recherche complet.
 */
function surligner(texte: string, requete: string) {
  const mot = normaliser(requete).split(/\s+/).filter(Boolean)[0]
  if (!mot || mot.length < 2) return texte

  const cible = normaliser(texte)
  const index = cible.indexOf(mot)
  if (index === -1) return texte

  return (
    <>
      {texte.slice(0, index)}
      <mark className="rounded-sm bg-accent/40 text-inherit">
        {texte.slice(index, index + mot.length)}
      </mark>
      {texte.slice(index + mot.length)}
    </>
  )
}

export function FaqRecherche({ groupes }: { groupes: GroupeFaq[] }) {
  const [requete, setRequete] = React.useState("")
  const requeteActive = requete.trim().length > 0

  const resultats = React.useMemo(() => {
    if (!requeteActive) return groupes
    return groupes
      .map((groupe) => ({
        ...groupe,
        questions: groupe.questions.filter((q) => questionCorrespond(q, requete)),
      }))
      .filter((groupe) => groupe.questions.length > 0)
  }, [groupes, requete, requeteActive])

  const nombreResultats = resultats.reduce((total, g) => total + g.questions.length, 0)
  const inputId = React.useId()

  return (
    <>
      {/* ---------- Barre de recherche ----------
          Juste après le PageHero (jamais dedans), sur la même surface
          `papier` que la première section de questions qui suit juste en
          dessous : les deux blocs se fondent visuellement, sans coupure de
          fond entre la recherche et la liste. Non collante : une barre fixe
          pendant tout le défilement de la FAQ prenait trop de place à
          l'écran sur mobile, pour un gain d'usage marginal. */}
      <Section surface="papier" tight className="pb-0">
        <Reveal className="flex w-full max-w-2xl flex-col gap-3">
          <label htmlFor={inputId} className="font-semibold text-foreground">
            Rechercher une question
          </label>
          <div className="relative">
            <Icon
              name="search"
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id={inputId}
              type="search"
              value={requete}
              onChange={(event) => setRequete(event.target.value)}
              placeholder="Un mot-clé, ou votre question : « tarifs », « GIR », « accueil de jour »…"
              className="h-13 pl-12 pr-12 text-base [&::-webkit-search-cancel-button]:appearance-none"
              autoComplete="off"
            />
            {requeteActive ? (
              <button
                type="button"
                onClick={() => setRequete("")}
                aria-label="Effacer la recherche"
                className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <Icon name="close" aria-hidden className="size-5" />
              </button>
            ) : null}
          </div>
          <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
            {requeteActive
              ? nombreResultats > 0
                ? `${nombreResultats} question${nombreResultats > 1 ? "s" : ""} trouvée${nombreResultats > 1 ? "s" : ""}.`
                : "Aucune question ne correspond."
              : `${groupes.reduce((t, g) => t + g.questions.length, 0)} questions au total, classées par thème ci-dessous.`}
          </p>
        </Reveal>
      </Section>

      {/* ---------- Résultats ---------- */}
      {resultats.length > 0 ? (
        resultats.map((groupe, indexGroupe) => (
          <Section
            key={groupe.id}
            id={requeteActive ? undefined : groupe.id}
            surface={indexGroupe % 2 === 1 ? "warm" : "papier"}
            tight
            /* scroll-mt : l'en-tête est collant, sans quoi l'ancre place le titre
               sous la barre de navigation. */
            className="scroll-mt-24"
          >
            <Reveal className="mb-10 flex flex-col gap-4">
              <Badge variant="solid" className="h-8 px-3 text-sm normal-case">
                <span className="nums">
                  {String(indexGroupe + 1).padStart(2, "0")} sur{" "}
                  {String(resultats.length).padStart(2, "0")}
                </span>
              </Badge>
              <h2>{groupe.titre}</h2>
            </Reveal>

            <Reveal delay={70}>
              {/* Toutes les entrées ouvertes pendant une recherche : l'utilisateur
                  cherche déjà une réponse précise, un clic de plus n'aide pas.
                  `key` force le remontage (et donc la réinitialisation de l'état
                  ouvert/fermé) quand on repasse d'une recherche à la liste complète,
                  ou quand la liste filtrée change. */}
              <Accordion
                key={requeteActive ? `recherche-${groupe.questions.length}` : "complet"}
                multiple={requeteActive}
                defaultValue={
                  requeteActive ? groupe.questions.map((q) => q.question) : undefined
                }
              >
                {groupe.questions.map((question) => (
                  <AccordionItem key={question.question} value={question.question}>
                    <AccordionTrigger>
                      {requeteActive ? surligner(question.question, requete) : question.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-4">
                        {question.reponse.map((paragraphe) => (
                          <p key={paragraphe.slice(0, 40)} className="nums">
                            {paragraphe}
                          </p>
                        ))}
                        {question.lien ? (
                          <Link
                            href={question.lien.href}
                            className="group/lien flex min-h-11 w-fit items-center gap-2 font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4"
                          >
                            {question.lien.libelle}
                            <Icon
                              name="arrow-right"
                              aria-hidden
                              className="size-5 transition-transform duration-200 ease-brand group-hover/lien:translate-x-1"
                            />
                          </Link>
                        ) : null}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </Section>
        ))
      ) : (
        <Section surface="papier" tight>
          <Reveal className={cn("flex flex-col items-center gap-4 py-8 text-center")}>
            <span className="flex size-14 items-center justify-center rounded-md border border-line-strong text-accent-ink">
              <Icon name="search" aria-hidden className="size-6" />
            </span>
            <p className="measure text-lg text-muted-foreground">
              Aucune question ne correspond à «&nbsp;{requete}&nbsp;». Essayez un autre mot,
              ou posez-la directement : voir plus bas sur cette page.
            </p>
          </Reveal>
        </Section>
      )}
    </>
  )
}
