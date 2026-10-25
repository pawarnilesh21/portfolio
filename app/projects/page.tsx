import Projects from "@/components/projects"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | Nilesh Pawar",
  description: "Portfolio of projects developed by Nilesh Pawar",
}

export default function ProjectsPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <Projects />
    </main>
  )
}

