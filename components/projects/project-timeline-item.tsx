"use client";

import { useLayoutEffect, useRef } from "react";

import { LocalizedText } from "@/components/ui/localized-text";
import { gsap } from "@/lib/gsap";
import type {
  Language,
  LocalizedText as LocalizedTextValue,
} from "@/lib/types";

export type ProjectTimelineItemProps = {
  id: string;
  number: string;
  dateTime: string;
  period: LocalizedTextValue;
  title: LocalizedTextValue;
  description: LocalizedTextValue;
  technologies: string[];
  language: Language;
  moreLabel: LocalizedTextValue;
  lessLabel: LocalizedTextValue;
  open: boolean;
  onToggle: () => void;
};

export function ProjectTimelineItem({
  id,
  number,
  dateTime,
  period,
  title,
  description,
  technologies,
  language,
  moreLabel,
  lessLabel,
  open,
  onToggle,
}: ProjectTimelineItemProps) {
  const detailsRef = useRef<HTMLDivElement>(null);
  const titleId = `project-title-${id}`;
  const detailsId = `project-details-${id}`;

  useLayoutEffect(() => {
    const details = detailsRef.current;

    if (!details) {
      return;
    }

    gsap.killTweensOf(details);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(details, {
        height: open ? "auto" : 0,
        opacity: open ? 1 : 0,
      });
      return;
    }

    gsap.to(details, {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
      duration: open ? 0.65 : 0.5,
      ease: "power3.inOut",
      overwrite: "auto",
    });

    return () => gsap.killTweensOf(details);
  }, [open]);

  return (
    <article
      className="group border-t border-black/15 transition-colors duration-300 hover:border-black/35"
      aria-labelledby={titleId}
      data-project-number={number}
    >
      <div className="grid grid-cols-1 items-center gap-5 py-8 md:grid-cols-[140px_minmax(0,1fr)_auto] md:gap-6 md:py-10">
        <time
          dateTime={dateTime}
          className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500"
        >
          <LocalizedText text={period} language={language} />
        </time>

        <h3
          id={titleId}
          className="text-3xl font-normal tracking-[-0.035em] text-[var(--ink)] transition-transform duration-500 ease-out group-hover:translate-x-2 motion-reduce:transform-none md:text-4xl lg:text-5xl"
        >
          <span className="sr-only">{number}. </span>
          <LocalizedText text={title} language={language} />
        </h3>

        <button
          type="button"
          className="inline-flex w-fit items-center justify-center gap-3 rounded-full border border-black/20 px-5 py-3 text-xs font-medium text-black transition-[background-color,border-color,color] duration-300 hover:border-black hover:bg-black hover:text-white"
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={onToggle}
        >
          <LocalizedText
            text={open ? lessLabel : moreLabel}
            language={language}
          />
          <span
            className="relative flex size-6 items-center justify-center rounded-full border border-current"
            aria-hidden="true"
          >
            <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-current" />
            <span
              className={`absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-300 motion-reduce:transition-none ${
                open ? "scale-y-0" : "scale-y-100"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        ref={detailsRef}
        id={detailsId}
        className="project-details overflow-hidden"
        aria-hidden={!open}
      >
        <div className="grid grid-cols-1 md:grid-cols-[140px_minmax(0,1fr)_auto] md:gap-6">
          <div aria-hidden="true" />
          <div className="max-w-[720px] pb-10">
            <p className="text-base leading-relaxed text-neutral-600 md:text-lg">
              <LocalizedText text={description} language={language} />
            </p>
            <p className="mt-6 text-sm leading-7 text-neutral-500">
              {technologies.join(" · ")}
            </p>
          </div>
          <div aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}