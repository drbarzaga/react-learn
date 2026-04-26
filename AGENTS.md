# Agent & Contributor Guide

This guide applies to all contributors and AI agents working in this repo.
Read it fully before making any changes.

---

## Tech Stack

- **Framework**: Next.js (App Router) + React 19
- **Language**: TypeScript (strict mode — no exceptions)
- **Styling**: Tailwind CSS with CSS variables for theming
- **Package manager**: Bun
- **Linting**: ESLint (zero warnings policy)
- **Formatting**: Prettier with Tailwind plugin

---

## General Rules

- MUST: Use `interface` for object shapes, `type` for unions and aliases.
- MUST: Keep all shared types in the nearest `types.ts` file (`src/content/types.ts` for content, `src/content/exercises/types.ts` for exercises).
- MUST: Use `export function` for components and hooks — not arrow function assignments.
- MUST: Never add comments unless absolutely necessary. If the code is a hack (e.g. a `setTimeout` or confusing workaround), prefix it with `// HACK: reason`.
- MUST: Use kebab-case for file names in `src/components/ui/` and `src/hooks/` (e.g. `use-mobile.ts`). Use PascalCase for all other component files (e.g. `Header.tsx`, `QuizPage.tsx`).
- MUST: Use descriptive variable names — no shorthands or 1–2 character names.
  - In `.map()`, prefer `innerItem` over `i` or `x`.
  - Prefer `didPositionChange` over `moved`, `isLoading` over `loading`.
- MUST: Frequently re-evaluate and refactor variable names to be more accurate and descriptive.
- MUST: Do not use type casts (`as`) unless absolutely unavoidable.
- MUST: Remove all unused code. Do not repeat yourself.
- MUST: Always search the codebase, consider multiple approaches, then implement the most elegant solution.
- MUST: Put magic numbers and reusable constants in a `constants.ts` file using `SCREAMING_SNAKE_CASE` with unit suffixes (`_MS`, `_PX`, `_COUNT`). Co-locate the file near the feature that owns it.
- MUST: Put small, focused utility functions in `src/lib/` (one utility per file).
- MUST: Use `Boolean(value)` instead of `!!value`.
- MUST: Add `"use client"` only to components that require browser APIs, event listeners, or React state/effects. Prefer Server Components by default.

---

## Component Patterns

```tsx
// Props interface above the component, same file
interface ConceptPageProps {
  concept: Concept
}

export function ConceptPage({ concept }: ConceptPageProps) {
  // ...
}
```

- Props interfaces are named `<ComponentName>Props`.
- Destructure props inline in the function signature.
- Keep components focused — extract sub-components or hooks when a component grows beyond ~150 lines.

---

## Hook Patterns

```tsx
const ThemeCtx = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  // ...
}

export function useTheme() {
  const ctx = useContext(ThemeCtx)
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>")
  return ctx
}
```

- Always throw a descriptive error when a hook is used outside its provider.
- Custom hook files live in `src/hooks/`.

---

## Styling Rules

- Use Tailwind classes exclusively — no inline `style={{}}` objects, no CSS modules, no CSS-in-JS.
- Reference theme CSS variables via Tailwind: `className="bg-[var(--color-bg)]"`.
- CSS variables for the design system are defined in `src/app/globals.css`.
- Use the `cn()` utility from `src/lib/utils.ts` for conditional class merging.

---

## Content & Educational Files

- Content files live in `src/content/` and use Spanish names matching their category: `estado.tsx`, `efectos.tsx`, `rendimiento.tsx`, `concurrencia.tsx`, `composicion.tsx`, `entrevistas.tsx`.
- Quiz questions live in `src/content/quiz.ts`.
- Exercise files live in `src/content/exercises/`.
- When adding a new concept or exercise, register it in the relevant index file (`src/content/concepts.ts` or `src/content/exercises/index.ts`).
- All playground code in exercises must work inside a Sandpack sandbox — no external network calls or Node.js APIs.

---

## Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add useReducer concept with playground example
fix: correct timer reset logic in QuizPage
chore: update dependencies
docs: improve exercise description for theme-context
style: format QuizPage with prettier
refactor: extract score calculation to utils
```

Reference the related PR number in the commit when applicable.

---

## Before Committing

Run all checks and ensure they pass with zero errors and zero warnings:

```bash
bun run build
bun run lint
bun run format:check
```

Pre-commit hooks (Husky + lint-staged) will also run ESLint and Prettier automatically on staged files.

---

## Pull Request Checklist

- [ ] TypeScript build passes (`bun run build`)
- [ ] Lint passes with zero warnings (`bun run lint`)
- [ ] Code is formatted (`bun run format`)
- [ ] New concepts or exercises are registered in the appropriate index file
- [ ] Playground examples work correctly in the Sandpack editor
- [ ] Technical accuracy has been verified for any educational content
