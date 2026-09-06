'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, PawPrint, Heart } from 'lucide-react'
import { useScene } from './scene-context'
import { LaptopCode } from './laptop-code'

type Box = { left: string; top: string; width: string; height: string }

/**
 * Hotspot boxes are expressed as percentages of the 3:2 hero artwork
 * (public/scene/room.png). They map onto the objects actually painted in the
 * uploaded scene so their glow/state overlays land exactly on top of them.
 */
const POS: Record<string, Box> = {
  // string lights draped over the top-right shelf/corner
  light1: { left: '80%', top: '3%', width: '20%', height: '16%' },
  // neon pink cat-face outline on the right wall
  light2: { left: '73%', top: '22%', width: '17%', height: '22%' },
  // neon "cat girl { coder }" script at the very top
  light3: { left: '34%', top: '1%', width: '28%', height: '17%' },
  // standing neon "FOCUS / CODE / CAFFEINE / CATNAPS" sign, bottom-left
  neon: { left: '0%', top: '60%', width: '15%', height: '33%' },
  // glowing cat lamp on the left window sill
  lamp: { left: '3%', top: '52%', width: '12%', height: '21%' },
  // pink "MEOW DEVELOPER" mug in the centre of the desk
  coffee: { left: '36%', top: '72%', width: '12%', height: '23%' },
  // open laptop, centre-right
  laptop: { left: '46%', top: '54%', width: '29%', height: '39%' },
  // the girl herself, centre of the frame
  girl: { left: '27%', top: '10%', width: '37%', height: '66%' },
  // fluffy white cat wearing headphones, far right
  cat: { left: '76%', top: '58%', width: '24%', height: '37%' },
}

/** Per-light metadata so each toggle reads correctly and blooms in its own colour. */
const LIGHTS: {
  id: 'light1' | 'light2' | 'light3'
  label: string
  color: string
  intensity: number
  flicker?: boolean
}[] = [
    { id: 'light1', label: 'string lights', color: 'rgba(255,196,120,0.75)', intensity: 0.9 },
    { id: 'light2', label: 'neon cat sign', color: 'rgba(255,108,182,0.85)', intensity: 0.95, flicker: true },
    { id: 'light3', label: 'cat girl neon', color: 'rgba(255,120,196,0.85)', intensity: 0.95, flicker: true },
  ]

function boxStyle(b: Box): React.CSSProperties {
  return { position: 'absolute', left: b.left, top: b.top, width: b.width, height: b.height }
}

/** Warm/neon bloom that sits over a baked light and fades when toggled off. */
function GlowBloom({
  on,
  color,
  box,
  intensity = 1,
  flicker = false,
}: {
  on: boolean
  color: string
  box: Box
  intensity?: number
  flicker?: boolean
}) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none transition-opacity duration-500"
        style={{
          ...boxStyle(box),
          opacity: on ? intensity : 0,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          mixBlendMode: 'screen',
          filter: 'blur(8px)',
          animation: on && flicker ? 'neonFlicker 6s infinite' : 'none',
        }}
      />
      {/* Local dimming that darkens the baked bulbs when off. */}
      <div
        aria-hidden
        className="pointer-events-none transition-opacity duration-500"
        style={{
          ...boxStyle(box),
          opacity: on ? 0 : 0.75,
          background: 'radial-gradient(circle, rgba(8,4,18,0.9) 0%, rgba(8,4,18,0.2) 75%, transparent 100%)',
          mixBlendMode: 'multiply',
        }}
      />
    </>
  )
}

function Tooltip({
  show,
  align = 'center',
  position = 'top',
  children,
}: {
  show: boolean
  align?: 'left' | 'center' | 'right'
  position?: 'top' | 'bottom'
  children: React.ReactNode
}) {
  const alignClass =
    align === 'left' ? 'left-0' : align === 'right' ? 'right-0' : 'left-1/2 -translate-x-1/2'
  const posClass = position === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2'

  return (
    <AnimatePresence>
      {show && (
        <motion.span
          key="tooltip"
          initial={{ opacity: 0, y: position === 'bottom' ? -4 : 4, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: position === 'bottom' ? -4 : 4, scale: 0.95 }}
          transition={{ duration: 0.18 }}
          className={`glass-panel pointer-events-none absolute ${posClass} ${alignClass} z-30 whitespace-nowrap rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-[11px] font-medium text-foreground shadow-lg`}
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

export function RoomScene() {
  const {
    state,
    lightsOffCount,
    toggleLight,
    toggleNeon,
    toggleLamp,
    wakeCat,
    activateGirl,
    toggleCoffee,
  } = useScene()

  const [hover, setHover] = useState<string | null>(null)
  const [coffeeBurst, setCoffeeBurst] = useState(0)
  const [lampBurst, setLampBurst] = useState(0)
  const [openLaptop, setOpenLaptop] = useState(false)

  // Close laptop dialog on Escape
  useEffect(() => {
    if (!openLaptop) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenLaptop(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openLaptop])

  const day = state.theme === 'day'
  const girlActive = state.girl !== 'idle'
  const catAwake = state.cat !== 'sleeping'
  const spilled = state.coffee === 'spilled'

  const imageFilter = day
    ? 'brightness(1.16) saturate(1.08) contrast(0.97)'
    : 'brightness(1) saturate(1.02)'

  return (
    <div className="relative aspect-[3/2] w-full select-none overflow-hidden rounded-2xl sm:rounded-[1.75rem] ring-1 ring-white/10 shadow-2xl">
      <Image
        src="/scene/room.png"
        alt="Soumika's cozy anime coding room at dusk: a cat-ear-headphone-wearing developer at her laptop, a pink MEOW DEVELOPER mug, a glowing cat lamp, a fluffy cat in matching headphones, and pink neon signs"
        fill
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 55vw"
        className="object-cover transition-[filter] duration-700"
        style={{ filter: imageFilter }}
      />

      {/* Day-mode warm wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: day ? 0.22 : 0,
          background: 'linear-gradient(180deg, rgba(255,178,122,0.35), rgba(255,143,171,0.15))',
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Global room darkening tied to how many lights are off */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: day ? 0 : lightsOffCount * 0.16,
          background: 'radial-gradient(120% 90% at 50% 45%, rgba(6,3,15,0.2) 0%, rgba(6,3,15,0.85) 100%)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Focus vignette while the girl is coding */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: girlActive ? 0.5 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'radial-gradient(42% 48% at 52% 66%, transparent 0%, rgba(6,3,15,0.72) 100%)',
        }}
      />

      {/* ---- light glow blooms ---- */}
      {LIGHTS.map((l) => (
        <GlowBloom
          key={l.id}
          on={state.lights[l.id]}
          box={POS[l.id]}
          color={l.color}
          intensity={l.intensity}
          flicker={l.flicker}
        />
      ))}

      {/* ---- neon sign bloom (FOCUS / CODE / CAFFEINE / CATNAPS) ---- */}
      <div
        aria-hidden
        className="pointer-events-none absolute transition-opacity duration-300"
        style={{
          ...boxStyle(POS.neon),
          opacity: state.neonSign ? (hover === 'neon' ? 1 : 0.7) : 0,
          background: 'radial-gradient(circle, rgba(255,108,182,0.85) 0%, transparent 70%)',
          mixBlendMode: 'screen',
          filter: 'blur(10px)',
          animation: state.neonSign ? 'neonFlicker 6s infinite' : 'none',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute transition-opacity duration-300"
        style={{
          ...boxStyle(POS.neon),
          opacity: state.neonSign ? 0 : 0.82,
          background: 'radial-gradient(circle, rgba(8,4,18,0.92) 0%, transparent 72%)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* ---- cat lamp bloom ---- */}
      <div
        aria-hidden
        className="pointer-events-none absolute transition-opacity duration-400"
        style={{
          ...boxStyle(POS.lamp),
          opacity: state.catLamp ? (hover === 'lamp' ? 1 : 0.8) : 0,
          background: 'radial-gradient(circle, rgba(255,224,170,0.8) 0%, transparent 68%)',
          mixBlendMode: 'screen',
          filter: 'blur(6px)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute transition-opacity duration-400"
        style={{
          ...boxStyle(POS.lamp),
          opacity: state.catLamp ? 0 : 0.7,
          background: 'radial-gradient(circle, rgba(8,4,18,0.85) 0%, transparent 70%)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* ---- laptop screen glow + code ---- */}
      <div
        aria-hidden
        className="pointer-events-none absolute transition-opacity duration-500"
        style={{
          left: '50%',
          top: '58%',
          width: '17%',
          height: '15%',
          opacity: girlActive || hover === 'laptop' || openLaptop ? 0.9 : 0.35,
          background: 'radial-gradient(circle, rgba(150,120,255,0.7) 0%, transparent 70%)',
          mixBlendMode: 'screen',
          filter: 'blur(7px)',
        }}
      />
      {state.girl === 'typing' && (
        <div
          aria-hidden
          className="pointer-events-none absolute overflow-hidden rounded-[3px]"
          style={{ left: '50.5%', top: '58.5%', width: '15%', height: '13%' }}
        >
          <LaptopCode active className="text-[0.32vw] leading-[1.25] opacity-90" speed={30} />
        </div>
      )}

      {/* ---- coffee steam ---- */}
      {!spilled && (
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{ left: '40%', top: '66%', width: '4%', height: '10%' }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute bottom-0 left-1/2 block h-8 w-1 -translate-x-1/2 rounded-full"
              style={{
                background: 'linear-gradient(to top, rgba(255,255,255,0.5), transparent)',
                animation: `steamRise ${2.4 + i * 0.5}s ease-in-out ${i * 0.4}s infinite`,
                filter: 'blur(2px)',
                opacity: hover === 'coffee' ? 0.9 : 0.5,
              }}
            />
          ))}
        </div>
      )}

      {/* ---- spilled coffee overlay ---- */}
      <AnimatePresence>
        {spilled && (
          <motion.div
            key="spill"
            aria-hidden
            className="pointer-events-none absolute"
            style={{ left: '30%', top: '85%', width: '26%', height: '9%' }}
            initial={{ opacity: 0, scaleX: 0.2 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div
              className="absolute inset-0 origin-left rounded-[50%]"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(60,32,20,0.92) 0%, rgba(40,20,12,0.7) 55%, transparent 78%)',
                filter: 'blur(1px)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= interactive hotspots ================= */}

      {/* Lights */}
      {LIGHTS.map((l) => (
        <button
          key={l.id}
          type="button"
          aria-label={`Toggle ${l.label} ${state.lights[l.id] ? 'off' : 'on'}`}
          aria-pressed={state.lights[l.id]}
          onClick={() => toggleLight(l.id)}
          onMouseEnter={() => setHover(l.id)}
          onMouseLeave={() => setHover((h) => (h === l.id ? null : h))}
          className="group absolute z-20 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary"
          style={boxStyle(POS[l.id])}
        >
          <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent transition group-hover:ring-white/25 group-focus-visible:ring-primary/60" />
        </button>
      ))}

      {/* Neon sign */}
      <button
        type="button"
        aria-label={`Toggle neon sign ${state.neonSign ? 'off' : 'on'}`}
        aria-pressed={state.neonSign}
        onClick={toggleNeon}
        onMouseEnter={() => setHover('neon')}
        onMouseLeave={() => setHover((h) => (h === 'neon' ? null : h))}
        className="group absolute z-20 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary"
        style={boxStyle(POS.neon)}
      >
        <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent transition group-hover:ring-primary/40" />
        <Tooltip show={hover === 'neon'} align="left">Stay positive, ship code</Tooltip>
      </button>

      {/* Cat lamp */}
      <button
        type="button"
        aria-label={`Toggle desk cat lamp ${state.catLamp ? 'off' : 'on'}`}
        aria-pressed={state.catLamp}
        onClick={() => {
          toggleLamp()
          setLampBurst((n) => n + 1)
        }}
        onMouseEnter={() => setHover('lamp')}
        onMouseLeave={() => setHover((h) => (h === 'lamp' ? null : h))}
        className="group absolute z-20 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary"
        style={boxStyle(POS.lamp)}
      >
        <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-transparent transition group-hover:ring-white/25" />
        {lampBurst > 0 && (
          <span className="pointer-events-none absolute inset-0">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 flex items-center justify-center text-primary"
                style={{
                  animation: 'pawTrail 0.9s ease-out forwards',
                  transform: `translate(${(i - 1) * 18}px, 0)`,
                }}
              >
                <PawPrint size={14} />
              </span>
            ))}
          </span>
        )}
      </button>

      {/* Coffee */}
      <button
        type="button"
        aria-label={spilled ? 'Spilled coffee mug' : 'Coffee mug, fuel for the next deploy'}
        onClick={() => {
          if (spilled) return
          toggleCoffee()
          setCoffeeBurst((n) => n + 1)
        }}
        onMouseEnter={() => setHover('coffee')}
        onMouseLeave={() => setHover((h) => (h === 'coffee' ? null : h))}
        className="group absolute z-20 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary"
        style={boxStyle(POS.coffee)}
      >
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent transition group-hover:ring-primary/30"
          animate={coffeeBurst > 0 ? { rotate: [0, -6, 6, -3, 0] } : {}}
          transition={{ duration: 0.5 }}
        />
        <Tooltip show={hover === 'coffee' && !spilled}>Fuel for the next deploy</Tooltip>
        {coffeeBurst > 0 && !spilled && (
          <span key={`burst-${coffeeBurst}`} className="pointer-events-none absolute inset-x-0 top-0">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute left-1/2 text-primary"
                style={{
                  ['--p-drift' as string]: `${(i - 1) * 12}px`,
                  animation: `floatUp 1.1s ease-out ${i * 0.12}s forwards`,
                }}
              >
                <Heart size={14} className="fill-primary" />
              </span>
            ))}
          </span>
        )}
      </button>

      {/* Laptop */}
      <button
        type="button"
        aria-label="Open laptop code panel"
        onClick={() => setOpenLaptop(true)}
        onMouseEnter={() => setHover('laptop')}
        onMouseLeave={() => setHover((h) => (h === 'laptop' ? null : h))}
        className="group absolute z-20 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary"
        style={boxStyle(POS.laptop)}
      >
        <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent transition group-hover:ring-[#b48cff]/40" />
        <Tooltip show={hover === 'laptop' && !openLaptop}>Peek at the code {'</>'}</Tooltip>
      </button>

      {/* Girl */}
      <button
        type="button"
        aria-label="Ask Soumika to start coding"
        onClick={activateGirl}
        onMouseEnter={() => setHover('girl')}
        onMouseLeave={() => setHover((h) => (h === 'girl' ? null : h))}
        className="group absolute z-10 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary"
        style={boxStyle(POS.girl)}
      >
        <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-primary/25" />
        <Tooltip show={hover === 'girl'} position="bottom">
          {state.girl === 'typing' ? 'Deploying magic…' : 'Tap: start coding'}
        </Tooltip>
      </button>

      {/* Cat */}
      <button
        type="button"
        aria-label="Wake up the cat"
        onClick={wakeCat}
        onMouseEnter={() => setHover('cat')}
        onMouseLeave={() => setHover((h) => (h === 'cat' ? null : h))}
        className="group absolute z-20 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary"
        style={boxStyle(POS.cat)}
      >
        <motion.span
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-white/25"
          animate={
            catAwake && state.cat !== 'awake'
              ? { y: [0, -3, 0], rotate: [0, 2, -1, 0] }
              : {}
          }
          transition={{ duration: 0.9, repeat: state.cat === 'walking' ? Infinity : 0 }}
        />
        {/* Zzz while sleeping / hovering */}
        {(state.cat === 'sleeping' && hover === 'cat') && (
          <span className="pointer-events-none absolute right-2 top-0 text-sm text-white/80" style={{ animation: 'zzz 1.6s ease-out infinite' }}>
            z
          </span>
        )}
      </button>

      {/* paw trail from cat toward mug while walking */}
      <AnimatePresence>
        {state.cat === 'walking' && (
          <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="absolute flex items-center justify-center text-primary"
                style={{
                  left: `${78 - i * 9}%`,
                  top: `${84 - i * 1.5}%`,
                  animation: `pawTrail 1.2s ease-out ${i * 0.22}s forwards`,
                }}
              >
                <PawPrint size={14} />
              </span>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Cat speech bubble after spill */}
      <AnimatePresence>
        {state.cat === 'spilledCoffee' && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-panel absolute z-30 rounded-2xl px-3 py-1.5 text-sm font-semibold text-foreground"
            style={{ left: '62%', top: '64%' }}
          >
            Oops.
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- laptop expand overlay ---- */}
      <AnimatePresence>
        {openLaptop && (
          <motion.div
            className="absolute inset-0 z-40 flex items-center justify-center bg-background/75 p-3 sm:p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenLaptop(false)}
          >
            <motion.div
              role="dialog"
              aria-label="Developer code snippet"
              aria-modal="true"
              className="glass-panel relative w-[calc(100%-1rem)] max-w-sm rounded-2xl p-4 sm:p-5 max-h-[90%] flex flex-col shadow-2xl"
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center gap-1.5 shrink-0">
                <span className="h-3 w-3 rounded-full bg-[#ff6b6b]" />
                <span className="h-3 w-3 rounded-full bg-[#ffb27a]" />
                <span className="h-3 w-3 rounded-full bg-[#8ce0c0]" />
                <span className="ml-2 text-xs text-muted-foreground">developer.ts</span>
                <button
                  type="button"
                  aria-label="Close code panel"
                  onClick={() => setOpenLaptop(false)}
                  className="ml-auto rounded-lg p-1.5 text-muted-foreground transition hover:bg-white/10 hover:text-foreground active:scale-95 touch-manipulation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="overflow-y-auto overscroll-contain">
                <LaptopCode active className="text-xs sm:text-sm" speed={26} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
