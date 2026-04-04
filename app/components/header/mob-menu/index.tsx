"use client";

import { CustomLink } from "@/app/components/custom-link/CustomLink";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import "./style.scss";

const DURATION_ICON = 0.32;
const DURATION_PANEL = 0.45;
const EASE_OPEN = "power3.out";
const EASE_CLOSE = "power2.in";
const EASE = "power2.out";

const NAV_ITEMS = [
  { label: "Главная", href: "/" },
  { label: "Проекты", href: "/projects" },
  { label: "Наши работы", href: "/works" },
  { label: "Услуги", href: "/services" },
  { label: "О нас", href: "/about" },
  { label: "Блог", href: "/blog" },
  { label: "Контакты", href: "/contacts" },
] as const;

export default function MobMenu() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const panel = panelRef.current;
    if (!line1 || !line2) return;
    gsap.set(line1, { y: -3, rotation: 0 });
    gsap.set(line2, { y: 3, rotation: 0 });
    if (panel) {
      gsap.set(panel, { yPercent: -100 });
    }
  }, []);

  const animateIconClosed = useCallback(() => {
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    if (!line1 || !line2) return;
    gsap.to(line1, {
      y: -3,
      rotation: 0,
      duration: DURATION_ICON,
      ease: EASE,
    });
    gsap.to(line2, {
      y: 3,
      rotation: 0,
      duration: DURATION_ICON,
      ease: EASE,
    });
  }, []);

  const close = useCallback(() => {
    const panel = panelRef.current;
    const nav = navRef.current;

    animateIconClosed();

    if (panel) {
      gsap.killTweensOf(panel);
      if (nav) gsap.killTweensOf(nav.querySelectorAll("a"));
      gsap.to(panel, {
        yPercent: -100,
        duration: DURATION_PANEL * 0.85,
        ease: EASE_CLOSE,
        onComplete: () => setOpen(false),
      });
    } else {
      setOpen(false);
    }
  }, [animateIconClosed]);

  const openMenu = useCallback(() => {
    setOpen(true);
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const panel = panelRef.current;
    const nav = navRef.current;

    if (line1 && line2) {
      gsap.to(line1, {
        y: 0,
        rotation: 45,
        duration: DURATION_ICON,
        ease: EASE,
      });
      gsap.to(line2, {
        y: 0,
        rotation: -45,
        duration: DURATION_ICON,
        ease: EASE,
      });
    }
    if (panel) {
      gsap.killTweensOf(panel);
      if (nav) gsap.killTweensOf(nav.querySelectorAll("a"));
      gsap.to(panel, {
        yPercent: 0,
        duration: DURATION_PANEL,
        ease: EASE_OPEN,
      });
      if (nav) {
        const links = nav.querySelectorAll("a");
        gsap.fromTo(
          links,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.08,
          },
        );
      }
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleToggle = () => {
    if (open) {
      close();
    } else {
      openMenu();
    }
  };

  return (
    <>
      <button
        type="button"
        className="burger-menu"
        aria-expanded={open}
        aria-controls="burger-menu-panel"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        onClick={handleToggle}
      >
        <div className="burger-menu-icon" aria-hidden>
          <span ref={line1Ref} className="burger-menu-icon-line" />
          <span ref={line2Ref} className="burger-menu-icon-line" />
        </div>
        <span className="burger-menu-text">Меню</span>
      </button>
      <div
        ref={panelRef}
        className="burger-menu-content"
        id="burger-menu-panel"
        data-open={open}
        aria-hidden={!open}
      >
        <nav ref={navRef} className="burger-menu-content__nav" aria-label="Мобильное меню">
          {NAV_ITEMS.map((item) => (
            <CustomLink
              key={item.href}
              href={item.href}
              className="burger-menu-content__link"
              onClick={close}
            >
              {item.label}
            </CustomLink>
          ))}
        </nav>
      </div>
    </>
  );
}
