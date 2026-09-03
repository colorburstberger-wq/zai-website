"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion"

/**
 * SmoothScroll — adds momentum/lerp smoothing to the native browser scroll.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)")
    if (mq.matches) {
      document.documentElement.style.scrollBehavior = "smooth"
    }
  }, [])
  return <>{children}</>
}

/**
 * FloatingElement — gentle physics-based float.
 */
export function FloatingElement({
  children, className, amplitude = 14, duration = 6, delay = 0, rotate = 3,
}: {
  children: React.ReactNode; className?: string; amplitude?: number; duration?: number; delay?: number; rotate?: number
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0], rotate: [0, rotate, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerReveal — children reveal one by one.
 */
export function StaggerReveal({
  children, className, stagger = 0.08, delay = 0,
}: {
  children: React.ReactNode; className?: string; stagger?: number; delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerItem — individual item with pop + blur reveal.
 */
export function StaggerItem({
  children, className,
}: {
  children: React.ReactNode; className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.92, filter: "blur(8px)" },
        show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * ParallaxImage — image moves at different speed than scroll.
 */
export function ParallaxImage({
  src, alt, className, speed = 0.3, rounded = "rounded-3xl",
}: {
  src: string; alt: string; className?: string; speed?: number; rounded?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15])
  return (
    <div ref={ref} className={`relative overflow-hidden ${rounded} ${className ?? ""}`}>
      <motion.img src={src} alt={alt} style={{ y, scale }} className="absolute inset-0 h-full w-full object-cover" />
    </div>
  )
}

/**
 * ClipReveal — clip-path wipe animation.
 */
export function ClipReveal({
  children, className, direction = "up", delay = 0,
}: {
  children: React.ReactNode; className?: string; direction?: "up" | "down" | "left" | "right"; delay?: number
}) {
  const clipPaths = {
    up: "inset(100% 0% 0% 0%)", down: "inset(0% 0% 100% 0%)",
    left: "inset(0% 100% 0% 0%)", right: "inset(0% 0% 0% 100%)",
  }
  return (
    <motion.div
      className={className}
      initial={{ clipPath: clipPaths[direction] }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * ScaleReveal — pop-in scale effect.
 */
export function ScaleReveal({
  children, className, delay = 0,
}: {
  children: React.ReactNode; className?: string; delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ============================================================
// NEW: Word-by-word text reveal
// ============================================================
export function WordReveal({
  text, className, delay = 0,
}: {
  text: string; className?: string; delay?: number
}) {
  const words = text.split(" ")
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.04, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.span>
  )
}

// ============================================================
// NEW: 3D Tilt Card — tilts based on mouse position
// ============================================================
export function TiltCard({
  children, className, intensity = 10,
}: {
  children: React.ReactNode; className?: string; intensity?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sX = useSpring(x, { stiffness: 300, damping: 20 })
  const sY = useSpring(y, { stiffness: 300, damping: 20 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    x.set(py * intensity)
    y.set(px * intensity)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: sX, rotateY: sY, transformStyle: "preserve-3d", perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================================
// NEW: Magnetic Button — attracts toward cursor
// ============================================================
export function MagneticButton({
  children, className, strength = 0.3,
}: {
  children: React.ReactNode; className?: string; strength?: number
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sX = useSpring(x, { stiffness: 200, damping: 15 })
  const sY = useSpring(y, { stiffness: 200, damping: 15 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const mx = e.clientX - (r.left + r.width / 2)
    const my = e.clientY - (r.top + r.height / 2)
    x.set(mx * strength)
    y.set(my * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sX, y: sY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================================
// NEW: Scroll-Triggered Gradient Backdrop
// ============================================================
export function GradientBackdrop({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.15, 0.15, 0])
  const hue = useTransform(scrollYProgress, [0, 1], [160, 200])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity,
        background: useTransform(hue, (h) => `radial-gradient(circle at 50% 50%, hsl(${h}, 30%, 50%), transparent 70%)`),
      }}
    />
  )
}

// ============================================================
// NEW: Number Counter with spring physics
// ============================================================
export function AnimatedCounter({
  to, suffix = "", prefix = "", decimals = 0, className,
}: {
  to: number; suffix?: string; prefix?: string; decimals?: number; className?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [val, setVal] = React.useState(0)

  React.useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const duration = 2
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(to * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return (
    <span ref={ref} className={className}>
      {prefix}{val.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  )
}

// ============================================================
// NEW: Shimmer border on hover
// ============================================================
export function ShimmerBorder({
  children, className,
}: {
  children: React.ReactNode; className?: string
}) {
  return (
    <motion.div
      className={`relative group ${className ?? ""}`}
      whileHover="hover"
    >
      <motion.div
        className="absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: "linear-gradient(110deg, transparent 30%, var(--paint-sage) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
        }}
        variants={{ hover: { backgroundPosition: ["200% 0%", "-200% 0%"] } }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      {children}
    </motion.div>
  )
}

// ============================================================
// NEW: Section progress bar (shows scroll progress within a section)
// ============================================================
export function SectionProgress({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-0.5 paint-gradient origin-left"
        style={{ scaleX }}
      />
    </div>
  )
}
