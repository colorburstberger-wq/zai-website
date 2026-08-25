"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Calendar, X } from "lucide-react"
import { Reveal, SectionHeading, Magnetic } from "@/components/motion/primitives"
import { FloatingSwatches } from "@/components/sections/FloatingSwatches"
import { Button } from "@/components/ui/button"
import { GALLERY } from "@/lib/data/content"

const CATEGORIES = ["All", "Interior", "Exterior", "Texture", "Commercial", "Wood Finish"]

export function Gallery() {
  const [cat, setCat] = React.useState("All")
  const [active, setActive] = React.useState<number | null>(null)

  const items = GALLERY.filter((g) => cat === "All" || g.category === cat)

  return (
    <section id="gallery" className="relative py-20 sm:py-28 bg-secondary/30 overflow-hidden">
      <FloatingSwatches />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Recent transformations"
          title={
            <>
              Projects that <span className="text-gradient-warm">wear their colour proudly.</span>
            </>
          }
          description="A small selection of homes, offices and villas we have painted across Gorakhpur in the past year. Every image is real Berger Urban Exclusive work — no stock photography."
        />

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium border transition ${
                  cat === c
                    ? "bg-primary text-primary-foreground border-primary shadow-warm"
                    : "bg-card border-border/60 hover:border-primary/50 hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          layout
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {items.map((g, i) => (
              <motion.button
                layout
                key={g.title}
                onClick={() => setActive(GALLERY.indexOf(g))}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-card border-4 border-card text-left"
              >
                <img
                  src={g.image}
                  alt={g.title}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Category tag */}
                <span className="absolute top-3 left-3 rounded-full glass border border-white/20 px-3 py-1 text-[11px] font-semibold text-white">
                  {g.category}
                </span>

                {/* Hover indicator */}
                <motion.div
                  className="absolute top-3 right-3 h-9 w-9 rounded-full glass border border-white/20 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <motion.span
                    className="h-3 w-3 rounded-full bg-white"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>

                <div className="absolute bottom-0 inset-x-0 p-5">
                  <h3 className="font-display text-lg font-bold text-white leading-tight">
                    {g.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-3 text-[11px] text-white/80">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {g.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {g.year}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] text-white/70">{g.brand}</p>
                </div>

                {/* Hover sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-paint-coral/40 to-transparent" />
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm grid place-items-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-card rounded-3xl overflow-hidden border border-border/60 shadow-2xl"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 z-10 h-10 w-10 grid place-items-center rounded-full glass border border-border/60 text-foreground hover:bg-card/80 transition"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="grid md:grid-cols-5">
                <div className="md:col-span-3 aspect-square md:aspect-auto md:h-[28rem] relative">
                  <img
                    src={GALLERY[active].image}
                    alt={GALLERY[active].title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="md:col-span-2 p-6 flex flex-col gap-4 justify-center">
                  <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-fit">
                    {GALLERY[active].category}
                  </span>
                  <h3 className="font-display text-2xl font-bold">{GALLERY[active].title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Painted with {GALLERY[active].brand}.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {GALLERY[active].location}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Completed in {GALLERY[active].year}
                    </p>
                  </div>
                  <Magnetic>
                    <Button
                      asChild
                      className="rounded-full paint-gradient text-white border-0 shadow-warm w-fit"
                    >
                      <a href="#contact">Get a similar look</a>
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
