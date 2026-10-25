import { z } from "zod";

const text = z.string().min(1);
const role = z.enum(["sde", "ai", "genai"]);
const refs = z.array(text).min(1);
const claim = z.object({
  text,
  sources: refs,
  state: z.enum(["verified", "resume", "conflict", "historical"]),
  publish: z.boolean(),
  note: text,
});
const metric = z.object({
  label: text,
  value: text,
  source: text,
  measuredAt: text,
  scope: text,
  publish: z.boolean(),
});
export const portfolioSchema = z.object({
  updatedAt: text,
  sources: z.array(z.object({ id: text, kind: z.enum(["resume", "repository", "local-code", "user", "browser"]), location: text, note: text })).min(1),
  profile: z.object({ name: text, location: text, headline: text, graduationYear: z.number().int(), workPreference: text, roles: z.array(role).min(1), sources: refs }),
  links: z.array(z.object({ label: text, url: z.string().url(), sources: refs })),
  resumes: z.array(z.object({ id: text, title: text, sourcePath: text, publicPath: text, roles: z.array(role), caveat: z.string() })).min(1),
  experience: z.array(z.object({ id: text, company: text, title: text, start: text, end: text, mode: text, scope: text, stack: z.array(text), sources: refs, bullets: z.array(claim).min(1), todos: z.array(text) })),
  projects: z.array(z.object({
    id: text, title: text, tier: z.enum(["A", "B", "candidate"]), priority: z.number().int().positive(), roles: z.array(role).min(1),
    status: z.enum(["Live", "Code only", "Archived"]), summary: text, stack: z.array(text).min(1),
    repositories: z.array(z.string().url()), liveUrl: z.string().url().nullable(),
    liveCheckedAt: text.nullable(), liveScope: text, sources: refs,
    claims: z.array(claim), metrics: z.array(metric), todos: z.array(text),
  })),
  skills: z.array(z.object({ name: text, capability: text, roles: z.array(role).min(1), level: z.enum(["internship", "shipped project", "coursework", "familiar"]), evidence: z.array(text), sources: refs, note: text })),
  education: z.array(z.object({ institution: text, qualification: text, completion: text, result: text, sources: refs })),
  achievements: z.array(claim),
  lenses: z.object({ balanced: refs, sde: refs, ai: refs, genai: refs }),
  resumeByRole: z.object({ balanced: text, sde: text, ai: text, genai: text }),
  todos: z.array(z.object({ id: text, area: text, task: text, blockingPublicationOf: text })),
}).superRefine((data, ctx) => {
  const fail = (message: string) => ctx.addIssue({ code: z.ZodIssueCode.custom, message });
  const sourceIds = new Set(data.sources.map(s => s.id));
  const projectIds = new Set(data.projects.map(p => p.id));
  const evidenceIds = new Set([...projectIds, ...data.experience.map(e => e.id)]);
  const todoIds = new Set(data.todos.map(t => t.id));
  const resumeIds = new Set(data.resumes.map(r => r.id));
  for (const list of [data.sources, data.projects, data.experience, data.resumes, data.todos]) {
    if (new Set(list.map(x => x.id)).size !== list.length) fail("Duplicate content IDs");
  }
  const checkSources = (sources: string[]) => sources.forEach(id => { if (!sourceIds.has(id)) fail(`Unknown source: ${id}`); });
  const checkClaim = (item: z.infer<typeof claim>) => {
    checkSources(item.sources);
    if (item.state === "conflict" && item.publish) fail("Conflicting claims cannot be published");
  };
  checkSources(data.profile.sources);
  data.links.forEach(x => checkSources(x.sources));
  data.education.forEach(x => checkSources(x.sources));
  data.achievements.forEach(checkClaim);
  for (const item of [...data.projects, ...data.experience]) {
    checkSources(item.sources);
    item.todos.forEach(id => { if (!todoIds.has(id)) fail(`Unregistered TODO: ${id}`); });
  }
  for (const project of data.projects) {
    project.claims.forEach(checkClaim);
    project.metrics.forEach(m => checkSources([m.source]));
    if (project.status === "Live" && (!project.liveUrl || !project.liveCheckedAt)) fail(`Live project ${project.id} needs verified URL and date`);
  }
  data.experience.forEach(e => e.bullets.forEach(checkClaim));
  for (const skill of data.skills) {
    checkSources(skill.sources);
    skill.evidence.forEach(id => { if (!evidenceIds.has(id)) fail(`Unknown skill evidence: ${id}`); });
    if (skill.level !== "familiar" && skill.evidence.length === 0) fail(`Skill ${skill.name} requires project or experience evidence`);
  }
  for (const order of Object.values(data.lenses)) {
    if (new Set(order).size !== order.length) fail("Repeated project in role lens");
    order.forEach(id => { if (!projectIds.has(id)) fail(`Unknown lens project: ${id}`); });
    if (order.indexOf("eco-bin") > order.indexOf("dining-master")) fail("Earlier-work priorities must be preserved");
  }
  Object.values(data.resumeByRole).forEach(id => { if (!resumeIds.has(id)) fail(`Unknown resume: ${id}`); });
});

export type Portfolio = z.infer<typeof portfolioSchema>;
export type Project = Portfolio["projects"][number];
export type Role = z.infer<typeof role>;
