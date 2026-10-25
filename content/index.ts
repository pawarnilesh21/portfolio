import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import raw from "./portfolio.json";
import { portfolioSchema } from "./schema";

export const getContent = cache(() => {
  const files = fs
    .readdirSync(path.join(process.cwd(), "content/projects"))
    .filter((f) => f.endsWith(".mdx"));
  const records = files.map((file) => {
    const source = fs.readFileSync(
      path.join(process.cwd(), "content/projects", file),
      "utf8",
    );
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if (!match) throw new Error("Missing project metadata: " + file);
    return { data: JSON.parse(match[1]), body: source.slice(match[0].length) };
  });
  const portfolio = portfolioSchema.parse({
    ...raw,
    projects: records.map((r) => r.data),
  });
  return {
    portfolio,
    bodies: Object.fromEntries(
      records.map((r) => [r.data.id, r.body]),
    ) as Record<string, string>,
  };
});
export type { Portfolio, Project, Role } from "./schema";
