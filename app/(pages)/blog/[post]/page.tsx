import PageModule from "@/app/components/page_modul";
import { CustomLink } from "@/app/components/custom-link/CustomLink";
import { getBlogPostBySlug, getBlogPostsForList } from "@/app/data/blog-data";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import "./post.scss";

type Props = {
  params: Promise<{ post: string }>;
};

export async function generateStaticParams() {
  return getBlogPostsForList().map((post) => ({ post: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { post: slug } = await params;
  const article = getBlogPostBySlug(slug);
  if (!article) {
    return { title: "Статья не найдена | Северная Изба" };
  }
  const url = `/blog/${article.slug}`;
  return {
    title: `${article.title} | Северная Изба`,
    description: article.description.slice(0, 160),
    openGraph: {
      title: article.title,
      description: article.description.slice(0, 160),
      url,
      type: "article",
    },
    alternates: { canonical: url },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { post: slug } = await params;
  const article = getBlogPostBySlug(slug);
  if (!article) {
    notFound();
  }

  const paragraphs = article.content
    .trim()
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <PageModule
      variant="blog-post-page"
      backgroundImageUrl={article.image}
      breadcrumbCurrentLabel={article.title}
    >
          <h1 className="blog-post__title">{article.title}</h1>
          <p className="blog-post__date">{article.date}</p>

        <div className="blog-post__body">
          {paragraphs.map((block, i) => (
            <p key={i}>{block}</p>
          ))}
        </div>
    </PageModule>
  );
}
