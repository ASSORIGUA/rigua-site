import { defineCliConfig } from "sanity/cli"

/** CLI Sanity : lit le projet depuis l'environnement (.env.local). */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  },
})
