import { useRef } from 'react'
import { CTA } from '../../components/ui/CTA'
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
      .from('[data-final-title]', { yPercent: 105, duration: 1, stagger: 0.08, ease: 'power4.out' }, '<0.08')
      .from('[data-final-line]', { scaleX: 0, transformOrigin: 'left', duration: 0.9, ease: 'power3.out' }, '<0.3')
      .from('[data-final-detail]', { autoAlpha: 0, y: 22, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '<0.12')
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="final" aria-labelledby="final-cta-title">
      <div className={`container ${styles.inner}`}>
        <p className={styles.folio} data-final-wordmark>11 — Epílogo</p>
        <p className={styles.wordmark} data-final-wordmark>Mr. Wick · Método Wick</p>
        <div className={styles.titleGroup} id="final-cta-title">
          <div className={styles.titleMask}><h2 data-final-title>Sua imagem já está falando.</h2></div>
          <div className={styles.titleMask}><h2 data-final-title>Decida o que ela vai dizer.</h2></div>
        </div>
        <span className={styles.line} data-final-line aria-hidden="true" />
        <div className={styles.action} data-final-detail>
          <p>Imagem · Presença · Posicionamento · Influência · Venda</p>
          <CTA href="#oferta" variant="light" className={styles.cta}>Escolher meu caminho</CTA>
        </div>
        <p className={styles.signature} data-final-detail>O clássico resiste ao tempo.</p>
      </div>
    </section>
  )
}
