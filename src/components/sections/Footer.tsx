"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Palette, Phone, Mail, MapPin, Facebook, Instagram, Youtube,
  ArrowRight, Loader2, CheckCircle2, Sparkles,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SHOP, NAV_LINKS, PARTNERS, SERVICES } from "@/lib/data/content"
import { useToast } from "@/hooks/use-toast"

export function Footer() {
  const { toast } = useToast()
  const [email, setEmail] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [done, setDone] = React.useState(false)

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes("@")) {
      toast({ title: "Enter a valid email", variant: "destructive" })
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      })
      if (!res.ok) throw new Error()
      setDone(true)
      setEmail("")
      toast({ title: "Subscribed!", description: "You'll get our seasonal palette drops." })
      setTimeout(() => setDone(false), 5000)
    } catch {
      toast({ title: "Could not subscribe", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="relative mt-auto bg-foreground text-background overflow-hidden">
      {/* Decorative top paint stroke */}
      <div className="absolute top-0 inset-x-0 h-1 paint-gradient" />

      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-20 h-72 w-72 rounded-full bg-paint-coral/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-20 h-80 w-80 rounded-full bg-paint-saffron/20 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-card/10 border border-white/10 backdrop-blur p-6 sm:p-8 mb-14"
        >
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-paint-saffron">
                Seasonal palette drops
              </p>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold">
                Get colour ideas & exclusive offers.
              </h3>
              <p className="mt-2 text-background/70 text-sm">
                One thoughtful email a month. No spam.
              </p>
            </div>
            <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="h-12 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button
                type="submit"
                disabled={loading || done}
                className="h-12 rounded-full paint-gradient text-white border-0 shadow-warm hover:opacity-90 px-6 whitespace-nowrap"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : done ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Subscribed
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2 lg:col-span-4">
            <Link href="#home" className="flex items-center gap-3 group">
              <div className="h-11 w-11 rounded-xl paint-gradient grid place-items-center shadow-warm">
                <Palette className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-display text-xl font-bold">
                  Chroma <span className="text-paint-saffron">House</span>
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-background/60">
                  Paints & Décor Studio
                </p>
              </div>
            </Link>
            <p className="mt-4 text-sm text-background/70 text-pretty">
              {SHOP.tagline} East India&apos;s trusted authorised dealer for Berger Paints and
              Asian Paints since {SHOP.founded}.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-paint-saffron hover:text-foreground grid place-items-center transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-background/90">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-background/70 hover:text-paint-saffron transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-background/90">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link
                    href="#services"
                    className="text-sm text-background/70 hover:text-paint-saffron transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-background/90">
              Reach us
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5 text-sm">
                <MapPin className="h-4 w-4 text-paint-saffron shrink-0 mt-0.5" />
                <span className="text-background/70">{SHOP.address}</span>
              </li>
              <li>
                <a href={`tel:${SHOP.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 text-sm hover:text-paint-saffron transition-colors">
                  <Phone className="h-4 w-4 text-paint-saffron" />
                  <span className="text-background/70">{SHOP.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${SHOP.email}`} className="flex items-center gap-2.5 text-sm hover:text-paint-saffron transition-colors">
                  <Mail className="h-4 w-4 text-paint-saffron" />
                  <span className="text-background/70">{SHOP.email}</span>
                </a>
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {PARTNERS.map((p) => (
                <span
                  key={p.name}
                  className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold"
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/60 text-center sm:text-left">
            © {new Date().getFullYear()} Chroma House. All rights reserved. Crafted with
            <Sparkles className="inline h-3 w-3 mx-1 text-paint-saffron" />
            in Kolkata, India.
          </p>
          <div className="flex items-center gap-4 text-xs text-background/60">
            <Link href="#" className="hover:text-paint-saffron transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-paint-saffron transition-colors">Terms</Link>
            <Link href="#" className="hover:text-paint-saffron transition-colors">Warranty</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
