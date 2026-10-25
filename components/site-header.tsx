"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRef } from "react";

const links = [
  ["Work", "/#work"],
  ["Experience", "/#experience"],
  ["About", "/#about"],
  ["Contact", "/#contact"],
];
export function SiteHeader() {
  const { resolvedTheme, setTheme } = useTheme();
  const menu = useRef<HTMLDetailsElement>(null);
  return (
    <header className="site-header">
      <div className="wrap nav-row">
        <Link href="/" className="wordmark" aria-label="Nilesh Pawar, home">
          nilesh pawar<span>.</span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([name, href]) => (
            <Link key={name} href={href}>
              {name}
            </Link>
          ))}
        </nav>
        <div className="nav-tools">
          <button
            className="theme-toggle"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            aria-label="Toggle color theme"
          >
            <svg
              className="sun"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
            </svg>
            <svg
              className="moon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />
            </svg>
          </button>
          <a className="nav-contact" href="mailto:pawarnil898@gmail.com">
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
          <details ref={menu} className="mobile-menu">
            <summary aria-label="Open navigation">
              <span />
              <span />
            </summary>
            <nav aria-label="Mobile navigation">
              {links.map(([name, href]) => (
                <Link
                  key={name}
                  href={href}
                  onClick={() => {
                    if (menu.current) menu.current.open = false;
                  }}
                >
                  {name}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
