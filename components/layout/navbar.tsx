"use client";

import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { LocalizedText } from "@/components/ui/localized-text";
import { PROFILE } from "@/data/profile";
import { copy, navigationItems } from "@/data/translations";
import { cn } from "@/lib/utils";

const primaryLinks = navigationItems.filter(
  (item) => item.href === "#projects" || item.href === "#about",
).sort((left) => (left.href === "#projects" ? -1 : 1));
const mobileLinks = [
  ...primaryLinks,
  ...navigationItems.filter((item) => item.href === "#contact"),
];

export function Navbar() {
  const [isCompact, setIsCompact] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function updateHeader() {
      setIsCompact(window.scrollY > 24);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-[120] -translate-y-20 bg-black px-4 py-3 text-sm font-medium text-white transition-transform focus:translate-y-0"
      >
        <LocalizedText text={copy.accessibility.skipToContent} />
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[height,background-color,border-color,backdrop-filter] duration-300",
          isCompact
            ? "h-16 border-black/10 bg-[rgb(247_247_244/0.9)] backdrop-blur-md"
            : "h-20 border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-[1500px] items-center justify-between px-6 md:px-10 lg:px-12">
          <a
            href="#home"
            className="inline-flex min-h-11 items-center text-sm font-medium tracking-tight text-black"
            aria-label="Manico George – Home"
            onClick={() => setIsMenuOpen(false)}
          >
            MG.
          </a>

          <span id="main-navigation-label" className="sr-only">
            <LocalizedText text={copy.accessibility.mainNavigation} />
          </span>
          <nav
            className="hidden items-center gap-8 text-xs text-[var(--muted)] md:flex"
            aria-labelledby="main-navigation-label"
          >
            {primaryLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "min-h-11 items-center transition-colors duration-300 hover:text-black",
                  item.href === "#about" ? "hidden min-[420px]:inline-flex" : "inline-flex",
                )}
              >
                <LocalizedText text={item.label} />
              </a>
            ))}
            <LanguageSwitcher />
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center whitespace-nowrap text-[var(--muted)] transition-colors duration-300 hover:text-black"
            >
              LinkedIn ↗
            </a>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="inline-flex min-h-11 items-center text-xs font-medium text-[var(--muted)] transition-colors duration-300 hover:text-black"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              <span className="localized-text localized-text-de" lang="de">
                {isMenuOpen ? "Schliessen" : "Menü"}
              </span>
              <span className="localized-text localized-text-en" lang="en">
                {isMenuOpen ? "Close" : "Menu"}
              </span>
            </button>
          </div>
        </div>

        <div
          id="mobile-navigation"
          className={cn(
            "absolute inset-x-0 top-full overflow-hidden border-b bg-[var(--background)] transition-[max-height,opacity,visibility] duration-300 md:hidden",
            isMenuOpen
              ? "visible max-h-80 border-black/10 opacity-100"
              : "invisible max-h-0 border-transparent opacity-0",
          )}
          aria-hidden={!isMenuOpen}
        >
          <nav
            className="mx-auto flex max-w-[1500px] flex-col px-6 py-5 text-sm md:px-10"
            aria-label="Mobile navigation"
          >
            {mobileLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-[var(--line)] py-3.5 text-[var(--ink)]"
                onClick={() => setIsMenuOpen(false)}
              >
                <LocalizedText text={item.label} />
              </a>
            ))}
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 w-fit items-center rounded-full border border-black/20 px-5 text-sm text-black transition-colors duration-300 hover:bg-black hover:text-white"
            >
              LinkedIn ↗
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}