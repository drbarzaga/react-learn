import { useEffect } from "react"
import { useLocaleRouter } from "@/hooks/use-locale-router"

interface UseKeyboardNavOptions {
  prev?: string
  next?: string
  prevFallback?: string
  nextFallback?: string
}

const INTERACTIVE_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"])

export function useKeyboardNav({ prev, next, prevFallback, nextFallback }: UseKeyboardNavOptions) {
  const { push } = useLocaleRouter()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const tag = (e.target as HTMLElement)?.tagName
      if (INTERACTIVE_TAGS.has(tag) || (e.target as HTMLElement)?.isContentEditable) return

      const prevRoute = prev ?? prevFallback
      const nextRoute = next ?? nextFallback
      if (e.key === "ArrowLeft" && prevRoute) push(prevRoute)
      if (e.key === "ArrowRight" && nextRoute) push(nextRoute)
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [prev, next, prevFallback, nextFallback, push])
}
