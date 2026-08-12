import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { seoKeywords, siteConfig } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: siteConfig.title.de,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description.de,
  applicationName: siteConfig.siteName,
  keywords: seoKeywords,
  authors: [{ name: siteConfig.name, url: getSiteUrl() }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#f7f7f4",
};

const bootstrapScript = `
  (function () {
    document.documentElement.classList.add("js");

    try {
      var url = new URL(window.location.href);
      var queryLanguage = url.searchParams.get("lang");
      var storedLanguage = window.localStorage.getItem("manico-portfolio-language");
      var hasQueryLanguage = queryLanguage === "de" || queryLanguage === "en";

      if (!hasQueryLanguage && storedLanguage === "en") {
        url.searchParams.set("lang", "en");
        window.location.replace(url.toString());
        return;
      }

      var language = hasQueryLanguage ? queryLanguage : "de";

      document.documentElement.lang = language === "de" ? "de-CH" : "en";
      window.localStorage.setItem("manico-portfolio-language", language);
    } catch (_) {
      document.documentElement.lang = "de-CH";
    }

    try {
      var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var introSeen = window.sessionStorage.getItem("manico-portfolio-intro-seen") === "true";
      document.documentElement.dataset.intro = reducedMotion || introSeen ? "skip" : "pending";
    } catch (_) {
      document.documentElement.dataset.intro = "skip";
    }
  })();
`;

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: RootLayoutProps) {
  const language =
    (await headers()).get("x-portfolio-language") === "en" ? "en" : "de-CH";

  return (
    <html
      lang={language}
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
      </head>
      <body className="min-h-full">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
