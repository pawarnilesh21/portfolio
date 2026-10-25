"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Car, BirdIcon as Cricket, Book, Briefcase, GraduationCap, Target } from "lucide-react"

export default function AboutMe() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 transform translate-y-10"}`}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            About Me
          </h1>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="animate-slide-in-left">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/BgRemovePhoto.PNG?height=500&width=500"
                  alt="Nilesh Pawar"
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover"
                  
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold">Nilesh Pawar</h3>
                    <p className="text-sm opacity-90">Computer Engineering Student</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-slide-in-right">
              <p className="text-lg mb-6 text-slate-700 dark:text-slate-300">
                I am Nilesh Pawar, currently pursuing a Bachelor's degree in Computer Engineering at the International
                Institute of Information Technology (I²IT), Pune. I previously completed my Diploma in Computer
                Technology from Sanjivani K.B.P. Polytechnic, Kopargaon, with an outstanding score of 93.06%.
              </p>
              <p className="text-lg mb-6 text-slate-700 dark:text-slate-300">
                Beyond academics, I enjoy playing cricket and kabaddi and have a keen interest in driving cars. My
                short-term goal is to excel academically and secure a meaningful internship before entering my third
                year. My long-term aspiration is to establish my own technology company.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Cricket className="h-5 w-5" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">Cricket Enthusiast</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Car className="h-5 w-5" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">Driving Enthusiast</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Book className="h-5 w-5" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">Continuous Learner</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Target className="h-5 w-5" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">Goal-Oriented</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 animate-slide-up">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Short-term Goals</h3>
              </div>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Excel academically in my computer engineering program
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Secure a meaningful internship before third year
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Develop practical skills in modern web technologies
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Contribute to open-source projects
                </li>
              </ul>
            </div>

            <div
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Long-term Aspirations</h3>
              </div>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Establish my own technology company
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Develop innovative solutions to real-world problems
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Mentor aspiring tech professionals
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  Make a positive impact in the tech industry
                </li>
              </ul>
            </div>
          </div>

          <div
            className="mt-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Education</h3>
            </div>

            <div className="space-y-6">
              <div className="border-l-2 border-primary pl-4 pb-6">
                <h4 className="text-lg font-semibold">Bachelor's in Computer Engineering</h4>
                <p className="text-primary">2022 - Present</p>
                <p className="mt-1 text-slate-700 dark:text-slate-300">
                  International Institute of Information Technology (I²IT), Pune
                </p>
              </div>

              <div className="border-l-2 border-primary pl-4">
                <h4 className="text-lg font-semibold">Diploma in Computer Technology</h4>
                <p className="text-primary">2019 - 2022</p>
                <p className="mt-1 text-slate-700 dark:text-slate-300">Sanjivani K.B.P. Polytechnic, Kopargaon</p>
                <p className="mt-1 text-slate-700 dark:text-slate-300">Score: 93.06%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

