import PageModule from "@/app/components/page_modul";
import { getBlogPostsForList } from "@/app/data/blog-data";
import "./style.scss";
import type { Metadata } from "next";
import { CustomLink } from "@/app/components/custom-link/CustomLink";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Северная Изба | Блог",
  description: "Блог компании",
  keywords: ["блог", "статьи", "новости", "северная изба"],
  openGraph: {
    title: "Северная Изба | Блог",
    description: "Статьи и новости.",
    url: "/blog",
    type: "website",
  },
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const posts = getBlogPostsForList();

  return (
    <>
      <PageModule variant="blog-page" backgroundImageUrl="/page-bg/blog-bg.jpg" breadcrumbCurrentLabel="Блог">
        <h1>Блог</h1>
        <div className="blog-content">
          {posts.map((post) => (
            <CustomLink key={post.id} href={`/blog/${post.slug}`} className="blog-content__item">
              <p className="blog-content__item-date">{post.date}</p>
              <h2>{post.title}</h2>
              <div className="blog-content__item-image">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 767px) 92vw, (max-width: 1023px) 50vw, (min-width: 1024px) 50vw"
                />
              </div>
            </CustomLink>
          ))}
        </div>
      </PageModule>
    </>
  );
}
