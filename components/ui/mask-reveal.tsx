"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";

import { gsap, registerScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type MaskRevealProps = {
  children: ReactNode;
  className?: string;
};

export function MaskReveal({ children, className }: MaskRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (!wrapper || !content) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(content, { clearProps: "all" });
      return;
    }

    registerScrollTrigger();

    const context = gsap.context(() => {
      gsap.fromTo(
        content,
        { opacity: 0.2, y: 24 },
        {
          opacity: 1,
          y: 0,
          yPercent: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 88%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, wrapper);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn("overflow-hidden pb-[0.12em]", className)}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
}