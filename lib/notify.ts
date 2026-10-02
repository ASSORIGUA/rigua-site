import { resumerDemande, type Demande } from "@/lib/demande"

/**
 * Transmission des demandes.
 *
 * Point d'accroche unique entre le formulaire et le monde extérieur. Aucun SDK :
 * l'API de Resend est un simple POST, et une dépendance de moins est une
 * dépendance de moins à auditer sur un chemin où passent des données
 * personnelles.
 *
 * TROIS ÉTATS POSSIBLES, ET AUCUN NE MENT AU VISITEUR
 *
 *  1. Configuré (RESEND_API_KEY + DEMANDES_EMAIL_TO + DEMANDES_EMAIL_FROM) :
 *     la demande partit par e-mail. La confirmation le dit.
 *
 *  2. Mode démonstration (NODE_ENV différent de production, ou DEMANDES_DEMO=1) :
 *     la demande est écrite dans le journal du serveur et la confirmation
 *     précise qu'aucun e-mail n'a été envoyé. Cela permet de faire la recette du
 *     parcours complet avant que la boîte de réception soit choisie.
 *
 *  3. Production non configurée : ÉCHEC EXPLICITE. Le formulaire affiche les
 *     coordonnées directes. Répondre « votre demande a bien été envoyée » quand
 *     rien n'est parti serait le pire comportement possible ici : une famille
 *     attendrait un rappel qui ne viendrait jamais.
 *
 * À faire avant la mise en ligne : créer la boîte de réception, renseigner les
 * trois variables d'environnement, et vérifier le parcours de bout en bout.
 */

export type Transmission =
  | { transmis: true; parCourriel: boolean }
  | { transmis: false; raison: "non-configure" | "echec-envoi" }

const CLE = process.env.RESEND_API_KEY
const DESTINATAIRE = process.env.DEMANDES_EMAIL_TO
const EXPEDITEUR = process.env.DEMANDES_EMAIL_FROM

/**
 * Web3Forms : transport prioritaire s'il est configuré.
 *
 * Un simple POST vers api.web3forms.com, la clé d'accès est liée à la
 * boîte de réception choisie à l'inscription sur web3forms.com. Avantage
 * sur Resend pour cette association : aucun domaine d'expédition à
 * vérifier, l'e-mail arrive directement dans la boîte liée à la clé.
 * Les trois états (configuré / démonstration / échec explicite) restent
 * les mêmes : on ne dit jamais « envoyé » quand rien n'est parti.
 */
const WEB3FORMS_CLE = process.env.WEB3FORMS_ACCESS_KEY

const modeDemonstration =
  process.env.DEMANDES_DEMO === "1" || process.env.NODE_ENV !== "production"

export async function transmettreDemande(
  demande: Demande,
  reference: string
): Promise<Transmission> {
  const corps = resumerDemande(demande)
  const objet =
    demande.mode === "rappel"
      ? `Demande de rappel - ${demande.prenomNom} - ${reference}`
      : `Demande de rendez-vous - ${demande.prenomNom} - ${reference}`

  if (WEB3FORMS_CLE) {
    try {
      const reponse = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_CLE,
          subject: objet,
          from_name: "Site RIGUA",
          name: demande.prenomNom,
          /* Répondre à l'e-mail répond à la famille, quand elle en a donné un. */
          ...(demande.email ? { email: demande.email } : {}),
          message: `${corps}\n\nRéférence : ${reference}`,
        }),
      })
      const resultat = (await reponse.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null
      if (!reponse.ok || !resultat?.success) {
        console.error(
          `[demande ${reference}] envoi Web3Forms refusé (${reponse.status}) : ${resultat?.message ?? "réponse illisible"}`
        )
        return { transmis: false, raison: "echec-envoi" }
      }
      return { transmis: true, parCourriel: true }
    } catch (erreur) {
      console.error(`[demande ${reference}] envoi Web3Forms en erreur`, erreur)
      return { transmis: false, raison: "echec-envoi" }
    }
  }

  if (!CLE || !DESTINATAIRE || !EXPEDITEUR) {
    if (modeDemonstration) {
      /* Le journal du serveur est ici le canal de recette assumé. */
      console.info(
        `[demande ${reference}] mode démonstration, aucun e-mail envoyé\n${corps}`
      )
      return { transmis: true, parCourriel: false }
    }

    console.error(
      `[demande ${reference}] transmission impossible : RESEND_API_KEY, DEMANDES_EMAIL_TO ou DEMANDES_EMAIL_FROM manquante.`
    )
    return { transmis: false, raison: "non-configure" }
  }

  try {
    const reponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CLE}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EXPEDITEUR,
        to: [DESTINATAIRE],
        subject: objet,
        text: `${corps}\n\nRéférence : ${reference}`,
        /* Répondre à l'e-mail répond à la famille, quand elle en a donné un. */
        reply_to: demande.email || undefined,
      }),
    })

    if (!reponse.ok) {
      console.error(
        `[demande ${reference}] envoi refusé (${reponse.status}) : ${await reponse.text()}`
      )
      return { transmis: false, raison: "echec-envoi" }
    }

    return { transmis: true, parCourriel: true }
  } catch (erreur) {
    console.error(`[demande ${reference}] envoi en erreur`, erreur)
    return { transmis: false, raison: "echec-envoi" }
  }
}

/**
 * Référence courte communiquée à la famille. Elle permet de retrouver la
 * demande au téléphone sans avoir à réépeler un nom.
 */
export function nouvelleReference(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789" // sans I, O, 0, 1
  const octets = crypto.getRandomValues(new Uint8Array(6))
  let code = ""
  for (const octet of octets) code += alphabet[octet % alphabet.length]
  return `${code.slice(0, 3)}-${code.slice(3)}`
}
