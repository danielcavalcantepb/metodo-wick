import { useRef } from 'react'
import { audiences } from '../../content/audiences'
import { gsap, useGSAP } from '../../motion/gsap'
import { useReducedMotion } from '../../motion/useReducedMotion'
import styles from './Audience.module.css'

export function Audience() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    if (reducedMotion) return
    gsap.utils.toArray<HTMLElement>('[data-audience]').forEach((element) => {
      gsap.from(element, {
        y: 22,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 88%' },
      })
    })
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="publico" aria-labelledby="audience-title">
      <div className="container">
        <h2 id="audience-title" data-audience>Para homens em movimento.</h2>
        <ol className={styles.list}>
          {audiences.map((audience, index) => (
            <li key={audience.title} data-audience>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{audience.title}</h3>
              <p>{audience.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
