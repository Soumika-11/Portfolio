'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { RoomScene } from './room-scene'
import { HeroContent } from './hero-content'
import { MousePointer2 } from 'lucide-react'
import { Particles } from './particles'
import { ScrollIndicator } from './scroll-indicator'
import { useScene } from './scene-context'

export function Hero() {
  const reduce = useReducedMotion()
  const { state } = useScene()
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
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20"
      style={{
        paddingLeft: 'max(0.75rem, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(0.75rem, env(safe-area-inset-right, 0px))',
      }}
    >
      {/* Ambient gradient backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 transition-all duration-700"
        style={{
          background: state.theme === 'day'
            ? 'radial-gradient(90% 70% at 75% 30%, rgba(220,160,255,0.35) 0%, transparent 60%), radial-gradient(80% 80% at 15% 80%, rgba(200,140,240,0.28) 0%, transparent 55%), linear-gradient(180deg, #fdf0ff 0%, #f5e8ff 100%)'
            : 'radial-gradient(90% 70% at 75% 30%, rgba(94,54,120,0.55) 0%, transparent 60%), radial-gradient(80% 80% at 15% 80%, rgba(60,38,90,0.5) 0%, transparent 55%), linear-gradient(180deg, #140b24 0%, #0d0718 100%)',
        }}
      />
      <div className="mx-auto grid w-full max-w-7xl 2xl:max-w-[90rem] 3xl:max-w-[110rem] grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-8 xl:gap-12 px-3 xs:px-4 sm:px-6 lg:px-8">
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
          <div style={{ transform: 'translateZ(0)' }} className="lg:scale-[1.04] xl:scale-[1.06] lg:origin-right">
            <RoomScene />
          </div>

          <motion.div
            className="absolute bottom-2 right-2 sm:-bottom-4 sm:right-4 flex items-center gap-1.5 rounded-full border border-primary/20 bg-black/60 sm:bg-black/40 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-medium tracking-wide text-primary/90 backdrop-blur-md lg:bottom-0 lg:right-0 shadow-lg pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <MousePointer2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
            <span>Tap to play</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="hidden md:flex">
        <ScrollIndicator />
      </div>
    </section>
  )
}
