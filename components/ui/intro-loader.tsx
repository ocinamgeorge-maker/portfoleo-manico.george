"use client";

import { useEffect, useRef } from "react";

const INTRO_STORAGE_KEY = "manico-portfolio-intro-seen";

export function IntroLoader() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;

    if (root.dataset.intro !== "pending") {
      return;
    }

    let cancelled = false;
    let revertAnimation: (() => void) | undefined;

    async function playIntro() {
      const { gsap } = await import("gsap");

      if (cancelled || !containerRef.current) {
        return;
      }

      const context = gsap.context(() => {
        gsap
          .timeline({
            defaults: { ease: "power2.out" },
            onComplete: () => {
              sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
              root.dataset.intro = "complete";
              window.dispatchEvent(new Event("portfolio-intro-complete"));
            },
          })
          .fromTo(
            "[data-intro-mark]",
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.28 },
          )
          .to(containerRef.current, { autoAlpha: 0, duration: 0.28 }, "+=0.18");
      }, containerRef);

      revertAnimation = () => context.revert();
    }

    void playIntro();

    return () => {
      cancelled = true;
      revertAnimation?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="intro-loader fixed inset-0 z-[100] flex items-center justify-center bg-[var(--background)]"
      aria-hidden="true"
    >
      <span
        className="text-lg font-semibold text-[var(--ink)]"
        data-intro-mark
      >
        MG.
      </span>
    </div>
  );
}