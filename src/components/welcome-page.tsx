"use client"

import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Dumbbell, Shuffle } from "lucide-react"
import { useContent } from "@/providers/content-provider"
import { useLocaleRouter } from "@/hooks/use-locale-router"

export function WelcomePage() {
  const t = useTranslations("WelcomePage")
  const { push } = useLocaleRouter()
  const { allConcepts, allExercises, categories } = useContent()

  const goStart = () => push(`/${allConcepts[0].id}`)
  const goPractice = () => push(`/learn/${allExercises[0].id}`)
  const goSurprise = () => {
    const random = allConcepts[Math.floor(Math.random() * allConcepts.length)]
    push(`/${random.id}`)
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const tag = (e.target as HTMLElement)?.tagName
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        (e.target as HTMLElement)?.isContentEditable
      )
        return
      if (e.key === " ") {
        e.preventDefault()
        push(`/${allConcepts[0].id}`)
      }
      if (e.key === "p" || e.key === "P") push(`/learn/${allExercises[0].id}`)
      if (e.key === "s" || e.key === "S") {
        const random = allConcepts[Math.floor(Math.random() * allConcepts.length)]
        push(`/${random.id}`)
      }
      if (e.key === "ArrowRight") push(`/${allConcepts[0].id}`)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [allConcepts, allExercises, push])

  return (
    <div className="flex min-h-[calc(100vh-84px)] items-center justify-center px-8 py-20">
      <div className="flex max-w-[420px] flex-col items-center text-center">
        <Logo className="mb-6 h-24 w-auto" />

        <h1 className="font-mono text-[30px] leading-none font-medium text-[var(--color-fg)]">
          React Dojo
        </h1>

        <p className="mt-4 text-[16px] leading-[1.7] text-[var(--color-fg-muted)]">
          {t("tagline")}
        </p>

        <div className="mt-6 flex items-center gap-4 text-[12px] text-[var(--color-fg-dim)]">
          <span>{t("concepts", { count: allConcepts.length })}</span>
          <Separator orientation="vertical" className="h-3 bg-[var(--color-fg-faint)]" />
          <span>{t("exercises", { count: allExercises.length })}</span>
          <Separator orientation="vertical" className="h-3 bg-[var(--color-fg-faint)]" />
          <span>{t("categories", { count: categories.length })}</span>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={goStart}
              className="gap-2 border-0 bg-[var(--color-fg)] text-[var(--color-bg)] hover:opacity-80"
            >
              {t("start")}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Button>
            <Button
              variant="outline"
              onClick={goPractice}
              className="gap-2 border-[var(--color-line-strong)] bg-transparent text-[var(--color-fg-muted)] hover:border-[var(--color-fg)] hover:text-[var(--color-fg)]"
            >
              <Dumbbell className="h-3.5 w-3.5" strokeWidth={1.8} />
              {t("practice")}
            </Button>
            <Button
              variant="outline"
              onClick={goSurprise}
              className="btn-shimmer gap-2 border-[var(--color-line-strong)] bg-transparent text-[var(--color-fg-muted)] hover:border-[var(--color-fg)] hover:text-[var(--color-fg)]"
            >
              <Shuffle className="h-3.5 w-3.5" strokeWidth={1.8} />
              {t("surprise")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
