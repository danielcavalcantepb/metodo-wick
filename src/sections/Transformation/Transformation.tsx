import { useRef } from 'react'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { transformations } from '../../content/conversion'
import { gsap, useGSAP } from '../../motion/gsap'
import { useReducedMotion } from '../../motion/useReducedMotion'
import styles from './Transformation.module.css'

export function Transformation() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return
    const media = gsap.matchMedia()

    media.add('(min-width: 769px)', () => {
      const story = section.querySelector<HTMLElement>('[data-transformation-story]')
      const scenes = gsap.utils.toArray<HTMLElement>('[data-transformation-scene]')
      if (!story) return
      section.dataset.enhanced = 'true'
      gsap.set(scenes.slice(1), { autoAlpha: 0, y: 24 })

      const timeline = gsap.timeline({
        scrollTrigger: { trigger: story, start: 'top top', end: 'bottom bottom', scrub: 0.65 },
      })
      gsap.from(scenes[0].querySelector('[data-before]'), { x: -28, opacity: 0.42, duration: 0.7, ease: 'power2.out' })
      gsap.from(scenes[0].querySelector('[data-after]'), { x: 28, duration: 0.7, ease: 'power2.out' })
      scenes.slice(1).forEach((scene, index) => {
        timeline
          .to(scenes[index], { autoAlpha: 0, y: -20, duration: 0.42, ease: 'none' })
          .to(scene, { autoAlpha: 1, y: 0, duration: 0.52, ease: 'none' }, '<0.12')
          .from(scene.querySelector('[data-before]'), { x: -34, opacity: 0.35, duration: 0.42, ease: 'none' }, '<')
          .from(scene.querySelector('[data-axis]'), { scaleX: 0, transformOrigin: 'left', duration: 0.38, ease: 'none' }, '<0.06')
          .from(scene.querySelector('[data-after]'), { x: 34, duration: 0.46, ease: 'none' }, '<0.04')
      })
      return () => { delete section.dataset.enhanced }
    })

    media.add('(max-width: 768.99px)', () => {
      gsap.utils.toArray<HTMLElement>('[data-transformation-scene]').forEach((scene) => {
        gsap.from(scene, { y: 22, autoAlpha: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: scene, start: 'top 88%' } })
      })
    })
    return () => media.revert()
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="transformacao" aria-labelledby="transformation-title">
      <div className={styles.story} data-transformation-story>
        <div className={styles.sticky}>
          <div className={`container ${styles.heading}`}>
            <Eyebrow>Transformação</Eyebrow>
            <h2 id="transformation-title">Uma mudança de percepção.</h2>
          </div>
          <div className={`container ${styles.scenes}`}>
            {transformations.map((item, index) => (
              <article className={styles.scene} data-transformation-scene key={item.before}>
                <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                <div className={styles.before} data-before><span>Antes</span><p>“{item.before}”</p></div>
                <span className={styles.axis} data-axis aria-hidden="true" />
                <div className={styles.after} data-after><span>Depois</span><p>“{item.after}”</p></div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.closing}>
        <div className="container">
          <p>Você não precisa se tornar outra pessoa.</p>
          <p>Precisa aprender a comunicar melhor quem você já é.</p>
        </div>
      </div>
    </section>
  )
}
