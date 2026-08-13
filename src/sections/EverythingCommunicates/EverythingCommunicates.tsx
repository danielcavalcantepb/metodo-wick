import { useRef } from 'react'
import { communicationStatements } from '../../content/narrative'
import { gsap, useGSAP } from '../../motion/gsap'
import { useReducedMotion } from '../../motion/useReducedMotion'
import styles from './EverythingCommunicates.module.css'

export function EverythingCommunicates() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    const section = sectionRef.current
    if (!section || reducedMotion) return

    const media = gsap.matchMedia()
    media.add('(min-width: 769px)', () => {
      section.dataset.enhanced = 'true'
      const statements = gsap.utils.toArray<HTMLElement>('[data-statement]')
      const markers = gsap.utils.toArray<HTMLElement>('[data-communication-marker]')
      gsap.set(statements, { autoAlpha: 0, y: 22 })
      gsap.set('[data-communication-final]', { autoAlpha: 0, y: 28 })
      gsap.set(markers.slice(1), { opacity: 0.25 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.65,
        },
      })

      timeline.to('[data-communication-intro]', { autoAlpha: 0, y: -18, ease: 'none', duration: 0.75 })
      statements.forEach((statement, index) => {
        timeline
          .to(markers, { opacity: 0.25, duration: 0.12, ease: 'none' })
          .to(markers[index], { opacity: 1, duration: 0.12, ease: 'none' }, '<')
          .to(statement, { autoAlpha: 1, y: 0, ease: 'none', duration: index === 3 ? 0.72 : 0.52 })
          .to(statement, { autoAlpha: 0, y: index % 2 ? 14 : -18, ease: 'none', duration: 0.38 }, '+=0.24')
      })
      timeline
        .to(markers, { opacity: 0.25, duration: 0.12, ease: 'none' })
        .to(markers[4], { opacity: 1, duration: 0.12, ease: 'none' }, '<')
        .to('[data-communication-final]', { autoAlpha: 1, y: 0, ease: 'none', duration: 1.1 })

      return () => { delete section.dataset.enhanced }
    })

    media.add('(max-width: 768.99px)', () => {
      gsap.utils.toArray<HTMLElement>('[data-mobile-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 24,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%' },
        })
      })
    })

    return () => media.revert()
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="tudo-comunica" aria-labelledby="communication-title">
      <div className={styles.sticky}>
        <div className={`container ${styles.stage}`}>
          <p className={styles.intro} data-communication-intro data-mobile-reveal>
            Antes de você dizer seu nome, apresentar seus resultados ou falar sobre o que faz, sua imagem já começou a contar uma história sobre você.
          </p>

          <div className={styles.statements} aria-label="Tudo comunica">
            {communicationStatements.map((statement) => (
              <p key={statement} data-statement data-mobile-reveal>{statement}</p>
            ))}
          </div>

          <ol className={styles.progress} aria-label="Progresso da cena">
            {Array.from({ length: 5 }, (_, index) => <li key={index} data-communication-marker>{String(index + 1).padStart(2, '0')} / 05</li>)}
          </ol>

          <div className={styles.final} data-communication-final data-mobile-reveal>
            <h2 id="communication-title">Tudo comunica.</h2>
            <p>Aprenda a assumir o controle dessa mensagem.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
