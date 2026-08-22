"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  variant?: "light" | "dark" | "auto"
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

/**
 * BrandLogo — renders the real Berger Urban Exclusive Paints Store logo.
 *
 * The uploaded SVG has a dark background (#0B0A0F), so:
 * - "light" variant: shows the logo as-is (dark bg) — for light backgrounds
 * - "dark" variant: inverts the logo for dark backgrounds
 * - "auto": adapts based on parent context
 */
export function BrandLogo({
  className,
  variant = "light",
  size = "md",
  showText = true,
}: LogoProps) {
  const sizes = {
    sm: { box: "h-9 w-9", text: "text-sm", sub: "text-[9px]" },
    md: { box: "h-10 w-10", text: "text-base", sub: "text-[10px]" },
    lg: { box: "h-12 w-12", text: "text-lg", sub: "text-[11px]" },
  }
  const s = sizes[size]

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative rounded-xl overflow-hidden shrink-0",
          s.box,
          variant === "dark" && "invert",
        )}
      >
        <img
          src="/images/brand-logo.svg"
          alt="Berger Urban Exclusive Paints Store logo"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn("font-display font-bold tracking-tight", s.text)}>
            Berger <span className="text-gradient-warm">Urban Exclusive</span>
          </span>
          <span className={cn("uppercase tracking-[0.2em] text-muted-foreground", s.sub)}>
            Paints Store · Gorakhpur
          </span>
        </div>
      )}
    </div>
  )
}
