"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Brush, Building2, Sparkles, Droplets, Palette, Frame,
  ArrowUpRight, Check,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal, SectionHeading, Magnetic } from "@/components/motion/primitives"
import { SERVICES } from "@/lib/data/content"

const ICONS: Record<string, LucideIcon> = {
  Brush, Building2, Sparkles, Droplets, Palette, Frame,
}

export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-paint-coral/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-paint-saffron/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="What we do"
          title={
            <>
              Crafted services, <span className="text-gradient-warm">end to end.</span>
            </>
          }
          description="From the first colour swatch to the final protective top-coat — our Berger Urban Exclusive Paints Store delivers a complete, dust-free painting experience backed by genuine Berger products."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Brush
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl border border-border/60 bg-card overflow-hidden shadow-card hover:shadow-warm transition-shadow"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full glass border border-white/20 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                      from {service.starting}
                    </span>
                  </div>
                  <div className="absolute -bottom-6 left-5">
                    <div className="h-12 w-12 rounded-xl paint-gradient grid place-items-center shadow-warm border-2 border-card">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 pt-8">
                  <h3 className="font-display text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground text-pretty">
                    {service.description}
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-3.5 w-3.5 text-paint-sage shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      0{i + 1} · Service
                    </span>
                    <Magnetic>
                      <Button
                        asChild
                        size="sm"
                        variant="ghost"
                        className="rounded-full px-3 hover:bg-secondary group/btn"
                      >
                        <Link href="#contact" className="flex items-center gap-1">
                          Enquire
                          <ArrowUpRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </Link>
                      </Button>
                    </Magnetic>
                  </div>
                </div>

                {/* Hover top-stroke */}
                <motion.div
                  className="absolute top-0 inset-x-0 h-1 paint-gradient origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />
              </motion.div>
            )
          })}
        </div>

        {/* CTA banner */}
        <Reveal delay={0.1}>
          <div className="mt-14 relative rounded-3xl overflow-hidden paint-gradient p-8 sm:p-12 text-white shadow-warm">
            <div className="absolute inset-0 bg-noise opacity-10" />
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
                  Not sure which service you need?
                </h3>
                <p className="mt-2 text-white/90 text-pretty">
                  Our colour consultants will visit your space, understand your style, and recommend
                  the right products and finishes — completely free.
                </p>
              </div>
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white text-primary hover:bg-white/90 border-0 shadow-lg"
                >
                  <Link href="#contact">
                    Book a free visit
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
