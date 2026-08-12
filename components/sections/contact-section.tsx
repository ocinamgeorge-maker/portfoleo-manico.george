import { LocalizedText } from "@/components/ui/localized-text";
import { MaskReveal } from "@/components/ui/mask-reveal";
import { Reveal } from "@/components/ui/reveal";
import { PROFILE } from "@/data/profile";
import { copy } from "@/data/translations";
import type { Language } from "@/lib/types";

type ContactSectionProps = {
  language: Language;
};

export function ContactSection({ language }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="scroll-mt-16 border-t border-[var(--line)] bg-[var(--background)]"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto w-full max-w-[1500px] px-6 py-24 md:px-10 md:py-36 lg:px-12 lg:py-44">
        <Reveal>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
            <LocalizedText text={copy.contact.title} language={language} />
          </p>
        </Reveal>

        <MaskReveal className="mt-6 text-[clamp(3.2rem,7vw,8rem)]">
          <h2
            id="contact-heading"
            className="max-w-5xl text-[clamp(3.2rem,7vw,8rem)] leading-[0.95] font-normal tracking-[-0.055em] text-[var(--ink)]"
          >
            <LocalizedText text={copy.contact.statement} language={language} />
          </h2>
        </MaskReveal>

        <Reveal className="mt-10">
          <p className="text-base text-[var(--muted)] md:text-lg">
            <LocalizedText text={copy.contact.focusLine} language={language} />
          </p>
        </Reveal>

        <Reveal className="mt-16 md:mt-24">
          <address className="not-italic">
            <a
              href={`mailto:${PROFILE.email}`}
              className="group inline-flex max-w-full items-start gap-3 whitespace-nowrap text-[clamp(1rem,5.4vw,2rem)] leading-[1.05] font-normal tracking-[-0.04em] text-[var(--ink)] transition-opacity duration-300 hover:opacity-60 md:text-[clamp(2rem,5vw,5rem)]"
            >
              <span>{PROFILE.email}</span>
              <span className="text-[0.45em] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true">
                ↗
              </span>
            </a>

            <div className="mt-16 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)]">
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-black"
              >
                LinkedIn ↗
              </a>
              <a
                href={PROFILE.phoneHref}
                className="transition-colors duration-300 hover:text-black"
              >
                <LocalizedText text={copy.contact.phone} language={language} /> ↗
              </a>
              {PROFILE.showCvButton ? (
                <a
                  href={PROFILE.cvPath}
                  download
                  className="transition-colors duration-300 hover:text-black"
                >
                  <LocalizedText text={copy.contact.downloadCv} language={language} /> ↓
                </a>
              ) : null}
            </div>
          </address>
        </Reveal>
      </div>
    </section>
  );
}