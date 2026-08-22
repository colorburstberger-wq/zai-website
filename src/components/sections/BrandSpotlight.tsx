"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, ShieldCheck, PackageCheck, Award } from "lucide-react"
import { Reveal, SectionHeading, Magnetic } from "@/components/motion/primitives"
import { PARTNERS } from "@/lib/data/content"
import { Button } from "@/components/ui/button"

const BRAND_DETAILS: Record<string, { ranges: string[]; perks: string[]; warranty: string }> = {
  "Berger Paints": {
    ranges: ["Weathercoat", "Luxol", "Designory", "Breathe Easy", "Easy Clean", "Silk Emulsion"],
    perks: ["Weatherproof exteriors", "Anti-dust finish", "Low-VOC interiors", "Italian textures"],
    warranty: "Up to 10 years",
  },
  "Asian Paints": {
    ranges: ["Royale", "Apex Ultima", "Luxol Heritage", "SmartCare", "Tractor Emulsion", "WoodTech"],
    perks: ["Luxury emulsions", "Teflon surface", "Anti-algal", "Crystalline waterproofing"],
    warranty: "Up to 10 years",
  },
}

export function BrandSpotlight() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Our brand partnerships"
          title={
            <>
              Two of the world&apos;s best. <span className="text-gradient-warm">One studio.</span>
            </>
          }
          description="We are a Berger Urban Exclusive Paints Store in Gorakhpur — Berger is our flagship partnership, and we also collaborate with Asian Paints to bring you genuine, warrantied products from two of India's most respected paint brands."
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-6 lg:gap-8">
          {PARTNERS.map((p, i) => {
            const d = BRAND_DETAILS[p.name]
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl border border-border/60 bg-card overflow-hidden shadow-card hover:shadow-warm transition-shadow"
              >
                {/* Top color band */}
                <div
                  className="relative h-32 sm:h-36 flex items-center justify-between p-6"
                  style={{
                    background: `linear-gradient(135deg, ${p.accent}, ${p.accent}cc 60%, ${p.accent}99)`,
                  }}
                >
                  <div className="absolute inset-0 bg-noise opacity-15 mix-blend-overlay" />
                  <div className="relative flex items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-white grid place-items-center font-display text-2xl font-bold shadow-warm" style={{ color: p.accent }}>
                      {p.initials}
                    </div>
                    <div>
                      <p className="font-display text-2xl sm:text-3xl font-bold text-white">{p.name}</p>
                      <p className="text-xs uppercase tracking-widest text-white/80">{p.tag}</p>
                    </div>
                  </div>
                  <ShieldCheck className="hidden sm:block h-12 w-12 text-white/70" />
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className="text-sm text-muted-foreground text-pretty">{p.blurb}</p>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-xl bg-secondary/60 px-3 py-2 flex items-center gap-2">
                      <Award className="h-3.5 w-3.5 text-primary" />
                      <span className="font-medium">Warranty: {d.warranty}</span>
                    </div>
                    <div className="rounded-xl bg-secondary/60 px-3 py-2 flex items-center gap-2">
                      <PackageCheck className="h-3.5 w-3.5 text-primary" />
                      <span className="font-medium">{d.ranges.length}+ product ranges</span>
                    </div>
                  </div>

                  <p className="mt-5 text-[11px] uppercase tracking-widest text-muted-foreground">
                    Popular ranges we stock
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {d.ranges.map((r) => (
                      <span
                        key={r}
                        className="rounded-full border border-border/60 bg-background/50 px-2.5 py-1 text-xs"
                      >
                        {r}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 text-[11px] uppercase tracking-widest text-muted-foreground">
                    Why customers love it
                  </p>
                  <ul className="mt-2 grid grid-cols-2 gap-1.5 text-sm">
                    {d.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-1.5">
                        <span
                          className="h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ background: p.accent }}
                        />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center justify-between">
                    <Magnetic>
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="rounded-full hover:bg-secondary group/btn"
                      >
                        <a href={p.href} target="_blank" rel="noopener noreferrer">
                          Visit brand site
                          <ArrowUpRight className="h-3.5 w-3.5 ml-1 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                      </Button>
                    </Magnetic>
                    <Magnetic>
                      <Button
                        asChild
                        size="sm"
                        className="rounded-full text-white border-0 shadow-warm"
                        style={{ background: p.accent }}
                      >
                        <Link href="#contact">Get a quote</Link>
                      </Button>
                    </Magnetic>
                  </div>
                </div>

                {/* Animated top stroke */}
                <motion.div
                  className="absolute top-0 inset-x-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ background: p.accent }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
