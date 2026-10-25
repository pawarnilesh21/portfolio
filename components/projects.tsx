"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Github, ExternalLink, Shield,Hospital } from "lucide-react"

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const projects = [
    {
      id: 1,
      title: "AI-Enable-Blog-Generator",
      description:
        "AI-Enable-Blog-Generator is a MERN-based web application with JWT authentication for secure admin access. Admins can add, publish, or unpublish blogs with titles, images, and categories like technology, startup, lifestyle, or finance. It integrates the Gemini API to auto-generate blog descriptions, and users can view and comment on published blogs in real time.",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["React.js", "Node.js","Tailwind CSS", "Express.js", "MongoDB Atlas", "JWT Authentication", "Gemini API", "ImageKit API"]
,
      challenges: [
  "Implementing secure JWT-based authentication for admin access",
  "Integrating Gemini API for AI-driven blog description generation",
  "Managing publish/unpublish blog states dynamically",
  "Handling image uploads efficiently using ImageKit API",
  "Ensuring real-time comment updates and blog search functionality"
],
github: "https://github.com/pawarnilesh21/AI-Enable-Blog-Generator",
  live: "https://ai-enable-blog-generator.vercel.app/",
      icon: <Shield className="h-6 w-6" />,
    },
  
{
  id: 1,
  title: "Hospital Queue Management System",
  description:
    "A MERN-based web application designed to streamline patient appointment scheduling, queue management, and bed allocation, improving hospital operational efficiency.",
  image: "/placeholder.svg?height=400&width=600",
  technologies: ["MongoDB", "Express.js", "React", "Node.js", "Tailwind CSS"],
  challenges: [
    "Implementing a real-time queue management system",
    "Developing an efficient bed allocation workflow",
    "Ensuring smooth patient and receptionist interaction",
    "Optimizing the system for real-time notifications",
  ],
  github: "https://github.com/pawarnilesh21/hospital-queue-management",
  live: "https://hmsportal.netlify.app/",
  icon: <Hospital className="h-6 w-6" />
  
}

  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 transform translate-y-10"}`}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            My Projects
          </h1>

          <p className="text-center text-lg mb-12 text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            Here are some of the projects I've worked on. Each project represents a unique challenge and learning
            experience.
          </p>

          <div className="space-y-16">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-card bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="md:flex">
                  <div className="md:w-2/5">
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent md:bg-gradient-to-r flex items-end md:items-center">
                        <div className="p-6 text-white md:hidden">
                          <div className="flex items-center mb-2">
                            {project.icon}
                            <h3 className="text-xl font-bold ml-2">{project.title}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-3/5 p-6">
                    <div className="hidden md:flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                        {project.icon}
                      </div>
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                    </div>

                    <p className="text-slate-700 dark:text-slate-300 mb-4">{project.description}</p>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Challenges:</h4>
                      <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                        {project.challenges.map((challenge, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex space-x-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        GitHub Repository
                      </a>

                      <a
                        href={project.live}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary bg-white dark:bg-slate-700 rounded-lg border border-primary/20 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold mb-4">More Projects Coming Soon!</h3>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              I'm constantly working on new projects. Check back soon or follow me on GitHub for updates.
            </p>

            <a
              href="https://github.com/pawarnilesh21/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Github className="mr-2 h-5 w-5" />
              View All Projects on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

