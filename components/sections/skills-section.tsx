import { SkillCapabilityGroup } from "@/components/skills/skill-capability-group";
import { LocalizedText } from "@/components/ui/localized-text";
import { MaskReveal } from "@/components/ui/mask-reveal";
import { Reveal } from "@/components/ui/reveal";
import { skillCategories } from "@/data/skills";
import { copy } from "@/data/translations";
import type { Language } from "@/lib/types";

type SkillsSectionProps = {
  language: Language;
};

export function SkillsSection({ language }: SkillsSectionProps) {
  return (
    <section
      id="skills"
      className="skills-section scroll-mt-16 border-t border-[var(--line)] bg-[var(--background)]"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto w-full max-w-[1500px] px-6 py-24 md:px-10 md:py-32 lg:px-12 lg:py-36">
        <Reveal>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
            <LocalizedText text={copy.skills.label} language={language} />
          </p>
        </Reveal>

        <MaskReveal className="mt-6 text-[clamp(3.5rem,6vw,6.5rem)]">
          <h2
            id="skills-heading"
            className="skills-heading max-w-[900px] text-[clamp(3.5rem,6vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.055em] text-[var(--ink)]"
          >
            <LocalizedText text={copy.skills.title} language={language} />
          </h2>
        </MaskReveal>

        <div className="skills-grid mt-16 grid grid-cols-1 gap-x-16 gap-y-20 md:mt-24 md:grid-cols-2 md:gap-y-24">
          {skillCategories.map((category, index) => (
            <Reveal
              key={category.id}
              delay={index * 0.08}
              fromY={18}
              duration={0.7}
              start="top 82%"
            >
              <SkillCapabilityGroup
                category={category}
                number={String(index + 1).padStart(2, "0")}
                language={language}
                className={
                  index === 0
                    ? "md:pr-10"
                    : index === 1
                      ? "md:pt-16"
                      : index === 2
                        ? "md:pl-12"
                        : "md:pt-10"
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}