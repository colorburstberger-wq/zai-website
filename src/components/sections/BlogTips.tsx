"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowUpRight, Clock, Lightbulb, Calendar, TrendingUp,
  Home, Sparkles, Palette,
} from "lucide-react"
import { Reveal, SectionHeading, Magnetic } from "@/components/motion/primitives"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Post {
  id: string
  title: string
  excerpt: string
  category: string
  readMins: number
  date: string
  accent: string
  icon: typeof Lightbulb
  image: string
  featured?: boolean
}

const POSTS: Post[] = [
  {
    id: "monsoon-paint-guide",
    title: "Monsoon-proof your exterior: a 7-step paint guide",
    excerpt: "East India's monsoon is brutal on exterior walls. Here's our complete checklist — from algae wash to the right weatherproof emulsion — to keep your home looking fresh for the next decade.",
    category: "Exterior",
    readMins: 6,
    date: "12 Aug 2024",
    accent: "var(--paint-coral)",
    icon: Home,
    image: "/images/blog-monsoon.png",
    featured: true,
  },
  {
    id: "2024-colour-trends",
    title: "Colour trends 2024: warm, earthy, grounding",
    excerpt: "Why saffron, terracotta and sage are dominating Indian interiors this year — and 5 ways to use them without overwhelming a room.",
    category: "Trends",
    readMins: 4,
    date: "28 Jul 2024",
    accent: "var(--paint-saffron)",
    icon: TrendingUp,
    image: "/images/blog-trends.png",
  },
  {
    id: "accent-walls-101",
    title: "Accent walls 101: where, when & how",
    excerpt: "A designer accent wall can transform a room. We break down the rules of placement, finish and colour pairing — plus 3 mistakes to avoid.",
    category: "Design",
    readMins: 5,
    date: "14 Jul 2024",
    accent: "var(--paint-sage)",
    icon: Palette,
    image: "/images/blog-accent.png",
  },
  {
    id: "stucco-vs-emulsion",
    title: "Italian stucco vs premium emulsion: what's worth it?",
    excerpt: "Texture finishes are beautiful — but not always necessary. A frank comparison of cost, maintenance and lifespan to help you decide.",
    category: "Texture",
    readMins: 7,
    date: "30 Jun 2024",
    accent: "var(--paint-clay)",
    icon: Sparkles,
    image: "/images/blog-stucco.png",
  },
]

const CATEGORIES = ["All", "Exterior", "Trends", "Design", "Texture", "Tips"]

export function BlogTips() {
  const [cat, setCat] = React.useState("All")
  const filtered = POSTS.filter((p) => cat === "All" || p.category === cat)
  const featured = POSTS.find((p) => p.featured)
  const others = filtered.filter((p) => !p.featured).slice(0, 3)

  return (
    <section id="blog" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <SectionHeading
            align="left"
            kicker="Journal & colour journal"
            title={
              <>
                Tips, trends & <span className="text-gradient-warm">tricks of the trade.</span>
              </>
            }
            description="Fifteen years of painting wisdom, distilled into short, practical reads."
          />
          <Reveal>
            <Magnetic>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-border/70 hover:bg-secondary"
              >
                <Link href="#blog">
                  View all articles
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </Magnetic>
          </Reveal>
        </div>

        {/* Category filter */}
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium border transition",
                  cat === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border/60 hover:border-primary/50"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          {/* Featured post */}
          {featured && cat === "All" && (
            <Reveal className="lg:col-span-7" delay={0.05}>
              <motion.a
                href="#blog"
                whileHover={{ y: -6 }}
                className="group relative block rounded-3xl overflow-hidden border border-border/60 bg-card shadow-card hover:shadow-warm transition-shadow h-full"
              >
                {/* Image / texture header */}
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0 opacity-40 mix-blend-multiply"
                    style={{ background: `linear-gradient(135deg, ${featured.accent}, ${featured.accent}99 50%, ${featured.accent}66)` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
                  {/* Big icon */}
                  <featured.icon className="absolute right-6 bottom-6 h-20 w-20 text-white/30 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700" strokeWidth={1} />

                  {/* Category & date */}
                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <span className="rounded-full glass border border-white/20 px-3 py-1 text-[11px] font-semibold text-white">
                      Featured
                    </span>
                    <span className="rounded-full bg-white/20 backdrop-blur px-3 py-1 text-[11px] font-medium text-white">
                      {featured.category}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {featured.readMins} min read
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold mt-3 group-hover:text-primary transition-colors text-balance">
                    {featured.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground text-pretty">
                    {featured.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Read article
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </motion.a>
            </Reveal>
          )}

          {/* Other posts */}
          <div className={cn("flex flex-col gap-4", featured && cat === "All" ? "lg:col-span-5" : "lg:col-span-12")}>
            {others.map((p, i) => (
              <Reveal key={p.id} delay={0.1 + i * 0.05}>
                <motion.a
                  href="#blog"
                  whileHover={{ y: -3 }}
                  className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-4 sm:p-5 shadow-card hover:shadow-warm transition-shadow"
                >
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div
                      className="absolute inset-0 opacity-50 mix-blend-multiply"
                      style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}99)` }}
                    />
                    <p.icon className="absolute inset-0 m-auto h-6 w-6 text-white drop-shadow" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="rounded-full bg-secondary px-2 py-0.5 font-semibold">{p.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {p.readMins} min
                      </span>
                    </div>
                    <h4 className="font-display text-base sm:text-lg font-bold mt-1.5 group-hover:text-primary transition-colors leading-tight">
                      {p.title}
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground text-pretty line-clamp-2">
                      {p.excerpt}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                </motion.a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
