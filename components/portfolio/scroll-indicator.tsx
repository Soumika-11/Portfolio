'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function ScrollIndicator() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById('about')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.a
      href="#about"
      onClick={handleClick}
      aria-label="Scroll to explore the About section"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="group flex flex-col items-center gap-1.5 sm:gap-2 text-muted-foreground transition-colors hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl px-4 py-2 touch-manipulation cursor-pointer select-none"
    >
      <span className="flex h-7 w-4 sm:h-8 sm:w-4.5 items-start justify-center rounded-full border border-current p-1 transition-colors group-hover:border-primary">
        <motion.span
          className="h-1.5 w-1 rounded-full bg-current transition-colors group-hover:bg-primary"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </span>
      <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors group-hover:text-primary">
        Scroll to explore
      </span>
      <motion.span
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="transition-colors group-hover:text-primary"
      >
        <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </motion.span>
    </motion.a>
  )
}
