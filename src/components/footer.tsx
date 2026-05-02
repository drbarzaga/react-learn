"use client"

import React from "react"
import { Heart, Bug } from "lucide-react"
import { useTranslations } from "next-intl"
import { Separator } from "@/components/ui/separator"
import { useContent } from "@/providers/content-provider"
import { useProgress } from "@/hooks/use-progress"
import { ReactIcon, GitHubIcon } from "./svg-icons"
import Link from "next/link"

export function Footer() {
  const t = useTranslations("Footer")
  const { allConcepts, allExercises, allQuizzes } = useContent()
  const { visitedConcepts, completedExercises, quizScores } = useProgress()

  const hasProgress = visitedConcepts.size > 0
  const quizzesAttempted = Object.keys(quizScores).length

  const links = [
    { label: "react.dev", href: "https://react.dev", Icon: ReactIcon },
    {
      label: t("reportBug"),
      href: "https://github.com/drbarzaga/react-dojo/issues/new",
      Icon: Bug,
    },
  ]

  return (
    <footer className="shrink-0 border-t border-[var(--color-line)] px-4 py-3 md:px-6">
      {/* Mobile */}
      <div className="flex flex-col gap-2 text-[11px] text-[var(--color-fg-faint)] sm:hidden">
        <span className="flex items-center justify-center gap-1 select-none">
          {t("madeWith")} <Heart className="h-[11px] w-[11px] fill-red-500 text-red-500" />{" "}
          {t("by")}{" "}
          <Link
            href="https://github.com/drbarzaga"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--color-fg-dim)] underline decoration-[var(--color-fg-faint)] underline-offset-2"
          >
            @drbarzaga
          </Link>
        </span>
        <div className="flex items-center justify-center gap-4">
          {links.map(({ label, href, Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-[var(--color-line-strong)] px-3 py-1 text-[10px] font-semibold tracking-[0.1em] text-[var(--color-fg-muted)] uppercase"
            >
              <Icon className="h-[12px] w-[12px]" strokeWidth={1.6} />
              {label}
            </Link>
          ))}
          <Link
            href="https://github.com/drbarzaga/react-dojo"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-[var(--color-line-strong)] px-3 py-1 text-[10px] font-semibold tracking-[0.1em] text-[var(--color-fg-muted)] uppercase"
          >
            <GitHubIcon className="h-[12px] w-[12px]" />
            {t("contribute")}
          </Link>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden items-center text-[11px] text-[var(--color-fg-faint)] sm:grid sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <span className="tabular">
            {hasProgress && `${visitedConcepts.size}/`}
            {t("concepts", { count: allConcepts.length })}
          </span>
          <Separator orientation="vertical" className="h-3 bg-[var(--color-fg-faint)]" />
          <span className="tabular">
            {hasProgress && `${completedExercises.size}/`}
            {t("exercises", { count: allExercises.length })}
          </span>
          <Separator orientation="vertical" className="h-3 bg-[var(--color-fg-faint)]" />
          <span className="tabular">
            {hasProgress && `${quizzesAttempted}/`}
            {t("quizzes", { count: allQuizzes.length })}
          </span>
        </div>

        <span className="flex items-center justify-center gap-1 select-none">
          {t("madeWith")} <Heart className="h-[11px] w-[11px] fill-red-500 text-red-500" />{" "}
          {t("by")}{" "}
          <Link
            href="https://github.com/drbarzaga"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--color-fg-dim)] underline decoration-[var(--color-fg-faint)] underline-offset-2 transition-colors hover:text-[var(--color-fg-muted)]"
          >
            @drbarzaga
          </Link>
        </span>

        <div className="flex items-center justify-end gap-2">
          {links.map(({ label, href, Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-[var(--color-line-strong)] px-3 py-1 text-[10px] font-semibold tracking-[0.1em] text-[var(--color-fg-muted)] uppercase transition-colors hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
            >
              <Icon className="h-[12px] w-[12px]" strokeWidth={1.6} />
              {label}
            </Link>
          ))}
          <Link
            href="https://github.com/drbarzaga/react-dojo"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-[var(--color-line-strong)] px-3 py-1 text-[10px] font-semibold tracking-[0.1em] text-[var(--color-fg-muted)] uppercase transition-colors hover:border-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
          >
            <GitHubIcon className="h-[12px] w-[12px]" />
            {t("contribute")}
          </Link>
        </div>
      </div>
    </footer>
  )
}
