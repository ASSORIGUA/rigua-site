import * as React from "react"

import { Icon, type IconName } from "@/components/icon"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { contact, estPublie } from "@/lib/site"
import { cn } from "@/lib/utils"

/**
 * Affichage des coordonnées.
 *
 * Aucune coordonnée n'a encore été fournie (brief §17). Ces composants
 * affichent donc soit la vraie valeur, soit une mention franche « à confirmer ».
 * Jamais un numéro inventé : une famille qui compose un faux numéro perd son
 * temps sur un site censé lui en faire gagner.
 *
 * Le brief §11 impose que les numéros de téléphone soient directement
 * cliquables. Dès que le numéro est renseigné dans lib/site.ts, le lien `tel:`
 * apparaît sans rien changer ici.
 */

/** Ligne de coordonnée : icône, libellé, valeur ou mention d'attente. */
function Ligne({
  icone,
  libelle,
  children,
  className,
}: {
  icone: IconName
  libelle: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex items-start gap-4", className)}>
      <Icon name={icone} className="mt-0.5 size-6 shrink-0 text-primary" aria-hidden />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-sm font-semibold text-muted-foreground">
          {libelle}
        </span>
        <div className="text-base">{children}</div>
      </div>
    </div>
  )
}

function EnAttente({ quoi }: { quoi: string }) {
  return (
    <span className="text-muted-foreground">
      {quoi} à confirmer avec l&apos;association
    </span>
  )
}

/** Téléphone principal, en grand, cliquable. */
export function TelephoneLien({
  taille = "normal",
  icone = true,
  souligne = true,
  libelle,
  className,
}: {
  taille?: "normal" | "grand"
  /** À désactiver quand une icône équivalente est déjà affichée juste à côté
   *  (ex. `Ligne` dans `Coordonnees`), pour ne pas la dupliquer. */
  icone?: boolean
  /** À désactiver dans `Coordonnees` : l'icône de la `Ligne` porte déjà le
   *  repère « ceci est cliquable », et une carte entière de liens soulignés
   *  se lit comme un mur d'avertissements plutôt que des coordonnées. */
  souligne?: boolean
  /** Texte affiché à la place du numéro (ex. « Appelez-nous »), pour les
   *  emplacements d'appel à l'action où le numéro est déjà écrit juste à
   *  côté. Le lien `tel:` reste le vrai numéro dans tous les cas. */
  libelle?: string
  className?: string
}) {
  if (!estPublie(contact.telephone)) {
    return (
      <span className={cn("text-muted-foreground", className)}>
        Numéro à confirmer
      </span>
    )
  }

  return (
    <a
      href={`tel:${contact.telephone.valeur.tel}`}
      className={cn(
        "inline-flex items-center gap-3 font-semibold text-primary",
        souligne
          ? "underline decoration-accent decoration-2 underline-offset-4 hover:decoration-primary"
          : "hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4",
        taille === "grand" ? "text-xl" : "text-base",
        className
      )}
    >
      {icone ? (
        <Icon name="telephone-appel" className="size-6 shrink-0" aria-hidden />
      ) : null}
      <span className="nums">{libelle ?? contact.telephone.valeur.affichage}</span>
    </a>
  )
}

export function EmailLien({
  souligne = true,
  className,
}: {
  /** Voir `TelephoneLien` : désactivé dans `Coordonnees`. */
  souligne?: boolean
  className?: string
}) {
  if (!estPublie(contact.email)) {
    return (
      <span className={cn("text-muted-foreground", className)}>
        Adresse e-mail à confirmer
      </span>
    )
  }

  return (
    <a
      href={`mailto:${contact.email.valeur}`}
      className={cn(
        "font-semibold text-primary",
        souligne
          ? "underline decoration-accent decoration-2 underline-offset-4 hover:decoration-primary"
          : "hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4",
        className
      )}
    >
      {contact.email.valeur}
    </a>
  )
}

/** Bloc complet : téléphone, e-mail, adresse, horaires, zone d'intervention. */
export function Coordonnees({ className }: { className?: string }) {
  const lignes = [
    <Ligne key="telephone" icone="telephone-appel" libelle="Téléphone">
      {estPublie(contact.telephone) ? (
        <TelephoneLien icone={false} souligne={false} />
      ) : (
        <EnAttente quoi="Numéro" />
      )}
    </Ligne>,

    estPublie(contact.telephoneUrgence) || estPublie(contact.telephoneSecondaire) ? (
      <Ligne
        key="hors-horaires"
        icone="telephone"
        libelle="En dehors des horaires de bureau"
      >
        <ul className="flex flex-col gap-1">
          {estPublie(contact.telephoneUrgence) ? (
            <li>
              <a
                href={`tel:${contact.telephoneUrgence.valeur.tel}`}
                className="nums font-semibold text-primary hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4"
              >
                {contact.telephoneUrgence.valeur.affichage}
              </a>
              {contact.telephoneUrgence.valeur.smsWhatsApp ? (
                <span className="text-muted-foreground">
                  {" "}
                  (de préférence par SMS ou WhatsApp)
                </span>
              ) : null}
            </li>
          ) : null}
          {estPublie(contact.telephoneSecondaire) ? (
            <li>
              <a
                href={`tel:${contact.telephoneSecondaire.valeur.tel}`}
                className="nums font-semibold text-primary hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4"
              >
                {contact.telephoneSecondaire.valeur.affichage}
              </a>
            </li>
          ) : null}
        </ul>
      </Ligne>
    ) : null,

    <Ligne key="email" icone="email" libelle="E-mail">
      <EmailLien souligne={false} />
    </Ligne>,

    <Ligne key="adresse" icone="adresse" libelle="Adresse">
      {estPublie(contact.adresse) ? (
        <address className="nums not-italic">
          {contact.adresse.valeur.rue}
          <br />
          {contact.adresse.valeur.codePostal} {contact.adresse.valeur.ville}
        </address>
      ) : (
        <EnAttente quoi="Adresse" />
      )}
    </Ligne>,

    <Ligne key="horaires" icone="horaires" libelle="Horaires">
      {estPublie(contact.horaires) ? (
        <ul className="flex flex-col gap-1">
          {contact.horaires.valeur.map((h) => (
            <li key={h.jours} className="flex flex-wrap gap-x-3">
              <span className="font-semibold">{h.jours}</span>
              <span className="nums">{h.heures}</span>
            </li>
          ))}
        </ul>
      ) : (
        <EnAttente quoi="Horaires" />
      )}
    </Ligne>,

    <Ligne key="zone" icone="transport" libelle="Zone d'intervention">
      {estPublie(contact.zoneIntervention) ? (
        <span>{contact.zoneIntervention.valeur}</span>
      ) : (
        <EnAttente quoi="Zone" />
      )}
    </Ligne>,
  ].filter(Boolean)

  return (
    <div className={cn("flex flex-col", className)}>
      {lignes.map((ligne, index) => (
        <React.Fragment key={(ligne as React.ReactElement).key}>
          {index > 0 ? <Separator className="my-6" /> : null}
          {ligne}
        </React.Fragment>
      ))}
    </div>
  )
}

/**
 * Encadré listant ce qui reste à valider sur une page donnée.
 *
 * Le brief §19 interdit de présenter une estimation comme une information
 * confirmée. Plutôt que d'omettre silencieusement ces points, la page les
 * nomme : c'est plus utile pour la famille, et cela sert de liste de travail
 * pour Corrine.
 */
export function AValider({
  items,
  titre = "Ce qui reste à préciser",
}: {
  items: string[]
  titre?: string
}) {
  if (items.length === 0) return null

  return (
    <Alert>
      <Icon name="info" />
      <AlertTitle>{titre}</AlertTitle>
      <AlertDescription>
        <p>
          Ces éléments seront publiés une fois validés par l&apos;association.
          Nous préférons ne rien afficher plutôt qu&apos;une information
          approximative.
        </p>
        <ul className="mt-3 flex flex-col gap-1.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Icon
                name="minus"
                className="mt-2 size-3 shrink-0 text-accent-ink"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  )
}
