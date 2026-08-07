import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { IntroLoader } from "@/components/ui/intro-loader";
import { PROFILE } from "@/data/profile";
import { copy } from "@/data/translations";
import { calculateAge } from "@/lib/calculate-age";
import { getSiteUrl } from "@/lib/site-url";
import { isLanguage, type Language } from "@/lib/types";

type HomePageProps = {
  searchParams: Promise<{
    lang?: string | string[];
  }>;
};

export const revalidate = 3600;

function getRequestedLanguage(value: string | string[] | undefined): Language {
  const language = (Array.isArray(value) ? value[0] : value) ?? null;
  return isLanguage(language) ? language : "de";
}

export async function generateMetadata({
  searchParams,
}: HomePageProps): Promise<Metadata> {
  const parameters = await searchParams;
  const language = getRequestedLanguage(parameters.lang);
  const siteUrl = getSiteUrl();
  const germanUrl = new URL("/", siteUrl);
  const englishUrl = new URL("/?lang=en", siteUrl);
  const canonicalUrl = language === "en" ? englishUrl : germanUrl;
  const socialImageUrl = new URL(PROFILE.imagePath, siteUrl);
  const title = copy.seo.title[language];
  const description = copy.seo.description[language];

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "de-CH": germanUrl,
        en: englishUrl,
        "x-default": germanUrl,
      },
    },
    openGraph: {
      type: "profile",
      url: canonicalUrl,
      title,
      description,
      siteName: PROFILE.name,
      locale: language === "de" ? "de_CH" : "en_US",
      alternateLocale: language === "de" ? ["en_US"] : ["de_CH"],
      images: [
        {
          url: socialImageUrl,
          width: 1200,
          height: 1500,
          alt: PROFILE.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "content-language": language === "de" ? "de-CH" : "en",
    },
  };
}

export default function Home() {
  const age = calculateAge(PROFILE.birthDate);
  const siteUrl = getSiteUrl();
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    url: siteUrl.href,
    image: new URL(PROFILE.imagePath, siteUrl).href,
    sameAs: [PROFILE.linkedinUrl],
    jobTitle: [
      "Softwareentwickler in Ausbildung",
      "Software Developer Apprentice",
    ],
    affiliation: {
      "@type": "Organization",
      name: "Swisscom",
    },
    knowsAbout: [
      "Fullstack Development",
      "DevOps",
      "Web Development",
      "Artificial Intelligence",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />
      <IntroLoader />
      <div className="site-shell">
        <Navbar />
        <main id="main-content">
          <HeroSection />
          <ProjectsSection />
          <SkillsSection />
          <AboutSection age={age} />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
