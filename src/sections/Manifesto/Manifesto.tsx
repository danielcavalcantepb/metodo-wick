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
    if (reducedMotion) return

    gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } })
      .from('[data-manifesto-media]', { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'power3.inOut', clearProps: 'clipPath' })
      .from('[data-manifesto-line]', { y: 24, autoAlpha: 0, duration: 0.72, stagger: 0.12, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, '-=0.42')
      .from('[data-manifesto-signature]', { scaleX: 0, transformOrigin: 'left', duration: 0.7, ease: 'power3.out', clearProps: 'transform' }, '-=0.34')
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="manifesto" aria-labelledby="manifesto-title">
      <div className={`container ${styles.composition}`}>
        <div className={styles.videoWrap} data-manifesto-media>
          <EditorialVideo asset={mediaConfig.stage.primary} className={styles.video} />
          <span className={styles.videoLabel}>Visão Mr. Wick · 10</span>
        </div>
        <div className={styles.copy}>
          <p className={styles.eyebrow} data-manifesto-line>Manifesto final</p>
          <h2 id="manifesto-title" data-manifesto-line>O clássico resiste ao tempo.</h2>
          <div className={styles.statements}>
            {manifestoStatements.map((statement) => <p key={statement} data-manifesto-line>{statement}</p>)}
            <p className={styles.climax} data-manifesto-line>É coerência.</p>
          </div>
          <span className={styles.signature} data-manifesto-signature aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
