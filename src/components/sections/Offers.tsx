"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, Clock, Sparkles, ArrowRight, Tag, Check } from "lucide-react"
import { Reveal, Magnetic } from "@/components/motion/primitives"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Offer {
  id: string
  badge: string
  title: string
  description: string
  discount: string
  code: string
  valid: string
  accent: string
  perks: string[]
}

const OFFERS: Offer[] = [
  {
    id: "monsoon",
    badge: "Monsoon Special",
    title: "20% off exterior weatherproof painting",
    description: "Get your home monsoon-ready with Berger Weathercoat or Asian Paints Apex Ultima exteriors. Free site survey included.",
    discount: "20% OFF",
    code: "MONSOON20",
    valid: "Valid till 30 Sep",
    accent: "var(--paint-coral)",
    perks: ["Free algae treatment", "10-year warranty", "Free site survey"],
  },
  {
    id: "festive",
    badge: "Festive Season",
    title: "Free texture accent wall on full-home interiors",
    description: "Book a 3 BHK or larger interior project this festive season and get a designer Italian stucco accent wall — worth ₹15,000 — absolutely free.",
    discount: "₹15,000 BONUS",
    code: "FESTIVEWALL",
    valid: "Valid till 31 Oct",
    accent: "var(--paint-saffron)",
    perks: ["Free accent wall", "Designer stucco", "Free colour consult"],
  },
  {
    id: "referral",
    badge: "Refer & Earn",
    title: "₹2,500 cashback on every successful referral",
    description: "Love your freshly painted home? Refer a friend, neighbour or relative — when they book, you both earn ₹2,500 cashback.",
    discount: "₹2,500",
    code: "REFER2500",
    valid: "Ongoing",
    accent: "var(--paint-sage)",
    perks: ["No limit", "Both earn", "Instant payout"],
  },
]

// Build a target date 5 days from now, fixed for the session
const TARGET = (() => {
  const d = new Date()
  d.setDate(d.getDate() + 4)
  d.setHours(23, 59, 59, 0)
  return d.getTime()
})()

function useCountdown(target: number) {
  const [now, setNow] = React.useState(() => Date.now())
  React.useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const diff = Math.max(0, target - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

export function Offers() {
  const [active, setActive] = React.useState(0)
  const [copied, setCopied] = React.useState(false)
  const time = useCountdown(TARGET)
  const offer = OFFERS[active]

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(offer.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  return (
    <section id="offers" className="relative py-20 sm:py-28 overflow-hidden bg-secondary/30">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-paint-coral/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-paint-saffron/15 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top header with countdown */}
        <Reveal>
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full glass border border-border/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                <Gift className="h-3.5 w-3.5" />
                Limited-time offers
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-3 text-balance">
                Seasonal savings, <span className="text-gradient-warm">straight from the brush.</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mt-3 max-w-xl text-pretty">
                Hand-picked promotions on premium Berger & Asian Paints projects. Limited slots per month.
              </p>
            </div>

            {/* Countdown */}
            <div className="rounded-2xl bg-card border border-border/60 p-4 shadow-card">
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mb-2">
                <Clock className="h-3 w-3" />
                Monsoon offer ends in
              </p>
              <div className="flex items-center gap-2">
                {[
                  { label: "days", val: time.days },
                  { label: "hrs", val: time.hours },
                  { label: "min", val: time.minutes },
                  { label: "sec", val: time.seconds },
                ].map((u, i) => (
                  <React.Fragment key={u.label}>
                    <div className="flex flex-col items-center min-w-[3rem]">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={u.val}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="font-display text-2xl sm:text-3xl font-bold tabular-nums text-gradient-warm"
                        >
                          {String(u.val).padStart(2, "0")}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{u.label}</span>
                    </div>
                    {i < 3 && <span className="font-display text-2xl text-muted-foreground/40 -mt-3">:</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Offer tabs */}
        <Reveal delay={0.05}>
          <div className="flex flex-wrap gap-2 mb-6">
            {OFFERS.map((o, i) => (
              <button
                key={o.id}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium border transition flex items-center gap-2",
                  active === i
                    ? "text-white border-transparent shadow-warm"
                    : "bg-card border-border/60 hover:border-primary/50"
                )}
                style={active === i ? { background: o.accent } : undefined}
              >
                <Tag className="h-3.5 w-3.5" />
                {o.badge}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Active offer card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden border border-border/60 bg-card shadow-card"
          >
            <div className="grid lg:grid-cols-12">
              {/* Left: discount */}
              <div
                className="lg:col-span-4 relative p-8 lg:p-10 flex flex-col justify-between min-h-[18rem] text-white"
                style={{ background: `linear-gradient(135deg, ${offer.accent}, ${offer.accent}dd 60%, ${offer.accent}99)` }}
              >
                <div className="absolute inset-0 bg-noise opacity-15 mix-blend-overlay" />
                <div className="relative">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
                    <Sparkles className="h-3 w-3" />
                    {offer.badge}
                  </span>
                </div>
                <div className="relative">
                  <motion.p
                    key={offer.discount}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    className="font-display text-5xl sm:text-6xl font-bold leading-none"
                  >
                    {offer.discount}
                  </motion.p>
                  <p className="text-sm text-white/80 mt-2">{offer.valid}</p>
                </div>
              </div>

              {/* Right: details */}
              <div className="lg:col-span-8 p-8 lg:p-10 flex flex-col justify-between gap-6">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-balance">
                    {offer.title}
                  </h3>
                  <p className="text-muted-foreground mt-3 text-pretty">{offer.description}</p>

                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {offer.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-1.5 text-sm">
                        <span
                          className="h-5 w-5 rounded-full grid place-items-center"
                          style={{ background: `${offer.accent}22` }}
                        >
                          <Check className="h-3 w-3" style={{ color: offer.accent }} />
                        </span>
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Coupon code */}
                  <button
                    onClick={copyCode}
                    className="group flex items-center gap-3 rounded-2xl border-2 border-dashed border-border/70 hover:border-primary/60 px-4 py-3 transition-colors"
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        Use code
                      </p>
                      <p className="font-mono font-bold tracking-wider text-foreground">
                        {offer.code}
                      </p>
                    </div>
                    <span className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                      copied ? "bg-paint-sage text-white" : "bg-primary/10 text-primary"
                    )}>
                      {copied ? "Copied!" : "Copy"}
                    </span>
                  </button>

                  <div className="flex-1" />

                  <Magnetic>
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full text-white border-0 shadow-warm hover:opacity-90"
                      style={{ background: offer.accent }}
                    >
                      <Link href="#contact">
                        Claim this offer
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </div>

            {/* Animated top stroke */}
            <motion.div
              className="absolute top-0 inset-x-0 h-1"
              style={{ background: offer.accent }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
