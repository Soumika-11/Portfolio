'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Home, User, Wrench, FolderOpen, Briefcase, FileText, Mail } from 'lucide-react'
import { AnimeNavBar } from '@/components/ui/anime-navbar'
import { Moon, Sun, PawPrint, Menu, X } from 'lucide-react'
import { useScene } from './scene-context'

const NAV_ITEMS = [
  { name: 'Home', url: '#home', icon: Home },
  { name: 'About', url: '#about', icon: User },
  { name: 'Skills', url: '#skills', icon: Wrench },
  { name: 'Projects', url: '#projects', icon: FolderOpen },
  { name: 'Experience', url: '#experience', icon: Briefcase },
  { name: 'Resume', url: '#resume', icon: FileText },
  { name: 'Contact', url: '#contact', icon: Mail },
]

export function Navbar() {
  const { state, toggleTheme } = useScene()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-6">
      <div className="relative mx-auto flex h-16 max-w-[100rem] items-center justify-between px-4 sm:px-8">
        {/* Logo — left */}
        <div className="z-10 flex-shrink-0">
          <a href="#home" className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full block">
            <Image
              src="/logo.jpg"
              alt="Soumika.dev logo"
              width={48}
              height={48}
              className="rounded-full ring-1 ring-primary/40 object-cover"
              priority
            />
          </a>
        </div>

        {/* Anime nav — perfectly centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block">
          <AnimeNavBar items={NAV_ITEMS} defaultActive="Home" />
        </div>

        {/* Utility buttons — right */}
        <div className="z-10 flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            aria-label={state.theme === 'night' ? 'Switch to day mode' : 'Switch to night mode'}
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-border transition hover:bg-white/10 outline-none focus-visible:ring-2 focus-visible:ring-primary backdrop-blur-sm bg-background/40"
          >
            {state.theme === 'night' ? (
              <Moon className="h-4 w-4 text-accent" />
            ) : (
              <Sun className="h-4 w-4 text-peach" />
            )}
          </button>
          <button
            type="button"
            aria-label="Show interactive hints"
            onClick={() => window.dispatchEvent(new CustomEvent('show-hints'))}
            className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 ring-1 ring-primary/40 transition hover:bg-primary/25 outline-none focus-visible:ring-2 focus-visible:ring-primary backdrop-blur-sm"
          >
            <PawPrint className="h-4 w-4 text-primary" />
          </button>
          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-border transition hover:bg-white/10 lg:hidden outline-none focus-visible:ring-2 focus-visible:ring-primary backdrop-blur-sm bg-background/40"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="glass-panel border-b mt-0 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6 pt-14">
            {NAV_ITEMS.map((l) => (
              <a
                key={l.name}
                href={l.url}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              >
                {l.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
