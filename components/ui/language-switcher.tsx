"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

import { copy } from "@/data/translations";
import type { Language } from "@/lib/types";

const LANGUAGE_STORAGE_KEY = "manico-portfolio-language";

type LanguageSwitcherProps = {
  language: Language;
};

export function LanguageSwitcher({ language }: LanguageSwitcherProps) {
  const router = useRouter();

  function selectLanguage(nextLanguage: Language) {
    if (nextLanguage === language) {
      return;
    }

    const url = new URL(window.location.href);

    if (nextLanguage === "en") {
      url.searchParams.set("lang", "en");
    } else {
      url.searchParams.delete("lang");
    }

    document.documentElement.lang = nextLanguage === "de" ? "de-CH" : "en";

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {}

    startTransition(() => {
      router.replace(`${url.pathname}${url.search}${url.hash}`, {
        scroll: false,
      });
    });
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