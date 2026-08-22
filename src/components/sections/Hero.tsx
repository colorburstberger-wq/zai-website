"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Play, Star, Phone, Sparkles, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SHOP, PARTNERS } from "@/lib/data/content"
import { Magnetic } from "@/components/motion/primitives"

const FLOATING_SWATCHES = [
  { color: "var(--paint-coral)", size: 64, x: "8%", y: "22%", delay: 0, shape: "blob1" },
  { color: "var(--paint-saffron)", size: 48, x: "82%", y: "18%", delay: 0.6, shape: "blob2" },
  { color: "var(--paint-sage)", size: 54, x: "16%", y: "70%", delay: 1.1, shape: "blob3" },
  { color: "var(--paint-rose)", size: 40, x: "88%", y: "64%", delay: 0.3, shape: "blob4" },
  { color: "var(--paint-teal)", size: 36, x: "70%", y: "82%", delay: 0.9, shape: "blob1" },
  { color: "var(--paint-mustard)", size: 44, x: "30%", y: "10%", delay: 1.4, shape: "blob2" },
]

export function Hero() {
  const ref = React.useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/70 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* Floating color swatches */}
      {FLOATING_SWATCHES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute z-[1] pointer-events-none hidden sm:block"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
          }}
          initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
          animate={{
            opacity: [0, 1, 1, 0.8],
            scale: [0.4, 1.1, 1, 1.05],
            rotate: [-20, 5, -5, 10],
            y: [0, -16, 8, -4],
          }}
          transition={{
            duration: 8,
            delay: s.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
            <path
              d={
                s.shape === "blob1"
                  ? "M 50 8 C 70 8 92 28 92 50 C 92 72 72 92 50 92 C 28 92 8 72 8 50 C 8 28 30 8 50 8 Z"
                  : s.shape === "blob2"
                  ? "M 50 4 C 78 4 96 26 96 50 C 96 74 78 96 50 96 C 22 96 4 74 4 50 C 4 26 22 4 50 4 Z"
                  : s.shape === "blob3"
                  ? "M 50 12 C 68 12 88 30 88 50 C 88 70 70 88 50 88 C 30 88 12 70 12 50 C 12 30 32 12 50 12 Z"
                  : "M 50 6 C 72 6 94 28 94 50 C 94 72 72 94 50 94 C 28 94 6 72 6 50 C 6 28 28 6 50 6 Z"
              }
              fill={s.color}
            />
          </svg>
        </motion.div>
      ))}

      {/* Drip animation */}
      <div className="absolute top-0 inset-x-0 z-[1] h-40 pointer-events-none">
        {[20, 38, 55, 72, 90].map((left, i) => (
          <div
            key={i}
            className="absolute top-0 h-1 origin-top animate-drip"
            style={{
              left: `${left}%`,
              background: [
                "var(--paint-coral)",
                "var(--paint-saffron)",
                "var(--paint-sage)",
                "var(--paint-rose)",
                "var(--paint-teal)",
              ][i],
              animationDelay: `${i * 0.8}s`,
              borderRadius: "999px",
              width: "4px",
              height: "60px",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20"
      >
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex w-fit items-center gap-2 rounded-full glass border border-border/60 px-3 py-1.5 text-xs font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-muted-foreground">
                Authorised dealer for
              </span>
              <span className="font-semibold text-foreground">Berger & Asian Paints</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-balance"
            >
              Where every wall
              <br />
              tells a{" "}
              <span className="relative inline-block">
                <span className="text-gradient-warm">colour story.</span>
                <motion.svg
                  viewBox="0 0 320 30"
                  className="absolute -bottom-3 left-0 w-full h-6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, delay: 0.8, ease: "easeInOut" }}
                >
                  <motion.path
                    d="M 6 18 C 60 4, 120 28, 200 12 S 300 22, 314 10"
                    stroke="var(--paint-coral)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl text-pretty"
            >
              {SHOP.tagline} Premium interior & exterior painting, designer textures,
              waterproofing and colour consultation — backed by {SHOP.founded}'s craftsmanship
              and the world's most trusted paint brands.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full paint-gradient text-white border-0 shadow-warm hover:opacity-90 px-6 group"
                >
                  <Link href="#contact">
                    <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Book Free Consultation
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-card/95 backdrop-blur border-2 border-foreground/15 hover:border-foreground/30 hover:bg-card text-foreground shadow-card px-6 group"
                >
                  <Link href="#gallery">
                    <span className="grid place-items-center h-7 w-7 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Play className="h-3.5 w-3.5 text-primary fill-primary" />
                    </span>
                    View our work
                  </Link>
                </Button>
              </Magnetic>
            </motion.div>

            {/* Mini trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2"
            >
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-paint-saffron text-paint-saffron" />
                ))}
                <span className="ml-2 text-sm font-medium">4.9 / 5</span>
                <span className="text-sm text-muted-foreground">· 320+ reviews</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">4,500+</span> homes painted
              </div>
            </motion.div>
          </div>

          {/* Right — visual showcase card */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="relative aspect-[4/5]">
              {/* Decorative paint stroke behind */}
              <div className="absolute -inset-6 paint-gradient rounded-[3rem] opacity-20 blur-2xl animate-float-y-slow" />
              <motion.div
                animate={{ rotate: [0, 2, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-6 top-1/2 -translate-y-1/2 h-28 w-28 rounded-full paint-gradient opacity-90 shadow-warm grid place-items-center"
              >
                <span className="font-display text-3xl font-bold text-white">15+</span>
                <span className="text-[10px] text-white/80 uppercase tracking-widest">years</span>
              </motion.div>

              {/* Main image card */}
              <div className="relative h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-card group">
                <img
                  src="/images/about-painter.png"
                  alt="Master painter at work with a warm terracotta paint roller"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-5 inset-x-5">
                  <div className="rounded-2xl p-4 flex items-center gap-3 border border-white/20 bg-black/55 backdrop-blur-md">
                    <div className="h-12 w-12 rounded-xl paint-gradient grid place-items-center shrink-0 shadow-lg">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/90 font-medium">Talk to a colour expert</p>
                      <a
                        href={`tel:${SHOP.phone.replace(/\s/g, "")}`}
                        className="font-display text-lg font-bold text-white hover:text-paint-saffron transition-colors drop-shadow"
                      >
                        {SHOP.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating paint palette card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="absolute -right-6 -top-6 glass rounded-2xl p-3 shadow-card border border-border/60 animate-float-y"
              >
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 px-1">
                  This season
                </p>
                <div className="flex gap-1.5">
                  {["var(--paint-coral)", "var(--paint-saffron)", "var(--paint-sage)", "var(--paint-rose)", "var(--paint-teal)"].map((c, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.3 }}
                      className="h-8 w-8 rounded-full border-2 border-card shadow"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Brand strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-0 inset-x-0 z-10"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
          <div className="glass rounded-2xl border border-border/60 px-4 py-3 flex flex-wrap items-center justify-center sm:justify-between gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center sm:text-left">
              Proud partner of
            </p>
            <div className="flex items-center gap-6">
              {PARTNERS.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2"
                >
                  <div
                    className="h-9 w-9 rounded-lg grid place-items-center font-bold text-white text-xs"
                    style={{ background: p.accent }}
                  >
                    {p.initials}
                  </div>
                  <div className="hidden sm:block">
                    <p className="font-display text-sm font-bold leading-none group-hover:text-primary transition-colors">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {p.tag}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
