import { EditorialImage } from '../../components/media/EditorialImage'
import { CTA } from '../../components/ui/CTA'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { mediaConfig } from '../../config/media'
import { pillars } from '../../content/pillars'
import styles from './MethodIntroduction.module.css'

export function MethodIntroduction() {
  return (
    <section className={styles.section} id="metodo" aria-labelledby="method-intro-title">
      <div className={styles.connector} aria-hidden="true"><i /><i /><i /></div>
      <div className={`container ${styles.grid}`}>
        <div className={styles.productStage} aria-label="Representação visual do Método Wick">
          <span className={styles.orbit} aria-hidden="true" />
          <article className={styles.folio}>
            <header><span>MR. WICK</span><span>SISTEMA 01—05</span></header>
            <div className={styles.folioBody}>
              <EditorialImage asset={{ ...mediaConfig.authority.navyDetail, alt: '' }} className={styles.detail} />
              <div className={styles.folioContent}>
                <p>Método Wick</p>
                <strong>Percepção<br />em construção.</strong>
                <ol>
                  {pillars.map((pillar) => <li key={pillar.number}><i>{pillar.number}</i><span>{pillar.title}</span></li>)}
                </ol>
              </div>
            </div>
          </article>
          <span className={`${styles.node} ${styles.nodeOne}`}>01</span>
          <span className={`${styles.node} ${styles.nodeTwo}`}>03</span>
          <span className={`${styles.node} ${styles.nodeThree}`}>05</span>
        </div>

        <div className={styles.copy}>
          <Eyebrow>O sistema</Eyebrow>
          <h2 id="method-intro-title">Método Wick</h2>
          <p>Um método sobre imagem, presença, posicionamento, influência e vendas para homens que entenderam que a forma como são percebidos influencia as oportunidades que recebem.</p>
          <ul>
            {pillars.map((pillar) => <li key={pillar.number}><span>{pillar.number}</span>{pillar.title}</li>)}
          </ul>
          <CTA href="#percepcao" variant="light">Entender a percepção</CTA>
        </div>
      </div>
    </section>
  )
}
