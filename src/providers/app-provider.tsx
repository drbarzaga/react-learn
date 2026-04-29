"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "@/hooks/use-theme"
import { EditorThemeProvider } from "@/hooks/use-editor-theme"
import { ProgressProvider } from "@/hooks/use-progress"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <EditorThemeProvider>
        <ProgressProvider>{children}</ProgressProvider>
      </EditorThemeProvider>
    </ThemeProvider>
  )
}
