"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Droplet, Search, Palette, Sparkles, ArrowRight, Check,
  Eye, Wand2, Clock,
} from "lucide-react"
import { Reveal, SectionHeading, Magnetic } from "@/components/motion/primitives"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ColorBankShade {
  name: string
  hex: string
  collection: string
  popular: boolean
}

// Real Berger Color Bank popular shades
const COLOR_BANK_SHADES: ColorBankShade[] = [
  { name: "Crimson Glory", hex: "#9B1C2A", collection: "Berger Reds", popular: true },
  { name: "Royal Navy", hex: "#1E2A4A", collection: "Berger Blues", popular: true },
  { name: "Forest Whisper", hex: "#2D4A2D", collection: "Berger Greens", popular: false },
  { name: "Golden Aura", hex: "#D4A017", collection: "Berger Yellows", popular: true },
  { name: "Terracotta Touch", hex: "#C26B4A", collection: "Berger Earths", popular: true },
  { name: "Lavender Haze", hex: "#9B8AB8", collection: "Berger Pastels", popular: false },
  { name: "Coffee Break", hex: "#6B4423", collection: "Berger Earths", popular: false },
  { name: "Ocean Deep", hex: "#1A5A6A", collection: "Berger Blues", popular: true },
  { name: "Blush Pink", hex: "#E8B4B8", collection: "Berger Pastels", popular: true },
  { name: "Charcoal Steel", hex: "#3A3A3A", collection: "Berger Neutrals", popular: true },
  { name: "Saffron Spice", hex: "#E8943A", collection: "Berger Yellows", popular: false },
  { name: "Ivory Linen", hex: "#F0E8D4", collection: "Berger Neutrals", popular: true },
]

const COLLECTIONS = ["All", "Berger Reds", "Berger Blues", "Berger Greens", "Berger Yellows", "Berger Earths", "Berger Pastels", "Berger Neutrals"]

const PROCESS_STEPS = [
  {
    icon: Search,
    title: "Bring a sample",
    description: "Bring any swatch, fabric, photo or object — we scan its exact colour.",
  },
  {
    icon: Eye,
    title: "Spectrometer scan",
    description: "Our Berger Color Bank spectrometer reads the precise colour code in seconds.",
  },
  {
    icon: Droplet,
    title: "Custom mix",
    description: "We mix the exact shade on the spot using Berger base paints and colorants.",
  },
  {
    icon: Check,
    title: "Verify & take home",
    description: "We test a dab, verify the match, and you take home genuine Berger paint.",
  },
]

export function ColorBank() {
  const [activeCollection, setActiveCollection] = React.useState("All")
  const [selected, setSelected] = React.useState<ColorBankShade | null>(COLOR_BANK_SHADES[0])
  const [copied, setCopied] = React.useState(false)

  const filtered = React.useMemo(() => {
    if (activeCollection === "All") return COLOR_BANK_SHADES
    return COLOR_BANK_SHADES.filter((s) => s.collection === activeCollection)
  }, [activeCollection])

  const copyHex = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <section id="color-bank" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Decorative gradient mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 left-1/4 h-64 w-64 rounded-full bg-paint-coral/10 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 h-72 w-72 rounded-full bg-paint-saffron/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Berger Color Bank · Only at Urban Exclusive stores"
          title={
            <>
              Match <span className="text-gradient-warm">any shade</span> in minutes.
            </>
          }
          description="Our Berger Color Bank system lets us match any colour you bring — from a fabric swatch to a flower petal — and mix it on the spot. A service exclusive to Berger Urban Exclusive Stores."
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-6">
          {/* Left: Process steps */}
          <Reveal className="lg:col-span-5" delay={0.05}>
            <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 shadow-card">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-10 w-10 rounded-xl paint-gradient grid place-items-center">
                  <Wand2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold">How it works</h3>
                  <p className="text-[11px] text-muted-foreground">4 simple steps · ~15 minutes</p>
                </div>
              </div>

              <div className="space-y-4">
                {PROCESS_STEPS.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="relative shrink-0">
                      <div className="h-9 w-9 rounded-xl bg-secondary grid place-items-center">
                        <step.icon className="h-4 w-4 text-primary" />
                      </div>
                      {i < PROCESS_STEPS.length - 1 && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-9 bottom-[-16px] w-px bg-border/60" />
                      )}
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-xs font-bold text-muted-foreground tabular-nums">0{i + 1}</span>
                        <p className="font-semibold text-sm">{step.title}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 text-pretty">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-border/60 flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span>Average turnaround: <strong className="text-foreground">15 minutes</strong></span>
              </div>

              <Magnetic className="block mt-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-2xl paint-gradient text-white border-0 shadow-warm hover:opacity-90"
                >
                  <a href="#contact">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Visit store with your sample
                  </a>
                </Button>
              </Magnetic>
            </div>
          </Reveal>

          {/* Right: Shade showcase */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border/60 bg-card shadow-card overflow-hidden">
                {/* Selected shade preview */}
                <div className="relative h-40 overflow-hidden" style={{ background: selected?.hex }}>
                  <div className="absolute inset-0 bg-noise opacity-15 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/80">
                        {selected?.collection}
                      </p>
                      <p className="font-display text-2xl font-bold text-white drop-shadow">
                        {selected?.name}
                      </p>
                      <button
                        onClick={() => selected && copyHex(selected.hex)}
                        className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-2.5 py-1 text-[11px] font-mono font-semibold text-white hover:bg-white/30 transition"
                      >
                        {copied ? <Check className="h-3 w-3" /> : <Palette className="h-3 w-3" />}
                        {selected?.hex}
                      </button>
                    </div>
                    {selected?.popular && (
                      <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground">
                        ★ Popular
                      </span>
                    )}
                  </div>
                </div>

                {/* Collection filter */}
                <div className="p-4 border-b border-border/60">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
                      Browse Berger Color Bank shades
                    </p>
                    <span className="text-[10px] text-muted-foreground">{filtered.length} shades</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {COLLECTIONS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setActiveCollection(c)}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[11px] font-medium border transition",
                          activeCollection === c
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border/60 hover:border-primary/40"
                        )}
                      >
                        {c.replace("Berger ", "")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shade grid */}
                <div className="p-4 grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-64 overflow-y-auto scrollbar-thin">
                  {filtered.map((shade, i) => (
                    <motion.button
                      key={shade.name}
                      onClick={() => setSelected(shade)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ y: -3 }}
                      className={cn(
                        "group relative rounded-xl overflow-hidden border-2 transition",
                        selected?.name === shade.name
                          ? "border-foreground scale-105"
                          : "border-transparent hover:border-border"
                      )}
                    >
                      <div className="h-12 sm:h-14" style={{ background: shade.hex }} />
                      <div className="p-1.5 bg-card">
                        <p className="text-[9px] font-semibold truncate leading-tight">{shade.name}</p>
                        <p className="text-[8px] text-muted-foreground font-mono">{shade.hex}</p>
                      </div>
                      {shade.popular && (
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-paint-saffron shadow-sm" />
                      )}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 border-t border-border/60 bg-secondary/30">
                  <p className="text-xs text-muted-foreground text-center">
                    <Sparkles className="inline h-3 w-3 mr-1 text-paint-saffron" />
                    These are just a sample — over <strong className="text-foreground">5,000+ shades</strong> available
                    on request. Bring any colour, we&apos;ll match it.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom feature strip */}
        <Reveal delay={0.15}>
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              { icon: Droplet, title: "Genuine Berger base", desc: "All custom shades use authentic Berger base paints + colorants" },
              { icon: Clock, title: "15-minute turnaround", desc: "Most shades mixed and ready while you wait" },
              { icon: Check, title: "Verified match", desc: "We dab-test every shade before you take it home" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border/60 bg-card p-4 flex items-center gap-3"
              >
                <div className="h-9 w-9 rounded-lg paint-gradient grid place-items-center shrink-0">
                  <f.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{f.title}</p>
                  <p className="text-[11px] text-muted-foreground text-pretty">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
