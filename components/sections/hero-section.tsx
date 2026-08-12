"use client";

import gsap from "gsap";
import { Instrument_Serif } from "next/font/google";
import { useLayoutEffect, useRef } from "react";

import { LocalizedText } from "@/components/ui/localized-text";
import { PROFILE } from "@/data/profile";
import { copy } from "@/data/translations";
import type { Language } from "@/lib/types";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
});

type HeroSectionProps = {
  language: Language;
};

export function HeroSection({ language }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;

    if (!hero) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      gsap.set(
        [
          ".hero-kicker",
          ".hero-line",
          ".hero-ampersand",
          ".hero-motto",
          ".hero-actions",
        ],
        { clearProps: "all" },
      );
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      timeline
        .fromTo(
          ".hero-kicker",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.55 },
        )
        .fromTo(
          ".hero-line",
          { yPercent: 120, rotate: 2 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.15,
            stagger: 0.11,
          },
          0.15,
        )
        .fromTo(
          [".hero-motto", ".hero-actions"],
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out",
          },
          0.75,
        );

      gsap.fromTo(
        ".hero-ampersand",
        { opacity: 0, scale: 0.7, rotate: -10 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.8,
          delay: 0.5,
          ease: "back.out(1.4)",
        },
      );

    }, hero);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="scroll-mt-20 bg-[var(--background)] pt-20"
    >
      <div className="relative mx-auto min-h-[calc(100svh-80px)] w-full max-w-[1500px] overflow-hidden px-6 pt-8 pb-12 md:px-10 md:pt-[12vh] md:pb-16 lg:px-12 lg:pt-[14vh] min-[1700px]:-translate-x-[3vw]">
        <p className="hero-kicker max-w-[18rem] text-[9px] font-medium uppercase text-[rgb(12_12_12/0.55)] md:max-w-none md:text-[11px] lg:-ml-8 xl:-ml-10">
          <LocalizedText text={copy.hero.eyebrow} language={language} />
        </p>

        <div className="relative mt-8 md:mt-9">
          <h1 className="relative z-20 font-medium leading-[0.82] text-[#0c0c0c]">
            <span className="sr-only">
              <LocalizedText text={copy.hero.title} language={language} />
            </span>
            <span aria-hidden="true">
              <span className="block overflow-hidden pb-[0.08em] lg:-ml-8 xl:-ml-10">
                <span className="hero-line block origin-bottom-left text-[3.2rem] md:text-[7rem] lg:text-[8.5rem] xl:text-[9.5rem]">
                  Fullstack
                </span>
              </span>

              <span className="mt-[-0.04em] ml-[7vw] flex items-baseline md:ml-[8vw] lg:ml-[60px] xl:ml-[80px]">
                <span
                  className={`${instrumentSerif.className} hero-ampersand relative z-20 mr-[0.12em] inline-block text-[3.5rem] leading-none font-normal md:text-[6.5rem] lg:text-[8rem] xl:text-[9rem]`}
                >
                  &amp;
                </span>
                <span className="overflow-hidden pb-[0.08em]">
                  <span className="hero-line block origin-bottom-left text-[3.2rem] md:text-[7rem] lg:text-[8.5rem] xl:text-[9.5rem]">
                    <span className="md:hidden">AI</span>
                    <span className="hidden md:inline">AI Developer</span>
                  </span>
                </span>
              </span>

              <span className="ml-0 block overflow-hidden pb-[0.08em] min-[360px]:ml-[18vw] md:hidden">
                <span className="hero-line block origin-bottom-left text-[3.2rem]">
                  Developer
                </span>
              </span>
            </span>
          </h1>

        </div>

        <div className="mx-auto mt-12 w-fit md:mt-14">
          <div className="hero-motto flex items-center gap-4 text-sm text-[rgb(12_12_12/0.55)]">
            <span className="block h-px w-14 bg-black" aria-hidden="true" />
            <span className={instrumentSerif.className}>
              <LocalizedText text={copy.hero.motto} language={language} />
            </span>
          </div>

          <div className="hero-actions mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-13 items-center gap-5 rounded-full border border-black px-7 py-3.5 text-sm font-medium text-black transition-[background-color,color] duration-300 hover:bg-black hover:text-white"
            >
              <LocalizedText text={copy.hero.linkedin} language={language} />
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true">
                ↗
              </span>
            </a>
            <a
              href="#projects"
              className="group inline-flex min-h-11 items-center gap-3 text-sm font-medium text-black transition-opacity duration-300 hover:opacity-60"
            >
              <LocalizedText text={copy.hero.viewProjects} language={language} />
              <span className="transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}