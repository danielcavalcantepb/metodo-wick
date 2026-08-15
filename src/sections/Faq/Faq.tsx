import { useRef } from 'react'
import { faqItems } from '../../content/faq'
import { gsap, useGSAP } from '../../motion/gsap'
import { useReducedMotion } from '../../motion/useReducedMotion'
import styles from './Faq.module.css'

export function Faq() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    if (reducedMotion) return
    gsap.from('[data-faq-reveal]', {
      y: 38,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    })
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="faq" aria-labelledby="faq-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.heading} data-faq-reveal>
          <p>Informação essencial · 12</p>
          <h2 id="faq-title">Perguntas frequentes.</h2>
        </div>
        <div className={styles.items}>
          {faqItems.map((item, index) => (
            <details key={item.question} data-faq-reveal>
              <summary><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.question}</strong></summary>
              <div className={styles.answer}><p>{item.answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
