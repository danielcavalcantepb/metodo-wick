import { useRef } from 'react'
import { EditorialImage } from '../../components/media/EditorialImage'
import { CTA } from '../../components/ui/CTA'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { mediaConfig } from '../../config/media'
import { pillars } from '../../content/pillars'
import { fadeRise, lineReveal, mediaReveal, nodeReveal, textReveal } from '../../motion/primitives'
import { gsap, useGSAP } from '../../motion/gsap'
import { useReducedMotion } from '../../motion/useReducedMotion'
import styles from './MethodIntroduction.module.css'

export function MethodIntroduction() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    if (reducedMotion) return
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
    })
    lineReveal(timeline, '[data-method-graphic]', 0)
    nodeReveal(timeline, '[data-method-node]', 0.25)
    mediaReveal(timeline, '[data-method-media]', 0.3)
    textReveal(timeline, '[data-method-title]', 0.72)
    fadeRise(timeline, '[data-method-content]', 0.78)
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="metodo" aria-labelledby="method-intro-title">
      <div className={styles.connector} data-method-graphic aria-hidden="true"><i /><i /><i /></div>
      <div className={`container ${styles.grid}`}>
        <div className={styles.productStage} aria-label="Representação visual do Método Wick">
          <span className={styles.orbit} data-method-graphic aria-hidden="true" />
          <article className={styles.folio} data-method-media>
            <header><span>MR. WICK</span><span>SISTEMA 01—05</span></header>
            <div className={styles.folioBody}>
              <EditorialImage asset={mediaConfig.methodIntroduction.card} className={styles.detail} />
              <div className={styles.folioContent}>
                <p>Método Wick</p>
                <strong>Percepção<br />em construção.</strong>
                <ol>
                  {pillars.map((pillar) => <li key={pillar.number}><i>{pillar.number}</i><span>{pillar.title}</span></li>)}
                </ol>
              </div>
            </div>
          </article>
          <span className={`${styles.node} ${styles.nodeOne}`} data-method-node>01</span>
          <span className={`${styles.node} ${styles.nodeTwo}`} data-method-node>03</span>
          <span className={`${styles.node} ${styles.nodeThree}`} data-method-node>05</span>
        </div>

        <div className={styles.copy}>
          <Eyebrow data-method-content>O sistema</Eyebrow>
          <div className={styles.titleMask}><h2 id="method-intro-title" data-method-title>Método Wick</h2></div>
          <p data-method-content>Um método sobre imagem, presença, posicionamento, influência e vendas para homens que entenderam que a forma como são percebidos influencia as oportunidades que recebem.</p>
          <ul data-method-content>
            {pillars.map((pillar) => <li key={pillar.number}><span>{pillar.number}</span>{pillar.title}</li>)}
          </ul>
          <CTA href="#percepcao" variant="light" data-method-content>Entender a percepção</CTA>
        </div>
      </div>
    </section>
  )
}
