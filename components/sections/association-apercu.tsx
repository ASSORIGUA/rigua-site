import Link from "next/link"

import { Eyebrow } from "@/components/eyebrow"
import { Icon } from "@/components/icon"
import { PhotoSlot } from "@/components/photo-slot"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { getPage, t } from "@/lib/cms"

const DESCRIPTION_PHOTO =
  "Un moment d'accompagnement en intérieur, lumière naturelle : une professionnelle et une personne âgée en conversation. Regard d'adulte à adulte, pas de blouse, pas de matériel médical visible."

/**
 * Aperçu de l'association, sur la page d'accueil.
 *
 * Le détail (origine, parti pris, valeurs) vit sur /l-association : ce bloc
 * condense en un paragraphe et un lien, avec l'emplacement photo attendu à
 * cet endroit (voir docs/photos-a-fournir.md).
 *
 * Le `<PhotoSlot>` est rendu deux fois, chacun visible sur un seul
 * breakpoint (`lg:hidden` / `hidden lg:block`) : sur mobile il s'intercale
 * entre le paragraphe et le bouton pour aérer le bloc de texte, sur `lg:` il
 * reprend sa place en colonne de droite. Une grille à deux colonnes fixes
 * avec `order` CSS aurait été plus fragile ici : avec trois enfants directs
 * (texte, photo, bouton) sur seulement deux colonnes, l'auto-placement de la
 * grille ne garantit pas que le bouton reste sous le texte à gauche.
 */
export async function AssociationApercu() {
  const doc = await getPage("pageAccueil")
  return (
    <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-16">
      <div className="flex flex-col gap-6">
        <Reveal className="flex flex-col gap-5">
          <Eyebrow icone="accueil">{t(doc, "assoEyebrow", "L'association")}</Eyebrow>
          <h2>{t(doc, "assoTitre", "Ce que le soin ne couvre pas")}</h2>
        </Reveal>
        <Reveal delay={70} className="flex flex-col gap-5">
          <p className="text-lg leading-relaxed">
            {t(
              doc,
              "assoTexte",
              "Une infirmière libérale a vu, chez beaucoup de ses patients, ce que le soin seul ne couvre pas : l'isolement, un logement devenu trop grand, une famille qui s'épuise. L'association est née de ce constat, pour ajouter la présence et le lien social au soin déjà assuré.",
            )}
          </p>
        </Reveal>

        <Reveal delay={140} className="lg:hidden">
          <PhotoSlot
            src="/images/association-apercu.png"
            alt="Une professionnelle et une personne âgée en conversation, en intérieur."
            ratio="3/2"
            description={DESCRIPTION_PHOTO}
            sizes="100vw"
            className="border-2 border-emerald-500"
          />
        </Reveal>

        <Reveal delay={210} className="flex flex-col gap-5">
          <Button className="mt-2 w-fit" render={<Link href="/l-association" />}>
            {t(doc, "assoBouton", "En savoir plus sur l'association")}
            <Icon name="arrow-right" aria-hidden />
          </Button>
        </Reveal>
      </div>

      <Reveal delay={140} className="hidden lg:block">
        <PhotoSlot
          src="/images/association-apercu.png"
          alt="Une professionnelle et une personne âgée en conversation, en intérieur."
          ratio="3/2"
          description={DESCRIPTION_PHOTO}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="border-2 border-emerald-500"
        />
      </Reveal>
    </div>
  )
}
