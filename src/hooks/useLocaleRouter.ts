"use client"

import { useParams, useRouter } from "next/navigation"

export function useLocaleRouter() {
  const router = useRouter()
  const params = useParams()
  const locale = (params.locale as string) || "en"

  return {
    locale,
    push(path: string) {
      const normalized = path.startsWith("/") ? path : `/${path}`
      router.push(`/${locale}${normalized}`)
    },
    href(path: string) {
      const normalized = path.startsWith("/") ? path : `/${path}`
      return `/${locale}${normalized}`
    },
  }
}
