"use client"

import {
  Boxes,
  Check,
  ChevronDown,
  Component,
  Gauge,
  Hourglass,
  MessageCircleQuestion,
  RefreshCw,
} from "lucide-react"
import type { ComponentType } from "react"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Sidebar as ShadcnSidebar, SidebarContent } from "@/components/ui/sidebar"
import { categories, conceptIndex } from "@/content/concepts"
import { allExercises, type Difficulty } from "@/content/exercises"
import { allQuizzes } from "@/content/quiz"
import { useProgress } from "@/hooks/useProgress"

type IconC = ComponentType<{ className?: string; strokeWidth?: number }>

function QuizRing({ score }: { score: number }) {
  const r = 5.5
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - score / 100)
  const color = score >= 80 ? "#34d399" : score >= 50 ? "#fbbf24" : "#f87171"
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" className="shrink-0 -rotate-90">
      <circle
        cx="8"
        cy="8"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="text-sidebar-foreground/10"
      />
      <circle
        cx="8"
        cy="8"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
      />
    </svg>
  )
}

const categoryIcon: Record<string, IconC> = {
  estado: Boxes,
  sincronizacion: RefreshCw,
  rendimiento: Gauge,
  concurrencia: Hourglass,
  composicion: Component,
  entrevistas: MessageCircleQuestion,
}

const difficultyDot: Record<Difficulty, string> = {
  básico: "bg-emerald-400/60",
  intermedio: "bg-amber-400/60",
  avanzado: "bg-rose-400/60",
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sidebar-foreground/30 px-4 pt-4 pb-1 text-[10px] font-semibold tracking-[0.18em] uppercase first:pt-2">
      {children}
    </div>
  )
}

function NavItem({
  label,
  active,
  mono,
  badge,
  indicator,
  onClick,
}: {
  label: string
  active: boolean
  mono?: boolean
  badge?: React.ReactNode
  indicator?: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex w-full min-w-0 items-center gap-2 rounded-md px-3 py-[5px] text-left text-[13px] transition-colors",
        mono ? "font-mono" : "",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/60 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
      ].join(" ")}
    >
      <span className="flex-1 truncate">{label}</span>
      {indicator}
      {badge && (
        <span className="text-sidebar-foreground/30 ml-1 shrink-0 font-mono text-[10px] tabular-nums">
          {badge}
        </span>
      )}
    </button>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const current = pathname === "/" ? "" : pathname.slice(1)
  const isExerciseRoute = current.startsWith("learn/")
  const isQuizRoute = current.startsWith("quiz/")
  const activeExId = isExerciseRoute ? current.slice(6) : null
  const { visitedConcepts, completedExercises, quizScores } = useProgress()

  const activeCatId = categories.find((c) => c.conceptIds.includes(current))?.id ?? null

  const [openCats, setOpenCats] = useState<Set<string>>(
    () => new Set(activeCatId ? [activeCatId] : [])
  )

  useEffect(() => {
    if (activeCatId) {
      setOpenCats((prev) => (prev.has(activeCatId) ? prev : new Set([...prev, activeCatId])))
    }
  }, [activeCatId])

  const toggle = (id: string) =>
    setOpenCats((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <ShadcnSidebar
      collapsible="offcanvas"
      className="border-sidebar-border top-12! h-[calc(100svh-3rem)]! border-r"
    >
      <SidebarContent className="gap-0 py-1">
        {/* ── CONCEPTOS ─────────────────────── */}
        <SectionLabel>Conceptos</SectionLabel>

        <div className="px-2">
          {categories.map((cat) => {
            const Icon = categoryIcon[cat.id]
            const isOpen = openCats.has(cat.id)
            const visited = cat.conceptIds.filter((id) => visitedConcepts.has(id)).length
            const total = cat.conceptIds.length

            return (
              <div key={cat.id}>
                {/* Category header */}
                <button
                  onClick={() => toggle(cat.id)}
                  className="group hover:bg-sidebar-accent/60 flex w-full items-center gap-2 rounded-md px-3 py-[6px] transition-colors"
                >
                  {Icon && (
                    <Icon
                      className="text-sidebar-foreground/35 group-hover:text-sidebar-foreground/55 h-[11px] w-[11px] shrink-0"
                      strokeWidth={2}
                    />
                  )}
                  <span className="text-sidebar-foreground/45 group-hover:text-sidebar-foreground/65 flex-1 truncate text-left text-[11px] font-semibold tracking-[0.1em] uppercase">
                    {cat.title}
                  </span>
                  {visited > 0 && visited < total && (
                    <span className="text-sidebar-foreground/25 font-mono text-[9px]">
                      {visited}/{total}
                    </span>
                  )}
                  {visited === total && (
                    <Check
                      className="h-[9px] w-[9px] shrink-0 text-emerald-400/60"
                      strokeWidth={3}
                    />
                  )}
                  <ChevronDown
                    className="text-sidebar-foreground/20 h-[10px] w-[10px] shrink-0 transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
                  />
                </button>

                {/* Animated concept list */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 180ms ease",
                  }}
                >
                  <div style={{ overflow: "hidden", minHeight: 0 }}>
                    <div className="pr-0 pb-1 pl-2">
                      {cat.conceptIds.map((id) => {
                        const concept = conceptIndex[id]
                        if (!concept) return null
                        const active = !isExerciseRoute && !isQuizRoute && current === id
                        const seen = visitedConcepts.has(id)
                        return (
                          <NavItem
                            key={id}
                            label={concept.label}
                            active={active}
                            mono
                            onClick={() => router.push(`/${id}`)}
                            indicator={
                              seen ? (
                                <Check
                                  className="text-sidebar-foreground/20 h-[9px] w-[9px] shrink-0"
                                  strokeWidth={3}
                                />
                              ) : null
                            }
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── QUIZ ──────────────────────────── */}
        <div className="bg-sidebar-border mx-3 mt-3 h-px" />
        <SectionLabel>Quiz</SectionLabel>

        <div className="px-2">
          {allQuizzes.map((quiz) => {
            const active = current === `quiz/${quiz.id}`
            const bestScore = quizScores[quiz.id]
            return (
              <NavItem
                key={quiz.id}
                label={quiz.label}
                active={active}
                onClick={() => router.push(`/quiz/${quiz.id}`)}
                indicator={bestScore !== undefined ? <QuizRing score={bestScore} /> : undefined}
                badge={bestScore === undefined ? quiz.questions.length : undefined}
              />
            )
          })}
        </div>

        {/* ── PRÁCTICA ──────────────────────── */}
        <div className="bg-sidebar-border mx-3 mt-3 h-px" />
        <SectionLabel>
          <span>Práctica</span>
          <span className="text-sidebar-foreground/20 ml-2 font-mono font-normal">
            {completedExercises.size}/{allExercises.length}
          </span>
        </SectionLabel>

        <div className="px-2">
          {(["básico", "intermedio", "avanzado"] as const).map((level) => {
            const exs = allExercises.filter((e) => e.difficulty === level)
            if (!exs.length) return null
            return (
              <div key={level} className="mb-1">
                <div className="flex items-center gap-2 px-3 pt-2 pb-1">
                  <span
                    className={`h-[5px] w-[5px] shrink-0 rounded-full ${difficultyDot[level]}`}
                  />
                  <span className="text-sidebar-foreground/30 text-[10px] tracking-[0.1em] uppercase">
                    {level}
                  </span>
                </div>
                {exs.map((ex) => {
                  const active = isExerciseRoute && activeExId === ex.id
                  const completed = completedExercises.has(ex.id)
                  return (
                    <NavItem
                      key={ex.id}
                      label={ex.label}
                      active={active}
                      onClick={() => router.push(`/learn/${ex.id}`)}
                      indicator={
                        completed ? (
                          <Check
                            className="h-[9px] w-[9px] shrink-0 text-emerald-400/70"
                            strokeWidth={3}
                          />
                        ) : null
                      }
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      </SidebarContent>
    </ShadcnSidebar>
  )
}
