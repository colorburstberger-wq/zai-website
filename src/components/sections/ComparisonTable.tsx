"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check, X, Minus, Sparkles, Crown } from "lucide-react"
import { Reveal, SectionHeading } from "@/components/motion/primitives"
import { cn } from "@/lib/utils"

interface Row {
  feature: string
  chroma: string | boolean
  localPainter: string | boolean
  diy: string | boolean
  category?: string
}

const ROWS: Row[] = [
  { feature: "Authorised Berger & Asian Paints dealer", chroma: true, localPainter: false, diy: false },
  { feature: "Certified colour consultants", chroma: true, localPainter: false, diy: false },
  { feature: "Trained in-house crew (no sub-contractors)", chroma: true, localPainter: false, diy: false },
  { feature: "Free on-site colour consultation", chroma: true, localPainter: "Sometimes", diy: false },
  { feature: "Computerised colour matching", chroma: true, localPainter: false, diy: false },
  { feature: "Up to 10-year written warranty", chroma: true, localPainter: false, diy: false },
  { feature: "Dust-free site promise (masking & covers)", chroma: true, localPainter: false, diy: "Maybe" },
  { feature: "Written delivery date commitment", chroma: true, localPainter: false, diy: false },
  { feature: "Premium texture & Italian stucco", chroma: true, localPainter: "Rare", diy: false },
  { feature: "Manufacturer-direct genuine products", chroma: true, localPainter: "Mostly", diy: "Varies" },
  { feature: "Price-match guarantee", chroma: true, localPainter: false, diy: false },
  { feature: "Post-project clean-up & care guide", chroma: true, localPainter: "Basic", diy: false },
]

type Cell = boolean | string

function CellRenderer({ value, accent }: { value: Cell; accent?: boolean }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <div className={cn(
          "h-7 w-7 rounded-full grid place-items-center",
          accent ? "bg-primary text-primary-foreground shadow-warm" : "bg-paint-sage/15 text-paint-sage"
        )}>
          <Check className="h-4 w-4" strokeWidth={3} />
        </div>
      </div>
    )
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <div className="h-7 w-7 rounded-full bg-destructive/10 grid place-items-center text-destructive">
          <X className="h-3.5 w-3.5" strokeWidth={3} />
        </div>
      </div>
    )
  }
  return (
    <div className="flex justify-center">
      <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground inline-flex items-center gap-1">
        <Minus className="h-3 w-3" />
        {value}
      </span>
    </div>
  )
}

export function ComparisonTable() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Why choose us"
          title={
            <>
              The Berger difference, <span className="text-gradient-warm">side by side.</span>
            </>
          }
          description="A frank comparison of what you get with our Berger Urban Exclusive Paints Store vs a typical local painter vs DIY."
        />

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-x-auto scrollbar-thin rounded-3xl border border-border/60 bg-card shadow-card">
            <table className="w-full min-w-[680px] border-collapse">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="text-left p-4 sm:p-6 sticky left-0 bg-card z-10 min-w-[260px]">
                    <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      Compare features
                    </span>
                  </th>
                  {/* Berger Urban Exclusive column */}
                  <th className="p-4 sm:p-6 relative">
                    <div className="absolute -top-px left-0 right-0 h-1 paint-gradient" />
                    <div className="flex flex-col items-center gap-1">
                      <span className="inline-flex items-center gap-1 rounded-full paint-gradient px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        <Crown className="h-3 w-3" />
                        Recommended
                      </span>
                      <span className="font-display text-base sm:text-lg font-bold mt-1">
                        Berger Urban Exclusive
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Berger Urban Exclusive · Gorakhpur
                      </span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-6">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-display text-base font-bold">Local painter</span>
                      <span className="text-[10px] text-muted-foreground">Typical crew</span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-6">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-display text-base font-bold">DIY</span>
                      <span className="text-[10px] text-muted-foreground">Self-paint</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <motion.tr
                    key={r.feature}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.3, delay: (i % 4) * 0.04 }}
                    className={cn(
                      "border-b border-border/40 transition-colors",
                      "hover:bg-secondary/40"
                    )}
                  >
                    <td className="p-4 sm:p-5 sticky left-0 bg-card z-10 text-sm font-medium">
                      {r.feature}
                    </td>
                    <td className="p-4 sm:p-5 bg-primary/5">
                      <CellRenderer value={r.chroma} accent />
                    </td>
                    <td className="p-4 sm:p-5">
                      <CellRenderer value={r.localPainter} />
                    </td>
                    <td className="p-4 sm:p-5">
                      <CellRenderer value={r.diy} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-paint-sage" />
              Included as standard
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-secondary border border-border" />
              Sometimes / varies
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-destructive/30" />
              Not available
            </span>
            <span className="flex items-center gap-1.5 text-foreground font-semibold">
              <Sparkles className="h-3 w-3 text-paint-saffron" />
              12 standards our store meets that others don&apos;t
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
