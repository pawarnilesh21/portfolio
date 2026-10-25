import type { Metadata } from "next";
import Image from "next/image";
import { getContent } from "@/content";
import { PortfolioHome, type PublicProject } from "@/components/portfolio-home";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
};
export default function Home() {
  const { portfolio: p } = getContent();
  const projects: PublicProject[] = p.projects.map(
    ({
      id,
      title,
      tier,
      priority,
      roles,
      status,
      summary,
      stack,
      repositories,
      liveUrl,
      category,
      focus,
      diagram,
    }) => ({
      id,
      title,
      tier,
      priority,
      roles,
      status,
      summary,
      stack,
      repositories,
      liveUrl,
      category,
      focus,
      diagram,
    }),
  );
  const skills = p.skills.map(
    ({ name, capability, roles, level, evidence }) => ({
      name,
      capability,
      roles,
      level,
      evidence,
    }),
  );
  const resumes = Object.fromEntries(
    Object.entries(p.resumeByRole).map(([role, id]) => [
      role,
      p.resumes.find((r) => r.id === id)!.publicPath,
    ]),
  ) as Record<"balanced" | "sde" | "ai" | "genai", string>;
  const experience = (
    <section className="wrap section experience-section" id="experience">
      <div className="section-heading">
        <div>
          <span className="eyebrow">01 / EXPERIENCE</span>
          <h2>Learning in the build.</h2>
        </div>
        <p>
          Real teams. Practical work.
          <br />A foundation in shipping useful software.
        </p>
      </div>
      <div className="experience-list">
        {p.experience.map((e) => (
          <article key={e.id}>
            <div className="experience-date mono">
              {e.start} — {e.end}
              <span>
                {e.id === "techsonix" ? "REMOTE" : "SHIRDI, MAHARASHTRA"}
              </span>
            </div>
            <div>
              <h3>{e.title}</h3>
              <div className="company">{e.company}</div>
              <ul>
                {e.bullets
                  .filter((b) => b.publish)
                  .map((b) => (
                    <li key={b.text}>{b.text.replace(/^I /, "")}</li>
                  ))}
              </ul>
              <div className="tech-list">
                {e.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
  const closing = (
    <>
      <section id="education" className="wrap section education-section">
        <div>
          <span className="eyebrow">04 / FOUNDATION</span>
          <h2>
            Always building
            <br />
            on what I know.
          </h2>
          <p className="section-intro">
            Computer engineering, practical projects,
            <br />
            and a habit of asking better questions.
          </p>
        </div>
        <div className="education-list">
          {p.education.map((e) => (
            <article key={e.institution}>
              <span className="mono">{e.completion}</span>
              <h3>{e.qualification}</h3>
              <p>{e.institution}</p>
              <span className="result">{e.result}</span>
            </article>
          ))}
          <article className="achievement">
            <span className="mono">BEYOND THE CLASSROOM</span>
            <h3>2nd place · TechMantra Hackathon</h3>
            <p>
              Among 50+ teams, prototyping a MERN application under time
              constraints.
            </p>
            <p>Led a 4-member team for my final-year diploma project.</p>
          </article>
        </div>
      </section>
      <section id="about" className="about-section">
        <div className="wrap about-grid">
          <div className="about-photo">
            <Image
              src="/profile.webp"
              alt="Nilesh Pawar"
              width={400}
              height={480}
            />
            <span className="mono">NILESH PAWAR / PUNE, INDIA</span>
          </div>
          <div>
            <span className="eyebrow">05 / A LITTLE CONTEXT</span>
            <h2>
              I like understanding
              <br />
              what happens
              <br />
              <span className="accent">behind the interface.</span>
            </h2>
            <p>
              I’m Nilesh Pawar, a Computer Engineering student at I²IT, Pune,
              graduating in 2027. My work sits between backend development and
              applied AI: APIs, document retrieval, and workflows that connect a
              model to a useful application.
            </p>
            <p>
              My internships gave me experience with web interfaces, REST
              endpoints and authentication. In my own projects, I’m exploring
              what makes systems easier to reason about—who owns the data, what
              happens when a request fails, and when a human should make the
              decision. I’m looking for a remote engineering role where I can
              contribute, learn from code reviews, and keep building that depth.
            </p>
            <a
              className="text-link"
              href="https://github.com/pawarnilesh21"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow the work on GitHub ↗
            </a>
          </div>
        </div>
      </section>
      <section id="contact" className="wrap section contact-section">
        <div>
          <span className="eyebrow">06 / WHAT’S NEXT</span>
          <h2>
            Have something
            <br />
            worth building<span className="accent">?</span>
          </h2>
          <p>
            I’m open to remote SDE-1, AI and GenAI opportunities.
            <br />
            Let’s start with a conversation.
          </p>
          <a className="contact-email" href="mailto:pawarnil898@gmail.com">
            pawarnil898@gmail.com <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="contact-links">
          <a
            href="https://github.com/pawarnilesh21"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <span>↗</span>
          </a>
          <a
            href="https://linkedin.com/in/pawarnilesh21"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <span>↗</span>
          </a>
          <a
            href="https://leetcode.com/pawarnilesh_21"
            target="_blank"
            rel="noopener noreferrer"
          >
            LeetCode <span>↗</span>
          </a>
          <a href="/resumes/NileshPawar_AiEngineerResume.pdf" download>
            AI / GenAI resume <span>↓</span>
          </a>
        </div>
      </section>
    </>
  );
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.profile.name,
    ...(siteUrl ? { url: siteUrl } : {}),
    email: "mailto:pawarnil898@gmail.com",
    sameAs: p.links.filter((l) => l.url.startsWith("https")).map((l) => l.url),
    alumniOf: p.education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.institution,
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <PortfolioHome
        projects={projects}
        skills={skills}
        order={p.lenses}
        resumes={resumes}
        experience={experience}
        closing={closing}
      />
    </>
  );
}
