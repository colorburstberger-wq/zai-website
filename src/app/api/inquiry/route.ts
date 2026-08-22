import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  service: z.string().min(1),
  brand: z.string().min(1),
  budget: z.string().optional().nullable(),
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

    const inquiry = await db.inquiry.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        service: parsed.data.service,
        brand: parsed.data.brand,
        budget: parsed.data.budget ?? null,
        message: parsed.data.message ?? null,
        status: "new",
      },
    })

    return NextResponse.json({ ok: true, id: inquiry.id })
  } catch (err) {
    console.error("[/api/inquiry] error", err)
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const items = await db.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    })
    return NextResponse.json({ ok: true, items })
  } catch (err) {
    console.error("[/api/inquiry] GET error", err)
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}
