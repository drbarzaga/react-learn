"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { Concept, Category } from "@/content/types"
import type { Exercise } from "@/content/exercises/types"
import type { Quiz } from "@/content/quiz"

interface ContentContextValue {
  allConcepts: Concept[]
  conceptIndex: Record<string, Concept>
  categories: Category[]
  allExercises: Exercise[]
  exerciseIndex: Record<string, Exercise>
  allQuizzes: Quiz[]
  quizIndex: Record<string, Quiz>
}

const ContentCtx = createContext<ContentContextValue | null>(null)

export function ContentProvider({
  children,
  ...value
}: ContentContextValue & { children: ReactNode }) {
  return <ContentCtx.Provider value={value}>{children}</ContentCtx.Provider>
}

export function useContent() {
  const ctx = useContext(ContentCtx)
  if (!ctx) throw new Error("useContent must be used inside <ContentProvider>")
  return ctx
}
