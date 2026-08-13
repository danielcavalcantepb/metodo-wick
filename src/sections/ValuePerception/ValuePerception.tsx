import { Eyebrow } from '../../components/ui/Eyebrow'
import { perceivedValue, realValue } from '../../content/narrative'
import styles from './ValuePerception.module.css'

export function ValuePerception() {
  return (
    <section className={styles.section} id="percepcao" aria-labelledby="value-title">
      <div className={styles.panel}>
        <div className={`container ${styles.inner}`}>
          <header className={styles.header}>
            <Eyebrow>Valor e leitura</Eyebrow>
            <div>
              <p>Método Wick · percepção</p>
              <h2 id="value-title">Valor real <i>×</i><br />valor percebido.</h2>
            </div>
          </header>

          <div className={styles.comparison}>
            <article className={styles.side}>
              <p className={styles.label}><span>01</span> Valor real</p>
              <ul>{realValue.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>

            <div className={styles.axis}>
              <span aria-hidden="true" />
              <p>Percepção</p>
              <small>O eixo entre o que existe e o que é compreendido.</small>
            </div>

            <article className={styles.side}>
              <p className={styles.label}><span>02</span> Valor percebido</p>
              <ul>{perceivedValue.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>

          <footer className={styles.conclusion}>
            <p>Não se trata de parecer aquilo que você não é.</p>
            <p>Trata-se de fazer sua imagem comunicar, com coerência, o valor que já existe em você.</p>
          </footer>
        </div>
      </div>
    </section>
  )
}
