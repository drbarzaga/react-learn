"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "@/hooks/useTheme"
import { EditorThemeProvider } from "@/hooks/useEditorTheme"
import { ProgressProvider } from "@/hooks/useProgress"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <EditorThemeProvider>
        <ProgressProvider>{children}</ProgressProvider>
      </EditorThemeProvider>
    </ThemeProvider>
  )
}
