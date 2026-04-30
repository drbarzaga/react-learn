/**
 * Represents the code files for an exercise.
 * Maps file paths to their code content.
 *
 * @example
 * {
 *   "/App.tsx": "export default function App() { ... }",
 *   "/index.tsx": "import App from './App' ..."
 * }
 */
export type ExerciseFiles = Record<string, string>
