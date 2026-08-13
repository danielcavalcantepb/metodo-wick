import { useRef } from 'react'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { pillars } from '../../content/pillars'
import { gsap, useGSAP } from '../../motion/gsap'
import { useReducedMotion } from '../../motion/useReducedMotion'
import styles from './MethodPillars.module.css'

export function MethodPillars() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return

    const media = gsap.matchMedia()
    media.add('(min-width: 769px)', () => {
      const story = section.querySelector<HTMLElement>('[data-pillar-story]')
      if (!story) return
      section.dataset.enhanced = 'true'
      const panels = gsap.utils.toArray<HTMLElement>('[data-pillar-panel]')
      const markers = gsap.utils.toArray<HTMLElement>('[data-pillar-marker]')
      gsap.set(panels.slice(1), { autoAlpha: 0, y: 26 })
      gsap.set(markers.slice(1), { opacity: 0.28 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: story,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.65,
        },
      })

      panels.forEach((panel, index) => {
        if (index === 0) return
        timeline
          .to(panels[index - 1], { autoAlpha: 0, y: -22, scale: 0.985, duration: 0.38, ease: 'none' })
          .to(panel, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: 'none' }, '<0.08')
          .from(panel.querySelector('[data-pillar-number]'), { scale: 0.78, opacity: 0.04, transformOrigin: 'left bottom', duration: 0.48, ease: 'none' }, '<')
          .from(panel.querySelector('[data-pillar-body]'), { x: 36, duration: 0.42, ease: 'none' }, '<0.06')
          .to(markers[index - 1], { opacity: 0.28, duration: 0.22, ease: 'none' }, '<')
          .to(markers[index], { opacity: 1, duration: 0.22, ease: 'none' }, '<')
      })

      return () => { delete section.dataset.enhanced }
    })

    media.add('(max-width: 768.99px)', () => {
      gsap.utils.toArray<HTMLElement>('[data-pillar-mobile]').forEach((panel) => {
        gsap.from(panel, {
          y: 24,
          autoAlpha: 0,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: { trigger: panel, start: 'top 87%' },
        })
      })
    })

    return () => media.revert()
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="pilares" aria-labelledby="pillars-title">
      <div className={styles.story} data-pillar-story>
      <div className={styles.sticky}>
        <div className={`container ${styles.heading}`}>
          <Eyebrow>A metodologia</Eyebrow>
          <h2 id="pillars-title"><span>Cinco pilares.</span><span>Uma única presença.</span></h2>
        </div>

        <div className={`container ${styles.experience}`}>
          <ol className={styles.progress} aria-label="Progressão dos cinco pilares">
            {pillars.map((pillar) => <li key={pillar.number} data-pillar-marker>{pillar.number}</li>)}
          </ol>

          <div className={styles.panels}>
            {pillars.map((pillar) => (
              <article key={pillar.number} className={styles.panel} data-pillar-panel data-pillar-mobile>
                <p className={styles.number} data-pillar-number aria-hidden="true">{pillar.number}</p>
                <div className={styles.panelBody} data-pillar-body>
                  <h3>{pillar.title}</h3>
                  <p className={styles.lead}>{pillar.lead}</p>
                  <p className={styles.description}>{pillar.description}</p>
                  {'detail' in pillar && <p className={styles.detail}>{pillar.detail}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      </div>

      <div className={styles.closing}>
        <div className="container">
          <p>Imagem gera percepção.</p>
          <p>Presença sustenta percepção.</p>
          <p>Posicionamento direciona percepção.</p>
        </div>
      </div>
    </section>
  )
}
