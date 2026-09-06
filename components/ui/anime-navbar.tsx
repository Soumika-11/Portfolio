"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { LiquidButton } from "@/components/ui/liquid-glass-button"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  defaultActive?: string
}


export function AnimeNavBar({ items, className, defaultActive = "Home" }: NavBarProps) {
  const [mounted, setMounted] = useState(false)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>(defaultActive)

  useEffect(() => {
    setMounted(true)

    // Scroll spy to update active nav tab automatically
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id")
            const matched = items.find((item) => item.url === `#${id}`)
            if (matched) {
              setActiveTab(matched.name)
            }
          }
        })
      },
      { rootMargin: "-30% 0px -60% 0px" }
    )

    items.forEach((item) => {
      const id = item.url.replace("#", "")
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (!mounted) return null

  return (
    <nav aria-label="Main Navigation" className={cn("flex justify-center", className)}>
      <div className="relative">
        <motion.div
          className="flex items-center gap-0.5 sm:gap-1 lg:gap-1 xl:gap-1.5 2xl:gap-2 bg-transparent py-1 sm:py-2 px-1 sm:px-2 rounded-full"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <LiquidButton
                key={item.name}
                asChild
                className={cn(
                  "!rounded-full !h-auto transition-all duration-300",
                  isActive
                    ? "shadow-[0_0_15px_rgba(255,108,182,0.3)] ring-1 ring-primary/60"
                    : "hover:shadow-[0_0_15px_rgba(255,108,182,0.2)] hover:ring-1 hover:ring-primary/50"
                )}
                variant="default"
                size="default"
              >
                <Link
                  href={item.url}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveTab(item.name)
                    const el = document.querySelector(item.url)
                    if (el) el.scrollIntoView({ behavior: "smooth" })
                  }}
                  onMouseEnter={() => setHoveredTab(item.name)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={cn(
                    "relative cursor-pointer font-medium transition-all duration-300",
                    "text-white/75 hover:text-white tracking-normal sm:tracking-wide",
                    "px-2.5 py-1.5 text-xs lg:px-2.5 lg:py-1.5 lg:text-xs xl:px-3.5 xl:py-2 xl:text-sm 2xl:px-5 2xl:py-2.5 2xl:text-base",
                    isActive && "text-white font-bold"
                  )}
                >
                  <span className="relative z-10">{item.name}</span>
                </Link>
              </LiquidButton>
            )
          })}
        </motion.div>
      </div>
    </nav>
  )
}
