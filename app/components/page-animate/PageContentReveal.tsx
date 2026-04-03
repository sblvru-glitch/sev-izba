"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type PageContentRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Селектор элементов внутри обёртки (например `[data-reveal]`). Без него анимируются прямые дети. */
  itemSelector?: string;
  stagger?: number;
  duration?: number;
  y?: number;
};

export function PageContentReveal({
  children,
  className,
  itemSelector,
  stagger = 0.11,
  duration = 0.7,
  y = 32,
}: PageContentRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const targets = itemSelector
        ? gsap.utils.toArray<HTMLElement>(root.querySelectorAll(itemSelector))
        : gsap.utils.toArray<HTMLElement>(root.children);

      if (!targets.length) return;

      if (prefersReduced) return;

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
          clearProps: "transform",
        },
      );
    }, root);

    return () => ctx.revert();
  }, [itemSelector, stagger, duration, y]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
