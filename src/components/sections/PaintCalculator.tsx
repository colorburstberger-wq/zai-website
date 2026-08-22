"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calculator, Plus, Minus, RefreshCw, Sparkles, ArrowRight,
  Home, Building2, Brush, Droplets, Frame, ChevronRight, Check,
} from "lucide-react"
import { Reveal, SectionHeading, Magnetic, Counter } from "@/components/motion/primitives"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ServiceKey = "interior" | "exterior" | "texture" | "waterproofing" | "wood"

interface ServiceOption {
  key: ServiceKey
  label: string
  icon: typeof Home
  perSqft: number
  unit: string
  minArea: number
  color: string
  desc: string
}

const SERVICES_OPTS: ServiceOption[] = [
  { key: "interior", label: "Interior Painting", icon: Brush, perSqft: 14, unit: "sq ft", minArea: 100, color: "var(--paint-coral)", desc: "Premium emulsion, 2 coats + primer" },
  { key: "exterior", label: "Exterior Painting", icon: Building2, perSqft: 18, unit: "sq ft", minArea: 200, color: "var(--paint-mustard)", desc: "Weatherproof, UV resistant" },
  { key: "texture", label: "Texture / Designer", icon: Sparkles, perSqft: 65, unit: "sq ft", minArea: 50, color: "var(--paint-clay)", desc: "Italian stucco or metallic" },
  { key: "waterproofing", label: "Waterproofing", icon: Droplets, perSqft: 45, unit: "sq ft", minArea: 100, color: "var(--paint-teal)", desc: "7-yr crystalline system" },
  { key: "wood", label: "Wood / Metal Polish", icon: Frame, perSqft: 38, unit: "sq ft", minArea: 50, color: "var(--paint-rose)", desc: "PU / melamine spray finish" },
]

const ROOM_PRESETS = [
  { label: "1 BHK (≈ 1,200 sq ft)", value: 1200 },
  { label: "2 BHK (≈ 1,800 sq ft)", value: 1800 },
  { label: "3 BHK (≈ 2,800 sq ft)", value: 2800 },
  { label: "4 BHK / Villa (≈ 4,200 sq ft)", value: 4200 },
  { label: "Office (≈ 1,500 sq ft)", value: 1500 },
]

const formatINR = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN")

export function PaintCalculator() {
  const [area, setArea] = React.useState(1800)
  const [selected, setSelected] = React.useState<ServiceKey[]>(["interior"])
  const [coats, setCoats] = React.useState(2)
  const [furniture, setFurniture] = React.useState(false)
  const [scaffolding, setScaffolding] = React.useState(false)
  const [showResult, setShowResult] = React.useState(true)

  const toggle = (k: ServiceKey) => {
    setSelected((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]))
  }

  const calcLineItems = () => {
    return SERVICES_OPTS.filter((s) => selected.includes(s.key)).map((s) => {
      const effArea = s.key === "texture" ? Math.min(area, Math.max(area * 0.25, s.minArea)) : area
      const coatsMult = s.key === "texture" || s.key === "waterproofing" ? 1 : coats / 2
      const subtotal = effArea * s.perSqft * coatsMult
      return { ...s, effArea, subtotal }
    })
  }

  const items = calcLineItems()
  const paintCost = items.reduce((sum, i) => sum + i.subtotal, 0)
  const prepCost = paintCost * 0.18 // surface prep, putty, primer base
  const extras = (furniture ? Math.max(area * 4, 800) : 0) + (scaffolding ? Math.max(area * 3, 1500) : 0)
  const subtotal = paintCost + prepCost + extras
  const gst = subtotal * 0.18
  const total = subtotal + gst
  const perSqft = area > 0 ? total / area : 0

  const reset = () => {
    setArea(1800)
    setSelected(["interior"])
    setCoats(2)
    setFurniture(false)
    setScaffolding(false)
  }

  return (
    <section id="calculator" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Decorative paint splash */}
      <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-paint-saffron/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-paint-coral/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Instant estimate"
          title={
            <>
              Paint cost <span className="text-gradient-warm">calculator.</span>
            </>
          }
          description="Get a transparent ballpark estimate in seconds. Pick your services, area and add-ons — we'll do the maths. (Final quote confirmed on free site visit.)"
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-6">
          {/* Inputs */}
          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 shadow-card">
              {/* Area input */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Home className="h-4 w-4 text-primary" />
                    Paintable area
                  </label>
                  <span className="font-display text-2xl font-bold text-gradient-warm tabular-nums">
                    {area.toLocaleString("en-IN")} <span className="text-xs text-muted-foreground font-sans">sq ft</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={10000}
                  step={50}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-secondary accent-primary"
                  style={{
                    background: `linear-gradient(to right, var(--paint-coral) 0%, var(--paint-saffron) ${(area - 100) / 99}%, var(--secondary) ${(area - 100) / 99}%, var(--secondary) 100%)`,
                  }}
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {ROOM_PRESETS.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setArea(p.value)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs font-medium border transition",
                        area === p.value
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border/60 hover:border-primary/50"
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="mt-7">
                <label className="text-sm font-semibold flex items-center gap-2 mb-3">
                  <Brush className="h-4 w-4 text-primary" />
                  Services needed
                </label>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {SERVICES_OPTS.map((s) => {
                    const active = selected.includes(s.key)
                    return (
                      <motion.button
                        key={s.key}
                        type="button"
                        onClick={() => toggle(s.key)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className={cn(
                          "group flex items-start gap-3 rounded-2xl border p-3 text-left transition",
                          active
                            ? "border-primary/60 bg-primary/5 shadow-sm"
                            : "border-border/60 bg-background hover:border-primary/30"
                        )}
                      >
                        <div
                          className="h-9 w-9 rounded-xl grid place-items-center shrink-0 transition-transform group-hover:scale-110"
                          style={{ background: active ? s.color : "var(--secondary)" }}
                        >
                          <s.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="font-semibold text-sm">{s.label}</p>
                            {active && <Check className="h-3.5 w-3.5 text-primary" />}
                          </div>
                          <p className="text-[11px] text-muted-foreground truncate">{s.desc}</p>
                          <p className="text-xs mt-0.5">
                            <span className="font-semibold text-foreground">{formatINR(s.perSqft)}</span>
                            <span className="text-muted-foreground">/{s.unit}</span>
                          </p>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Coats */}
              <div className="mt-7">
                <label className="text-sm font-semibold flex items-center justify-between mb-3">
                  <span className="flex items-center gap-2">
                    <Brush className="h-4 w-4 text-primary" />
                    Number of coats
                  </span>
                  <span className="font-display text-lg font-bold tabular-nums">{coats}</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCoats((c) => Math.max(1, c - 1))}
                    className="h-10 w-10 rounded-full border border-border/60 grid place-items-center hover:bg-secondary transition disabled:opacity-40"
                    disabled={coats <= 1}
                    aria-label="Decrease coats"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="flex-1 grid grid-cols-4 gap-1.5">
                    {[1, 2, 3, 4].map((n) => (
                      <button
                        key={n}
                        onClick={() => setCoats(n)}
                        className={cn(
                          "h-10 rounded-xl text-sm font-semibold border transition",
                          coats === n
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border/60 hover:border-primary/40"
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCoats((c) => Math.min(4, c + 1))}
                    className="h-10 w-10 rounded-full border border-border/60 grid place-items-center hover:bg-secondary transition disabled:opacity-40"
                    disabled={coats >= 4}
                    aria-label="Increase coats"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add-ons */}
              <div className="mt-7 grid sm:grid-cols-2 gap-2.5">
                <AddonToggle
                  label="Furniture moving & covering"
                  hint="+ dust-free promise"
                  active={furniture}
                  onClick={() => setFurniture((v) => !v)}
                />
                <AddonToggle
                  label="Scaffolding (high ceilings / exterior)"
                  hint="for 2+ storeys"
                  active={scaffolding}
                  onClick={() => setScaffolding((v) => !v)}
                />
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={reset}
                  className="text-xs text-muted-foreground hover:text-primary transition flex items-center gap-1.5"
                >
                  <RefreshCw className="h-3 w-3" />
                  Reset
                </button>
                <span className="text-[11px] text-muted-foreground">
                  * Excludes tax. Final quote confirmed on site visit.
                </span>
              </div>
            </div>
          </Reveal>

          {/* Result panel */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="sticky top-24 rounded-3xl overflow-hidden border border-border/60 shadow-card bg-card">
                {/* Header */}
                <div className="relative p-6 paint-gradient text-white">
                  <div className="absolute inset-0 bg-noise opacity-15" />
                  <div className="relative flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-white/80 flex items-center gap-1.5">
                        <Calculator className="h-3 w-3" />
                        Estimated total
                      </p>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={Math.round(total)}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25 }}
                          className="font-display text-4xl sm:text-5xl font-bold mt-1 tabular-nums"
                        >
                          {formatINR(total)}
                        </motion.p>
                      </AnimatePresence>
                      <p className="text-xs text-white/80 mt-1">
                        ≈ <span className="font-semibold">{formatINR(perSqft)}</span> / sq ft · incl. 18% GST
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity }}
                      className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur grid place-items-center"
                    >
                      <Calculator className="h-7 w-7 text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="p-6 space-y-3">
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    Cost breakdown
                  </p>
                  <AnimatePresence initial={false} mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.key}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center justify-between text-sm py-1"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="h-2 w-2 rounded-full shrink-0" style={{ background: item.color }} />
                          <span className="truncate">{item.label}</span>
                          <span className="text-muted-foreground text-xs">×{item.effArea.toLocaleString("en-IN")} sq ft</span>
                        </div>
                        <span className="font-semibold tabular-nums">{formatINR(item.subtotal)}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {items.length === 0 && (
                    <p className="text-sm text-muted-foreground italic py-2">
                      Pick a service to see the breakdown.
                    </p>
                  )}

                  <div className="border-t border-border/60 my-2" />
                  <Row label="Surface preparation & primer" value={formatINR(prepCost)} muted />
                  {furniture && <Row label="Furniture moving & masking" value={formatINR(Math.max(area * 4, 800))} muted />}
                  {scaffolding && <Row label="Scaffolding" value={formatINR(Math.max(area * 3, 1500))} muted />}
                  <Row label="Subtotal" value={formatINR(subtotal)} bold />
                  <Row label="GST (18%)" value={formatINR(gst)} muted />
                  <div className="border-t border-border/60 my-2" />
                  <div className="flex items-center justify-between">
                    <span className="font-display text-base font-bold">Total</span>
                    <span className="font-display text-xl font-bold text-gradient-warm tabular-nums">
                      {formatINR(total)}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3">
                    <MiniStat label="Area" value={`${area.toLocaleString("en-IN")}`} unit="sq ft" />
                    <MiniStat label="Services" value={`${items.length}`} unit="selected" />
                    <MiniStat label="Coats" value={`${coats}`} unit="layers" />
                  </div>

                  <Magnetic className="block">
                    <Button
                      asChild
                      size="lg"
                      className="w-full mt-3 rounded-2xl paint-gradient text-white border-0 shadow-warm hover:opacity-90"
                    >
                      <a href="#contact">
                        Get exact quote
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </Magnetic>
                  <p className="text-center text-[11px] text-muted-foreground">
                    Free site visit · No obligation · 10-year warranty
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Row({
  label,
  value,
  bold,
  muted,
}: {
  label: string
  value: string
  bold?: boolean
  muted?: boolean
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={cn(muted ? "text-muted-foreground" : "text-foreground", bold && "font-semibold")}>
        {label}
      </span>
      <span className={cn("tabular-nums", bold ? "font-semibold" : muted ? "text-muted-foreground" : "")}>
        {value}
      </span>
    </div>
  )
}

function MiniStat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-xl bg-secondary/60 p-2.5 text-center">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-display text-sm font-bold mt-0.5">{value}</p>
      <p className="text-[10px] text-muted-foreground">{unit}</p>
    </div>
  )
}

function AddonToggle({
  label,
  hint,
  active,
  onClick,
}: {
  label: string
  hint: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-between gap-2 rounded-2xl border p-3 text-left transition",
        active
          ? "border-primary/60 bg-primary/5"
          : "border-border/60 bg-background hover:border-primary/30"
      )}
    >
      <div className="min-w-0">
        <p className="text-sm font-medium leading-tight">{label}</p>
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      </div>
      <span
        className={cn(
          "h-6 w-11 rounded-full relative transition-colors shrink-0",
          active ? "bg-primary" : "bg-secondary border border-border"
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow",
            active ? "right-0.5" : "left-0.5"
          )}
        />
      </span>
    </button>
  )
}
