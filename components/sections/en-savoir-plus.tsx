import Link from "next/link"

import { Icon } from "@/components/icon"
import { Reveal } from "@/components/reveal"
import { LiensApercu } from "@/components/sections/liens-apercu"
import { Button } from "@/components/ui/button"
import { getPage } from "@/lib/cms"
import { actionPrincipale } from "@/lib/site"
import type { IconName } from "@/components/icon"

/** Les quatre sujets par défaut ; les textes sont éditables dans le Studio. */
const SUJETS: { titre: string; texte: string; href: string; icone: IconName }[] = [
  {
    titre: "Des situations, pas des catégories",
    texte:
      "Personnes âgées, dépendantes, fragiles ou isolées, et leurs proches : à qui nous nous adressons.",
    href: "/l-association",
    icone: "accessibilite",
  },
  {
    titre: "Un coût pensé service par service",
    texte:
      "Aucun tarif n'est publié tant qu'il n'est pas arrêté : ce que nous facturons, et pourquoi.",
    href: "/tarifs",
    icone: "tarifs",
  },
  {
    titre: "Un regard soignant, des moyens humains",
    texte:
      "Qui intervient et avec quelles compétences, fondé sur l'origine infirmière de l'association.",
    href: "/l-association",
    icone: "sante",
  },
  {
    titre: "En tant que proche, vous êtes accompagné aussi",
    texte:
      "Le soutien apporté aux familles et aux aidants, pas seulement à la personne accompagnée.",
    href: "/l-association",
    icone: "lien",
  },
]

/**
 * Aperçu « aller plus loin », sur la page d'accueil.
 *
 * Le détail (publics, parcours, compétences, aidants) vit sur /l-association
 * et /nos-services : ce bloc condense en un lien par sujet, pour ne pas
 * dupliquer une page entière.
 */
export async function EnSavoirPlus() {
  const doc = await getPage("pageAccueil")
  const edites = doc?.allerLiens as { titre?: string; texte?: string }[] | undefined
  const sujets =
    Array.isArray(edites) && edites.length > 0
      ? edites.map((item, i) => {
          const base = SUJETS[Math.min(i, SUJETS.length - 1)]
          return {
            ...base,
            titre: item.titre?.trim() || base.titre,
            texte: item.texte?.trim() || base.texte,
          }
        })
      : SUJETS
  return (
    <>
      <LiensApercu
        items={sujets}
        cta={
          <Button size="default" className="sm:hidden" render={<Link href={actionPrincipale.href} />}>
            <Icon name="agenda" aria-hidden />
            Nous parler
          </Button>
        }
      />

      <Reveal className="mt-10 hidden justify-center sm:flex">
        <Button render={<Link href={actionPrincipale.href} />}>
          <Icon name="agenda" aria-hidden />
          Parler de votre situation
        </Button>
      </Reveal>
    </>
  )
}
