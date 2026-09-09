'use client'

import { motion } from 'framer-motion'
import { RoomScene } from './room-scene'
import { HeroContent } from './hero-content'
import { Particles } from './particles'
import { ScrollIndicator } from './scroll-indicator'
import { useScene } from './scene-context'

export function Hero() {
  const { state } = useScene()

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full flex-col justify-between items-center overflow-x-clip pt-20 pb-4 sm:pt-24 sm:pb-6 lg:pt-28 lg:pb-6"
      style={{
        paddingLeft: 'max(0.75rem, env(safe-area-inset-left, 0px))',
        paddingRight: 'max(0.75rem, env(safe-area-inset-right, 0px))',
      }}
    >
      {/* Ambient gradient backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 overflow-hidden pointer-events-none transition-all duration-700"
        style={{
          background: state.theme === 'day'
            ? 'radial-gradient(90% 70% at 75% 30%, rgba(220,160,255,0.35) 0%, transparent 60%), radial-gradient(80% 80% at 15% 80%, rgba(200,140,240,0.28) 0%, transparent 55%), linear-gradient(180deg, #fdf0ff 0%, #f5e8ff 100%)'
            : 'radial-gradient(90% 70% at 75% 30%, rgba(94,54,120,0.55) 0%, transparent 60%), radial-gradient(80% 80% at 15% 80%, rgba(60,38,90,0.5) 0%, transparent 55%), linear-gradient(180deg, #140b24 0%, #0d0718 100%)',
        }}
      />
      <div className="my-auto mx-auto grid w-full max-w-7xl 2xl:max-w-[90rem] 3xl:max-w-[110rem] grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 xl:grid-cols-[1fr_1.1fr] lg:gap-8 xl:gap-12 px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="order-2 lg:order-1 flex justify-center w-full">
          <HeroContent />
        </div>

        <motion.div
          className="relative order-1 mx-auto w-full max-w-[36rem] lg:order-2 lg:max-w-none"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ transform: 'translateZ(0)' }} className="lg:scale-[1.04] xl:scale-[1.06] lg:origin-right">
            <RoomScene />
          </div>
        </motion.div>
      </div>

      <div className="relative z-20 w-full flex justify-center pt-4 pb-2 sm:pt-6 sm:pb-3 shrink-0">
        <ScrollIndicator />
      </div>
    </section>
  )
}
