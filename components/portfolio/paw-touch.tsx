'use client'

import { useEffect, useRef } from 'react'

// Same paw as the desktop cursor in globals.css
const PAW_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#fbcfe8" stroke="#ec4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g transform="scale(-1,1) translate(-24,0)"><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/></g></svg>'

const STEP = 64 // px of finger travel between prints
const GAIT = 10 // px each print sits left/right of the finger's path

/** Touch devices have no cursor, so leave paw prints where the finger taps and drags. */
export function PawTouch() {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let last: { x: number; y: number } | null = null
    let side = 1

    const stamp = (x: number, y: number, angle: number) => {
      const paw = document.createElement('div')
      paw.innerHTML = PAW_SVG
      paw.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:32px;height:32px;margin:-16px 0 0 -16px;will-change:transform,opacity;filter:drop-shadow(0 0 6px rgba(236,72,153,0.55));`
      layer.appendChild(paw)
      const rotate = `rotate(${angle}deg)`
      paw
        .animate(
          [
            { opacity: 0, transform: `${rotate} scale(0.5)` },
            { opacity: 1, transform: `${rotate} scale(1.15)`, offset: 0.15 },
            { opacity: 1, transform: `${rotate} scale(1)`, offset: 0.45 },
            { opacity: 0, transform: `${rotate} scale(0.9)` },
          ],
          { duration: 900, easing: 'ease-out' },
        )
        .finished.finally(() => paw.remove())
    }

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      last = { x: t.clientX, y: t.clientY }
      stamp(t.clientX, t.clientY, 0)
    }

    const onMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t || !last) return
      const dx = t.clientX - last.x
      const dy = t.clientY - last.y
      const dist = Math.hypot(dx, dy)
      if (dist < STEP) return
      // Alternate left/right of the path so the prints read as footsteps
      side = -side
      const nx = (-dy / dist) * GAIT * side
      const ny = (dx / dist) * GAIT * side
      stamp(t.clientX + nx, t.clientY + ny, (Math.atan2(dy, dx) * 180) / Math.PI + 90)
      last = { x: t.clientX, y: t.clientY }
    }

    const onEnd = () => {
      last = null
    }

    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    window.addEventListener('touchcancel', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
      window.removeEventListener('touchcancel', onEnd)
    }
  }, [])

  return (
    <div
      ref={layerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
    />
  )
}
