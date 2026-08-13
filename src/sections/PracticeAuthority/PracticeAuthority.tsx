import { useRef, useState } from 'react'
import { EditorialImage } from '../../components/media/EditorialImage'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { mediaConfig, type MediaAsset } from '../../config/media'
import { hasPublishedMetrics, metricsConfig } from '../../config/metrics'
import { gsap, useGSAP } from '../../motion/gsap'
import { useReducedMotion } from '../../motion/useReducedMotion'
import styles from './PracticeAuthority.module.css'

const metricLabels = {
  clientsServed: 'Clientes atendidos',
  yearsOfExperience: 'Anos de experiência',
  consultanciesCompleted: 'Consultorias realizadas',
} as const

const evidenceSlides: Array<{ asset: MediaAsset; caption: string; code: string }> = [
  {
    asset: mediaConfig.authority.documentary,
    caption: 'Bastidor de ensaio · imagem construída com intenção',
    code: 'Prática / 01',
  },
  {
    asset: mediaConfig.authority.navyPortrait,
    caption: 'Alfaiataria · proporção, caimento e posicionamento',
    code: 'Construção / 02',
  },
  {
    asset: mediaConfig.authority.bluePortrait,
    caption: 'Identidade · cor, contraste e presença',
    code: 'Presença / 03',
  },
]

export function PracticeAuthority() {
  const sectionRef = useRef<HTMLElement>(null)
  const slideRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const activeSlide = evidenceSlides[activeIndex]

  const selectSlide = (index: number) => {
    const nextIndex = (index + evidenceSlides.length) % evidenceSlides.length
    if (nextIndex === activeIndex) return

    if (reducedMotion || !slideRef.current) {
      setActiveIndex(nextIndex)
      return
    }

    gsap.to(slideRef.current, {
      autoAlpha: 0,
      x: nextIndex > activeIndex ? -16 : 16,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex(nextIndex)
        gsap.fromTo(slideRef.current, { autoAlpha: 0, x: nextIndex > activeIndex ? 16 : -16 }, { autoAlpha: 1, x: 0, duration: 0.48, ease: 'power3.out' })
      },
    })
  }

  useGSAP(() => {
    if (reducedMotion) return
    gsap.from('[data-authority-carousel]', {
      clipPath: 'inset(6% 4% 6% 4%)',
      y: 30,
      autoAlpha: 0,
      duration: 1.05,
      ease: 'power3.out',
      scrollTrigger: { trigger: '[data-authority-carousel]', start: 'top 86%' },
    })
    gsap.utils.toArray<HTMLElement>('[data-authority-reveal]').forEach((element) => {
      gsap.from(element, {
        y: 24,
        autoAlpha: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 88%' },
      })
    })
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="pratica" aria-labelledby="practice-title">
      <div className={`container ${styles.heading}`}>
        <Eyebrow data-authority-reveal>06 — Evidência</Eyebrow>
        <h2 id="practice-title" data-authority-reveal>Da experiência para o Método.</h2>
        <p data-authority-reveal>Não nasceu de uma teoria. Nasceu da prática.</p>
      </div>

      <div className={`container ${styles.carousel}`} data-authority-carousel>
        <div className={styles.viewport} ref={slideRef} aria-live="polite">
          <EditorialImage asset={activeSlide.asset} className={styles.image} critical={false} />
          <span className={styles.imageCode}>{activeSlide.code}</span>
        </div>

        <div className={styles.carouselPanel}>
          <div className={styles.counter} aria-hidden="true">
            <span>{String(activeIndex + 1).padStart(2, '0')}</span>
            <i />
            <span>{String(evidenceSlides.length).padStart(2, '0')}</span>
          </div>
          <p className={styles.caption}>{activeSlide.caption}</p>
          <p className={styles.statement}>Da experiência da Mr. Wick acompanhando homens, entendendo seus objetivos, analisando sua imagem e construindo uma presença mais coerente com aquilo que desejam comunicar.</p>

          <div className={styles.controls}>
            <button type="button" onClick={() => selectSlide(activeIndex - 1)} aria-label="Imagem anterior">
              <span aria-hidden="true">←</span>
            </button>
            <div className={styles.pagination} aria-label="Selecionar imagem">
              {evidenceSlides.map((slide, index) => (
                <button
                  type="button"
                  key={slide.code}
                  className={index === activeIndex ? styles.activeDot : ''}
                  onClick={() => selectSlide(index)}
                  aria-label={`Mostrar imagem ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                />
              ))}
            </div>
            <button type="button" onClick={() => selectSlide(activeIndex + 1)} aria-label="Próxima imagem">
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      {hasPublishedMetrics && (
        <dl className={`container ${styles.metrics}`}>
          {Object.entries(metricsConfig).map(([key, value]) => value !== null && (
            <div key={key}><dt>{metricLabels[key as keyof typeof metricLabels]}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      )}
    </section>
  )
}
