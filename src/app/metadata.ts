import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "React Dojo - Aprende React de forma sencilla",
    template: "%s — React Dojo",
  },
  description: "Simple way to learn React: read it, edit it, run it.",
  metadataBase: new URL("https://react-dojo.vercel.app"),
  openGraph: {
    title: "React Dojo",
    description: "Simple way to learn React: read it, edit it, run it.",
    url: "https://react-dojo.vercel.app",
    images: [{ url: "/og-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "React Dojo",
    description: "Simple way to learn React: read it, edit it, run it.",
    images: ["/og-image.png"],
  },
}
