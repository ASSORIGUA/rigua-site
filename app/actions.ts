"use server"

import { validerDemande, type EtatDemande } from "@/lib/demande"
import { nouvelleReference, transmettreDemande } from "@/lib/notify"

/**
 * Envoi d'une demande de rendez-vous ou de rappel.
 *
 * Signature `useActionState` : l'état précédent est ignoré, seul le FormData
 * compte. En cas d'erreur, les valeurs saisies sont renvoyées pour être
 * réaffichées : faire retaper un formulaire de douze champs à une personne
 * âgée parce qu'un numéro manquait un chiffre est inacceptable.
 *
 * Aucune donnée n'est stockée côté serveur. Le contenu de la demande est
 * transmis à l'association puis oublié : pas de base, pas de fichier, pas de
 * journal en production (voir lib/notify.ts).
 */
export async function envoyerDemande(
  _precedent: EtatDemande,
  donnees: FormData
): Promise<EtatDemande> {
  const resultat = validerDemande(donnees)

  if (!resultat.ok) {
    /* Robot détecté : on renvoie une confirmation crédible sans rien
       transmettre. Un message d'erreur explicite servirait de retour
       d'information à l'auteur du script. */
    if ("robot" in resultat) {
      return {
        statut: "envoye",
        reference: nouvelleReference(),
        parCourriel: false,
      }
    }
    return {
      statut: "erreur",
      erreurs: resultat.erreurs,
      valeurs: resultat.valeurs,
    }
  }

  const reference = nouvelleReference()
  const transmission = await transmettreDemande(resultat.demande, reference)

  if (!transmission.transmis) {
    return {
      statut: "erreur",
      erreurs: {
        _global:
          "Nous n'avons pas pu transmettre votre demande. Ce n'est pas de votre fait. Appelez-nous ou écrivez-nous directement, nous traiterons votre demande de la même façon.",
      },
      valeurs: resultat.demande,
    }
  }

  return {
    statut: "envoye",
    reference,
    parCourriel: transmission.parCourriel,
  }
}
