import Hero from "@/components/hero"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nilesh Pawar | Portfolio",
  description: "Portfolio website of Nilesh Pawar, an aspiring software engineer and tech enthusiast",
}

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  )
}

