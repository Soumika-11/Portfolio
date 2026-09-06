'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { RoomScene } from './room-scene'
import { HeroContent } from './hero-content'
import { MousePointer2 } from 'lucide-react'
import { Particles } from './particles'
import { ScrollIndicator } from './scroll-indicator'

export function Hero() {
  const reduce = useReducedMotion()
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const raf = useRef(0)

  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2
        const y = (e.clientY / window.innerHeight - 0.5) * 2
        setOffset({ x, y })
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('pointermove', onMove)
    }
  }, [reduce])

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden pt-24 pb-16 lg:pt-20"
    >
      {/* Ambient gradient backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(90% 70% at 75% 30%, rgba(94,54,120,0.55) 0%, transparent 60%), radial-gradient(80% 80% at 15% 80%, rgba(60,38,90,0.5) 0%, transparent 55%), linear-gradient(180deg, #140b24 0%, #0d0718 100%)',
        }}
      />
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-6">
        <div
          className="order-2 lg:order-1"
          style={{ transform: `translate3d(${offset.x * -6}px, ${offset.y * -6}px, 0)` }}
        >
          <HeroContent />
        </div>

        <motion.div
          className="relative order-1 mx-auto w-full max-w-[36rem] lg:order-2 lg:max-w-none"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transform: `translate3d(${offset.x * 14}px, ${offset.y * 12}px, 0)` }}
        >
          <div style={{ transform: 'translateZ(0)' }} className="lg:scale-[1.06] lg:origin-right">
            <RoomScene />
          </div>

          <motion.div
            className="absolute -bottom-4 right-4 flex items-center gap-1.5 rounded-full border border-primary/20 bg-black/40 px-3 py-1.5 text-xs font-medium tracking-wide text-primary/80 backdrop-blur-md lg:bottom-0 lg:right-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <MousePointer2 className="h-3.5 w-3.5" />
            <span>Tap to play</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
