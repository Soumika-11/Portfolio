'use client'

import { Cat, Code2, Coffee, Rocket } from 'lucide-react'

const STATS = [
  { icon: Code2, value: '5+', label: 'Projects' },
  { icon: Rocket, value: '1+', label: 'Years Experience' },
  { icon: Coffee, value: '1000+', label: 'Cups of Coffee' },
  { icon: Cat, value: '∞', label: 'Passion' },
]

export function StatsPanel() {
  return (
    <div className="glass-panel inline-grid grid-cols-2 gap-x-8 gap-y-5 rounded-2xl px-5 py-4 sm:grid-cols-4">
      {STATS.map((s) => (
        <div key={s.label} className="flex flex-col gap-1">
          <s.icon className="h-5 w-5 text-primary" aria-hidden />
          <span className="text-xl font-bold text-foreground">{s.value}</span>
          <span className="text-xs text-muted-foreground">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
