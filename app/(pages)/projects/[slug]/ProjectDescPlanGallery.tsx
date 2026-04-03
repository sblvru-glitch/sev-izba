"use client";

import { WorksGallery } from "@/app/components/gallery/WorksGallery";
import Image from "next/image";

type ProjectDescPlanGalleryProps = {
  description: string;
  projectName: string;
  planSrc: string;
  lightboxImages: string[];
};

export function ProjectDescPlanGallery({
  description,
  projectName,
  planSrc,
  lightboxImages,
}: ProjectDescPlanGalleryProps) {
  return (
    <WorksGallery
      images={lightboxImages}
      categoryName={projectName}
      lightboxAriaLabel={`Проект ${projectName}`}
      renderThumbnails={(openAt) => (
        <div className="projectDetailPage__desc-plan">
          <section className="projectDetailPage__description-block" aria-labelledby="project-desc-heading">
            <h2 id="project-desc-heading">Описание проекта</h2>
            <p className="projectDetailPage__description-text">{description}</p>
          </section>
          <section className="projectDetailPage__layouts projectDetailPage__layouts--aside" aria-labelledby="project-layouts-heading">
            <h2 id="project-layouts-heading">Планировки</h2>
            <button
              type="button"
              className="projectDetailPage__plan-thumb"
              onClick={() => openAt(0)}
              aria-label={`Открыть галерею: планировки и фото (${lightboxImages.length})`}
            >
              <span className="projectDetailPage__plan-thumb-inner">
                <Image
                  src={planSrc}
                  alt={`Планировка — ${projectName}`}
                  fill
                  className="projectDetailPage__plan-thumb-img"
                  sizes="(min-width: 960px) 400px, 100vw"
                />
              </span>
            </button>
          </section>
        </div>
      )}
    />
  );
}
