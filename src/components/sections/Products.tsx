"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check, ShieldCheck, Ruler, Layers, Star } from "lucide-react"
import { Reveal, SectionHeading } from "@/components/motion/primitives"
import { Badge } from "@/components/ui/badge"
import { PRODUCTS } from "@/lib/data/content"

const BRANDS = ["All", "Asian Paints", "Berger Paints"]

export function Products() {
  const [brand, setBrand] = React.useState("All")
  const filtered = PRODUCTS.filter((p) => brand === "All" || p.brand === brand)

  return (
    <section id="products" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Signature products"
          title={
            <>
              Premium paints, <span className="text-gradient-warm">hand-picked.</span>
            </>
          }
          description="A curated selection from Berger Paints & Asian Paints — each product chosen for performance, finish and longevity. Every batch is sourced directly from the manufacturer."
        />

        {/* Brand filter */}
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {BRANDS.map((b) => (
              <button
                key={b}
                onClick={() => setBrand(b)}
                className={`rounded-full px-4 py-2 text-sm font-medium border transition ${
                  brand === b
                    ? "bg-primary text-primary-foreground border-primary shadow-warm"
                    : "bg-card border-border/60 hover:border-primary/50 hover:text-primary"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <motion.article
              key={p.name}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl border border-border/60 bg-card overflow-hidden shadow-card hover:shadow-warm transition-shadow"
            >
              {/* Swatch header */}
              <div
                className="relative h-40 flex items-end p-5"
                style={{
                  background: `linear-gradient(135deg, ${p.swatch}, ${p.swatch}dd 50%, ${p.swatch}99)`,
                }}
              >
                <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <Badge className="bg-white/90 text-foreground border-0 hover:bg-white">
                    <Star className="h-3 w-3 mr-1 fill-paint-saffron text-paint-saffron" />
                    {p.warranty}
                  </Badge>
                </div>
                <div className="relative">
                  <p className="text-[11px] uppercase tracking-widest text-white/90 font-semibold">
                    {p.brand}
                  </p>
                  <p className="text-[11px] uppercase tracking-widest text-white/80">
                    {p.category}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="font-display text-lg font-bold leading-tight">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.finish}</p>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-2">
                    <Ruler className="h-3.5 w-3.5 text-primary" />
                    <span className="truncate">{p.coverage}</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    <span className="truncate">{p.warranty} warranty</span>
                  </div>
                </div>

                <ul className="mt-4 space-y-1.5">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm">
                      <Check className="h-3.5 w-3.5 text-paint-sage shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    Authorised stock
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
