import { useRef } from 'react'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { pillars } from '../../content/pillars'
import { lineReveal } from '../../motion/primitives'
import { gsap, useGSAP } from '../../motion/gsap'
import { useReducedMotion } from '../../motion/useReducedMotion'
import styles from './MethodMechanismIntro.module.css'

export function MethodMechanismIntro() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return
    const media = gsap.matchMedia()

    media.add('(min-width: 769px)', () => {
      const items = gsap.utils.toArray<HTMLElement>('[data-mechanism-item]')
      const nodes = gsap.utils.toArray<HTMLElement>('[data-mechanism-node]')
      section.dataset.enhanced = 'true'
      gsap.set(items, { autoAlpha: 0, y: 18 })
      gsap.set(nodes, { scale: 0.7, opacity: 0.35 })
      gsap.set(items[0], { autoAlpha: 1, y: 0 })
      gsap.set(nodes[0], { scale: 1, opacity: 1 })
      const setActiveStep = (step: number) => {
        section.dataset.mechanismActive = String(Math.min(items.length, Math.max(1, step)))
      }
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.55,
          onUpdate: (self) => setActiveStep(Math.floor(self.progress * items.length) + 1),
        },
      })
      lineReveal(timeline, '[data-mechanism-progress]', 0)
      items.slice(1).forEach((item, itemIndex) => {
        const index = itemIndex + 1
        timeline
          .to(item, { autoAlpha: 1, y: 0, duration: 0.42, ease: 'power2.out' }, index - 0.72)
          .to(nodes[index], { scale: 1, opacity: 1, duration: 0.22, ease: 'power2.out' }, '<')
          .from(item.querySelectorAll('[data-mechanism-detail]'), { y: 8, autoAlpha: 0, stagger: 0.04, duration: 0.26, ease: 'power2.out' }, '<')
      })
      return () => {
        delete section.dataset.enhanced
        delete section.dataset.mechanismActive
      }
    })

    media.add('(max-width: 768.99px)', () => {
      const timeline = gsap.timeline({ scrollTrigger: { trigger: '[data-mechanism-rail]', start: 'top 84%' } })
      lineReveal(timeline, '[data-mechanism-progress]', 0, true)
      timeline.from('[data-mechanism-item]', { y: 12, autoAlpha: 0, duration: 0.62, stagger: 0.11, ease: 'power3.out' }, 0.08)
    })
    return () => media.revert()
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="pilares" aria-labelledby="mechanism-title">
      <div className={styles.medallion} aria-hidden="true"><span>MW</span></div>
      <div className={`container ${styles.inner}`}>
        <header data-mechanism-heading>
          <Eyebrow data-mechanism-intro>O mecanismo</Eyebrow>
          <div className={styles.titleMask}><h2 id="mechanism-title" data-mechanism-title>Como o Método Wick funciona.</h2></div>
          <p data-mechanism-intro>Uma progressão construída para alinhar o que você é, o que comunica e o que as pessoas compreendem.</p>
        </header>

        <ol className={styles.rail} data-mechanism-rail aria-label="Progressão do Método Wick">
          <span className={styles.railProgress} data-mechanism-progress aria-hidden="true" />
          {pillars.map((pillar) => (
            <li key={pillar.number} data-mechanism-item>
              <i className={styles.railNode} data-mechanism-node aria-hidden="true" />
              <span>{pillar.number}</span>
              <strong data-mechanism-detail>{pillar.title}</strong>
              <small data-mechanism-detail>{pillar.lead}</small>
              <p data-mechanism-detail>{pillar.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
