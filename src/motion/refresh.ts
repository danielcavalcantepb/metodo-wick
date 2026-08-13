import { ScrollTrigger } from './gsap'

let refreshFrame: number | null = null

export function requestScrollRefresh() {
  if (refreshFrame !== null) cancelAnimationFrame(refreshFrame)
  refreshFrame = requestAnimationFrame(() => {
    ScrollTrigger.refresh(true)
    refreshFrame = null
  })
}
