"use client";

import { useEffect, useSyncExternalStore } from "react";

import { copy } from "@/data/translations";
import { isLanguage, type Language } from "@/lib/types";

const LANGUAGE_STORAGE_KEY = "manico-portfolio-language";

function updateMetaContent(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content);
}

function applyLanguage(language: Language) {
  const title = copy.seo.title[language];
  const description = copy.seo.description[language];

  document.documentElement.lang = language;
  document.title = title;
  updateMetaContent('meta[name="description"]', description);
  updateMetaContent('meta[property="og:title"]', title);
  updateMetaContent('meta[property="og:description"]', description);
  updateMetaContent('meta[name="twitter:title"]', title);
  updateMetaContent('meta[name="twitter:description"]', description);
}

function subscribeToLanguageChange(onStoreChange: () => void) {
  window.addEventListener("portfolio-language-change", onStoreChange);

  return () => {
    window.removeEventListener("portfolio-language-change", onStoreChange);
  };
}

function getLanguageSnapshot(): Language {
  const queryLanguage = new URLSearchParams(window.location.search).get("lang");

  if (isLanguage(queryLanguage)) {
    return queryLanguage;
  }

  try {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (isLanguage(storedLanguage)) {
      return storedLanguage;
    }
  } catch {}

  const documentLanguage = document.documentElement.lang;
  return isLanguage(documentLanguage) ? documentLanguage : "de";
}

export function LanguageSwitcher() {
  const language = useSyncExternalStore<Language>(
    subscribeToLanguageChange,
    getLanguageSnapshot,
    () => "de",
  );

  useEffect(() => {
    applyLanguage(getLanguageSnapshot());
  }, [language]);

  function selectLanguage(nextLanguage: Language) {
    const url = new URL(window.location.href);

    applyLanguage(nextLanguage);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);

    if (nextLanguage === "en") {
      url.searchParams.set("lang", "en");
    } else {
      url.searchParams.delete("lang");
    }

    window.history.replaceState({}, "", url);
    window.dispatchEvent(
      new CustomEvent<Language>("portfolio-language-change", {
        detail: nextLanguage,
      }),
    );
  }

  return (
    <div
      className="flex min-h-11 items-center gap-1 text-xs font-medium uppercase sm:text-sm"
      role="group"
      aria-label={copy.accessibility.languageSwitcher[language]}
    >
      <button
        type="button"
        className={
          language === "de"
            ? "min-h-11 px-1 text-black"
            : "min-h-11 px-1 text-[var(--muted)] transition-colors duration-300 hover:text-black"
        }
        data-language-option="de"
        aria-pressed={language === "de"}
        onClick={() => selectLanguage("de")}
      >
        DE
      </button>
      <span className="text-[var(--muted-light)]" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={
          language === "en"
            ? "min-h-11 px-1 text-black"
            : "min-h-11 px-1 text-[var(--muted)] transition-colors duration-300 hover:text-black"
        }
        data-language-option="en"
        aria-pressed={language === "en"}
        onClick={() => selectLanguage("en")}
      >
        EN
      </button>
    </div>
  );
}