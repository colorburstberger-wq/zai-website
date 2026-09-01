"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Save, Trash2, Plus, Loader2, Lock, ArrowLeft, Check } from "lucide-react"

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
  const [newNote, setNewNote] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [saving, setSaving] = React.useState<string | null>(null)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [editContent, setEditContent] = React.useState("")
  const [savedId, setSavedId] = React.useState<string | null>(null)

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

  const headers = { Authorization: `Bearer ${ADMIN_PASSWORD}`, "Content-Type": "application/json" }

  const fetchNotes = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin-notes", { headers })
      const data = await res.json()
      if (data.ok) setNotes(data.notes)
    } catch {}
    setLoading(false)
  }

  const addNote = async () => {
    if (!newNote.trim()) return
    setLoading(true)
    try {
      const res = await fetch("/api/admin-notes", {
        method: "POST",
        headers,
        body: JSON.stringify({ content: newNote }),
      })
      const data = await res.json()
      if (data.ok) {
        setNotes([data.note, ...notes])
        setNewNote("")
      }
    } catch {}
    setLoading(false)
  }

  const updateNote = async (id: string) => {
    setSaving(id)
    try {
      const res = await fetch("/api/admin-notes", {
        method: "PUT",
        headers,
        body: JSON.stringify({ id, content: editContent }),
      })
      const data = await res.json()
      if (data.ok) {
        setNotes(notes.map(n => n.id === id ? data.note : n))
        setEditingId(null)
        setSavedId(id)
        setTimeout(() => setSavedId(null), 2000)
      }
    } catch {}
    setSaving(null)
  }

  const deleteNote = async (id: string) => {
    try {
      await fetch(`/api/admin-notes?id=${id}`, { method: "DELETE", headers })
      setNotes(notes.filter(n => n.id !== id))
    } catch {}
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
          <a
            href="/"
            className="block text-center mt-4 text-xs text-muted-foreground hover:text-primary transition"
          >
            ← Back to website
          </a>
        </motion.div>
      </div>
    )
  }

  // Notes page
  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <a href="/" className="h-9 w-9 rounded-xl bg-secondary grid place-items-center hover:bg-primary hover:text-primary-foreground transition">
              <ArrowLeft className="h-4 w-4" />
            </a>
            <div>
              <h1 className="font-display text-2xl font-bold">Admin Notepad</h1>
              <p className="text-xs text-muted-foreground">Plan future updates & refinements</p>
            </div>
          </div>
        </div>

        {/* Add new note */}
        <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-card mb-6">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="What do you want to do next? What refinements? New features? Write it here..."
            rows={4}
            className="w-full bg-transparent resize-none focus:outline-none text-sm text-foreground placeholder:text-muted-foreground"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={addNote}
              disabled={!newNote.trim() || loading}
              className="rounded-full paint-gradient text-white px-4 py-2 text-sm font-semibold shadow-warm hover:opacity-90 transition flex items-center gap-1.5 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Add note
            </button>
          </div>
        </div>

        {/* Notes list */}
        {loading && notes.length === 0 ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 mx-auto animate-spin text-muted-foreground" />
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No notes yet. Add your first planning note above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="rounded-2xl border border-border/60 bg-card p-4 shadow-card"
                >
                  {editingId === note.id ? (
                    <div>
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={4}
                        className="w-full bg-transparent resize-none focus:outline-none text-sm"
                        autoFocus
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => { setEditingId(null); setEditContent("") }}
                          className="rounded-full px-3 py-1.5 text-xs font-medium border border-border/60 hover:bg-secondary transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => updateNote(note.id)}
                          disabled={saving === note.id}
                          className="rounded-full paint-gradient text-white px-3 py-1.5 text-xs font-semibold shadow-warm hover:opacity-90 transition flex items-center gap-1"
                        >
                          {saving === note.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm whitespace-pre-wrap break-words">{note.content}</p>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(note.updatedAt).toLocaleString("en-IN")}
                        </span>
                        <div className="flex gap-1">
                          {savedId === note.id && (
                            <span className="text-[10px] text-paint-sage font-semibold flex items-center gap-1 mr-2">
                              <Check className="h-3 w-3" /> Saved
                            </span>
                          )}
                          <button
                            onClick={() => { setEditingId(note.id); setEditContent(note.content) }}
                            className="h-7 w-7 rounded-lg hover:bg-secondary grid place-items-center transition"
                            aria-label="Edit"
                          >
                            <Save className="h-3.5 w-3.5 text-muted-foreground" />
                          </button>
                          <button
                            onClick={() => deleteNote(note.id)}
                            className="h-7 w-7 rounded-lg hover:bg-destructive/10 hover:text-destructive grid place-items-center transition"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
