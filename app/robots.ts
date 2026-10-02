import type { MetadataRoute } from "next"

import { urlAbsolue } from "@/lib/site"

/**
 * Directives d'exploration.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: urlAbsolue("/sitemap.xml"),
  }
}
