'use client'

import { projects } from '@/app/data/projects-data'
import gsap from 'gsap'
import Image from 'next/image'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import './style.scss'
import { CustomLink } from '@/app/components/custom-link/CustomLink'

const VISIBLE_SLIDES = 2

export default function HomeCatalog() {
  const [position, setPosition] = useState(VISIBLE_SLIDES)
  const trackRef = useRef<HTMLDivElement>(null)
  const homeProjects = useMemo(() => projects, [])
  const isAnimatingRef = useRef(false)
  const isResettingRef = useRef(false)
  const prependSlides = useMemo(() => homeProjects.slice(-VISIBLE_SLIDES), [homeProjects])
  const appendSlides = useMemo(() => homeProjects.slice(0, VISIBLE_SLIDES), [homeProjects])
  const sliderProjects = useMemo(
    () => [...prependSlides, ...homeProjects, ...appendSlides],
    [prependSlides, homeProjects, appendSlides]
  )
  const maxShiftPercent = 100 / VISIBLE_SLIDES

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    const targetXPercent = -(position * maxShiftPercent)

    if (isResettingRef.current) {
      gsap.set(track, { xPercent: targetXPercent })
      isResettingRef.current = false
      return
    }

    isAnimatingRef.current = true
    gsap.to(track, {
      xPercent: targetXPercent,
      duration: 0.6,
      ease: 'power3.out',
      onComplete: () => {
        isAnimatingRef.current = false

        if (position === homeProjects.length + VISIBLE_SLIDES) {
          isResettingRef.current = true
          setPosition(VISIBLE_SLIDES)
          return
        }

        if (position === VISIBLE_SLIDES - 1) {
          isResettingRef.current = true
          setPosition(homeProjects.length + VISIBLE_SLIDES - 1)
        }
      }
    })
  }, [position, homeProjects.length, maxShiftPercent])

  const goPrev = () => {
    if (isAnimatingRef.current) return
    setPosition((prev) => prev - 1)
  }

  const goNext = () => {
    if (isAnimatingRef.current) return
    setPosition((prev) => prev + 1)
  }

  return (
    <div className='home-catalog'>
      <div className='container'>
        <h2>Каталог проектов</h2>
        <p className='home-catalog-description'>Проекты которые мы реализуем</p>
        <div className='home-catalog-gallery'>
          <div className='home-catalog-gallery-viewport'>
            <div className='home-catalog-gallery-track' ref={trackRef}>
              {sliderProjects.map((project, index) => (
                <CustomLink href={`/projects/${project.slug}`} className='home-catalog-gallery-item' key={`${project.id}-${index}`}>
                  <div className='home-catalog-gallery-item-img'>
                    <Image src={project.image} alt={project.name} width={500} height={500} />
                    <div className='home-catalog-gallery-item-img-info'>
                      <div className='home-catalog-gallery-item-img-info-content'>
                        <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M7 3h10v4h4v14H3V3h4zm0 2v2h10V5H7zm0 4H5v10h14V9h-2v2H7V9z' />
                        </svg>
                        {project.area}
                      </div>
                      <div className='home-catalog-gallery-item-img-info-content'>
                        <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M3 10L12 3l9 7v10h-6v-6H9v6H3V10z' />
                        </svg>
                        {project.material}
                      </div>
                    </div>
                    <div className='home-catalog-gallery-item-img-bg'></div>
                  </div>
                  <div className='home-catalog-gallery-item-info'>
                    <h3>{project.name}</h3>
                    <p className='home-catalog-gallery-item-info-price'>
                      от <span>{project.price}</span> руб.
                    </p>
                  </div>
                </CustomLink>
              ))}
            </div>
          </div>
          <div className='home-catalog-gallery-controls'>
            <button type='button' className='home-catalog-gallery-nav home-catalog-gallery-nav--prev' onClick={goPrev} aria-label='Предыдущие проекты'>
              &#8249;
            </button>
            <button type='button' className='home-catalog-gallery-nav home-catalog-gallery-nav--next' onClick={goNext} aria-label='Следующие проекты'>
              &#8250;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
