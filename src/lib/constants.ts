import { EditorThemeId, EditorThemeMeta } from "@/types"

export const EDITOR_THEMES_META: Record<EditorThemeId, EditorThemeMeta> = {
  auto: { label: "Auto", bg: "#0f0f11", colors: ["#c4956a", "#87a89d", "#8babcc"] },
  dracula: { label: "Dracula", bg: "#282A36", colors: ["#ff79c6", "#f1fa8c", "#50fa7b"] },
  nightOwl: { label: "Night Owl", bg: "#011627", colors: ["#c792ea", "#ecc48d", "#82aaff"] },
  githubLight: { label: "GitHub Light", bg: "#ffffff", colors: ["#cf222e", "#0a3069", "#8250df"] },
  monokai: { label: "Monokai", bg: "#272822", colors: ["#f92672", "#e6db74", "#a6e22e"] },
}

export const REPOSITORY = "drbarzaga/react-dojo"
