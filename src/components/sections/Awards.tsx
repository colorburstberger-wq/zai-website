"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Award, ShieldCheck, BadgeCheck, Star, Trophy, Medal, ScrollText } from "lucide-react"
import { Reveal, SectionHeading, Counter } from "@/components/motion/primitives"

interface Credential {
  icon: typeof Award
  title: string
  issuer: string
  year: string
  accent: string
  blurb: string
}

const CREDENTIALS: Credential[] = [
  {
    icon: BadgeCheck,
    title: "Authorised Signature Dealer",
    issuer: "Asian Paints",
    year: "2014",
    accent: "var(--paint-coral)",
    blurb: "Top-tier dealership authorising us to supply the full Luxury, Royale & Apex range with manufacturer warranty.",
  },
  {
    icon: ShieldCheck,
    title: "Authorised Dealer",
    issuer: "Berger Paints",
    year: "2011",
    accent: "var(--paint-mustard)",
    blurb: "Authorised to stock and apply the complete Weathercoat, Luxol, Breathe Easy & Designory portfolio.",
  },
  {
    icon: Award,
    title: "Colour Academy Certified",
    issuer: "Asian Paints Academy",
    year: "2016",
    accent: "var(--paint-saffron)",
    blurb: "In-house colour consultants trained and certified by Asian Paints' official colour academy.",
  },
  {
    icon: Trophy,
    title: "Best Texture Studio — East",
    issuer: "Paint India Awards",
    year: "2023",
    accent: "var(--paint-clay)",
    blurb: "Recognised as the leading texture & designer wall studio across East India for craftsmanship.",
  },
  {
    icon: Medal,
    title: "SmartCare Pro",
    issuer: "Asian Paints SmartCare",
    year: "2018",
    accent: "var(--paint-teal)",
    blurb: "Certified waterproofing applicators — eligible to issue the 10-year SmartCare waterproofing warranty.",
  },
  {
    icon: ScrollText,
    title: "ISO 9001:2015 Process",
    issuer: "Bureau Veritas",
    year: "2020",
    accent: "var(--paint-sage)",
    blurb: "Quality-management certified workflow from inquiry to handover, with documented site protocols.",
  },
]

export function Awards() {
  return (
    <section id="awards" className="relative py-20 sm:py-28 bg-secondary/30 overflow-hidden">
      {/* Decorative trophy watermark */}
      <Trophy
        className="absolute -top-10 -right-10 h-64 w-64 text-foreground/[0.04]"
        strokeWidth={1}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Credentials & recognition"
          title={
            <>
              Certified, awarded & <span className="text-gradient-warm">trusted.</span>
            </>
          }
          description="Every product we supply is genuine. Every warranty we issue is honoured. Here are the credentials that back that promise."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CREDENTIALS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30, rotateY: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl border border-border/60 bg-card p-6 shadow-card hover:shadow-warm transition-shadow overflow-hidden"
            >
              {/* Decorative corner ribbon */}
              <div
                className="absolute -top-12 -right-12 h-24 w-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ background: c.accent }}
              />

              <div className="relative flex items-start gap-4">
                {/* Medal */}
                <div className="relative shrink-0">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.6 }}
                    className="h-14 w-14 rounded-2xl grid place-items-center shadow-warm"
                    style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.accent}cc)` }}
                  >
                    <c.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-card border-2 border-border grid place-items-center">
                    <Star className="h-2.5 w-2.5 fill-paint-saffron text-paint-saffron" />
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {c.issuer}
                      </p>
                      <h3 className="font-display text-base font-bold leading-tight mt-0.5">
                        {c.title}
                      </h3>
                    </div>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold tabular-nums">
                      {c.year}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground text-pretty leading-relaxed">
                    {c.blurb}
                  </p>
                </div>
              </div>

              {/* Bottom shine */}
              <motion.div
                className="absolute bottom-0 inset-x-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
                style={{ background: c.accent }}
              />
            </motion.div>
          ))}
        </div>

        {/* Trust summary bar */}
        <Reveal delay={0.1}>
          <div className="mt-12 rounded-3xl border border-border/60 bg-card p-6 sm:p-8 shadow-card">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <TrustStat value={15} suffix=" yrs" label="In business" />
              <TrustStat value={4500} suffix="+" label="Homes painted" />
              <TrustStat value={6} label="Industry certifications" />
              <TrustStat value={98} suffix="%" label="Referral rate" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function TrustStat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  return (
    <div>
      <p className="font-display text-4xl sm:text-5xl font-bold text-gradient-warm">
        <Counter to={value} suffix={suffix} />
      </p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  )
}
