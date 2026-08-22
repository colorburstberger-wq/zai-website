"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

/**
 * PaintCursor — a custom cursor that follows the mouse with a paint-swirl trail.
 * - Desktop only (pointer: fine).
 * - Grows on hover over interactive elements (a, button, [role=button]).
 * - Renders a small paint roller SVG + a delayed trailing color blob.
 * - Hidden on touch devices to avoid interfering with mobile UX.
 */
export function PaintCursor() {
  const [enabled, setEnabled] = React.useState(false)
  const [hovering, setHovering] = React.useState(false)
  const [pressed, setPressed] = React.useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const trailX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 })
  const trailY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 })
  const swirlX = useSpring(x, { stiffness: 380, damping: 28 })
  const swirlY = useSpring(y, { stiffness: 380, damping: 28 })

  React.useEffect(() => {
    // Only enable on devices with fine pointer (mouse)
    const mq = window.matchMedia("(pointer: fine)")
    if (!mq.matches) return
    setEnabled(true)

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target as HTMLElement
      const interactive = !!t.closest("a, button, [role=button], input, textarea, select, label, [data-cursor]")
      setHovering(interactive)
    }
    const down = () => setPressed(true)
    const up = () => setPressed(false)
    const leave = () => {
      x.set(-100)
      y.set(-100)
    }

    window.addEventListener("mousemove", move)
    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup", up)
    document.addEventListener("mouseleave", leave)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup", up)
      document.removeEventListener("mouseleave", leave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* Inline styles to hide native cursor on desktop only */}
      <style>{`
        @media (pointer: fine) {
          body { cursor: none; }
          a, button, [role=button], input, textarea, select, label {
            cursor: none;
          }
        }
      `}</style>

      {/* Trailing color blob (delayed) */}
      <motion.div
        style={{ x: trailX, y: trailY }}
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
      >
        <motion.div
          animate={{
            scale: hovering ? 1.6 : pressed ? 0.7 : 1,
            opacity: hovering ? 0.35 : 0.18,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="-translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full paint-gradient blur-md"
        />
      </motion.div>

      {/* Paint swirl ring */}
      <motion.div
        style={{ x: swirlX, y: swirlY }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block mix-blend-multiply"
      >
        <motion.div
          animate={{
            rotate: hovering ? 90 : 0,
            scale: hovering ? 1.3 : pressed ? 0.85 : 1,
          }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
          className="-translate-x-1/2 -translate-y-1/2"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            {/* Outer ring */}
            <circle
              cx="16" cy="16" r="13"
              stroke="url(#cursor-grad)"
              strokeWidth="2"
              strokeDasharray="4 3"
              fill="none"
              opacity="0.7"
            />
            {/* Inner dot */}
            <circle cx="16" cy="16" r="3" fill="var(--paint-coral)" />
            <defs>
              <linearGradient id="cursor-grad" x1="0" y1="0" x2="32" y2="32">
                <stop offset="0%" stopColor="var(--paint-coral)" />
                <stop offset="50%" stopColor="var(--paint-saffron)" />
                <stop offset="100%" stopColor="var(--paint-mustard)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </motion.div>

      {/* Hover label */}
      <AnimatePresence>
        {hovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            style={{ x: swirlX, y: swirlY }}
            className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
          >
            <div className="translate-x-5 -translate-y-2 rounded-full bg-foreground text-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider shadow-warm">
              Tap
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
