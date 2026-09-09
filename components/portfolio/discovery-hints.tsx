'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useScene } from './scene-context'

const STORAGE_KEY = 'soumika-hints-seen'

export function DiscoveryHints() {
  const { state } = useScene()
  const [msg, setMsg] = useState<string | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const runSequence = useCallback(() => {
    clearTimers()
    const firstMsg = !state.hasInteracted
      ? '✨ Tap the cozy room above to wake it up & play!'
      : 'Try tapping the sleeping cat or laptop in the room! 🐾'
    setMsg(firstMsg)
    timers.current.push(
      setTimeout(() => {
        setMsg('5 hidden secrets to discover in the anime room… 🎮')
      }, 4200),
    )
    timers.current.push(setTimeout(() => setMsg(null), 8400))
  }, [state.hasInteracted])

  useEffect(() => {
    let firstTimer: ReturnType<typeof setTimeout>
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        firstTimer = setTimeout(() => {
          runSequence()
          localStorage.setItem(STORAGE_KEY, '1')
        }, 2000)
      }
    } catch {
      /* ignore storage errors */
    }

    const onShow = () => runSequence()
    window.addEventListener('show-hints', onShow)
    return () => {
      clearTimeout(firstTimer)
      clearTimers()
      window.removeEventListener('show-hints', onShow)
    }
  }, [runSequence])

  return (
    <div
      className="pointer-events-none fixed z-[60] max-w-[calc(100vw-1.5rem)] sm:max-w-md"
      style={{
        bottom: 'max(1rem, calc(env(safe-area-inset-bottom, 0px) + 0.75rem))',
        right: 'max(0.75rem, calc(env(safe-area-inset-right, 0px) + 0.75rem))',
      }}
    >
      <AnimatePresence mode="wait">
        {msg && (
          <motion.div
            key={msg}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="glass-panel pointer-events-auto flex items-center gap-2 rounded-full px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-medium text-foreground shadow-xl border border-primary/30"
          >
            <Sparkles className="h-4 w-4 shrink-0 text-primary" />
            <span>{msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
