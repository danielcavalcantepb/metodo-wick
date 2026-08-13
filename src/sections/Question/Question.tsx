import { useRef } from 'react'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { gsap, useGSAP } from '../../motion/gsap'
import { useReducedMotion } from '../../motion/useReducedMotion'
import styles from './Question.module.css'

export function Question() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    if (reducedMotion) return

    const media = gsap.matchMedia()
    media.add('(min-width: 769px)', () => {
      const elements = gsap.utils.toArray<HTMLElement>('[data-question-reveal]')
      gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', end: 'bottom 28%', scrub: 0.7 } })
        .from(elements[0], { autoAlpha: 0, y: 28, duration: 0.5 })
        .from(elements[1], { autoAlpha: 0, y: 50, filter: 'blur(10px)', duration: 0.85 }, '<0.08')
        .from(elements[2], { autoAlpha: 0, xPercent: 7, filter: 'blur(10px)', duration: 0.95 })
        .from(elements[3], { autoAlpha: 0, y: 32, duration: 0.65 }, '<0.18')
        .from(elements[4], { autoAlpha: 0, scale: 0.96, transformOrigin: 'left center', duration: 0.75 })
        .from(elements[5], { autoAlpha: 0, x: 24, duration: 0.55 }, '<0.16')
    })
    media.add('(max-width: 768.99px)', () => {
      gsap.utils.toArray<HTMLElement>('[data-question-reveal]').forEach((element) => {
        gsap.from(element, { y: 24, autoAlpha: 0, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%' } })
      })
    })
    return () => media.revert()
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="a-pergunta" aria-labelledby="question-title">
      <div className="container">
        <Eyebrow className={styles.eyebrow} data-question-reveal>Antes da primeira palavra</Eyebrow>
        <div className={styles.composition}>
          <h2 id="question-title" className={styles.first} data-question-reveal>Você sabe o valor que tem.</h2>
          <p className={styles.second} data-question-reveal>Mas será que sua imagem comunica esse valor?</p>
          <p className={styles.support} data-question-reveal>Antes de conhecerem sua competência, seus resultados ou sua história, as pessoas já tiveram contato com a maneira como você se apresenta, se comporta e se comunica.</p>
          <p className={styles.emphasis} data-question-reveal>Você já está sendo percebido.</p>
          <p className={styles.closing} data-question-reveal>A questão é se essa percepção está trabalhando a seu favor.</p>
        </div>
      </div>
    </section>
  )
}
