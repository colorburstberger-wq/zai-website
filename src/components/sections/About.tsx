"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Quote, MapPin, Calendar, Award, Home, Sparkles, Heart, ArrowRight } from "lucide-react"
import { Reveal, SectionHeading, Counter, PaintStrokeDivider } from "@/components/motion/primitives"
import { ParallaxImage, ClipReveal } from "@/components/motion/cinematic"
import { FloatingSwatches } from "@/components/sections/FloatingSwatches"
import { STATS, SHOP } from "@/lib/data/content"
import { cn } from "@/lib/utils"

const STAT_ICONS: Record<string, typeof Home> = {
  Home, Award, Sparkles, Heart,
}

const HIGHLIGHTS = [
  "Berger Urban Exclusive Store since 2010",
  "Berger Color Bank shade matching on site",
  "Family-run, no sub-contractors",
  "5.0-star Google rated (23 reviews)",
  "Genuine products with full warranty",
  "Free on-site colour consultation in Gorakhpur",
]

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28 overflow-hidden">
      <FloatingSwatches />
      {/* Decorative paint stroke */}
      <div className="absolute top-0 inset-x-0 text-primary/40">
        <PaintStrokeDivider />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Image column */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -top-6 -right-4 sm:right-6 z-20 glass rounded-2xl border border-border/60 px-5 py-3 shadow-card"
              >
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Family-run since
                </p>
                <p className="font-display text-3xl font-bold text-gradient-warm">
                  <Counter to={SHOP.founded} />
                </p>
              </motion.div>

              <Reveal y={50}>
                <div className="relative rounded-[2rem] overflow-hidden shadow-card border-4 border-card aspect-[4/5] sm:aspect-[5/4]">
                  <img
                    src="/images/about-painter.png"
                    alt="Berger Urban Exclusive Paints Store team applying warm terracotta paint in a sunlit Gorakhpur living room"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Quote ribbon */}
                  <div className="absolute bottom-5 inset-x-5">
                    <div className="glass rounded-2xl p-4 border border-white/20">
                      <Quote className="h-5 w-5 text-paint-saffron mb-1" />
                      <p className="font-display text-base sm:text-lg text-white italic leading-snug">
                        &ldquo;A wall is a canvas. We treat every home like a masterpiece in waiting.&rdquo;
                      </p>
                      <p className="text-xs text-white/70 mt-2">
                        — Owner, Berger Urban Exclusive Paints Store, Gorakhpur
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Decorative blob behind image */}
              <div className="absolute -z-10 -inset-4 paint-gradient-soft rounded-[3rem] blur-2xl" />

              {/* Floating mini-card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="absolute -bottom-6 -left-4 sm:-left-8 glass rounded-2xl border border-border/60 px-5 py-4 shadow-card flex items-center gap-3"
              >
                <div className="h-12 w-12 rounded-xl paint-gradient grid place-items-center">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold leading-none">Urban Exclusive</p>
                  <p className="text-xs text-muted-foreground">Berger Paints Authorised Store</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Text column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <SectionHeading
              align="left"
              kicker="About Our Store"
              title={
                <>
                  Gorakhpur&apos;s trusted <span className="text-gradient-warm">Berger Paints</span> exclusive store.
                </>
              }
              description={
                <>
                  Established in {SHOP.founded} in Siddharth Enclave, Taramandal, Gorakhpur, we are
                  an authorised Berger Urban Exclusive Paints Store — Berger&apos;s flagship retail
                  partnership tier. We stock the complete Berger range (Easy Clean, Breathe Easy,
                  Weathercoat, Luxol, Designory) with full manufacturer warranty, and also supply
                  Asian Paints products on request. Our family-run store is proud to be Gorakhpur&apos;s
                  highest-rated paint shop, with a 5.0-star Google rating from 23+ verified reviews.
                </>
              }
            />

            <Reveal delay={0.1}>
              <ul className="grid sm:grid-cols-2 gap-3 mt-2">
                {HIGHLIGHTS.map((h, i) => (
                  <motion.li
                    key={h}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{h}</span>
                  </motion.li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid sm:grid-cols-2 gap-3 mt-2">
                <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/60 p-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">Siddharth Enclave, Gorakhpur</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/60 p-3">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">Open Mon – Sat 8AM–8:30PM</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Stats row with 3D flip cards */}
        <div className="mt-16 sm:mt-24">
          <p className="text-center text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
            ✦ Hover any card to see more ✦
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((s, i) => (
              <FlipStatCard key={s.label} stat={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface StatData {
  value: number
  suffix: string
  label: string
  back: string
  icon: string
}

function FlipStatCard({ stat, index }: { stat: StatData; index: number }) {
  const [flipped, setFlipped] = React.useState(false)
  const Icon = STAT_ICONS[stat.icon] ?? Home

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      className="relative h-36 sm:h-40 cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl border border-border/60 bg-card p-6 text-center overflow-hidden shadow-card",
            "flex flex-col items-center justify-center"
          )}
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="absolute inset-0 paint-gradient-soft opacity-0 hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="h-9 w-9 rounded-xl paint-gradient grid place-items-center mx-auto mb-2 shadow-warm">
              <Icon className="h-4 w-4 text-white" />
            </div>
            <p className="font-display text-3xl sm:text-4xl font-bold text-gradient-warm tabular-nums">
              <Counter to={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl paint-gradient text-white p-5 flex flex-col items-center justify-center shadow-warm overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="absolute inset-0 bg-noise opacity-15" />
          <div className="relative text-center">
            <Icon className="h-6 w-6 mx-auto mb-2 opacity-80" />
            <p className="font-display text-sm font-bold leading-tight">{stat.label}</p>
            <p className="text-xs text-white/90 mt-2 text-pretty">{stat.back}</p>
            <p className="text-[10px] uppercase tracking-widest text-white/70 mt-3 flex items-center justify-center gap-1">
              <ArrowRight className="h-2.5 w-2.5" /> Hover to flip back
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
