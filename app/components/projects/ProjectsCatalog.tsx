"use client";

import { CustomLink } from "@/app/components/custom-link/CustomLink";
import { projects as projectsData } from "@/app/data/projects-data";
import gsap from "gsap";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createPortal } from "react-dom";
import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./projects-catalog.scss";

type Project = (typeof projectsData)[number];

type ProjectsCatalogProps = {
  projects: Project[];
};

const STORAGE_KEY = "sev-izba.projects.filters.v1";

const AREA_BUCKETS = [
  { id: "lt100", label: "до 100 м²" },
  { id: "100-150", label: "от 100 до 150 м²" },
  { id: "150-200", label: "от 150 до 200 м²" },
  { id: "200plus", label: "от 200 м² и более" },
] as const;

const AREA_BUCKET_IDS = new Set<string>(AREA_BUCKETS.map((b) => b.id));

/** Число м² из строки вида «244,1 м²», «210 м²» */
function parseAreaM2(areaStr: string): number | null {
  const m = areaStr.replace(",", ".").match(/(\d+(?:\.\d+)?)/);
  if (!m) return null;
  const n = parseFloat(m[1]);
  return Number.isFinite(n) ? n : null;
}

function areaMatchesBucket(m2: number, bucketId: string): boolean {
  switch (bucketId) {
    case "lt100":
      return m2 < 100;
    case "100-150":
      return m2 >= 100 && m2 < 150;
    case "150-200":
      return m2 >= 150 && m2 < 200;
    case "200plus":
      return m2 >= 200;
    default:
      return false;
  }
}

function uniqueSorted<T>(items: T[]): T[] {
  return [...new Set(items)].sort((a, b) => String(a).localeCompare(String(b), "ru"));
}

function pickValid(values: string[], allowed: Set<string>): string[] {
  return values.filter((v) => allowed.has(v));
}

function loadSession(): {
  types: string[];
  materials: string[];
  floors: string[];
  areas: string[];
} | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw) as {
      types?: string[];
      materials?: string[];
      floors?: string[];
      areas?: string[];
    };
    return {
      types: Array.isArray(o.types) ? o.types : [],
      materials: Array.isArray(o.materials) ? o.materials : [],
      floors: Array.isArray(o.floors) ? o.floors : [],
      areas: Array.isArray(o.areas) ? o.areas : [],
    };
  } catch {
    return null;
  }
}

function saveSession(s: {
  types: string[];
  materials: string[];
  floors: string[];
  areas: string[];
}) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* quota / private mode */
  }
}

function clearSession() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

function buildQueryString(s: {
  types: string[];
  materials: string[];
  floors: string[];
  areas: string[];
}): string {
  const p = new URLSearchParams();
  s.types.forEach((t) => p.append("type", t));
  s.materials.forEach((m) => p.append("material", m));
  s.floors.forEach((f) => p.append("floor", f));
  s.areas.forEach((a) => p.append("area", a));
  return p.toString();
}

function ProjectsCatalogInner({ projects }: ProjectsCatalogProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const restoredFromSession = useRef(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  const typeOptions = useMemo(() => uniqueSorted(projects.map((p) => p.type)), [projects]);
  const materialOptions = useMemo(() => uniqueSorted(projects.map((p) => p.material)), [projects]);
  const floorOptions = useMemo(() => uniqueSorted(projects.map((p) => p.floors)), [projects]);

  const typeSet = useMemo(() => new Set(typeOptions), [typeOptions]);
  const materialSet = useMemo(() => new Set(materialOptions), [materialOptions]);
  const floorSet = useMemo(() => new Set(floorOptions), [floorOptions]);

  const typesSel = useMemo(
    () => pickValid(searchParams.getAll("type"), typeSet),
    [searchParams, typeSet],
  );
  const materialsSel = useMemo(
    () => pickValid(searchParams.getAll("material"), materialSet),
    [searchParams, materialSet],
  );
  const floorsSel = useMemo(
    () => pickValid(searchParams.getAll("floor"), floorSet),
    [searchParams, floorSet],
  );
  const areasSel = useMemo(
    () => pickValid(searchParams.getAll("area"), AREA_BUCKET_IDS),
    [searchParams],
  );

  useEffect(() => {
    if (restoredFromSession.current) return;
    restoredFromSession.current = true;

    const hasUrl =
      searchParams.getAll("type").length > 0 ||
      searchParams.getAll("material").length > 0 ||
      searchParams.getAll("floor").length > 0 ||
      searchParams.getAll("area").length > 0;
    if (hasUrl) return;

    const stored = loadSession();
    if (!stored) return;
    const types = pickValid(stored.types, typeSet);
    const materials = pickValid(stored.materials, materialSet);
    const floors = pickValid(stored.floors, floorSet);
    const areas = pickValid(stored.areas, AREA_BUCKET_IDS);
    if (
      types.length === 0 &&
      materials.length === 0 &&
      floors.length === 0 &&
      areas.length === 0
    ) {
      return;
    }

    const qs = buildQueryString({ types, materials, floors, areas });
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [searchParams, pathname, router, typeSet, materialSet, floorSet]);

  /** Синхронизация закладок с ?type=… в sessionStorage; пустое состояние не пишем, чтобы не затереть сессию до restore */
  useEffect(() => {
    const n =
      typesSel.length + materialsSel.length + floorsSel.length + areasSel.length;
    if (n === 0) return;
    saveSession({
      types: typesSel,
      materials: materialsSel,
      floors: floorsSel,
      areas: areasSel,
    });
  }, [typesSel, materialsSel, floorsSel, areasSel]);

  const replaceFilters = useCallback(
    (next: {
      types: string[];
      materials: string[];
      floors: string[];
      areas: string[];
    }) => {
      saveSession(next);
      const qs = buildQueryString(next);
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const toggleType = useCallback(
    (value: string) => {
      const next = typesSel.includes(value) ? typesSel.filter((x) => x !== value) : [...typesSel, value];
      replaceFilters({ types: next, materials: materialsSel, floors: floorsSel, areas: areasSel });
    },
    [typesSel, materialsSel, floorsSel, areasSel, replaceFilters],
  );

  const toggleMaterial = useCallback(
    (value: string) => {
      const next = materialsSel.includes(value)
        ? materialsSel.filter((x) => x !== value)
        : [...materialsSel, value];
      replaceFilters({ types: typesSel, materials: next, floors: floorsSel, areas: areasSel });
    },
    [typesSel, materialsSel, floorsSel, areasSel, replaceFilters],
  );

  const toggleFloor = useCallback(
    (value: string) => {
      const next = floorsSel.includes(value) ? floorsSel.filter((x) => x !== value) : [...floorsSel, value];
      replaceFilters({ types: typesSel, materials: materialsSel, floors: next, areas: areasSel });
    },
    [typesSel, materialsSel, floorsSel, areasSel, replaceFilters],
  );

  const toggleArea = useCallback(
    (value: string) => {
      const next = areasSel.includes(value) ? areasSel.filter((x) => x !== value) : [...areasSel, value];
      replaceFilters({ types: typesSel, materials: materialsSel, floors: floorsSel, areas: next });
    },
    [typesSel, materialsSel, floorsSel, areasSel, replaceFilters],
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (typesSel.length > 0 && !typesSel.includes(p.type)) return false;
      if (materialsSel.length > 0 && !materialsSel.includes(p.material)) return false;
      if (floorsSel.length > 0 && !floorsSel.includes(p.floors)) return false;
      if (areasSel.length > 0) {
        const m2 = parseAreaM2(p.area);
        if (m2 == null) return false;
        const ok = areasSel.some((id) => areaMatchesBucket(m2, id));
        if (!ok) return false;
      }
      return true;
    });
  }, [projects, typesSel, materialsSel, floorsSel, areasSel]);

  const activeCount =
    typesSel.length + materialsSel.length + floorsSel.length + areasSel.length;

  const close = useCallback(() => {
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (!backdrop || !panel) {
      setFiltersOpen(false);
      return;
    }
    gsap.killTweensOf([backdrop, panel]);
    gsap.to(backdrop, { opacity: 0, duration: 0.24, ease: "power2.in" });
    gsap.to(panel, {
      y: 56,
      opacity: 0,
      scale: 0.98,
      duration: 0.32,
      ease: "power2.in",
      onComplete: () => setFiltersOpen(false),
    });
  }, []);

  useLayoutEffect(() => {
    if (!filtersOpen || !mounted) return;
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (!backdrop || !panel) return;

    gsap.killTweensOf([backdrop, panel]);
    gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.32, ease: "power2.out" });
    gsap.fromTo(
      panel,
      { y: 56, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.44, ease: "power3.out" },
    );
  }, [filtersOpen, mounted]);

  const resetFilters = useCallback(() => {
    clearSession();
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  useEffect(() => {
    if (!filtersOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtersOpen, close]);

  const modal =
    filtersOpen && mounted ? (
      <div className="projects-filters" role="dialog" aria-modal="true" aria-labelledby="projects-filters-title">
        <button
          ref={backdropRef}
          type="button"
          className="projects-filters__backdrop"
          aria-label="Закрыть фильтры"
          onClick={close}
        />
        <div ref={panelRef} className="projects-filters__panel">
          <div className="projects-filters__head">
            <h2 id="projects-filters-title" className="projects-filters__title">
              Фильтры
            </h2>
            <button type="button" className="projects-filters__close" aria-label="Закрыть" onClick={close}>
              ×
            </button>
          </div>
          <div className="projects-filters__body">
            <fieldset className="projects-filters__group">
              <legend className="projects-filters__legend">Площадь</legend>
              {AREA_BUCKETS.map((b) => (
                <label key={b.id} className="projects-filters__option">
                  <input
                    type="checkbox"
                    checked={areasSel.includes(b.id)}
                    onChange={() => toggleArea(b.id)}
                  />
                  <span>{b.label}</span>
                </label>
              ))}
            </fieldset>
            <fieldset className="projects-filters__group">
              <legend className="projects-filters__legend">Тип</legend>
              {typeOptions.map((t) => (
                <label key={t} className="projects-filters__option">
                  <input type="checkbox" checked={typesSel.includes(t)} onChange={() => toggleType(t)} />
                  <span>{t}</span>
                </label>
              ))}
            </fieldset>
            <fieldset className="projects-filters__group">
              <legend className="projects-filters__legend">Материал</legend>
              {materialOptions.map((m) => (
                <label key={m} className="projects-filters__option">
                  <input
                    type="checkbox"
                    checked={materialsSel.includes(m)}
                    onChange={() => toggleMaterial(m)}
                  />
                  <span>{m}</span>
                </label>
              ))}
            </fieldset>
            <fieldset className="projects-filters__group">
              <legend className="projects-filters__legend">Этажность</legend>
              {floorOptions.map((f) => (
                <label key={f} className="projects-filters__option">
                  <input type="checkbox" checked={floorsSel.includes(f)} onChange={() => toggleFloor(f)} />
                  <span>{f}</span>
                </label>
              ))}
            </fieldset>
          </div>
          <div className="projects-filters__foot">
            <p className="projects-filters__result">
              Найдено: {filtered.length} из {projects.length}
            </p>
            <div className="projects-filters__actions">
              <button type="button" className="projects-filters__btn projects-filters__btn--ghost" onClick={resetFilters}>
                Сбросить
              </button>
              <button type="button" className="projects-filters__btn projects-filters__btn--primary" onClick={close}>
                Готово
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <div className="projects-catalog">
      <div className="projects-catalog__top">
        <h1 className="projects-catalog__title">Проекты</h1>
        <button
          type="button"
          className="projects-catalog__filters-btn"
          onClick={() => setFiltersOpen(true)}
          aria-expanded={filtersOpen}
        >
          Фильтры
          {activeCount > 0 ? <span className="projects-catalog__filters-badge">{activeCount}</span> : null}
        </button>
      </div>

      <div className="projects-content">
        {filtered.length === 0 ? (
          <p className="projects-catalog__empty">
            Нет проектов по выбранным фильтрам. Откройте «Фильтры» и нажмите «Сбросить».
          </p>
        ) : (
          filtered.map((project) => (
            <CustomLink key={project.id} href={`/projects/${project.slug}`} className="projects-content__item">
              <div className="projects-content__item-image">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="projects-content__item-title">
                <h2>{project.name}</h2>
                <p>
                  {project.type} · {project.area}
                </p>
              </div>
            </CustomLink>
          ))
        )}
      </div>

      {mounted && modal ? createPortal(modal, document.body) : null}
    </div>
  );
}

function ProjectsCatalogFallback({ projects }: ProjectsCatalogProps) {
  return (
    <div className="projects-catalog">
      <div className="projects-catalog__top">
        <h1 className="projects-catalog__title">Проекты</h1>
        <button type="button" className="projects-catalog__filters-btn" disabled aria-busy>
          Фильтры
        </button>
      </div>
      <div className="projects-content">
        {projects.map((project) => (
          <CustomLink key={project.id} href={`/projects/${project.slug}`} className="projects-content__item">
            <div className="projects-content__item-image">
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="projects-content__item-title">
              <h2>{project.name}</h2>
              <p>
                {project.type} · {project.area}
              </p>
            </div>
          </CustomLink>
        ))}
      </div>
    </div>
  );
}

export function ProjectsCatalog(props: ProjectsCatalogProps) {
  return (
    <Suspense fallback={<ProjectsCatalogFallback {...props} />}>
      <ProjectsCatalogInner {...props} />
    </Suspense>
  );
}
