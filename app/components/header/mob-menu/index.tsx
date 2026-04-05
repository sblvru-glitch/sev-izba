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
  const innerRef = useRef<HTMLDivElement>(null);
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
    const inner = innerRef.current;

    animateIconClosed();

    if (panel) {
      gsap.killTweensOf(panel);
      if (inner) gsap.killTweensOf(inner.querySelectorAll("a"));
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
    const inner = innerRef.current;

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
      if (inner) gsap.killTweensOf(inner.querySelectorAll("a"));
      gsap.to(panel, {
        yPercent: 0,
        duration: DURATION_PANEL,
        ease: EASE_OPEN,
      });
      if (inner) {
        const links = inner.querySelectorAll("a");
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
        <div ref={innerRef} className="burger-menu-content__inner">
          <nav className="burger-menu-content__nav" aria-label="Мобильное меню">
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
          <button className="burger-menu-content__button">Написать нам</button>
          <div className="burger-menu-content__social" aria-label="Социальные сети">
            <a
              href="https://vk.com/sev_izba"
              target="_blank"
              rel="noopener noreferrer"
              className="burger-menu-content__social-link"
              aria-label="ВКонтакте"
              onClick={close}
            >
              <svg width="25" height="25" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M17.802 12.298s1.617 1.597 2.017 2.336a.127.127 0 0 1 .018.035c.163.273.203.487.123.645-.135.261-.592.392-.747.403h-2.858c-.199 0-.613-.052-1.117-.4-.385-.269-.768-.712-1.139-1.145-.554-.643-1.033-1.201-1.518-1.201a.548.548 0 0 0-.18.03c-.367.116-.833.639-.833 2.032 0 .436-.344.684-.585.684H9.674c-.446 0-2.768-.156-4.827-2.327C2.324 10.732.058 5.4.036 5.353c-.141-.345.155-.533.475-.533h2.886c.387 0 .513.234.601.444.102.241.48 1.205 1.1 2.288 1.004 1.762 1.621 2.479 2.114 2.479a.527.527 0 0 0 .264-.07c.644-.354.524-2.654.494-3.128 0-.092-.001-1.027-.331-1.479-.236-.324-.638-.45-.881-.496.065-.094.203-.238.38-.323.441-.22 1.238-.252 2.029-.252h.439c.858.012 1.08.067 1.392.146.628.15.64.557.585 1.943-.016.396-.033.842-.033 1.367 0 .112-.005.237-.005.364-.019.711-.044 1.512.458 1.841a.41.41 0 0 0 .217.062c.174 0 .695 0 2.108-2.425.62-1.071 1.1-2.334 1.133-2.429.028-.053.112-.202.214-.262a.479.479 0 0 1 .236-.056h3.395c.37 0 .621.056.67.196.082.227-.016.92-1.566 3.016-.261.349-.49.651-.691.915-1.405 1.844-1.405 1.937.083 3.337z" />
              </svg>
            </a>
            <a
              href="https://t.me/SevernayaIzba"
              target="_blank"
              rel="noopener noreferrer"
              className="burger-menu-content__social-link"
              aria-label="Telegram"
              onClick={close}
            >
              <svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
