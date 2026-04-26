import type { Locale } from "@/i18n/routing"
import type { Concept, Category } from "@/content/types"
import type { Exercise } from "@/content/exercises/types"
import type { Quiz } from "@/content/quiz"

interface ContentBundle {
  allConcepts: Concept[]
  conceptIndex: Record<string, Concept>
  categories: Category[]
  allExercises: Exercise[]
  exerciseIndex: Record<string, Exercise>
  allQuizzes: Quiz[]
  quizIndex: Record<string, Quiz>
}

export async function getContentForLocale(locale: Locale): Promise<ContentBundle> {
  if (locale === "es") {
    const [concepts, exercises, quiz] = await Promise.all([
      import("@/content/concepts"),
      import("@/content/exercises"),
      import("@/content/quiz"),
    ])
    return {
      allConcepts: concepts.allConcepts,
      conceptIndex: concepts.conceptIndex,
      categories: concepts.categories,
      allExercises: exercises.allExercises,
      exerciseIndex: exercises.exerciseIndex,
      allQuizzes: quiz.allQuizzes,
      quizIndex: quiz.quizIndex,
    }
  }

  const [concepts, exercises, quiz] = await Promise.all([
    import("@/content/en/concepts"),
    import("@/content/en/exercises/index"),
    import("@/content/en/quiz"),
  ])
  return {
    allConcepts: concepts.allConcepts,
    conceptIndex: concepts.conceptIndex,
    categories: concepts.categories,
    allExercises: exercises.allExercises,
    exerciseIndex: exercises.exerciseIndex,
    allQuizzes: quiz.allQuizzes,
    quizIndex: quiz.quizIndex,
  }
}
