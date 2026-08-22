"use client"

import * as React from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Sparkles, Phone, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SHOP } from "@/lib/data/content"

/**
 * StickyCTA — a slim banner that slides in from the bottom after scrolling
 * past the Hero. Auto-hides when the Contact section is in view.
 * - Dismissible with X button (sessionStorage)
 * - Includes phone + free consultation CTA
 */
export function StickyCTA() {
  const [show, setShow] = React.useState(false)
  const [dismissed, setDismissed] = React.useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const lastY = React.useRef(0)

  useMotionValueEvent(scrollY, "change", (v) => {
    if (dismissed) return
    // Show after scrolling past 1.5 screens
    if (v > 900 && v < lastY.current - 2) {
      // scrolling up — hide
      setShow(false)
    } else if (v > 900) {
      setShow(true)
    } else {
      setShow(false)
    }
    lastY.current = v
  })

  // Also hide when near the contact section (bottom of page)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.88) setShow(false)
  })

  const dismiss = () => {
    setDismissed(true)
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && !dismissed && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 26 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-3rem)] max-w-2xl"
        >
          <div className="relative rounded-2xl paint-gradient text-white shadow-2xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-15" />
            <button
              onClick={dismiss}
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 grid place-items-center transition"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative flex items-center gap-3 p-3 sm:p-4">
              {/* Icon */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-white/20 backdrop-blur grid place-items-center shrink-0"
              >
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </motion.div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="font-display text-sm sm:text-base font-bold leading-tight">
                  Free on-site colour consultation
                </p>
                <p className="text-[11px] sm:text-xs text-white/80 mt-0.5">
                  Limited slots this month · No obligation · 45-min visit
                </p>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`tel:${SHOP.phone.replace(/\s/g, "")}`}
                  className="hidden sm:grid h-10 w-10 rounded-xl bg-white/20 backdrop-blur hover:bg-white/30 place-items-center transition"
                  aria-label="Call us"
                >
                  <Phone className="h-4 w-4" />
                </a>
                <Button
                  asChild
                  size="sm"
                  className="rounded-full bg-white text-primary border-0 hover:bg-white/90 shadow-lg h-9 sm:h-10 px-4"
                >
                  <a href="#contact" className="flex items-center gap-1">
                    Book now
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Shimmer sweep */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
              className="absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
