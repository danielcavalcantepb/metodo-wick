export const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

export const isFullMotionPreview = () =>
  typeof window !== 'undefined'
  && import.meta.env.DEV
  && new URLSearchParams(window.location.search).get('motion') === 'full'

if (typeof document !== 'undefined') {
  document.documentElement.toggleAttribute('data-motion-full', isFullMotionPreview())
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined'
  && !isFullMotionPreview()
  && window.matchMedia(reducedMotionQuery).matches
