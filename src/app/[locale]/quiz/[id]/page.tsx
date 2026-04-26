import { notFound } from "next/navigation"
import { QuizPage } from "@/components/QuizPage"
import { getContentForLocale } from "@/content/loader"
import { routing, type Locale } from "@/i18n/routing"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ locale: string; id: string }>
}

export async function generateStaticParams() {
  const results = await Promise.all(
    routing.locales.map(async (locale) => {
      const { allQuizzes } = await getContentForLocale(locale)
      return allQuizzes.map((q) => ({ locale, id: q.id }))
    })
  )
  return results.flat()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params
  const { quizIndex } = await getContentForLocale(locale as Locale)
  const quiz = quizIndex[id]
  if (!quiz) return {}
  return { title: quiz.label }
}

export default async function QuizRoute({ params }: Props) {
  const { locale, id } = await params
  const { quizIndex, allQuizzes } = await getContentForLocale(locale as Locale)
  const quiz = quizIndex[id]
  if (!quiz) notFound()

  return <QuizPage quiz={quiz} allQuizzes={allQuizzes} />
}
