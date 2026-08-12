import { experiences } from "@/data/experience";
import { PROFILE } from "@/data/profile";
import { skillCategories } from "@/data/skills";
import { copy } from "@/data/translations";
import { getSiteUrl } from "@/lib/site-url";
import { isLanguage, type Language } from "@/lib/types";

const currentExperience =
  experiences.find((experience) => experience.current) ?? experiences[0];

const technologies = Array.from(
  new Set(skillCategories.flatMap((category) => category.technologies)),
);

export const siteConfig = {
  name: PROFILE.name,
  siteName: `${PROFILE.name} Portfolio`,
  role: copy.seo.role,
  title: copy.seo.title,
  description: copy.seo.description,
  organization: currentExperience.organization,
  currentStation: currentExperience.shortName,
  linkedinUrl: PROFILE.linkedinUrl,
  portraitPath: PROFILE.imagePath,
  socialImagePath: "/opengraph-image",
  defaultLanguage: "de" as const,
} as const;

export const seoKeywords = [
  "Manico George",
  "Manico George Swisscom",
  "Manico George Portfolio",
  "Software Developer Apprentice",
  "Software Development Apprentice",
  "Application Developer",
  "Informatiker EFZ Applikationsentwicklung",
  "Applikationsentwickler Swisscom",
  "Fullstack Developer",
  "Fullstack Development",
  "Artificial Intelligence",
  "Web Development",
  "Software Developer Switzerland",
  "Swisscom",
  "Vue.js",
  "React",
  "TypeScript",
  "Java",
  "Spring Boot",
  "REST APIs",
  "SQL",
  "Git",
  "Docker",
];

export function getRequestedLanguage(
  value: string | string[] | undefined,
): Language {
  const language = (Array.isArray(value) ? value[0] : value) ?? null;
  return isLanguage(language) ? language : siteConfig.defaultLanguage;
}

export function getLanguageTag(language: Language): "de-CH" | "en" {
  return language === "de" ? "de-CH" : "en";
}

export function getLocalizedUrls(siteUrl = getSiteUrl()) {
  return {
    de: new URL("/", siteUrl),
    en: new URL("/?lang=en", siteUrl),
  } as const;
}

export function createPortfolioJsonLd(
  language: Language,
  canonicalUrl: URL,
  siteUrl = getSiteUrl(),
): Record<string, unknown> {
  const websiteId = new URL("/#website", siteUrl).href;
  const personId = new URL("/#person", siteUrl).href;
  const profilePageId = `${canonicalUrl.href}#profile-page`;
  const portraitUrl = new URL(siteConfig.portraitPath, siteUrl).href;
  const knowsAbout = Array.from(
    new Set([
      "Fullstack Development",
      "Artificial Intelligence",
      "Web Development",
      "DevOps",
      ...technologies,
    ]),
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl.href,
        name: siteConfig.siteName,
        description: siteConfig.description.de,
        inLanguage: ["de-CH", "en"],
      },
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: canonicalUrl.href,
        name: siteConfig.title[language],
        description: siteConfig.description[language],
        inLanguage: getLanguageTag(language),
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        url: siteUrl.href,
        image: portraitUrl,
        jobTitle: siteConfig.role[language],
        worksFor: {
          "@type": "Organization",
          name: siteConfig.organization,
        },
        sameAs: [siteConfig.linkedinUrl],
        knowsAbout,
      },
    ],
  };
}
