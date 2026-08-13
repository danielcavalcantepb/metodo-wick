import type { CSSProperties, ImgHTMLAttributes } from 'react'
import type { MediaAsset } from '../../config/media'
import styles from './EditorialMedia.module.css'

type EditorialImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height' | 'alt'> & {
  asset: MediaAsset
  critical?: boolean
  mode?: 'fullscreen' | 'editorial'
}

export function EditorialImage({ asset, critical = false, mode = 'editorial', className = '', ...props }: EditorialImageProps) {
  return (
    <div
      className={`${styles.frame} ${styles[mode]} ${className}`}
      style={{
        '--media-ratio': `${asset.width} / ${asset.height}`,
        '--media-position': asset.objectPosition || 'center center',
      } as CSSProperties}
    >
      <picture>
        {asset.mobileSrc && <source media="(max-width: 48rem)" srcSet={asset.mobileSrc} />}
        <img
          className={styles.media}
          src={asset.src}
          width={asset.width}
          height={asset.height}
          alt={asset.alt || ''}
          loading={critical ? 'eager' : 'lazy'}
          fetchPriority={critical ? 'high' : 'auto'}
          decoding="async"
          {...props}
        />
      </picture>
    </div>
  )
}
