import type { Metadata } from "next";
import { getContent } from "@/content";
import { PortfolioHome, type PublicProject } from "@/components/portfolio-home";
import { absolute, siteUrl } from "@/lib/site";
export const metadata: Metadata = {
  title: "Projects",
  description:
    "Backend systems, document intelligence and agent workflows by Nilesh Pawar.",
  alternates: siteUrl ? { canonical: absolute("/projects/") } : undefined,
};
export default function Projects() {
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
  const resumes = Object.fromEntries(
    Object.entries(p.resumeByRole).map(([role, id]) => [
      role,
      p.resumes.find((r) => r.id === id)!.publicPath,
    ]),
  ) as Record<"balanced" | "sde" | "ai" | "genai", string>;
  return (
    <PortfolioHome
      projects={projects}
      skills={[]}
      order={p.lenses}
      resumes={resumes}
      projectsOnly
    />
  );
}
