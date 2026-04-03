"use client";

import { usePathname } from "next/navigation";
import { CustomLink } from "../custom-link/CustomLink";
import "./breadcrumbs.scss";

const SEGMENT_LABELS: Record<string, string> = {
  projects: "Проекты",
  works: "Наши работы",
  services: "Услуги",
  about: "О нас",
  blog: "Блог",
  contacts: "Контакты",
};

function labelForSegment(segment: string): string {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment];
  return segment
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

type BreadcrumbsProps = {
  /** Подпись для текущей страницы вместо сегмента URL (например заголовок поста) */
  currentLabel?: string;
};

export function Breadcrumbs({ currentLabel }: BreadcrumbsProps = {}) {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const items = [
    { label: "Главная", href: "/" },
    ...segments.map((seg, i) => ({
      label: labelForSegment(seg),
      href: `/${segments.slice(0, i + 1).join("/")}`,
    })),
  ];

  if (currentLabel && items.length > 1) {
    items[items.length - 1] = {
      ...items[items.length - 1],
      label: currentLabel,
    };
  }

  return (
    <nav className="breadcrumbs" aria-label="Хлебные крошки">
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="breadcrumbs__item">
              {isLast ? (
                <span className="breadcrumbs__current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <CustomLink href={item.href} className="breadcrumbs__link">
                  {item.label}
                </CustomLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
