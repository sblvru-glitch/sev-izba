"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./works-gallery.scss";

const SWIPE_THRESHOLD_PX = 56;

type WorksGalleryProps = {
  images: string[];
  categoryName: string;
  /** Свой рендер превью вместо сетки; openLightbox(i) открывает лайтбокс с этим индексом */
  renderThumbnails?: (openLightbox: (index: number) => void) => ReactNode;
  /** Подпись для aria-dialog лайтбокса */
  lightboxAriaLabel?: string;
};

export function WorksGallery({
  images,
  categoryName,
  renderThumbnails,
  lightboxAriaLabel,
}: WorksGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef<number | null>(null);
  const navigateDirRef = useRef<0 | 1 | -1>(0);
  const dragRef = useRef<{ startX: number; pointerId: number } | null>(null);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  const close = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) {
      setActiveIndex(null);
      return;
    }
    gsap.killTweensOf(overlay);
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => setActiveIndex(null),
    });
  }, []);

  const openLightbox = useCallback((index: number) => {
    navigateDirRef.current = 0;
    setActiveIndex(index);
  }, []);

  const go = useCallback(
    (delta: number) => {
      setActiveIndex((i) => {
        if (i === null) return null;
        const n = images.length;
        navigateDirRef.current = delta > 0 ? 1 : -1;
        return (i + delta + n) % n;
      });
    },
    [images.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, close, go]);

  const endDrag = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>, wrap: HTMLDivElement) => {
      if (!dragRef.current || dragRef.current.pointerId !== e.pointerId) return;
      const startX = dragRef.current.startX;
      dragRef.current = null;
      try {
        wrap.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
      const dx = e.clientX - startX;
      if (dx < -SWIPE_THRESHOLD_PX) {
        gsap.killTweensOf(wrap);
        gsap.set(wrap, { clearProps: "transform" });
        go(1);
      } else if (dx > SWIPE_THRESHOLD_PX) {
        gsap.killTweensOf(wrap);
        gsap.set(wrap, { clearProps: "transform" });
        go(-1);
      } else {
        gsap.to(wrap, { x: 0, duration: 0.22, ease: "power2.out" });
      }
    },
    [go],
  );

  const onImagePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const wrap = imageWrapRef.current;
    if (!wrap) return;
    dragRef.current = { startX: e.clientX, pointerId: e.pointerId };
    wrap.setPointerCapture(e.pointerId);
    gsap.killTweensOf(wrap);
  };

  const onImagePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== e.pointerId) return;
    const wrap = imageWrapRef.current;
    if (!wrap) return;
    const dx = e.clientX - dragRef.current.startX;
    gsap.set(wrap, { x: dx });
  };

  const onImagePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const wrap = imageWrapRef.current;
    if (!wrap) return;
    endDrag(e, wrap);
  };

  const onImagePointerCancel = (e: ReactPointerEvent<HTMLDivElement>) => {
    const wrap = imageWrapRef.current;
    if (!wrap || !dragRef.current || dragRef.current.pointerId !== e.pointerId) return;
    dragRef.current = null;
    try {
      wrap.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    gsap.killTweensOf(wrap);
    gsap.to(wrap, { x: 0, duration: 0.2, ease: "power2.out" });
  };

  useLayoutEffect(() => {
    if (activeIndex === null) {
      prevIndexRef.current = null;
      return;
    }

    const overlay = overlayRef.current;
    const wrap = imageWrapRef.current;
    if (!overlay || !wrap) return;

    const wasOpen = prevIndexRef.current !== null;
    const prev = prevIndexRef.current;

    if (!wasOpen) {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(
        wrap,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.42, ease: "power2.out" },
      );
    } else if (prev !== null && prev !== activeIndex) {
      const dir = navigateDirRef.current;
      gsap.killTweensOf(wrap);
      gsap.fromTo(
        wrap,
        { opacity: 0, x: dir * 56 },
        { opacity: 1, x: 0, duration: 0.28, ease: "power2.out", clearProps: "transform" },
      );
    }

    prevIndexRef.current = activeIndex;

    return () => {
      gsap.killTweensOf(wrap);
    };
  }, [activeIndex]);

  const currentSrc = activeIndex !== null ? images[activeIndex] : null;

  const lightbox =
    activeIndex !== null && currentSrc ? (
      <div
        ref={overlayRef}
        className="works-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={lightboxAriaLabel ?? `Наши работы: ${categoryName}`}
      >
        <button type="button" className="works-lightbox__backdrop" aria-label="Закрыть" onClick={close} />
        <button type="button" className="works-lightbox__close" aria-label="Закрыть" onClick={close}>
          <span aria-hidden>×</span>
        </button>
        <button type="button" className="works-lightbox__nav works-lightbox__nav--prev" aria-label="Предыдущее фото" onClick={() => go(-1)}>
          <span aria-hidden>‹</span>
        </button>
        <button type="button" className="works-lightbox__nav works-lightbox__nav--next" aria-label="Следующее фото" onClick={() => go(1)}>
          <span aria-hidden>›</span>
        </button>
        <div className="works-lightbox__stage">
          <div
            ref={imageWrapRef}
            className="works-lightbox__image-wrap"
            onPointerDown={onImagePointerDown}
            onPointerMove={onImagePointerMove}
            onPointerUp={onImagePointerUp}
            onPointerCancel={onImagePointerCancel}
          >
            <Image
              src={currentSrc}
              alt={`${categoryName} — фото ${activeIndex + 1} из ${images.length}`}
              fill
              className="works-lightbox__img"
              sizes="100vw"
              priority
              draggable={false}
            />
          </div>
          <p className="works-lightbox__counter">
            {activeIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    ) : null;

  return (
    <>
      {renderThumbnails ? (
        // openLightbox — useCallback(setState), не ref; render prop вызывается синхронно
        // eslint-disable-next-line react-hooks/refs -- false positive: не ref
        renderThumbnails(openLightbox)
      ) : (
        <div className="works-category__grid">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              className="works-category__cell works-category__cell--thumb"
              onClick={() => openLightbox(i)}
              aria-label={`Открыть фото ${i + 1} из ${images.length}`}
            >
              <Image
                src={src}
                alt=""
                width={800}
                height={600}
                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="works-category__img"
              />
            </button>
          ))}
        </div>
      )}
      {mounted && lightbox ? createPortal(lightbox, document.body) : null}
    </>
  );
}
