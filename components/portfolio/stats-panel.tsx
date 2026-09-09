'use client'

import { Cat, Code2, Coffee, Rocket } from 'lucide-react'

const STATS = [
  { icon: Code2, value: '20+', label: 'Projects' },
  { icon: Rocket, value: '1+', label: 'Years Experience' },
  { icon: Coffee, value: '1000+', label: 'Cups of Coffee' },
  { icon: Cat, value: '∞', label: 'Passion' },
]

export function StatsPanel() {
  return (
    <div className="glass-panel w-full rounded-2xl p-4 sm:p-5 md:p-4 lg:p-6 grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 md:gap-3 lg:gap-6">
      {STATS.map((s) => (
        <div key={s.label} className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <span className="grid h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 shrink-0 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
            <s.icon className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-primary" aria-hidden />
          </span>
          <div className="flex flex-col min-w-0 text-left">
            <span className="text-base sm:text-lg md:text-xl font-bold text-foreground tracking-tight leading-tight">
              {s.value}
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-muted-foreground leading-tight">
              {s.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
