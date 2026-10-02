'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Home,
  User,
  Wrench,
  FolderOpen,
  Briefcase,
  FileText,
  Mail,
  BookOpen,
  HeartHandshake,
  Moon,
  Sun,
  Menu,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { AnimeNavBar } from '@/components/ui/anime-navbar'
import { useScene } from './scene-context'

const NAV_ITEMS = [
  { name: 'Home', url: '#home', icon: Home },
  { name: 'About', url: '#about', icon: User },
  { name: 'Skills', url: '#skills', icon: Wrench },
  { name: 'Projects', url: '#projects', icon: FolderOpen },
  { name: 'Publications', url: '#publications', icon: BookOpen },
  { name: 'Volunteering', url: '#volunteering', icon: HeartHandshake },
  { name: 'Experience', url: '#experience', icon: Briefcase },
  { name: 'Resume', url: '#resume', icon: FileText },
  { name: 'Contact', url: '#contact', icon: Mail },
]

export function Navbar() {
  const { state, toggleTheme } = useScene()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('Home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Track active section for mobile drawer highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id')
            const matched = NAV_ITEMS.find((item) => item.url === `#${id}`)
            if (matched) setActiveSection(matched.name)
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )

    NAV_ITEMS.forEach((item) => {
      const id = item.url.replace('#', '')
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault()
    setOpen(false)

    const targetId = url.replace('#', '')
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.history.pushState(null, '', url)
      return
    }

    const el = document.getElementById(targetId)
    if (el) {
      const navOffset = 64
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navOffset

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      })
      window.history.pushState(null, '', url)
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open
          ? state.theme === 'day'
            ? 'bg-background/90 backdrop-blur-md shadow-[0_4px_20px_rgba(155,120,220,0.08)]'
            : 'bg-[#100a1c]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
        }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="relative mx-auto flex h-14 sm:h-16 max-w-[100rem] items-center justify-between px-3 xs:px-4 sm:px-8">
        {/* Logo — left */}
        <div className="z-10 flex-shrink-0">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="Soumika.dev home"
            className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full block cursor-pointer"
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
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <AnimeNavBar items={NAV_ITEMS} defaultActive="Home" />
        </div>

        {/* Utility buttons — right */}
        <div className="z-10 flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <button
            type="button"
            aria-label={state.theme === 'night' ? 'Switch to day mode' : 'Switch to night mode'}
            onClick={toggleTheme}
            className="grid h-10 w-10 min-w-[40px] place-items-center rounded-full ring-1 ring-border transition hover:bg-white/10 outline-none focus-visible:ring-2 focus-visible:ring-primary backdrop-blur-sm bg-background/40 active:scale-95 touch-manipulation cursor-pointer"
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
            className="group inline-flex h-10 min-w-[40px] items-center justify-center gap-2 rounded-full bg-primary/90 px-3 lg:px-4 text-primary-foreground ring-1 ring-primary/60 transition hover:bg-primary hover:shadow-[0_0_18px_rgba(255,108,182,0.55)] outline-none focus-visible:ring-2 focus-visible:ring-primary backdrop-blur-sm active:scale-95 touch-manipulation shadow-[0_0_10px_rgba(255,108,182,0.3)] cursor-pointer"
          >
            <Mail className="h-4 w-4 shrink-0" />
            <span className="hidden lg:inline text-xs font-semibold tracking-wide">Catch Up</span>
          </a>
          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 min-w-[40px] place-items-center rounded-full ring-1 ring-border transition hover:bg-white/10 md:hidden outline-none focus-visible:ring-2 focus-visible:ring-primary backdrop-blur-sm bg-background/40 active:scale-95 touch-manipulation cursor-pointer"
          >
            {open ? <X className="h-4 w-4 text-primary" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer & backdrop */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop overlay — tap to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-14 sm:top-16 bg-black/55 backdrop-blur-[2px] -z-10 md:hidden"
              aria-hidden="true"
            />

            <motion.div
              id="mobile-navigation"
              role="dialog"
              aria-label="Mobile Navigation"
              aria-modal="true"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="border-b border-border/40 shadow-2xl md:hidden relative z-20"
              style={{
                background:
                  state.theme === 'day'
                    ? 'rgba(253, 246, 255, 0.98)'
                    : 'rgba(16, 10, 28, 0.98)',
                backdropFilter: 'blur(24px) saturate(1.6)',
                WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
                paddingLeft: 'max(1rem, env(safe-area-inset-left, 0px))',
                paddingRight: 'max(1rem, env(safe-area-inset-right, 0px))',
              }}
            >
              <div className="mx-auto max-w-2xl px-2 py-3.5 sm:px-6">
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 max-h-[calc(82dvh-4rem)] overflow-y-auto overscroll-contain py-1">
                  {NAV_ITEMS.map((l) => {
                    const Icon = l.icon
                    const isActive = activeSection === l.name
                    return (
                      <a
                        key={l.name}
                        href={l.url}
                        onClick={(e) => handleNavClick(e, l.url)}
                        className={`flex items-center gap-2.5 sm:gap-3 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium transition cursor-pointer min-h-[44px] touch-manipulation select-none active:scale-[0.98] ${isActive
                            ? 'bg-primary/20 text-primary font-semibold ring-1 ring-primary/40 shadow-[0_0_12px_rgba(255,108,182,0.25)]'
                            : state.theme === 'day'
                              ? 'text-foreground/80 hover:bg-black/5 hover:text-foreground'
                              : 'text-muted-foreground hover:bg-white/10 hover:text-foreground'
                          }`}
                      >
                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-primary' : 'text-primary/70'}`} />
                        <span className="truncate">{l.name}</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
