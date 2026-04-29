"use client"

import { useEffect, useMemo, useState } from "react"
import { BookOpen, Brain, Dumbbell } from "lucide-react"
import { useTranslations } from "next-intl"
import type { ComponentType } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { useContent } from "@/providers/content-provider"
import { useLocaleRouter } from "@/hooks/useLocaleRouter"

type ResultKind = "concept" | "exercise" | "quiz"

interface SearchResult {
  id: string
  kind: ResultKind
  label: string
  subtitle: string
  href: string
}

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const t = useTranslations("SearchModal")
  const { push } = useLocaleRouter()
  const { allConcepts, allExercises, allQuizzes } = useContent()
  const [query, setQuery] = useState("")

  const KIND_META: Record<
    ResultKind,
    {
      groupLabel: string
      tag: string
      Icon: ComponentType<{ className?: string; strokeWidth?: number }>
    }
  > = {
    concept: { groupLabel: t("conceptsGroup"), tag: t("conceptTag"), Icon: BookOpen },
    exercise: { groupLabel: t("practiceGroup"), tag: t("practiceTag"), Icon: Dumbbell },
    quiz: { groupLabel: t("quizGroup"), tag: t("quizTag"), Icon: Brain },
  }

  const INDEX: SearchResult[] = useMemo(
    () => [
      ...allConcepts.map((c) => ({
        id: c.id,
        kind: "concept" as const,
        label: c.label,
        subtitle: c.title,
        href: c.id,
      })),
      ...allExercises.map((e) => ({
        id: e.id,
        kind: "exercise" as const,
        label: e.label,
        subtitle: e.lede,
        href: `learn/${e.id}`,
      })),
      ...allQuizzes.map((q) => ({
        id: q.id,
        kind: "quiz" as const,
        label: q.label,
        subtitle: q.description,
        href: `quiz/${q.id}`,
      })),
    ],
    [allConcepts, allExercises, allQuizzes]
  )

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!open) setQuery("")
  }, [open])

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) {
      const byKind = (k: ResultKind) => INDEX.filter((r) => r.kind === k).slice(0, 3)
      return [...byKind("concept"), ...byKind("exercise"), ...byKind("quiz")]
    }
    return INDEX.filter(
      (r) => r.label.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q)
    ).slice(0, 24)
  }, [query, INDEX])

  const grouped = useMemo(() => {
    const map: Partial<Record<ResultKind, SearchResult[]>> = {}
    for (const r of results) {
      if (!map[r.kind]) map[r.kind] = []
      map[r.kind]!.push(r)
    }
    return (["concept", "exercise", "quiz"] as ResultKind[])
      .filter((k) => map[k])
      .map((k) => ({ kind: k, items: map[k]! }))
  }, [results])

  function handleSelect(href: string) {
    push(`/${href}`)
    onClose()
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title={t("title")}
      description={t("description")}
    >
      <CommandInput placeholder={t("placeholder")} value={query} onValueChange={setQuery} />

      <CommandList className="max-h-[400px] py-1.5">
        <CommandEmpty>{t("empty", { query })}</CommandEmpty>

        {grouped.map(({ kind, items }) => {
          const { groupLabel, tag, Icon } = KIND_META[kind]
          return (
            <CommandGroup key={kind} heading={groupLabel}>
              {items.map((r) => (
                <CommandItem
                  key={r.href}
                  value={`${r.label} ${r.subtitle} ${tag}`}
                  onSelect={() => handleSelect(r.href)}
                >
                  <span className="text-muted-foreground/60 flex h-6 w-6 shrink-0 items-center justify-center">
                    <Icon className="h-[13px] w-[13px]" strokeWidth={1.6} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-mono text-[13px]">{r.label}</span>
                    <span className="text-muted-foreground/60 block truncate text-[11px] leading-[1.4]">
                      {r.subtitle}
                    </span>
                  </span>
                  <CommandShortcut>{tag}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          )
        })}
      </CommandList>

      <div className="border-border/40 flex items-center gap-4 border-t px-4 py-2">
        {(
          [
            ["↑↓", t("navigate")],
            ["↵", t("open")],
            ["Esc", t("close")],
          ] as const
        ).map(([key, label]) => (
          <span
            key={label}
            className="text-muted-foreground/40 flex items-center gap-1.5 text-[11px]"
          >
            <kbd className="border-border/60 bg-muted/30 text-muted-foreground/50 inline-flex items-center rounded-md border px-1.5 py-px font-mono text-[10px] leading-4">
              {key}
            </kbd>
            {label}
          </span>
        ))}
      </div>
    </CommandDialog>
  )
}
