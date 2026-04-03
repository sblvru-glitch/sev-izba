"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import type { ComponentProps } from "react";
type CustomLinkProps = Omit<ComponentProps<typeof Link>, "onClick"> & {
  onClick?: ComponentProps<typeof Link>["onClick"];
};

function pathForCompare(href: ComponentProps<typeof Link>["href"]): string {
  if (typeof href === "string") {
    const base = href.split("#")[0].split("?")[0];
    return base || "/";
  }
  const p = href.pathname || "";
  const normalized = p.startsWith("/") ? p : `/${p}`;
  return normalized || "/";
}

function hrefToPushUrl(href: ComponentProps<typeof Link>["href"]): string {
  if (typeof href === "string") return href;
  const path = href.pathname || "/";
  const pathPart = path.startsWith("/") ? path : `/${path}`;
  const search = typeof href.search === "string" ? href.search : "";
  const hash = typeof href.hash === "string" ? href.hash : "";
  return `${pathPart}${search}${hash}`;
}

export function CustomLink({ href, children, onClick, ...rest }: CustomLinkProps) {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const sameRoute = pathname === pathForCompare(href);

  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;

        if (sameRoute) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        router.push(hrefToPushUrl(href));
      }}
    >
      {children}
    </Link>
  );
}
