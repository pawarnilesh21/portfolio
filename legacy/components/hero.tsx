"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Download, Github, Linkedin, Instagram } from "lucide-react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 -z-10"></div>

      {/* Animated shapes */}
      <div className="absolute top-0 left-0 right-0 h-[500px] overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 transform translate-y-10"}`}
          >
            <h2 className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-primary uppercase rounded-full bg-primary/10">
              Portfolio
            </h2>

            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Nilesh Pawar
            </h1>

            <p className="mb-8 text-lg md:text-xl text-slate-700 dark:text-slate-300">
              Aspiring Software Engineer | Tech Enthusiast | Problem Solver
            </p>

            <p className="mb-10 text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
             Hello I am Nilesh Pawar a 3rd year Computer Engineering student 
             passionate about creating impactful solutions through technology and innovation
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg shadow-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-xl"
              >
                View My Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href="/PawarNilesh_resume.pdf"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-primary/20 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
                download
              >
                Download Resume
                <Download className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center space-x-6">
              <a
                href="https://github.com/pawarnilesh21/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/nilesh-pawar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/in/nilesh-pawar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

