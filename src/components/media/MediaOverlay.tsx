import type { CSSProperties, ReactNode } from 'react'
import styles from './MediaOverlay.module.css'

type MediaOverlayProps = {
  children?: ReactNode
  strength?: 'soft' | 'medium' | 'strong'
  className?: string
}

export function MediaOverlay({ children, strength = 'medium', className = '' }: MediaOverlayProps) {
  return <div className={`${styles.overlay} ${styles[strength]} ${className}`}>{children}</div>
}

export function MediaVignette({ opacity = 0.55 }: { opacity?: number }) {
  return <div className={styles.vignette} style={{ '--vignette-opacity': opacity } as CSSProperties} aria-hidden="true" />
}
