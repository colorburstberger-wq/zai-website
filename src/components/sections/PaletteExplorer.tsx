"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Heart, Copy, Check, ArrowRight, Palette, Shuffle } from "lucide-react"
import { Reveal, SectionHeading, Magnetic } from "@/components/motion/primitives"
import { Button } from "@/components/ui/button"
import { PALETTE_SWATCHES } from "@/lib/data/content"
import { cn } from "@/lib/utils"

const CATEGORIES = ["All", "Warm", "Cool", "Soft", "Bold", "Neutral", "Calm"] as const
type Category = typeof CATEGORIES[number]

const ROOM_SUGGESTIONS: Record<string, string[]> = {
  Warm: ["Living room", "Dining room", "Entryway"],
  Cool: ["Bedroom", "Study", "Bathroom"],
  Soft: ["Master bedroom", "Nursery", "Reading nook"],
  Bold: ["Accent wall", "Office", "Powder room"],
  Neutral: ["Kitchen", "Hallway", "Whole home"],
  Calm: ["Bedroom", "Meditation space", "Yoga room"],
}

export function PaletteExplorer() {
  const [category, setCategory] = React.useState<Category>("All")
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set())
  const [copied, setCopied] = React.useState<string | null>(null)
  const [showFavorites, setShowFavorites] = React.useState(false)

  const filtered = React.useMemo(() => {
    if (showFavorites) return PALETTE_SWATCHES.filter((s) => favorites.has(s.hex))
    if (category === "All") return PALETTE_SWATCHES
    return PALETTE_SWATCHES.filter((s) => s.category === category)
  }, [category, showFavorites, favorites])

  const toggleFav = (hex: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(hex)) next.delete(hex)
      else next.add(hex)
      return next
    })
  }

  const copyHex = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(hex)
      setTimeout(() => setCopied(null), 1500)
    } catch {}
  }

  const randomize = () => {
    const cats = CATEGORIES.filter((c) => c !== "All")
    setCategory(cats[Math.floor(Math.random() * cats.length)])
  }

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Decorative gradient mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-paint-coral/10 blur-3xl" />
        <div className="absolute top-1/3 right-10 h-72 w-72 rounded-full bg-paint-saffron/10 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-paint-sage/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Curated colour library"
          title={
            <>
              Explore <span className="text-gradient-warm">16 signature shades.</span>
            </>
          }
          description="Browse our hand-curated palette by mood. Tap a swatch to copy its hex code, favourite your top picks, and bring them to your free colour consultation."
        />

        {/* Category filter + favorites toggle */}
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => { setCategory(c); setShowFavorites(false) }}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium border transition",
                  !showFavorites && category === c
                    ? "bg-primary text-primary-foreground border-primary shadow-warm"
                    : "bg-card border-border/60 hover:border-primary/50"
                )}
              >
                {c}
              </button>
            ))}
            <div className="h-6 w-px bg-border mx-1" />
            <button
              onClick={() => setShowFavorites((v) => !v)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium border transition flex items-center gap-1.5",
                showFavorites
                  ? "bg-paint-coral text-white border-paint-coral shadow-warm"
                  : "bg-card border-border/60 hover:border-primary/50"
              )}
            >
              <Heart className={cn("h-3.5 w-3.5", favorites.size > 0 && "fill-current")} />
              Saved {favorites.size > 0 && `(${favorites.size})`}
            </button>
            <button
              onClick={randomize}
              className="rounded-full h-9 w-9 grid place-items-center border border-border/60 bg-card hover:border-primary/50 transition"
              aria-label="Random mood"
            >
              <Shuffle className="h-3.5 w-3.5" />
            </button>
          </div>
        </Reveal>

        {/* Swatch grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => {
              const isFav = favorites.has(s.hex)
              const isCopied = copied === s.hex
              // Determine if color is light (for text contrast on swatch)
              const isLight = isLightColor(s.hex)
              return (
                <motion.div
                  layout
                  key={s.hex}
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.35, delay: (i % 4) * 0.04 }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-2xl overflow-hidden shadow-card border border-border/60 bg-card"
                >
                  {/* Color block */}
                  <div
                    className="relative h-32 sm:h-40 cursor-pointer overflow-hidden"
                    style={{ background: s.hex }}
                    onClick={() => copyHex(s.hex)}
                  >
                    {/* Subtle texture overlay */}
                    <div className="absolute inset-0 bg-noise opacity-15 mix-blend-overlay" />

                    {/* Favorite button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFav(s.hex) }}
                      className="absolute top-2.5 right-2.5 h-8 w-8 rounded-full grid place-items-center transition-all backdrop-blur-sm"
                      style={{
                        background: isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)",
                      }}
                      aria-label="Save to favorites"
                    >
                      <Heart
                        className={cn(
                          "h-3.5 w-3.5 transition-all",
                          isFav ? "fill-paint-coral text-paint-coral scale-110" : isLight ? "text-foreground/70" : "text-white/90"
                        )}
                      />
                    </button>

                    {/* Hex on hover */}
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      className="absolute bottom-0 inset-x-0 p-2.5 flex items-center justify-between"
                      style={{
                        background: isLight
                          ? "linear-gradient(to top, rgba(0,0,0,0.4), transparent)"
                          : "linear-gradient(to top, rgba(255,255,255,0.3), transparent)",
                      }}
                    >
                      <span
                        className="font-mono text-xs font-bold tracking-wide"
                        style={{ color: isLight ? "#fff" : "#1a1a1a" }}
                      >
                        {s.hex}
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-semibold flex items-center gap-1"
                        style={{
                          background: isLight ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.6)",
                          color: isLight ? "#1a1a1a" : "#fff",
                        }}
                      >
                        {isCopied ? (
                          <><Check className="h-2.5 w-2.5" /> Copied</>
                        ) : (
                          <><Copy className="h-2.5 w-2.5" /> Copy</>
                        )}
                      </span>
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-display text-sm font-bold truncate">{s.name}</h4>
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider shrink-0"
                        style={{ background: `${s.hex}22`, color: s.hex }}
                      >
                        {s.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{s.mood}</p>
                  </div>

                  {/* Top shine on hover */}
                  <div className="absolute top-0 inset-x-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" style={{ background: s.hex }} />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Palette className="h-10 w-10 mx-auto text-muted-foreground/50" />
            <p className="mt-3 text-muted-foreground">
              {showFavorites
                ? "No saved colours yet — tap the heart on any swatch."
                : "No colours in this category yet."}
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <Reveal delay={0.1}>
          <div className="mt-12 rounded-3xl paint-gradient-soft border border-border/60 p-6 sm:p-8 text-center">
            <p className="text-[11px] uppercase tracking-widest text-primary font-semibold">
              Found shades you love?
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold mt-1">
              Bring your favourites to a free consultation.
            </h3>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              We&apos;ll match them in your lighting, suggest complementary trim colours, and give you a printed shade card to take home.
            </p>
            <Magnetic className="inline-block mt-5">
              <Button
                asChild
                size="lg"
                className="rounded-full paint-gradient text-white border-0 shadow-warm hover:opacity-90"
              >
                <a href="#contact">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Book free colour consult
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Determine if a hex color is "light" (for text contrast purposes) */
function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "")
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  // Perceived luminance (ITU-R BT.709)
  const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  return luma > 0.65
}
