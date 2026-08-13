import { useRef } from 'react'
import { EditorialVideo } from '../../components/media/EditorialVideo'
import { MediaVignette } from '../../components/media/MediaOverlay'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { mediaConfig } from '../../config/media'
import { gsap, useGSAP } from '../../motion/gsap'
import { requestScrollRefresh } from '../../motion/refresh'
import { useReducedMotion } from '../../motion/useReducedMotion'
import styles from './BeyondClothing.module.css'

export function BeyondClothing() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    if (reducedMotion) return

    gsap.from('[data-consulting-media]', {
      clipPath: 'inset(8% 8% 8% 8%)',
      scale: 0.965,
      ease: 'none',
      scrollTrigger: {
        trigger: '[data-consulting-media]',
        start: 'top 92%',
        end: 'top 38%',
        scrub: 0.65,
      },
    })

    gsap.from('[data-process-step]', {
      autoAlpha: 0,
      x: -18,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: '[data-process-rail]', start: 'top 82%' },
    })

    gsap.utils.toArray<HTMLElement>('[data-beyond-reveal]').forEach((element) => {
      gsap.from(element, {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 84%' },
      })
    })
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="nao-e-sobre-roupa" aria-labelledby="beyond-title">
      <div className={`container ${styles.opening}`}>
        <Eyebrow data-beyond-reveal>Além da superfície</Eyebrow>
        <h2 id="beyond-title" data-beyond-reveal>Não é sobre se vestir bem.</h2>
      </div>

      <div className={`container ${styles.mediaComposition}`} data-consulting-media>
        <EditorialVideo
          asset={mediaConfig.beyondClothing.primary}
          className={styles.video}
          onLoadedMetadata={requestScrollRefresh}
        />
        <MediaVignette opacity={0.45} />
        <p className={styles.mediaCaption}>Consultoria Mr. Wick · imagem em construção</p>
        <ol className={styles.processRail} data-process-rail aria-label="Etapas da construção de presença">
          {['Observação', 'Diagnóstico', 'Construção', 'Intenção'].map((step, index) => (
            <li key={step} data-process-step><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>
          ))}
        </ol>
      </div>

      <div className={`container ${styles.bridge}`}>
        <p data-beyond-reveal>É sobre saber o que você comunica quando entra em uma sala.</p>
      </div>

      <div className={styles.editorialBody}>
        <div className={`container ${styles.bodyGrid}`}>
          <p className={styles.lead} data-beyond-reveal>O estilo é apenas uma parte da construção.</p>
          <p className={styles.copy} data-beyond-reveal>O Método Wick reúne princípios de imagem, comportamento, comunicação e posicionamento para construir uma presença coerente com o homem que você é — e com os lugares que deseja ocupar.</p>
          <div className={styles.futureSlot} aria-hidden="true" />
        </div>

        <div className={`container ${styles.manifesto}`} data-beyond-reveal>
          <p>A roupa é apenas o começo.</p>
          <p>O que construímos é <em>percepção.</em></p>
        </div>
      </div>
    </section>
  )
}
