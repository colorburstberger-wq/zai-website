import { NextRequest, NextResponse } from "next/server"

const ADMIN_PASSWORD = "Akarsh@123."

// Supabase connection — uses env vars set in Vercel
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || ""

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
    const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_notes?order=updated_at.desc`, {
      headers: supabaseHeaders,
    })
    if (!res.ok) {
      // Table doesn't exist yet — create it
      await createTable()
      return NextResponse.json({ ok: true, notes: [] })
    }
    const data = await res.json()
    const notes = data.map((n: any) => ({
      id: n.id,
      content: n.content,
      createdAt: n.created_at,
      updatedAt: n.updated_at,
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

    const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_notes`, {
      method: "POST",
      headers: { ...supabaseHeaders, Prefer: "return=representation" },
      body: JSON.stringify({ content }),
    })

    if (!res.ok) {
      // Try creating table then retry
      await createTable()
      const retryRes = await fetch(`${SUPABASE_URL}/rest/v1/admin_notes`, {
        method: "POST",
        headers: { ...supabaseHeaders, Prefer: "return=representation" },
        body: JSON.stringify({ content }),
      })
      if (!retryRes.ok) {
        return NextResponse.json({ ok: false, error: "Failed to save" }, { status: 500 })
      }
      const data = await retryRes.json()
      const note = mapNote(data[0])
      return NextResponse.json({ ok: true, note })
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

    const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_notes?id=eq.${id}`, {
      method: "PATCH",
      headers: { ...supabaseHeaders, Prefer: "return=representation" },
      body: JSON.stringify({ content, updated_at: new Date().toISOString() }),
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

    const res = await fetch(`${SUPABASE_URL}/rest/v1/admin_notes?id=eq.${id}`, {
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

// Create the admin_notes table via Supabase SQL API
async function createTable() {
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS admin_notes (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      ALTER TABLE admin_notes ENABLE ROW LEVEL SECURITY;
      CREATE POLICY "Allow all via service key" ON admin_notes FOR ALL USING (true) WITH CHECK (true);
    `
    await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
      method: "POST",
      headers: { ...supabaseHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ query: sql }),
    }).catch(() => {})
  } catch {}
}

function mapNote(n: any) {
  return {
    id: n.id,
    content: n.content,
    createdAt: n.created_at || new Date().toISOString(),
    updatedAt: n.updated_at || new Date().toISOString(),
  }
}
