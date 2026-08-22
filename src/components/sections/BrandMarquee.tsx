"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { PARTNERS } from "@/lib/data/content"
import { Reveal } from "@/components/motion/primitives"

const MARQUEE_ITEMS = [
  "Interior Painting",
  "Exterior Painting",
  "Texture Walls",
  "Waterproofing",
  "Wood Polish",
  "Colour Consultation",
  "Stucco Plaster",
  "Stencils",
  "Metallic Finish",
  "Crack Repair",
  "Anti-Algal Coating",
  "PU Polish",
  "Accent Walls",
  "Modular Kitchen Polish",
]

export function BrandMarquee() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden border-y border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Trusted brands · Genuine products
          </p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2">
            We only paint with the world&apos;s best.
          </h3>
        </Reveal>

        {/* Brand cards */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {PARTNERS.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative flex items-center gap-4 rounded-2xl bg-card border border-border/70 p-5 shadow-card hover:shadow-warm transition-shadow overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity"
                style={{
                  background: `radial-gradient(circle at 30% 20%, ${p.accent}, transparent 60%)`,
                }}
              />
              <div className="relative h-16 w-16 rounded-2xl grid place-items-center font-display text-xl font-bold text-white shrink-0 shadow-warm"
                style={{ background: p.accent }}
              >
                {p.initials}
              </div>
              <div className="relative flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-display text-xl font-bold">{p.name}</h4>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white"
                    style={{ background: p.accent }}
                  >
                    {p.tag}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{p.blurb}</p>
              </div>
              <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-6">
              <span className="font-display text-xl sm:text-2xl font-semibold text-foreground/80">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full paint-gradient" />
            </div>
          ))}
        </div>
        <div className="flex w-max animate-marquee-reverse mt-2">
          {[...MARQUEE_ITEMS.slice().reverse(), ...MARQUEE_ITEMS.slice().reverse()].map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-6 opacity-40">
              <span className="font-display text-xl sm:text-2xl font-semibold">{item}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
