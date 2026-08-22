import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional().nullable(),
  source: z.string().optional().default("footer"),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 }
      )
    }

    // Upsert — if email already subscribed, just reactivate.
    const existing = await db.subscriber.findUnique({
      where: { email: parsed.data.email },
    })

    if (existing) {
      await db.subscriber.update({
        where: { id: existing.id },
        data: { active: true, source: parsed.data.source },
      })
      return NextResponse.json({ ok: true, alreadySubscribed: true })
    }

    await db.subscriber.create({
      data: {
        email: parsed.data.email,
        name: parsed.data.name ?? null,
        source: parsed.data.source,
        active: true,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[/api/newsletter] error", err)
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const count = await db.subscriber.count({ where: { active: true } })
    return NextResponse.json({ ok: true, count })
  } catch (err) {
    console.error("[/api/newsletter] GET error", err)
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}
