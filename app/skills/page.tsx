import Skills from "@/components/skills"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Skills | Nilesh Pawar",
  description: "Technical and soft skills of Nilesh Pawar",
}

export default function SkillsPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <Skills />
    </main>
  )
}

