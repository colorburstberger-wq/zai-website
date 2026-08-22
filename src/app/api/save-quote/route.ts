import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional(),
  phone: z.string().optional(),
  area: z.number(),
  services: z.array(z.string()),
  coats: z.number(),
  furniture: z.boolean(),
  scaffolding: z.boolean(),
  paintCost: z.number(),
  prepCost: z.number(),
  extras: z.number(),
  subtotal: z.number(),
  gst: z.number(),
  total: z.number(),
  perSqft: z.number(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 }
      )
    }
    const d = parsed.data

    // Store as inquiry with serialized quote in message field
    const inquiry = await db.inquiry.create({
      data: {
        name: d.name || "Quote Request",
        email: d.email,
        phone: d.phone || "N/A",
        service: d.services.join(", ") || "Calculator Quote",
        brand: "Either",
        budget: `₹${Math.round(d.total).toLocaleString("en-IN")}`,
        message: JSON.stringify({
          type: "saved-quote",
          area: d.area,
          services: d.services,
          coats: d.coats,
          furniture: d.furniture,
          scaffolding: d.scaffolding,
          breakdown: {
            paintCost: d.paintCost,
            prepCost: d.prepCost,
            extras: d.extras,
            subtotal: d.subtotal,
            gst: d.gst,
            total: d.total,
            perSqft: d.perSqft,
          },
        }),
        status: "quoted",
      },
    })

    return NextResponse.json({ ok: true, id: inquiry.id })
  } catch (err) {
    console.error("[/api/save-quote] error", err)
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}
