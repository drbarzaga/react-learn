"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

export type EditorThemeId = "auto" | "dracula" | "nightOwl" | "githubLight" | "monokai"

export interface EditorThemeMeta {
  label: string
  bg: string
  colors: [string, string, string] // keyword, string, definition
}

export const EDITOR_THEMES_META: Record<EditorThemeId, EditorThemeMeta> = {
  auto: { label: "Auto", bg: "#0f0f11", colors: ["#c4956a", "#87a89d", "#8babcc"] },
  dracula: { label: "Dracula", bg: "#282A36", colors: ["#ff79c6", "#f1fa8c", "#50fa7b"] },
  nightOwl: { label: "Night Owl", bg: "#011627", colors: ["#c792ea", "#ecc48d", "#82aaff"] },
  githubLight: { label: "GitHub Light", bg: "#ffffff", colors: ["#cf222e", "#0a3069", "#8250df"] },
  monokai: { label: "Monokai", bg: "#272822", colors: ["#f92672", "#e6db74", "#a6e22e"] },
}

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
  const [editorTheme, setEditorThemeState] = useState<EditorThemeId>(getInitial)

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
  if (!ctx) throw new Error("useEditorTheme requiere <EditorThemeProvider>")
  return ctx
}
