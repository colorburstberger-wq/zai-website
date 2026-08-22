"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Play, X, Star, Quote, ChevronLeft, ChevronRight, Volume2,
} from "lucide-react"
import { Reveal, SectionHeading } from "@/components/motion/primitives"
import { cn } from "@/lib/utils"

interface VideoTestimonial {
  id: string
  name: string
  role: string
  location: string
  rating: number
  quote: string
  thumbnail: string
  duration: string
  accent: string
  project: string
}

const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: "amit",
    name: "Amit Jaiswal",
    role: "Homeowner",
    location: "Siddharth Enclave, Gorakhpur",
    rating: 5,
    quote: "Best Berger Paints store in Gorakhpur. The team recommended Easy Clean for my living room and the finish is flawless — stains wipe right off.",
    thumbnail: "/images/gallery-living-room.png",
    duration: "2:34",
    accent: "var(--paint-coral)",
    project: "3 BHK Interior · Berger Easy Clean",
  },
  {
    id: "sunita",
    name: "Sunita Mishra",
    role: "Homeowner",
    location: "Taramandal, Gorakhpur",
    rating: 5,
    quote: "Got my full home painted with Berger Breathe Easy — no smell at all! The store owner personally checked the shade match. Genuine, honest people.",
    thumbnail: "/images/gallery-exterior.png",
    duration: "1:58",
    accent: "var(--paint-saffron)",
    project: "Full Home Exterior · Berger Weathercoat",
  },
  {
    id: "rakesh",
    name: "Rakesh Gupta",
    role: "Builder",
    location: "Asuran Chowk, Gorakhpur",
    rating: 5,
    quote: "I've been buying Berger Weathercoat from this store for 3 years. Always genuine product, fair price, same-day delivery. The 5-star Google rating is well deserved.",
    thumbnail: "/images/gallery-bedroom.png",
    duration: "3:12",
    accent: "var(--paint-sage)",
    project: "Villa · Berger Breathe Easy Interior",
  },
  {
    id: "priya",
    name: "Priya Tiwari",
    role: "Homemaker",
    location: "Rail Vihar Colony, Gorakhpur",
    rating: 5,
    quote: "From the colour visualizer to the final handover, the whole experience was smooth. They even matched a custom shade for my pooja room. Highly recommend.",
    thumbnail: "/images/gallery-office.png",
    duration: "2:47",
    accent: "var(--paint-teal)",
    project: "Home Interior · Custom Shade Match",
  },
]

export function VideoTestimonials() {
  const [active, setActive] = React.useState(0)
  const [playing, setPlaying] = React.useState<string | null>(null)

  const next = () => setActive((a) => (a + 1) % VIDEO_TESTIMONIALS.length)
  const prev = () => setActive((a) => (a - 1 + VIDEO_TESTIMONIALS.length) % VIDEO_TESTIMONIALS.length)

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Watch & hear"
          title={
            <>
              Stories from <span className="text-gradient-warm">happy homes.</span>
            </>
          }
          description="Real clients, real projects, real transformations. Tap play to hear why Gorakhpur homeowners chose our Berger Urban Exclusive Paints Store."
        />

        {/* Video carousel */}
        <div className="mt-12 relative">
          <div className="overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={(e, info) => {
                if (info.offset.x < -80) next()
                else if (info.offset.x > 80) prev()
              }}
              className="flex gap-4 sm:gap-6 cursor-grab active:cursor-grabbing"
            >
              {VIDEO_TESTIMONIALS.map((v, i) => (
                <VideoCard
                  key={v.id}
                  video={v}
                  active={i === active}
                  onPlay={() => setPlaying(v.id)}
                  onClick={() => setActive(i)}
                />
              ))}
            </motion.div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="h-11 w-11 rounded-full border border-border/60 bg-card hover:bg-secondary grid place-items-center transition"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {VIDEO_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === active ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/40"
                  )}
                  aria-label={`Go to video ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="h-11 w-11 rounded-full border border-border/60 bg-card hover:bg-secondary grid place-items-center transition"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Video player modal */}
      <AnimatePresence>
        {playing && (
          <VideoPlayerModal
            video={VIDEO_TESTIMONIALS.find((v) => v.id === playing)!}
            onClose={() => setPlaying(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function VideoCard({
  video,
  active,
  onPlay,
  onClick,
}: {
  video: VideoTestimonial
  active: boolean
  onPlay: () => void
  onClick: () => void
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -6 }}
      className={cn(
        "relative shrink-0 w-[300px] sm:w-[380px] rounded-3xl overflow-hidden border-2 bg-card shadow-card transition-colors",
        active ? "border-primary/50" : "border-border/60"
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.thumbnail}
          alt={`${video.name} testimonial`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Color wash */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-multiply"
          style={{ background: `linear-gradient(135deg, ${video.accent}, ${video.accent}88)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Play button */}
        <motion.button
          onClick={(e) => { e.stopPropagation(); onPlay() }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-white/90 backdrop-blur grid place-items-center shadow-warm group"
          aria-label={`Play ${video.name}'s testimonial`}
        >
          <motion.span
            className="absolute inset-0 rounded-full paint-gradient opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <Play className="h-6 w-6 text-primary fill-primary relative z-10 ml-0.5" />
          {/* Pulse rings */}
          <span className="absolute inset-0 rounded-full border-2 border-white animate-pulse-ring" />
        </motion.button>

        {/* Duration badge */}
        <span className="absolute bottom-3 right-3 rounded-full bg-black/70 backdrop-blur px-2 py-0.5 text-[10px] font-semibold text-white">
          {video.duration}
        </span>

        {/* Project badge */}
        <span className="absolute top-3 left-3 rounded-full glass border border-white/30 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
          {video.project}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="h-3.5 w-3.5 fill-paint-saffron text-paint-saffron" />
          ))}
        </div>
        <Quote className="h-5 w-5 text-muted-foreground/40 mb-1" />
        <p className="text-sm text-foreground/90 text-pretty line-clamp-3">"{video.quote}"</p>
        <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between">
          <div>
            <p className="font-display text-sm font-bold">{video.name}</p>
            <p className="text-[11px] text-muted-foreground">{video.role} · {video.location}</p>
          </div>
          <Volume2 className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </motion.div>
  )
}

function VideoPlayerModal({
  video,
  onClose,
}: {
  video: VideoTestimonial
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-md grid place-items-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-card shadow-2xl border border-border/60"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full glass border border-border/60 grid place-items-center hover:bg-card transition"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Video area (styled placeholder) */}
        <div className="relative aspect-video bg-black overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.name}
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />
          <div
            className="absolute inset-0 opacity-40 mix-blend-multiply"
            style={{ background: `linear-gradient(135deg, ${video.accent}, ${video.accent}88)` }}
          />

          {/* Play overlay */}
          <div className="absolute inset-0 grid place-items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="h-20 w-20 rounded-full bg-white/90 backdrop-blur grid place-items-center shadow-warm mx-auto"
              >
                <Play className="h-8 w-8 text-primary fill-primary ml-1" />
              </motion.button>
              <p className="text-white font-display text-lg font-bold mt-4 drop-shadow">
                {video.name}&apos;s story
              </p>
              <p className="text-white/80 text-sm">{video.duration} min · {video.project}</p>
            </motion.div>
          </div>

          {/* Audio waveform decoration */}
          <div className="absolute bottom-0 inset-x-0 h-12 flex items-end justify-center gap-1 px-4 pb-3">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-white/30 rounded-full"
                animate={{ height: [4, 8 + Math.random() * 16, 4] }}
                transition={{
                  duration: 0.8 + Math.random() * 0.6,
                  repeat: Infinity,
                  delay: i * 0.03,
                  ease: "easeInOut",
                }}
                style={{ maxWidth: 4 }}
              />
            ))}
          </div>
        </div>

        {/* Info bar */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-paint-saffron text-paint-saffron" />
                ))}
              </div>
              <h3 className="font-display text-xl font-bold">{video.name}</h3>
              <p className="text-sm text-muted-foreground">{video.role} · {video.location}</p>
            </div>
            <span
              className="rounded-full px-3 py-1 text-[11px] font-semibold text-white shrink-0"
              style={{ background: video.accent }}
            >
              {video.project}
            </span>
          </div>
          <Quote className="h-6 w-6 text-muted-foreground/40 mt-4" />
          <p className="text-foreground/90 mt-2 text-pretty">"{video.quote}"</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
