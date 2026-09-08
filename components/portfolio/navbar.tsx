'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Home, User, Wrench, FolderOpen, Briefcase, FileText, Mail, BookOpen, Moon, Sun, Menu, X } from 'lucide-react'
import { AnimeNavBar } from '@/components/ui/anime-navbar'
import { useScene } from './scene-context'

const NAV_ITEMS = [
  { name: 'Home', url: '#home', icon: Home },
  { name: 'About', url: '#about', icon: User },
  { name: 'Skills', url: '#skills', icon: Wrench },
  { name: 'Projects', url: '#projects', icon: FolderOpen },
  { name: 'Publications', url: '#publications', icon: BookOpen },
  { name: 'Experience', url: '#experience', icon: Briefcase },
  { name: 'Resume', url: '#resume', icon: FileText },
  { name: 'Contact', url: '#contact', icon: Mail },
]

import { AnimatePresence, motion } from 'framer-motion'

export function Navbar() {
  const { state, toggleTheme } = useScene()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock scroll when mobile menu is open & close on Escape
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
      }
      window.addEventListener('keydown', onKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', onKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
        ? state.theme === 'day'
          ? 'bg-background/80 backdrop-blur-md shadow-[0_4px_20px_rgba(155,120,220,0.05)]'
          : 'bg-background/70 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.25)]'
        : 'bg-transparent'
        }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="relative mx-auto flex h-14 sm:h-16 max-w-[100rem] items-center justify-between px-3 xs:px-4 sm:px-8">
        {/* Logo — left */}
        <div className="z-10 flex-shrink-0">
          <a
            href="#home"
            aria-label="Soumika.dev home"
            className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full block"
          >
            <div className="relative h-10 w-10 sm:h-12 sm:w-12">
              <Image
                src="/logo.jpg"
                alt="Soumika.dev logo"
                fill
                className="rounded-full ring-1 ring-primary/40 object-cover"
                priority
                sizes="48px"
              />
            </div>
          </a>
        </div>

        {/* Anime nav — centered for desktop/laptop */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
          <AnimeNavBar items={NAV_ITEMS} defaultActive="Home" />
        </div>

        {/* Utility buttons — right */}
        <div className="z-10 flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <button
            type="button"
            aria-label={state.theme === 'night' ? 'Switch to day mode' : 'Switch to night mode'}
            onClick={toggleTheme}
            className="grid h-10 w-10 min-w-[40px] place-items-center rounded-full ring-1 ring-border transition hover:bg-white/10 outline-none focus-visible:ring-2 focus-visible:ring-primary backdrop-blur-sm bg-background/40 active:scale-95 touch-manipulation"
          >
            {state.theme === 'night' ? (
              <Moon className="h-4 w-4 text-accent" />
            ) : (
              <Sun className="h-4 w-4 text-peach" />
            )}
          </button>
          {/* Catch Up button */}
          <a
            href="mailto:dassoumika11@gmail.com"
            aria-label="Send Soumika an email"
            className="group inline-flex h-10 min-w-[40px] items-center justify-center gap-2 rounded-full bg-primary/90 px-3 md:px-4 text-primary-foreground ring-1 ring-primary/60 transition hover:bg-primary hover:shadow-[0_0_18px_rgba(255,108,182,0.55)] outline-none focus-visible:ring-2 focus-visible:ring-primary backdrop-blur-sm active:scale-95 touch-manipulation shadow-[0_0_10px_rgba(255,108,182,0.3)]"
          >
            <Mail className="h-4 w-4 shrink-0" />
            <span className="hidden md:inline text-xs font-semibold tracking-wide">Catch Up</span>
          </a>
          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 min-w-[40px] place-items-center rounded-full ring-1 ring-border transition hover:bg-white/10 lg:hidden outline-none focus-visible:ring-2 focus-visible:ring-primary backdrop-blur-sm bg-background/40 active:scale-95 touch-manipulation"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile & tablet navigation drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-label="Mobile Navigation"
            aria-modal="true"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="border-b border-border/40 overflow-hidden lg:hidden"
            style={{
              background: state.theme === 'day' ? 'rgba(253, 246, 255, 0.97)' : 'rgba(14, 8, 26, 0.97)',
              backdropFilter: 'blur(24px) saturate(1.6)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
              paddingLeft: 'max(1rem, env(safe-area-inset-left, 0px))',
              paddingRight: 'max(1rem, env(safe-area-inset-right, 0px))',
            }}
          >
            <div className="mx-auto max-w-2xl px-2 py-4 sm:px-6">
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 max-h-[calc(82dvh-4rem)] overflow-y-auto overscroll-contain py-1">
                {NAV_ITEMS.map((l) => {
                  const Icon = l.icon
                  return (
                    <a
                      key={l.name}
                      href={l.url}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground active:bg-primary/20 min-h-[44px] touch-manipulation ${state.theme === 'day' ? 'hover:bg-black/5' : 'hover:bg-white/10'
                        }`}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-primary" />
                      <span>{l.name}</span>
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
