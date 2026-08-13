import type { HTMLAttributes, ReactNode } from 'react'
import styles from './Eyebrow.module.css'

type EyebrowProps = HTMLAttributes<HTMLParagraphElement> & { children: ReactNode }

export function Eyebrow({ children, className = '', ...props }: EyebrowProps) {
  return <p className={`${styles.eyebrow} ${className}`} {...props}>{children}</p>
}
