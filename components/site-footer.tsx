import Image from "next/image";
import Link from "next/link";

import { EmailLien, TelephoneLien } from "@/components/contact-info";
import { Icon } from "@/components/icon";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { services } from "@/lib/content/services";
import {
  actionPrincipale,
  contact,
  estPublie,
  legal,
  navigation,
  navigationLegale,
  site,
} from "@/lib/site";

/**
 * Pied de page.
 *
 * Surface vert foncé. Le logo (`components/logo.tsx`) est un PNG à fond
 * transparent qui s'adapte déjà à toute surface : pas de variante de couleur
 * à choisir ici.
 *
 * Il reprend les coordonnées et l'action principale plutôt que de renvoyer
 * vers la page contact. Une famille qui arrive au bas d'une page de service a
 * fini de lire et veut agir : lui demander un clic de plus est une friction
 * gratuite.
 */
export function SiteFooter() {
  return (
    <footer
      id="site-footer"
      data-surface="deep"
      className="grain bg-background"
    >
      <div className="container-site section-y-tight">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr] lg:gap-10">
          {/* Identité */}
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label={`${site.nom}, retour à l'accueil`}
            >
              <Logo variant="inverse" className="w-13 shrink-0" />
              <span className="font-heading text-2xl font-medium text-foreground">
                {site.nom}
              </span>
            </Link>
            <p className="text-base text-muted-foreground">
              {site.proposition}
            </p>
            <p className="text-sm text-muted-foreground">
              {legal.formeJuridique.valeur}, fondée par une infirmière libérale.
            </p>
            {estPublie(legal.agrementSAP) ? (
              <div className="flex items-center gap-3">
                <Image
                  src="/Traceur_SAP.jpeg"
                  alt="Agrément Services à la Personne"
                  width={78}
                  height={66}
                  className="h-auto w-19.5 shrink-0 rounded-md"
                />
                <span className="text-sm text-muted-foreground">
                  Agrément Services à la Personne
                  <br />
                  {legal.agrementSAP.valeur}
                </span>
              </div>
            ) : null}
          </div>

          {/* Navigation */}
          <nav aria-label="Pages du site" className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">
              Le site
            </h2>
            <ul className="flex flex-col">
              {navigation.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={lien.href}
                    className="flex min-h-11 items-center text-base text-muted-foreground hover:text-foreground"
                  >
                    {lien.libelle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Nos services" className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">
              Nos services
            </h2>
            <ul className="flex flex-col">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/nos-services#${service.slug}`}
                    className="flex min-h-11 items-center text-base text-muted-foreground hover:text-foreground"
                  >
                    {service.titreCourt}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">
              Nous joindre
            </h2>
            <div className="flex flex-col gap-3">
              <TelephoneLien className="no-underline" />
              {estPublie(contact.telephoneUrgence) ? (
                <p className="text-sm text-muted-foreground">
                  En dehors des horaires de bureau :{" "}
                  <a
                    href={`tel:${contact.telephoneUrgence.valeur.tel}`}
                    className="nums font-semibold text-foreground"
                  >
                    {contact.telephoneUrgence.valeur.affichage}
                  </a>
                  {contact.telephoneUrgence.valeur.smsWhatsApp
                    ? " (SMS ou WhatsApp)"
                    : null}
                </p>
              ) : null}
              <EmailLien className="no-underline" />
              {estPublie(contact.adresse) ? (
                <address className="flex items-start gap-3 text-base text-muted-foreground not-italic">
                  <Icon
                    name="adresse"
                    className="mt-1 size-5 shrink-0"
                    aria-hidden
                  />
                  <span>
                    {contact.adresse.valeur.rue}
                    <br />
                    <span className="nums">
                      {contact.adresse.valeur.codePostal}
                    </span>{" "}
                    {contact.adresse.valeur.ville}
                  </span>
                </address>
              ) : (
                <span className="text-base text-muted-foreground">
                  Adresse à confirmer
                </span>
              )}
            </div>
            <Button
              className="mt-2 w-full sm:w-fit"
              render={<Link href={actionPrincipale.href} />}
            >
              <Icon name="agenda" aria-hidden />
              {actionPrincipale.libelle}
            </Button>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; <span className="nums">{new Date().getFullYear()}</span>{" "}
            {site.nom}. Association loi <span className="nums">1901</span>.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6">
            {navigationLegale.map((lien) => (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  className="flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground"
                >
                  {lien.libelle}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://fondationstudio.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground"
              >
                Site créé par fondationstudio.fr
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
