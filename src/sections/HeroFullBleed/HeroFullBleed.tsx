import { EditorialVideo } from '../../components/media/EditorialVideo'
import { CTA } from '../../components/ui/CTA'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { mediaConfig } from '../../config/media'
import { heroAxes } from '../../content/heroAxes'
import styles from './HeroFullBleed.module.css'

export function HeroFullBleed() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-title">
        <EditorialVideo asset={mediaConfig.hero} mode="fullscreen" critical className={styles.media} />

        <div className={styles.grade} aria-hidden="true" />
        <svg className={styles.graphics} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <filter id="full-bleed-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="3" seed="23" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <rect className={styles.grain} width="1600" height="900" filter="url(#full-bleed-grain)" />
          <g className={styles.arcs}>
            <circle cx="310" cy="650" r="430" />
            <circle cx="1220" cy="410" r="520" />
            <path d="M-90 670C260 450 535 390 870 420C1120 442 1335 390 1690 155" />
          </g>
          <g className={styles.connections}>
            <path d="M70 280H335L415 350H675L785 300H1110" />
            <path d="M165 700H390L475 610H750L850 555H1190" />
            <circle cx="70" cy="280" r="4" />
            <circle cx="415" cy="350" r="4" />
            <circle cx="785" cy="300" r="4" />
            <circle cx="390" cy="700" r="4" />
          </g>
          <g id="wick-cut" className={styles.wickCut} transform="translate(-170 120) scale(1.65)">
            <path d="M112 157L224 408L307 222" />
            <path d="M287 371L369 184L490 425" />
          </g>
        </svg>

        <div className={`container ${styles.inner}`}>
          <div className={styles.copy}>
            <Eyebrow className={styles.eyebrow}>Mr. Wick · Método Wick</Eyebrow>
            <h1 id="hero-title">Antes de você vender o que faz, sua imagem já comunicou quem você é.</h1>
            <p>
              <span>Você já tem uma imagem. A questão é:</span>
              <span>ela está comunicando o que você gostaria?</span>
            </p>
            <CTA href="#metodo" variant="light" className={styles.cta}>Quero conhecer o método</CTA>
          </div>
        </div>

        <div className={styles.pillars} aria-label="Quatro eixos do Método Wick">
          <div className="container">
            {heroAxes.map((axis) => (
              <span key={axis.number}><i>{axis.number}</i>{axis.title}</span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.systemBar} aria-label="Estrutura do Método Wick">
        <span>Mr. Wick</span>
        {heroAxes.map((axis) => <span key={axis.number}>{axis.title}</span>)}
        <span>Método Wick</span>
      </div>
    </>
  )
}
