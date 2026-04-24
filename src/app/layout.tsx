import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { AppProviders } from "@/components/AppProviders"
import { AppShell } from "@/components/AppShell"
import { Analytics } from "@vercel/analytics/next"

export { metadata } from "./metadata"

const themeScript = `(function(){try{var s=localStorage.getItem("theme"),p=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,t=s||(p?"dark":"light");document.documentElement.dataset.theme=t;if(t==="dark")document.documentElement.classList.add("dark")}catch(e){document.documentElement.dataset.theme="dark";document.documentElement.classList.add("dark")}})();`

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
        <Analytics />
      </body>
    </html>
  )
}
