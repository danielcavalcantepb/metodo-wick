import type { gsap as GsapType } from 'gsap'

type Timeline = ReturnType<typeof GsapType.timeline>

export function textReveal(timeline: Timeline, target: gsap.TweenTarget, position?: gsap.Position) {
  return timeline.from(target, {
    yPercent: 108,
    autoAlpha: 0,
    duration: 0.82,
    stagger: 0.085,
    ease: 'power3.out',
  }, position)
}

export function fadeRise(timeline: Timeline, target: gsap.TweenTarget, position?: gsap.Position) {
  return timeline.from(target, {
    y: 14,
    autoAlpha: 0,
    duration: 0.72,
    stagger: 0.08,
    ease: 'power3.out',
  }, position)
}

export function lineReveal(
  timeline: Timeline,
  target: gsap.TweenTarget,
  position?: gsap.Position,
  vertical = false,
) {
  return timeline.from(target, {
    [vertical ? 'scaleY' : 'scaleX']: 0,
    transformOrigin: vertical ? 'top' : 'left',
    duration: 1,
    ease: 'power3.out',
  }, position)
}

export function nodeReveal(timeline: Timeline, target: gsap.TweenTarget, position?: gsap.Position) {
  return timeline.from(target, {
    scale: 0,
    autoAlpha: 0,
    duration: 0.42,
    stagger: 0.09,
    transformOrigin: 'center',
    ease: 'back.out(1.45)',
  }, position)
}

export function mediaReveal(timeline: Timeline, target: gsap.TweenTarget, position?: gsap.Position) {
  return timeline.from(target, {
    clipPath: 'inset(7% 5% 7% 5%)',
    y: 24,
    duration: 1.05,
    ease: 'power3.out',
  }, position)
}

export function panelReveal(timeline: Timeline, target: gsap.TweenTarget, position?: gsap.Position) {
  return timeline.from(target, {
    clipPath: 'inset(8% 0 0 0 round 0.8rem)',
    y: 34,
    duration: 1.05,
    ease: 'power3.out',
  }, position)
}
