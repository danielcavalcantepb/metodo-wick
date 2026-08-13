import { useRef } from 'react'
import { CTA } from '../../components/ui/CTA'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { commerceConfig } from '../../config/commerce'
import { offerCopy } from '../../content/conversion'
import { gsap, useGSAP } from '../../motion/gsap'
import { useReducedMotion } from '../../motion/useReducedMotion'
import styles from './Offer.module.css'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function Offer() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const { checkoutUrl, productPrice, productInstallments, guaranteeDays, benefits } = commerceConfig

  useGSAP(() => {
    if (reducedMotion) return
    gsap.from('[data-offer-reveal]', {
      y: 44,
      autoAlpha: 0,
      filter: 'blur(9px)',
      duration: 1,
      stagger: 0.11,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
    })
    gsap.from('[data-offer-line]', { scaleY: 0, transformOrigin: 'top', duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 76%' } })
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="oferta" aria-labelledby="offer-title">
      <span className={styles.axis} data-offer-line aria-hidden="true" />
      <div className={`container ${styles.layout}`}>
        <div className={styles.heading}>
          <Eyebrow data-offer-reveal>{offerCopy.eyebrow}</Eyebrow>
          <h2 id="offer-title" data-offer-reveal>{offerCopy.headline}</h2>
        </div>

        <div className={styles.product}>
          <p className={styles.name} data-offer-reveal>{offerCopy.product}</p>
          <p className={styles.description} data-offer-reveal>{offerCopy.description}</p>

          {productPrice !== null && (
            <div className={styles.price}>
              <span>Investimento</span>
              <strong>{currency.format(productPrice)}</strong>
              {productInstallments !== null && <small>em até {productInstallments} parcelas</small>}
            </div>
          )}

          {benefits.length > 0 && (
            <ul className={styles.benefits}>
              {benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
            </ul>
          )}

          {guaranteeDays !== null && <p className={styles.guarantee}>Garantia de {guaranteeDays} dias.</p>}

          <CTA href={checkoutUrl ?? undefined} disabled={!checkoutUrl} variant="light" className={styles.cta} data-offer-reveal>
            Quero acessar o Método Wick
          </CTA>
        </div>
      </div>
    </section>
  )
}
