import PageModule from "@/app/components/page_modul";
import { getAllServiceSlugs, getServiceItemBySlug } from "@/app/data/services-data";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "./style.scss";

type Props = {
  params: Promise<{ "services-info": string }>;
};

export async function generateStaticParams() {
  return getAllServiceSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params)["services-info"];
  const service = getServiceItemBySlug(slug);
  if (!service) {
    return { title: "Северная Изба | Услуга не найдена" };
  }
  const url = `/services/${slug}`;
  const displayName =
    "pageTitle" in service && service.pageTitle
      ? service.pageTitle
      : service.name;
  const title = `Северная Изба | ${displayName}`;
  const info = service.info as string | ReactNode;
  const description =
    "metaDescription" in service &&
    typeof service.metaDescription === "string" &&
    service.metaDescription
      ? service.metaDescription
      : typeof info === "string"
        ? info.slice(0, 160).replace(/\s+/g, " ").trim()
        : service.name;
  return {
    title,
    description,
    openGraph: { title: displayName, description, url, type: "website" },
    alternates: { canonical: url },
  };
}

export default async function ServicesInfoPage({ params }: Props) {
  const slug = (await params)["services-info"];
  const service = getServiceItemBySlug(slug);
  if (!service) {
    notFound();
  }

  const priceSuffix =
    service.categoryDescription === "building" ? "руб. / м²" : "руб.";
  const info = service.info as string | ReactNode;

  return (
    <PageModule
      variant="services-info-page"
      backgroundImageUrl="/page-bg/services-bg.jpg"
      breadcrumbCurrentLabel={service.name}
    >
      <article className="service-info" data-reveal>
        <p className="service-info__category">{service.categoryName}</p>
        <h1 className="service-info__title">
          {"pageTitle" in service && service.pageTitle
            ? service.pageTitle
            : service.name}
        </h1>

        <p className="service-info__price">
          <span>от</span> {service.price} <span className="service-info__price-unit">{priceSuffix}</span>
        </p>

        <div className="service-info__body">
          {typeof info === "string" ? (
            info
              .trim()
              .split(/\n\n+/)
              .map((p) => p.trim())
              .filter(Boolean)
              .map((block, i) => <p key={i}>{block}</p>)
          ) : (
            info
          )}
        </div>
      </article>
    </PageModule>
  );
}
