import AboutMe from "@/components/about-me"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Nilesh Pawar",
  description: "Learn more about Nilesh Pawar, his background, skills, and aspirations",
}

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <AboutMe />
    </main>
  )
}

