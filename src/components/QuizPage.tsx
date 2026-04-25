"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"
import { cn } from "@/lib/utils"
import type { Quiz } from "@/content/quiz"
import { allQuizzes } from "@/content/quiz"
import { useProgress } from "@/hooks/useProgress"

interface QuizPageProps {
  quiz: Quiz
}

type AnswerState = "unanswered" | "correct" | "wrong"

interface QuizSession {
  currentIndex: number
  selected: number | null
  score: number
  finished: boolean
}

function sessionKey(id: string) {
  return `react-dojo-quiz-session-${id}`
}

function loadSession(id: string): QuizSession {
  try {
    const raw = localStorage.getItem(sessionKey(id))
    if (raw) return JSON.parse(raw)
  } catch {}
  return { currentIndex: 0, selected: null, score: 0, finished: false }
}

function saveSession(id: string, session: QuizSession) {
  localStorage.setItem(sessionKey(id), JSON.stringify(session))
}

function clearSession(id: string) {
  localStorage.removeItem(sessionKey(id))
}

const DEFAULT_SESSION: QuizSession = { currentIndex: 0, selected: null, score: 0, finished: false }

export function QuizPage({ quiz }: QuizPageProps) {
  const router = useRouter()
  const [browsing, setBrowsing] = useState(true)
  const [session, setSession] = useState<QuizSession>(DEFAULT_SESSION)
  const wasFinishedOnMount = useRef(false)

  useEffect(() => {
    const saved = loadSession(quiz.id)
    wasFinishedOnMount.current = saved.finished
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(saved)
  }, [quiz.id])

  const { saveQuizScore } = useProgress()
  const { currentIndex, selected, score, finished } = session
  const hasProgress = currentIndex > 0 || selected !== null || finished
  const question = quiz.questions[currentIndex]
  const total = quiz.questions.length
  const answered = selected !== null

  useEffect(() => {
    saveSession(quiz.id, session)
  }, [quiz.id, session])

  function handleSelect(index: number) {
    if (answered) return
    setSession((prev) => ({
      ...prev,
      selected: index,
      score: index === question.correctIndex ? prev.score + 1 : prev.score,
    }))
  }

  function handleNext() {
    if (currentIndex < total - 1) {
      setSession((prev) => ({ ...prev, currentIndex: prev.currentIndex + 1, selected: null }))
    } else {
      setSession((prev) => ({ ...prev, finished: true }))
    }
  }

  function handleRestart() {
    clearSession(quiz.id)
    setSession(DEFAULT_SESSION)
    setBrowsing(true)
  }

  function startQuiz() {
    setSession((prev) => ({ ...prev, currentIndex: 0, selected: null }))
    setBrowsing(false)
  }

  useEffect(() => {
    if (!finished || wasFinishedOnMount.current) return
    const pct = Math.round((score / total) * 100)
    saveQuizScore(quiz.id, pct)
    if (pct >= 80) {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } })
    }
  }, [finished, quiz.id, score, total, saveQuizScore])

  /* ── Browse mode ── */
  if (browsing) {
    return (
      <article className="mx-auto max-w-[1000px] px-5 py-10 md:px-12 md:py-20">
        {/* Header */}
        <div className="mb-2 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-[11px] tracking-[0.14em] text-[var(--color-fg-dim)] uppercase">
              Quiz
            </p>
            <h1 className="font-mono text-[28px] leading-none font-medium text-[var(--color-fg)]">
              {quiz.label}
            </h1>
          </div>
          <span className="mt-1 shrink-0 font-mono text-[13px] text-[var(--color-fg-dim)] tabular-nums">
            {total} preguntas
          </span>
        </div>

        <p className="mt-4 mb-10 text-[15px] leading-[1.6] text-[var(--color-fg-muted)]">
          {quiz.description}
        </p>

        {/* Question list — read-only preview */}
        <div className="space-y-2">
          {quiz.questions.map((q, i) => (
            <div
              key={q.id}
              className="flex items-baseline gap-4 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg-raise)] px-5 py-4 text-[14px] leading-[1.55] text-[var(--color-fg-muted)]"
            >
              <span className="shrink-0 font-mono text-[11px] text-[var(--color-fg-faint)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{q.question}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[var(--color-line)] pt-8">
          <button
            onClick={startQuiz}
            className="rounded-md bg-[var(--color-fg)] px-5 py-2.5 text-[14px] font-medium text-[var(--color-bg)] transition-opacity hover:opacity-80"
          >
            Comenzar →
          </button>
          {hasProgress && !finished && (
            <button
              onClick={() => setBrowsing(false)}
              className="rounded-md border border-[var(--color-line)] px-4 py-2.5 text-[14px] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
            >
              Continuar donde lo dejé
            </button>
          )}
          {finished && (
            <button
              onClick={handleRestart}
              className="rounded-md border border-[var(--color-line)] px-4 py-2.5 text-[14px] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
            >
              Reiniciar
            </button>
          )}
        </div>
      </article>
    )
  }

  /* ── Finished screen ── */
  if (finished) {
    const pct = Math.round((score / total) * 100)
    return (
      <article className="mx-auto max-w-[1000px] px-5 py-10 md:px-12 md:py-20">
        <div className="mb-4 text-[11px] tracking-[0.14em] text-[var(--color-fg-dim)] uppercase">
          Quiz · {quiz.label}
        </div>
        <h1 className="font-mono text-[32px] leading-none font-medium text-[var(--color-fg)]">
          Resultado
        </h1>

        <div className="mt-12 rounded-xl border border-[var(--color-line)] p-8 text-center">
          <div className="font-mono text-[64px] leading-none font-medium text-[var(--color-fg)]">
            {score}/{total}
          </div>
          <div className="mt-3 text-[15px] text-[var(--color-fg-muted)]">
            {pct >= 80
              ? "Excelente — estás listo para la entrevista."
              : pct >= 50
                ? "Bien, pero repasa los temas que fallaste."
                : "Sigue practicando — vuelve a los conceptos."}
          </div>

          <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-[var(--color-line)]">
            <div
              className="h-full rounded-full bg-[var(--color-fg)] transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-2 text-right font-mono text-[12px] text-[var(--color-fg-dim)]">
            {pct}%
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => setBrowsing(true)}
            className="rounded-md border border-[var(--color-line)] px-4 py-2 text-[14px] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
          >
            Ver preguntas
          </button>
          <button
            onClick={handleRestart}
            className="rounded-md border border-[var(--color-line)] px-4 py-2 text-[14px] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
          >
            Reintentar
          </button>
          <div className="flex flex-wrap gap-2">
            {allQuizzes
              .filter((q) => q.id !== quiz.id)
              .map((q) => (
                <button
                  key={q.id}
                  onClick={() => router.push(`/quiz/${q.id}`)}
                  className="rounded-md border border-[var(--color-line)] px-4 py-2 text-[14px] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                >
                  {q.label}
                </button>
              ))}
          </div>
        </div>
      </article>
    )
  }

  /* ── Active quiz ── */
  return (
    <article className="mx-auto max-w-[1000px] px-5 py-10 md:px-12 md:py-20">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[11px] tracking-[0.14em] text-[var(--color-fg-dim)] uppercase">
          Quiz · {quiz.label}
        </span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setBrowsing(true)}
            className="text-[11px] text-[var(--color-fg-faint)] transition-colors hover:text-[var(--color-fg-muted)]"
          >
            Ver preguntas
          </button>
          <span className="font-mono text-[12px] text-[var(--color-fg-dim)]">
            {currentIndex + 1} / {total}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-10 h-[2px] w-full overflow-hidden rounded-full bg-[var(--color-line)]">
        <div
          className="h-full rounded-full bg-[var(--color-fg)] transition-all duration-300"
          style={{ width: `${((currentIndex + (answered ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <h2 className="text-[22px] leading-[1.4] font-medium text-[var(--color-fg)]">
        {question.question}
      </h2>

      <ul className="mt-8 space-y-3">
        {question.options.map((option, i) => {
          let state: AnswerState = "unanswered"
          if (answered) {
            if (i === question.correctIndex) state = "correct"
            else if (i === selected) state = "wrong"
          }

          return (
            <li key={i}>
              <button
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={cn(
                  "w-full rounded-lg border px-5 py-4 text-left text-[14px] leading-[1.5] transition-colors",
                  answered ? "cursor-default" : "cursor-pointer",
                  !answered &&
                    "border-[var(--color-line)] text-[var(--color-fg-muted)] hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
                  state === "correct" &&
                    "border-green-500/40 bg-green-500/5 text-[var(--color-fg)]",
                  state === "wrong" &&
                    "border-red-500/40 bg-red-500/5 text-[var(--color-fg-muted)]",
                  state === "unanswered" &&
                    answered &&
                    "border-[var(--color-line)] text-[var(--color-fg-faint)]"
                )}
              >
                <span className="mr-3 font-mono text-[12px] text-[var(--color-fg-dim)]">
                  {String.fromCharCode(65 + i)}.
                </span>
                {option}
              </button>
            </li>
          )
        })}
      </ul>

      {answered && (
        <div className="mt-6 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg-raise)] px-5 py-4">
          <div className="mb-1 text-[11px] tracking-[0.12em] text-[var(--color-fg-dim)] uppercase">
            {selected === question.correctIndex ? "Correcto" : "Incorrecto"}
          </div>
          <p className="text-[14px] leading-[1.65] text-[var(--color-fg-muted)]">
            {question.explanation}
          </p>
        </div>
      )}

      {answered && (
        <button
          onClick={handleNext}
          className="mt-6 rounded-md bg-[var(--color-fg)] px-5 py-2.5 text-[14px] font-medium text-[var(--color-bg)] transition-opacity hover:opacity-80"
        >
          {currentIndex < total - 1 ? "Siguiente →" : "Ver resultado"}
        </button>
      )}
    </article>
  )
}
