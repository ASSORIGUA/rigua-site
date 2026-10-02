import { NextStudio } from "next-sanity/studio"

import config from "@/sanity.config"

/**
 * Le Studio Sanity, accessible sur /studio.
 *
 * `dynamic = "force-static"` : le Studio est une application cliente, rien
 * à générer côté serveur. Sans projet configuré (variable d'environnement
 * absente), la page explique quoi faire au lieu de planter.
 */
export const dynamic = "force-static"

export { metadata, viewport } from "next-sanity/studio"

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main style={{ padding: "4rem 1.5rem", maxWidth: "40rem", margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          Studio non configuré
        </h1>
        <p>
          Renseignez la variable d&apos;environnement{" "}
          <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> (et redéployez) pour
          activer l&apos;interface de gestion du contenu.
        </p>
      </main>
    )
  }
  return <NextStudio config={config} />
}
