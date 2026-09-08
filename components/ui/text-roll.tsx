'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, type Transition } from 'framer-motion'

export type TextRollProps = {
  children?: string
  words?: string[]
  duration?: number
  className?: string
  transition?: Transition
  autoPlayInterval?: number
}

export function TextRoll({
  children,
  words,
  duration = 0.35,
  className,
  autoPlayInterval = 3200,
}: TextRollProps) {
  const wordList = words && words.length > 0 ? words : children ? [children] : []
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (wordList.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wordList.length)
    }, autoPlayInterval)

    return () => clearInterval(timer)
  }, [wordList.length, autoPlayInterval])

  const activeWord = wordList[currentIndex] || ''
  const letters = activeWord.split('')

  const handleNext = () => {
    if (wordList.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % wordList.length)
    }
  }

  return (
    <span
      className={`inline-flex items-baseline cursor-pointer select-none ${className ?? ''}`}
      onClick={handleNext}
      onMouseEnter={handleNext}
      title="Click or hover to switch role"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={`${activeWord}-${currentIndex}`}
          className="inline-flex items-baseline"
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {letters.map((char, i) => (
            <span
              key={`${char}-${i}`}
              className="relative inline-block overflow-hidden leading-[1.25] h-[1.25em] align-baseline"
              aria-hidden="true"
            >
              <motion.span
                className="inline-block"
                variants={{
                  initial: { y: '100%', opacity: 0 },
                  animate: { y: '0%', opacity: 1 },
                  exit: { y: '-100%', opacity: 0 },
                }}
                transition={{
                  duration,
                  ease: [0.33, 1, 0.68, 1],
                  delay: i * 0.02,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">{activeWord}</span>
    </span>
  )
}
