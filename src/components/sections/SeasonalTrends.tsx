"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Sun, Leaf, Snowflake, Cloud, ArrowRight, TrendingUp } from "lucide-react"
import { Reveal, SectionHeading, Magnetic } from "@/components/motion/primitives"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SeasonalPalette {
  season: string
  icon: typeof Sun
  accent: string
  tagline: string
  description: string
  colors: { name: string; hex: string; mood: string }[]
  trending: string
}

const SEASONS: SeasonalPalette[] = [
  {
    season: "Spring",
    icon: Leaf,
    accent: "#8FA68E",
    tagline: "Fresh & renewing",
    description: "Soft sages, blush pinks and ivory tones that mirror new blooms. Perfect for bedrooms and reading nooks.",
    colors: [
      { name: "Sage Garden", hex: "#8FA68E", mood: "Calm" },
      { name: "Blush Petal", hex: "#E8C5C5", mood: "Soft" },
      { name: "Ivory Cream", hex: "#F4E9D6", mood: "Airy" },
      { name: "Spring Bloom", hex: "#D98C8C", mood: "Gentle" },
    ],
    trending: "↑ 32% this season",
  },
  {
    season: "Summer",
    icon: Sun,
    accent: "#7A2411",
    tagline: "Warm & vibrant",
    description: "Saffron, mustard and terracotta that capture the Indian summer sun. Energising for living and dining rooms.",
    colors: [
      { name: "Brunette", hex: "#977A6E", code: "8D2554", mood: "Bold" },
      { name: "Mowed Lawn", hex: "#7B723E", code: "7A2411", mood: "Warm" },
      { name: "Fuji Apple", hex: "#EDDB78", code: "4T2863", mood: "Bright" },
      { name: "Garden Escape", hex: "#B2D6CE", code: "7T1459", mood: "Natural" },
    ],
    trending: "↑ 45% this season",
  },
  {
    season: "Monsoon",
    icon: Cloud,
    accent: "#4C8C8C",
    tagline: "Moody & restful",
    description: "Deep teals, slate and forest tones that echo rain-washed evenings. Ideal for studies and cozy corners.",
    colors: [
      { name: "Teal Lagoon", hex: "#4C8C8C", mood: "Cool" },
      { name: "Charcoal Slate", hex: "#3B3A36", mood: "Moody" },
      { name: "Forest Pine", hex: "#3F5C3A", mood: "Deep" },
      { name: "Ocean Mist", hex: "#7BA7BC", mood: "Restful" },
    ],
    trending: "↑ 28% this season",
  },
  {
    season: "Winter",
    icon: Snowflake,
    accent: "#858784",
    tagline: "Cozy & grounding",
    description: "Clay, cinnamon and warm rust tones that wrap you in warmth. Beautiful for full-home interiors.",
    colors: [
      { name: "Brunette", hex: "#977A6E", code: "8D2554", mood: "Warm" },
      { name: "Mowed Lawn", hex: "#7B723E", code: "7A2411", mood: "Earthy" },
      { name: "Spring Banquet", hex: "#CEE4E1", code: "7P1449", mood: "Cozy" },
      { name: "Calm Seas", hex: "#AED4D3", code: "7T1443", mood: "Grounded" },
    ],
    trending: "↑ 38% this season",
  },
]

export function SeasonalTrends() {
  const [active, setActive] = React.useState(1) // Start with Summer (current season)
  const season = SEASONS[active]

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-secondary/30">
      {/* Decorative seasonal blob */}
      <motion.div
        key={`blob-${active}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: season.accent }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Colour trends by season"
          title={
            <>
              The palette of <span className="text-gradient-warm">every season.</span>
            </>
          }
          description="Our colour consultants track what's trending across Gorakhpur homes. Switch seasons to see this year's most-requested shades."
        />

        {/* Season switcher */}
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {SEASONS.map((s, i) => {
              const Icon = s.icon
              return (
                <button
                  key={s.season}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group rounded-full px-4 py-2.5 text-sm font-medium border transition flex items-center gap-2",
                    active === i
                      ? "text-white border-transparent shadow-warm"
                      : "bg-card border-border/60 hover:border-primary/40"
                  )}
                  style={active === i ? { background: s.accent } : undefined}
                >
                  <Icon className={cn("h-4 w-4 transition-transform", active === i && "scale-110")} />
                  {s.season}
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Active season content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={season.season}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 grid lg:grid-cols-12 gap-6"
          >
            {/* Left: season info */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div
                className="relative rounded-3xl p-6 sm:p-8 text-white overflow-hidden shadow-card"
                style={{ background: `linear-gradient(135deg, ${season.accent}, ${season.accent}cc 60%, ${season.accent}99)` }}
              >
                <div className="absolute inset-0 bg-noise opacity-15" />
                {/* Big season icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                  className="absolute -bottom-6 -right-6 opacity-20"
                >
                  <season.icon className="h-48 w-48" strokeWidth={1} />
                </motion.div>

                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur grid place-items-center">
                      <season.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="rounded-full bg-white/20 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
                      {season.season} Collection
                    </span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold">
                    {season.tagline}
                  </h3>
                  <p className="text-white/90 text-sm mt-2 text-pretty max-w-sm">
                    {season.description}
                  </p>

                  {/* Trending badge */}
                  <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1.5 text-xs font-semibold">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {season.trending}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-2xl paint-gradient text-white border-0 shadow-warm hover:opacity-90"
                >
                  <a href="#contact">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Book a {season.season.toLowerCase()} colour consult
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </Magnetic>
            </div>

            {/* Right: color grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {season.colors.map((c, i) => (
                  <motion.div
                    key={c.hex}
                    initial={{ opacity: 0, scale: 0.85, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 200, damping: 18 }}
                    whileHover={{ y: -6 }}
                    className="group relative rounded-2xl overflow-hidden border border-border/60 bg-card shadow-card hover:shadow-warm transition-shadow"
                  >
                    {/* Color block */}
                    <div
                      className="relative h-28 sm:h-32 overflow-hidden"
                      style={{ background: c.hex }}
                    >
                      <div className="absolute inset-0 bg-noise opacity-15 mix-blend-overlay" />
                      {/* Hover sheen */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {/* Mood badge */}
                      <span className="absolute top-2.5 right-2.5 rounded-full glass border border-white/30 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
                        {c.mood}
                      </span>
                    </div>
                    {/* Info */}
                    <div className="p-3">
                      <p className="font-display text-sm font-bold truncate">{c.name}</p>
                      <p className="text-[11px] text-muted-foreground font-mono mt-0.5">{c.hex}</p>
                    </div>
                    {/* Bottom shine */}
                    <div
                      className="absolute bottom-0 inset-x-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      style={{ background: c.hex }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Tip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 rounded-2xl border border-border/60 bg-card p-4 flex items-start gap-3"
              >
                <div
                  className="h-9 w-9 rounded-xl grid place-items-center shrink-0"
                  style={{ background: `${season.accent}22` }}
                >
                  <Sparkles className="h-4 w-4" style={{ color: season.accent }} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
                    Stylist tip
                  </p>
                  <p className="text-sm mt-0.5 text-pretty">
                    Pair any {season.season.toLowerCase()} shade with ivory trim and warm wood furniture
                    for a balanced, timeless look.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
