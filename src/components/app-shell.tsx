"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"
import { SearchModal } from "@/components/search-modal"
import { BreadcrumbBar } from "@/components/breadcrumb-bar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export function AppShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    document.getElementById("scroll-area")?.scrollTo({ top: 0, behavior: "auto" })
  }, [pathname])

  return (
    <SidebarProvider defaultOpen className="h-svh! flex-col! overflow-hidden">
      <Header onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <SidebarInset className="flex min-w-0 flex-col overflow-hidden">
          <BreadcrumbBar />
          <div id="scroll-area" className="min-h-0 flex-1 overflow-y-auto">
            <div key={pathname} className="page-enter">
              {children}
            </div>
          </div>
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
