import { LocalizedText } from "@/components/ui/localized-text";
import { PROFILE } from "@/data/profile";
import { copy } from "@/data/translations";
import type { Language } from "@/lib/types";

type FooterProps = {
  language: Language;
};

export function Footer({ language }: FooterProps) {
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--background)]">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-6 py-8 md:flex-row md:items-end md:justify-between md:px-10 lg:px-12">
        <div>
          <p className="text-sm font-bold text-[var(--ink)]">{PROFILE.name}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            © {currentYear} · <LocalizedText text={copy.footer.builtWith} language={language} />
          </p>
        </div>
        <a
          href="#home"
          className="group inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-[var(--ink)] md:self-auto"
        >
          <LocalizedText text={copy.footer.backToTop} language={language} />
          <span className="transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden="true">
            ↑
          </span>
        </a>
      </div>
    </footer>
  );
}