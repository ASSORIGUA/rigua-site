import { actualite } from "./actualite"
import { temoignage } from "./temoignage"
import { service } from "./service"
import { pageAccueil } from "./page-accueil"
import { pageAssociation } from "./page-association"
import { pageServices } from "./page-services"
import { pageEquipe } from "./page-equipe"
import { pageActions } from "./page-actions"
import { pageActualites } from "./page-actualites"
import { pageTarifs } from "./page-tarifs"
import { pageFaq } from "./page-faq"
import { pageContact } from "./page-contact"
import { pageRdv } from "./page-rdv"

/** Les singletons : un document unique par page du site. */
export const TYPES_SINGLETONS = [
  "pageAccueil",
  "pageAssociation",
  "pageServices",
  "pageEquipe",
  "pageActions",
  "pageActualites",
  "pageTarifs",
  "pageFaq",
  "pageContact",
  "pageRdv",
] as const

export const schemaTypes = [
  pageAccueil,
  pageAssociation,
  pageServices,
  pageEquipe,
  pageActions,
  pageActualites,
  pageTarifs,
  pageFaq,
  pageContact,
  pageRdv,
  actualite,
  temoignage,
  service,
]
