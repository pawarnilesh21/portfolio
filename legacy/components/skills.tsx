"use client"

import { useEffect, useState } from "react"
import { Code, Server, Terminal, Palette, PenToolIcon as Tool, Users } from "lucide-react"

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const technicalSkills = [
    {
      category: "Programming Languages",
      icon: <Code className="h-5 w-5" />,
      skills: ["C", "C++", "Java", "JavaScript", "SQL", "Python"],
    },
    {
      category: "Frontend",
      icon: <Palette className="h-5 w-5" />,
      skills: ["HTML", "CSS", "JavaScript", "React"],
    },
    {
      category: "Backend",
      icon: <Server className="h-5 w-5" />,
      skills: ["Node.js", "PHP", "MongoDB", "MERN Stack"],
    },
    {
      category: "Tools",
      icon: <Tool className="h-5 w-5" />,
      skills: ["Visual Studio Code", "PyCharm", "Figma", "Canva", "Git"],
    },
    {
      category: "Hosting Platforms",
      icon: <Terminal className="h-5 w-5" />,
      skills: ["GitHub Pages", "Netlify", "Vercel"],
    },
  ]

  const softSkills = [
    "Strong teamwork and collaboration abilities",
    "Excellent problem-solving and analytical skills",
    "Effective communication in both technical and non-technical contexts",
    "Leadership abilities",
    "Creative problem-solving",
    "Time management",
    "Adaptability",
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 transform translate-y-10"}`}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            My Skills
          </h1>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Code className="mr-2 h-6 w-6 text-primary" />
              Technical Skills
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technicalSkills.map((skillGroup, index) => (
                <div
                  key={skillGroup.category}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 skill-card animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                      {skillGroup.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{skillGroup.category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {skillGroup.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Users className="mr-2 h-6 w-6 text-primary" />
              Soft Skills
            </h2>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 animate-slide-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {softSkills.map((skill, index) => (
                  <div key={index} className="flex items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                    <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                    <span className="text-slate-700 dark:text-slate-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 animate-fade-in">
            <h2 className="text-xl font-bold mb-4 text-center">Skills Development Journey</h2>
            <p className="text-center text-slate-700 dark:text-slate-300 mb-6">
              I'm constantly learning and improving my skills through projects, courses, and hands-on experience.
            </p>

            <div className="flex justify-center">
              <div className="w-full max-w-3xl bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary z-10">
                        <Terminal className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold">Continuous Learning</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Taking online courses and tutorials to expand my knowledge
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-12 left-6 bottom-0 w-0.5 h-12 bg-primary/30"></div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary z-10">
                        <Code className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold">Project-Based Learning</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Building real projects to apply and reinforce my skills
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-12 left-6 bottom-0 w-0.5 h-12 bg-primary/30"></div>
                  </div>

                  <div className="relative">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary z-10">
                        <Users className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold">Collaboration</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Working with peers on group projects to develop teamwork skills
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

