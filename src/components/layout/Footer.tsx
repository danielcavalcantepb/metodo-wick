import { siteConfig } from '../../config/site'
import styles from './Footer.module.css'

const configuredFooterLinks: Array<{ label: string; href: string | null }> = [
  { label: 'Instagram', href: siteConfig.footer.instagramUrl },
  { label: 'Privacidade', href: siteConfig.footer.privacyUrl },
  { label: 'Termos', href: siteConfig.footer.termsUrl },
  { label: 'Contato', href: siteConfig.footer.contactUrl },
]

const footerLinks = configuredFooterLinks.filter(
  (item): item is { label: string; href: string } => Boolean(item.href),
)

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>© {new Date().getFullYear()} Mr. Wick</p>
        {footerLinks.length > 0 && (
          <nav aria-label="Links institucionais">
            {footerLinks.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
          </nav>
        )}
      </div>
    </footer>
  )
}
