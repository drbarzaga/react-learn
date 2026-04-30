export type EditorThemeId = "auto" | "dracula" | "nightOwl" | "githubLight" | "monokai"

export interface EditorThemeMeta {
  label: string
  bg: string
  colors: [string, string, string] // keyword, string, definition
}

export type ExerciseFiles = Record<string, string>
