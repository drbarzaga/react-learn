"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

export type Theme = "dark" | "light"

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
  set: (t: Theme) => void
}

const Ctx = createContext<ThemeContextValue | null>(null)

function getInitial(): Theme {
  if (typeof document === "undefined") return "dark"
  const attr = document.documentElement.dataset.theme
  if (attr === "light" || attr === "dark") return attr
  return "dark"
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(getInitial())
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.classList.toggle("dark", theme === "dark")
    try {
      localStorage.setItem("theme", theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), [])

  return <Ctx.Provider value={{ theme, set: setTheme, toggle }}>{children}</Ctx.Provider>
}

export function useTheme() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useTheme requiere <ThemeProvider>")
  return ctx
}
