import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.siteName,
    short_name: siteConfig.name,
    description: siteConfig.description.de,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f7f4",
    theme_color: "#f7f7f4",
    lang: "de-CH",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
