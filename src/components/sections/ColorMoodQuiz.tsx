"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles, ArrowRight, ArrowLeft, RefreshCw, Heart, Coffee,
  Mountain, Sunset, Trees, Waves, Check, Copy,
} from "lucide-react"
import { Reveal, SectionHeading, Magnetic } from "@/components/motion/primitives"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Question {
  id: string
  text: string
  options: {
    label: string
    icon: typeof Heart
    value: Mood
    emoji?: string
  }[]
}

type Mood = "warm" | "calm" | "bold" | "natural"

const QUESTIONS: Question[] = [
  {
    id: "morning",
    text: "It's Sunday morning. Where would you rather be?",
    options: [
      { label: "Sipping chai on a sunlit balcony", icon: Coffee, value: "warm", emoji: "☕" },
      { label: "Reading by a quiet window", icon: Trees, value: "calm", emoji: "📚" },
      { label: "Hiking a misty mountain trail", icon: Mountain, value: "natural", emoji: "🏔️" },
      { label: "Watching the sun set over the sea", icon: Sunset, value: "bold", emoji: "🌅" },
    ],
  },
  {
    id: "room",
    text: "Walking into your dream room, what hits you first?",
    options: [
      { label: "A warm, golden glow", icon: Sunset, value: "warm", emoji: "✨" },
      { label: "A soft, hushed calm", icon: Waves, value: "calm", emoji: "🌊" },
      { label: "Earthy textures and wood", icon: Trees, value: "natural", emoji: "🌿" },
      { label: "A bold, statement wall", icon: Sparkles, value: "bold", emoji: "🎨" },
    ],
  },
  {
    id: "weekend",
    text: "Pick a weekend colour palette:",
    options: [
      { label: "Saffron, mustard, terracotta", icon: Sunset, value: "warm", emoji: "🟠" },
      { label: "Sage, ivory, dusty rose", icon: Trees, value: "calm", emoji: "🟢" },
      { label: "Clay, olive, sand", icon: Mountain, value: "natural", emoji: "🟤" },
      { label: "Charcoal, paprika, teal", icon: Sparkles, value: "bold", emoji: "⚫" },
    ],
  },
  {
    id: "feeling",
    text: "How do you want your home to feel?",
    options: [
      { label: "Welcoming & cozy", icon: Coffee, value: "warm", emoji: "🤗" },
      { label: "Restful & airy", icon: Waves, value: "calm", emoji: "😌" },
      { label: "Grounded & earthy", icon: Trees, value: "natural", emoji: "🌳" },
      { label: "Inspiring & dramatic", icon: Sparkles, value: "bold", emoji: "💫" },
    ],
  },
]

const RESULTS: Record<Mood, {
  title: string
  subtitle: string
  description: string
  colors: { name: string; hex: string }[]
  roomTip: string
  accent: string
}> = {
  warm: {
    title: "Warm & Grounded",
    subtitle: "You belong to the sunset palette",
    description: "You crave warmth, comfort and that golden-hour glow. Your perfect home wraps you in earthy, sun-kissed tones that feel instantly welcoming.",
    colors: [
      { name: "Terracotta Glow", hex: "#E0623A" },
      { name: "Saffron Sun", hex: "#F2A93B" },
      { name: "Cinnamon Stick", hex: "#A0522D" },
      { name: "Mustard Field", hex: "#D9A441" },
    ],
    roomTip: "Pair a terracotta accent wall with cream trim and warm wood furniture for a cozy, golden glow.",
    accent: "#E0623A",
  },
  calm: {
    title: "Calm & Airy",
    subtitle: "You belong to the mist palette",
    description: "You seek stillness. Your ideal home is a serene retreat — soft, hushed and restful, with gentle hues that let your mind breathe.",
    colors: [
      { name: "Sage Garden", hex: "#8FA68E" },
      { name: "Rose Quartz", hex: "#D98C8C" },
      { name: "Ivory Cream", hex: "#F4E9D6" },
      { name: "Blush Petal", hex: "#E8C5C5" },
    ],
    roomTip: "Layer sage, ivory and dusty rose with linen textures and soft natural light for a meditative space.",
    accent: "#8FA68E",
  },
  natural: {
    title: "Earthy & Natural",
    subtitle: "You belong to the forest palette",
    description: "You're drawn to the grounded, organic beauty of the earth. Your home should feel like an extension of nature — textured, layered and alive.",
    colors: [
      { name: "Clay Hut", hex: "#B65C3F" },
      { name: "Forest Pine", hex: "#3F5C3A" },
      { name: "Sand Dune", hex: "#D4B896" },
      { name: "Olive Branch", hex: "#7B7D4F" },
    ],
    roomTip: "Combine clay and forest green with raw wood, jute and stone textures for an earthy, grounding feel.",
    accent: "#B65C3F",
  },
  bold: {
    title: "Bold & Dramatic",
    subtitle: "You belong to the sunset palette",
    description: "You're not afraid of statement. Your home is a canvas for personality — rich, moody and unapologetically you.",
    colors: [
      { name: "Charcoal Slate", hex: "#3B3A36" },
      { name: "Paprika Spice", hex: "#B23A1B" },
      { name: "Teal Lagoon", hex: "#4C8C8C" },
      { name: "Mustard Field", hex: "#D9A441" },
    ],
    roomTip: "Anchor a charcoal or deep teal accent wall with brass accents and mustard textiles for drama.",
    accent: "#B23A1B",
  },
}

export function ColorMoodQuiz() {
  const [step, setStep] = React.useState(0)
  const [answers, setAnswers] = React.useState<Mood[]>([])
  const [showResult, setShowResult] = React.useState(false)
  const [copied, setCopied] = React.useState<string | null>(null)

  const total = QUESTIONS.length
  const current = QUESTIONS[step]

  const select = (mood: Mood) => {
    const next = [...answers]
    next[step] = mood
    setAnswers(next)
    if (step < total - 1) {
      setStep((s) => s + 1)
    } else {
      setShowResult(true)
    }
  }

  const back = () => {
    if (step > 0) setStep((s) => s - 1)
  }

  const restart = () => {
    setStep(0)
    setAnswers([])
    setShowResult(false)
  }

  // Compute winning mood
  const winner: Mood = React.useMemo(() => {
    if (!showResult) return "warm"
    const counts: Record<Mood, number> = { warm: 0, calm: 0, bold: 0, natural: 0 }
    answers.forEach((a) => { counts[a]++ })
    const max = Math.max(...Object.values(counts))
    return (Object.entries(counts).find(([, v]) => v === max)?.[0] ?? "warm") as Mood
  }, [showResult, answers])

  const result = RESULTS[winner]

  const copyHex = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(hex)
      setTimeout(() => setCopied(null), 1500)
    } catch {}
  }

  const progress = ((step + (showResult ? 1 : 0)) / total) * 100

  return (
    <section id="quiz" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-paint-coral/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-paint-saffron/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="2-minute colour quiz"
          title={
            <>
              What&apos;s your <span className="text-gradient-warm">colour personality?</span>
            </>
          }
          description="Answer 4 quick questions and we'll match you with your perfect palette — backed by our colour consultants' 15 years of experience."
        />

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-3xl border border-border/60 bg-card shadow-card overflow-hidden">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key={`q-${step}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Progress */}
                  <div className="px-6 sm:px-8 pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                        Question {step + 1} of {total}
                      </span>
                      <span className="text-[11px] font-semibold text-primary tabular-nums">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        className="h-full paint-gradient origin-left"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="p-6 sm:p-8">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-balance">
                      {current.text}
                    </h3>

                    {/* Options */}
                    <div className="mt-6 grid sm:grid-cols-2 gap-3">
                      {current.options.map((opt, i) => {
                        const isSelected = answers[step] === opt.value
                        return (
                          <motion.button
                            key={opt.label}
                            onClick={() => select(opt.value)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ y: -3, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                              "group relative flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all",
                              isSelected
                                ? "border-primary bg-primary/5 shadow-warm"
                                : "border-border/60 bg-background hover:border-primary/40"
                            )}
                          >
                            <span className="text-2xl shrink-0">{opt.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-pretty">{opt.label}</p>
                            </div>
                            <opt.icon className={cn(
                              "h-4 w-4 shrink-0 transition-colors",
                              isSelected ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                            )} />
                          </motion.button>
                        )
                      })}
                    </div>

                    {/* Nav */}
                    <div className="mt-6 flex items-center justify-between">
                      <button
                        onClick={back}
                        disabled={step === 0}
                        className="text-sm text-muted-foreground hover:text-foreground transition flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back
                      </button>
                      <span className="text-xs text-muted-foreground">
                        ✨ No email required
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Result */
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Header with accent gradient */}
                  <div
                    className="relative p-6 sm:p-8 text-white"
                    style={{ background: `linear-gradient(135deg, ${result.accent}, ${result.accent}cc 60%, ${result.accent}99)` }}
                  >
                    <div className="absolute inset-0 bg-noise opacity-15" />
                    <div className="relative">
                      <motion.div
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                        className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur grid place-items-center mb-3"
                      >
                        <Sparkles className="h-7 w-7 text-white" />
                      </motion.div>
                      <p className="text-[11px] uppercase tracking-widest text-white/80">
                        Your colour personality
                      </p>
                      <h3 className="font-display text-3xl sm:text-4xl font-bold mt-1">
                        {result.title}
                      </h3>
                      <p className="text-white/90 text-sm mt-1">{result.subtitle}</p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 sm:p-8">
                    <p className="text-muted-foreground text-pretty">{result.description}</p>

                    {/* Recommended colors */}
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold mt-6 mb-3">
                      Your recommended palette
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {result.colors.map((c, i) => (
                        <motion.button
                          key={c.hex}
                          onClick={() => copyHex(c.hex)}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + i * 0.08 }}
                          whileHover={{ y: -4 }}
                          className="group rounded-2xl overflow-hidden border border-border/60 bg-background"
                        >
                          <div
                            className="h-16 relative"
                            style={{ background: c.hex }}
                          >
                            <div className="absolute inset-0 bg-noise opacity-15 mix-blend-overlay" />
                            {copied === c.hex && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-black/50 grid place-items-center"
                              >
                                <Check className="h-5 w-5 text-white" />
                              </motion.div>
                            )}
                          </div>
                          <div className="p-2">
                            <p className="text-xs font-semibold truncate">{c.name}</p>
                            <p className="text-[10px] text-muted-foreground font-mono">{c.hex}</p>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {/* Room tip */}
                    <div className="mt-5 rounded-2xl bg-secondary/60 p-4 flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg paint-gradient grid place-items-center shrink-0">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
                          Stylist tip
                        </p>
                        <p className="text-sm mt-0.5 text-pretty">{result.roomTip}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <Magnetic className="flex-1">
                        <Button
                          asChild
                          className="w-full rounded-full paint-gradient text-white border-0 shadow-warm hover:opacity-90"
                        >
                          <a href="#contact">
                            Get this palette on your walls
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      </Magnetic>
                      <Button
                        onClick={restart}
                        variant="outline"
                        className="rounded-full border-border/60 hover:bg-secondary"
                      >
                        <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                        Retake quiz
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
