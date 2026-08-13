import { EditorialVideo } from '../../components/media/EditorialVideo'
import { CTA } from '../../components/ui/CTA'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { mediaConfig } from '../../config/media'
import { heroAxes } from '../../content/heroAxes'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-title">
        <svg
          className={styles.backdrop}
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <filter id="hero-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" seed="17" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>

          <rect className={styles.grain} width="1600" height="900" filter="url(#hero-grain)" />

          <g className={styles.arcs}>
            <circle cx="60" cy="610" r="405" />
            <circle cx="1085" cy="445" r="505" />
            <path d="M-120 690C280 420 565 378 990 425C1215 450 1400 400 1690 205" />
            <path d="M225 900C390 680 560 555 790 505C1025 455 1270 520 1655 755" />
          </g>

          <g className={styles.connections}>
            <path d="M74 270H315L405 360H650L745 305H1040" />
            <path d="M165 694H375L460 610H720L808 548H1185" />
            <path d="M505 130V232L570 298" />
            <circle cx="74" cy="270" r="4" />
            <circle cx="405" cy="360" r="4" />
            <circle cx="745" cy="305" r="4" />
            <circle cx="375" cy="694" r="4" />
            <circle cx="808" cy="548" r="4" />
          </g>

          <g className={styles.abstractMark}>
            <path d="M-85 825L92 230L274 742L455 230L642 825" />
            <path d="M35 825L210 365L380 825" />
          </g>
        </svg>

        <div className={`container ${styles.frame}`}>
          <div className={styles.copy}>
            <Eyebrow className={styles.eyebrow}>Mr. Wick · Método Wick</Eyebrow>
            <h1 id="hero-title">Antes de você vender o que faz, sua imagem já comunicou quem você é.</h1>
            <p>Antes de você vender o que faz, sua imagem já comunicou quem você é.</p>
            <CTA href="#metodo" variant="light" className={styles.cta}>Quero conhecer o método</CTA>
          </div>

          <div className={styles.visual}>
            <span className={styles.halo} aria-hidden="true" />
            <EditorialVideo asset={mediaConfig.hero} mode="editorial" critical className={styles.media} />
            <div className={styles.seals} aria-label="Eixos do Método Wick">
              {heroAxes.map((axis) => (
                <span key={axis.number}><i>{axis.number}</i>{axis.title}</span>
              ))}
            </div>
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
