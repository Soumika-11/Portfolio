"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useScene } from "@/components/portfolio/scene-context"

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
  const { state } = useScene()
  const day = state.theme === "day"

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
          className="flex items-center gap-0.5 sm:gap-1 lg:gap-1.5 xl:gap-2 bg-transparent py-1 px-1"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {items.map((item) => {
            const isActive = activeTab === item.name
            const isHovered = hoveredTab === item.name

            return (
              <Link
                key={item.name}
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
                  "relative cursor-pointer rounded-full font-medium transition-colors duration-200",
                  "px-3 py-1.5 text-xs lg:px-3 lg:py-1.5 lg:text-xs xl:px-4 xl:py-2 xl:text-sm tracking-wide select-none",
                  isActive
                    ? "text-primary font-semibold"
                    : day
                      ? "text-foreground/75 hover:text-foreground"
                      : "text-white/75 hover:text-white"
                )}
              >
                {/* Active indicator pill */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-primary/15 ring-1 ring-primary/40 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover indicator pill */}
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        "absolute inset-0 rounded-full -z-10",
                        day ? "bg-primary/10" : "bg-white/10"
                      )}
                    />
                  )}
                </AnimatePresence>

                <span className="relative z-10">{item.name}</span>
              </Link>
            )
          })}
        </motion.div>
      </div>
    </nav>
  )
}
