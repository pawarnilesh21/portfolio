import Link from "next/link"
import { Github, Linkedin, Instagram, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-800 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Nilesh Pawar
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mb-4 max-w-md">
              A passionate Computer Engineering student with a focus on web development and problem-solving. Always
              eager to learn and grow in the tech industry.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/pawarnilesh21/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/nilesh-pawar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/in/nilesh-pawar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/skills"
                  className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/achievements"
                  className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  Achievements
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <a
                  href="mailto:pawarnil898@gmail.com"
                  className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  pawarnil898@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <a
                  href="tel:+918767736538"
                  className="text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  +91 8767736538
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 mt-12 pt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Nilesh Pawar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

