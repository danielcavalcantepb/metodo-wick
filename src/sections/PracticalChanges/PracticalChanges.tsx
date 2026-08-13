import { Eyebrow } from '../../components/ui/Eyebrow'
import { practicalChanges, practicalChangesClosing } from '../../content/practicalChanges'
import styles from './PracticalChanges.module.css'

export function PracticalChanges() {
  return (
    <section className={styles.section} id="o-que-muda" aria-labelledby="practical-changes-title">
      <div className={`container ${styles.heading}`}>
        <Eyebrow>O que muda na prática</Eyebrow>
        <h2 id="practical-changes-title">O que muda quando você começa a controlar conscientemente essa percepção?</h2>
      </div>

      <ol className={`container ${styles.territories}`}>
        {practicalChanges.map((territory) => (
          <li key={territory.number}>
            <span className={styles.number}>{territory.number}</span>
            <h3>{territory.title}</h3>
            <p>{territory.description}</p>
          </li>
        ))}
      </ol>

      <div className={`container ${styles.closing}`}>
        {practicalChangesClosing.map((line) => <p key={line}>{line}</p>)}
      </div>
    </section>
  )
}
