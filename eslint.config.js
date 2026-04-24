import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import { defineConfig, globalIgnores } from "eslint/config"
import eslintConfigPrettier from "eslint-config-prettier"

export default defineConfig([
  globalIgnores(["dist", ".next"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.recommended,
      eslintConfigPrettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // setState in useEffect on mount is a valid pattern for reading from external sources (localStorage, etc.)
      "react-hooks/set-state-in-effect": "warn",
      "no-empty": ["error", { allowEmptyCatch: true }],
      // react-refresh rules are designed for Vite; Next.js has its own Fast Refresh mechanism
      "react-refresh/only-export-components": "off",
    },
  },
])
