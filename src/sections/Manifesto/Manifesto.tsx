import { useRef } from 'react'
import { EditorialVideo } from '../../components/media/EditorialVideo'
import { mediaConfig } from '../../config/media'
import { manifestoStatements } from '../../content/conversion'
import { gsap, useGSAP } from '../../motion/gsap'
import { useReducedMotion } from '../../motion/useReducedMotion'
import styles from './Manifesto.module.css'

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return
    const media = gsap.matchMedia()
    media.add('(min-width: 769px)', () => {
      const story = section.querySelector<HTMLElement>('[data-manifesto-story]')
      const lines = gsap.utils.toArray<HTMLElement>('[data-manifesto-line]')
      if (!story) return
      gsap.set(lines.slice(1), { autoAlpha: 0, y: 18 })
      const timeline = gsap.timeline({ scrollTrigger: { trigger: story, start: 'top top', end: 'bottom bottom', scrub: 0.7 } })
      lines.slice(1).forEach((line, index) => {
        timeline.to(lines[index], { autoAlpha: 0, duration: 0.35, ease: 'none' })
          .to(line, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'none' }, '<0.08')
      })
    })
    media.add('(max-width: 768.99px)', () => {
      gsap.utils.toArray<HTMLElement>('[data-manifesto-line]').forEach((line) => {
        gsap.from(line, { y: 18, autoAlpha: 0, duration: 0.75, ease: 'power2.out', scrollTrigger: { trigger: line, start: 'top 88%' } })
      })
    })
    return () => media.revert()
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="manifesto" aria-labelledby="manifesto-title">
      <div className={styles.story} data-manifesto-story>
        <div className={styles.sticky}>
          <div className={`container ${styles.composition}`}>
            <div className={styles.videoWrap}>
              <EditorialVideo asset={mediaConfig.stage.primary} className={styles.video} />
              <span className={styles.videoLabel}>Presença em movimento</span>
            </div>
            <div className={styles.copy}>
              <h2 id="manifesto-title" data-manifesto-line>O clássico resiste ao tempo.</h2>
              <div className={styles.statements}>
                {manifestoStatements.map((statement) => <p key={statement} data-manifesto-line>{statement}</p>)}
                <p className={styles.climax} data-manifesto-line>É coerência.</p>
              </div>
              <p className={styles.signature}>Método Wick</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
