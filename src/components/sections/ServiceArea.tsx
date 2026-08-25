"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Clock, Navigation, Check, Phone, Search, Sparkles, X } from "lucide-react"
import { Reveal, SectionHeading, Magnetic } from "@/components/motion/primitives"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SHOP } from "@/lib/data/content"
import { cn } from "@/lib/utils"

interface Area {
  name: string
  travelMins: string
  projects: number
  featured?: boolean
}

const AREAS: Area[] = [
  { name: "Siddharth Enclave", travelMins: "2 min", projects: 320, featured: true },
  { name: "Taramandal", travelMins: "5 min", projects: 280, featured: true },
  { name: "Rail Vihar", travelMins: "5 min", projects: 190, featured: true },
  { name: "Buddh Vihar", travelMins: "10 min", projects: 210 },
  { name: "Asuran Chowk", travelMins: "8 min", projects: 175 },
  { name: "Golghar", travelMins: "12 min", projects: 240 },
  { name: "Civil Lines", travelMins: "15 min", projects: 165 },
  { name: "Rapti Nagar", travelMins: "18 min", projects: 130 },
  { name: "Mahendra Nagar", travelMins: "20 min", projects: 110 },
  { name: "Daudpur", travelMins: "22 min", projects: 95 },
  { name: "Basharatpur", travelMins: "25 min", projects: 80 },
  { name: "Padri Bazaar", travelMins: "15 min", projects: 120 },
]

export function ServiceArea() {
  const [hovered, setHovered] = React.useState<string | null>("Siddharth Enclave")
  const [query, setQuery] = React.useState("")
  const activeArea = AREAS.find((a) => a.name === hovered) ?? AREAS[0]

  const filtered = React.useMemo(() => {
    if (!query.trim()) return AREAS
    const q = query.toLowerCase().trim()
    return AREAS.filter((a) => a.name.toLowerCase().includes(q))
  }, [query])

  const exactMatch = query.trim().length > 1 && AREAS.some((a) =>
    a.name.toLowerCase() === query.toLowerCase().trim()
  )
  const partialMatch = query.trim().length > 1 && filtered.length > 0

  return (
    <section id="areas" className="relative py-20 sm:py-28 bg-secondary/30 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Where we paint"
          title={
            <>
              Serving greater <span className="text-gradient-warm">Gorakhpur.</span>
            </>
          }
          description="Based in Siddharth Enclave, Taramandal — we cover the entire Gorakhpur district within a 30-minute radius. For commercial projects beyond, we travel on request."
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-6">
          {/* Map */}
          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="relative rounded-3xl overflow-hidden border-4 border-card shadow-card aspect-[16/10]">
              <iframe
                title="Berger Urban Exclusive service area"
                src="https://maps.google.com/maps?q=HIG+B+98+Rail+Vihar+Colony+Taramandal+Gorakhpur+273017&z=16&output=embed&iwloc="
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ pointerEvents: "none" }}
                onLoad={(e) => {
                  // Hide the Google Maps info window via CSS injection
                  try {
                    const iframe = e.currentTarget as HTMLIFrameElement
                    const doc = iframe.contentDocument || iframe.contentWindow?.document
                    if (doc) {
                      const style = doc.createElement('style')
                      style.innerHTML = '.gm-style-iw, .gm-style-iw-c, .gm-style-iw-d, .gm-style-iw-t, [class*="gm-style-iw"], .place-card, .place-card-large { display: none !important; }'
                      doc.head.appendChild(style)
                    }
                  } catch {}
                }}
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
                    <p className="font-display text-sm font-bold text-foreground">Berger Urban Exclusive</p>
                    <p className="text-[11px] text-muted-foreground">Siddharth Enclave, Gorakhpur</p>
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

          {/* Areas list with search */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display text-base font-bold">
                    Areas we serve
                  </h4>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {filtered.length} of {AREAS.length}
                  </span>
                </div>

                {/* Search input */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search your area — e.g. Taramandal"
                    className="pl-10 pr-9 h-10 rounded-xl bg-secondary/50 border-border/60 focus-visible:bg-card"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full grid place-items-center hover:bg-background text-muted-foreground hover:text-foreground transition"
                      aria-label="Clear search"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Search result banner */}
                <AnimatePresence>
                  {query.trim().length > 1 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mb-3"
                    >
                      {exactMatch || partialMatch ? (
                        <div className="rounded-xl bg-paint-sage/15 border border-paint-sage/40 px-3 py-2 flex items-center gap-2">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                            className="h-6 w-6 rounded-full bg-paint-sage grid place-items-center shrink-0"
                          >
                            <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                          </motion.div>
                          <p className="text-xs font-semibold text-foreground">
                            {exactMatch ? "Yes! We serve" : "We serve:"}{" "}
                            <span className="text-paint-sage">
                              {exactMatch ? query.trim() : filtered.map((a) => a.name).join(", ")}
                            </span>
                          </p>
                        </div>
                      ) : (
                        <div className="rounded-xl bg-secondary border border-border/60 px-3 py-2 flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-paint-saffron shrink-0" />
                          <p className="text-xs text-muted-foreground">
                            Not listed? We still cover greater Gorakhpur —{" "}
                            <a href="#contact" className="font-semibold text-primary hover:underline">
                              ask us
                            </a>
                            .
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Areas grid */}
                <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto scrollbar-thin pr-1">
                  {filtered.map((a, i) => (
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
                {filtered.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-6">
                    No areas match &ldquo;{query}&rdquo; — try &ldquo;Taramandal&rdquo; or &ldquo;Golghar&rdquo;.
                  </p>
                )}
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
