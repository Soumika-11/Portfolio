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
    <div className="glass-panel grid grid-cols-2 sm:grid-cols-4 items-center rounded-2xl p-4 sm:px-6 sm:py-4 gap-4 sm:gap-6 md:gap-8 w-full sm:w-fit">
      {STATS.map((s) => (
        <div key={s.label} className="flex flex-col gap-0.5 sm:gap-1 sm:min-w-[6.75rem]">
          <s.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" aria-hidden />
          <span className="text-lg sm:text-xl font-bold text-foreground tracking-tight">{s.value}</span>
          <span className="text-[11px] sm:text-xs font-medium text-muted-foreground whitespace-nowrap">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
