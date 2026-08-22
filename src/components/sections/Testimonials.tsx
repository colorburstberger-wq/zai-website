"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Reveal, SectionHeading, Counter, TiltCard } from "@/components/motion/primitives"
import { TESTIMONIALS } from "@/lib/data/content"

export function Testimonials() {
  const [idx, setIdx] = React.useState(0)
  const [dir, setDir] = React.useState(1)

  const go = (delta: number) => {
    setDir(delta)
    setIdx((p) => (p + delta + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  // Auto-advance
  React.useEffect(() => {
    const t = setInterval(() => go(1), 7000)
    return () => clearInterval(t)
  }, [])

  const t = TESTIMONIALS[idx]

  return (
    <section id="testimonials" className="relative py-20 sm:py-28 overflow-hidden bg-secondary/30">
      {/* Decorative big quote */}
      <Quote
        className="absolute top-10 right-10 h-40 w-40 text-primary/5"
        strokeWidth={1}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Reviews"
          title={
            <>
              Loved by Gorakhpur&apos;s <span className="text-gradient-warm">homeowners.</span>
            </>
          }
          description="Real words from real clients — across Siddharth Enclave, Taramandal, Rail Vihar and beyond in Gorakhpur."
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-center">
          {/* Big rating stat */}
          <Reveal className="lg:col-span-4" delay={0.05}>
            <div className="rounded-3xl bg-card border border-border/60 p-6 shadow-card text-center">
              <p className="font-display text-7xl font-bold text-gradient-warm">
                <Counter to={5.0} decimals={1} />
              </p>
              <div className="mt-2 flex items-center justify-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-5 w-5 fill-paint-saffron text-paint-saffron" />
                ))}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Average rating from{" "}
                <span className="font-semibold text-foreground">
                  <Counter to={23} suffix="+" />
                </span>{" "}
                verified Google reviews
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl bg-secondary/60 p-3">
                  <p className="font-display text-2xl font-bold text-foreground">
                    <Counter to={100} suffix="%" />
                  </p>
                  <p className="text-muted-foreground">5-star Google rated</p>
                </div>
                <div className="rounded-xl bg-secondary/60 p-3">
                  <p className="font-display text-2xl font-bold text-foreground">
                    <Counter to={1200} suffix="+" />
                  </p>
                  <p className="text-muted-foreground">homes painted</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Active testimonial */}
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <TiltCard max={8} className="rounded-3xl">
                <div className="relative rounded-3xl bg-card border border-border/60 p-6 sm:p-8 shadow-card min-h-[18rem] flex flex-col justify-between overflow-hidden">
                  {/* Decorative big quote watermark */}
                  <Quote className="absolute -top-4 -right-4 h-32 w-32 text-primary/5" strokeWidth={1} />

                  <div className="relative">
                    <Quote className="h-8 w-8 text-paint-saffron mb-4" />
                    <AnimatePresence mode="wait" custom={dir}>
                      <motion.blockquote
                        key={idx}
                        custom={dir}
                        initial={{ opacity: 0, x: dir * 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: dir * -30 }}
                        transition={{ duration: 0.4 }}
                        className="font-display text-xl sm:text-2xl leading-snug text-foreground/90 text-pretty"
                      >
                        &ldquo;{t.text}&rdquo;
                      </motion.blockquote>
                  </AnimatePresence>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-12 w-12 rounded-full grid place-items-center font-display font-bold text-white shadow-warm"
                      style={{ background: t.accent }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-display text-base font-bold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-paint-saffron text-paint-saffron" />
                    ))}
                  </div>
                </div>
                </div>
              </TiltCard>
            </Reveal>

            {/* Controls */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDir(i > idx ? 1 : -1)
                      setIdx(i)
                    }}
                    aria-label={`Review ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === idx ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/40"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => go(-1)}
                  className="h-10 w-10 grid place-items-center rounded-full border border-border/60 bg-card hover:bg-secondary transition"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => go(1)}
                  className="h-10 w-10 grid place-items-center rounded-full border border-border/60 bg-card hover:bg-secondary transition"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
