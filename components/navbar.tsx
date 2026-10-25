"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Moon, Sun } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const pathname = usePathname()
useEffect(() => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("darkMode")
    setIsDarkMode(stored !== "false") // default dark if not set
  }
}, [])


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (typeof window !== "undefined") {
      if (!isDarkMode) {
        document.documentElement.classList.add("dark")
        localStorage.setItem("darkMode", "true")
      } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("darkMode", "false")
      }
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Achievements", path: "/achievements" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Nilesh Pawar
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.path ? "text-primary" : "text-foreground/80"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={toggleDarkMode}
            className="rounded-full p-2 text-foreground/80 hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden space-x-2">
          <button
            onClick={toggleDarkMode}
            className="rounded-full p-2 text-foreground/80 hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={toggleMenu}
            className="rounded-full p-2 text-foreground/80 hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden animate-fade-in">
            <nav className="container mx-auto py-4 px-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.path ? "text-primary" : "text-foreground/80"
                  }`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

