import { useRef } from 'react'
import { EditorialVideo } from '../../components/media/EditorialVideo'
import { CTA } from '../../components/ui/CTA'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { mediaConfig } from '../../config/media'
import { heroAxes } from '../../content/heroAxes'
import { fadeRise, lineReveal, nodeReveal, textReveal } from '../../motion/primitives'
import { gsap, useGSAP } from '../../motion/gsap'
import { useReducedMotion } from '../../motion/useReducedMotion'
import styles from './HeroFullBleed.module.css'

export function HeroFullBleed() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return

    const timeline = gsap.timeline({ defaults: { overwrite: 'auto' } })
    fadeRise(timeline, '[data-hero-eyebrow]', 0.04)
    textReveal(timeline, '[data-hero-title]', 0.1)
    fadeRise(timeline, '[data-hero-support]', 0.52)
    fadeRise(timeline, '[data-hero-cta]', 0.68)
    lineReveal(timeline, '[data-hero-connection]', 0.76)
    nodeReveal(timeline, '[data-hero-node]', 1.02)
    fadeRise(timeline, '[data-hero-axis]', 1.12)

    const media = section.querySelector<HTMLElement>('[data-editorial-media]')
    if (media) {
      gsap.to(media, {
        scale: 1.025,
        yPercent: 1.6,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.8 },
      })
    }
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <>
      <section ref={sectionRef} className={styles.hero} aria-labelledby="hero-title">
        <EditorialVideo asset={mediaConfig.hero} mode="fullscreen" critical className={styles.media} />

        <div className={styles.grade} aria-hidden="true" />
        <svg className={styles.graphics} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <filter id="full-bleed-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="3" seed="23" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <rect className={styles.grain} width="1600" height="900" filter="url(#full-bleed-grain)" />
          <g className={styles.arcs}>
            <circle cx="310" cy="650" r="430" />
            <circle cx="1220" cy="410" r="520" />
            <path d="M-90 670C260 450 535 390 870 420C1120 442 1335 390 1690 155" />
          </g>
          <g className={styles.connections} data-hero-connection>
            <path d="M70 280H335L415 350H675L785 300H1110" />
            <path d="M165 700H390L475 610H750L850 555H1190" />
            <circle data-hero-node cx="70" cy="280" r="4" />
            <circle data-hero-node cx="415" cy="350" r="4" />
            <circle data-hero-node cx="785" cy="300" r="4" />
            <circle data-hero-node cx="390" cy="700" r="4" />
          </g>
          <g id="wick-cut" className={styles.wickCut} transform="translate(-170 120) scale(1.65)">
            <path d="M112 157L224 408L307 222" />
            <path d="M287 371L369 184L490 425" />
          </g>
        </svg>

        <div className={`container ${styles.inner}`}>
          <div className={styles.copy}>
            <Eyebrow className={styles.eyebrow} data-hero-eyebrow>Mr. Wick · Método Wick</Eyebrow>
            <div className={styles.titleMask}><h1 id="hero-title" data-hero-title>Antes de você vender o que faz, sua imagem já comunicou quem você é.</h1></div>
            <p data-hero-support>
              <span>Você já tem uma imagem. A questão é:</span>
              <span>ela está comunicando o que você gostaria?</span>
            </p>
            <CTA href="#metodo" variant="light" className={styles.cta} data-hero-cta>Quero conhecer o método</CTA>
          </div>
        </div>

        <div className={styles.pillars} aria-label="Quatro eixos do Método Wick">
          <div className="container">
            {heroAxes.map((axis) => (
              <span key={axis.number} data-hero-axis><i>{axis.number}</i>{axis.title}</span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.systemBar} aria-label="Estrutura do Método Wick">
        <span>Mr. Wick</span>
        {heroAxes.map((axis) => <span key={axis.number}>{axis.title}</span>)}
        <span>Método Wick</span>
      </div>
    </>
  )
}
