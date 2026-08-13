import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

if (import.meta.env.DEV && typeof window !== 'undefined') {
  ;(window as Window & { __wickMotionAudit?: () => number }).__wickMotionAudit = () => ScrollTrigger.getAll().length
  const reportTriggerCount = () => {
    document.documentElement.dataset.scrollTriggerCount = String(ScrollTrigger.getAll().length)
  }
  ScrollTrigger.addEventListener('refresh', reportTriggerCount)
  window.setTimeout(reportTriggerCount, 500)
}

export { gsap, ScrollTrigger, useGSAP }
