import { useRef } from 'react'
import { EditorialImage } from '../../components/media/EditorialImage'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { mediaConfig } from '../../config/media'
import { hasPublishedMetrics, metricsConfig } from '../../config/metrics'
import { gsap, useGSAP } from '../../motion/gsap'
import { useReducedMotion } from '../../motion/useReducedMotion'
import styles from './PracticeAuthority.module.css'

const metricLabels = {
  clientsServed: 'Clientes atendidos',
  yearsOfExperience: 'Anos de experiência',
  consultanciesCompleted: 'Consultorias realizadas',
} as const

export function PracticeAuthority() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    if (reducedMotion) return
    gsap.utils.toArray<HTMLElement>('[data-authority-image]').forEach((image, index) => {
      gsap.from(image, {
        clipPath: 'inset(8% 6% 8% 6%)',
        scale: 1.045,
        y: index === 0 ? 36 : 24,
        autoAlpha: 0,
        duration: 1.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: image, start: 'top 88%' },
      })
    })
    gsap.utils.toArray<HTMLElement>('[data-authority-reveal]').forEach((element) => {
      gsap.from(element, {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 86%' },
      })
    })
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="pratica" aria-labelledby="practice-title">
      <div className={`container ${styles.heading}`}>
        <Eyebrow data-authority-reveal>Da prática para o método</Eyebrow>
        <h2 id="practice-title" data-authority-reveal>O Método Wick não nasceu de uma teoria.</h2>
        <p data-authority-reveal>Nasceu da prática.</p>
      </div>

      <div className={`container ${styles.evidence}`} data-authority-media>
        <figure className={styles.studioEvidence} data-authority-image>
          <EditorialImage asset={mediaConfig.authority.documentary} className={styles.image} />
          <figcaption>Bastidor de ensaio · imagem construída com intenção</figcaption>
        </figure>
        <figure className={styles.navyEvidence} data-authority-image>
          <EditorialImage asset={mediaConfig.authority.navyPortrait} className={styles.image} />
          <figcaption>Alfaiataria · proporção, caimento e posicionamento</figcaption>
        </figure>
      </div>

      <div className={`container ${styles.statement}`} data-authority-reveal>
        <figure className={styles.blueEvidence} data-authority-image>
          <EditorialImage asset={mediaConfig.authority.bluePortrait} className={styles.image} />
          <figcaption>Identidade · cor, contraste e presença</figcaption>
        </figure>
        <figure className={styles.detailEvidence} data-authority-image aria-hidden="true">
          <EditorialImage asset={{ ...mediaConfig.authority.navyDetail, alt: '' }} className={styles.detailImage} />
        </figure>
        <p>Da experiência da Mr. Wick acompanhando homens, entendendo seus objetivos, analisando sua imagem e construindo uma presença mais coerente com aquilo que desejam comunicar.</p>
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
