"use client"

import * as React from "react"
import { useActionState } from "react"

import { envoyerDemande } from "@/app/actions"
import { TelephoneLien } from "@/components/contact-info"
import { Icon } from "@/components/icon"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  GIR,
  MOMENTS,
  NIVEAUX_URGENCE,
  RELATIONS,
  SERVICES_DEMANDES,
  TYPES_RENDEZ_VOUS,
  type EtatDemande,
  type ModeDemande,
} from "@/lib/demande"
import { cn } from "@/lib/utils"

/**
 * Formulaire de demande.
 *
 * Deux modes, un seul composant :
 *  - `rendez-vous` : le formulaire complet de la page Prendre rendez-vous ;
 *  - `rappel` : quatre champs, sur la page Contact, pour la personne qui veut
 *    seulement qu'on la rappelle. Le brief §14 en fait une fonctionnalité
 *    distincte, et à raison : demander douze champs à quelqu'un qui veut juste
 *    être appelé le fait renoncer.
 *
 * Décisions de conception, toutes tirées du brief §11 et §15 :
 *  - libellés toujours visibles, jamais de placeholder en guise d'étiquette ;
 *  - une seule colonne. Deux colonnes font sauter des champs à la lecture ;
 *  - les erreurs sont regroupées en haut ET rappelées sous chaque champ, et le
 *    résumé prend le focus, pour la navigation au clavier comme au lecteur
 *    d'écran ;
 *  - les valeurs saisies sont réaffichées après une erreur ;
 *  - « facultatif » est écrit sur les champs facultatifs, plutôt que de marquer
 *    les obligatoires d'une astérisque que personne ne sait interpréter.
 */

const ETAT_INITIAL: EtatDemande = { statut: "vide" }

function Champ({
  id,
  label,
  aide,
  erreur,
  facultatif = false,
  children,
}: {
  id: string
  label: string
  aide?: string
  erreur?: string
  facultatif?: boolean
  children: React.ReactNode
}) {
  const idAide = aide ? `${id}-aide` : undefined
  const idErreur = erreur ? `${id}-erreur` : undefined

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="flex flex-wrap items-center gap-x-2">
        {label}
        {facultatif ? (
          <Badge variant="secondary" className="font-normal normal-case">
            facultatif
          </Badge>
        ) : null}
      </Label>

      {aide ? (
        <p id={idAide} className="nums text-sm text-muted-foreground">
          {aide}
        </p>
      ) : null}

      {/* aria-invalid et aria-describedby sont posés sur le contrôle lui-même
          par l'appelant : c'est le contrôle que le lecteur d'écran annonce. */}
      {children}

      {erreur ? (
        <p
          id={idErreur}
          className="flex items-start gap-2 text-sm font-semibold text-urgent-on-surface"
        >
          <Icon name="warning" className="mt-0.5 size-4 shrink-0" aria-hidden />
          {erreur}
        </p>
      ) : null}
    </div>
  )
}

/**
 * Titre de section du formulaire, avec un numéro d'étape.
 *
 * Remplace l'ancien intitulé en `text-lg font-semibold` posé à plat sur un
 * simple `border-t` : sur un formulaire de cette longueur, une rupture aussi
 * discrète se perd au défilement. Le numéro donne un repère de progression
 * (« où j'en suis sur N étapes ») sans complexifier le balisage : `fieldset`
 * garde `legend` pour l'accessibilité, ce composant n'en est que l'habillage
 * visuel.
 */
function TitreSection({
  numero,
  total,
  titre,
  aide,
}: {
  numero: number
  total: number
  titre: string
  aide?: string
}) {
  return (
    <div className="mb-2 flex items-center gap-4">
      <span
        aria-hidden
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-sans text-sm font-semibold text-primary-foreground"
      >
        {numero}
      </span>
      <div className="flex flex-col gap-1">
        <span className="font-sans text-lg font-semibold">
          {titre}
          {total > 1 ? (
            <span className="ml-2 align-middle text-xs font-normal tracking-wide text-muted-foreground">
              Étape {numero}/{total}
            </span>
          ) : null}
        </span>
        {aide ? (
          <span className="text-sm font-normal text-muted-foreground">
            {aide}
          </span>
        ) : null}
      </div>
    </div>
  )
}

function Confirmation({
  reference,
  parCourriel,
}: {
  reference: string
  parCourriel: boolean
}) {
  return (
    <div className="flex flex-col gap-7 rounded-xl border border-line bg-surface p-7 sm:p-9">
      <div className="flex items-start gap-4">
        <Icon name="success" className="mt-1 size-9 shrink-0 text-primary" aria-hidden />
        <div className="flex flex-col gap-2">
          <h3>Votre demande est arrivée</h3>
          <p className="text-base text-muted-foreground">
            Référence <span className="font-semibold text-foreground">{reference}</span>.
            Notez-la : elle nous permet de retrouver votre demande si vous nous
            appelez entre-temps.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-6">
        <h4>Ce qui se passe maintenant</h4>
        <ol className="flex flex-col gap-2 text-base text-muted-foreground">
          <li>Nous lisons votre demande et nous vous rappelons au numéro indiqué.</li>
          <li>
            Ce premier échange sert à comprendre la situation. Aucun document ne
            vous sera demandé.
          </li>
          <li>
            Nous vous dirons ensuite quelle solution correspond, ou nous vous
            orienterons si ce n&apos;est pas nous.
          </li>
        </ol>
      </div>

      {!parCourriel ? (
        <Alert>
          <Icon name="info" />
          <AlertTitle>Mode démonstration</AlertTitle>
          <AlertDescription>
            La transmission automatique par e-mail n&apos;est pas encore activée
            sur cette version du site. Cette confirmation montre le parcours réel,
            mais aucune demande n&apos;a été envoyée à l&apos;association.
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-line pt-6">
        <p className="text-base">
          Si la situation évolue avant notre appel, joignez-nous directement.
        </p>
        <TelephoneLien taille="grand" />
      </div>
    </div>
  )
}

export function DemandeForm({
  mode = "rendez-vous",
  className,
}: {
  mode?: ModeDemande
  className?: string
}) {
  const [etat, action, enCours] = useActionState(envoyerDemande, ETAT_INITIAL)
  const refResume = React.useRef<HTMLDivElement>(null)

  /* Le résumé d'erreurs prend le focus : sur un formulaire long, une erreur
     annoncée en haut de page et jamais atteinte ne sert à rien. */
  React.useEffect(() => {
    if (etat.statut === "erreur") refResume.current?.focus()
  }, [etat])

  if (etat.statut === "envoye") {
    return (
      <div className={className}>
        <Confirmation
          reference={etat.reference}
          parCourriel={etat.parCourriel}
        />
      </div>
    )
  }

  const erreurs = etat.statut === "erreur" ? etat.erreurs : {}
  const valeurs = etat.statut === "erreur" ? etat.valeurs : {}
  const listeErreurs = Object.entries(erreurs).filter(([cle]) => cle !== "_global")
  const complet = mode === "rendez-vous"
  const totalEtapes = complet ? 3 : 1

  return (
    <form action={action} className={cn("flex flex-col gap-8", className)} noValidate>
      <input type="hidden" name="mode" value={mode} />

      {/* Leurre anti-robot. Hors flux et hors tabulation, mais pas display:none :
          certains robots ignorent les champs invisibles, alors qu'ils remplissent
          tout ce qui a un nom plausible. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`societe-${mode}`}>Société</label>
        <input
          id={`societe-${mode}`}
          type="text"
          name="societe"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {erreurs._global ? (
        <Alert variant="urgent">
          <Icon name="warning" />
          <AlertTitle>Votre demande n&apos;a pas pu être transmise</AlertTitle>
          <AlertDescription>
            <p>{erreurs._global}</p>
            <div className="mt-3">
              <TelephoneLien />
            </div>
          </AlertDescription>
        </Alert>
      ) : null}

      {listeErreurs.length > 0 ? (
        <div
          ref={refResume}
          tabIndex={-1}
          role="alert"
          className="flex flex-col gap-3 rounded-xl border-2 border-urgent bg-urgent-surface p-6"
        >
          <h3 className="font-sans text-lg font-semibold text-urgent-on-surface">
            {listeErreurs.length === 1
              ? "Une information manque"
              : `${listeErreurs.length} informations manquent`}
          </h3>
          <p className="text-base text-urgent-on-surface">
            Rien n&apos;est perdu : ce que vous avez déjà écrit est conservé.
          </p>
          <ul className="flex flex-col gap-1.5">
            {listeErreurs.map(([cle, message]) => (
              <li key={cle} className="text-base text-urgent-on-surface">
                <a
                  href={`#${cle}`}
                  className="font-semibold underline decoration-2 underline-offset-4"
                >
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* ---------- Vous ---------- */}
      <fieldset className="flex flex-col gap-6">
        <legend className="mb-2 w-full">
          <TitreSection
            numero={1}
            total={totalEtapes}
            titre="Vous"
            aide="De quoi vous rappeler, rien de plus."
          />
        </legend>

        <Champ id="prenomNom" label="Votre prénom et votre nom" erreur={erreurs.prenomNom}>
          <Input
            id="prenomNom"
            name="prenomNom"
            autoComplete="name"
            defaultValue={valeurs.prenomNom}
            aria-invalid={erreurs.prenomNom ? true : undefined}
            aria-describedby={erreurs.prenomNom ? "prenomNom-erreur" : undefined}
          />
        </Champ>

        <Champ
          id="telephone"
          label="Votre téléphone"
          aide="C'est par téléphone que nous répondons. Fixe ou mobile, peu importe."
          erreur={erreurs.telephone}
        >
          <Input
            id="telephone"
            name="telephone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            defaultValue={valeurs.telephone}
            className="nums"
            aria-invalid={erreurs.telephone ? true : undefined}
            aria-describedby={
              erreurs.telephone ? "telephone-aide telephone-erreur" : "telephone-aide"
            }
          />
        </Champ>

        <Champ
          id="email"
          label="Votre e-mail"
          facultatif
          aide="Utile si vous préférez une trace écrite. Nous n'en avons pas besoin pour vous rappeler."
          erreur={erreurs.email}
        >
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={valeurs.email}
            aria-invalid={erreurs.email ? true : undefined}
            aria-describedby={erreurs.email ? "email-aide email-erreur" : "email-aide"}
          />
        </Champ>

        <Champ
          id="moment"
          label="Quand pouvons-nous vous appeler ?"
          facultatif={!complet}
          erreur={erreurs.moment}
        >
          <Select name="moment" defaultValue={valeurs.moment ?? "indifferent"}>
            <SelectTrigger id="moment">
              <SelectValue placeholder="Choisissez un moment" />
            </SelectTrigger>
            <SelectContent>
              {MOMENTS.map((m) => (
                <SelectItem key={m.valeur} value={m.valeur}>
                  {m.libelle}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Champ>
      </fieldset>

      {complet ? (
        <>
          {/* ---------- La personne concernée ---------- */}
          <fieldset className="flex flex-col gap-6 border-t border-line pt-8">
            <legend className="mb-2 w-full">
              <TitreSection
                numero={2}
                total={totalEtapes}
                titre="La personne concernée"
                aide="Nous ne demandons pas son nom : ce n'est pas utile à ce stade."
              />
            </legend>

            <Champ
              id="relation"
              label="Vous êtes"
              erreur={erreurs.relation}
            >
              <Select name="relation" defaultValue={valeurs.relation}>
                <SelectTrigger id="relation">
                  <SelectValue placeholder="Choisissez votre lien avec elle" />
                </SelectTrigger>
                <SelectContent>
                  {RELATIONS.map((r) => (
                    <SelectItem key={r.valeur} value={r.valeur}>
                      {r.libelle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Champ>

            <Champ
              id="gir"
              label="Son niveau de dépendance, s'il a été évalué"
              facultatif
              aide="La grille AGGIR va de GIR 1, la perte d'autonomie la plus importante, à GIR 6, la plus légère. Si vous ne le savez pas, laissez « je ne sais pas » : cela ne change rien à notre réponse."
              erreur={erreurs.gir}
            >
              <Select name="gir" defaultValue={valeurs.gir ?? "inconnu"}>
                <SelectTrigger id="gir">
                  <SelectValue placeholder="Je ne sais pas" />
                </SelectTrigger>
                <SelectContent>
                  {GIR.map((g) => (
                    <SelectItem key={g.valeur} value={g.valeur}>
                      {g.libelle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Champ>
          </fieldset>

          {/* ---------- Votre demande ---------- */}
          <fieldset className="flex flex-col gap-6 border-t border-line pt-8">
            <legend className="mb-2 w-full">
              <TitreSection numero={3} total={totalEtapes} titre="Votre demande" />
            </legend>

            <Champ id="service" label="Le service qui vous intéresse" erreur={erreurs.service}>
              <Select name="service" defaultValue={valeurs.service}>
                <SelectTrigger id="service">
                  <SelectValue placeholder="Choisissez un service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES_DEMANDES.map((s) => (
                    <SelectItem key={s.valeur} value={s.valeur}>
                      {s.libelle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Champ>

            <div className="flex flex-col gap-3">
              <span className="font-sans text-base font-semibold">
                Le type d&apos;échange souhaité
              </span>
              {erreurs.typeRendezVous ? (
                <p
                  id="typeRendezVous"
                  className="flex items-start gap-2 text-sm font-semibold text-urgent-on-surface"
                >
                  <Icon name="warning" className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {erreurs.typeRendezVous}
                </p>
              ) : null}
              <RadioGroup name="typeRendezVous" defaultValue={valeurs.typeRendezVous}>
                {TYPES_RENDEZ_VOUS.map((t) => (
                  <Label
                    key={t.valeur}
                    htmlFor={`rdv-${t.valeur}`}
                    className="items-start gap-3.5 rounded-md border border-line bg-surface p-4 font-normal shadow-subtle transition-[border-color,background-color,box-shadow] duration-150 ease-out hover:border-line-strong hover:bg-muted/60 has-data-checked:border-primary has-data-checked:bg-muted has-data-checked:ring-1 has-data-checked:ring-primary"
                  >
                    <RadioGroupItem
                      id={`rdv-${t.valeur}`}
                      value={t.valeur}
                      className="mt-0.5"
                    />
                    <span className="flex flex-col gap-1">
                      <span className="font-semibold">{t.libelle}</span>
                      <span className="text-sm text-muted-foreground">{t.aide}</span>
                    </span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <Champ
              id="urgence"
              label="Dans quel délai cherchez-vous une solution ?"
              facultatif
              aide="Pour une situation qui ne peut pas attendre aujourd'hui, appelez-nous : ce formulaire n'est pas le bon canal."
              erreur={erreurs.urgence}
            >
              <Select name="urgence" defaultValue={valeurs.urgence ?? "informatif"}>
                <SelectTrigger id="urgence">
                  <SelectValue placeholder="Choisissez un délai" />
                </SelectTrigger>
                <SelectContent>
                  {NIVEAUX_URGENCE.map((u) => (
                    <SelectItem key={u.valeur} value={u.valeur}>
                      {u.libelle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Champ>

            <Champ
              id="situation"
              label="Décrivez la situation avec vos mots"
              aide="Deux ou trois phrases suffisent. Ce qui a changé, depuis quand, et ce qui vous inquiète. N'écrivez pas d'informations médicales détaillées : nous n'en avons pas besoin ici."
              erreur={erreurs.situation}
            >
              <Textarea
                id="situation"
                name="situation"
                rows={6}
                defaultValue={valeurs.situation}
                aria-invalid={erreurs.situation ? true : undefined}
                aria-describedby={
                  erreurs.situation
                    ? "situation-aide situation-erreur"
                    : "situation-aide"
                }
              />
            </Champ>
          </fieldset>
        </>
      ) : (
        <fieldset className="flex flex-col gap-6 border-t border-line pt-8">
          <legend className="mb-2 w-full">
            <TitreSection numero={2} total={1} titre="Votre message" />
          </legend>
          <Champ
            id="situation"
            label="De quoi souhaitez-vous parler ?"
            facultatif
            aide="Quelques mots suffisent. Vous pouvez aussi laisser ce champ vide et tout dire au téléphone."
            erreur={erreurs.situation}
          >
            <Textarea
              id="situation"
              name="situation"
              rows={4}
              defaultValue={valeurs.situation}
              aria-invalid={erreurs.situation ? true : undefined}
              aria-describedby={
                erreurs.situation ? "situation-aide situation-erreur" : "situation-aide"
              }
            />
          </Champ>
        </fieldset>
      )}

      {/* ---------- Consentement + envoi ----------
          Un seul bloc visuel plutôt que deux fragments juxtaposés : la case,
          le texte RGPD et le bouton racontent la même étape (« ce qui se
          passe quand vous envoyez »), donc un seul panneau sur fond distinct
          les rassemble et sépare franchement cette étape des champs saisis
          au-dessus. */}
      <div className="flex flex-col gap-6 rounded-xl border border-line bg-surface-warm p-6 sm:p-7">
        <div className="flex flex-col gap-3">
          <Label
            htmlFor="consentement"
            className="items-start gap-3.5 font-normal"
          >
            <Checkbox
              id="consentement"
              name="consentement"
              value="oui"
              className="mt-0.5 bg-surface"
              aria-invalid={erreurs.consentement ? true : undefined}
              aria-describedby={
                erreurs.consentement
                  ? "consentement-erreur consentement-aide"
                  : "consentement-aide"
              }
            />
            <span>
              J&apos;accepte que ces informations soient utilisées par
              l&apos;association pour traiter ma demande et me recontacter.
            </span>
          </Label>

          {erreurs.consentement ? (
            <p
              id="consentement-erreur"
              className="flex items-start gap-2 pl-8.5 text-sm font-semibold text-urgent-on-surface"
            >
              <Icon name="warning" className="mt-0.5 size-4 shrink-0" aria-hidden />
              {erreurs.consentement}
            </p>
          ) : null}

          <p
            id="consentement-aide"
            className="pl-8.5 text-sm text-muted-foreground"
          >
            Ces informations servent uniquement à répondre à votre demande.
            Elles ne sont ni revendues, ni utilisées à des fins commerciales.
            Vous pouvez demander leur suppression à tout moment.{" "}
            <a
              href="/politique-de-confidentialite"
              className="font-semibold text-primary hover:underline hover:decoration-accent hover:decoration-2 hover:underline-offset-4"
            >
              Politique de confidentialité
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-6">
          <Button type="submit" size="lg" disabled={enCours} className="sm:w-auto">
            {enCours ? (
              <>
                <Icon name="spinner" className="animate-spin" aria-hidden />
                Envoi en cours
              </>
            ) : (
              <>
                <Icon name={complet ? "agenda" : "telephone-appel"} aria-hidden />
                {complet ? "Envoyer ma demande" : "Demander à être rappelé"}
              </>
            )}
          </Button>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="success" className="size-4 shrink-0 text-primary" aria-hidden />
            Aucun engagement, aucun frais.
          </p>
        </div>
      </div>
    </form>
  )
}
