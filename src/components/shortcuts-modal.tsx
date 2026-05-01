"use client"

import { useTranslations } from "next-intl"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ShortcutsModalProps {
  open: boolean
  onClose: () => void
}

function ShortcutRow({ keys, label }: { keys: string[]; label: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-[13px] text-[var(--color-fg-muted)]">{label}</span>
      <div className="flex items-center gap-1">
        {keys.map((k) => (
          <kbd
            key={k}
            className="rounded-md bg-[var(--color-bg-hover)] px-2 py-1 font-mono text-[11px] leading-none text-[var(--color-fg-muted)]"
          >
            {k}
          </kbd>
        ))}
      </div>
    </div>
  )
}

function ShortcutSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[10px] font-semibold tracking-widest text-[var(--color-fg-faint)] uppercase">
        {title}
      </p>
      <div className="divide-y divide-[var(--color-line)]">{children}</div>
    </div>
  )
}

export function ShortcutsModal({ open, onClose }: ShortcutsModalProps) {
  const t = useTranslations("ShortcutsModal")

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm border-[var(--color-line-strong)] bg-[var(--color-bg-raise)] p-0">
        <DialogHeader className="border-b border-[var(--color-line)] px-5 py-4">
          <DialogTitle className="font-mono text-[14px] text-[var(--color-fg)]">
            {t("title")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5 px-5 py-4">
          <ShortcutSection title={t("sectionNavigation")}>
            <ShortcutRow keys={["←", "→"]} label={t("navigate")} />
            <ShortcutRow keys={["⌘", "K"]} label={t("search")} />
          </ShortcutSection>
          <ShortcutSection title={t("sectionHome")}>
            <ShortcutRow keys={["space"]} label={t("start")} />
            <ShortcutRow keys={["P"]} label={t("practice")} />
            <ShortcutRow keys={["S"]} label={t("surprise")} />
          </ShortcutSection>
          <ShortcutSection title={t("sectionGeneral")}>
            <ShortcutRow keys={["?"]} label={t("openShortcuts")} />
          </ShortcutSection>
        </div>
      </DialogContent>
    </Dialog>
  )
}
