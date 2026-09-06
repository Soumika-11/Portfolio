'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Menu, Moon, PawPrint, Sun, X } from 'lucide-react'
import { useScene } from './scene-context'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const { state, toggleTheme } = useScene()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? 'glass-panel border-b' : 'border-b border-transparent'
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full">
          <Image
            src="/logo.jpg"
            alt="Soumika.dev logo"
            width={44}
            height={44}
            className="rounded-full ring-1 ring-primary/40"
            priority
          />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground hover:bg-white/5 outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={state.theme === 'night' ? 'Switch to day mode' : 'Switch to night mode'}
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-border transition hover:bg-white/10 outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
            className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 ring-1 ring-primary/40 transition hover:bg-primary/25 outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <PawPrint className="h-4 w-4 text-primary" />
          </button>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-border transition hover:bg-white/10 lg:hidden outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="glass-panel border-t lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
