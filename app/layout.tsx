import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { copy } from "@/data/translations";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: copy.seo.title.de,
  description: copy.seo.description.de,
  applicationName: "Manico George Portfolio",
  creator: "Manico George",
  category: "Portfolio",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#f7f7f4",
};

const bootstrapScript = `
  (function () {
    try {
      var queryLanguage = new URLSearchParams(window.location.search).get("lang");
      var storedLanguage = window.localStorage.getItem("manico-portfolio-language");
      var language = queryLanguage === "de" || queryLanguage === "en"
        ? queryLanguage
        : storedLanguage === "de" || storedLanguage === "en"
          ? storedLanguage
          : "de";

      document.documentElement.lang = language;
      window.localStorage.setItem("manico-portfolio-language", language);
    } catch (_) {
      document.documentElement.lang = "de";
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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
