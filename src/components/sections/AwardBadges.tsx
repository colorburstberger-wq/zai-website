"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Star, Trophy, Medal, Award, BadgeCheck, ShieldCheck, ScrollText } from "lucide-react"
import { Reveal, SectionHeading, Counter } from "@/components/motion/primitives"

interface Credential {
  title: string
  issuer: string
  year: string
  accent: string
  blurb: string
  badgeType: "dealership" | "academy" | "trophy" | "warranty" | "iso" | "pro"
}

const CREDENTIALS: Credential[] = [
  {
    title: "Authorised Signature Dealer",
    issuer: "Asian Paints",
    year: "2014",
    accent: "#E2231A",
    blurb: "Top-tier dealership authorising us to supply the full Luxury, Royale & Apex range with manufacturer warranty.",
    badgeType: "dealership",
  },
  {
    title: "Authorised Dealer",
    issuer: "Berger Paints",
    year: "2011",
    accent: "#C8102E",
    blurb: "Authorised to stock and apply the complete Weathercoat, Luxol, Breathe Easy & Designory portfolio.",
    badgeType: "dealership",
  },
  {
    title: "Colour Academy Certified",
    issuer: "Asian Paints Academy",
    year: "2016",
    accent: "#F2A93B",
    blurb: "In-house colour consultants trained and certified by Asian Paints' official colour academy.",
    badgeType: "academy",
  },
  {
    title: "Best Texture Studio — East",
    issuer: "Paint India Awards",
    year: "2023",
    accent: "#B65C3F",
    blurb: "Recognised as the leading texture & designer wall studio across East India for craftsmanship.",
    badgeType: "trophy",
  },
  {
    title: "SmartCare Pro",
    issuer: "Asian Paints SmartCare",
    year: "2018",
    accent: "#4C8C8C",
    blurb: "Certified waterproofing applicators — eligible to issue the 10-year SmartCare waterproofing warranty.",
    badgeType: "warranty",
  },
  {
    title: "ISO 9001:2015 Process",
    issuer: "Bureau Veritas",
    year: "2020",
    accent: "#8FA68E",
    blurb: "Quality-management certified workflow from inquiry to handover, with documented site protocols.",
    badgeType: "iso",
  },
]

export function AwardBadges() {
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
                {/* Custom SVG medal/badge */}
                <div className="relative shrink-0">
                  <BadgeSVG type={c.badgeType} accent={c.accent} />
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
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold tabular-nums shrink-0">
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

/**
 * BadgeSVG — custom hand-crafted SVG medal/badge designs.
 * Each type has a distinct shape with the brand accent gradient.
 */
function BadgeSVG({ type, accent }: { type: Credential["badgeType"]; accent: string }) {
  const gradId = `badge-grad-${type}`

  return (
    <motion.div
      whileHover={{ rotate: [0, -10, 10, 0] }}
      transition={{ duration: 0.6 }}
      className="relative h-14 w-14"
    >
      <svg viewBox="0 0 56 56" fill="none" className="w-full h-full drop-shadow">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="56" y2="56">
            <stop offset="0%" stopColor={accent} stopOpacity="1" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.7" />
          </linearGradient>
        </defs>
        {renderBadge(type, gradId, accent)}
      </svg>
    </motion.div>
  )
}

function renderBadge(type: Credential["badgeType"], gradId: string, accent: string) {
  switch (type) {
    case "dealership":
      // Seal-style badge with ribbon
      return (
        <>
          {/* Outer scalloped circle */}
          <path
            d="M28 4 L33 8 L40 6 L42 13 L49 14 L47 21 L52 26 L48 31 L52 36 L47 41 L49 48 L42 49 L40 56 L33 54 L28 58 L23 54 L16 56 L14 49 L7 48 L9 41 L4 36 L9 31 L5 26 L10 21 L8 14 L15 13 L17 6 L24 8 Z"
            fill={`url(#${gradId})`}
            opacity="0.95"
          />
          {/* Inner circle */}
          <circle cx="28" cy="29" r="14" fill="white" fillOpacity="0.95" />
          <circle cx="28" cy="29" r="11" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="2 2" />
          {/* Check */}
          <path d="M22 29 L26 33 L34 25" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </>
      )
    case "academy":
      // Mortarboard cap
      return (
        <>
          <path d="M28 8 L52 18 L28 28 L4 18 Z" fill={`url(#${gradId})`} />
          <path d="M14 22 L14 32 Q14 38 28 38 Q42 38 42 32 L42 22" fill={accent} fillOpacity="0.6" stroke={accent} strokeWidth="1" />
          {/* Tassel */}
          <line x1="46" y1="18" x2="46" y2="32" stroke={accent} strokeWidth="1.5" />
          <circle cx="46" cy="34" r="2.5" fill={accent} />
        </>
      )
    case "trophy":
      // Trophy cup
      return (
        <>
          {/* Cup */}
          <path d="M18 12 L38 12 L38 24 Q38 32 28 32 Q18 32 18 24 Z" fill={`url(#${gradId})`} />
          {/* Handles */}
          <path d="M18 16 Q12 16 12 22 Q12 26 18 26" stroke={accent} strokeWidth="2" fill="none" />
          <path d="M38 16 Q44 16 44 22 Q44 26 38 26" stroke={accent} strokeWidth="2" fill="none" />
          {/* Stem */}
          <rect x="26" y="32" width="4" height="8" fill={accent} />
          {/* Base */}
          <path d="M20 40 L36 40 L34 48 L22 48 Z" fill={accent} />
          <rect x="22" y="48" width="12" height="3" fill={accent} fillOpacity="0.8" />
          {/* Star */}
          <path d="M28 16 L29.5 19 L33 19 L30 21 L31 25 L28 22.5 L25 25 L26 21 L23 19 L26.5 19 Z" fill="white" opacity="0.9" />
        </>
      )
    case "warranty":
      // Shield with check
      return (
        <>
          <path
            d="M28 4 L48 12 L48 28 Q48 44 28 52 Q8 44 8 28 L8 12 Z"
            fill={`url(#${gradId})`}
          />
          <path
            d="M28 8 L44 14 L44 28 Q44 41 28 48 Q12 41 12 28 L12 14 Z"
            fill="white"
            fillOpacity="0.95"
          />
          <path d="M20 28 L26 34 L36 22" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </>
      )
    case "iso":
      // Hexagonal ISO-style badge
      return (
        <>
          <path
            d="M28 4 L48 16 L48 40 L28 52 L8 40 L8 16 Z"
            fill={`url(#${gradId})`}
          />
          <path
            d="M28 10 L43 19 L43 37 L28 46 L13 37 L13 19 Z"
            fill="white"
            fillOpacity="0.95"
          />
          {/* "ISO" bars */}
          <rect x="20" y="22" width="16" height="3" rx="1.5" fill={accent} />
          <rect x="22" y="27.5" width="12" height="3" rx="1.5" fill={accent} fillOpacity="0.8" />
          <rect x="24" y="33" width="8" height="3" rx="1.5" fill={accent} fillOpacity="0.6" />
        </>
      )
    case "pro":
      // Gear/cog badge
      return (
        <>
          {/* Gear teeth */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45) * (Math.PI / 180)
            const cx = 28 + Math.cos(angle) * 22
            const cy = 28 + Math.sin(angle) * 22
            return (
              <rect
                key={i}
                x={cx - 3}
                y={cy - 3}
                width="6"
                height="6"
                rx="1"
                fill={accent}
                transform={`rotate(${i * 45} ${cx} ${cy})`}
              />
            )
          })}
          {/* Gear body */}
          <circle cx="28" cy="28" r="18" fill={`url(#${gradId})`} />
          <circle cx="28" cy="28" r="14" fill="white" fillOpacity="0.95" />
          <circle cx="28" cy="28" r="6" fill={accent} />
          <circle cx="28" cy="28" r="3" fill="white" />
        </>
      )
  }
}
