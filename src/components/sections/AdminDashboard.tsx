"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X, Mail, Phone, Calendar, MessageSquare, Calculator, Users,
  RefreshCw, Search, TrendingUp, Clock, CheckCircle2, AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Tab = "inquiries" | "bookings" | "subscribers" | "quotes"

interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  service: string
  message: string | null
  brand: string | null
  budget: string | null
  status: string
  createdAt: string
}

interface Booking {
  id: string
  name: string
  email: string
  phone: string
  address: string | null
  preferredDate: string | null
  room: string | null
  brandPref: string | null
  message: string | null
  status: string
  createdAt: string
}

interface Subscriber {
  id: string
  email: string
  name: string | null
  source: string
  active: boolean
  createdAt: string
}

export function AdminDashboard() {
  const [open, setOpen] = React.useState(false)
  const [tab, setTab] = React.useState<Tab>("inquiries")
  const [query, setQuery] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [inquiries, setInquiries] = React.useState<Inquiry[]>([])
  const [bookings, setBookings] = React.useState<Booking[]>([])
  const [subscribers, setSubscribers] = React.useState<Subscriber[]>([])
  const [stats, setStats] = React.useState({ inquiries: 0, bookings: 0, subscribers: 0, quotes: 0 })

  // Keyboard shortcut: Ctrl+Shift+A
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const refresh = async () => {
    setLoading(true)
    try {
      const [inq, book, subs] = await Promise.all([
        fetch("/api/inquiry").then((r) => r.json()),
        fetch("/api/consultations").then((r) => r.json()),
        fetch("/api/newsletter").then((r) => r.json()),
      ])
      if (inq.ok) {
        setInquiries(inq.items)
        const quotes = inq.items.filter((i: Inquiry) => i.status === "quoted")
        setStats((s) => ({ ...s, inquiries: inq.items.length, quotes: quotes.length }))
      }
      if (book.ok) {
        setBookings(book.items)
        setStats((s) => ({ ...s, bookings: book.items.length }))
      }
      if (subs.ok) {
        setSubscribers([{ id: "count", email: "", name: null, source: "all", active: true, createdAt: new Date().toISOString() }]) // placeholder
        setStats((s) => ({ ...s, subscribers: subs.count }))
      }
    } catch (err) {
      console.error("Admin refresh error", err)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if (open) refresh()
  }, [open])

  const filterFn = (item: { name?: string; email: string; service?: string; phone?: string }) => {
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return (
      item.name?.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.phone?.toLowerCase().includes(q) ||
      item.service?.toLowerCase().includes(q)
    )
  }

  const filteredInquiries = inquiries.filter(filterFn)
  const filteredBookings = bookings.filter(filterFn)
  const filteredSubs = subscribers.filter(filterFn)
  const filteredQuotes = inquiries.filter((i) => i.status === "quoted").filter(filterFn)

  const tabs: { key: Tab; label: string; count: number; icon: typeof Mail }[] = [
    { key: "inquiries", label: "Inquiries", count: stats.inquiries, icon: Mail },
    { key: "bookings", label: "Bookings", count: stats.bookings, icon: Calendar },
    { key: "quotes", label: "Saved Quotes", count: stats.quotes, icon: Calculator },
    { key: "subscribers", label: "Subscribers", count: stats.subscribers, icon: Users },
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[180] bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-2 sm:inset-4 lg:inset-8 rounded-3xl bg-card border border-border/60 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border/60 bg-secondary/40">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold flex items-center gap-2">
                  <span className="h-8 w-8 rounded-lg paint-gradient grid place-items-center">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </span>
                  Berger Urban Exclusive Admin
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border text-[10px] font-mono">Esc</kbd> to close · <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border text-[10px] font-mono">Ctrl+Shift+A</kbd> to toggle
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={refresh}
                  disabled={loading}
                  className="rounded-full"
                >
                  <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
                  <span className="hidden sm:inline ml-1">Refresh</span>
                </Button>
                <button
                  onClick={() => setOpen(false)}
                  className="h-9 w-9 rounded-full hover:bg-secondary grid place-items-center transition"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 border-b border-border/60">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "rounded-2xl border p-3 sm:p-4 text-left transition group",
                    tab === t.key
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border/60 bg-card hover:border-primary/40"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className={cn(
                      "h-8 w-8 rounded-lg grid place-items-center",
                      tab === t.key ? "paint-gradient" : "bg-secondary"
                    )}>
                      <t.icon className={cn("h-4 w-4", tab === t.key ? "text-white" : "text-muted-foreground")} />
                    </div>
                    <span className="font-display text-2xl font-bold tabular-nums">{t.count}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{t.label}</p>
                </button>
              ))}
            </div>

            {/* Search + content */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="p-4 sm:p-6 pb-0">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, email, phone, service..."
                    className="pl-10 h-10 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-thin p-4 sm:p-6">
                {tab === "inquiries" && (
                  <RecordList
                    items={filteredInquiries}
                    empty="No inquiries yet. Submit the contact form to create one."
                    render={(i) => (
                      <>
                        <RecordRow item={i} />
                        <div className="mt-2 text-xs text-muted-foreground">
                          <span className="font-medium">Service:</span> {i.service}
                          {i.brand && <> · <span className="font-medium">Brand:</span> {i.brand}</>}
                          {i.budget && <> · <span className="font-medium">Budget:</span> {i.budget}</>}
                        </div>
                        {i.message && !i.message.startsWith("{") && (
                          <p className="mt-2 text-sm text-foreground/80 bg-secondary/60 rounded-lg p-2">{i.message}</p>
                        )}
                        <StatusBadge status={i.status} />
                      </>
                    )}
                  />
                )}

                {tab === "bookings" && (
                  <RecordList
                    items={filteredBookings}
                    empty="No bookings yet. Use the booking calendar to schedule a visit."
                    render={(b) => (
                      <>
                        <RecordRow item={b} />
                        <div className="mt-2 text-xs text-muted-foreground space-y-0.5">
                          {b.preferredDate && <div><Calendar className="inline h-3 w-3 mr-1" /> {b.preferredDate}</div>}
                          {b.room && <div>Room: {b.room}</div>}
                          {b.address && <div>Address: {b.address}</div>}
                          {b.message && <div>Notes: {b.message}</div>}
                        </div>
                        <StatusBadge status={b.status} />
                      </>
                    )}
                  />
                )}

                {tab === "quotes" && (
                  <RecordList
                    items={filteredQuotes}
                    empty="No saved quotes yet. Use 'Save this estimate' in the calculator."
                    render={(q) => {
                      let breakdown: any = null
                      try { breakdown = JSON.parse(q.message ?? "") } catch {}
                      return (
                        <>
                          <RecordRow item={q} />
                          {breakdown?.breakdown && (
                            <div className="mt-2 rounded-lg bg-secondary/60 p-3 text-xs">
                              <div className="font-semibold mb-1 flex items-center gap-1">
                                <Calculator className="h-3 w-3" /> Estimate breakdown
                              </div>
                              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-muted-foreground">
                                <span>Area: {breakdown.area?.toLocaleString("en-IN")} sq ft</span>
                                <span>Coats: {breakdown.coats}</span>
                                <span>Paint: ₹{Math.round(breakdown.breakdown?.paintCost ?? 0).toLocaleString("en-IN")}</span>
                                <span>Prep: ₹{Math.round(breakdown.breakdown?.prepCost ?? 0).toLocaleString("en-IN")}</span>
                                <span>Extras: ₹{Math.round(breakdown.breakdown?.extras ?? 0).toLocaleString("en-IN")}</span>
                                <span>GST: ₹{Math.round(breakdown.breakdown?.gst ?? 0).toLocaleString("en-IN")}</span>
                              </div>
                              <div className="mt-1.5 pt-1.5 border-t border-border/40 flex items-center justify-between">
                                <span className="font-semibold">Total</span>
                                <span className="font-display font-bold text-gradient-warm">
                                  ₹{Math.round(breakdown.breakdown?.total ?? 0).toLocaleString("en-IN")}
                                </span>
                              </div>
                            </div>
                          )}
                          <StatusBadge status={q.status} />
                        </>
                      )
                    }}
                  />
                )}

                {tab === "subscribers" && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground/40" />
                    <p className="font-display text-3xl font-bold mt-3 text-gradient-warm">{stats.subscribers}</p>
                    <p className="text-sm text-muted-foreground">active subscribers</p>
                    <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto">
                      Subscriber email list is managed via the newsletter API. Use the GET /api/newsletter endpoint
                      to fetch the count, or query the Prisma database directly for the full list.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function RecordList<T extends { id: string }>({
  items,
  empty,
  render,
}: {
  items: T[]
  empty: string
  render: (item: T) => React.ReactNode
}) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <MessageSquare className="h-10 w-10 mx-auto opacity-40" />
        <p className="mt-3 text-sm">{empty}</p>
      </div>
    )
  }
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border/60 bg-card p-4 hover:shadow-card transition-shadow"
        >
          {render(item)}
        </motion.div>
      ))}
    </div>
  )
}

function RecordRow({ item }: { item: { name?: string; email: string; phone?: string; createdAt: string } }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="font-display font-bold truncate">{item.name || "Anonymous"}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground mt-0.5">
          <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {item.email}</span>
          {item.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {item.phone}</span>}
        </div>
      </div>
      <span className="text-[10px] text-muted-foreground whitespace-nowrap flex items-center gap-1 shrink-0">
        <Clock className="h-2.5 w-2.5" />
        {new Date(item.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
      </span>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-paint-saffron/15 text-paint-mustard border-paint-mustard/30",
    quoted: "bg-paint-teal/15 text-paint-teal border-paint-teal/30",
    requested: "bg-paint-saffron/15 text-paint-mustard border-paint-mustard/30",
    contacted: "bg-paint-sage/15 text-paint-sage border-paint-sage/30",
    closed: "bg-secondary text-muted-foreground border-border",
  }
  const cls = styles[status] || "bg-secondary text-muted-foreground border-border"
  const Icon = status === "closed" ? CheckCircle2 : status === "new" || status === "requested" ? AlertCircle : Clock
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider mt-2", cls)}>
      <Icon className="h-2.5 w-2.5" />
      {status}
    </span>
  )
}
