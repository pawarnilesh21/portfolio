"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Award, Medal, BadgeIcon as Certificate } from "lucide-react"

export default function Achievements() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const academicAchievements = [
    {
      title: "Diploma in Computer Technology",
      description: "Secured 93.06% in Diploma from Sanjivani K.B.P. Polytechnic, Kopargaon",
      icon: <Award className="h-5 w-5" />,
    },
    {
      title: "NMMS Scholarship",
      description: "Achieved 2nd rank in the NMMS Scholarship (District Level) in 8th grade",
      icon: <Medal className="h-5 w-5" />,
    },
    {
      title: "10th Grade Excellence",
      description: "Scored 88% in 10th grade examinations",
      icon: <Award className="h-5 w-5" />,
    },
  ]

  const certifications = [
    {
      title: "ReactJS Certification",
      issuer: "Itronix Solutions",
      date: "August 2023",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Web Development Fundamentals",
      issuer: "Udemy",
      date: "May 2023",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      date: "January 2023",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 transform translate-y-10"}`}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Achievements & Certifications
          </h1>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Award className="mr-2 h-6 w-6 text-primary" />
              Academic Achievements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {academicAchievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {achievement.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-slate-700 dark:text-slate-300 text-sm">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Certificate className="mr-2 h-6 w-6 text-primary" />
              Certifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-40">
                    <Image src={cert.image || "/placeholder.svg"} alt={cert.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-1">{cert.title}</h3>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-primary">{cert.issuer}</span>
                      <span className="text-slate-500 dark:text-slate-400">{cert.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">Continuous Learning Journey</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-6 max-w-3xl mx-auto">
                I believe in lifelong learning and constantly strive to improve my skills and knowledge through various
                courses, certifications, and hands-on projects.
              </p>

              <div className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg shadow-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-xl">
                <Certificate className="mr-2 h-5 w-5" />
                View All Certifications
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

