import PageModule from "@/app/components/page_modul";
import { CustomLink } from "@/app/components/custom-link/CustomLink";
import { pluralizeWorksPhotos, worksData } from "@/app/data/works-data";
import Image from "next/image";
import "./style.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Северная Изба | Наши работы",
  description: "Наши работы",
  keywords: ["галерея", "наши работы", "фото", "северная изба"],
  openGraph: {
    title: "Северная Изба | Наши работы",
    description: "Наши работы",
    url: "/works",
    type: "website",
  },
  alternates: {
    canonical: "/works",
  },
};

export default function WorksPage() {
  return (
    <>
      <PageModule variant="works-page" backgroundImageUrl="/page-bg/gallery-bg.jpg" breadcrumbCurrentLabel="Наши работы">
        <h1>Наши работы</h1>
        <div className="works-content">
          {worksData.map((category) => {
            const cover = category.images[0];
            const count = category.images.length;
            return (
              <CustomLink
                key={category.id}
                href={`/works/${category.description}`}
                className="works-content__item"
              >
                <div className="works-content__item-image">
                  <Image
                    src={cover}
                    alt=""
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="works-content__item-title">
                  <h2>{category.name}</h2>
                  <p>
                    {count} {pluralizeWorksPhotos(count)}
                  </p>
                </div>
              </CustomLink>
            );
          })}
        </div>
      </PageModule>
    </>
  );
}
