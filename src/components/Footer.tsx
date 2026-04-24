"use client"

import React from "react"
import { Heart, Bug } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { allConcepts } from "@/content/concepts"
import { allExercises } from "@/content/exercises"
import { allQuizzes } from "@/content/quiz"

function ReactIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-11.5 -10.23174 23 20.46348"
      className={className}
      aria-hidden
    >
      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

const links = [
  { label: "react.dev", href: "https://react.dev", Icon: ReactIcon },
  {
    label: "Reportar error",
    href: "https://github.com/drbarzaga/react-dojo/issues/new",
    Icon: Bug,
  },
]

export function Footer() {
  return (
    <footer className="shrink-0 border-t border-[var(--color-line)] px-4 py-3 md:px-6">
      {/* Mobile: stack verticalmente */}
      <div className="flex flex-col gap-2 text-[11px] text-[var(--color-fg-faint)] sm:hidden">
        <span className="flex items-center justify-center gap-1 select-none">
          Hecho con <Heart className="h-[11px] w-[11px] fill-red-500 text-red-500" /> por{" "}
          <a
            href="https://github.com/drbarzaga"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--color-fg-dim)] underline decoration-[var(--color-fg-faint)] underline-offset-2"
          >
            @drbarzaga
          </a>
        </span>
        <div className="flex items-center justify-center gap-4">
          {links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-[var(--color-fg-muted)]"
            >
              <Icon className="h-[12px] w-[12px]" strokeWidth={1.6} />
              {label}
            </a>
          ))}
          <a
            href="https://github.com/drbarzaga/react-dojo"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-[var(--color-line-strong)] px-3 py-1 text-[10px] font-semibold tracking-[0.1em] text-[var(--color-fg-muted)] uppercase"
          >
            <GitHubIcon className="h-[12px] w-[12px]" />
            ¡Contribuye!
          </a>
        </div>
      </div>

      {/* Desktop: grid de 3 columnas iguales */}
      <div className="hidden items-center text-[11px] text-[var(--color-fg-faint)] sm:grid sm:grid-cols-3">
        {/* Izquierda: stats */}
        <div className="flex items-center gap-3">
          <span className="tabular">{allConcepts.length} conceptos</span>
          <Separator orientation="vertical" className="h-3 bg-[var(--color-fg-faint)]" />
          <span className="tabular">{allExercises.length} ejercicios</span>
          <Separator orientation="vertical" className="h-3 bg-[var(--color-fg-faint)]" />
          <span className="tabular">{allQuizzes.length} quizzes</span>
        </div>

        {/* Centro: atribución */}
        <span className="flex items-center justify-center gap-1 select-none">
          Hecho con <Heart className="h-[11px] w-[11px] fill-red-500 text-red-500" /> por{" "}
          <a
            href="https://github.com/drbarzaga"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--color-fg-dim)] underline decoration-[var(--color-fg-faint)] underline-offset-2 transition-colors hover:text-[var(--color-fg-muted)]"
          >
            @drbarzaga
          </a>
        </span>

        {/* Derecha: links */}
        <div className="flex items-center justify-end gap-2">
          {links.map(
            ({
              label,
              href,
              Icon,
            }: {
              label: string
              href: string
              Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
            }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-[var(--color-line-strong)] px-3 py-1 text-[10px] font-semibold tracking-[0.1em] text-[var(--color-fg-muted)] uppercase transition-colors hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              >
                <Icon className="h-[12px] w-[12px]" strokeWidth={1.6} />
                {label}
              </a>
            )
          )}
          <a
            href="https://github.com/drbarzaga/react-dojo"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-[var(--color-line-strong)] px-3 py-1 text-[10px] font-semibold tracking-[0.1em] text-[var(--color-fg-muted)] uppercase transition-colors hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
          >
            <GitHubIcon className="h-[12px] w-[12px]" />
            ¡Contribuye!
          </a>
        </div>
      </div>
    </footer>
  )
}
