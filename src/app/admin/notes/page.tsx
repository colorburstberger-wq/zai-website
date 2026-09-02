"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Save, Trash2, Plus, Loader2, Lock, ArrowLeft, Check, StickyNote, X } from "lucide-react"

const ADMIN_PASSWORD = "Akarsh@123."

interface Note {
  id: string
  content: string
  createdAt: string
  updatedAt: string
}

export default function AdminNotesPage() {
  const [authed, setAuthed] = React.useState(false)
  const [passwordInput, setPasswordInput] = React.useState("")
  const [error, setError] = React.useState("")
  const [notes, setNotes] = React.useState<Note[]>([])
  const [loading, setLoading] = React.useState(false)
  const [savingId, setSavingId] = React.useState<string | null>(null)
  const [savedId, setSavedId] = React.useState<string | null>(null)
  // Track which notes are in edit mode and their draft content
  const [editStates, setEditStates] = React.useState<Record<string, string>>({})

  const headers = { Authorization: `Bearer ${ADMIN_PASSWORD}`, "Content-Type": "application/json" }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthed(true)
      setError("")
      fetchNotes()
    } else {
      setError("Wrong password")
    }
  }

  const fetchNotes = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin-notes", { headers })
      const data = await res.json()
      if (data.ok) setNotes(data.notes)
    } catch {}
    setLoading(false)
  }

  // Create a new blank note card on the page
  const createBlankNote = () => {
    const tempId = `temp-${Date.now()}`
    const newNote: Note = {
      id: tempId,
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setNotes([newNote, ...notes])
    setEditStates({ ...editStates, [tempId]: "" })
  }

  // Save a note — if it's a temp note (starts with "temp-"), create it; otherwise update
  const saveNote = async (id: string) => {
    const content = editStates[id] ?? ""
    if (!content.trim()) return

    setSavingId(id)
    try {
      if (id.startsWith("temp-")) {
        // Create new note
        const res = await fetch("/api/admin-notes", {
          method: "POST",
          headers,
          body: JSON.stringify({ content }),
        })
        const data = await res.json()
        if (data.ok) {
          // Replace temp note with real note
          setNotes(notes.map(n => n.id === id ? data.note : n))
          const newStates = { ...editStates }
          delete newStates[id]
          setEditStates(newStates)
          setSavedId(data.note.id)
          setTimeout(() => setSavedId(null), 2000)
        }
      } else {
        // Update existing note
        const res = await fetch("/api/admin-notes", {
          method: "PUT",
          headers,
          body: JSON.stringify({ id, content }),
        })
        const data = await res.json()
        if (data.ok) {
          setNotes(notes.map(n => n.id === id ? data.note : n))
          const newStates = { ...editStates }
          delete newStates[id]
          setEditStates(newStates)
          setSavedId(id)
          setTimeout(() => setSavedId(null), 2000)
        }
      }
    } catch {}
    setSavingId(null)
  }

  const deleteNote = async (id: string) => {
    // If temp note, just remove from UI
    if (id.startsWith("temp-")) {
      setNotes(notes.filter(n => n.id !== id))
      const newStates = { ...editStates }
      delete newStates[id]
      setEditStates(newStates)
      return
    }
    try {
      await fetch(`/api/admin-notes?id=${id}`, { method: "DELETE", headers })
      setNotes(notes.filter(n => n.id !== id))
    } catch {}
  }

  const startEdit = (note: Note) => {
    setEditStates({ ...editStates, [note.id]: note.content })
  }

  const cancelEdit = (id: string) => {
    // If temp note with empty content, remove it
    if (id.startsWith("temp-") && !(editStates[id] ?? "").trim()) {
      setNotes(notes.filter(n => n.id !== id))
    }
    const newStates = { ...editStates }
    delete newStates[id]
    setEditStates(newStates)
  }

  const updateDraft = (id: string, value: string) => {
    setEditStates({ ...editStates, [id]: value })
  }

  // Password gate
  if (!authed) {
    return (
      <div className="min-h-screen grid place-items-center bg-background p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm rounded-3xl border border-border/60 bg-card p-8 shadow-card"
        >
          <div className="text-center mb-6">
            <div className="h-16 w-16 rounded-2xl paint-gradient grid place-items-center mx-auto mb-4 shadow-warm">
              <Lock className="h-7 w-7 text-white" />
            </div>
            <h1 className="font-display text-2xl font-bold">Admin Access</h1>
            <p className="text-sm text-muted-foreground mt-1">Enter password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full h-12 px-4 rounded-xl bg-secondary/50 border border-border/60 focus:outline-none focus:border-primary text-sm"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              className="w-full h-12 rounded-xl paint-gradient text-white font-semibold shadow-warm hover:opacity-90 transition"
            >
              Unlock
            </button>
          </form>
          <a href="/" className="block text-center mt-4 text-xs text-muted-foreground hover:text-primary transition">
            ← Back to website
          </a>
        </motion.div>
      </div>
    )
  }

  // Notes page
  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <a href="/" className="h-9 w-9 rounded-xl bg-secondary grid place-items-center hover:bg-primary hover:text-primary-foreground transition">
              <ArrowLeft className="h-4 w-4" />
            </a>
            <div>
              <h1 className="font-display text-2xl font-bold flex items-center gap-2">
                <StickyNote className="h-5 w-5 text-primary" />
                Admin Notepad
              </h1>
              <p className="text-xs text-muted-foreground">Plan future updates & refinements — {notes.length} notes</p>
            </div>
          </div>
          <button
            onClick={createBlankNote}
            className="rounded-full paint-gradient text-white px-4 py-2 text-sm font-semibold shadow-warm hover:opacity-90 transition flex items-center gap-1.5"
          >
            <Plus className="h-4 w-4" />
            New Note
          </button>
        </div>

        {/* Notes grid — multiple notepads on same page */}
        {loading && notes.length === 0 ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 mx-auto animate-spin text-muted-foreground" />
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <StickyNote className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm mb-3">No notes yet. Create your first planning note.</p>
            <button
              onClick={createBlankNote}
              className="rounded-full paint-gradient text-white px-4 py-2 text-sm font-semibold shadow-warm hover:opacity-90 transition inline-flex items-center gap-1.5"
            >
              <Plus className="h-4 w-4" />
              Create Note
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            <AnimatePresence>
              {notes.map((note) => {
                const isEditing = editStates[note.id] !== undefined
                const draft = editStates[note.id] ?? note.content
                const isTemp = note.id.startsWith("temp-")

                return (
                  <motion.div
                    key={note.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="rounded-2xl border border-border/60 bg-card p-4 shadow-card flex flex-col"
                  >
                    {/* Note header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full paint-gradient" />
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                          {isTemp ? "New Note" : "Note"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {savedId === note.id && (
                          <span className="text-[10px] text-paint-sage font-semibold flex items-center gap-1 mr-1">
                            <Check className="h-3 w-3" /> Saved
                          </span>
                        )}
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="h-6 w-6 rounded-lg hover:bg-destructive/10 hover:text-destructive grid place-items-center transition"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Note content — always editable */}
                    <textarea
                      value={draft}
                      onChange={(e) => updateDraft(note.id, e.target.value)}
                      placeholder="Write your plans, ideas, refinements, future features..."
                      rows={5}
                      autoFocus={isTemp}
                      className="w-full bg-secondary/30 rounded-lg p-3 resize-y focus:outline-none focus:ring-1 focus:ring-primary text-sm text-foreground placeholder:text-muted-foreground min-h-[120px] flex-1"
                    />

                    {/* Footer with timestamp + save button */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
                      <span className="text-[10px] text-muted-foreground">
                        {isTemp ? "Not saved yet" : `Updated ${new Date(note.updatedAt).toLocaleString("en-IN")}`}
                      </span>
                      <button
                        onClick={() => saveNote(note.id)}
                        disabled={!draft.trim() || savingId === note.id}
                        className="rounded-full paint-gradient text-white px-3 py-1.5 text-xs font-semibold shadow-warm hover:opacity-90 transition flex items-center gap-1 disabled:opacity-40"
                      >
                        {savingId === note.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Save className="h-3 w-3" />
                        )}
                        Save Note
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {/* Always-available "add" card at the end */}
            <motion.button
              onClick={createBlankNote}
              whileHover={{ y: -2 }}
              className="rounded-2xl border-2 border-dashed border-border/60 grid place-items-center min-h-[200px] hover:border-primary/40 hover:bg-primary/5 transition"
            >
              <div className="text-center text-muted-foreground">
                <Plus className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm font-medium">Add another note</p>
              </div>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  )
}
