"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "@/hooks/use-theme"
import { EditorThemeProvider } from "@/hooks/use-editor-theme"
import { ProgressProvider } from "@/hooks/use-progress"
import { CodePersistenceProvider } from "@/hooks/use-code-persistence"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <EditorThemeProvider>
        <ProgressProvider>
          <CodePersistenceProvider>{children}</CodePersistenceProvider>
        </ProgressProvider>
      </EditorThemeProvider>
    </ThemeProvider>
  )
}
