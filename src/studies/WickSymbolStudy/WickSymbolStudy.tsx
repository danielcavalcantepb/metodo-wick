import styles from './WickSymbolStudy.module.css'

const studies = [
  { key: 'A', name: 'Wick Cut', src: '/media/method-wick/studies/wick-cut.svg' },
  { key: 'B', name: 'Wick Frame', src: '/media/method-wick/studies/wick-frame.svg' },
  { key: 'C', name: 'Wick Signature', src: '/media/method-wick/studies/wick-signature.svg' },
] as const

export function WickSymbolStudy() {
  return (
    <main className={styles.study}>
      <section className={styles.grid} aria-label="Três direções para a assinatura gráfica do Método Wick">
        {studies.map((study) => (
          <article className={styles.proposal} key={study.key}>
            <div className={styles.label}>
              <span>{study.key} —</span>
              <h1>{study.name}</h1>
            </div>

            <img className={styles.cropped} src={study.src} alt="" aria-hidden="true" />

            <div className={styles.symbolField}>
              <img src={study.src} alt={`Direção ${study.name} para o símbolo do Método Wick`} />
            </div>

            <div className={styles.applications}>
              <div className={styles.reduction}>
                <img src={study.src} alt="" aria-hidden="true" />
              </div>
              <div className={styles.lockup}>
                <img src={study.src} alt="" aria-hidden="true" />
                <span>Método Wick</span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
