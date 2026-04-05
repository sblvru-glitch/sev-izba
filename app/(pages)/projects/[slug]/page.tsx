import { getAllProjectSlugs, getProjectBySlug } from "@/app/data/projects-data";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDescPlanGallery } from "./ProjectDescPlanGallery";
import { ProjectEstimateButton } from "./ProjectEstimateButton";
import "./project-detail.scss";
import { Breadcrumbs } from "@/app/components/breadcrumbs/Breadcrumbs";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProjectSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Северная Изба | Проект не найден" };
  }
  const url = `/projects/${slug}`;
  const description = project.description.slice(0, 160).replace(/\s+/g, " ").trim();
  return {
    title: `Северная Изба | Проект ${project.name}`,
    description,
    openGraph: { title: `Проект ${project.name}`, description, url, type: "website" },
    alternates: { canonical: url },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const slug = (await params).slug;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const specRows: { label: string; value: string }[] = [
    { label: "Тип", value: project.type },
    { label: "Материал", value: project.material },
    { label: "Общая площадь", value: project.area },
    { label: "Площадь проекта", value: project.area_project },
    { label: "Этажность", value: project.floors },
    { label: "Спальни", value: project.bedrooms },
    { label: "Санузлы", value: project.bathroom },
    { label: "Терраса", value: project.area_terrace },
    { label: "Срок строительства", value: project.time },
  ];

  return (
    <>
      <div className="projectDetailPage">
        <div className="projectDetailPage__imgBg">
          <Image src={project.image} alt={project.name} width={1000} height={1000} />
        </div>
        <div className="projectDetailPage__main-content">
          <div className="container">
            <Breadcrumbs currentLabel={project.name} />
            <div className="projectDetailPage__main-content__content">
              <div className="projectDetailPage__main-content__content__left">
                <h1>{project.name}</h1>
                <p>
                  Срок: <span>{project.time}</span>
                </p>
                <p>
                  Площадь: <span>{project.area}</span>
                </p>
                <p>
                  Технология: <span>{project.material}</span>
                </p>
                <p>
                  от <span>{project.price} руб.</span>
                </p>
              </div>
              <div className="projectDetailPage__main-content__content__right">
                <ProjectEstimateButton />
              </div>
            </div>
          </div>
        </div>
        <div className="projectDetailPage__description">
          <div className="container">
            <section className="projectDetailPage__specs" aria-labelledby="project-specs-heading">
              <h2 id="project-specs-heading">Характеристики</h2>
              <dl className="projectDetailPage__specs-list">
                {specRows.map(({ label, value }) => (
                  <div key={label} className="projectDetailPage__spec-row">
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {project.layout.length > 0 ? (
              <ProjectDescPlanGallery
                description={project.description}
                projectName={project.name}
                planSrc={project.layout[0]}
                lightboxImages={[...project.layout, ...project.gallery]}
              />
            ) : (
              <section className="projectDetailPage__description-block" aria-labelledby="project-desc-heading">
                <h2 id="project-desc-heading">Описание проекта</h2>
                <p className="projectDetailPage__description-text">{project.description}</p>
              </section>
            )}

            {project.layout.length === 0 && project.gallery.length > 0 ? (
              <section className="projectDetailPage__gallery" aria-labelledby="project-gallery-heading">
                <h2 id="project-gallery-heading">Фотогалерея</h2>
                <div className="projectDetailPage__gallery-grid">
                  {project.gallery.map((src, i) => (
                    <div key={`${src}-${i}`} className="projectDetailPage__gallery-cell">
                      <Image
                        src={src}
                        alt={`${project.name} — фото ${i + 1}`}
                        fill
                        className="projectDetailPage__gallery-img"
                        sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
