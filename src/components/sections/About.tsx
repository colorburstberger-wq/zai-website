"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Quote, MapPin, Calendar, Award } from "lucide-react"
import { Reveal, SectionHeading, Counter, PaintStrokeDivider } from "@/components/motion/primitives"
import { STATS, SHOP } from "@/lib/data/content"

const HIGHLIGHTS = [
  "Authorised dealer since 2009",
  "Certified colour consultants",
  "Trained & insured in-house crew",
  "Computerised colour matching",
  "Dust-free, on-time delivery",
  "Up to 10-year warranty",
]

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28 overflow-hidden">
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
                    alt="Chroma House master painter applying warm terracotta paint in a sunlit living room"
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
                        — Founder, Chroma House
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
                  <p className="font-display text-lg font-bold leading-none">Authorised</p>
                  <p className="text-xs text-muted-foreground">Berger & Asian Paints</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Text column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <SectionHeading
              align="left"
              kicker="About Chroma House"
              title={
                <>
                  A family of painters, <span className="text-gradient-warm">colour obsessives</span> & finishers.
                </>
              }
              description={
                <>
                  Founded in {SHOP.founded} as a single-room paint counter in Lake Town, Kolkata,
                  Chroma House has grown into one of East India&apos;s most respected premium paint
                  studios — yet we still treat every project like our first. We are an authorised
                  dealer for both Berger Paints and Asian Paints, with an in-house team of certified
                  colour consultants, trained applicators and master polishers.
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
                  <span className="text-sm">Lake Town, Kolkata</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/60 p-3">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">Open Mon – Sun</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 sm:mt-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="relative group rounded-2xl border border-border/60 bg-card p-6 text-center overflow-hidden"
              >
                <div className="absolute inset-0 paint-gradient-soft opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <p className="font-display text-4xl sm:text-5xl font-bold text-gradient-warm">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
