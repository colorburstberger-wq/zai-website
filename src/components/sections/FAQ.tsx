"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, HelpCircle } from "lucide-react"
import { Reveal, SectionHeading } from "@/components/motion/primitives"
import { FloatingSwatches } from "@/components/sections/FloatingSwatches"
import { FAQS } from "@/lib/data/content"

export function FAQ() {
  const [open, setOpen] = React.useState<number | null>(0)

  return (
    <section id="faq" className="relative py-20 sm:py-28 overflow-hidden">
      <FloatingSwatches />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Good to know"
          title={
            <>
              Frequently asked <span className="text-gradient-warm">questions.</span>
            </>
          }
          description="Still curious? Call us at +91 98765 43210 — a real human picks up."
        />

        <div className="mt-12 flex flex-col gap-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`rounded-2xl border bg-card overflow-hidden transition-shadow ${
                  isOpen ? "border-primary/50 shadow-warm" : "border-border/60 shadow-card"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <div className={`h-10 w-10 rounded-xl grid place-items-center shrink-0 transition-colors ${
                    isOpen ? "paint-gradient text-white" : "bg-secondary text-primary"
                  }`}>
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <span className="flex-1 font-display text-base sm:text-lg font-semibold">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className={`h-8 w-8 grid place-items-center rounded-full shrink-0 transition-colors ${
                      isOpen ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 pl-19 text-muted-foreground text-pretty">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
