"use client"

import { motion } from "framer-motion"
import {
  Phone, FileText, Wrench, Brush, CheckCircle2,
  ShieldCheck, Palette, Users, Clock, Sparkles, BadgePercent,
  type LucideIcon,
} from "lucide-react"
import { Reveal, SectionHeading, staggerContainer, staggerItem } from "@/components/motion/primitives"
import { WHY_US, PROCESS_STEPS } from "@/lib/data/content"

const WHY_ICONS: Record<string, LucideIcon> = {
  ShieldCheck, Palette, Users, Clock, Sparkles, BadgePercent,
}

const PROCESS_ICONS: Record<string, LucideIcon> = {
  Phone, FileText, Wrench, Brush, CheckCircle2,
}

export function ProcessWhyUs() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Process */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="How we work"
          title={
            <>
              A five-step process, <span className="text-gradient-warm">no surprises.</span>
            </>
          }
          description="From the first phone call to the final handover walkthrough, you always know what's happening and what comes next."
        />

        <div className="mt-14 relative">
          {/* Connecting line */}
          <div className="absolute top-10 left-0 right-0 hidden lg:block h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5"
          >
            {PROCESS_STEPS.map((step) => {
              const Icon = PROCESS_ICONS[step.icon] ?? Phone
              return (
                <motion.li
                  key={step.step}
                  variants={staggerItem}
                  className="relative group"
                >
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative">
                      <div className="absolute inset-0 paint-gradient rounded-2xl blur-md opacity-30 group-hover:opacity-60 transition-opacity" />
                      <div className="relative h-20 w-20 rounded-2xl paint-gradient grid place-items-center border-2 border-card shadow-warm">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-card border-2 border-primary text-primary font-display text-xs font-bold grid place-items-center shadow-card">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-base font-bold">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground text-pretty">{step.description}</p>
                  </div>
                </motion.li>
              )
            })}
          </motion.ol>
        </div>
      </div>

      {/* Why us */}
      <div className="mt-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Why Chroma House"
          title={
            <>
              The difference is in the <span className="text-gradient-warm">details.</span>
            </>
          }
          description="Six promises that have earned us a 98% referral rate over fifteen years."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {WHY_US.map((w) => {
            const Icon = WHY_ICONS[w.icon] ?? ShieldCheck
            return (
              <motion.div
                key={w.title}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl border border-border/60 bg-card p-6 shadow-card hover:shadow-warm transition-shadow overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full paint-gradient-soft opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl paint-gradient grid place-items-center shadow-warm group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground text-pretty">{w.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
