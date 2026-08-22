"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Splash {
  id: number
  x: number
  y: number
  color: string
  size: number
  rotation: number
}

const COLORS = [
  "var(--paint-coral)",
  "var(--paint-saffron)",
  "var(--paint-mustard)",
  "var(--paint-sage)",
  "var(--paint-rose)",
  "var(--paint-teal)",
]

/**
 * ClickSplash — renders a paint splash at every click position.
 * - Desktop only (pointer: fine)
 * - Each splash is a random-colored SVG blob that scales up + fades out
 * - Max 12 simultaneous splashes (older ones removed)
 * - Splashes auto-remove after animation completes
 */
export function ClickSplash() {
  const [enabled, setEnabled] = React.useState(false)
  const [splashes, setSplashes] = React.useState<Splash[]>([])
  const idRef = React.useRef(0)

  React.useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)")
    if (!mq.matches) return
    setEnabled(true)

    const onClick = (e: MouseEvent) => {
      // Don't splash on form inputs or textareas
      const t = e.target as HTMLElement
      if (t.closest("input, textarea, select")) return

      const id = idRef.current++
      const color = COLORS[id % COLORS.length]
      const size = 60 + Math.random() * 40
      const rotation = Math.random() * 360

      setSplashes((prev) => [
        ...prev.slice(-11),
        { id, x: e.clientX, y: e.clientY, color, size, rotation },
      ])

      // Remove after animation
      setTimeout(() => {
        setSplashes((prev) => prev.filter((s) => s.id !== id))
      }, 900)
    }

    window.addEventListener("click", onClick)
    return () => window.removeEventListener("click", onClick)
  }, [])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9997] overflow-hidden">
      <AnimatePresence>
        {splashes.map((s) => (
          <motion.div
            key={s.id}
            initial={{ scale: 0, opacity: 0.9, rotate: s.rotation }}
            animate={{ scale: 1.6, opacity: 0, rotate: s.rotation + 30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute"
            style={{ left: s.x - s.size / 2, top: s.y - s.size / 2, width: s.size, height: s.size }}
          >
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              {/* Organic splash blob */}
              <path
                d="M 50 4
                   C 70 6, 90 20, 94 42
                   C 98 60, 88 80, 70 90
                   C 54 99, 36 96, 22 86
                   C 8 76, 2 58, 6 40
                   C 10 22, 28 2, 50 4 Z"
                fill={s.color}
                opacity="0.7"
              />
              {/* Inner darker blob */}
              <circle cx="50" cy="50" r="18" fill={s.color} opacity="0.9" />
              {/* Small droplets */}
              <circle cx="22" cy="22" r="4" fill={s.color} opacity="0.6" />
              <circle cx="78" cy="20" r="3" fill={s.color} opacity="0.5" />
              <circle cx="84" cy="76" r="5" fill={s.color} opacity="0.6" />
              <circle cx="18" cy="80" r="3.5" fill={s.color} opacity="0.5" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
