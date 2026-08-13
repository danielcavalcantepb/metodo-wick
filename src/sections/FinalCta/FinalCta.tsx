import { useRef } from 'react'
import { CTA } from '../../components/ui/CTA'
import { commerceConfig } from '../../config/commerce'
import { gsap, useGSAP } from '../../motion/gsap'
import { useReducedMotion } from '../../motion/useReducedMotion'
import styles from './FinalCta.module.css'

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    if (reducedMotion) return
    gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 76%' } })
      .from('[data-final-wordmark]', { autoAlpha: 0, y: 18, duration: 0.65, ease: 'power3.out' })
      .from('[data-final-title]', { yPercent: 105, duration: 1, ease: 'power4.out' }, '<0.08')
      .from('[data-final-line]', { scaleX: 0, transformOrigin: 'left', duration: 0.9, ease: 'power3.out' }, '<0.3')
      .from('[data-final-detail]', { autoAlpha: 0, y: 28, filter: 'blur(8px)', duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '<0.12')
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="final" aria-labelledby="final-cta-title">
      <div className={`container ${styles.inner}`}>
        <p className={styles.wordmark} data-final-wordmark>Mr. Wick</p>
        <div className={styles.titleMask}>
          <h2 id="final-cta-title" data-final-title>Método Wick</h2>
        </div>
        <span className={styles.line} data-final-line aria-hidden="true" />
        <div className={styles.echo} data-final-detail>
          <p>Sua imagem já está falando.</p>
          <p>Decida o que ela vai dizer.</p>
        </div>
        <CTA href={commerceConfig.checkoutUrl ?? undefined} disabled={!commerceConfig.checkoutUrl} variant="light" className={styles.cta} data-final-detail>Quero começar</CTA>
        <p className={styles.signature} data-final-detail>O clássico resiste ao tempo.</p>
      </div>
    </section>
  )
}
