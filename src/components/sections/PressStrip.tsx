"use client"

import { motion } from "framer-motion"
import { Reveal } from "@/components/motion/primitives"

const PRESS = [
  { name: "Architectural Digest", initials: "AD", tagline: "Featured studio" },
  { name: "Better Homes", initials: "BH", tagline: "Editor's pick" },
  { name: "Paint India", initials: "PI", tagline: "Award winner" },
  { name: "Designboom India", initials: "DB", tagline: "Top studio" },
  { name: "Indian Express", initials: "IE", tagline: "Local hero" },
  { name: "Vogue Living", initials: "VL", tagline: "Colour trendsetter" },
]

export function PressStrip() {
  return (
    <section className="relative py-12 sm:py-16 border-y border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-8">
            As featured in
          </p>
        </Reveal>

        <div className="relative overflow-hidden mask-fade-x">
          <div className="flex w-max animate-marquee gap-12 items-center">
            {[...PRESS, ...PRESS, ...PRESS].map((p, i) => (
              <motion.div
                key={`${p.name}-${i}`}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 shrink-0 group"
              >
                {/* Logo block */}
                <div className="relative h-12 w-12 rounded-xl border-2 border-border/60 grid place-items-center font-display text-sm font-bold text-foreground/70 group-hover:text-primary group-hover:border-primary/50 transition-colors overflow-hidden">
                  <div className="absolute inset-0 paint-gradient-soft opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative">{p.initials}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-sm font-bold text-foreground/80 group-hover:text-foreground transition-colors whitespace-nowrap">
                    {p.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                    {p.tagline}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
