import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { getPrimaryCtaHref } from '../../config/commerce'
import styles from './CTA.module.css'

type CTAVariant = 'primary' | 'light' | 'outline'

type CTAProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  children: ReactNode
  href?: string
  variant?: CTAVariant
  disabled?: boolean
}

export function CTA({ children, href, variant = 'primary', disabled = false, className = '', ...props }: CTAProps) {
  const resolvedHref = href || getPrimaryCtaHref()
  const isExternal = /^https?:\/\//.test(resolvedHref)
  const content = <span>{children}</span>

  if (disabled) {
    return <span className={`${styles.cta} ${styles[variant]} ${styles.disabled} ${className}`} aria-disabled="true">{content}</span>
  }

  return (
    <a
      className={`${styles.cta} ${styles[variant]} ${className}`}
      href={resolvedHref}
      {...(isExternal ? { rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {content}
    </a>
  )
}
