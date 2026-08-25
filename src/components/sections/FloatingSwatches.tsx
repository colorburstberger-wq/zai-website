"use client"

import { motion } from "framer-motion"
import { FloatingElement } from "@/components/motion/cinematic"

/**
 * FloatingSwatches — decorative floating paint color blobs that
 * gently bob up/down and rotate, creating a "magical weightless" feel
 * similar to the floating food elements in the reference video.
 *
 * Place this inside any section that needs ambient floating decoration.
 */
const SWATCH_DATA = [
  { color: "var(--paint-teal)", size: 48, top: "10%", left: "5%", delay: 0, amp: 16, dur: 7, rot: 4 },
  { color: "var(--paint-sage)", size: 36, top: "60%", left: "8%", delay: 1.2, amp: 12, dur: 6, rot: 3 },
  { color: "var(--paint-teal)", size: 40, top: "30%", right: "6%", delay: 0.5, amp: 14, dur: 8, rot: 5 },
  { color: "var(--paint-sage)", size: 32, top: "75%", right: "10%", delay: 2, amp: 10, dur: 5.5, rot: -3 },
  { color: "var(--paint-teal)", size: 28, top: "15%", left: "45%", delay: 1.8, amp: 18, dur: 9, rot: 6 },
]

export function FloatingSwatches() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {SWATCH_DATA.map((s, i) => (
        <FloatingElement
          key={i}
          amplitude={s.amp}
          duration={s.dur}
          delay={s.delay}
          rotate={s.rot}
          className="absolute opacity-[0.07]"
          // @ts-ignore
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            width: s.size,
            height: s.size,
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{ background: s.color }}
          />
        </FloatingElement>
      ))}
    </div>
  )
}
