import { Fragment } from "react";

import { LocalizedText } from "@/components/ui/localized-text";
import type { SkillCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

type SkillCapabilityGroupProps = {
  category: SkillCategory;
  number: string;
  className?: string;
};

export function SkillCapabilityGroup({
  category,
  number,
  className,
}: SkillCapabilityGroupProps) {
  return (
    <section className={cn("skill-group group/skills", className)}>
      <div className="mb-6 h-px w-12 bg-black/25" aria-hidden="true" />

      <div className="flex items-center gap-4">
        <span className="text-[10px] tracking-[0.16em] text-neutral-400">
          {number}
        </span>
        <h3 className="text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-500">
          <LocalizedText text={category.title} />
        </h3>
      </div>

      <p className="mt-4 text-sm leading-6 text-neutral-500">
        <LocalizedText text={category.description} />
      </p>

      <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {category.technologies.map((technology, index) => (
          <Fragment key={technology}>
            <span className="skill-name inline-block text-[clamp(2rem,10vw,3.5rem)] leading-[1.05] tracking-[-0.045em] text-black transition-[opacity,transform] duration-300 ease-out group-hover/skills:opacity-35 hover:!opacity-100 hover:-translate-y-[3px] motion-reduce:transform-none md:text-[clamp(2rem,4vw,4.5rem)]">
              {technology}
            </span>
            {index < category.technologies.length - 1 ? (
              <span
                className="text-[clamp(1.5rem,7vw,2.5rem)] leading-none text-neutral-300 md:text-[clamp(1.5rem,3vw,3rem)]"
                aria-hidden="true"
              >
                ·
              </span>
            ) : null}
          </Fragment>
        ))}
      </div>
    </section>
  );
}