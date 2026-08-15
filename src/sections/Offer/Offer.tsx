import { useRef } from 'react'
import { CTA } from '../../components/ui/CTA'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { commerceConfig } from '../../config/commerce'
import { offerChoiceCopy } from '../../content/offers'
import { gsap, useGSAP } from '../../motion/gsap'
import { useReducedMotion } from '../../motion/useReducedMotion'
import styles from './Offer.module.css'

const integerFormatter = new Intl.NumberFormat('pt-BR')

function EditorialPrice({ value }: { value: number }) {
  const [integer, cents] = value.toFixed(2).split('.')

  return (
    <div className={styles.priceMask}>
      <span className={styles.priceAccessible}>R$ {integerFormatter.format(Number(integer))},{cents}</span>
      <p className={styles.price} data-offer-price aria-hidden="true">
        <span className={styles.currency}>R$</span>
        <strong>{integerFormatter.format(Number(integer))}</strong>
        <span className={styles.cents}>,{cents}</span>
      </p>
    </div>
  )
}

export function Offer() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useGSAP(() => {
    if (reducedMotion) return

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 74%',
        once: true,
      },
    })

    timeline
      .from('[data-offer-ribbon]', { xPercent: (index) => index === 0 ? -8 : 8, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' })
      .from('[data-offer-heading]', { y: 24, autoAlpha: 0, duration: 0.65, ease: 'power3.out', stagger: 0.06 }, '-=0.42')
      .from('[data-offer-divider]', { scaleX: 0, transformOrigin: 'left', duration: 0.6, ease: 'power3.inOut' }, '-=0.4')
      .from('[data-offer-territory]', { autoAlpha: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }, '-=0.35')
      .from('[data-offer-index]', { y: 14, autoAlpha: 0, duration: 0.45, ease: 'power3.out', stagger: 0.06 }, '-=0.45')
      .from('[data-offer-copy]', { y: 16, autoAlpha: 0, duration: 0.55, ease: 'power3.out', stagger: 0.04 }, '-=0.35')
      .from('[data-offer-details]', { y: 10, autoAlpha: 0, duration: 0.45, ease: 'power3.out', stagger: 0.06 }, '-=0.4')
      .from('[data-offer-price]', { yPercent: 100, duration: 0.55, ease: 'power3.out', stagger: 0.06 }, '-=0.35')
      .from('[data-offer-cta]', { y: 10, autoAlpha: 0, duration: 0.45, ease: 'power2.out', stagger: 0.06 }, '-=0.4')

    gsap.to('[data-offer-ribbon="top"]', {
      xPercent: 4,
      ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
    })

    gsap.to('[data-offer-ribbon="bottom"]', {
      xPercent: -4,
      ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
    })
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="oferta" aria-labelledby="offer-title">
      <div className={styles.graphicField} aria-hidden="true">
        <span className={styles.orbit} />
        <span className={styles.node} />
      </div>

      <div className={`${styles.ribbon} ${styles.ribbonTop}`} data-offer-ribbon="top" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index}>Método Wick • Consultoria Wick •</span>
        ))}
      </div>

      <div className={`container ${styles.introduction}`}>
        <Eyebrow data-offer-heading>{offerChoiceCopy.eyebrow}</Eyebrow>
        <div className={styles.heading}>
          <h2 id="offer-title" data-offer-heading>{offerChoiceCopy.headline}</h2>
          <p data-offer-heading>{offerChoiceCopy.supportingCopy}</p>
        </div>
        <span className={styles.openingLine} data-offer-divider aria-hidden="true" />
      </div>

      <div className={`container ${styles.territories}`}>
        {offerChoiceCopy.options.map((option) => {
          const pathConfig = commerceConfig[option.id]

          return (
            <article
              key={option.id}
              className={`${styles.territory} ${styles[option.id]}`}
              data-offer-territory
              tabIndex={0}
              aria-labelledby={`offer-${option.id}-title`}
            >
              <div className={styles.territoryInner}>
                <div className={styles.index} data-offer-index>
                  <span>{option.number}</span>
                  <span>{option.label}</span>
                </div>

                <div className={styles.copy}>
                  <p className={styles.microcopy} data-offer-copy>{option.microcopy}</p>
                  <h3 id={`offer-${option.id}-title`} data-offer-copy>{option.headline}</h3>
                  <p className={styles.description} data-offer-copy>{option.description}</p>
                </div>

                <div className={styles.details} data-offer-details>
                  <p>{option.detailLabel}</p>
                  <ul>
                    {option.details.flatMap((detail) => detail.includes(' · ') ? detail.split(' · ') : [detail]).map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>

                {pathConfig.price !== null ? <EditorialPrice value={pathConfig.price} /> : null}

                <div data-offer-cta>
                  <CTA
                    href={pathConfig.checkoutUrl ?? undefined}
                    disabled={!pathConfig.checkoutUrl}
                    variant={option.id === 'method' ? 'light' : 'outline'}
                    className={styles.cta}
                  >
                    {option.cta}
                  </CTA>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className={`${styles.ribbon} ${styles.ribbonBottom}`} data-offer-ribbon="bottom" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index}>Consultoria Wick • Método Wick •</span>
        ))}
      </div>
    </section>
  )
}
