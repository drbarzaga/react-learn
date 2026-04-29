"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "@/hooks/useTheme"
import { EditorThemeProvider } from "@/hooks/useEditorTheme"
import { ProgressProvider } from "@/hooks/useProgress"
import { CodePersistenceProvider } from "@/hooks/useCodePersistence"

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
