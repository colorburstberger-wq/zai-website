"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

/**
 * SmoothScroll — adds momentum/lerp smoothing to the native browser scroll.
 * Creates that premium "heavy" app-like feel where the scroll slightly
 * overshoots and settles back, similar to iOS/native app scrolling.
 *
 * This uses CSS scroll-behavior + a subtle wrapper that intercepts
 * wheel events and applies spring-based smoothing.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = React.useState(false)

  React.useEffect(() => {
    // Only enable on desktop with fine pointer
    const mq = window.matchMedia("(pointer: fine)")
    if (!mq.matches) return
    setEnabled(true)

    // Add smooth scroll-behavior via CSS
    document.documentElement.style.scrollBehavior = "smooth"
  }, [])

  return <>{children}</>
}

/**
 * FloatingElement — wraps children with a gentle physics-based float.
 * Elements gently bob up/down and slightly rotate, independent of scroll.
 *
 * @param amplitude - How far the element floats (px)
 * @param duration - How long one float cycle takes (seconds)
 * @param delay - Stagger delay (seconds)
 */
export function FloatingElement({
  children,
  className,
  amplitude = 14,
  duration = 6,
  delay = 0,
  rotate = 3,
}: {
  children: React.ReactNode
  className?: string
  amplitude?: number
  duration?: number
  delay?: number
  rotate?: number
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0],
        rotate: [0, rotate, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerReveal — container that reveals children one by one as it enters viewport.
 * Each child pops in with scale + fade, staggered by milliseconds.
 */
export function StaggerReveal({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerItem — individual item inside a StaggerReveal.
 * Pops in with scale-up + opacity fade + slight blur removal.
 */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.92, filter: "blur(8px)" },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * ParallaxImage — image that moves at a different speed than scroll.
 * Creates depth perception (background moves slower than foreground).
 */
export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.3,
  rounded = "rounded-3xl",
}: {
  src: string
  alt: string
  className?: string
  speed?: number
  rounded?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])

  return (
    <div ref={ref} className={`relative overflow-hidden ${rounded} ${className ?? ""}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  )
}

/**
 * ClipReveal — reveals content with a clip-path wipe animation.
 * Content "wipes in" from bottom to top (or left to right).
 */
export function ClipReveal({
  children,
  className,
  direction = "up",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
}) {
  const clipPaths = {
    up: "inset(100% 0% 0% 0%)",
    down: "inset(0% 0% 100% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
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
 * ScaleReveal — element scales up from small to full size with opacity.
 * Like a "pop" effect when scrolling into view.
 */
export function ScaleReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
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
