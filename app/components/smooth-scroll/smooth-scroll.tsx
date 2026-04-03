"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import "./smooth-scroll.scss";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

type Props = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: Props) {
  const pathname = usePathname();
  const cancelledRef = useRef(false);
  const innerRafRef = useRef(0);

  useLayoutEffect(() => {
    cancelledRef.current = false;

    if (typeof window === "undefined") return undefined;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return undefined;

    const init = () => {
      if (cancelledRef.current) return;
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.1,
        smoothTouch: 0.12,
        effects: false,
      });
      ScrollTrigger.refresh();
    };

    const outerRaf = requestAnimationFrame(() => {
      innerRafRef.current = requestAnimationFrame(init);
    });

    return () => {
      cancelledRef.current = true;
      cancelAnimationFrame(outerRaf);
      if (innerRafRef.current) cancelAnimationFrame(innerRafRef.current);
      innerRafRef.current = 0;
      ScrollSmoother.get()?.kill();
      ScrollTrigger.refresh();
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pathname]);

  return (
    <div id="smooth-wrapper" className="smooth-scroll-wrapper">
      <div id="smooth-content" className="smooth-scroll-content">
        {children}
      </div>
    </div>
  );
}
