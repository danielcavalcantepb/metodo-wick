import { useEffect, useState } from 'react'
import { siteConfig } from '../../config/site'
import { CTA } from '../ui/CTA'
import styles from './Header.module.css'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.wordmark} href="#top" aria-label="Mr. Wick — início">
          <span>MR.</span> WICK
        </a>
        <nav className={styles.nav} aria-label="Navegação principal">
          {siteConfig.navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <CTA href="#metodo" className={styles.cta} variant="outline">Quero conhecer</CTA>
      </div>
    </header>
  )
}
