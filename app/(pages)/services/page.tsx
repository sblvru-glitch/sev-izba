import PageModule from "@/app/components/page_modul";
import { CustomLink } from "@/app/components/custom-link/CustomLink";
import { servicesData } from "@/app/data/services-data";
import { ServicesFeedbackButton } from "./ServicesFeedbackButton";
import "./style.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Северная Изба | Услуги",
  description: "Наши услуги",
  keywords: ["услуги", "строительство", "ремонт", "северная изба"],
  openGraph: {
    title: "Северная Изба | Услуги",
    description: "Услуги, которые мы предлагаем.",
    url: "/services",
    type: "website",
  },
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageModule variant="services-page" backgroundImageUrl="/page-bg/services-bg.jpg" breadcrumbCurrentLabel="Услуги">
        <h1>Услуги</h1>
        <div className="services-content">
          {servicesData.map((category) => (
            <div key={category.id} className="services-content-block">
              <h2>{category.name}</h2>
              <div className="services-content-block-items">
                {category.items.map((item, idx) => (
                  <div
                    key={`${category.id}-${item.description}-${idx}`}
                    className="services-content-block-items-item"
                  >
                    <div className="title">
                      <h3>{item.name}</h3>
                      <p>
                        <span>от</span> {item.price}{" "}
                        {category.description === "building" ? (
                          <>руб. / м²</>
                        ) : (
                          <span>руб.</span>
                        )}
                      </p>
                    </div>
                    <div className="button-wrap">
                      <CustomLink
                        href={`/services/${category.description}-${item.description}`}
                        className="services-more-link"
                      >
                        Подробнее
                      </CustomLink>
                      <ServicesFeedbackButton />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageModule>
    </>
  );
}
