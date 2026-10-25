# Portfolio V2 migration and implementation plan

Status: Phase 1 proposal, awaiting the approval explicitly required by the supplied upgrade brief. Updated 2026-10-25.

## Decision

Upgrade this repository in place, with a supported Next.js major upgrade and a full presentation/content rewrite. App Router + React + strict TypeScript are already appropriate; changing framework would add cost without improving the portfolio. The current Next 14 dependency line is not retained. main preserves the original site; all work is on feat/portfolio-v2. No external project repos will be changed or pushed by this task.

## Positioning and content

Proposed headline: **I build backend systems and grounded AI applications.** Supporting line: **Computer Engineering · Graduating 2027 · Open to remote SDE-1, AI and GenAI roles.** No broad ML-training expertise is implied. Evidence: two internships, reviewed projects, and dated engineering verification where supported.

Homepage sequence: compact navigation → role-aware introduction/CTAs → two-internship timeline → selected projects → capability groups with evidence links → education/achievement → 80–120-word engineering biography → email/social contact → last-updated footer.

Featured set: Investify, AI Blog Generator, HMS, DocMind, ResolveDesk. DocMind ranks first among AI projects because public code, tests, operational documentation and grounded retrieval are inspectable. ResolveDesk ranks second because actual local graph/approval/recovery code is stronger than StudyForge, but its public link and completed eval remain gaps. StudyForge appears as additional work; SyncBoard is held as a candidate until identified. ECO-BIN and Dining Master remain the final, visually quieter entries, in that order.

Role ordering follows the inventory exactly for its named leads:
- Balanced: Investify → AI Blog Generator → DocMind → HMS → ResolveDesk.
- SDE: Investify → HMS → AI Blog Generator → DocMind → ResolveDesk.
- AI: DocMind → ResolveDesk → AI Blog Generator → Investify → HMS.
- GenAI: AI Blog Generator → DocMind → ResolveDesk → Investify → HMS.

AI/GenAI both download the user-selected AI resume. SDE gets its variant, with a tracked blocker to correcting the PDF's end date and LinkedIn placeholder. Balanced defaults to AI resume with an explicit resume menu. Supplemental Python/AI and Frontend PDFs remain available only if useful; never relabel them as a new document.

## Visual directions

| | A — Editorial engineering portfolio (recommended) | B — Technical field notes |
|---|---|---|
| Composition | Bold left-aligned introduction, slim availability rail, wide project showcases, clear numbered sections | Compact intro, persistent side index, denser case-study rows and diagram-led work |
| Color | Warm off-white / deep ink, one teal accent; corresponding charcoal dark theme | Charcoal / paper, one amber accent; light counterpart |
| Typography | Large tightly set local sans headings; restrained monospace labels | More monospace labels, tighter documentation-like hierarchy |
| Artifacts | Real screenshots where available; code-derived diagrams and dated evidence captions | Architecture/data-flow diagrams and compact verification tables |
| Fit | Recruiter scan first, engineering depth one click away | Engineering readers who prefer a documentation feel |

Recommend A: stronger first impression without relying on decorative animation, gradients, particles, fake terminals or invented metrics. Main content is visible before JavaScript. Only small hover/focus/reveal effects; reduced-motion support is mandatory. Light/dark follows system preference initially and respects explicit choice without flashing.

## Old-to-new mapping

| Old part | Decision | Replacement |
|---|---|---|
| App Router, TypeScript | Keep/upgrade | Current supported Next/React, actual blocking type checks |
| Navbar/footer | Rewrite | Semantic navigation, mobile disclosure, skip link, theme switch, compact contact/footer |
| Hero | Rewrite | Role positioning, useful CTAs, actual evidence and project access |
| About/education | Rewrite | Resume-supported facts, concise engineering narrative |
| Skills wall | Replace | Capability groups, evidence links, separate Familiar disclosure |
| Projects | Rewrite | Priority-controlled work index and full MDX case studies |
| Achievements | Rewrite | Relevant resume-supported achievements; unverified certificate cards omitted |
| Contact form + Axios | Drop | Email + GitHub + LinkedIn; no backend needed |
| Placeholder artwork/blob backgrounds | Drop | Real project artifacts or accessible architecture diagrams |
| Unused UI library/dependencies | Prune after import audit | Only components used by the approved design |
| Original source/assets | Preserve in Git | main and baseline commit remain recoverable |

## Route/redirect map

- / → new homepage.
- /projects → project index, preserved at same URL.
- /projects/[slug] → new case studies, generated for Tier A projects.
- /about → permanent host redirect to /#about.
- /skills → permanent host redirect to /#skills.
- /achievements → permanent host redirect to /#education.
- /contact → permanent host redirect to /#contact.
- /PawarNilesh_resume.pdf → preserve original asset; new role-specific download paths coexist.

For a static Netlify deployment, write explicit _redirects and _headers during build. Static export cannot rely on Next runtime redirects/headers. Preview route tests verify destination fragments and permanent status where host behavior is available. If hosting changes, provide equivalent host configuration and recheck it; do not silently treat a client redirect as HTTP 301/308.

## Stack and folder plan

- Supported stable Next.js, React, strict TypeScript; pin exact compatible versions and one npm lockfile after approval. Official docs currently display Next 16.4.3; recheck registry/advisories before install, do not use canary.
- Tailwind with a small token system; local optimized WOFF2 font files. Reuse licensed font source; no remote font dependency.
- Zod validates all content. Phase 1 has staged JSON data + typed schema + a build validation command. Phase 2 moves each project to a self-contained MDX/data record with metadata so adding a project requires one file, not component edits. Build discovery handles remaining items by priority; no hard-coded UI arrays.
- MDX compiled from trusted local project files; server-rendered case studies and static route generation. No untrusted remote MDX execution.
- Existing next-themes or documented equivalent for theme bootstrapping; small client role-lens component. Motion library only where justified, with lazy/limited usage and reduced-motion handling.
- ESLint + Prettier + Playwright + Lighthouse CI, blocking in GitHub Actions.

```text
app/                      layout, homepage, project index, project slug pages
components/               navigation, role lens, sections, case study primitives
content/                  profile, experience, skills, education, sources, schema
content/projects/*.mdx    project metadata + case study + diagram data
lib/                      server content discovery, metadata helpers
public/resumes/           approved role variants
public/projects/          optimized real screenshots
scripts/                  validation, build-time host files and social images
 tests/                   core route, role-lens, keyboard, resume smoke tests
.github/workflows/        lint, typecheck, build, browser, Lighthouse
 docs/                    tracker, audits, evidence, gaps, final report
```

## Case-study contract

Each featured study: 300–600 words with TL;DR, problem/constraints, verified architecture/data flow, documented decisions, role-relevant depth, results with dates/scope, limitations, next improvements and links. An architecture diagram describes code; a rationale such as “I chose X because Y” requires user/source evidence. Where not supplied, use a neutral explanation of the implementation and keep the missing first-person rationale in CONTENT_TODO.

Example DocMind flow: document upload → authenticated API → durable PostgreSQL job → parser/chunker → Gemini embeddings → pgvector → owner-filtered retrieval → answer generation → quotation/source checks → entailment check → cited answer or abstention. This is evidence-backed; no reranker, agent tool execution or OCR is added to the claim.

ResolveDesk: owned order → read tools → proposal → checkpointed human approval → authenticated simulated refund transaction → single terminal result. Never describe it as making real payments or as a completed production support deployment.

## SEO, security and performance

Static-first, no database/contact API/LLM calls. Per-route metadata, canonical only after deployment URL confirmation, Person JSON-LD with verified sameAs links, sitemap and robots. Generate per-project Open Graph images at build time from project data (dynamic content, no per-request server requirement). CSP must account for Next inline bootstrap and theme script hashes; test it rather than disabling protection with broad wildcards. Host security headers apply to static responses.

Preload only necessary WOFF2 font subsets; avoid hiding LCP content behind hydration; responsive WebP/AVIF screenshots with explicit dimensions; no runtime stats fetch. Target 95+ Lighthouse categories, LCP <2.5s and CLS <0.1. Report lab results honestly. Real-user INP <200ms cannot be established by a Lighthouse run alone; provide field-measurement guidance if no traffic data exists.

## QA and delivery gates

1. Content validation rejects missing sources, dangling evidence, duplicate IDs, unresolved published conflicts and unverified Live badges.
2. Lint, format, strict typecheck, build and browser smoke checks pass with no ignore flags.
3. 360/768/1280/1920px layouts, keyboard-only navigation, visible focus, contrast, reduced motion, theme persistence/no flash, empty states and external link behavior checked.
4. Role lenses update headline, project/skill ordering and correct downloadable PDF; stable meaningful links without JavaScript remain available.
5. Project source links and demo states rechecked; don't call HTTP 200 proof of backend readiness. No real emails or third-party mutations as QA.
6. Lighthouse against production output on representative routes; final report includes actual scores, test scope and open gaps.
7. README explains architecture, source updates, local run, env, hosting and rollback. .env.example contains only public site-origin configuration unless an optional server feature is later approved.
8. Deployment to the chosen account requires confirmed host configuration; no unrelated Sites registration or public launch is assumed.

## Optional work after all required gates

Command palette and static technical notes may add value. Defer portfolio chatbot: it adds API spend, runtime security, rate limits, evaluations and maintenance to a project that can tell its story statically. Do not invent notes, GitHub/LeetCode statistics or chat capabilities.

For DocMind, a runnable Docker review package is the closest fit to its PostgreSQL/worker architecture; a free single-process Space would require adapting storage/worker lifecycle. For ResolveDesk, an optional Docker demo with a scripted model avoids provider cost; a live model needs a spending cap and hosted PostgreSQL. These are proposals, not implemented/deployed services, and do not block this portfolio.

## Approval checkpoint

Approve Direction A (recommended) or B and the upgrade-in-place plan. Unresolved content can stay omitted while development proceeds. Phase 2–4 then run sequentially with task updates unless genuinely blocked. This checkpoint comes from the user's supplied brief: “Stop for my approval at the end of Phase 1.”

