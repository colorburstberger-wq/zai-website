"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle2,
  Sparkles, MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Reveal, SectionHeading, Magnetic } from "@/components/motion/primitives"
import { useToast } from "@/hooks/use-toast"
import { SHOP, SERVICES } from "@/lib/data/content"
import { cn } from "@/lib/utils"

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Enter a valid 10-digit phone"),
  email: z.string().email("Enter a valid email"),
  service: z.string().min(1, "Pick a service"),
  brand: z.string().min(1, "Pick a brand"),
  budget: z.string().optional(),
  message: z.string().max(1000).optional(),
})

type FormValues = z.infer<typeof schema>

export function Contact() {
  const { toast } = useToast()
  const [submitting, setSubmitting] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      brand: "",
      budget: "",
      message: "",
    },
    mode: "onSubmit",
  })

  const { errors } = form.formState

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true)
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error("Request failed")
      setSuccess(true)
      form.reset()
      toast({
        title: "Inquiry received!",
        description: "Our colour expert will call you within 2 hours.",
      })
      setTimeout(() => setSuccess(false), 6000)
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please call us at " + SHOP.phone,
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Decorative paint splash */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-72 w-[60rem] max-w-[100vw] paint-gradient opacity-10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Let's talk colour"
          title={
            <>
              Book your <span className="text-gradient-warm">free consultation.</span>
            </>
          }
          description="Tell us about your project — we'll call you back within 2 hours with a free on-site colour consultation slot."
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Contact info */}
          <Reveal className="lg:col-span-5" delay={0.05}>
            <div className="flex flex-col gap-4">
              {[
                { icon: Phone, label: "Call / WhatsApp", value: SHOP.phone, href: `tel:${SHOP.phone.replace(/\s/g, "")}`, accent: "var(--paint-coral)" },
                { icon: Mail, label: "Email us", value: SHOP.email, href: `mailto:${SHOP.email}`, accent: "var(--paint-saffron)" },
                { icon: MapPin, label: "Visit our studio", value: SHOP.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SHOP.mapsQuery)}`, accent: "var(--paint-sage)" },
                { icon: Clock, label: "Working hours", value: SHOP.hours.map((h) => `${h.day}: ${h.time}`).join("  ·  "), accent: "var(--paint-teal)" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.icon === MapPin ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-card hover:shadow-warm transition-shadow"
                >
                  <div
                    className="h-12 w-12 rounded-xl grid place-items-center shrink-0 shadow-warm group-hover:scale-110 transition-transform"
                    style={{ background: c.accent }}
                  >
                    <c.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      {c.label}
                    </p>
                    <p className="font-display font-semibold text-foreground break-words">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative rounded-3xl border border-border/60 bg-card p-6 sm:p-8 shadow-card overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full paint-gradient opacity-10 blur-2xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="h-20 w-20 rounded-full paint-gradient grid place-items-center shadow-warm"
                    >
                      <CheckCircle2 className="h-10 w-10 text-white" />
                    </motion.div>
                    <h3 className="mt-6 font-display text-2xl font-bold">Thank you!</h3>
                    <p className="mt-2 text-muted-foreground max-w-sm">
                      Your inquiry has been received. A Berger Urban Exclusive colour expert will call you
                      within 2 hours to schedule your free site visit.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Your name" error={errors.name?.message}>
                        <Input
                          placeholder="Your Name"
                          {...form.register("name")}
                          className="h-11 rounded-xl"
                        />
                      </Field>
                      <Field label="Phone number" error={errors.phone?.message}>
                        <Input
                          placeholder="98765 43210"
                          {...form.register("phone")}
                          className="h-11 rounded-xl"
                        />
                      </Field>
                    </div>

                    <Field label="Email address" error={errors.email?.message}>
                      <Input
                        type="email"
                        placeholder="you@email.com"
                        {...form.register("email")}
                        className="h-11 rounded-xl"
                      />
                    </Field>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <Field label="Service" error={errors.service?.message}>
                        <Select
                          onValueChange={(v) => form.setValue("service", v, { shouldValidate: true })}
                          value={form.watch("service")}
                        >
                          <SelectTrigger className="h-11 rounded-xl">
                            <SelectValue placeholder="Pick a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {SERVICES.map((s) => (
                              <SelectItem key={s.id} value={s.title}>
                                {s.title}
                              </SelectItem>
                            ))}
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>

                      <Field label="Brand" error={errors.brand?.message}>
                        <Select
                          onValueChange={(v) => form.setValue("brand", v, { shouldValidate: true })}
                          value={form.watch("brand")}
                        >
                          <SelectTrigger className="h-11 rounded-xl">
                            <SelectValue placeholder="Pick a brand" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Berger Paints">Berger Paints</SelectItem>
                            <SelectItem value="Asian Paints">Asian Paints</SelectItem>
                            <SelectItem value="Either">Either / No preference</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>

                      <Field label="Budget (optional)">
                        <Select
                          onValueChange={(v) => form.setValue("budget", v)}
                          value={form.watch("budget") ?? ""}
                        >
                          <SelectTrigger className="h-11 rounded-xl">
                            <SelectValue placeholder="₹ Range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-25k">Under ₹25,000</SelectItem>
                            <SelectItem value="25k-75k">₹25k – ₹75k</SelectItem>
                            <SelectItem value="75k-2l">₹75k – ₹2L</SelectItem>
                            <SelectItem value="above-2l">Above ₹2L</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                    </div>

                    <Field label="Project details" error={errors.message?.message}>
                      <Textarea
                        rows={4}
                        placeholder="Tell us about your space — rooms, walls, timeline, any references..."
                        {...form.register("message")}
                        className="rounded-xl resize-none"
                      />
                    </Field>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                      <Magnetic className="flex-1">
                        <Button
                          type="submit"
                          disabled={submitting}
                          className="w-full h-12 rounded-full paint-gradient text-white border-0 shadow-warm hover:opacity-90 font-semibold animate-glow"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Send inquiry
                            </>
                          )}
                        </Button>
                      </Magnetic>
                      <Button
                        asChild
                        type="button"
                        variant="outline"
                        className="h-12 rounded-full border-border/70 hover:bg-secondary"
                      >
                        <a
                          href={`https://wa.me/${SHOP.whatsapp.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageSquare className="h-4 w-4 mr-2 text-paint-sage" />
                          WhatsApp
                        </a>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1">
                      <Sparkles className="h-3 w-3 text-paint-saffron" />
                      We respect your privacy. No spam, ever.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
