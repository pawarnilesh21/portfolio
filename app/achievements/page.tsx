import Achievements from "@/components/achievements"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Achievements | Nilesh Pawar",
  description: "Academic achievements and certifications of Nilesh Pawar",
}

export default function AchievementsPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <Achievements />
    </main>
  )
}

