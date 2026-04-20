import { useEffect, useMemo } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Sidebar } from "@/components/Sidebar"
import { WelcomePage } from "@/components/WelcomePage"
import { ConceptPage } from "@/components/ConceptPage"
import { ExercisePage } from "@/components/ExercisePage"
import { QuizPage } from "@/components/QuizPage"
import { allConcepts, conceptIndex } from "@/content/concepts"
import { allExercises, exerciseIndex } from "@/content/exercises"
import { allQuizzes, quizIndex } from "@/content/quiz"
import { useHashRoute, navigate } from "@/hooks/useHashRoute"

export default function App() {
  const route = useHashRoute()

  const isHome = route === ""
  const isExerciseRoute = route.startsWith("learn/")
  const isQuizRoute = route.startsWith("quiz/")
  const exerciseId = isExerciseRoute ? route.slice(6) : null
  const quizId = isQuizRoute ? route.slice(5) : null

  const exercise = exerciseId ? exerciseIndex[exerciseId] : undefined
  const quiz = quizId ? quizIndex[quizId] : undefined
  const concept =
    !isHome && !isExerciseRoute && !isQuizRoute ? conceptIndex[route] : undefined

  // Fallback: invalid exercise/concept/quiz id → navigate to first valid
  useEffect(() => {
    if (isHome) return
    if (isExerciseRoute && !exercise) {
      navigate(`learn/${allExercises[0].id}`)
      return
    }
    if (isQuizRoute && !quiz) {
      navigate(`quiz/${allQuizzes[0].id}`)
      return
    }
    if (!isExerciseRoute && !isQuizRoute && !concept) {
      navigate(allConcepts[0].id)
    }
  }, [isHome, isExerciseRoute, isQuizRoute, exerciseId, quizId, route, concept, exercise, quiz])

  const conceptOrder = useMemo(() => allConcepts.map((c) => c.id), [])
  const exerciseOrder = useMemo(() => allExercises.map((e) => e.id), [])

  let conceptPrev, conceptNext, exercisePrev, exerciseNext
  if (concept) {
    const idx = conceptOrder.indexOf(concept.id)
    conceptPrev = idx > 0 ? allConcepts[idx - 1] : undefined
    conceptNext = idx < allConcepts.length - 1 ? allConcepts[idx + 1] : undefined
  }
  if (exercise) {
    const idx = exerciseOrder.indexOf(exercise.id)
    exercisePrev = idx > 0 ? allExercises[idx - 1] : undefined
    exerciseNext = idx < allExercises.length - 1 ? allExercises[idx + 1] : undefined
  }

  useEffect(() => {
    document.getElementById("scroll-area")?.scrollTo({ top: 0, behavior: "auto" })
    const label = exercise?.label ?? quiz?.label ?? concept?.label ?? "React Dojo"
    document.title = isHome ? "React Dojo" : `${label} — React Dojo`
  }, [isHome, concept?.id, concept?.label, exercise?.id, exercise?.label, quiz?.id, quiz?.label])

  const pageKey = isHome
    ? "home"
    : exercise
    ? `ex-${exercise.id}`
    : quiz
    ? `quiz-${quiz.id}`
    : concept
    ? `co-${concept.id}`
    : "loading"

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar current={route} />
        <main id="scroll-area" className="flex-1 overflow-y-auto">
          <div key={pageKey} className="page-enter">
            {isHome ? (
              <WelcomePage />
            ) : exercise ? (
              <ExercisePage exercise={exercise} prev={exercisePrev} next={exerciseNext} />
            ) : quiz ? (
              <QuizPage quiz={quiz} />
            ) : concept ? (
              <ConceptPage concept={concept} prev={conceptPrev} next={conceptNext} />
            ) : null}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
