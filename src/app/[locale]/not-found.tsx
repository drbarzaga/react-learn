import { ArrowLeft } from "lucide-react"
import { getTranslations, getLocale } from "next-intl/server"
import Link from "next/link"

export default async function NotFound() {
  const t = await getTranslations("NotFound")
  const locale = await getLocale()

  return (
    <div className="flex min-h-[calc(100vh-84px)] flex-col items-center justify-center px-8 py-16">
      <div className="flex max-w-[400px] flex-col items-center text-center">
        <h1 className="font-mono text-[96px] leading-none font-bold tracking-tight text-[var(--color-fg-faint)]">
          404
        </h1>

        <div className="mt-8 h-px w-8 bg-[var(--color-line-strong)]" />

        <p className="mt-8 text-[18px] font-medium text-[var(--color-fg)]">{t("title")}</p>
        <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-fg-muted)]">{t("body")}</p>

        <Link
          href={`/${locale}`}
          className="mt-8 inline-flex items-center gap-2 rounded-md border border-[var(--color-line-strong)] bg-transparent px-4 py-2 font-mono text-[13px] text-[var(--color-fg-muted)] transition-colors hover:border-[var(--color-fg)] hover:text-[var(--color-fg)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
          {t("back")}
        </Link>
      </div>
    </div>
  )
}
