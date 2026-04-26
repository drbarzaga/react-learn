import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "React Dojo - Aprende React de forma sencilla",
    template: "%s — React Dojo",
  },
  description:
    "Plataforma interactiva para dominar React: conceptos claros, ejercicios reales y quizzes en el navegador.",
  metadataBase: new URL("https://react-dojo.vercel.app"),
  openGraph: {
    title: "React Dojo",
    description:
      "Plataforma interactiva para dominar React: conceptos claros, ejercicios reales y quizzes en el navegador.",
    url: "https://react-dojo.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "React Dojo",
    description:
      "Plataforma interactiva para dominar React: conceptos claros, ejercicios reales y quizzes en el navegador.",
  },
}
