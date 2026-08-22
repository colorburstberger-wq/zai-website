import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().optional().nullable(),
  preferredDate: z.string().optional().nullable(),
  room: z.string().optional().nullable(),
  brandPref: z.string().optional().nullable(),
  message: z.string().max(2000).optional().nullable(),
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

    const booking = await db.consultationBooking.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        address: parsed.data.address ?? null,
        preferredDate: parsed.data.preferredDate ?? null,
        room: parsed.data.room ?? null,
        brandPref: parsed.data.brandPref ?? null,
        message: parsed.data.message ?? null,
        status: "requested",
      },
    })

    return NextResponse.json({ ok: true, id: booking.id })
  } catch (err) {
    console.error("[/api/consultations] error", err)
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const items = await db.consultationBooking.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    })
    return NextResponse.json({ ok: true, items })
  } catch (err) {
    console.error("[/api/consultations] GET error", err)
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}
