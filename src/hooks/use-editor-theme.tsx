"use client"

import { EDITOR_THEMES_META } from "@/lib/constants"
import { EditorThemeId } from "@/types"
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

interface EditorThemeContextValue {
  editorTheme: EditorThemeId
  setEditorTheme: (t: EditorThemeId) => void
}

const Ctx = createContext<EditorThemeContextValue | null>(null)

function getInitial(): EditorThemeId {
  try {
    const stored = localStorage.getItem("editorTheme")
    if (stored && stored in EDITOR_THEMES_META) return stored as EditorThemeId
  } catch {
    /* ignore */
  }
  return "auto"
}

export function EditorThemeProvider({ children }: { children: ReactNode }) {
  const [editorTheme, setEditorThemeState] = useState<EditorThemeId>("auto")

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEditorThemeState(getInitial())
  }, [])

  const setEditorTheme = useCallback((t: EditorThemeId) => {
    setEditorThemeState(t)
    try {
      localStorage.setItem("editorTheme", t)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    // keep meta bg in sync for auto theme (light mode)
    const isLight = document.documentElement.dataset.theme === "light"
    if (editorTheme === "auto") {
      EDITOR_THEMES_META.auto.bg = isLight ? "#f5f3ee" : "#0f0f11"
    }
  })

  return <Ctx.Provider value={{ editorTheme, setEditorTheme }}>{children}</Ctx.Provider>
}

export function useEditorTheme() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useEditorTheme require <EditorThemeProvider>")
  return ctx
}
