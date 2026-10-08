"use client"

import { defineConfig } from "sanity"
import { structureTool, type StructureBuilder } from "sanity/structure"
import { visionTool } from "@sanity/vision"

import { schemaTypes, TYPES_SINGLETONS } from "./sanity/schemas"

/**
 * Configuration du Studio Sanity, déployé chez Sanity sur
 * https://assorigua.sanity.studio (voir sanity.cli.ts).
 *
 * Le menu reflète les pages du site : une entrée par page (singleton),
 * puis les listes (actualités, témoignages, services). Les singletons sont
 * protégés : pas de duplication, pas de suppression, pas de création d'un
 * second document du même type.
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder0"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"

/* `S.listItem().id()` TOUJOURS posé : un item sans id fait planter l'outil. */
function pageItem(S: StructureBuilder, type: string, titre: string) {
  return S.listItem()
    .id(type)
    .title(titre)
    .child(S.document().schemaType(type).documentId(type))
}

const structure = (S: StructureBuilder) =>
  S.list()
    .id("racine")
    .title("Contenu du site")
    .items([
      pageItem(S, "pageAccueil", "Page d'accueil"),
      pageItem(S, "pageAssociation", "L'association"),
      pageItem(S, "pageServices", "Nos services (textes de page)"),
      pageItem(S, "pageEquipe", "Notre équipe"),
      pageItem(S, "pageActions", "Nos actions"),
      pageItem(S, "pageActualites", "Actualités (textes de page)"),
      pageItem(S, "pageTarifs", "Tarifs"),
      pageItem(S, "pageFaq", "Questions fréquentes"),
      pageItem(S, "pageContact", "Contact"),
      pageItem(S, "pageRdv", "Prendre rendez-vous"),
      S.divider(),
      S.documentTypeListItem("actualite").id("actualites").title("Actualités (articles)"),
      S.documentTypeListItem("service").id("services").title("Services (fiches)"),
      S.documentTypeListItem("temoignage").id("temoignages").title("Témoignages"),
    ])

export default defineConfig({
  name: "rigua",
  title: "RIGUA : contenu du site",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    /* Pas de « nouveau document » pour les singletons. */
    templates: (templates) =>
      templates.filter(
        (template) => !TYPES_SINGLETONS.includes(template.schemaType as never),
      ),
  },
  document: {
    actions: (actions, contexte) =>
      TYPES_SINGLETONS.includes(contexte.schemaType as never)
        ? actions.filter(
            (action) =>
              !["delete", "duplicate", "unpublish"].includes(action.action ?? ""),
          )
        : actions,
  },
})
