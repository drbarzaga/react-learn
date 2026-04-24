"use client"

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react"

const STORAGE_KEY = "react-dojo-progress"

interface ProgressData {
  visitedConcepts: string[]
  completedExercises: string[]
  quizScores: Record<string, number>
}

const empty: ProgressData = {
  visitedConcepts: [],
  completedExercises: [],
  quizScores: {},
}

function load(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return empty
    return { ...empty, ...JSON.parse(raw) }
  } catch {
    return empty
  }
}

function persist(data: ProgressData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

interface ProgressCtx {
  visitedConcepts: Set<string>
  completedExercises: Set<string>
  quizScores: Record<string, number>
  markConceptVisited: (id: string) => void
  toggleExerciseCompleted: (id: string) => void
  saveQuizScore: (id: string, pct: number) => void
}

const Ctx = createContext<ProgressCtx | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ProgressData>(load)

  const markConceptVisited = useCallback((id: string) => {
    setData((prev) => {
      if (prev.visitedConcepts.includes(id)) return prev
      const next = { ...prev, visitedConcepts: [...prev.visitedConcepts, id] }
      persist(next)
      return next
    })
  }, [])

  const toggleExerciseCompleted = useCallback((id: string) => {
    setData((prev) => {
      const already = prev.completedExercises.includes(id)
      const next = {
        ...prev,
        completedExercises: already
          ? prev.completedExercises.filter((x) => x !== id)
          : [...prev.completedExercises, id],
      }
      persist(next)
      return next
    })
  }, [])

  const saveQuizScore = useCallback((id: string, pct: number) => {
    setData((prev) => {
      if ((prev.quizScores[id] ?? -1) >= pct) return prev
      const next = { ...prev, quizScores: { ...prev.quizScores, [id]: pct } }
      persist(next)
      return next
    })
  }, [])

  const value = useMemo<ProgressCtx>(
    () => ({
      visitedConcepts: new Set(data.visitedConcepts),
      completedExercises: new Set(data.completedExercises),
      quizScores: data.quizScores,
      markConceptVisited,
      toggleExerciseCompleted,
      saveQuizScore,
    }),
    [data, markConceptVisited, toggleExerciseCompleted, saveQuizScore]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useProgress(): ProgressCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider")
  return ctx
}
