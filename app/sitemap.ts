import type { MetadataRoute } from "next";
import { getContent } from "@/content";
import { siteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [
    "",
    "/projects",
    ...getContent()
      .portfolio.projects.filter((p) => p.tier === "A")
      .map((p) => "/projects/" + p.id),
  ].map((path) => ({
    url: siteUrl + path + "/",
    lastModified: "2026-10-25",
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
