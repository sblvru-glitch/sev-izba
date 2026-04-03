"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";

export type BurgerNavItem = { label: string; href: string };

type BurgerMenuBlockProps = {
  navItems: readonly BurgerNavItem[];
};

export function BurgerMenuBlock({ navItems }: BurgerMenuBlockProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const poleRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const pole = poleRef.current;
      const line1 = line1Ref.current;
      const line2 = line2Ref.current;
      if (!pole || !line1 || !line2) return;

      gsap.set(pole, {
        yPercent: -100,
        visibility: "hidden",
        pointerEvents: "none",
      });
      gsap.set([line1, line2], { transformOrigin: "50% 50%" });

      const tl = gsap.timeline({ paused: true });

      tl.to(
        line1,
        {
          y: "0.2rem",
          rotation: 45,
          duration: 0.38,
          ease: "power2.inOut",
        },
        0,
      )
        .to(
          line2,
          {
            y: "-0.2rem",
            rotation: -45,
            duration: 0.38,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          pole,
          {
            yPercent: 0,
            visibility: "visible",
            pointerEvents: "auto",
            duration: 0.5,
            ease: "power3.out",
          },
          0.08,
        );

      tl.eventCallback("onReverseComplete", () => {
        if (poleRef.current) {
          gsap.set(poleRef.current, {
            pointerEvents: "none",
            visibility: "hidden",
          });
        }
      });

      tlRef.current = tl;
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!open) return;

    const pole = poleRef.current;
    const isInsidePole = (target: EventTarget | null) =>
      target instanceof Node && !!pole?.contains(target);

    const blockBackgroundScroll = (e: WheelEvent | TouchEvent) => {
      if (!isInsidePole(e.target)) e.preventDefault();
    };

    document.addEventListener("wheel", blockBackgroundScroll, {
      capture: true,
      passive: false,
    });
    document.addEventListener("touchmove", blockBackgroundScroll, {
      capture: true,
      passive: false,
    });

    return () => {
      document.removeEventListener("wheel", blockBackgroundScroll, {
        capture: true,
      });
      document.removeEventListener("touchmove", blockBackgroundScroll, {
        capture: true,
      });
    };
  }, [open]);

  useEffect(() => {
    if (!tlRef.current) return;
    if (open) tlRef.current.play();
    else tlRef.current.reverse();
  }, [open]);

  const close = () => setOpen(false);

  const onBurgerClick = () => {
    setOpen((wasOpen) => {
      if (!wasOpen) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return !wasOpen;
    });
  };

  return (
    <div ref={wrapRef} className="burger-menu-block">
      <button
        type="button"
        className="burger-menu"
        aria-expanded={open}
        aria-controls="burger-menu-pole"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        onClick={onBurgerClick}
      >
        <span ref={line1Ref} className="burger-menu-line" aria-hidden />
        <span ref={line2Ref} className="burger-menu-line" aria-hidden />
      </button>

      <div
        ref={poleRef}
        id="burger-menu-pole"
        className="burger-menu-pole"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="burger-menu-pole-inner">
          {navItems.map((item) => (
            <div key={item.href} className="burger-menu-pole-item">
              <Link href={item.href} onClick={close}>
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
