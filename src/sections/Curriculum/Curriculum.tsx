import { useRef, useState } from 'react'
import { Eyebrow } from '../../components/ui/Eyebrow'
import { modules } from '../../content/modules'
import styles from './Curriculum.module.css'

export function Curriculum() {
  const [activeIndex, setActiveIndex] = useState(0)
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeModule = modules[activeIndex]

  const selectAndFocus = (index: number) => {
    const nextIndex = (index + modules.length) % modules.length
    setActiveIndex(nextIndex)
    buttonRefs.current[nextIndex]?.focus()
  }

  return (
    <section className={styles.section} id="conteudo" aria-labelledby="curriculum-title">
      <div className={`container ${styles.heading}`}>
        <Eyebrow>08 — Conteúdo</Eyebrow>
        <h2 id="curriculum-title">Um índice para construir presença.</h2>
      </div>

      <div className={`container ${styles.index}`}>
        <div className={styles.active} aria-live="polite">
          <span>Módulo {activeModule.number}</span>
          <p>{activeModule.title}</p>
        </div>

        <div className={styles.list} role="listbox" aria-label="Módulos do Método Wick">
          {modules.map((module, index) => (
            <button
              key={module.number}
              type="button"
              role="option"
              aria-selected={activeIndex === index}
              tabIndex={activeIndex === index ? 0 : -1}
              ref={(element) => { buttonRefs.current[index] = element }}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                  event.preventDefault(); selectAndFocus(index + 1)
                }
                if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                  event.preventDefault(); selectAndFocus(index - 1)
                }
                if (event.key === 'Home') { event.preventDefault(); selectAndFocus(0) }
                if (event.key === 'End') { event.preventDefault(); selectAndFocus(modules.length - 1) }
              }}
            >
              <span>{module.number}</span>
              <span>{module.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
