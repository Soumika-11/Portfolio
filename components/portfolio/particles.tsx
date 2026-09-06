'use client'

import { useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Heart } from 'lucide-react'

// Deterministic pseudo-random so server and client render identically.
function seeded(n: number) {
  const x = Math.sin(n * 999.13) * 10000
  return x - Math.floor(x)
}

export function Particles({ count = 22 }: { count?: number }) {
  const reduce = useReducedMotion()
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r = seeded(i + 1)
        const r2 = seeded(i + 50)
        const r3 = seeded(i + 120)
        const isHeart = r3 > 0.82
        return {
          left: `${(r * 100).toFixed(2)}%`,
          size: 3 + r2 * 5,
          delay: (r * 12).toFixed(2),
          duration: (9 + r2 * 10).toFixed(2),
          drift: `${(r2 * 40 - 20).toFixed(0)}px`,
          opacity: (0.25 + r * 0.5).toFixed(2),
          isHeart,
        }
      }),
    [count],
  )

  if (reduce) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-[-10px]"
          style={{
            left: p.left,
            width: p.isHeart ? undefined : p.size,
            height: p.isHeart ? undefined : p.size,
            ['--p-drift' as string]: p.drift,
            ['--p-opacity' as string]: p.opacity,
            animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.isHeart ? (
            <Heart size={10} className="text-primary/70 fill-primary/70" />
          ) : (
            <span
              className="block rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: 'radial-gradient(circle, rgba(255,181,214,0.9), rgba(184,155,240,0.3))',
                boxShadow: '0 0 6px rgba(255,150,200,0.6)',
              }}
            />
          )}
        </span>
      ))}
    </div>
  )
}
