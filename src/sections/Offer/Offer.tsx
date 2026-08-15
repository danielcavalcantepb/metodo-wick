import { Fragment, useRef } from 'react'
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
      .from('[data-offer-heading]', { y: 30, autoAlpha: 0, duration: 0.85, ease: 'power3.out', stagger: 0.08 })
      .from('[data-offer-divider]', { scaleX: 0, transformOrigin: 'left', duration: 0.9, ease: 'power3.inOut' }, '-=0.48')
      .from('[data-offer-decision]', { autoAlpha: 0, duration: 0.55, ease: 'power2.out' }, '-=0.38')
      .from('[data-offer-index]', { y: 18, autoAlpha: 0, duration: 0.62, ease: 'power3.out', stagger: 0.1 }, '-=0.2')
      .from('[data-offer-copy]', { y: 20, autoAlpha: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06 }, '-=0.28')
      .from('[data-offer-price]', { yPercent: 105, duration: 0.72, ease: 'power3.out', stagger: 0.1 }, '-=0.36')
      .from('[data-offer-detail]', { y: 14, autoAlpha: 0, duration: 0.62, ease: 'power2.out', stagger: 0.08 }, '-=0.34')
      .from('[data-offer-cta]', { y: 12, autoAlpha: 0, duration: 0.58, ease: 'power2.out', stagger: 0.08 }, '-=0.3')
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true })

  return (
    <section ref={sectionRef} className={styles.section} id="oferta" aria-labelledby="offer-title">
      <div className={`container ${styles.introduction}`}>
        <Eyebrow data-offer-heading>{offerChoiceCopy.eyebrow}</Eyebrow>
        <div className={styles.heading}>
          <h2 id="offer-title" data-offer-heading>{offerChoiceCopy.headline}</h2>
          <p data-offer-heading>{offerChoiceCopy.supportingCopy}</p>
        </div>
        <span className={styles.openingLine} data-offer-divider aria-hidden="true" />
      </div>

      <div className={styles.territories}>
        {offerChoiceCopy.options.map((option) => {
          const pathConfig = commerceConfig[option.id]

          return (
            <Fragment key={option.id}>
              <article
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

                  {pathConfig.price !== null ? <EditorialPrice value={pathConfig.price} /> : null}

                  <div className={styles.details} data-offer-detail>
                    <p>{option.detailLabel}</p>
                    <ul>
                      {option.details.map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                  </div>

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
              {option.id === 'consulting' ? (
                <div className={styles.decisionDivider} data-offer-decision aria-hidden="true">
                  <span>OU</span>
                </div>
              ) : null}
            </Fragment>
          )
        })}
      </div>
    </section>
  )
}
