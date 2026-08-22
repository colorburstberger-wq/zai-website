"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Menu, X, Phone, Palette, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { NAV_LINKS, SHOP } from "@/lib/data/content"
import { Magnetic } from "@/components/motion/primitives"
import { ThemeToggle } from "@/components/ThemeToggle"

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 30)
  })

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 sm:px-6 transition-all duration-300",
            scrolled
              ? "glass shadow-card h-16 border border-border/60"
              : "h-18 bg-transparent"
          )}
        >
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 paint-gradient rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative h-10 w-10 rounded-xl paint-gradient grid place-items-center shadow-warm overflow-hidden">
                <Palette className="h-5 w-5 text-white" strokeWidth={2.5} />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-white animate-pulse-ring" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold tracking-tight text-foreground">
                Chroma <span className="text-gradient-warm">House</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Paints & Décor Studio
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.04 }}
              >
                <Link
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                >
                  {link.label}
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${SHOP.phone.replace(/\s/g, "")}`}
              className="hidden sm:flex items-center gap-2 rounded-full border border-border/70 px-3 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">Call us</span>
            </a>
            <Magnetic className="hidden md:block">
              <Button
                asChild
                className="rounded-full paint-gradient text-white border-0 hover:opacity-90 shadow-warm group"
              >
                <Link href="#contact" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                  Free Consultation
                </Link>
              </Button>
            </Magnetic>

            <ThemeToggle />

            <button
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden h-10 w-10 grid place-items-center rounded-xl border border-border/60 bg-card/60"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="mx-4 mt-2 rounded-2xl glass border border-border/60 shadow-card p-3">
              <nav className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-3 rounded-xl text-base font-medium text-foreground/90 hover:bg-secondary/60 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <Button
                asChild
                className="w-full mt-2 rounded-xl paint-gradient text-white border-0 shadow-warm"
              >
                <Link href="#contact" onClick={() => setOpen(false)}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Book Free Consultation
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
