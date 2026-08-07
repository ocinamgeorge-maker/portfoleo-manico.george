import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const germanUrl = new URL("/", siteUrl).href;
  const englishUrl = new URL("/?lang=en", siteUrl).href;
  const languages = {
    "de-CH": germanUrl,
    en: englishUrl,
  };

  return [
    {
      url: germanUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: englishUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
  ];
}