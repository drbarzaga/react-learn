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
    const shareUrl = `https://react-dojo.vercel.app/quiz/${quiz.id}`
    const shareText = `Acabo de completar el quiz "${quiz.label}" en React Dojo con ${score}/${total} (${pct}%) 🎯\nPractica React gratis:`
    const links = {
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(`Quiz: ${quiz.label}`)}&summary=${encodeURIComponent(`${shareText} ${shareUrl}`)}&source=ReactDojo`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    }

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

          <div className="mt-8 border-t border-[var(--color-line)] pt-6">
            <p className="mb-3 text-[12px] text-[var(--color-fg-dim)]">Compartir resultado</p>
            <div className="flex items-center justify-center gap-2">
              <a
                href={links.x}
                target="_blank"
                rel="noreferrer"
                title="Compartir en X"
                className="flex items-center gap-2 rounded-md border border-[var(--color-line)] px-3 py-1.5 text-[12px] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              >
                <XIcon />
                <span>X</span>
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                title="Compartir en LinkedIn"
                className="flex items-center gap-2 rounded-md border border-[var(--color-line)] px-3 py-1.5 text-[12px] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              >
                <LinkedInIcon />
                <span>LinkedIn</span>
              </a>
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noreferrer"
                title="Compartir en WhatsApp"
                className="flex items-center gap-2 rounded-md border border-[var(--color-line)] px-3 py-1.5 text-[12px] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              >
                <WhatsAppIcon />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
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

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}
