'use client'

import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Download, Heart, PawPrint } from 'lucide-react'
import { StatsPanel } from './stats-panel'
import { TextRoll } from '@/components/ui/text-roll'

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

export function HeroContent() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 max-w-xl"
    >
      <motion.p
        variants={item}
        className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-primary"
      >
        <PawPrint className="h-4 w-4" />
        Hello, I&apos;m
      </motion.p>

      <motion.h1
        variants={item}
        className="mt-2 flex items-center gap-3 font-script text-6xl leading-none text-foreground text-glow-neon sm:text-7xl lg:text-8xl"
      >
        Soumika
        <Heart className="h-8 w-8 shrink-0 fill-primary text-primary sm:h-10 sm:w-10" />
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-3 flex items-center gap-2 text-lg font-semibold uppercase tracking-wide text-accent sm:text-xl"
      >
        <TextRoll
          duration={0.45}
          getEnterDelay={(i) => i * 0.06}
          getExitDelay={(i) => i * 0.06 + 0.15}
        >
          Full Stack Developer
        </TextRoll>
        <span className="font-mono text-primary">{'</>'}</span>
      </motion.p>

      <motion.p
        variants={item}
        className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground"
      >
        I build scalable web applications and delightful digital experiences with code,
        creativity and a lot of caffeine ☕🐱
      </motion.p>

      <motion.div variants={item} className="mt-7 flex flex-wrap gap-3">
        <a
          href="#projects"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_rgba(255,108,182,0.5)] transition hover:shadow-[0_0_34px_rgba(255,108,182,0.75)] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Explore My Work
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-primary/10 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Download CV
          <Download className="h-4 w-4" />
        </a>
      </motion.div>

      <motion.div variants={item} className="mt-8">
        <StatsPanel />
      </motion.div>
    </motion.div>
  )
}
