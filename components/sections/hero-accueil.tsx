"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Icon } from "@/components/icon";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { actionPrincipale } from "@/lib/site";

/**
 * Hero de la page d'accueil.
 *
 * Fond photographique : une professionnelle et une personne âgée en
 * conversation, d'adulte à adulte. Deux fichiers, un par orientation
 * (hero-bg-mobile.webp cadré portrait, hero-bg-desktop.webp cadré paysage),
 * tous deux optimisés en WebP (1,7 Mo → 44 Ko et 1,6 Mo → 35 Ko). `sizes="100vw"`
 * et `priority` : c'est le plus grand élément visible au premier paint, il doit
 * charger avant tout le reste.
 *
 * `data-surface="deep"` bascule tous les tokens de texte en clair (règle
 * globale posée dans app/globals.css), et le dégradé vert foncé superposé
 * garantit le contraste sur la photo plutôt que de dépendre de la zone claire
 * de l'image seule.
 *
 * Fond fixe, aucun parallaxe ni zoom (règle #10 du design system). `svh`
 * seul ne suffit pas à garantir l'absence de zoom sur tous les Safari iOS :
 * l'image de fond est en `fill` + `object-cover` dans un conteneur qui suit
 * la hauteur de la section, et certaines versions recalculent ce cadrage au
 * moindre changement de layout pendant le scroll (barre d'adresse qui se
 * rétracte). On gèle donc la hauteur en pixels via `window.innerHeight` au
 * premier paint côté mobile : cette valeur ne bouge plus jamais après coup,
 * contrairement à `100svh` qui reste une unité recalculée par le moteur de
 * rendu. Le calcul `-70px` (header seul) est repris à l'identique une fois
 * gelé. Desktop : aucun souci de barre d'adresse, on garde `svh` directement.
 *
 * Sous 640px, le contenu est aligné en bas (`items-end`) plutôt que centré,
 * et le paragraphe d'appoint est masqué : sur un écran étroit et haut,
 * centrer verticalement laisse un vide au-dessus du titre, alors que caler
 * en bas rapproche le texte des boutons d'action. Le paragraphe redevient
 * visible à partir de `sm:`, où l'espace horizontal absorbe mieux le texte
 * en plus du reste.
 *
 * `id="hero-accueil"` : le FAB de rendez-vous (components/fab-appel.tsx) observe
 * cet identifiant pour rester masqué tant que le hero est visible — ses
 * propres CTA suffisent, le FAB serait redondant par-dessus.
 */
export function HeroAccueil({
  badge = "Personnes âgées, fragiles ou dépendantes",
  titre = "Un accompagnement humain et adapté.",
  texte = "À domicile, en accueil de jour ou en hébergement adapté : nous accompagnons les personnes âgées, fragiles ou dépendantes, et nous soutenons aussi leurs proches.",
  boutonServices = "Découvrir nos services",
  lienUrgence = "Besoin d'une solution urgente ?",
}: {
  badge?: string;
  titre?: string;
  texte?: string;
  boutonServices?: string;
  lienUrgence?: string;
}) {
  const [hauteurGelee, setHauteurGelee] = React.useState<number | null>(null);

  React.useEffect(() => {
    /* Gèle la hauteur au premier paint, avant que la barre d'adresse Safari
       ne bouge et ne déclenche un recalcul du cadrage de l'image `fill`. Ne
       s'applique qu'en dessous de 640px (breakpoint `sm`), desktop reste en
       `svh` pur : aucune barre d'adresse rétractable à ce point d'écran. */
    const estMobile = window.matchMedia("(max-width: 639px)").matches;
    if (estMobile) {
      /* queueMicrotask et non setHauteurGelee() en direct : un setState
         synchrone dans le corps d'un effet déclenche un rendu en cascade.
         Même correctif que dans components/reveal.tsx et
         components/ui/carousel.tsx, pour la même raison. */
      queueMicrotask(() => setHauteurGelee(window.innerHeight));
    }
  }, []);

  return (
    <section
      id="hero-accueil"
      data-surface="deep"
      className="relative flex min-h-[calc(100svh-70px)] items-end overflow-hidden bg-background section-y-tight sm:min-h-[calc(100svh-123px)] sm:items-center"
      style={
        hauteurGelee !== null
          ? { minHeight: `${hauteurGelee - 70}px`, maxHeight: `${hauteurGelee - 70}px` }
          : undefined
      }
    >
      <Image
        src="/img-bg/hero-bg-mobile.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover sm:hidden"
      />
      <Image
        src="/img-bg/hero-bg-desktop.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover sm:block"
      />
      {/* Voile noir léger, uniquement sur la moitié gauche (où vit le texte) :
          la photo reste nette et sans teinte sur la droite. */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-full bg-linear-to-r from-black/70 to-transparent sm:w-1/2"
      />

      <div className="container-site relative">
        <div className="flex flex-col gap-5">
          <Reveal className="flex flex-col gap-5">
            {/* Pas `site.accroche` ici : l'en-tête l'affiche déjà, et le
                répéter juste au-dessus d'un titre qui le reformule fait trois
                fois la même phrase à l'écran. Ce libellé dit à qui le site
                s'adresse, ce que le titre ne dit pas encore. */}
            <Badge variant="paper" className="max-w-full px-2.5">
              {badge}
            </Badge>
            <h1 className="max-w-4xl">{titre}</h1>
            <p className="measure hidden text-lg leading-relaxed text-white sm:block">
              {texte}
            </p>
          </Reveal>

          <Reveal delay={70} className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" render={<Link href={actionPrincipale.href} />}>
                <Icon name="agenda" aria-hidden />
                {actionPrincipale.libelle}
              </Button>
              <Button
                size="lg"
                className="bg-white text-green-900 shadow-subtle hover:bg-white/90"
                render={<Link href="/nos-services" />}
              >
                {boutonServices}
              </Button>
            </div>

            {/* Lien souligné blanc, discret : la pastille ocre pleine essayée
                un temps prenait trop d'importance à côté des deux boutons du
                hero. Le blanc pur règle le manque de contraste de la version
                d'origine (`text-amber-500`, l'orange du logo, sur la photo
                sombre) sans transformer le lien en troisième bouton. */}
            <Link
              href="/nos-services#hebergement-urgence"
              className="flex min-h-11 w-fit items-center gap-2.5 text-base font-semibold text-white underline decoration-2 underline-offset-4 transition-colors hover:decoration-white/60"
            >
              <Icon name="service-urgence" className="size-6" aria-hidden />
              {lienUrgence}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
