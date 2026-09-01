import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

const ADMIN_PASSWORD = "Akarsh@123."

function checkAuth(req: NextRequest) {
  const auth = req.headers.get("authorization")
  if (!auth || auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return false
  }
  return true
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }
  try {
    const notes = await db.adminNote.findMany({
      orderBy: { updatedAt: "desc" },
    })
    return NextResponse.json({ ok: true, notes })
  } catch (err) {
    console.error("[/api/admin-notes] GET error", err)
    return NextResponse.json({ ok: true, notes: [], error: "DB not connected yet" })
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
    const note = await db.adminNote.create({ data: { content } })
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
    const note = await db.adminNote.update({
      where: { id },
      data: { content },
    })
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
    await db.adminNote.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[/api/admin-notes] DELETE error", err)
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 })
  }
}
