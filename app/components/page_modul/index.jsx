"use client";

import { Breadcrumbs } from "@/app/components/breadcrumbs/Breadcrumbs";
import { PageContentReveal } from "@/app/components/page-animate/PageContentReveal";
import "./style.scss";

export default function PageModule({
    children,
    variant,
    showBreadcrumbs = true,
    backgroundImageUrl,
    breadcrumbCurrentLabel,
}) {
    const rootStyle =
        backgroundImageUrl != null && backgroundImageUrl !== ""
            ? { ["--page-module-bg-image"]: `url(${JSON.stringify(backgroundImageUrl)})` }
            : undefined;

    return (
        <PageContentReveal itemSelector="[data-reveal]">
        <div
            className={["page-module", variant].filter(Boolean).join(" ")}
            style={rootStyle}
        >
            <div className="page-module__background"></div>
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
