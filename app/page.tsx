import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { JsonLd } from "@/components/seo/json-ld";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { IntroLoader } from "@/components/ui/intro-loader";
import { SmoothScrollContent } from "@/components/ui/smooth-scroll";
import { PROFILE } from "@/data/profile";
import { calculateAge } from "@/lib/calculate-age";
import {
  createPortfolioJsonLd,
  getLanguageTag,
  getLocalizedUrls,
  getRequestedLanguage,
  siteConfig,
} from "@/lib/seo";
import { getSiteUrl, isIndexableDeployment } from "@/lib/site-url";

type HomePageProps = {
  searchParams: Promise<{
    lang?: string | string[];
  }>;
};

export const revalidate = 3600;

export async function generateMetadata({
  searchParams,
}: HomePageProps): Promise<Metadata> {
  const parameters = await searchParams;
  const language = getRequestedLanguage(parameters.lang);
  const siteUrl = getSiteUrl();
  const localizedUrls = getLocalizedUrls(siteUrl);
  const canonicalUrl = localizedUrls[language];
  const socialImageUrl = new URL(siteConfig.socialImagePath, siteUrl);
  const title = siteConfig.title[language];
  const description = siteConfig.description[language];
  const indexable = isIndexableDeployment();

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "de-CH": localizedUrls.de,
        en: localizedUrls.en,
        "x-default": localizedUrls.de,
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description,
      siteName: siteConfig.siteName,
      locale: language === "de" ? "de_CH" : "en_US",
      alternateLocale: language === "de" ? ["en_US"] : ["de_CH"],
      images: [
        {
          url: socialImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: socialImageUrl, alt: title }],
    },
    robots: {
      index: indexable,
      follow: indexable,
      nocache: !indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
        noimageindex: !indexable,
        "max-video-preview": indexable ? -1 : 0,
        "max-image-preview": indexable ? "large" : "none",
        "max-snippet": indexable ? -1 : 0,
      },
    },
    other: {
      "content-language": getLanguageTag(language),
    },
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const parameters = await searchParams;
  const language = getRequestedLanguage(parameters.lang);
  const age = calculateAge(PROFILE.birthDate);
  const siteUrl = getSiteUrl();
  const localizedUrls = getLocalizedUrls(siteUrl);
  const canonicalUrl = localizedUrls[language];
  const structuredData = createPortfolioJsonLd(
    language,
    canonicalUrl,
    siteUrl,
  );

  return (
    <>
      <JsonLd data={structuredData} />
      <IntroLoader />
      <Navbar language={language} />
      <SmoothScrollContent>
        <div className="site-shell" lang={getLanguageTag(language)}>
          <main id="main-content" tabIndex={-1}>
            <HeroSection language={language} />
            <ProjectsSection language={language} />
            <SkillsSection language={language} />
            <AboutSection age={age} language={language} />
            <ContactSection language={language} />
          </main>
          <Footer language={language} />
        </div>
      </SmoothScrollContent>
    </>
  );
}
