"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail, Linkedin, Award, Palette, Brush, Wrench, Star, Quote,
} from "lucide-react"
import { Reveal, SectionHeading, staggerContainer, staggerItem } from "@/components/motion/primitives"
import { cn } from "@/lib/utils"

interface TeamMember {
  name: string
  role: string
  bio: string
  initials: string
  image: string
  accent: string
  expertise: string[]
  years: number
  projects: number
}

const TEAM: TeamMember[] = [
  {
    name: "Sanjay Jaiswal",
    role: "Owner & Store Manager",
    bio: "Founded the Berger Urban Exclusive Paints Store in Gorakhpur in 2010. Personally guides every customer to the right Berger product for their project.",
    initials: "SJ",
    image: "/images/team-anirban.png",
    accent: "var(--paint-coral)",
    expertise: ["Berger Color Bank", "Product selection", "Project planning"],
    years: 15,
    projects: 1200,
  },
  {
    name: "Anjali Mishra",
    role: "Colour Consultant",
    bio: "Helps Gorakhpur homeowners pick the perfect Berger shade for their lighting and décor. Brings swatch fans and mood boards to every site visit.",
    initials: "AM",
    image: "/images/team-priya.png",
    accent: "var(--paint-saffron)",
    expertise: ["Residential colour", "Lighting", "Berger Easy Clean"],
    years: 8,
    projects: 650,
  },
  {
    name: "Imran Khan",
    role: "Site Supervisor & Texture Specialist",
    bio: "Leads our Berger Designory texture applications across Gorakhpur. Hand-troweled stucco and metallic finishes are his specialty.",
    initials: "IK",
    image: "/images/team-rafiq.png",
    accent: "var(--paint-clay)",
    expertise: ["Berger Designory", "Metallic plaster", "Trowel finishes"],
    years: 12,
    projects: 420,
  },
  {
    name: "Vikas Gupta",
    role: "Waterproofing & Exterior Lead",
    bio: "Berger Weathercoat and Aqua Shield specialist. Has weatherproofed hundreds of Gorakhpur homes against the monsoon.",
    initials: "VG",
    image: "/images/team-sneha.png",
    accent: "var(--paint-teal)",
    expertise: ["Berger Aqua Shield", "Terrace systems", "Bathroom seal"],
    years: 10,
    projects: 380,
  },
]

export function Team() {
  const [hovered, setHovered] = React.useState<number | null>(null)

  return (
    <section id="team" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="The people behind the brush"
          title={
            <>
              Meet the <span className="text-gradient-warm">store team.</span>
            </>
          }
          description="Our family-run Berger Urban Exclusive Paints Store in Gorakhpur is staffed by people who genuinely care about your home — every one of them on our payroll, never sub-contracted."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              variants={staggerItem}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className="group relative rounded-3xl border border-border/60 bg-card overflow-hidden shadow-card hover:shadow-warm transition-shadow"
            >
              {/* Avatar header */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={m.image}
                  alt={`${m.name} — ${m.role} at Berger Urban Exclusive Paints Store`}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Color wash overlay */}
                <div
                  className="absolute inset-0 opacity-50 mix-blend-multiply group-hover:opacity-30 transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${m.accent}, ${m.accent}99 60%, ${m.accent}66)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-noise opacity-15 mix-blend-overlay" />

                {/* Years badge */}
                <span className="absolute top-4 right-4 rounded-full glass border border-white/30 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                  {m.years} yrs
                </span>

                {/* Name overlay at bottom */}
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-[10px] uppercase tracking-widest text-white/80">
                    {m.initials} · Berger Urban Exclusive
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="font-display text-lg font-bold">{m.name}</h3>
                <p className="text-sm text-primary font-medium">{m.role}</p>
                <p className="mt-2 text-xs text-muted-foreground text-pretty leading-relaxed">
                  {m.bio}
                </p>

                {/* Expertise tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {m.expertise.map((e) => (
                    <span
                      key={e}
                      className="rounded-full bg-secondary/60 px-2 py-0.5 text-[10px] font-medium"
                    >
                      {e}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-4 pt-4 border-t border-border/60 grid grid-cols-2 gap-2 text-center">
                  <div>
                    <p className="font-display text-xl font-bold text-gradient-warm tabular-nums">
                      {m.projects}+
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">projects</p>
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold text-gradient-warm tabular-nums">
                      {m.years}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">years</p>
                  </div>
                </div>

                {/* Hover social */}
                <AnimatePresence>
                  {hovered === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="mt-3 flex items-center gap-2"
                    >
                      <button className="h-8 w-8 rounded-lg bg-secondary/60 hover:bg-primary hover:text-primary-foreground grid place-items-center transition-colors">
                        <Mail className="h-3.5 w-3.5" />
                      </button>
                      <button className="h-8 w-8 rounded-lg bg-secondary/60 hover:bg-primary hover:text-primary-foreground grid place-items-center transition-colors">
                        <Linkedin className="h-3.5 w-3.5" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Top stroke */}
              <div
                className="absolute top-0 inset-x-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: m.accent }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Crew stats banner */}
        <Reveal delay={0.1}>
          <div className="mt-10 rounded-3xl paint-gradient-soft border border-border/60 p-6 grid sm:grid-cols-4 gap-4 text-center">
            {[
              { icon: Palette, label: "Certified consultants", value: "4" },
              { icon: Brush, label: "Trained painters", value: "24" },
              { icon: Wrench, label: "Site supervisors", value: "6" },
              { icon: Award, label: "Avg. experience", value: "12 yrs" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center"
              >
                <div className="h-10 w-10 rounded-xl paint-gradient grid place-items-center shadow-warm">
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <p className="font-display text-2xl font-bold mt-2">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
