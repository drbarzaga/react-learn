"use client"

import { useRef, useState } from "react"
import { Search, Star } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"
import { useEditorTheme, EDITOR_THEMES_META, type EditorThemeId } from "@/hooks/useEditorTheme"
import { useGitHubStars } from "@/hooks/useGitHubStars"
import { Logo } from "@/components/Logo"
import { SidebarTrigger } from "@/components/ui/sidebar"
interface HeaderProps {
  onSearchOpen?: () => void
}

export function Header({ onSearchOpen }: HeaderProps) {
  const { theme, toggle } = useTheme()
  const { editorTheme, setEditorTheme } = useEditorTheme()
  const stars = useGitHubStars("drbarzaga/react-dojo")
  const [pickerOpen, setPickerOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  function handlePickerBlur(e: React.FocusEvent) {
    if (!pickerRef.current?.contains(e.relatedTarget as Node)) {
      setPickerOpen(false)
    }
  }

  function selectTheme(id: EditorThemeId) {
    setEditorTheme(id)
    setPickerOpen(false)
  }

  return (
    <header className="relative z-20 flex h-12 shrink-0 items-center justify-between border-b border-[var(--color-line)] bg-[var(--color-bg)] px-3 md:px-6">
      <div className="flex items-center gap-2">
        {/* Hamburger — solo mobile */}
        <SidebarTrigger className="md:hidden text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-bg-hover)]" />

        <a
          href="/"
          className="flex items-center gap-2 text-[14px] text-[var(--color-fg)] hover:text-[var(--color-fg-muted)] transition-colors"
        >
          <Logo className="h-[28px] w-auto" />
          <span className="font-mono hidden sm:inline">React Dojo</span>
        </a>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Búsqueda móvil — solo ícono */}
        <button
          type="button"
          onClick={onSearchOpen}
          aria-label="Buscar"
          className="sm:hidden grid h-7 w-7 place-items-center rounded-md text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-fg)]"
        >
          <Search className="h-[15px] w-[15px]" strokeWidth={1.8} />
        </button>
        {/* Search trigger */}
        <button
          type="button"
          onClick={onSearchOpen}
          className="hidden sm:flex w-52 items-center gap-2 rounded-lg py-1.5 pl-3 pr-2 text-[12px] text-[var(--color-fg-dim)] transition-all hover:text-[var(--color-fg-muted)]"
          style={theme === "light"
            ? { background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.1)" }
            : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }
          }
        >
          <Search className="h-[12px] w-[12px] shrink-0" strokeWidth={1.8} />
          <span className="flex-1 text-left font-mono">Buscar…</span>
          <kbd
            className="shrink-0 rounded border px-1.5 py-0.5 font-mono text-[10px] leading-4"
            style={theme === "light"
              ? { background: "rgba(0,0,0,0.05)", borderColor: "rgba(0,0,0,0.12)", color: "#a29f97" }
              : { background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.1)", color: "#5c5c61" }
            }
          >
            ⌘K
          </kbd>
        </button>

        {stars !== null && (
          <a
            href="https://github.com/drbarzaga/react-dojo"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            className="flex h-7 items-center gap-1 rounded-md px-2 text-[12px] text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-fg)]"
          >
            <Star className="h-[11px] w-[11px] fill-yellow-400 text-yellow-400" />
            <span className="font-mono">{stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}</span>
          </a>
        )}

        {/* Editor theme picker */}
        <div ref={pickerRef} className="relative" onBlur={handlePickerBlur}>
          <button
            type="button"
            onClick={() => setPickerOpen((v) => !v)}
            aria-label="Tema del editor"
            title="Tema del editor"
            className="grid h-7 w-7 cursor-pointer place-items-center rounded-md text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-fg)]"
          >
            <PaletteIcon className="h-[15px] w-[15px]" />
          </button>

          {pickerOpen && (
            <div className="absolute right-0 top-full mt-2 z-50 w-[186px] rounded-lg border border-[var(--color-line)] bg-[var(--color-bg-raise)] p-1.5 shadow-lg">
              {(Object.entries(EDITOR_THEMES_META) as [EditorThemeId, typeof EDITOR_THEMES_META[EditorThemeId]][]).map(([id, meta]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => selectTheme(id)}
                  className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-[var(--color-bg-hover)]"
                >
                  <span
                    className="flex h-5 w-8 shrink-0 items-center gap-[3px] overflow-hidden rounded px-1"
                    style={{ background: meta.bg }}
                  >
                    {meta.colors.map((c, i) => (
                      <span key={i} className="h-2 w-1 rounded-sm shrink-0" style={{ background: c }} />
                    ))}
                  </span>
                  <span className={`text-[13px] ${editorTheme === id ? "text-[var(--color-fg)]" : "text-[var(--color-fg-muted)]"}`}>
                    {meta.label}
                  </span>
                  {editorTheme === id && (
                    <span className="ml-auto text-[10px] text-[var(--color-fg-dim)]">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
          title={theme === "dark" ? "Tema claro" : "Tema oscuro"}
          className="grid h-7 w-7 cursor-pointer place-items-center rounded-md text-[var(--color-fg-muted)] transition-colors hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-fg)]"
        >
          {theme === "dark" ? <SunIcon className="h-[15px] w-[15px]" /> : <MoonIcon className="h-[15px] w-[15px]" />}
        </button>
      </div>
    </header>
  )
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  )
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function BugIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M8 2l1.88 1.88" />
      <path d="M14.12 3.88 16 2" />
      <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
      <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
      <path d="M12 20v-9" />
      <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
      <path d="M6 13H2" />
      <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
      <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
      <path d="M22 13h-4" />
      <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
    </svg>
  )
}
