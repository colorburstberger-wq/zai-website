"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check, Copy, RefreshCw, Lightbulb, Sparkles, Upload, ImageIcon, X,
  Wand2, Layers, Eraser,
} from "lucide-react"
import { Reveal, SectionHeading, Magnetic } from "@/components/motion/primitives"
import { Button } from "@/components/ui/button"
import { VISUALIZER_COLORS } from "@/lib/data/content"
import { BERGER_SHADES } from "@/lib/data/berger-shades"
import { cn } from "@/lib/utils"

// Room definitions with SVG-traced wall zones
// Each zone has an SVG path that traces the exact wall/ceiling/boundary shape
interface WallZone {
  id: string
  name: string
  // SVG path in viewBox coordinates (0 0 1344 768)
  path: string
}

interface Room {
  name: string
  src: string
  zones: WallZone[]
}

const ROOMS: Room[] = [
  {
    name: "Living Room",
    src: "/images/room-interior.png",
    zones: [
      // Ceiling — top strip across full width
      {
        id: "ceiling",
        name: "Ceiling",
        path: "M 0,0 L 1344,0 L 1344,240 L 0,240 Z",
      },
      // Left wall — left side from top corner to floor
      {
        id: "left-wall",
        name: "Left Wall",
        path: "M 0,0 L 0,768 L 363,692 L 363,240 Z",
      },
      // Back wall — center area (above sofa)
      {
        id: "back-wall",
        name: "Back Wall",
        path: "M 363,240 L 941,240 L 941,630 L 363,630 Z",
      },
      // Right wall — right side
      {
        id: "right-wall",
        name: "Right Wall",
        path: "M 941,240 L 1344,0 L 1344,768 L 941,692 Z",
      },
    ],
  },
  {
    name: "Exterior",
    src: "/images/room-exterior.png",
    zones: [
      // Front wall — left section
      {
        id: "front-wall",
        name: "Front Wall",
        path: "M 0,58 L 590,50 L 590,768 L 0,768 Z",
      },
      // Side wall — right section (excluding door)
      {
        id: "side-wall",
        name: "Side Wall",
        path: "M 590,50 L 1344,0 L 1344,768 L 1070,768 L 1070,604 L 590,768 Z M 1070,604 L 1135,604 L 1135,768 L 1070,768 Z",
      },
      // Roof/parapet
      {
        id: "roof",
        name: "Roof / Parapet",
        path: "M 0,0 L 1344,0 L 1344,50 L 590,50 L 0,58 Z",
      },
    ],
  },
  {
    name: "Kitchen",
    src: "/images/room-kitchen.png",
    zones: [
      // Upper back wall (above cabinets)
      {
        id: "upper-wall",
        name: "Upper Wall",
        path: "M 0,0 L 1344,0 L 1344,123 L 0,123 Z",
      },
      // Backsplash area (between cabinets and counter)
      {
        id: "backsplash",
        name: "Backsplash Wall",
        path: "M 87,315 L 1255,315 L 1255,460 L 87,460 Z",
      },
    ],
  },
]

// Featured shades for quick access
const FEATURED = VISUALIZER_COLORS

// Full Berger catalogue
const ALL_SHADES = BERGER_SHADES

export function ColorVisualizer() {
  const [roomIdx, setRoomIdx] = React.useState(0)
  const [selectedZone, setSelectedZone] = React.useState<string | null>(null)
  const [zoneColors, setZoneColors] = React.useState<Record<string, { hex: string; code: string; name: string }>>({})
  const [activeColorIdx, setActiveColorIdx] = React.useState(0)
  const [customColor, setCustomColor] = React.useState<typeof VISUALIZER_COLORS[0] | null>(null)
  const [copied, setCopied] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [visibleCount, setVisibleCount] = React.useState(24)
  const [uploadedRoom, setUploadedRoom] = React.useState<string | null>(null)
  const [uploadName, setUploadName] = React.useState("")
  const [dragOver, setDragOver] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const room = ROOMS[roomIdx]
  const color = activeColorIdx >= 0 ? FEATURED[activeColorIdx] : (customColor ?? FEATURED[0])

  // Handle room change
  const changeRoom = (idx: number) => {
    setRoomIdx(idx)
    setSelectedZone(null)
    setZoneColors({})
  }

  // Apply selected color to selected zone
  const applyColor = () => {
    if (!selectedZone) return
    setZoneColors(prev => ({
      ...prev,
      [selectedZone]: { hex: color.hex, code: color.code, name: color.name }
    }))
  }

  // Click on a wall zone in the SVG
  const onZoneClick = (zoneId: string) => {
    setSelectedZone(zoneId)
  }

  // Remove color from a zone
  const removeZoneColor = (zoneId: string) => {
    setZoneColors(prev => {
      const next = { ...prev }
      delete next[zoneId]
      return next
    })
  }

  const clearAll = () => {
    setZoneColors({})
    setSelectedZone(null)
  }

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${color.code} (${color.hex})`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  // File upload
  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = () => {
      setUploadedRoom(reader.result as string)
      setUploadName(file.name)
      setZoneColors({})
      setSelectedZone(null)
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
    setZoneColors({})
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // Filter shades
  const filteredShades = React.useMemo(() => {
    if (!search.trim()) return ALL_SHADES
    const q = search.toLowerCase().trim()
    return ALL_SHADES.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q) ||
      s.hex.toLowerCase().includes(q)
    )
  }, [search])

  const visibleShades = filteredShades.slice(0, visibleCount)

  return (
    <section id="visualizer" className="relative py-20 sm:py-28 overflow-hidden bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Try it · Live visualizer"
          title={
            <>
              Click a wall. <span className="text-gradient-warm">Paint it any colour.</span>
            </>
          }
          description="Select individual walls, ceiling, and boundary surfaces in the room — each gets its own Berger shade. Choose from 1,054+ real Berger colours with official codes."
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-6">
          {/* Room preview with SVG wall zones */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div
              className={cn(
                "relative rounded-3xl overflow-hidden border-4 border-card shadow-card aspect-[16/9]",
                dragOver && "border-primary border-dashed"
              )}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
            >
              {/* Base room image */}
              <img
                src={uploadedRoom ?? room.src}
                alt={uploadedRoom ? uploadName : room.name}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* SVG overlay with clickable wall zones */}
              {!uploadedRoom && (
                <svg
                  viewBox="0 0 1344 768"
                  preserveAspectRatio="xMidYMid slice"
                  className="absolute inset-0 h-full w-full"
                >
                  <defs>
                    {/* Clip path for each zone's color overlay */}
                    {room.zones.map((zone) => (
                      <clipPath key={`clip-${zone.id}`} id={`clip-${zone.id}`}>
                        <path d={zone.path} />
                      </clipPath>
                    ))}
                  </defs>

                  {/* Color overlays for painted zones */}
                  {room.zones.map((zone) => {
                    const wc = zoneColors[zone.id]
                    if (!wc) return null
                    return (
                      <g key={`color-${zone.id}`} clipPath={`url(#clip-${zone.id})`}>
                        <path
                          d={zone.path}
                          fill={wc.hex}
                          fillOpacity={0.55}
                          style={{ mixBlendMode: "multiply" }}
                        />
                      </g>
                    )
                  })}

                  {/* Interactive zone outlines (clickable) */}
                  {room.zones.map((zone) => {
                    const isSelected = selectedZone === zone.id
                    const isPainted = !!zoneColors[zone.id]
                    return (
                      <path
                        key={`zone-${zone.id}`}
                        d={zone.path}
                        fill={isSelected ? "rgba(58,115,115,0.15)" : "transparent"}
                        stroke={isSelected ? "#3D7373" : isPainted ? "rgba(255,255,255,0.3)" : "transparent"}
                        strokeWidth={isSelected ? 3 : 1}
                        strokeDasharray={isSelected ? "8 4" : "none"}
                        className="cursor-pointer transition-all"
                        onClick={() => onZoneClick(zone.id)}
                        style={{ pointerEvents: "all" }}
                      />
                    )
                  })}

                  {/* Hover labels */}
                  {room.zones.map((zone) => {
                    if (selectedZone !== zone.id) return null
                    // Get approximate center of path for label
                    const wc = zoneColors[zone.id]
                    return (
                      <text
                        key={`label-${zone.id}`}
                        x="672"
                        y="384"
                        textAnchor="middle"
                        fill="white"
                        fontSize="20"
                        fontWeight="bold"
                        style={{ pointerEvents: "none", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
                      >
                        {zone.name}{wc ? ` · ${wc.code}` : ""}
                      </text>
                    )
                  })}
                </svg>
              )}

              {/* For uploaded rooms — single overlay */}
              {uploadedRoom && Object.keys(zoneColors).length > 0 && (
                <div
                  className="absolute inset-0"
                  style={{
                    background: zoneColors["back"]?.hex || color.hex,
                    mixBlendMode: "multiply",
                    opacity: 0.5,
                  }}
                />
              )}

              {/* Drag overlay */}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

              {/* Top bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                <span className="rounded-full glass border border-white/20 px-3 py-1 text-[11px] font-medium text-white">
                  {uploadedRoom ? uploadName.slice(0, 20) : room.name}
                </span>
                {(Object.keys(zoneColors).length > 0 || selectedZone) && (
                  <div className="flex items-center gap-1 pointer-events-auto">
                    {Object.keys(zoneColors).length > 0 && (
                      <button
                        onClick={clearAll}
                        className="rounded-full glass border border-white/20 px-3 py-1 text-[11px] font-medium text-white hover:bg-white/20 transition flex items-center gap-1"
                      >
                        <Eraser className="h-3 w-3" /> Clear all
                      </button>
                    )}
                    {uploadedRoom && (
                      <button
                        onClick={clearUpload}
                        className="rounded-full glass border border-white/20 px-3 py-1 text-[11px] font-medium text-white hover:bg-white/20 transition flex items-center gap-1"
                      >
                        <X className="h-3 w-3" /> Remove
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Instructions overlay (when no zone selected) */}
              {!selectedZone && !uploadedRoom && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <div className="glass rounded-2xl border border-white/20 p-3 text-center">
                    <Layers className="inline h-4 w-4 text-white/80 mr-1.5" />
                    <span className="text-[11px] text-white/90 font-medium">
                      Click on any wall or surface in the room to select it
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Selected zone info + apply button */}
              {selectedZone && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <div className="glass rounded-2xl border border-white/20 p-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-white/70">
                        Selected surface
                      </p>
                      <p className="font-display text-sm font-bold text-white">
                        {room.zones.find(z => z.id === selectedZone)?.name}
                      </p>
                      {zoneColors[selectedZone] && (
                        <p className="text-[11px] text-white/80 font-mono">
                          {zoneColors[selectedZone].code} · {zoneColors[selectedZone].name}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={applyColor}
                      className="rounded-xl paint-gradient text-white px-4 py-2 text-sm font-semibold shadow-warm hover:opacity-90 transition flex items-center gap-1.5 shrink-0"
                    >
                      <Wand2 className="h-3.5 w-3.5" />
                      Paint {color.name}
                    </button>
                    {zoneColors[selectedZone] && (
                      <button
                        onClick={() => removeZoneColor(selectedZone)}
                        className="rounded-xl bg-white/20 px-2.5 py-2 text-white hover:bg-white/30 transition shrink-0"
                        title="Remove paint from this surface"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Room selector + upload */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {!uploadedRoom && ROOMS.map((r, i) => (
                <button
                  key={r.name}
                  onClick={() => changeRoom(i)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium border transition",
                    roomIdx === i && !uploadedRoom
                      ? "bg-primary text-primary-foreground border-primary shadow-warm"
                      : "bg-card border-border/60 hover:border-primary/50"
                  )}
                >
                  {r.name}
                  <span className="ml-1.5 text-[10px] opacity-60">
                    {r.zones.length} surfaces
                  </span>
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
                  "rounded-full px-3 py-2 text-sm font-medium border transition flex items-center gap-1.5",
                  uploadedRoom
                    ? "bg-paint-sage text-white border-paint-sage"
                    : "bg-card border-dashed border-primary/50 text-primary hover:bg-primary/5"
                )}
              >
                {uploadedRoom ? (
                  <><ImageIcon className="h-3.5 w-3.5" /> Uploaded</>
                ) : (
                  <><Upload className="h-3.5 w-3.5" /> Upload your room</>
                )}
              </button>
            </div>

            {/* Zone legend (painted surfaces) */}
            {Object.keys(zoneColors).length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {Object.entries(zoneColors).map(([zoneId, wc]) => {
                  const zone = room.zones.find(z => z.id === zoneId)
                  if (!zone) return null
                  return (
                    <div
                      key={zoneId}
                      className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs"
                    >
                      <span
                        className="h-3 w-3 rounded-full border border-border/40"
                        style={{ background: wc.hex }}
                      />
                      <span className="font-medium">{zone.name}</span>
                      <span className="font-mono text-primary font-bold">{wc.code}</span>
                      <button
                        onClick={() => removeZoneColor(zoneId)}
                        className="ml-1 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </Reveal>

          {/* Color picker */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display text-base font-bold">Featured Berger Shades</h4>
                  <button
                    onClick={() => setActiveColorIdx(Math.floor(Math.random() * FEATURED.length))}
                    className="text-xs text-muted-foreground hover:text-primary transition flex items-center gap-1"
                  >
                    <RefreshCw className="h-3 w-3" /> Random
                  </button>
                </div>

                {/* Quick palette */}
                <div className="grid grid-cols-4 gap-2.5">
                  {FEATURED.map((c, i) => (
                    <motion.button
                      key={c.code}
                      onClick={() => setActiveColorIdx(i)}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.94 }}
                      className={cn(
                        "relative aspect-square rounded-xl border-2 transition",
                        activeColorIdx === i ? "border-foreground scale-105" : "border-transparent"
                      )}
                      style={{ background: c.hex }}
                      aria-label={`Select ${c.name} (${c.code})`}
                    >
                      {activeColorIdx === i && (
                        <span className="absolute inset-0 rounded-xl border-2 border-white shadow-lg grid place-items-center">
                          <Check className="h-4 w-4 text-white drop-shadow" strokeWidth={3} />
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Selected color info */}
                <div className="mt-4 rounded-2xl bg-secondary/60 p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-paint-saffron shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">
                        {color.name} <span className="font-mono text-xs text-primary">· {color.code}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {selectedZone
                          ? <>Ready to apply to <strong>{room.zones.find(z => z.id === selectedZone)?.name}</strong></>
                          : "Select a wall surface in the room first"
                        }
                      </p>
                    </div>
                    <button
                      onClick={onCopy}
                      className="text-xs text-muted-foreground hover:text-primary transition flex items-center gap-1 shrink-0"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-paint-sage" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Full Berger shade catalogue */}
            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display text-base font-bold">All {ALL_SHADES.length} Berger shades</h4>
                </div>

                {/* Search */}
                <div className="relative mb-3">
                  <input
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setVisibleCount(24) }}
                    placeholder="Search shade name or code..."
                    className="w-full h-9 pl-8 pr-3 text-xs rounded-lg bg-secondary/50 border border-border/60 focus:outline-none focus:border-primary"
                  />
                  <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>

                {/* Shade grid */}
                <div className="grid grid-cols-6 gap-1.5 max-h-48 overflow-y-auto scrollbar-thin pr-1">
                  {visibleShades.map((s) => (
                    <button
                      key={s.code}
                      onClick={() => {
                        // Set as active color by finding in featured or setting directly
                        const idx = FEATURED.findIndex(f => f.code === s.code)
                        if (idx >= 0) {
                          setActiveColorIdx(idx)
                        } else {
                          // Use a custom selected shade
                          setCustomColor(s)
                          setActiveColorIdx(-1)
                        }
                      }}
                      title={`${s.name} · ${s.code}`}
                      className="group relative aspect-square rounded-lg border border-border/40 overflow-hidden"
                      style={{ background: s.hex }}
                    >
                      <span className="absolute inset-x-0 bottom-0 bg-black/70 text-white text-[7px] px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity truncate font-mono font-bold">
                        {s.code}
                      </span>
                    </button>
                  ))}
                </div>

                {visibleCount < filteredShades.length && (
                  <button
                    onClick={() => setVisibleCount(c => c + 24)}
                    className="mt-2 w-full text-xs text-primary hover:underline"
                  >
                    Load more ({filteredShades.length - visibleCount} remaining)
                  </button>
                )}
              </div>
            </Reveal>

            {/* CTA */}
            <Button
              asChild
              size="lg"
              className="w-full rounded-2xl paint-gradient text-white border-0 shadow-warm hover:opacity-90"
            >
              <a href="#contact">
                <Sparkles className="h-4 w-4 mr-2" />
                Book a free colour consultation
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
