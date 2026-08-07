"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  fromOpacity?: number;
  fromY?: number;
  duration?: number;
  start?: string;
};

export function Reveal({
  children,
  className,
  delay = 0,
  fromOpacity = 0.25,
  fromY = 20,
  duration = 0.8,
  start = "top 85%",
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(element, { clearProps: "all" });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: fromOpacity, y: fromY },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start,
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, element);

    return () => context.revert();
  }, [delay, duration, fromOpacity, fromY, start]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}