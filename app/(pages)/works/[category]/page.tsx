import PageModule from "@/app/components/page_modul";
import { WorksGallery } from "@/app/components/gallery/WorksGallery";
import { worksData } from "@/app/data/works-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "./category.scss";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return worksData.map((c) => ({ category: c.description }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).category;
  const data = worksData.find((c) => c.description === slug);
  if (!data) return { title: "Северная Изба | Категория не найдена" };
  const url = `/works/${slug}`;
  return {
    title: `Северная Изба | ${data.name}`,
    description: `Фотографии: ${data.name}`,
    openGraph: { title: data.name, url, type: "website" },
    alternates: { canonical: url },
  };
}

export default async function WorksCategoryPage({ params }: Props) {
  const slug = (await params).category;
  const data = worksData.find((c) => c.description === slug);
  if (!data) notFound();

  return (
    <PageModule variant="works-page" backgroundImageUrl="/page-bg/gallery-bg.jpg" breadcrumbCurrentLabel={data.name}>
      <div className="works-category" data-reveal>
        <h1 className="works-category__title">{data.name}</h1>
        <WorksGallery images={data.images} categoryName={data.name} />
      </div>
    </PageModule>
  );
}
