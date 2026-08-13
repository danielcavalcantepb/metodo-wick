import { useSyncExternalStore } from 'react'
import { prefersReducedMotion, reducedMotionQuery } from './reducedMotion'

const subscribe = (callback: () => void) => {
  const query = window.matchMedia(reducedMotionQuery)
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}

const getSnapshot = prefersReducedMotion
const getServerSnapshot = () => false

export const useReducedMotion = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
