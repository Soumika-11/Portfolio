'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function ScrollIndicator() {
  return (
    <motion.a
      href="#about"
      aria-label="Scroll to explore the About section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.8 }}
      className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
    >
      <span className="flex h-9 w-5 items-start justify-center rounded-full border border-current p-1">
        <motion.span
          className="h-1.5 w-1 rounded-full bg-current"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Scroll to explore</span>
      <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
        <ChevronDown className="h-4 w-4" />
      </motion.span>
    </motion.a>
  )
}
