import { useRef, useState } from 'react'
import { siteConfig } from '../../config/site'
import { ScrollTrigger, useGSAP } from '../../motion/gsap'
import { CTA } from '../ui/CTA'
import styles from './Header.module.css'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const hero = document.querySelector<HTMLElement>('section[aria-labelledby="hero-title"]')
    if (!hero) return
    const trigger = ScrollTrigger.create({
      trigger: hero,
      start: 'top top-=24',
      end: 'bottom top+=80',
      onEnter: () => setIsScrolled(true),
      onLeaveBack: () => setIsScrolled(false),
      onRefresh: (self) => setIsScrolled(self.progress > 0),
    })
    return () => trigger.kill()
  }, { scope: headerRef })

  return (
    <header ref={headerRef} className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
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
