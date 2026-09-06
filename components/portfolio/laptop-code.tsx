'use client'

import { useEffect, useRef, useState } from 'react'

const CODE = `const developer = {
  name: "Soumika",
  role: "Full Stack Developer",
  coffee: true,
  cats: Infinity,
};

ship(developer);`

function colorize(line: string, key: number) {
  // Lightweight token coloring for the snippet.
  const parts = line.split(/(".*?"|\b(?:const|true|Infinity|ship)\b|[:{},;])/g)
  return (
    <span key={key}>
      {parts.map((p, i) => {
        let cls = 'text-[#d9c9ff]'
        if (/^".*"$/.test(p)) cls = 'text-[#ffb27a]'
        else if (/\b(const|ship)\b/.test(p)) cls = 'text-[#ff6cb6]'
        else if (/\b(true|Infinity)\b/.test(p)) cls = 'text-[#8ce0c0]'
        else if (/[:{},;]/.test(p)) cls = 'text-[#8b7bb5]'
        return (
          <span key={i} className={cls}>
            {p}
          </span>
        )
      })}
    </span>
  )
}

export function LaptopCode({
  active,
  className,
  speed = 24,
}: {
  active: boolean
  className?: string
  speed?: number
}) {
  const [count, setCount] = useState(0)
  const raf = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!active) {
      setCount(0)
      return
    }
    raf.current = setInterval(() => {
      setCount((c) => {
        if (c >= CODE.length) return c
        return c + 1
      })
    }, speed)
    return () => {
      if (raf.current) clearInterval(raf.current)
    }
  }, [active, speed])

  const shown = CODE.slice(0, count)
  const lines = shown.split('\n')
  const done = count >= CODE.length

  return (
    <pre
      className={`whitespace-pre-wrap break-words font-mono leading-relaxed ${className ?? ''}`}
      aria-hidden="true"
    >
      {lines.map((l, i) => (
        <div key={i}>
          {colorize(l, i)}
          {i === lines.length - 1 && (
            <span
              className="ml-0.5 inline-block w-[0.5ch] bg-[#ff6cb6] align-middle"
              style={{
                height: '1em',
                animation: done ? 'cursorBlink 1s step-end infinite' : 'none',
              }}
            />
          )}
        </div>
      ))}
    </pre>
  )
}
