"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Copy, RefreshCw, Lightbulb, Sparkles, Upload, ImageIcon, X, Wand2 } from "lucide-react"
import { Reveal, SectionHeading, Magnetic } from "@/components/motion/primitives"
import { Button } from "@/components/ui/button"
import { VISUALIZER_COLORS, PALETTE_SWATCHES } from "@/lib/data/content"
import { cn } from "@/lib/utils"

const ROOM_ACCENTS = [
  { name: "Living Room", src: "/images/gallery-living-room.png" },
  { name: "Bedroom", src: "/images/gallery-bedroom.png" },
  { name: "Kitchen", src: "/images/gallery-kitchen.png" },
  { name: "Office", src: "/images/gallery-office.png" },
]

export function ColorVisualizer() {
  const [active, setActive] = React.useState(0)
  const [accentWall, setAccentWall] = React.useState(true)
  const [room, setRoom] = React.useState(0)
  const [copied, setCopied] = React.useState(false)
  const [uploadedRoom, setUploadedRoom] = React.useState<string | null>(null)
  const [uploadName, setUploadName] = React.useState<string>("")
  const [dragOver, setDragOver] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const color = VISUALIZER_COLORS[active]

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(color.hex)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  const randomize = () => {
    const next = Math.floor(Math.random() * VISUALIZER_COLORS.length)
    setActive(next)
  }

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = () => {
      setUploadedRoom(reader.result as string)
      setUploadName(file.name)
    }
    reader.readAsDataURL(file)
  }

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) handleFile(f)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files?.[0]
    if (f) handleFile(f)
  }

  const clearUpload = () => {
    setUploadedRoom(null)
    setUploadName("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const currentRoomSrc = uploadedRoom ?? ROOM_ACCENTS[room].src
  const currentRoomName = uploadedRoom ? uploadName || "Your room" : ROOM_ACCENTS[room].name

  return (
    <section id="visualizer" className="relative py-20 sm:py-28 overflow-hidden bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Try it · Live visualizer"
          title={
            <>
              Pick a colour. <span className="text-gradient-warm">Watch your walls transform.</span>
            </>
          }
          description="Experiment with our seasonal palette and a real interior. Toggle accent walls, change rooms, copy hex codes — then bring your favourite to a free in-home consultation."
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-6">
          {/* Room preview */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div
              className={cn(
                "relative rounded-3xl overflow-hidden border-4 border-card shadow-card aspect-[16/10]",
                dragOver && "border-primary border-dashed"
              )}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
            >
              <img
                src={currentRoomSrc}
                alt={`${currentRoomName} interior with applied colour`}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Color overlay on walls using mix-blend */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${active}-${accentWall}-${room}-${uploadedRoom ?? "default"}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: accentWall ? 0.55 : 0.35 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                  style={{
                    background: color.hex,
                    mixBlendMode: accentWall ? "multiply" : "soft-light",
                  }}
                />
              </AnimatePresence>

              {/* Drag overlay hint */}
              <AnimatePresence>
                {dragOver && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-primary/30 backdrop-blur-sm grid place-items-center"
                  >
                    <div className="text-center text-white">
                      <Upload className="h-10 w-10 mx-auto mb-2" />
                      <p className="font-display text-lg font-bold">Drop your room photo here</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Top bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                <span className="rounded-full glass border border-white/20 px-3 py-1 text-[11px] font-medium text-white max-w-[60%] truncate">
                  {currentRoomName} Preview
                </span>
                <div className="flex items-center gap-1">
                  {uploadedRoom && (
                    <button
                      onClick={clearUpload}
                      className="rounded-full glass border border-white/20 px-3 py-1 text-[11px] font-medium text-white hover:bg-white/20 transition flex items-center gap-1"
                    >
                      <X className="h-3 w-3" />
                      Remove
                    </button>
                  )}
                  <button
                    onClick={() => setAccentWall((v) => !v)}
                    className="rounded-full glass border border-white/20 px-3 py-1 text-[11px] font-medium text-white hover:bg-white/20 transition"
                  >
                    {accentWall ? "Accent wall" : "Full room"}
                  </button>
                </div>
              </div>

              {/* Color name chip */}
              <motion.div
                key={`chip-${active}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3"
              >
                <div className="glass rounded-2xl border border-white/20 px-4 py-3 flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className="h-9 w-9 rounded-full border-2 border-white shrink-0"
                    style={{ background: color.hex }}
                  />
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold text-white truncate">{color.name}</p>
                    <p className="text-[11px] text-white/70 font-mono">{color.hex}</p>
                  </div>
                </div>
                <button
                  onClick={onCopy}
                  className="rounded-2xl glass border border-white/20 px-3 py-3 text-white hover:bg-white/20 transition grid place-items-center"
                  aria-label="Copy hex"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </motion.div>
            </div>

            {/* Room tabs + upload */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {ROOM_ACCENTS.map((r, i) => (
                <button
                  key={r.name}
                  onClick={() => { setRoom(i); setUploadedRoom(null) }}
                  disabled={!!uploadedRoom}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium border transition ${
                    room === i && !uploadedRoom
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border/60 text-muted-foreground hover:text-foreground disabled:opacity-50"
                  }`}
                >
                  {r.name}
                </button>
              ))}
              <div className="h-5 w-px bg-border mx-1" />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onFileInput}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium border transition flex items-center gap-1.5",
                  uploadedRoom
                    ? "bg-paint-sage text-white border-paint-sage"
                    : "bg-card border-dashed border-primary/50 text-primary hover:bg-primary/5"
                )}
              >
                {uploadedRoom ? (
                  <><ImageIcon className="h-3 w-3" /> {uploadName.slice(0, 12)}{uploadName.length > 12 ? "..." : ""}</>
                ) : (
                  <><Upload className="h-3 w-3" /> Upload your room</>
                )}
              </button>
            </div>
          </Reveal>

          {/* Color picker */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display text-base font-bold">Seasonal palette</h4>
                  <Magnetic>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={randomize}
                      className="rounded-full text-xs hover:bg-secondary"
                    >
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Surprise me
                    </Button>
                  </Magnetic>
                </div>

                <div className="grid grid-cols-4 gap-2.5">
                  {VISUALIZER_COLORS.map((c, i) => (
                    <motion.button
                      key={c.hex}
                      onClick={() => setActive(i)}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      className={`relative aspect-square rounded-xl border-2 transition ${
                        active === i ? "border-foreground scale-105" : "border-transparent"
                      }`}
                      style={{ background: c.hex }}
                      aria-label={`Select ${c.name}`}
                    >
                      {active === i && (
                        <motion.span
                          layoutId="active-swatch"
                          className="absolute inset-0 rounded-xl border-2 border-white shadow-lg grid place-items-center"
                        >
                          <Check className="h-4 w-4 text-white drop-shadow" strokeWidth={3} />
                        </motion.span>
                      )}
                    </motion.button>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl bg-secondary/60 p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-paint-saffron shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">{color.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Pair with ivory trim and warm wood tones for a soft, welcoming glow.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display text-base font-bold">Full swatch library</h4>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {PALETTE_SWATCHES.length} shades
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-1.5 max-h-32 overflow-y-auto scrollbar-thin pr-1">
                  {PALETTE_SWATCHES.map((s) => (
                    <button
                      key={s.hex}
                      title={`${s.name} · ${s.mood}`}
                      className="group relative aspect-square rounded-lg border border-border/40 overflow-hidden"
                      style={{ background: s.hex }}
                    >
                      <span className="absolute inset-x-0 bottom-0 bg-black/70 text-white text-[8px] px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity truncate">
                        {s.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <Button
                asChild
                size="lg"
                className="w-full rounded-2xl paint-gradient text-white border-0 shadow-warm hover:opacity-90"
              >
                <a href="#contact">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Bring {color.name} home — book a free visit
                </a>
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
