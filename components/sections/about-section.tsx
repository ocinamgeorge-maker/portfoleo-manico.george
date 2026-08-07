import Image from "next/image";

import { LocalizedText } from "@/components/ui/localized-text";
import { Reveal } from "@/components/ui/reveal";
import { copy } from "@/data/translations";
import portraitImage from "@/public/images/manico-george.jpg";

type AboutSectionProps = {
  age: number;
};

export function AboutSection({ age }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="scroll-mt-16 border-t border-[var(--line)] bg-[var(--background)]"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto w-full max-w-[1500px] px-6 py-24 md:px-10 md:py-36 lg:px-12 lg:py-44">
        <div className="grid gap-14 md:grid-cols-[1fr_3fr] md:gap-12">
          <Reveal fromY={18} duration={0.75}>
            <h2
              id="about-heading"
              className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]"
            >
              <LocalizedText text={copy.about.title} />
            </h2>

            <div className="about-portrait relative mt-8 aspect-[4/5] w-[65vw] max-w-[260px] overflow-hidden rounded-[24px] bg-neutral-200 md:w-full md:max-w-[240px]">
              <Image
                src={portraitImage}
                alt="Manico George"
                fill
                sizes="(max-width: 767px) 65vw, 240px"
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02] motion-reduce:transform-none"
              />
            </div>

            <div className="mt-8 md:max-w-44">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                <LocalizedText text={copy.about.age} />:
              </p>
              <p className="mt-2 text-2xl font-normal text-[var(--ink)]" aria-live="off">
                {age}
              </p>
            </div>
          </Reveal>

          <Reveal className="space-y-8" fromY={18} duration={0.75}>
            {copy.about.paragraphs.map((paragraph, index) => (
              <p
                key={`about-paragraph-${index}`}
                className="max-w-5xl text-2xl leading-[1.18] font-normal tracking-[-0.025em] text-[var(--ink)] md:text-4xl"
              >
                <LocalizedText text={paragraph} />
              </p>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}