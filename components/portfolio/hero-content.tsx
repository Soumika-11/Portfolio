'use client'

import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Download, Heart, PawPrint } from 'lucide-react'
import Typewriter from 'typewriter-effect'
import { StatsPanel } from './stats-panel'

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.9 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const ROLES = [
  'fullstack',
  'frontend dev',
  'backend dev',
  'seo optimisation',
  'ai engineer',
]

export function HeroContent() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 w-full max-w-xl flex flex-col items-center text-center lg:items-start lg:text-left mx-auto lg:mx-0"
    >
      <motion.p
        variants={item}
        className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-primary"
      >
        <PawPrint className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
        Hello, I&apos;m
      </motion.p>

      <motion.h1
        variants={item}
        className="mt-2 flex items-center justify-center lg:justify-start gap-2 sm:gap-3 font-script text-5xl xs:text-6xl sm:text-7xl lg:text-8xl leading-none text-foreground text-glow-neon"
      >
        Soumika
        <Heart className="h-7 w-7 xs:h-8 xs:w-8 sm:h-10 sm:w-10 shrink-0 fill-primary text-primary" />
      </motion.h1>

      <motion.div
        variants={item}
        className="mt-2.5 sm:mt-3 flex items-center justify-center lg:justify-start gap-2 text-base xs:text-lg sm:text-xl font-semibold uppercase tracking-wide text-accent min-h-[1.75em]"
      >
        <span className="inline-flex items-center">
          <Typewriter
            options={{
              strings: ROLES,
              autoStart: true,
              loop: true,
              delay: 65,
              deleteSpeed: 35,
              cursor: '',
              cursorClassName: 'hidden',
            }}
          />
        </span>
        <span className="font-mono text-primary shrink-0">{'</>'}</span>
      </motion.div>

      <motion.p
        variants={item}
        className="mt-4 sm:mt-5 max-w-md text-pretty text-sm sm:text-base leading-relaxed text-muted-foreground text-center lg:text-left mx-auto lg:mx-0"
      >
        I build scalable web applications and delightful digital experiences with code,
        creativity and a lot of caffeine.
      </motion.p>

      <motion.div variants={item} className="mt-6 sm:mt-7 flex flex-col xs:flex-row flex-wrap justify-center lg:justify-start items-center gap-2.5 sm:gap-3 w-full xs:w-auto">
        <a
          href="#projects"
          className="group inline-flex w-full xs:w-auto items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 sm:px-6 sm:py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_rgba(255,108,182,0.5)] transition hover:shadow-[0_0_34px_rgba(255,108,182,0.75)] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
        >
          Explore My Work
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full xs:w-auto items-center justify-center gap-2 rounded-full border border-primary/50 px-5 py-3 sm:px-6 sm:py-3 text-sm font-semibold text-foreground transition hover:bg-primary/10 outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.98]"
        >
          Download CV
          <Download className="h-4 w-4" />
        </a>
      </motion.div>

      <motion.div variants={item} className="mt-6 sm:mt-8 w-full">
        <StatsPanel />
      </motion.div>
    </motion.div>
  )
}
