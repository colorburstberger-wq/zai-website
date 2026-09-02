import { NextRequest, NextResponse } from "next/server"

const ADMIN_PASSWORD = "Akarsh@123."

// Supabase connection — uses env vars set in Vercel
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || ""

// Table name in Supabase — Prisma created it as "AdminNote" with columns "createdAt"/"updatedAt"
const TABLE = "AdminNote"

function checkAuth(req: NextRequest) {
  const auth = req.headers.get("authorization")
  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return false
  }
  return true
}

const supabaseHeaders = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}?order=updatedAt.desc`, {
      headers: supabaseHeaders,
    })
    if (!res.ok) {
      return NextResponse.json({ ok: true, notes: [] })
    }
    const data = await res.json()
    const notes = data.map((n: any) => ({
      id: n.id,
      content: n.content,
      createdAt: n.createdAt,
      updatedAt: n.updatedAt,
    }))
    return NextResponse.json({ ok: true, notes })
  } catch (err) {
    console.error("[/api/admin-notes] GET error", err)
    return NextResponse.json({ ok: true, notes: [] })
  }
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }
  try {
    const body = await req.json().catch(() => ({}))
    const { content } = body
    if (!content || typeof content !== "string") {
      return NextResponse.json({ ok: false, error: "Content required" }, { status: 400 })
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
      method: "POST",
      headers: { ...supabaseHeaders, Prefer: "return=representation" },
      body: JSON.stringify({ id: crypto.randomUUID(), content }),
    })

    if (!res.ok) {
      const errText = await res.text()
      return NextResponse.json({ ok: false, error: `Failed to save: ${errText}` }, { status: 500 })
    }

    const data = await res.json()
    const note = mapNote(data[0])
    return NextResponse.json({ ok: true, note })
  } catch (err) {
    console.error("[/api/admin-notes] POST error", err)
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }
  try {
    const body = await req.json().catch(() => ({}))
    const { id, content } = body
    if (!id || !content) {
      return NextResponse.json({ ok: false, error: "ID and content required" }, { status: 400 })
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}?id=eq.${id}`, {
      method: "PATCH",
      headers: { ...supabaseHeaders, Prefer: "return=representation" },
      body: JSON.stringify({ content }),
    })

    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "Failed to update" }, { status: 500 })
    }
    const data = await res.json()
    const note = mapNote(data[0])
    return NextResponse.json({ ok: true, note })
  } catch (err) {
    console.error("[/api/admin-notes] PUT error", err)
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ ok: false, error: "ID required" }, { status: 400 })
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}?id=eq.${id}`, {
      method: "DELETE",
      headers: supabaseHeaders,
    })

    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "Failed to delete" }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[/api/admin-notes] DELETE error", err)
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}

function mapNote(n: any) {
  return {
    id: n.id,
    content: n.content,
    createdAt: n.createdAt || new Date().toISOString(),
    updatedAt: n.updatedAt || new Date().toISOString(),
  }
}
