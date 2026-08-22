"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * PageLoader — a paint-splash reveal loader shown on first page load.
 * - Shows a paint roller SVG that "paints" a stroke across the screen
 * - Then reveals the page with a splash wipe
 * - Auto-hides after ~2.2s or on window load (whichever is later)
 * - Only shows on first mount (sessionStorage-guarded so it doesn't annoy on every route change)
 */
export function PageLoader() {
  const [show, setShow] = React.useState(true)
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    // Only show loader on first visit per session
    if (typeof window === "undefined") return
    const seen = sessionStorage.getItem("chroma-loader-seen")
    if (seen) {
      setShow(false)
      return
    }

    // Animate progress 0 → 100 over ~1.6s
    const start = performance.now()
    const duration = 1600
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(((now - start) / duration) * 100, 100)
      setProgress(p)
      if (p < 100) raf = requestAnimationFrame(tick)
      else {
        // Brief delay then hide
        setTimeout(() => {
          setShow(false)
          sessionStorage.setItem("chroma-loader-seen", "1")
        }, 500)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
        >
          {/* Animated paint stroke sweeping across */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ ease: "easeOut", duration: 0.1 }}
            className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 origin-left paint-gradient"
            style={{ transformOrigin: "left center" }}
          />

          <div className="relative flex flex-col items-center gap-6">
            {/* Roller SVG */}
            <motion.div
              animate={{ x: [-180, 180, -180], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                {/* Roller handle */}
                <rect x="36" y="38" width="8" height="28" rx="2" fill="var(--paint-clay)" />
                <rect x="30" y="64" width="20" height="6" rx="2" fill="var(--paint-clay)" />
                {/* Roller body */}
                <rect x="8" y="20" width="56" height="20" rx="4" fill="url(#roller-grad)" />
                {/* Roller texture lines */}
                <line x1="16" y1="20" x2="16" y2="40" stroke="white" strokeWidth="1" opacity="0.4" />
                <line x1="24" y1="20" x2="24" y2="40" stroke="white" strokeWidth="1" opacity="0.4" />
                <line x1="32" y1="20" x2="32" y2="40" stroke="white" strokeWidth="1" opacity="0.4" />
                <line x1="40" y1="20" x2="40" y2="40" stroke="white" strokeWidth="1" opacity="0.4" />
                <line x1="48" y1="20" x2="48" y2="40" stroke="white" strokeWidth="1" opacity="0.4" />
                <line x1="56" y1="20" x2="56" y2="40" stroke="white" strokeWidth="1" opacity="0.4" />
                <defs>
                  <linearGradient id="roller-grad" x1="8" y1="20" x2="64" y2="40">
                    <stop offset="0%" stopColor="var(--paint-coral)" />
                    <stop offset="50%" stopColor="var(--paint-saffron)" />
                    <stop offset="100%" stopColor="var(--paint-mustard)" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <p className="font-display text-2xl font-bold">
                Chroma <span className="text-gradient-warm">House</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">
                Paints & Décor Studio
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 h-1 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full paint-gradient origin-left"
                style={{ scaleX: progress / 100 }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground tabular-nums">
              {Math.round(progress)}%
            </p>

            {/* Decorative paint splashes */}
            {[
              { color: "var(--paint-coral)", x: -120, y: -60, size: 24, delay: 0 },
              { color: "var(--paint-saffron)", x: 140, y: 40, size: 18, delay: 0.2 },
              { color: "var(--paint-sage)", x: -90, y: 80, size: 16, delay: 0.4 },
              { color: "var(--paint-rose)", x: 100, y: -80, size: 20, delay: 0.6 },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  background: s.color,
                  width: s.size,
                  height: s.size,
                  left: `calc(50% + ${s.x}px)`,
                  top: `calc(50% + ${s.y}px)`,
                }}
                animate={{
                  scale: [0, 1.2, 1, 0.8],
                  opacity: [0, 0.8, 0.6, 0],
                }}
                transition={{
                  duration: 1.4,
                  delay: s.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
