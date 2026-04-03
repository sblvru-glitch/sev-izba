import PageModule from "@/app/components/page_modul";
import { CustomLink } from "@/app/components/custom-link/CustomLink";
import { getAllServiceSlugs, getServiceItemBySlug } from "@/app/data/services-data";
import type { Metadata } from "next";
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
  const title = `Северная Изба | ${service.name}  `;
  const description = service.info.slice(0, 160).replace(/\s+/g, " ").trim();
  return {
    title,
    description,
    openGraph: { title: service.name, description, url, type: "website" },
    alternates: { canonical: url },
  };
}

export default async function ServicesInfoPage({ params }: Props) {
  const slug = (await params)["services-info"];
  const service = getServiceItemBySlug(slug);
  if (!service) {
    notFound();
  }

  const paragraphs = service.info
    .trim()
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const priceSuffix =
    service.categoryDescription === "building" ? "руб. / м²" : "руб.";

  return (
    <PageModule
      variant="services-info-page"
      backgroundImageUrl="/page-bg/services-bg.jpg"
      breadcrumbCurrentLabel={service.name}
    >
      <article className="service-info" data-reveal>
        <p className="service-info__category">{service.categoryName}</p>
        <h1 className="service-info__title">{service.name}</h1>

        <p className="service-info__price">
          <span>от</span> {service.price} <span className="service-info__price-unit">{priceSuffix}</span>
        </p>

        <div className="service-info__body">
          {paragraphs.map((block, i) => (
            <p key={i}>{block}</p>
          ))}
        </div>
      </article>
    </PageModule>
  );
}
