"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Gift, Sparkles, Mail, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

type State = "idle" | "submitting" | "done"

/**
 * NewsletterPopup — exit-intent popup offering a seasonal palette PDF.
 * - Triggers on mouseleave (top of viewport) OR after 30s of inactivity
 * - Only shows once per session (sessionStorage)
 * - Shows a paint-themed offer with email capture
 */
export function NewsletterPopup() {
  const { toast } = useToast()
  const [open, setOpen] = React.useState(false)
  const [state, setState] = React.useState<State>("idle")
  const [email, setEmail] = React.useState("")
  const [name, setName] = React.useState("")
  const triggerRef = React.useRef<number | null>(null)

  const arm = React.useCallback(() => {
    if (typeof window === "undefined") return
    if (sessionStorage.getItem("chroma-newsletter-seen")) return
    // Arm timer for 30s inactivity OR exit intent
    if (triggerRef.current) window.clearTimeout(triggerRef.current)
    triggerRef.current = window.setTimeout(() => setOpen(true), 30000)
  }, [])

  React.useEffect(() => {
    if (typeof window === "undefined") return
    if (sessionStorage.getItem("chroma-newsletter-seen")) return

    // Exit intent: mouse leaves top of viewport
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) {
        setOpen(true)
      }
    }
    document.addEventListener("mouseout", onMouseOut)
    arm()

    // Reset timer on user activity
    const reset = () => arm()
    document.addEventListener("mousemove", reset)
    document.addEventListener("scroll", reset, { passive: true })

    return () => {
      document.removeEventListener("mouseout", onMouseOut)
      document.removeEventListener("mousemove", reset)
      document.removeEventListener("scroll", reset)
      if (triggerRef.current) window.clearTimeout(triggerRef.current)
    }
  }, [arm])

  const close = () => {
    setOpen(false)
    sessionStorage.setItem("chroma-newsletter-seen", "1")
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes("@")) {
      toast({ title: "Enter a valid email", variant: "destructive" })
      return
    }
    setState("submitting")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, source: "exit-popup" }),
      })
      if (!res.ok) throw new Error()
      setState("done")
      sessionStorage.setItem("chroma-newsletter-seen", "1")
      setTimeout(() => close(), 4000)
    } catch {
      toast({ title: "Could not subscribe", variant: "destructive" })
      setState("idle")
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] grid place-items-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl overflow-hidden bg-card shadow-2xl border border-border/60"
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-20 h-9 w-9 rounded-full glass border border-border/60 grid place-items-center hover:bg-secondary transition"
              aria-label="Close popup"
            >
              <X className="h-4 w-4" />
            </button>

            <AnimatePresence mode="wait">
              {state === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 sm:p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="h-20 w-20 rounded-full paint-gradient grid place-items-center mx-auto shadow-warm"
                  >
                    <CheckCircle2 className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold mt-5">You&apos;re in! 🎨</h3>
                  <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                    Check your inbox for our <strong>Seasonal Palette Guide</strong> —
                    it&apos;s on its way. Welcome to the Chroma family.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid sm:grid-cols-5"
                >
                  {/* Visual side */}
                  <div className="relative hidden sm:block sm:col-span-2 paint-gradient p-6 text-white">
                    <div className="absolute inset-0 bg-noise opacity-20" />
                    <div className="relative h-full flex flex-col justify-between">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                      >
                        <Gift className="h-10 w-10" />
                      </motion.div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/80">
                          Free download
                        </p>
                        <p className="font-display text-xl font-bold mt-1 leading-tight">
                          2024 Seasonal Palette Guide
                        </p>
                        <p className="text-xs text-white/80 mt-2">
                          32 curated shades + room pairings + care tips.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Form side */}
                  <div className="sm:col-span-3 p-6 sm:p-8">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-paint-saffron" />
                      <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">
                        Before you go
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight">
                      Get our free colour guide.
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Join 3,200+ Kolkata homeowners getting our monthly palette drops, exclusive
                      offers and painting tips.
                    </p>

                    <form onSubmit={submit} className="mt-5 space-y-3">
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name (optional)"
                        className="h-11 rounded-xl"
                      />
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          className="h-11 rounded-xl pl-10"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={state === "submitting"}
                        className="w-full h-11 rounded-xl paint-gradient text-white border-0 shadow-warm hover:opacity-90"
                      >
                        {state === "submitting" ? (
                          <><Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> Sending...</>
                        ) : (
                          <>Send me the guide 🎨</>
                        )}
                      </Button>
                      <p className="text-[11px] text-muted-foreground text-center">
                        No spam, ever. Unsubscribe in one click.
                      </p>
                    </form>

                    <button
                      onClick={close}
                      className="mt-3 block mx-auto text-xs text-muted-foreground hover:text-foreground transition"
                    >
                      No thanks, I&apos;ll browse without the guide
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Decorative paint splash */}
            <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full paint-gradient opacity-10 blur-2xl pointer-events-none" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
