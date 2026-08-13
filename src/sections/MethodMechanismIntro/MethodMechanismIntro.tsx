import { Eyebrow } from '../../components/ui/Eyebrow'
import { pillars } from '../../content/pillars'
import styles from './MethodMechanismIntro.module.css'

export function MethodMechanismIntro() {
  return (
    <section className={styles.section} id="pilares" aria-labelledby="mechanism-title">
      <div className={styles.medallion} aria-hidden="true"><span>MW</span></div>
      <div className={`container ${styles.inner}`}>
        <header>
          <Eyebrow>O mecanismo</Eyebrow>
          <h2 id="mechanism-title">Como o Método Wick funciona.</h2>
          <p>Uma progressão construída para alinhar o que você é, o que comunica e o que as pessoas compreendem.</p>
        </header>

        <ol className={styles.rail} aria-label="Progressão do Método Wick">
          {pillars.map((pillar) => (
            <li key={pillar.number}>
              <span>{pillar.number}</span>
              <strong>{pillar.title}</strong>
              <small>{pillar.lead}</small>
              <p>{pillar.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
