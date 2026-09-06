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
  }, [])

  if (!mounted) return null

  return (
    <div className={cn("flex justify-center", className)}>
      <div className="relative">
        <motion.div
          className="flex items-center gap-2 bg-transparent py-3 px-3 rounded-full"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name
            const isHovered = hoveredTab === item.name

            return (
              <LiquidButton
                key={item.name}
                asChild
                className={cn(
                  "!rounded-full transition-all duration-300",
                  isActive
                    ? "shadow-[0_0_15px_rgba(255,108,182,0.3)] ring-1 ring-primary/60"
                    : "hover:shadow-[0_0_15px_rgba(255,108,182,0.2)] hover:ring-1 hover:ring-primary/50"
                )}
                variant="default"
                size="xl"
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
                    "relative cursor-pointer text-base font-medium px-6 py-3 transition-all duration-300",
                    "text-white/75 hover:text-white tracking-wide",
                    isActive && "text-white font-bold"
                  )}
                >
                  {/* Desktop: text */}
                  <span className="hidden md:inline relative z-10">{item.name}</span>

                  {/* Mobile: icon */}
                  <motion.span
                    className="md:hidden relative z-10"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={18} strokeWidth={2.5} />
                  </motion.span>
                </Link>
              </LiquidButton>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
