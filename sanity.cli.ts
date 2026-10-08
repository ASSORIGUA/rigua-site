import { defineCliConfig } from "sanity/cli"

/**
 * Configuration du deploiement du Studio chez Sanity.
 * `studioHost` fixe l'adresse : https://assorigua.sanity.studio
 * Deploiement : npx sanity deploy
 */
export default defineCliConfig({
  api: {
    projectId: "3hk15w0h",
    dataset: "production",
  },
  studioHost: "assorigua",
  deployment: {
    appId: "cv3o3kiw391pxge7eodxobic",
  },
  autoUpdates: true,
})
