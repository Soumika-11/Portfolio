'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const MESSAGES = ['Try clicking the cat 🐱', 'Some things in this room are interactive…']
const STORAGE_KEY = 'soumika-hints-seen'

export function DiscoveryHints() {
  const [msg, setMsg] = useState<string | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const runSequence = useCallback(() => {
    clearTimers()
    setMsg(MESSAGES[0])
    timers.current.push(setTimeout(() => setMsg(MESSAGES[1]), 4200))
    timers.current.push(setTimeout(() => setMsg(null), 8400))
  }, [])

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
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] max-w-[80vw]">
      <AnimatePresence mode="wait">
        {msg && (
          <motion.div
            key={msg}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="glass-panel pointer-events-auto flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-foreground shadow-xl"
          >
            <Sparkles className="h-4 w-4 shrink-0 text-primary" />
            {msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
