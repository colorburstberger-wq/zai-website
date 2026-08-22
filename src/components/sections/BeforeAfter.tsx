"use client"

import * as React from "react"
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import { MoveHorizontal, Sparkles, ArrowLeft, ArrowRight } from "lucide-react"
import { Reveal, SectionHeading, Magnetic } from "@/components/motion/primitives"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Pair {
  id: string
  title: string
  category: string
  before: string
  after: string
  description: string
  duration: string
  brand: string
}

const PAIRS: Pair[] = [
  {
    id: "living",
    title: "Living Room Refresh",
    category: "Interior",
    before: "/images/before-living.png",
    after: "/images/after-living.png",
    description:
      "Peeling cream walls transformed with a warm terracotta accent and Asian Paints Royale emulsion — finished in 4 days, dust-free.",
    duration: "4 days",
    brand: "Asian Paints Royale",
  },
  {
    id: "exterior",
    title: "Villa Exterior Restoration",
    category: "Exterior",
    before: "/images/before-exterior.png",
    after: "/images/after-exterior.png",
    description:
      "Weathered, algae-stained exterior brought back to life with Berger Weathercoat — 10-year warranty, monsoon-ready.",
    duration: "9 days",
    brand: "Berger Weathercoat",
  },
]

export function BeforeAfter() {
  const [active, setActive] = React.useState(0)
  const pair = PAIRS[active]

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-secondary/30">
      {/* Decorative blobs */}
      <div className="absolute -top-32 left-1/3 h-72 w-72 rounded-full bg-paint-coral/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-paint-saffron/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Drag to reveal"
          title={
            <>
              Before &amp; after, <span className="text-gradient-warm">live.</span>
            </>
          }
          description="Drag the slider handle to reveal the transformation. Real Chroma House projects — same room, fresh paint."
        />

        {/* Pair tabs */}
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {PAIRS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium border transition flex items-center gap-2",
                  active === i
                    ? "bg-primary text-primary-foreground border-primary shadow-warm"
                    : "bg-card border-border/60 hover:border-primary/50"
                )}
              >
                <span className="font-display font-bold">{p.category}</span>
                <span className="opacity-60">·</span>
                <span>{p.title}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          {/* Slider */}
          <Reveal className="lg:col-span-8" delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div
                key={pair.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
              >
                <ComparisonSlider
                  before={pair.before}
                  after={pair.after}
                  beforeLabel="Before"
                  afterLabel="After"
                />
              </motion.div>
            </AnimatePresence>
          </Reveal>

          {/* Info panel */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Reveal delay={0.15}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={pair.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="rounded-3xl border border-border/60 bg-card p-6 shadow-card"
                >
                  <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {pair.category} · {pair.duration}
                  </span>
                  <h3 className="font-display text-2xl font-bold mt-3">{pair.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground text-pretty">{pair.description}</p>

                  <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Painted with</p>
                      <p className="font-display font-bold text-sm">{pair.brand}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Sparkles className="h-4 w-4 text-paint-saffron" />
                      <span className="text-xs font-semibold text-paint-sage">Verified project</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-3xl paint-gradient p-6 text-white shadow-warm relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-15" />
                <div className="relative">
                  <p className="text-[11px] uppercase tracking-widest text-white/80">
                    Want a transformation like this?
                  </p>
                  <h4 className="font-display text-xl font-bold mt-1">
                    Book a free on-site visit today.
                  </h4>
                  <p className="text-sm text-white/90 mt-1">
                    Our colour expert will visit, measure & quote — no obligation.
                  </p>
                  <Magnetic className="block mt-4">
                    <Button
                      asChild
                      size="sm"
                      className="rounded-full bg-white text-primary border-0 hover:bg-white/90"
                    >
                      <a href="#contact">Book free visit</a>
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function ComparisonSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
}: {
  before: string
  after: string
  beforeLabel: string
  afterLabel: string
}) {
  const [pos, setPos] = React.useState(50)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const dragging = React.useRef(false)

  const update = (clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const p = ((clientX - r.left) / r.width) * 100
    setPos(Math.max(0, Math.min(100, p)))
  }

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    update(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    update(e.clientX)
  }
  const onPointerUp = () => {
    dragging.current = false
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border-4 border-card shadow-card select-none cursor-ew-resize touch-none"
    >
      {/* After (full) */}
      <img
        src={after}
        alt="After Chroma House painting"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        draggable={false}
      />
      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${pos}%` }}
      >
        <img
          src={before}
          alt="Before Chroma House painting"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }}
          draggable={false}
        />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 rounded-full bg-black/65 backdrop-blur px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white border border-white/20">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 rounded-full paint-gradient px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white shadow-warm">
        {afterLabel}
      </div>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="h-full w-0.5 bg-white shadow-lg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-warm grid place-items-center border-2 border-primary">
          <MoveHorizontal className="h-5 w-5 text-primary" />
        </div>
        {/* Direction arrows */}
        <ArrowLeft className="absolute top-1/2 -left-7 -translate-y-1/2 h-4 w-4 text-white drop-shadow" />
        <ArrowRight className="absolute top-1/2 -right-7 -translate-y-1/2 h-4 w-4 text-white drop-shadow" />
      </div>

      {/* Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/65 backdrop-blur px-3 py-1.5 text-[11px] font-medium text-white border border-white/20"
      >
        ← Drag to compare →
      </motion.div>
    </div>
  )
}
