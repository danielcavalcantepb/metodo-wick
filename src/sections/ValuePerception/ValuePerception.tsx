import { useRef } from 'react'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { perceivedValue, realValue } from '../../content/narrative'
import { fadeRise, lineReveal, panelReveal, textReveal } from '../../motion/primitives'
import { gsap, useGSAP } from '../../motion/gsap'
import { useReducedMotion } from '../../motion/useReducedMotion'
import styles from './ValuePerception.module.css'

export function ValuePerception() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    if (reducedMotion) return
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
    })
    panelReveal(timeline, '[data-value-panel]', 0)
    textReveal(timeline, '[data-value-title]', 0.25)
    fadeRise(timeline, '[data-value-real]', 0.55)
    lineReveal(timeline, '[data-value-axis-line]', 0.78, true)
    fadeRise(timeline, '[data-value-axis]', 0.9)
    fadeRise(timeline, '[data-value-perceived]', 1.08)
    fadeRise(timeline, '[data-value-conclusion]', 1.3)
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="percepcao" aria-labelledby="value-title">
      <div className={styles.panel} data-value-panel>
        <div className={`container ${styles.inner}`}>
          <header className={styles.header}>
            <Eyebrow>Valor e leitura</Eyebrow>
            <div>
              <p>Método Wick · percepção</p>
              <div className={styles.titleMask}><h2 id="value-title" data-value-title>Valor real <i>×</i><br />valor percebido.</h2></div>
            </div>
          </header>

          <div className={styles.comparison}>
            <article className={styles.side} data-value-real>
              <p className={styles.label}><span>01</span> Valor real</p>
              <ul>{realValue.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>

            <div className={styles.axis} data-value-axis>
              <span data-value-axis-line aria-hidden="true" />
              <p>Percepção</p>
              <small>O eixo entre o que existe e o que é compreendido.</small>
            </div>

            <article className={styles.side} data-value-perceived>
              <p className={styles.label}><span>02</span> Valor percebido</p>
              <ul>{perceivedValue.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>

          <footer className={styles.conclusion} data-value-conclusion>
            <p>Não se trata de parecer aquilo que você não é.</p>
            <p>Trata-se de fazer sua imagem comunicar, com coerência, o valor que já existe em você.</p>
          </footer>
        </div>
      </div>
    </section>
  )
}
