'use client'

import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './style.scss'
import Image from 'next/image'
import { CustomLink } from '@/app/components/custom-link/CustomLink'
import { getProjectBySlug, projects } from '@/app/data/projects-data'

const l57 = getProjectBySlug('l-57')
/** Пять проектов для слайдов карусели (после вводного блока) */
const catalogCarouselProjects = projects.slice(0, 5)

const FALLBACK_GAP_PX = 32
const SLIDE_COUNT = 1 + catalogCarouselProjects.length

function getTrackGapPx(track: HTMLElement): number {
  const s = getComputedStyle(track)
  const raw = s.columnGap && s.columnGap !== 'normal' ? s.columnGap : s.gap
  const parsed = parseFloat(raw)
  return Number.isFinite(parsed) ? parsed : FALLBACK_GAP_PX
}

function GalleryArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      className='gallery__arrow-icon'
      width={22}
      height={22}
      viewBox='0 0 24 24'
      aria-hidden
    >
      <path
        fill='none'
        stroke='currentColor'
        strokeWidth={2.25}
        strokeLinecap='round'
        strokeLinejoin='round'
        d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'}
      />
    </svg>
  )
}

function centerOffsetX(
  wrapperWidth: number,
  track: HTMLElement,
  index: number
): number {
  const slides = track.children
  const i = Math.max(0, Math.min(index, slides.length - 1))
  const slide = slides[i] as HTMLElement
  const gapPx = getTrackGapPx(track)
  let left = 0
  for (let j = 0; j < i; j++) {
    left += (slides[j] as HTMLElement).offsetWidth + gapPx
  }
  const slideCenter = left + slide.offsetWidth / 2
  return wrapperWidth / 2 - slideCenter
}

export default function HomeCatalog() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)

  useLayoutEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  const animateToIndex = useCallback((index: number, duration = 0.75) => {
    const wrap = wrapperRef.current
    const track = trackRef.current
    if (!wrap || !track || track.children.length === 0) return

    const x = centerOffsetX(wrap.offsetWidth, track, index)
    tweenRef.current?.kill()
    tweenRef.current = gsap.to(track, {
      x,
      duration,
      ease: 'power3.out',
    })
  }, [])

  useLayoutEffect(() => {
    animateToIndex(activeIndex)
  }, [activeIndex, animateToIndex])

  /** Не зависит от activeIndex: иначе при смене слайда RO пересоздаётся и синхронно вызывает duration 0 — отменяет tween со стрелок. */
  useLayoutEffect(() => {
    const wrap = wrapperRef.current
    if (!wrap) return
    let skipInitial = true
    const ro = new ResizeObserver(() => {
      if (skipInitial) {
        skipInitial = false
        return
      }
      animateToIndex(activeIndexRef.current, 0)
    })
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [animateToIndex])

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1))
  const goNext = () =>
    setActiveIndex((i) => Math.min(SLIDE_COUNT - 1, i + 1))

  return (
    <div className='home-catalog'>
      <div className='container'>
        <div className='gallery' ref={wrapperRef}>
          <div className='gallery-track' ref={trackRef}>
            <div className='gallery-item gallery-item-1'>
              <div className='gallery-item-1-content'>
                <h2>Каталог проектов</h2>
                <p>
                  В каталоге представлен
                  широкий спектр архитектурных
                  решений, воплощающих
                  гармоничное сочетание
                  функциональности и эстетики.
                  <br />
                  <br />
                  Каждый проект детально
                  проработан с учетом новейших
                  тенденций в области дизайна
                  и строительства, отражая
                  уникальный подход к созданию
                  премиальных жилых пространств.
                </p>
                <CustomLink href='/projects' className='gallery-item-1-cta'>
                  Весь каталог
                </CustomLink>
              </div>
              <CustomLink
                href={l57 ? `/projects/${l57.slug}` : '/projects'}
                className='project-container'
                aria-label={l57 ? `Проект ${l57.name}` : 'Каталог проектов'}
              >
                <div className='project-container__media'>
                  <Image
                    src={l57?.image ?? '/projects/l-57/Project _29_1.jpg'}
                    alt={l57?.name ?? 'L-57'}
                    fill
                    className='project-container__img'
                    sizes='(max-width: 768px) 90vw, 40vw'
                  />
                </div>
                <div className='project-container-content'>
                  <h3>{l57?.name ?? 'L-57'}</h3>
                  <p>{l57?.area ?? '57 м²'}</p>
                </div>
              </CustomLink>
            </div>
            {catalogCarouselProjects.map((project) => (
              <div key={project.id} className='gallery-item'>
                <CustomLink
                  href={`/projects/${project.slug}`}
                  className='project-container'
                  aria-label={`Проект ${project.name}`}
                >
                  <div className='project-container__media'>
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className='project-container__img'
                      sizes='(max-width: 768px) 90vw, 40vw'
                    />
                  </div>
                  <div className='project-container-content'>
                    <h3>{project.name}</h3>
                    <p>{project.area}</p>
                  </div>
                </CustomLink>
              </div>
            ))}
          </div>
          <div className='gallery__nav'>
            <button
              type='button'
              className='gallery__arrow'
              aria-label='Предыдущий слайд'
              disabled={activeIndex <= 0}
              onClick={goPrev}
            >
              <GalleryArrowIcon direction='left' />
            </button>
            <button
              type='button'
              className='gallery__arrow'
              aria-label='Следующий слайд'
              disabled={activeIndex >= SLIDE_COUNT - 1}
              onClick={goNext}
            >
              <GalleryArrowIcon direction='right' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
