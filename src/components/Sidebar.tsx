import {
  Boxes,
  RefreshCw,
  Gauge,
  Hourglass,
  Component,
  Dumbbell,
  MessageCircleQuestion,
  Brain,
} from "lucide-react"
import type { ComponentType } from "react"
import { cn } from "@/lib/utils"
import { navigate } from "@/hooks/useHashRoute"
import { categories, conceptIndex } from "@/content/concepts"
import { allExercises, type Difficulty } from "@/content/exercises"
import { allQuizzes } from "@/content/quiz"

interface SidebarProps {
  current: string
}

type IconC = ComponentType<{ className?: string; strokeWidth?: number }>

const categoryIcon: Record<string, IconC> = {
  estado: Boxes,
  sincronizacion: RefreshCw,
  rendimiento: Gauge,
  concurrencia: Hourglass,
  composicion: Component,
  entrevistas: MessageCircleQuestion,
}

const difficultyDots: Record<Difficulty, number> = {
  "básico": 1,
  "intermedio": 2,
  "avanzado": 3,
}

function DifficultyDots({ level }: { level: Difficulty }) {
  const n = difficultyDots[level]
  return (
    <span
      aria-label={`dificultad: ${level}`}
      className="ml-auto flex items-center gap-[2px] pl-2"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            "h-[4px] w-[4px] rounded-full",
            i < n
              ? "bg-[var(--color-fg-muted)]"
              : "bg-[var(--color-fg-faint)]",
          )}
        />
      ))}
    </span>
  )
}

export function Sidebar({ current }: SidebarProps) {
  const isExerciseRoute = current.startsWith("learn/")
  const activeExerciseId = isExerciseRoute ? current.slice(6) : null

  return (
    <aside className="hidden md:block w-[240px] shrink-0 overflow-y-auto border-r border-[var(--color-line)] py-8">
      {categories.map((cat) => {
        const Icon = categoryIcon[cat.id]
        return (
          <section key={cat.id} className="mb-6 px-3">
            <h3 className="mb-2 flex items-center gap-2 px-3 text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-dim)]">
              {Icon && (
                <Icon
                  className="h-[13px] w-[13px] text-[var(--color-fg-dim)]"
                  strokeWidth={1.8}
                />
              )}
              <span>{cat.title}</span>
            </h3>
            <ul className="space-y-[1px]">
              {cat.conceptIds.map((id) => {
                const concept = conceptIndex[id]
                if (!concept) return null
                const active = !isExerciseRoute && current === id
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(id)
                      }}
                      className={cn(
                        "group relative flex items-center rounded-md py-[5px] pl-3 pr-3 text-[14px] transition-colors",
                        active
                          ? "bg-[var(--color-bg-hover)] text-[var(--color-fg)]"
                          : "text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-raise)] hover:text-[var(--color-fg)]",
                      )}
                    >
                      {active && (
                        <span
                          aria-hidden
                          className="absolute left-0 top-1/2 h-[14px] w-[2px] -translate-y-1/2 rounded-full bg-[var(--color-fg)]"
                        />
                      )}
                      <span className="font-mono">{concept.label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}

      {/* Quiz */}
      <section className="mb-6 px-3">
        <h3 className="mb-2 flex items-center gap-2 px-3 text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-dim)]">
          <Brain
            className="h-[13px] w-[13px] text-[var(--color-fg-dim)]"
            strokeWidth={1.8}
          />
          <span>Quiz</span>
        </h3>
        <ul className="space-y-[1px]">
          {allQuizzes.map((quiz) => {
            const active = current === `quiz/${quiz.id}`
            return (
              <li key={quiz.id}>
                <a
                  href={`#quiz/${quiz.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(`quiz/${quiz.id}`)
                  }}
                  className={cn(
                    "group relative flex items-center rounded-md py-[5px] pl-3 pr-3 text-[14px] transition-colors",
                    active
                      ? "bg-[var(--color-bg-hover)] text-[var(--color-fg)]"
                      : "text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-raise)] hover:text-[var(--color-fg)]",
                  )}
                >
                  {active && (
                    <span
                      aria-hidden
                      className="absolute left-0 top-1/2 h-[14px] w-[2px] -translate-y-1/2 rounded-full bg-[var(--color-fg)]"
                    />
                  )}
                  <span className="truncate">{quiz.label}</span>
                  <span className="ml-auto pl-2 font-mono text-[11px] text-[var(--color-fg-faint)]">
                    {quiz.questions.length}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Práctica */}
      <section className="mb-6 px-3">
        <h3 className="mb-2 flex items-center gap-2 px-3 text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-dim)]">
          <Dumbbell
            className="h-[13px] w-[13px] text-[var(--color-fg-dim)]"
            strokeWidth={1.8}
          />
          <span>Práctica</span>
          <span className="ml-auto text-[var(--color-fg-faint)]">
            {allExercises.length}
          </span>
        </h3>
        <ul className="space-y-[1px]">
          {allExercises.map((ex) => {
            const active = isExerciseRoute && activeExerciseId === ex.id
            return (
              <li key={ex.id}>
                <a
                  href={`#learn/${ex.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(`learn/${ex.id}`)
                  }}
                  className={cn(
                    "group relative flex items-center rounded-md py-[5px] pl-3 pr-3 text-[14px] transition-colors",
                    active
                      ? "bg-[var(--color-bg-hover)] text-[var(--color-fg)]"
                      : "text-[var(--color-fg-muted)] hover:bg-[var(--color-bg-raise)] hover:text-[var(--color-fg)]",
                  )}
                >
                  {active && (
                    <span
                      aria-hidden
                      className="absolute left-0 top-1/2 h-[14px] w-[2px] -translate-y-1/2 rounded-full bg-[var(--color-fg)]"
                    />
                  )}
                  <span className="truncate">{ex.label}</span>
                  <DifficultyDots level={ex.difficulty} />
                </a>
              </li>
            )
          })}
        </ul>
      </section>
    </aside>
  )
}
