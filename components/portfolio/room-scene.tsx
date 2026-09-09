'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, PawPrint, Heart, Sparkles, GripVertical } from 'lucide-react'
import {
  playRandomCatSound,
  playGirlGreetingSound,
  getRandomWelcomingLine,
  prepareInteractiveAudio,
  speakGreeting,
} from '@/lib/sounds'
import { useScene } from './scene-context'
import { LaptopCode } from './laptop-code'

const TOTAL_SECRETS = 7

const INTERACTIVE_HINTS = [
  { id: 'cat', hint: '🐾 Hint: Try tapping the sleeping fluffy cat!' },
  { id: 'laptop', hint: '💻 Hint: Take a peek at the open laptop screen!' },
  { id: 'coffee', hint: '☕ Hint: Tap the pink coffee mug on the desk!' },
  { id: 'lamp', hint: '💡 Hint: Click the glowing cat lamp on the window sill!' },
  { id: 'neon', hint: '✨ Hint: Toggle the neon sign on the left wall!' },
  { id: 'girl', hint: '👩‍💻 Hint: Tap Soumika to start coding!' },
  { id: 'lights', hint: '🌟 Hint: Tap the fairy lights draped on the wall!' },
]

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
    <div
      aria-hidden
      className="pointer-events-none transition-all duration-400 rounded-full"
      style={{
        ...boxStyle(box),
        opacity: on ? intensity : 0,
        background: `radial-gradient(ellipse at center, ${color} 0%, rgba(255,255,255,0.3) 20%, transparent 72%)`,
        mixBlendMode: 'screen',
        filter: 'blur(8px)',
        animation: on && flicker ? 'neonFlicker 6s infinite' : 'none',
      }}
    />
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
    registerInteraction,
    wakeUpRoom,
  } = useScene()

  const [hover, setHover] = useState<string | null>(null)
  const [coffeeBurst, setCoffeeBurst] = useState(0)
  const [lampBurst, setLampBurst] = useState(0)
  const [openLaptop, setOpenLaptop] = useState(false)
  const [hint, setHint] = useState<string | null>(null)
  const [catSpeech, setCatSpeech] = useState<string | null>(null)
  const [catReactionBurst, setCatReactionBurst] = useState(0)
  const [girlSpeech, setGirlSpeech] = useState<string | null>(null)
  const hintTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const catSpeechTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const girlSpeechTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastCatSound = useRef<string | undefined>(undefined)
  const lastGirlSpeech = useRef<string | undefined>(undefined)
  const roomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load speech voices immediately, then unlock Web Audio on the earliest touch event.
    prepareInteractiveAudio()
    const unlockAudio = () => prepareInteractiveAudio()
    window.addEventListener('pointerdown', unlockAudio, { capture: true, once: true })
    return () => window.removeEventListener('pointerdown', unlockAudio, { capture: true })
  }, [])

  const showCatSpeech = (text: string, duration = 3000) => {
    setCatSpeech(text)
    if (catSpeechTimer.current) clearTimeout(catSpeechTimer.current)
    catSpeechTimer.current = setTimeout(() => setCatSpeech(null), duration)
  }

  const showGirlSpeech = (text: string, duration = 4500) => {
    setGirlSpeech(text)
    if (girlSpeechTimer.current) clearTimeout(girlSpeechTimer.current)
    girlSpeechTimer.current = setTimeout(() => setGirlSpeech(null), duration)
  }

  // Close laptop dialog on Escape
  useEffect(() => {
    if (!openLaptop) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenLaptop(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openLaptop])

  const giveHint = () => {
    const nextUnfound = INTERACTIVE_HINTS.find((h) => !state.discoveredItems.includes(h.id))
    if (nextUnfound) {
      setHint(nextUnfound.hint)
      if (hintTimeout.current) clearTimeout(hintTimeout.current)
      hintTimeout.current = setTimeout(() => setHint(null), 5500)
    } else {
      setHint('🎉 You discovered all 7 secrets!')
      if (hintTimeout.current) clearTimeout(hintTimeout.current)
      hintTimeout.current = setTimeout(() => setHint(null), 3500)
    }
  }

  // Auto hint if user is idle for 6 seconds without finding the next secret
  useEffect(() => {
    if (!state.hasInteracted || state.discoveredItems.length >= TOTAL_SECRETS) return

    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => {
      giveHint()
    }, 6000)

    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [state.hasInteracted, state.discoveredItems.length])

  const handleRoomClick = () => {
    if (!state.hasInteracted) {
      wakeUpRoom()
    }
  }

  const handleCatClick = () => {
    const sound = playRandomCatSound(lastCatSound.current)
    lastCatSound.current = sound.type
    showCatSpeech(sound.speech)
    setCatReactionBurst((n) => n + 1)
    wakeCat()
  }

  const handleGirlClick = () => {
    const line = getRandomWelcomingLine(lastGirlSpeech.current)
    lastGirlSpeech.current = line
    showGirlSpeech(line)
    // Queue speech first on Safari so the decorative chime cannot delay it.
    speakGreeting(line)
    playGirlGreetingSound()
    activateGirl()
  }

  const day = state.theme === 'day'
  const girlActive = state.girl !== 'idle'

  // Scale dimming across all 5 light sources (lightsOffCount is 0 to 5)
  const offFraction = lightsOffCount / 5
  const imageFilter = day
    ? 'brightness(1.16) saturate(1.08) contrast(0.97)'
    : `brightness(${Math.max(0.78, 1 - offFraction * 0.22)}) contrast(${1 + offFraction * 0.06})`

  return (
    <div
      ref={roomRef}
      onClick={handleRoomClick}
      className="relative aspect-[3/2] w-full select-none overflow-hidden rounded-2xl sm:rounded-[1.75rem] ring-1 ring-white/10 shadow-2xl cursor-pointer touch-manipulation"
    >
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
        className="pointer-events-none absolute inset-0 transition-opacity duration-600"
        style={{
          opacity: day ? 0 : offFraction * 0.35,
          background: 'radial-gradient(120% 90% at 50% 50%, transparent 25%, rgba(8,4,18,0.75) 100%)',
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
        className="pointer-events-none absolute transition-all duration-400 rounded-full"
        style={{
          ...boxStyle(POS.neon),
          opacity: state.neonSign ? (hover === 'neon' ? 1 : 0.8) : 0,
          background: 'radial-gradient(ellipse at center, rgba(255,108,182,0.9) 0%, rgba(255,180,220,0.3) 25%, transparent 72%)',
          mixBlendMode: 'screen',
          filter: 'blur(10px)',
          animation: state.neonSign ? 'neonFlicker 6s infinite' : 'none',
        }}
      />

      {/* ---- cat lamp bloom ---- */}
      <div
        aria-hidden
        className="pointer-events-none absolute transition-all duration-400 rounded-full"
        style={{
          ...boxStyle(POS.lamp),
          opacity: state.catLamp ? (hover === 'lamp' ? 1 : 0.85) : 0,
          background: 'radial-gradient(ellipse at center, rgba(255,224,170,0.9) 0%, rgba(255,245,210,0.4) 25%, transparent 68%)',
          mixBlendMode: 'screen',
          filter: 'blur(8px)',
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

      {/* ================= interactive hotspots ================= */}

      {/* Lights */}
      {LIGHTS.map((l) => (
        <button
          key={l.id}
          type="button"
          aria-label={`Toggle ${l.label} ${state.lights[l.id] ? 'off' : 'on'}`}
          aria-pressed={state.lights[l.id]}
          onClick={(e) => {
            e.stopPropagation()
            toggleLight(l.id)
          }}
          onMouseEnter={() => setHover(l.id)}
          onMouseLeave={() => setHover((h) => (h === l.id ? null : h))}
          className="group absolute z-20 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
          style={boxStyle(POS[l.id])}
        />
      ))}

      {/* Neon sign */}
      <button
        type="button"
        aria-label={`Toggle neon sign ${state.neonSign ? 'off' : 'on'}`}
        aria-pressed={state.neonSign}
        onClick={(e) => {
          e.stopPropagation()
          toggleNeon()
        }}
        onMouseEnter={() => setHover('neon')}
        onMouseLeave={() => setHover((h) => (h === 'neon' ? null : h))}
        className="group absolute z-20 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
        style={boxStyle(POS.neon)}
      >
        <Tooltip show={hover === 'neon'} align="left">Stay positive, ship code</Tooltip>
      </button>

      {/* Cat lamp */}
      <button
        type="button"
        aria-label={`Toggle desk cat lamp ${state.catLamp ? 'off' : 'on'}`}
        aria-pressed={state.catLamp}
        onClick={(e) => {
          e.stopPropagation()
          toggleLamp()
          setLampBurst((n) => n + 1)
        }}
        onMouseEnter={() => setHover('lamp')}
        onMouseLeave={() => setHover((h) => (h === 'lamp' ? null : h))}
        className="group absolute z-20 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
        style={boxStyle(POS.lamp)}
      >
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
        aria-label="Coffee mug, fuel for the next deploy"
        onClick={(e) => {
          e.stopPropagation()
          toggleCoffee()
          setCoffeeBurst((n) => n + 1)
        }}
        onMouseEnter={() => setHover('coffee')}
        onMouseLeave={() => setHover((h) => (h === 'coffee' ? null : h))}
        className="group absolute z-20 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
        style={boxStyle(POS.coffee)}
      >
        <Tooltip show={hover === 'coffee'}>Fuel for the next deploy</Tooltip>
        {coffeeBurst > 0 && (
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
        onClick={(e) => {
          e.stopPropagation()
          registerInteraction('laptop')
          setOpenLaptop(true)
        }}
        onMouseEnter={() => setHover('laptop')}
        onMouseLeave={() => setHover((h) => (h === 'laptop' ? null : h))}
        className="group absolute z-20 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
        style={boxStyle(POS.laptop)}
      >
        <Tooltip show={hover === 'laptop' && !openLaptop}>Peek at the code {'</>'}</Tooltip>
      </button>

      {/* Girl */}
      <button
        type="button"
        aria-label="Tap Soumika to say hello"
        onClick={(e) => {
          e.stopPropagation()
          handleGirlClick()
        }}
        onMouseEnter={() => setHover('girl')}
        onMouseLeave={() => setHover((h) => (h === 'girl' ? null : h))}
        className="group absolute z-10 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
        style={boxStyle(POS.girl)}
      >
        <Tooltip show={hover === 'girl' && !girlSpeech} position="bottom">
          {state.girl === 'typing' ? 'Say hello! 🌸' : 'Tap to say hello! 👩‍💻'}
        </Tooltip>
      </button>

      {/* Girl welcoming speech bubble */}
      <AnimatePresence>
        {girlSpeech && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ type: 'spring', damping: 22, stiffness: 340 }}
            className="absolute z-30 max-w-[64%] sm:max-w-[50%] rounded-2xl border border-primary/50 bg-[#160d26]/95 px-3 py-2 sm:px-4 sm:py-2.5 text-[11px] sm:text-xs md:text-sm font-medium text-white shadow-[0_0_25px_rgba(255,108,182,0.45)] backdrop-blur-md pointer-events-none select-none leading-snug"
            style={{ left: '26%', top: '14%' }}
          >
            <div className="relative">
              <span className="block text-primary font-bold text-[10px] sm:text-xs mb-0.5 tracking-wide">
                Soumika 👩‍💻
              </span>
              <span>{girlSpeech}</span>
            </div>
            {/* Speech bubble pointer */}
            <div
              className="absolute -bottom-1.5 left-8 h-3 w-3 rotate-45 border-b border-r border-primary/50 bg-[#160d26]"
              aria-hidden
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cat */}
      <button
        type="button"
        aria-label={
          state.cat === 'sleeping'
            ? 'Wake up the cat with a meow'
            : 'Pet the happy cat'
        }
        onClick={(e) => {
          e.stopPropagation()
          handleCatClick()
        }}
        onMouseEnter={() => setHover('cat')}
        onMouseLeave={() => setHover((h) => (h === 'cat' ? null : h))}
        className="group absolute z-20 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
        style={boxStyle(POS.cat)}
      >
        {/* Zzz while sleeping / hovering */}
        {state.cat === 'sleeping' && hover === 'cat' && (
          <span className="pointer-events-none absolute right-2 top-0 text-sm text-white/80" style={{ animation: 'zzz 1.6s ease-out infinite' }}>
            z
          </span>
        )}
        {/* Floating paws / hearts on tap */}
        {catReactionBurst > 0 && (
          <span key={`cat-burst-${catReactionBurst}`} className="pointer-events-none absolute inset-x-0 -top-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute left-1/2 text-primary"
                style={{
                  ['--p-drift' as string]: `${(i - 1) * 14}px`,
                  animation: `floatUp 1.2s ease-out ${i * 0.12}s forwards`,
                }}
              >
                {i === 1 ? <PawPrint size={14} className="fill-primary text-primary" /> : <Heart size={14} className="fill-primary text-primary" />}
              </span>
            ))}
          </span>
        )}
      </button>

      {/* Cat speech bubble for meow and purr */}
      <AnimatePresence>
        {catSpeech && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute z-30 rounded-2xl border border-primary/50 bg-[#160d26]/95 px-3 py-1.5 text-xs sm:text-sm font-semibold text-primary shadow-[0_0_20px_rgba(255,108,182,0.45)] backdrop-blur-md pointer-events-none select-none"
            style={{ left: '64%', top: '54%' }}
          >
            {catSpeech}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= Interactive Discovery HUD with Hint (Draggable & Movable) ================= */}
      {state.hasInteracted && (
        <motion.div
          drag
          dragConstraints={roomRef}
          dragElastic={0.08}
          dragMomentum={false}
          whileDrag={{
            scale: 1.05,
            cursor: 'grabbing',
            zIndex: 60,
            boxShadow: '0 0 25px rgba(255,108,182,0.65)',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation()
            giveHint()
          }}
          role="button"
          tabIndex={0}
          title="Drag to move • Tap for hint"
          className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-40 flex items-center gap-1 sm:gap-1.5 rounded-full border border-primary/40 bg-black/80 hover:bg-black/95 px-2 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-foreground backdrop-blur-md shadow-lg select-none cursor-grab active:cursor-grabbing touch-none"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <GripVertical className="h-3 w-3 text-muted-foreground/60 -ml-0.5 shrink-0" />
          <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary animate-spin shrink-0" style={{ animationDuration: '6s' }} />
          <span className="whitespace-nowrap">
            Room Explorer: <strong className="text-primary">{Math.min(state.discoveredItems.length, TOTAL_SECRETS)}</strong>/{TOTAL_SECRETS}
          </span>
          {state.discoveredItems.length < TOTAL_SECRETS ? (
            <span className="ml-1 flex items-center gap-0.5 rounded-full bg-primary/20 px-1.5 py-0.5 text-[9px] font-bold text-primary border border-primary/30 animate-pulse shrink-0">
              💡 Hint
            </span>
          ) : (
            <span className="text-amber-300 font-bold ml-0.5 animate-bounce shrink-0">🏆</span>
          )}
        </motion.div>
      )}

      {/* ================= Floating Hint Banner ================= */}
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={(e) => {
              e.stopPropagation()
              setHint(null)
            }}
            className="pointer-events-auto absolute bottom-4 sm:bottom-6 left-1/2 z-50 -translate-x-1/2 max-w-[92%] rounded-full border-2 border-primary/70 bg-[#160d26]/95 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-[0_0_35px_rgba(255,108,182,0.6)] backdrop-blur-xl flex items-center gap-2 cursor-pointer select-none whitespace-nowrap"
          >
            <Sparkles className="h-4 w-4 text-primary shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{hint}</span>
            <span className="text-[10px] text-pink-300 font-normal ml-1 border border-primary/40 rounded-full px-1.5 py-0.5">tap to close</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= Initial Tap to Wake Up Room Overlay ================= */}
      <AnimatePresence>
        {!state.hasInteracted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={(e) => {
              e.stopPropagation()
              wakeUpRoom()
            }}
            className="absolute inset-0 z-35 flex cursor-pointer flex-col items-center justify-center bg-black/55 backdrop-blur-[2px] p-4 text-center select-none"
          >
            <motion.div
              initial={{ scale: 0.92, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="glass-panel relative flex flex-col items-center gap-1.5 sm:gap-2 rounded-2xl border border-primary/40 bg-[#160d26]/90 px-6 py-4 sm:px-8 sm:py-5 shadow-[0_0_40px_rgba(255,108,182,0.35)] backdrop-blur-md"
            >
              <h3 className="font-script text-2xl sm:text-3xl text-foreground text-glow-neon">
                Room is sleeping
              </h3>
              <p className="text-xs sm:text-sm font-medium text-primary animate-pulse">
                Tap to wake up the room
              </p>
            </motion.div>
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
