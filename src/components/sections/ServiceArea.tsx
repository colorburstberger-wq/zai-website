"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { MapPin, Clock, Navigation, Check, Phone } from "lucide-react"
import { Reveal, SectionHeading, Magnetic } from "@/components/motion/primitives"
import { Button } from "@/components/ui/button"
import { SHOP } from "@/lib/data/content"
import { cn } from "@/lib/utils"

interface Area {
  name: string
  travelMins: string
  projects: number
  featured?: boolean
}

const AREAS: Area[] = [
  { name: "Salt Lake", travelMins: "10 min", projects: 920, featured: true },
  { name: "New Town", travelMins: "15 min", projects: 680, featured: true },
  { name: "Rajarhat", travelMins: "20 min", projects: 410 },
  { name: "Ballygunge", travelMins: "25 min", projects: 540 },
  { name: "Alipore", travelMins: "30 min", projects: 280 },
  { name: "Lake Town", travelMins: "2 min", projects: 380, featured: true },
  { name: "Behala", travelMins: "28 min", projects: 320 },
  { name: "Howrah", travelMins: "35 min", projects: 240 },
  { name: "Gariahat", travelMins: "22 min", projects: 460 },
  { name: "Esplanade", travelMins: "20 min", projects: 180 },
  { name: "Jadavpur", travelMins: "30 min", projects: 290 },
  { name: "Dum Dum", travelMins: "15 min", projects: 360 },
]

export function ServiceArea() {
  const [hovered, setHovered] = React.useState<string | null>("Lake Town")
  const activeArea = AREAS.find((a) => a.name === hovered) ?? AREAS[0]

  return (
    <section id="areas" className="relative py-20 sm:py-28 bg-secondary/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Where we paint"
          title={
            <>
              Serving greater <span className="text-gradient-warm">Kolkata.</span>
            </>
          }
          description="Based in Lake Town — we cover the entire Kolkata metropolitan area within a 35-minute radius. For commercial projects beyond, we travel on request."
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-6">
          {/* Map */}
          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="relative rounded-3xl overflow-hidden border-4 border-card shadow-card aspect-[16/10]">
              <iframe
                title="Chroma House service area"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(SHOP.mapsQuery)}&z=12&output=embed`}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Floating info card on map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 glass rounded-2xl border border-white/30 p-4 shadow-warm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-9 w-9 rounded-xl paint-gradient grid place-items-center">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-foreground">Chroma House Studio</p>
                    <p className="text-[11px] text-muted-foreground">Lake Town, Kolkata</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {SHOP.address}
                </p>
                <Magnetic>
                  <Button
                    asChild
                    size="sm"
                    className="mt-3 w-full rounded-full paint-gradient text-white border-0 shadow-warm h-8"
                  >
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SHOP.mapsQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      Get directions
                    </a>
                  </Button>
                </Magnetic>
              </motion.div>
            </div>
          </Reveal>

          {/* Areas list */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display text-base font-bold">
                    Areas we serve
                  </h4>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {AREAS.length} locations
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto scrollbar-thin pr-1">
                  {AREAS.map((a, i) => (
                    <motion.button
                      key={a.name}
                      onMouseEnter={() => setHovered(a.name)}
                      onFocus={() => setHovered(a.name)}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.02 }}
                      className={cn(
                        "rounded-xl border p-2.5 text-left transition",
                        hovered === a.name
                          ? "border-primary bg-primary/5"
                          : "border-border/50 bg-background hover:border-primary/40"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold truncate">{a.name}</span>
                        {a.featured && (
                          <Check className="h-3 w-3 text-paint-sage shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5 text-[10px] text-muted-foreground">
                        <Clock className="h-2.5 w-2.5" />
                        {a.travelMins}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Active area highlight */}
            <Reveal delay={0.15}>
              <motion.div
                key={activeArea.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl paint-gradient p-5 text-white shadow-warm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-noise opacity-15" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-white/80">
                      Selected area
                    </p>
                    <p className="font-display text-2xl font-bold mt-0.5">
                      {activeArea.name}
                    </p>
                    <p className="text-xs text-white/80 mt-1">
                      {activeArea.travelMins} from our studio · {activeArea.projects}+ projects completed
                    </p>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-12 w-12 rounded-full bg-white/20 grid place-items-center"
                  >
                    <MapPin className="h-5 w-5 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
