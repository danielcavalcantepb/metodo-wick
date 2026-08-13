import type { CSSProperties, VideoHTMLAttributes } from 'react'
import { useIntersection } from '../../hooks/useIntersection'
import type { MediaAsset } from '../../config/media'
import styles from './EditorialMedia.module.css'

type EditorialVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src' | 'poster'> & {
  asset: MediaAsset
  mode?: 'fullscreen' | 'editorial'
  critical?: boolean
  className?: string
}

export function EditorialVideo({ asset, mode = 'editorial', critical = false, className = '', ...props }: EditorialVideoProps) {
  const { ref, isNearViewport } = useIntersection<HTMLDivElement>()
  const shouldLoad = critical || isNearViewport
  const ratio = `${asset.width} / ${asset.height}`
  const mediaStyle = {
    '--media-ratio': ratio,
    '--media-position': asset.objectPosition || 'center center',
  } as CSSProperties
  const poster = asset.mobilePoster && typeof window !== 'undefined' && window.matchMedia('(max-width: 48rem)').matches
    ? asset.mobilePoster
    : asset.poster

  return (
    <div ref={ref} className={`${styles.frame} ${styles[mode]} ${className}`} style={mediaStyle}>
      <video
        className={styles.media}
        autoPlay
        loop
        muted
        playsInline
        preload={critical ? 'auto' : 'none'}
        poster={poster}
        aria-hidden="true"
        tabIndex={-1}
        {...props}
      >
        {shouldLoad && asset.mobileSrc && <source media="(max-width: 48rem)" src={asset.mobileSrc} type="video/mp4" />}
        {shouldLoad && <source src={asset.src} type="video/mp4" />}
      </video>
    </div>
  )
}
