"use client";

import type { CSSProperties, ReactNode } from "react";
import { Breadcrumbs } from "@/app/components/breadcrumbs/Breadcrumbs";
import { PageContentReveal } from "@/app/components/page-animate/PageContentReveal";
import "./style.scss";

export type PageModuleProps = {
  children: ReactNode;
  variant?: string;
  showBreadcrumbs?: boolean;
  backgroundImageUrl?: string;
  breadcrumbCurrentLabel?: string;
};

export default function PageModule({
  children,
  variant,
  showBreadcrumbs = true,
  backgroundImageUrl,
  breadcrumbCurrentLabel,
}: PageModuleProps) {
  const rootStyle: CSSProperties | undefined =
    backgroundImageUrl != null && backgroundImageUrl !== ""
      ? { ["--page-module-bg-image" as string]: `url(${JSON.stringify(backgroundImageUrl)})` }
      : undefined;

  return (
    <PageContentReveal itemSelector="[data-reveal]">
      <div
        className={["page-module", variant].filter(Boolean).join(" ")}
        style={rootStyle}
      >
        <div className="page-module__background" />
        <div className="container">
          {showBreadcrumbs ? (
            <Breadcrumbs currentLabel={breadcrumbCurrentLabel} />
          ) : null}
          {children}
        </div>
      </div>
    </PageContentReveal>
  );
}
