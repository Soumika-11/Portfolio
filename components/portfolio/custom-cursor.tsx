'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [interactive, setInteractive] = useState(false)
  const [down, setDown] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.body.classList.add('no-native-cursor')

    let raf = 0
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { ...target }

    const move = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      const el = e.target as HTMLElement | null
      setInteractive(Boolean(el?.closest('button, a, [role="button"], input, textarea')))
    }
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.2
      pos.y += (target.y - pos.y) * 0.2
      if (dot.current) dot.current.style.transform = `translate(${target.x}px, ${target.y}px)`
      if (ring.current) ring.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      raf = requestAnimationFrame(loop)
    }
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.body.classList.remove('no-native-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-1 -mt-1 h-2 w-2 rounded-full bg-primary"
        style={{ boxShadow: '0 0 10px rgba(255,108,182,0.9)' }}
      />
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border border-primary/60 transition-[width,height,opacity] duration-200"
        style={{
          width: interactive ? 44 : 28,
          height: interactive ? 44 : 28,
          marginLeft: interactive ? -22 : -14,
          marginTop: interactive ? -22 : -14,
          opacity: down ? 0.5 : 1,
          background: interactive ? 'rgba(255,108,182,0.12)' : 'transparent',
        }}
      >
        <span className="text-[10px] leading-none" style={{ opacity: interactive ? 1 : 0 }}>
          🐾
        </span>
      </div>
    </>
  )
}
