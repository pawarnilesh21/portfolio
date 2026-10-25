import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { getContent } from "@/content";
import { ProjectDiagram } from "@/components/project-diagram";
import { absolute, siteUrl } from "@/lib/site";
export const dynamicParams = false;
export function generateStaticParams() {
  return getContent()
    .portfolio.projects.filter((p) => p.tier === "A")
    .map((p) => ({ slug: p.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getContent().portfolio.projects.find((p) => p.id === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: siteUrl
      ? { canonical: absolute("/projects/" + p.id + "/") }
      : undefined,
    openGraph: {
      title: p.title + " — Nilesh Pawar",
      description: p.summary,
      images: ["/og/" + p.id + ".png"],
    },
  };
}
export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { portfolio, bodies } = getContent();
  const p = portfolio.projects.find((p) => p.id === slug && p.tier === "A");
  if (!p) notFound();
  const { default: Body } = await evaluate(bodies[p.id], {
    ...runtime,
    development: false,
  });
  return (
    <>
      <section className="wrap case-hero">
        <Link href="/#work" className="back-link">
          ← Back to selected work
        </Link>
        <div className="project-kicker">
          <span className="mono">{p.category}</span>
          <span className="status">
            <span
              className={p.status === "Live" ? "status-dot live" : "status-dot"}
            />
            {p.status === "Live" ? "Live demo" : p.status}
          </span>
        </div>
        <h1>
          {p.title}
          <span className="accent">.</span>
        </h1>
        <p>{p.summary}</p>
        <div className="tech-list">
          {p.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="hero-actions">
          {p.repositories.map((url, i) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={i === 0 ? "button primary" : "button secondary"}
            >
              {p.repositories.length > 1
                ? i === 0
                  ? "Frontend source"
                  : "Backend source"
                : "Explore source code"}{" "}
              <span>↗</span>
            </a>
          ))}
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button secondary"
            >
              Open demo <span>↗</span>
            </a>
          )}
        </div>
      </section>
      <div className="wrap case-layout">
        <article className="case-prose">
          <Body />
        </article>
        <aside className="case-sidebar" aria-label="Project evidence">
          <h2>How the pieces connect</h2>
          <ProjectDiagram title={p.title} steps={p.diagram} />
          <p className="case-note">
            {p.id === "investify"
              ? "The diagram shows the public application boundary. Provider-backed research and revision controls described in the study belong to the newer local version."
              : p.id === "resolvedesk"
                ? "Local implementation. Simulated refunds only; no real payments. A public repository and final evaluation are still pending."
                : p.id === "hms-portal"
                  ? "Frontend prototype with in-memory demo data. No server-backed clinical workflow is claimed."
                  : p.liveUrl
                    ? "The public demo was reachable on 25 October 2026. That check does not certify protected backend or model workflows."
                    : "Code-only project. Follow the repository instructions for a local review; no public deployment is claimed."}
          </p>
          {p.metrics.some((m) => m.publish) && (
            <div className="case-metrics">
              <h2 style={{ marginTop: 24 }}>Recorded verification</h2>
              {p.metrics
                .filter((m) => m.publish)
                .map((m) => (
                  <article key={m.label}>
                    <span className="mono">{m.measuredAt}</span>
                    <strong>{m.value}</strong>
                    <p>{m.scope}</p>
                  </article>
                ))}
            </div>
          )}
          <div className="case-source-list">
            {p.id === "docmind" && (
              <a
                href="https://github.com/pawarnilesh21/DocMind/blob/main/raw/PRODUCTION_READINESS.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the verification record ↗
              </a>
            )}
            <Link href="/#contact">Ask me about this project ↗</Link>
          </div>
        </aside>
      </div>
    </>
  );
}
