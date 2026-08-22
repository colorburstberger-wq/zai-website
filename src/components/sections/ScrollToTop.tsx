"use client"

import * as React from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { Magnetic } from "@/components/motion/primitives"

export function ScrollToTop() {
  const [show, setShow] = React.useState(false)
  const { scrollYProgress } = useScroll()
  const [progress, setProgress] = React.useState(0)

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v)
    setShow(v > 0.08)
  })

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-50 h-12 w-12 grid place-items-center"
          aria-label="Scroll to top"
        >
          <Magnetic strength={0.2}>
            <div className="relative h-12 w-12 grid place-items-center">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
                <circle
                  cx="24" cy="24" r="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-border"
                />
                <motion.circle
                  cx="24" cy="24" r="22"
                  fill="none"
                  stroke="var(--paint-coral)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  pathLength={1}
                  style={{ pathLength: progress }}
                />
              </svg>
              <div className="h-10 w-10 rounded-full paint-gradient grid place-items-center shadow-warm">
                <ArrowUp className="h-4 w-4 text-white" />
              </div>
            </div>
          </Magnetic>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
