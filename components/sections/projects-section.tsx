"use client";

import { useState } from "react";

import { ProjectTimelineItem } from "@/components/projects/project-timeline-item";
import { LocalizedText } from "@/components/ui/localized-text";
import { MaskReveal } from "@/components/ui/mask-reveal";
import { Reveal } from "@/components/ui/reveal";
import { experiences } from "@/data/experience";
import { copy } from "@/data/translations";
import { formatExperiencePeriod } from "@/lib/format-period";
import type { Language } from "@/lib/types";

type ProjectsSectionProps = {
  language: Language;
};

export function ProjectsSection({ language }: ProjectsSectionProps) {
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);

  return (
    <section
      id="projects"
      className="scroll-mt-16 bg-[var(--background)]"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto w-full max-w-[1500px] px-6 py-24 md:px-10 md:py-36 lg:px-12 lg:py-44">
        <MaskReveal className="text-[clamp(3rem,6vw,6rem)]">
          <h2
            id="projects-heading"
            className="text-[clamp(3rem,6vw,6rem)] leading-none font-medium tracking-[-0.05em] text-[var(--ink)]"
          >
            <LocalizedText text={copy.projects.title} language={language} />
          </h2>
        </MaskReveal>

        <div className="mt-14 border-b border-[var(--line)] md:mt-20">
          {experiences.map((experience, index) => (
            <Reveal
              key={experience.id}
              delay={index * 0.08}
              duration={0.7}
              start="top 82%"
            >
              <ProjectTimelineItem
                id={experience.id}
                number={String(index + 1).padStart(2, "0")}
                dateTime={experience.startDate.slice(0, 7)}
                period={{
                  de: formatExperiencePeriod(experience, "de").replace(
                    " – ",
                    " — ",
                  ),
                  en: formatExperiencePeriod(experience, "en").replace(
                    " – ",
                    " — ",
                  ),
                }}
                title={experience.projectTitle}
                description={experience.projectSummary}
                technologies={experience.projectTechnologies}
                language={language}
                moreLabel={copy.projects.showMore}
                lessLabel={copy.projects.showLess}
                open={openProjectId === experience.id}
                onToggle={() =>
                  setOpenProjectId((currentId) =>
                    currentId === experience.id ? null : experience.id,
                  )
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}