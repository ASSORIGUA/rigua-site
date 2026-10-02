import { toutesLesQuestions } from "@/lib/content/faq"
import { services } from "@/lib/content/services"
import { contact, estPublie, legal, site, urlAbsolue } from "@/lib/site"

/**
 * Données structurées (brief §16).
 *
 * Règle absolue de ce fichier : ne déclarer à un moteur de recherche QUE ce qui
 * est confirmé. Un numéro de téléphone ou une adresse inventés dans un bloc
 * JSON-LD se retrouvent dans la fiche Google de l'association, sont recopiés
 * par des annuaires tiers, et deviennent très difficiles à corriger ensuite.
 *
 * Chaque champ non confirmé est donc simplement absent du balisage : un balisage
 * incomplet est sans conséquence, un balisage faux fait des dégâts durables.
 */

type Json = Record<string, unknown>

function sansVides(objet: Json): Json {
  return Object.fromEntries(
    Object.entries(objet).filter(
      ([, v]) => v !== undefined && v !== null && !(Array.isArray(v) && v.length === 0)
    )
  )
}

/**
 * L'association. Type NGO plutôt que LocalBusiness : une association loi 1901
 * sans but lucratif n'est pas un commerce, et le type influence la façon dont
 * la fiche est présentée.
 */
export function jsonLdAssociation(): Json {
  const adresse = estPublie(contact.adresse)
    ? sansVides({
        "@type": "PostalAddress",
        streetAddress: contact.adresse.valeur.rue,
        postalCode: contact.adresse.valeur.codePostal,
        addressLocality: contact.adresse.valeur.ville,
        addressCountry: contact.adresse.valeur.pays,
      })
    : undefined

  return sansVides({
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": urlAbsolue("/#association"),
    name: estPublie(legal.raisonSociale) ? legal.raisonSociale.valeur : site.nom,
    alternateName: estPublie(legal.raisonSociale) ? site.nom : undefined,
    url: site.url,
    description: site.description,
    logo: urlAbsolue("/logo_rigua.svg"),
    telephone: estPublie(contact.telephone)
      ? contact.telephone.valeur.tel
      : undefined,
    email: estPublie(contact.email) ? contact.email.valeur : undefined,
    address: adresse,
    areaServed: estPublie(contact.zoneIntervention)
      ? contact.zoneIntervention.valeur
      : undefined,
    knowsLanguage: "fr-FR",
    /* Les services sont, eux, confirmés : ils viennent du brief. Chaque
       service vit désormais en section ancrée de la page unique « Nos
       services » (plus de route dédiée par service), d'où l'URL avec `#`. */
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.titre,
        description: service.resume,
        url: urlAbsolue(`/nos-services#${service.slug}`),
      },
    })),
  })
}

export function jsonLdSite(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": urlAbsolue("/#site"),
    url: site.url,
    name: site.nom,
    inLanguage: "fr-FR",
    publisher: { "@id": urlAbsolue("/#association") },
  }
}

/** FAQPage : les questions sont réelles, les réponses sont validées. */
export function jsonLdFaq(
  questions: { question: string; reponse: string[] }[] = toutesLesQuestions,
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.reponse.join(" "),
      },
    })),
  }
}

export function jsonLdFilAriane(
  items: { nom: string; href: string }[]
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.nom,
      item: urlAbsolue(item.href),
    })),
  }
}
