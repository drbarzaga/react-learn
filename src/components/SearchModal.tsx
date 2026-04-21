import { useEffect, useRef, useState, useMemo } from "react"
import { Search, BookOpen, Dumbbell, Brain } from "lucide-react"
import type { ComponentType } from "react"
import { cn } from "@/lib/utils"
import { navigate } from "@/hooks/useHashRoute"
import { useTheme } from "@/hooks/useTheme"
import { allConcepts } from "@/content/concepts"
import { allExercises } from "@/content/exercises"
import { allQuizzes } from "@/content/quiz"

type ResultKind = "concept" | "exercise" | "quiz"

interface SearchResult {
  id: string
  kind: ResultKind
  label: string
  subtitle: string
  href: string
}

const INDEX: SearchResult[] = [
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
]

const KIND_META: Record<
  ResultKind,
  { groupLabel: string; tag: string; Icon: ComponentType<{ className?: string; strokeWidth?: number }> }
> = {
  concept:  { groupLabel: "Conceptos", tag: "Concepto", Icon: BookOpen },
  exercise: { groupLabel: "Práctica",  tag: "Práctica", Icon: Dumbbell },
  quiz:     { groupLabel: "Quiz",      tag: "Quiz",     Icon: Brain    },
}

function groupResults(results: SearchResult[]) {
  const map: Partial<Record<ResultKind, SearchResult[]>> = {}
  for (const r of results) {
    if (!map[r.kind]) map[r.kind] = []
    map[r.kind]!.push(r)
  }
  return (["concept", "exercise", "quiz"] as ResultKind[])
    .filter((k) => map[k])
    .map((k) => ({ kind: k, items: map[k]! }))
}

const PALETTE = {
  dark: {
    overlay:       "rgba(0,0,0,0.75)",
    modalBg:       "#26262a",
    modalBorder:   "rgba(255,255,255,0.14)",
    modalShadow:   "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,0,0,0.5)",
    divider:       "rgba(255,255,255,0.08)",
    inputText:     "#f0f0f0",
    inputCaret:    "#f0f0f0",
    placeholder:   "#444",
    searchIcon:    "#606068",
    groupLabel:    "#484850",
    itemActiveBg:  "rgba(255,255,255,0.08)",
    iconActiveBg:  "rgba(255,255,255,0.1)",
    iconBg:        "rgba(255,255,255,0.05)",
    iconBorder:    "rgba(255,255,255,0.08)",
    iconActiveColor: "#c0c0c8",
    iconColor:     "#58585e",
    labelActive:   "#f0f0f0",
    label:         "#c0c0c8",
    sublabel:      "#555",
    tagActiveBg:   "rgba(255,255,255,0.1)",
    tagBg:         "rgba(255,255,255,0.04)",
    tagBorder:     "rgba(255,255,255,0.08)",
    tagActiveColor:"#888",
    tagColor:      "#484850",
    kbdBg:         "rgba(255,255,255,0.06)",
    kbdBorder:     "rgba(255,255,255,0.1)",
    kbdColor:      "#666",
    footerText:    "#484850",
    escColor:      "#555",
  },
  light: {
    overlay:       "rgba(0,0,0,0.4)",
    modalBg:       "#ffffff",
    modalBorder:   "rgba(0,0,0,0.12)",
    modalShadow:   "0 32px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.06)",
    divider:       "rgba(0,0,0,0.07)",
    inputText:     "#1a1915",
    inputCaret:    "#1a1915",
    placeholder:   "#bbb",
    searchIcon:    "#aaa",
    groupLabel:    "#bbb",
    itemActiveBg:  "rgba(0,0,0,0.05)",
    iconActiveBg:  "rgba(0,0,0,0.07)",
    iconBg:        "rgba(0,0,0,0.04)",
    iconBorder:    "rgba(0,0,0,0.07)",
    iconActiveColor: "#555",
    iconColor:     "#aaa",
    labelActive:   "#1a1915",
    label:         "#444",
    sublabel:      "#aaa",
    tagActiveBg:   "rgba(0,0,0,0.07)",
    tagBg:         "rgba(0,0,0,0.04)",
    tagBorder:     "rgba(0,0,0,0.07)",
    tagActiveColor:"#666",
    tagColor:      "#bbb",
    kbdBg:         "rgba(0,0,0,0.04)",
    kbdBorder:     "rgba(0,0,0,0.1)",
    kbdColor:      "#999",
    footerText:    "#bbb",
    escColor:      "#aaa",
  },
}

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery]        = useState("")
  const [activeIndex, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const { theme } = useTheme()
  const p = PALETTE[theme]

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return INDEX.slice(0, 9)
    return INDEX.filter(
      (r) =>
        r.label.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q),
    ).slice(0, 24)
  }, [query])

  const groups = useMemo(() => groupResults(results), [results])
  const flat   = useMemo(() => groups.flatMap((g) => g.items), [groups])

  useEffect(() => { setActive(0) }, [results])

  useEffect(() => {
    if (open) {
      setQuery("")
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return }
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(i + 1, flat.length - 1)) }
      if (e.key === "ArrowUp")   { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)) }
      if (e.key === "Enter" && flat[activeIndex]) { navigate(flat[activeIndex].href); onClose() }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, flat, activeIndex, onClose])

  if (!open) return null

  let flatIdx = 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
      style={{ background: p.overlay, backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[560px] overflow-hidden rounded-2xl"
        style={{ background: p.modalBg, border: `1px solid ${p.modalBorder}`, boxShadow: p.modalShadow }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Input ─────────────────────────────────── */}
        <div className="flex items-center gap-3 px-4" style={{ borderBottom: `1px solid ${p.divider}` }}>
          <Search className="h-4 w-4 shrink-0" style={{ color: p.searchIcon }} strokeWidth={1.8} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar conceptos, ejercicios, quizzes…"
            style={{ outline: "none", color: p.inputText, caretColor: p.inputCaret }}
            className="flex-1 bg-transparent py-[15px] text-[15px]"
          />
          {query ? (
            <button
              tabIndex={-1}
              onClick={() => { setQuery(""); inputRef.current?.focus() }}
              style={{ color: p.sublabel }}
              className="shrink-0 text-[12px] transition-colors"
            >
              ✕
            </button>
          ) : (
            <kbd
              className="shrink-0 rounded px-1.5 py-0.5 font-mono text-[11px]"
              style={{ background: p.kbdBg, border: `1px solid ${p.kbdBorder}`, color: p.escColor }}
            >
              Esc
            </kbd>
          )}
        </div>

        {/* ── Results ───────────────────────────────── */}
        <div className="max-h-[420px] overflow-y-auto">
          {flat.length > 0 ? (
            <div className="pb-2 pt-1">
              {groups.map((group) => {
                const { groupLabel, tag, Icon } = KIND_META[group.kind]
                return (
                  <div key={group.kind}>
                    <p
                      className="px-4 pb-1.5 pt-3 text-[10px] font-semibold uppercase tracking-[0.16em]"
                      style={{ color: p.groupLabel }}
                    >
                      {groupLabel}
                    </p>

                    {group.items.map((r) => {
                      const idx = flatIdx++
                      const isActive = idx === activeIndex
                      return (
                        <button
                          key={r.href}
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => { navigate(r.href); onClose() }}
                          className="flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-left"
                          style={{ background: isActive ? p.itemActiveBg : "transparent", transition: "background 80ms" }}
                        >
                          <span
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                            style={{
                              background: isActive ? p.iconActiveBg : p.iconBg,
                              border: `1px solid ${p.iconBorder}`,
                              color: isActive ? p.iconActiveColor : p.iconColor,
                            }}
                          >
                            <Icon className="h-[13px] w-[13px]" strokeWidth={1.8} />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span
                              className="block truncate font-mono text-[13px]"
                              style={{ color: isActive ? p.labelActive : p.label }}
                            >
                              {r.label}
                            </span>
                            <span className="block truncate text-[12px] leading-[1.4]" style={{ color: p.sublabel }}>
                              {r.subtitle}
                            </span>
                          </span>

                          <span
                            className={cn("shrink-0 rounded-md px-2 py-0.5 text-[10px] font-medium")}
                            style={{
                              background: isActive ? p.tagActiveBg : p.tagBg,
                              border: `1px solid ${p.tagBorder}`,
                              color: isActive ? p.tagActiveColor : p.tagColor,
                            }}
                          >
                            {tag}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-14 text-center">
              <p className="text-[13px]" style={{ color: p.sublabel }}>
                Sin resultados para{" "}
                <span style={{ color: p.label }}>&ldquo;{query}&rdquo;</span>
              </p>
            </div>
          )}
        </div>

        {/* ── Footer ────────────────────────────────── */}
        <div className="flex items-center gap-5 px-4 py-2.5" style={{ borderTop: `1px solid ${p.divider}` }}>
          {([ ["↑↓", "navegar"], ["↵", "abrir"], ["Esc", "cerrar"] ] as const).map(([key, label]) => (
            <span key={label} className="flex items-center gap-1.5 text-[11px]" style={{ color: p.footerText }}>
              <kbd
                className="rounded px-1.5 py-0.5 font-mono text-[10px]"
                style={{ background: p.kbdBg, border: `1px solid ${p.kbdBorder}`, color: p.kbdColor }}
              >
                {key}
              </kbd>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
