'use client'

import { Cat, Code2, Coffee, Rocket } from 'lucide-react'

const STATS = [
  { icon: Code2, value: '6+', label: 'Projects' },
  { icon: Rocket, value: '1+', label: 'Years Experience' },
  { icon: Coffee, value: '1000+', label: 'Cups of Coffee' },
  { icon: Cat, value: '∞', label: 'Passion' },
]

export function StatsPanel() {
  return (
    <div className="glass-panel grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-6 md:gap-8 rounded-2xl p-3.5 sm:px-5 sm:py-4 w-full sm:w-auto sm:inline-grid">
      {STATS.map((s) => (
        <div key={s.label} className="flex flex-col gap-0.5 sm:gap-1">
          <s.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" aria-hidden />
          <span className="text-lg sm:text-xl font-bold text-foreground tracking-tight">{s.value}</span>
          <span className="text-[11px] sm:text-xs text-muted-foreground">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
