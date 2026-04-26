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
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { Sidebar as ShadcnSidebar, SidebarContent } from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useContent } from "@/components/ContentProvider"
import { type Difficulty } from "@/content/exercises"
import { type QuizDifficulty } from "@/content/quiz"
import { useProgress } from "@/hooks/useProgress"
import { useLocaleRouter } from "@/hooks/useLocaleRouter"

type IconC = ComponentType<{ className?: string; strokeWidth?: number }>

function SectionRing({ value, total }: { value: number; total: number }) {
  const pct = total === 0 ? 0 : value / total
  const r = 5
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct)
  const color = pct >= 0.8 ? "#34d399" : pct >= 0.5 ? "#fbbf24" : "#f87171"
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" className="shrink-0 -rotate-90">
      <circle
        cx="8"
        cy="8"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="text-sidebar-foreground/15"
      />
      {pct > 0 && (
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
      )}
    </svg>
  )
}

const categoryIcon: Record<string, IconC> = {
  state: Boxes,
  sync: RefreshCw,
  performance: Gauge,
  concurrency: Hourglass,
  composition: Component,
  interviews: MessageCircleQuestion,
}

const difficultyDot: Record<Difficulty, string> = {
  basic: "bg-emerald-400/80",
  intermediate: "bg-amber-400/80",
  advanced: "bg-rose-400/80",
}

function SectionLabel({ children, ring }: { children: React.ReactNode; ring?: React.ReactNode }) {
  return (
    <div className="flex items-center px-4 pt-4 pb-1 first:pt-2">
      <span className="text-sidebar-foreground/30 flex-1 text-[10px] font-semibold tracking-[0.18em] uppercase">
        {children}
      </span>
      {ring}
    </div>
  )
}

function NavItem({
  label,
  active,
  badge,
  indicator,
  onClick,
}: {
  label: string
  active: boolean
  badge?: React.ReactNode
  indicator?: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex w-full min-w-0 items-center gap-2 rounded-md px-3 py-[5px] text-left font-mono text-[13px] transition-colors",
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
  const t = useTranslations("Sidebar")
  const pathname = usePathname()
  const { locale, push } = useLocaleRouter()
  const { allConcepts, categories, conceptIndex, allExercises, allQuizzes } = useContent()
  const { visitedConcepts, completedExercises, quizScores } = useProgress()

  const difficultyLabel: Record<Difficulty, string> = {
    basic: t("basic"),
    intermediate: t("intermediate"),
    advanced: t("advanced"),
  }

  // Strip locale prefix so active-state comparisons work under /en/... and /es/...
  const rawPath = pathname.slice(1)
  const current =
    rawPath === locale
      ? ""
      : rawPath.startsWith(`${locale}/`)
        ? rawPath.slice(locale.length + 1)
        : rawPath

  const isExerciseRoute = current.startsWith("learn/")
  const isQuizRoute = current.startsWith("quiz/")
  const activeExId = isExerciseRoute ? current.slice(6) : null

  const totalConcepts = allConcepts.length
  const visitedCount = visitedConcepts.size
  const totalQuizzes = allQuizzes.length
  const attemptedQuizzes = Object.keys(quizScores).length
  const totalExercises = allExercises.length
  const completedCount = completedExercises.size

  const activeCatId = categories.find((c) => c.conceptIds.includes(current))?.id ?? null
  const activeDifficulty = activeExId
    ? (allExercises.find((e) => e.id === activeExId)?.difficulty ?? null)
    : null
  const activeQuizDifficulty = isQuizRoute
    ? (allQuizzes.find((q) => `quiz/${q.id}` === current)?.difficulty ?? null)
    : null

  const [openCats, setOpenCats] = useState<Set<string>>(
    () => new Set(activeCatId ? [activeCatId] : [])
  )
  const [openLevels, setOpenLevels] = useState<Set<string>>(
    () => new Set(activeDifficulty ? [activeDifficulty] : [])
  )
  const [openQuizLevels, setOpenQuizLevels] = useState<Set<string>>(
    () => new Set(activeQuizDifficulty ? [activeQuizDifficulty] : [])
  )

  useEffect(() => {
    if (activeCatId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpenCats((prev) => (prev.has(activeCatId) ? prev : new Set([...prev, activeCatId])))
    }
  }, [activeCatId])

  useEffect(() => {
    if (activeDifficulty) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpenLevels((prev) =>
        prev.has(activeDifficulty) ? prev : new Set([...prev, activeDifficulty])
      )
    }
  }, [activeDifficulty])

  useEffect(() => {
    if (activeQuizDifficulty) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpenQuizLevels((prev) =>
        prev.has(activeQuizDifficulty) ? prev : new Set([...prev, activeQuizDifficulty])
      )
    }
  }, [activeQuizDifficulty])

  const toggle = (id: string) =>
    setOpenCats((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const toggleLevel = (level: string) =>
    setOpenLevels((prev) => {
      const next = new Set(prev)
      if (next.has(level)) next.delete(level)
      else next.add(level)
      return next
    })

  const toggleQuizLevel = (level: string) =>
    setOpenQuizLevels((prev) => {
      const next = new Set(prev)
      if (next.has(level)) next.delete(level)
      else next.add(level)
      return next
    })

  return (
    <ShadcnSidebar
      collapsible="offcanvas"
      className="border-sidebar-border top-12! h-[calc(100svh-3rem)]! border-r"
    >
      <TooltipProvider delay={300}>
        <SidebarContent className="gap-0 py-1">
          {/* ── CONCEPTS ─────────────────────── */}
          <SectionLabel
            ring={
              <Tooltip>
                <TooltipTrigger className="flex cursor-default items-center rounded-sm focus-visible:outline-none">
                  <SectionRing value={visitedCount} total={totalConcepts} />
                </TooltipTrigger>
                <TooltipContent side="right">
                  {t("conceptsVisited", { visited: visitedCount, total: totalConcepts })}
                </TooltipContent>
              </Tooltip>
            }
          >
            {t("concepts")}
          </SectionLabel>

          <div className="px-2">
            {categories.map((cat) => {
              const Icon = categoryIcon[cat.id]
              const isOpen = openCats.has(cat.id)
              const visited = cat.conceptIds.filter((id) => visitedConcepts.has(id)).length
              const total = cat.conceptIds.length

              return (
                <div key={cat.id}>
                  <button
                    onClick={() => toggle(cat.id)}
                    className="group/cat hover:bg-sidebar-accent/60 flex w-full items-center gap-2 rounded-md px-3 py-[6px] transition-colors"
                  >
                    {Icon && (
                      <Icon
                        className="text-sidebar-foreground/35 group-hover/cat:text-sidebar-foreground/55 h-[11px] w-[11px] shrink-0"
                        strokeWidth={2}
                      />
                    )}
                    <span className="text-sidebar-foreground/45 group-hover/cat:text-sidebar-foreground/65 flex-1 truncate text-left font-mono text-[11px] font-semibold tracking-[0.1em] uppercase">
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
                              onClick={() => push(`/${id}`)}
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

          {/* ── PRACTICE ──────────────────────── */}
          <div className="bg-sidebar-border mx-3 mt-3 h-px" />
          <SectionLabel
            ring={
              <Tooltip>
                <TooltipTrigger className="flex cursor-default items-center rounded-sm focus-visible:outline-none">
                  <SectionRing value={completedCount} total={totalExercises} />
                </TooltipTrigger>
                <TooltipContent side="right">
                  {t("exercisesCompleted", { completed: completedCount, total: totalExercises })}
                </TooltipContent>
              </Tooltip>
            }
          >
            {t("practice")}
          </SectionLabel>

          <div className="px-2">
            {(["basic", "intermediate", "advanced"] as const).map((level) => {
              const exs = allExercises.filter((e) => e.difficulty === level)
              if (!exs.length) return null
              return (
                <div key={level}>
                  <button
                    onClick={() => toggleLevel(level)}
                    className="group/level hover:bg-sidebar-accent/60 flex w-full items-center gap-2 rounded-md px-3 py-[6px] transition-colors"
                  >
                    <span
                      className={`h-[6px] w-[6px] shrink-0 rounded-full ${difficultyDot[level]}`}
                    />
                    <span className="text-sidebar-foreground/50 group-hover/level:text-sidebar-foreground/70 flex-1 text-left font-mono text-[11px] font-semibold tracking-[0.1em] uppercase">
                      {difficultyLabel[level]}
                    </span>
                    <ChevronDown
                      className="text-sidebar-foreground/20 h-[10px] w-[10px] shrink-0 transition-transform duration-200"
                      style={{
                        transform: openLevels.has(level) ? "rotate(0deg)" : "rotate(-90deg)",
                      }}
                    />
                  </button>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: openLevels.has(level) ? "1fr" : "0fr",
                      transition: "grid-template-rows 180ms ease",
                    }}
                  >
                    <div style={{ overflow: "hidden", minHeight: 0 }}>
                      {exs.map((ex) => {
                        const active = isExerciseRoute && activeExId === ex.id
                        const completed = completedExercises.has(ex.id)
                        return (
                          <NavItem
                            key={ex.id}
                            label={ex.label}
                            active={active}
                            onClick={() => push(`/learn/${ex.id}`)}
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
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── QUIZ ──────────────────────────── */}
          <div className="bg-sidebar-border mx-3 mt-3 h-px" />
          <SectionLabel
            ring={
              <Tooltip>
                <TooltipTrigger className="flex cursor-default items-center rounded-sm focus-visible:outline-none">
                  <SectionRing value={attemptedQuizzes} total={totalQuizzes} />
                </TooltipTrigger>
                <TooltipContent side="right">
                  {t("quizzesCompleted", { attempted: attemptedQuizzes, total: totalQuizzes })}
                </TooltipContent>
              </Tooltip>
            }
          >
            {t("quiz")}
          </SectionLabel>

          <div className="px-2">
            {(["basic", "intermediate", "advanced"] as const).map((level) => {
              const quizzes = allQuizzes.filter((q) => q.difficulty === level)
              if (!quizzes.length) return null
              return (
                <div key={level}>
                  <button
                    onClick={() => toggleQuizLevel(level)}
                    className="group/qlevel hover:bg-sidebar-accent/60 flex w-full items-center gap-2 rounded-md px-3 py-[6px] transition-colors"
                  >
                    <span
                      className={`h-[6px] w-[6px] shrink-0 rounded-full ${difficultyDot[level as QuizDifficulty]}`}
                    />
                    <span className="text-sidebar-foreground/50 group-hover/qlevel:text-sidebar-foreground/70 flex-1 text-left font-mono text-[11px] font-semibold tracking-[0.1em] uppercase">
                      {difficultyLabel[level as QuizDifficulty]}
                    </span>
                    <ChevronDown
                      className="text-sidebar-foreground/20 h-[10px] w-[10px] shrink-0 transition-transform duration-200"
                      style={{
                        transform: openQuizLevels.has(level) ? "rotate(0deg)" : "rotate(-90deg)",
                      }}
                    />
                  </button>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: openQuizLevels.has(level) ? "1fr" : "0fr",
                      transition: "grid-template-rows 180ms ease",
                    }}
                  >
                    <div style={{ overflow: "hidden", minHeight: 0 }}>
                      {quizzes.map((quiz) => {
                        const active = current === `quiz/${quiz.id}`
                        return (
                          <NavItem
                            key={quiz.id}
                            label={quiz.label}
                            active={active}
                            onClick={() => push(`/quiz/${quiz.id}`)}
                            badge={quiz.questions.length}
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </SidebarContent>
      </TooltipProvider>
    </ShadcnSidebar>
  )
}
