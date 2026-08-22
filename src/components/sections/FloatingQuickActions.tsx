"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { Phone, MessageSquare, X, Sparkles, Calendar, Calculator } from "lucide-react"
import { SHOP } from "@/lib/data/content"
import { cn } from "@/lib/utils"

/**
 * FloatingQuickActions — a floating action button (FAB) cluster
 * anchored bottom-right. Expands to reveal WhatsApp, Call, Book, Estimate.
 */
export function FloatingQuickActions() {
  const [open, setOpen] = React.useState(false)

  const actions = [
    {
      label: "Call us",
      icon: Phone,
      href: `tel:${SHOP.phone.replace(/\s/g, "")}`,
      color: "var(--paint-coral)",
      external: false,
    },
    {
      label: "WhatsApp",
      icon: MessageSquare,
      href: `https://wa.me/${SHOP.whatsapp.replace(/[^0-9]/g, "")}`,
      color: "#25D366",
      external: true,
    },
    {
      label: "Book visit",
      icon: Calendar,
      href: "#contact",
      color: "var(--paint-saffron)",
      external: false,
    },
    {
      label: "Estimate cost",
      icon: Calculator,
      href: "#calculator",
      color: "var(--paint-teal)",
      external: false,
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {/* Expanded actions */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-end gap-2 pointer-events-auto"
          >
            {actions.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2"
              >
                <span className="rounded-full glass border border-border/60 px-3 py-1.5 text-xs font-semibold shadow-card">
                  {a.label}
                </span>
                <a
                  href={a.href}
                  target={a.external ? "_blank" : undefined}
                  rel={a.external ? "noopener noreferrer" : undefined}
                  aria-label={a.label}
                  className="h-12 w-12 rounded-full grid place-items-center shadow-warm hover:scale-110 transition-transform"
                  style={{ background: a.color }}
                >
                  <a.icon className="h-5 w-5 text-white" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="pointer-events-auto relative h-14 w-14 rounded-full paint-gradient grid place-items-center shadow-warm"
        aria-label={open ? "Close quick actions" : "Open quick actions"}
      >
        {/* Pulse rings */}
        {!open && (
          <>
            <span className="absolute inset-0 rounded-full paint-gradient animate-pulse-ring" />
            <span className="absolute inset-0 rounded-full paint-gradient animate-pulse-ring" style={{ animationDelay: "0.8s" }} />
          </>
        )}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6 text-white" />
            </motion.span>
          ) : (
            <motion.span key="spark" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Sparkles className="h-6 w-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

/**
 * ScrollProgressBar — slim paint-gradient progress bar at top of viewport
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 paint-gradient z-[60] origin-left"
    />
  )
}
