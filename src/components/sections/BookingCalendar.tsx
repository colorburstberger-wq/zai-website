"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar, Clock, ChevronLeft, ChevronRight, Check, Loader2,
  User, Phone, Mail, MapPin, Home,
} from "lucide-react"
import { Reveal, SectionHeading, Magnetic } from "@/components/motion/primitives"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const TIME_SLOTS = [
  "09:30 AM", "10:30 AM", "11:30 AM", "12:30 PM",
  "02:30 PM", "03:30 PM", "04:30 PM", "05:30 PM",
]

const ROOM_TYPES = [
  "Living room", "Bedroom", "Kitchen", "Modular kitchen",
  "Bathroom", "Full home", "Exterior", "Office / commercial",
]

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstWeekday(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}
function isPast(day: number, month: number, year: number) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = new Date(year, month, day)
  return d < today
}
function isToday(day: number, month: number, year: number) {
  const t = new Date()
  return t.getDate() === day && t.getMonth() === month && t.getFullYear() === year
}

export function BookingCalendar() {
  const { toast } = useToast()
  const today = new Date()
  const [year, setYear] = React.useState(today.getFullYear())
  const [month, setMonth] = React.useState(today.getMonth())

  const [selectedDate, setSelectedDate] = React.useState<number | null>(null)
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState(false)

  // Form fields
  const [name, setName] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [room, setRoom] = React.useState("")

  const daysInMonth = getDaysInMonth(year, month)
  const firstWeekday = getFirstWeekday(year, month)

  const canSubmit = selectedDate && selectedSlot && name.length > 1 && phone.length >= 10 && email.includes("@")

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear((y) => y - 1)
    } else {
      setMonth((m) => m - 1)
    }
    setSelectedDate(null)
  }
  const nextMonth = () => {
    // Don't allow more than 4 months ahead
    const monthsAhead = (year - today.getFullYear()) * 12 + (month - today.getMonth())
    if (monthsAhead >= 4) return
    if (month === 11) {
      setMonth(0)
      setYear((y) => y + 1)
    } else {
      setMonth((m) => m + 1)
    }
    setSelectedDate(null)
  }

  const submit = async () => {
    if (!canSubmit) {
      toast({ title: "Please fill all fields", variant: "destructive" })
      return
    }
    setSubmitting(true)
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`
    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone, address,
          preferredDate: dateStr,
          room,
          brandPref: "Either",
          message: `Preferred slot: ${selectedSlot}`,
        }),
      })
      if (!res.ok) throw new Error()
      setDone(true)
      toast({
        title: "Booking confirmed!",
        description: `Visit on ${selectedDate} ${MONTHS[month]} · ${selectedSlot}`,
      })
    } catch {
      toast({ title: "Could not book slot", variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="booking" className="relative py-20 sm:py-28 bg-secondary/30 overflow-hidden">
      <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-paint-saffron/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Book your free visit"
          title={
            <>
              Pick a slot. <span className="text-gradient-warm">We&apos;ll be there.</span>
            </>
          }
          description="Schedule a free on-site colour consultation in 30 seconds. Choose a date, pick a time, leave the rest to us."
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-6">
          {/* Calendar */}
          <Reveal className="lg:col-span-5" delay={0.05}>
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-card">
              {/* Calendar header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevMonth}
                  className="h-9 w-9 rounded-full border border-border/60 grid place-items-center hover:bg-secondary transition"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <h3 className="font-display text-lg font-bold">
                  {MONTHS[month]} <span className="text-muted-foreground font-normal">{year}</span>
                </h3>
                <button
                  onClick={nextMonth}
                  className="h-9 w-9 rounded-full border border-border/60 grid place-items-center hover:bg-secondary transition"
                  aria-label="Next month"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Weekday header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {WEEKDAYS.map((d) => (
                  <div key={d} className="text-center text-[10px] uppercase tracking-widest text-muted-foreground font-semibold py-1">
                    {d}
                  </div>
                ))}
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstWeekday }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const past = isPast(day, month, year)
                  const isSel = selectedDate === day
                  const today_ = isToday(day, month, year)
                  return (
                    <motion.button
                      key={day}
                      onClick={() => !past && setSelectedDate(day)}
                      disabled={past}
                      whileHover={!past ? { scale: 1.08 } : {}}
                      whileTap={!past ? { scale: 0.92 } : {}}
                      className={cn(
                        "relative h-10 w-10 rounded-xl text-sm font-semibold transition-colors",
                        past && "text-muted-foreground/40 cursor-not-allowed",
                        !past && !isSel && "hover:bg-secondary hover:text-foreground",
                        isSel && "paint-gradient text-white shadow-warm",
                        !past && !isSel && today_ && "ring-2 ring-primary/40",
                      )}
                    >
                      {day}
                      {today_ && !isSel && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary" />
                      )}
                    </motion.button>
                  )
                })}
              </div>

              {/* Time slots */}
              <AnimatePresence>
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-5 pt-4 border-t border-border/60 overflow-hidden"
                  >
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      Pick a time slot · {selectedDate} {MONTHS[month]}
                    </p>
                    <div className="grid grid-cols-4 gap-1.5">
                      {TIME_SLOTS.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSlot(s)}
                          className={cn(
                            "rounded-lg py-2 text-[11px] font-semibold border transition",
                            selectedSlot === s
                              ? "bg-primary text-primary-foreground border-primary shadow-sm"
                              : "bg-background border-border/60 hover:border-primary/50"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Contact form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-8 shadow-card">
                <AnimatePresence mode="wait">
                  {done ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 12 }}
                        className="h-20 w-20 rounded-full paint-gradient grid place-items-center shadow-warm mb-5"
                      >
                        <Check className="h-10 w-10 text-white" strokeWidth={3} />
                      </motion.div>
                      <h3 className="font-display text-2xl font-bold">Booking confirmed!</h3>
                      <p className="mt-2 text-muted-foreground max-w-sm">
                        We&apos;ve reserved <span className="font-semibold text-foreground">{selectedDate} {MONTHS[month]}, {selectedSlot}</span> for your free consultation.
                        A confirmation has been sent to <span className="font-semibold text-foreground">{email}</span>.
                      </p>
                      <Button
                        onClick={() => {
                          setDone(false)
                          setSelectedDate(null)
                          setSelectedSlot(null)
                          setName("")
                          setPhone("")
                          setEmail("")
                          setAddress("")
                          setRoom("")
                        }}
                        variant="outline"
                        className="mt-5 rounded-full"
                      >
                        Book another visit
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid sm:grid-cols-2 gap-4"
                    >
                      <FormField label="Your name" icon={User}>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ananya Banerjee"
                          className="h-11 rounded-xl"
                        />
                      </FormField>
                      <FormField label="Phone number" icon={Phone}>
                        <Input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="98765 43210"
                          className="h-11 rounded-xl"
                        />
                      </FormField>
                      <FormField label="Email" icon={Mail}>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          className="h-11 rounded-xl"
                        />
                      </FormField>
                      <FormField label="Project type" icon={Home}>
                        <Select value={room} onValueChange={setRoom}>
                          <SelectTrigger className="h-11 rounded-xl">
                            <SelectValue placeholder="Pick a room / scope" />
                          </SelectTrigger>
                          <SelectContent>
                            {ROOM_TYPES.map((r) => (
                              <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormField>
                      <div className="sm:col-span-2">
                        <FormField label="Address (optional)" icon={MapPin}>
                          <Input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Flat / House no, area, city"
                            className="h-11 rounded-xl"
                          />
                        </FormField>
                      </div>

                      {/* Summary chip */}
                      <div className="sm:col-span-2 flex flex-wrap items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Selected:</span>
                        {selectedDate ? (
                          <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                            {selectedDate} {MONTHS[month]}
                          </span>
                        ) : (
                          <span className="rounded-full bg-secondary px-3 py-1 text-muted-foreground italic">No date yet</span>
                        )}
                        {selectedSlot && (
                          <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                            {selectedSlot}
                          </span>
                        )}
                      </div>

                      <div className="sm:col-span-2 flex items-center justify-between pt-2">
                        <p className="text-xs text-muted-foreground">
                          ✅ Free · No obligation · ~45 min visit
                        </p>
                        <Magnetic>
                          <Button
                            onClick={submit}
                            disabled={!canSubmit || submitting}
                            className="rounded-full paint-gradient text-white border-0 shadow-warm hover:opacity-90 px-6"
                          >
                            {submitting ? (
                              <><Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> Confirming...</>
                            ) : (
                              <>Confirm booking</>
                            )}
                          </Button>
                        </Magnetic>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function FormField({
  label, icon: Icon, children,
}: {
  label: string
  icon: typeof User
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-primary" />
        {label}
      </Label>
      {children}
    </div>
  )
}
