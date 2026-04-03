import PageModule from "@/app/components/page_modul";
import { ProjectsCatalog } from "@/app/components/projects/ProjectsCatalog";
import { projects } from "@/app/data/projects-data";
import "./style.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Северная Изба | Проекты",
  description: "Проекты",
  keywords: ["проекты", "портфолио", "строительство", "северная изба"],
  openGraph: {
    title: "Северная Изба | Проекты",
    description: "Проекты",
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PageModule variant="projects-page" backgroundImageUrl="/page-bg/catalog-bg.jpg" breadcrumbCurrentLabel="Проекты">
        <ProjectsCatalog projects={projects} />
      </PageModule>
    </>
  );
}
