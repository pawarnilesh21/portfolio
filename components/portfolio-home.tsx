"use client";
import { useState } from "react";
import Link from "next/link";
import { ProjectDiagram } from "./project-diagram";
import type { Project, Portfolio, Role } from "@/content/schema";

type Lens = Role | "balanced";
export type PublicProject = Pick<
  Project,
  | "id"
  | "title"
  | "tier"
  | "priority"
  | "roles"
  | "status"
  | "summary"
  | "stack"
  | "repositories"
  | "liveUrl"
  | "category"
  | "focus"
  | "diagram"
>;
type Skill = Pick<
  Portfolio["skills"][number],
  "name" | "capability" | "roles" | "level" | "evidence"
>;
const lenses: { id: Lens; label: string }[] = [
  { id: "balanced", label: "All work" },
  { id: "sde", label: "Software" },
  { id: "ai", label: "AI engineering" },
  { id: "genai", label: "Generative AI" },
];
const headlines: Record<
  Lens,
  { a: string; b: string; c: string; description: string }
> = {
  balanced: {
    a: "Backend systems.",
    b: "Grounded AI.",
    c: "Built with intent.",
    description:
      "I’m Nilesh, a Computer Engineering student building backend services and AI applications. Explore the code, the decisions, and what I’m learning along the way.",
  },
  sde: {
    a: "Thoughtful APIs.",
    b: "Reliable systems.",
    c: "From end to end.",
    description:
      "I build full-stack applications with attention to authentication, data integrity and useful interfaces. My work spans a backend internship and independent engineering projects.",
  },
  ai: {
    a: "Useful AI.",
    b: "Grounded answers.",
    c: "Evidence first.",
    description:
      "I build Python applications around language models, document retrieval and source validation. My focus is applied AI engineering: making the surrounding system dependable.",
  },
  genai: {
    a: "Beyond a prompt.",
    b: "Into a system.",
    c: "With clear limits.",
    description:
      "I connect language models to retrieval and tool-driven workflows, with citations, human approval and explicit failure handling. See how those boundaries work in my projects.",
  },
};
export function PortfolioHome({
  projects,
  skills,
  order,
  resumes,
  experience,
  closing,
  projectsOnly = false,
}: {
  projects: PublicProject[];
  skills: Skill[];
  order: Portfolio["lenses"];
  resumes: Record<Lens, string>;
  experience?: React.ReactNode;
  closing?: React.ReactNode;
  projectsOnly?: boolean;
}) {
  const [lens, setLens] = useState<Lens>("balanced");
  const headline = headlines[lens];
  const sorted = [...projects]
    .filter((p) => p.tier !== "candidate")
    .sort((a, b) => {
      const ai = order[lens].indexOf(a.id),
        bi = order[lens].indexOf(b.id);
      return (
        (ai < 0 ? 100 + a.priority : ai) - (bi < 0 ? 100 + b.priority : bi)
      );
    });
  const featured = sorted.filter((p) => p.tier === "A");
  const extra = sorted.filter(
    (p) => p.tier === "B" && p.id !== "eco-bin" && p.id !== "dining-master",
  );
  const earlier = sorted.filter(
    (p) => p.id === "eco-bin" || p.id === "dining-master",
  );
  const visibleSkills = skills.filter(
    (s) =>
      s.level !== "familiar" && (lens === "balanced" || s.roles.includes(lens)),
  );
  const groups = [...new Set(visibleSkills.map((s) => s.capability))];
  return (
    <>
      <section
        className={projectsOnly ? "wrap project-index-intro" : "wrap hero"}
        aria-labelledby="hero-title"
      >
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="availability-dot" /> OPEN TO REMOTE OPPORTUNITIES{" "}
            <span className="hero-year">/ 2027</span>
          </div>
          {projectsOnly ? (
            <h1 id="hero-title">
              Selected work<span className="accent">.</span>
            </h1>
          ) : (
            <h1 id="hero-title">
              {headline.a}
              <br />
              <span className="accent">{headline.b}</span>
              <br />
              <span className="hero-last">{headline.c}</span>
            </h1>
          )}
          <p className="hero-description">
            {projectsOnly
              ? "An inside look at the applications I’ve built. Explore their architecture, scope and trade-offs."
              : headline.description}
          </p>
          <div className="hero-actions">
            <a href="#work" className="button primary">
              Explore the work <span aria-hidden="true">↗</span>
            </a>
            <a href={resumes[lens]} download className="button secondary">
              Download{" "}
              {lens === "sde"
                ? "SDE"
                : lens === "balanced"
                  ? "AI / GenAI"
                  : lens === "ai"
                    ? "AI"
                    : "GenAI"}{" "}
              resume <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-meta">
            <span>PUNE, INDIA</span>
            <span>COMPUTER ENGINEERING</span>
          </div>
        </div>
        {!projectsOnly && (
          <aside
            className="hero-aside"
            aria-label="Featured engineering approach"
          >
            <div className="aside-label mono">
              <span>01 / CURRENT FOCUS</span>
              <span aria-hidden="true">↗</span>
            </div>
            <h2>An answer is only as useful as its evidence.</h2>
            <p>
              Inside DocMind: a document-to-answer pipeline with checks at every
              boundary.
            </p>
            <ProjectDiagram
              title="DocMind"
              steps={[
                "Private documents",
                "Owner-scoped retrieval",
                "Evidence checks",
                "Cited answer or abstention",
              ]}
              compact
            />
            <Link href="/projects/docmind/" className="text-link">
              Explore the architecture <span aria-hidden="true">↗</span>
            </Link>
            <div className="aside-caption">
              Code only · Python / FastAPI / pgvector
            </div>
          </aside>
        )}
      </section>
      {!projectsOnly && (
        <div className="wrap proof-strip">
          <div>
            <span className="mono">01 / BACKEND DEVELOPMENT</span>
            <strong>TechSonix</strong>
            <span>Jan – Mar 2025 · Remote</span>
          </div>
          <div>
            <span className="mono">02 / WEB DEVELOPMENT</span>
            <strong>TechKing Solutions</strong>
            <span>Jun – Jul 2023 · Shirdi</span>
          </div>
          <div>
            <span className="mono">03 / NEXT CHAPTER</span>
            <strong>Graduating in 2027</strong>
            <span>SDE-1 · AI · GenAI</span>
          </div>
        </div>
      )}
      {experience}
      <section
        id="work"
        className="wrap section work-section"
        aria-labelledby="work-title"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 / SELECTED WORK</span>
            <h2 id="work-title">
              Built to solve.
              <br />
              <span className="muted">Documented to explain.</span>
            </h2>
          </div>
          <p>
            Different problems. Shared principles:
            <br />
            clear boundaries, inspectable code,
            <br />
            and honest limits.
          </p>
        </div>
        <div className="lens-row">
          <span className="mono lens-label">EXPLORE THROUGH A ROLE</span>
          <div
            className="lens-switcher"
            role="group"
            aria-label="Choose portfolio role"
          >
            {lenses.map((l) => (
              <button
                key={l.id}
                aria-pressed={lens === l.id}
                onClick={() => setLens(l.id)}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only" role="status">
          {lens === "balanced"
            ? "All projects"
            : lenses.find((l) => l.id === lens)?.label + " projects"}{" "}
          selected. Resume download and skill emphasis updated.
        </p>
        <div className="project-list">
          {featured.map((p, i) => (
            <article className={"project-row project-" + p.id} key={p.id}>
              <div className="project-content">
                <div className="project-kicker">
                  <span className="mono">
                    {String(i + 1).padStart(2, "0")} / {p.category}
                  </span>
                  <span className="status">
                    <span
                      aria-hidden="true"
                      className={
                        p.status === "Live" ? "status-dot live" : "status-dot"
                      }
                    />
                    {p.status === "Live" ? "Live demo" : p.status}
                  </span>
                </div>
                <h3>
                  <Link href={"/projects/" + p.id + "/"}>{p.title}</Link>
                </h3>
                <p className="project-summary">{p.summary}</p>
                <div className="tech-list">
                  {p.stack.slice(0, 5).map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <Link className="text-link" href={"/projects/" + p.id + "/"}>
                    Read case study <span aria-hidden="true">↗</span>
                  </Link>
                  {p.repositories[0] && (
                    <a
                      href={p.repositories[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="quiet-link"
                    >
                      Source code ↗
                    </a>
                  )}
                </div>
              </div>
              <Link
                tabIndex={-1}
                aria-hidden="true"
                className="project-art"
                href={"/projects/" + p.id + "/"}
              >
                <ProjectDiagram title={p.title} steps={p.diagram} />
                <span className="art-caption mono">{p.focus}</span>
              </Link>
            </article>
          ))}
        </div>
        {extra.length > 0 && (
          <div className="additional-work">
            <h3>More explorations</h3>
            {extra.map((p) => (
              <article key={p.id}>
                <div>
                  <span className="mono">{p.status}</span>
                  <h4>{p.title}</h4>
                  <p>{p.summary}</p>
                </div>
                {p.repositories[0] && (
                  <a
                    href={p.repositories[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    View source ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
        <div className="earlier-work">
          <div>
            <span className="eyebrow">THE EARLIER CHAPTERS</span>
            <h3>Where I started.</h3>
          </div>
          <div>
            {earlier.map((p) => (
              <article key={p.id}>
                <div>
                  <h4>
                    {p.title} <span className="status">Live demo</span>
                  </h4>
                  <p>{p.summary}</p>
                  <span className="mono">HTML / CSS / JAVASCRIPT</span>
                </div>
                <div className="earlier-links">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={"Open " + p.title + " demo"}
                    >
                      Demo ↗
                    </a>
                  )}
                  {p.repositories[0] && (
                    <a
                      href={p.repositories[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Code ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {!projectsOnly && (
        <section id="skills" className="section skill-section">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <span className="eyebrow">03 / CAPABILITIES</span>
                <h2>Tools with a purpose.</h2>
              </div>
              <p>
                Connected to the work where I’ve used them.
                <br />
                No percentages. No inflated expertise.
              </p>
            </div>
            <div className="skill-grid">
              {groups.map((group) => (
                <article key={group}>
                  <span className="skill-mark" aria-hidden="true">
                    ↗
                  </span>
                  <h3>{group}</h3>
                  <div className="skill-chips">
                    {visibleSkills
                      .filter((s) => s.capability === group)
                      .map((s) => (
                        <a
                          key={s.name}
                          href={
                            s.evidence[0]?.startsWith("tech")
                              ? "/#experience"
                              : "/projects/" + s.evidence[0] + "/"
                          }
                          title={"Evidence: " + s.evidence.join(", ")}
                        >
                          {s.name}
                        </a>
                      ))}
                  </div>
                </article>
              ))}
            </div>
            <details className="familiar">
              <summary>
                Also familiar with <span aria-hidden="true">+</span>
              </summary>
              <p>
                Listed in my resumes; these are not presented as demonstrated
                project expertise.
              </p>
              <div className="tech-list">
                {skills
                  .filter(
                    (s) =>
                      s.level === "familiar" &&
                      (lens === "balanced" || s.roles.includes(lens)),
                  )
                  .map((s) => (
                    <span key={s.name}>{s.name}</span>
                  ))}
              </div>
            </details>
          </div>
        </section>
      )}
      {closing}
    </>
  );
}
