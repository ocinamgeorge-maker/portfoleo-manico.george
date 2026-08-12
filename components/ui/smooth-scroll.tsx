"use client";

import { ScrollSmoother } from "gsap/ScrollSmoother";
import type { ReactNode } from "react";
import { useEffect } from "react";

import { gsap, registerScrollTrigger, ScrollTrigger } from "@/lib/gsap";

const SMOOTH_DURATION = 1.15;
let scrollSmootherRegistered = false;

type SmoothScrollProps = {
  children: ReactNode;
};

function getHashTarget(hash: string): HTMLElement | null {
  if (!hash.startsWith("#") || hash.length === 1) {
    return null;
  }

  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const mediaQueries = [reducedMotion, coarsePointer, finePointer];
    let disposeSmoother: (() => void) | undefined;

    function configureSmoother() {
      disposeSmoother?.();
      disposeSmoother = undefined;

      if (reducedMotion.matches || coarsePointer.matches || !finePointer.matches) {
        return;
      }

      const wrapper = document.getElementById("smooth-wrapper");
      const content = document.getElementById("smooth-content");

      if (!wrapper || !content) {
        return;
      }

      registerScrollTrigger();

      if (!scrollSmootherRegistered) {
        gsap.registerPlugin(ScrollSmoother);
        scrollSmootherRegistered = true;
      }

      ScrollSmoother.get()?.kill();

      const smoother = ScrollSmoother.create({
        wrapper,
        content,
        smooth: SMOOTH_DURATION,
        effects: true,
        normalizeScroll: true,
      });
      const root = document.documentElement;
      root.classList.add("gsap-smooth-scroll");

      function scrollToTarget(target: HTMLElement, smooth: boolean) {
        const scrollPadding =
          Number.parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
        const targetPosition = Math.max(
          0,
          smoother.offset(target, "top top") - scrollPadding,
        );

        smoother.scrollTo(targetPosition, smooth);
      }

      function scrollToHash(hash: string, smooth: boolean) {
        const target = getHashTarget(hash);

        if (target) {
          scrollToTarget(target, smooth);
        }
      }

      function handleAnchorClick(event: MouseEvent) {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        const source = event.target;

        if (!(source instanceof Element)) {
          return;
        }

        const anchor = source.closest<HTMLAnchorElement>('a[href^="#"]');
        const hash = anchor?.getAttribute("href");
        const target = hash ? getHashTarget(hash) : null;

        if (!anchor || !hash || !target) {
          return;
        }

        event.preventDefault();
        scrollToTarget(target, true);

        if (window.location.hash !== hash) {
          window.history.pushState(null, "", hash);
        }

        if (hash === "#main-content") {
          target.focus({ preventScroll: true });
        }
      }

      function refreshScrollPositions() {
        smoother.refresh();
        ScrollTrigger.refresh();
      }

      function handleHashChange() {
        if (window.location.hash) {
          scrollToHash(window.location.hash, true);
        } else {
          smoother.scrollTo(0, true);
        }
      }

      document.addEventListener("click", handleAnchorClick);
      window.addEventListener("hashchange", handleHashChange);
      window.addEventListener("portfolio-intro-complete", refreshScrollPositions);

      const frame = window.requestAnimationFrame(() => {
        refreshScrollPositions();
        scrollToHash(window.location.hash, false);
      });

      disposeSmoother = () => {
        window.cancelAnimationFrame(frame);
        document.removeEventListener("click", handleAnchorClick);
        window.removeEventListener("hashchange", handleHashChange);
        window.removeEventListener(
          "portfolio-intro-complete",
          refreshScrollPositions,
        );
        root.classList.remove("gsap-smooth-scroll");
        smoother.kill();
        ScrollTrigger.refresh();
      };
    }

    mediaQueries.forEach((mediaQuery) => {
      mediaQuery.addEventListener("change", configureSmoother);
    });
    configureSmoother();

    return () => {
      mediaQueries.forEach((mediaQuery) => {
        mediaQuery.removeEventListener("change", configureSmoother);
      });
      disposeSmoother?.();
    };
  }, []);

  return <>{children}</>;
}

export function SmoothScrollContent({ children }: SmoothScrollProps) {
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
