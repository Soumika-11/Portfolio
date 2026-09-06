"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

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

/** Cute CSS cat face mascot */
function CatMascot({ excited }: { excited: boolean }) {
  return (
    <div className="relative w-10 h-10">
      {/* Cat ears */}
      <div className="absolute -top-2.5 left-0.5 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[14px] border-l-transparent border-r-transparent border-b-white" />
      <div className="absolute -top-2.5 right-0.5 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[14px] border-l-transparent border-r-transparent border-b-white" />
      {/* Inner ear color */}
      <div className="absolute -top-1.5 left-1.5 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[9px] border-l-transparent border-r-transparent border-b-pink-300" />
      <div className="absolute -top-1.5 right-1.5 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[9px] border-l-transparent border-r-transparent border-b-pink-300" />

      {/* Head */}
      <div className="absolute inset-0 bg-white rounded-full" />

      {/* Eyes */}
      <motion.div
        className="absolute bg-black rounded-full"
        style={{ width: 6, height: excited ? 3 : 6, left: "28%", top: "38%" }}
        animate={{ scaleY: excited ? [1, 0.2, 1] : 1 }}
        transition={{ duration: 0.25, repeat: excited ? Infinity : 0, repeatDelay: 1.5 }}
      />
      <motion.div
        className="absolute bg-black rounded-full"
        style={{ width: 6, height: excited ? 3 : 6, right: "28%", top: "38%" }}
        animate={{ scaleY: excited ? [1, 0.2, 1] : 1 }}
        transition={{ duration: 0.25, repeat: excited ? Infinity : 0, repeatDelay: 1.5, delay: 0.05 }}
      />
      {/* Eye shine */}
      <div className="absolute w-1.5 h-1.5 bg-white rounded-full" style={{ left: "31%", top: "36%" }} />
      <div className="absolute w-1.5 h-1.5 bg-white rounded-full" style={{ right: "31%", top: "36%" }} />

      {/* Nose */}
      <div className="absolute w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-pink-400"
        style={{ left: "50%", top: "54%", transform: "translateX(-50%)" }} />

      {/* Mouth */}
      <div className="absolute" style={{ left: "50%", top: "62%", transform: "translateX(-50%)", width: 14 }}>
        <svg width="14" height="7" viewBox="0 0 14 7" fill="none">
          <path d={excited ? "M0 0 Q3.5 7 7 3 Q10.5 7 14 0" : "M0 2 Q3.5 7 7 4 Q10.5 7 14 2"} stroke="black" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      {/* Cheeks */}
      <div className="absolute w-3 h-1.5 bg-pink-300/70 rounded-full" style={{ left: "8%", top: "56%" }} />
      <div className="absolute w-3 h-1.5 bg-pink-300/70 rounded-full" style={{ right: "8%", top: "56%" }} />

      {/* Whiskers left */}
      <div className="absolute bg-gray-600/60 rounded-full" style={{ width: 10, height: 1, left: "-14%", top: "52%" }} />
      <div className="absolute bg-gray-600/60 rounded-full" style={{ width: 10, height: 1, left: "-14%", top: "57%", transform: "rotate(8deg)" }} />
      {/* Whiskers right */}
      <div className="absolute bg-gray-600/60 rounded-full" style={{ width: 10, height: 1, right: "-14%", top: "52%" }} />
      <div className="absolute bg-gray-600/60 rounded-full" style={{ width: 10, height: 1, right: "-14%", top: "57%", transform: "rotate(-8deg)" }} />

      {/* Sparkles when excited */}
      <AnimatePresence>
        {excited && (
          <>
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-1 -right-2 text-[10px]"
            >✨</motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.1 }}
              className="absolute -top-3 left-0 text-[10px]"
            >✨</motion.span>
          </>
        )}
      </AnimatePresence>
    </div>
  )
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
      {/* outer wrapper with overflow-visible so mascot isn't clipped */}
      <div className="relative pt-14">
        <motion.div
          className="flex items-center gap-1 bg-black/50 border border-white/10 backdrop-blur-lg py-2 px-2 rounded-full shadow-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {items.map((item) => {
            const Icon = item.icon
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
                  "relative cursor-pointer text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300",
                  "text-white/70 hover:text-white",
                  isActive && "text-white"
                )}
              >
                {/* Active glow */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.03, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 bg-primary/25 rounded-full blur-md" />
                    <div className="absolute inset-[-4px] bg-primary/20 rounded-full blur-xl" />
                    <div className="absolute inset-[-8px] bg-primary/15 rounded-full blur-2xl" />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                      style={{ animation: "shine 3s ease-in-out infinite" }}
                    />
                  </motion.div>
                )}

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

                {/* Hover bg for inactive */}
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    />
                  )}
                </AnimatePresence>

                {/* Cat mascot floats above active tab */}
                {isActive && (
                  <motion.div
                    layoutId="cat-mascot"
                    className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{ bottom: "calc(100% + 10px)" }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <motion.div
                      animate={
                        hoveredTab
                          ? { rotate: [-5, 5, -3, 0], scale: [1, 1.08, 1], transition: { duration: 0.4 } }
                          : { y: [0, -4, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }
                      }
                    >
                      <CatMascot excited={!!hoveredTab} />
                    </motion.div>
                    {/* Drop shadow / pointer triangle */}
                    <div className="flex justify-center mt-0.5">
                      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-white/80" />
                    </div>
                  </motion.div>
                )}
              </Link>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
