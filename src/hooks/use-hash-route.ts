import { useSyncExternalStore } from "react"

const DEFAULT_ROUTE = ""

function subscribe(cb: () => void) {
  window.addEventListener("hashchange", cb)
  return () => window.removeEventListener("hashchange", cb)
}

export function useHashRoute() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.hash.slice(1).trim() || DEFAULT_ROUTE,
    () => DEFAULT_ROUTE
  )
}

export function navigate(id: string) {
  if (typeof window === "undefined") return
  if (window.location.hash.slice(1) === id) return
  window.location.hash = id
}
