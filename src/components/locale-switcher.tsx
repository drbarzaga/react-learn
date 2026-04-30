"use client"

import { usePathname, useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { routing } from "@/i18n/routing"

export function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (next: string) => {
    const localePrefix = `/${locale}`
    const withoutLocale = pathname.startsWith(localePrefix)
      ? pathname.slice(localePrefix.length) || "/"
      : pathname
    router.push(`/${next}${withoutLocale === "/" ? "" : withoutLocale}`)
  }

  return (
    <div className="flex items-center gap-0.5 rounded-md border border-[var(--color-line)] p-0.5">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchLocale(l)}
          className={[
            "rounded px-2 py-0.5 font-mono text-[11px] uppercase transition-colors",
            l === locale
              ? "bg-[var(--color-fg)] text-[var(--color-bg)]"
              : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
          ].join(" ")}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
