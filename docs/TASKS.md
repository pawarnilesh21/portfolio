# Portfolio V2 task tracker

Updated: 2026-10-25. Checked means completed; unchecked means remaining.
Scope: preserve the existing site, use supplied evidence, and stop for approval after Phase 1 as requested in the upgrade brief.

## Phase 0 — Understand and audit
- [x] Read both supplied briefs and inspect existing application components.
- [x] Read all four resumes; extract claims and source links.
- [x] Review relevant existing project chats and repository evidence.
- [x] Audit dependencies, accessibility, SEO, routes, assets, and deployment setup.
- [x] Inspect five deployed projects and document verification limits.
- [x] Write `docs/AUDIT.md`.

## Phase 1 — Content and implementation plan
- [x] Create a typed, schema-validated content layer without changing the current UI.
- [x] Reconcile resume differences in `docs/CONTENT_TODO.md` (unresolved conflicts explicitly held back).
- [x] Write `docs/ROLE_GAP_ANALYSIS.md`.
- [x] Write `docs/MIGRATION_PLAN.md`, including visual directions, route mapping, and QA plan.
- [x] Preserve baseline commit `0af11e8` on main and prepare `feat/portfolio-v2`.
- [x] Prepare `docs/DESIGN_DIRECTIONS.html` for concrete visual review.
- [ ] Receive user approval of Phase 1 (required by supplied brief).

## Phase 2 — Build after approval
- [ ] Toolchain, strict type checking, formatting, and content validation.
- [ ] Responsive shared layout, accessible navigation, and reliable themes.
- [ ] Homepage: positioning, internships, featured work, skills, education, about, contact.
- [ ] Balanced / SDE / AI / GenAI role lenses and resume downloads.
- [ ] Evidence-based MDX case studies and architecture diagrams.
- [ ] Earlier-work strip and legacy route handling.
- [ ] Metadata, social previews, structured data, sitemap, robots, and headers.

## Phase 3 — Content polish
- [ ] Review every claim against source evidence.
- [ ] Replace unsupported copy and placeholders; keep all unresolved facts in CONTENT_TODO.
- [ ] Validate resume variants, project links, and first-person writing.

## Phase 4 — QA and delivery
- [ ] Lint, typecheck, content validation, build, and smoke tests.
- [ ] Responsive checks at 360 / 768 / 1280 / 1920 px; keyboard and reduced-motion checks.
- [ ] Mobile Lighthouse measurements and fixes; report actual scores and limitations.
- [ ] CI, deployment configuration, README, and final report.
- [ ] Supply working preview URL and completed/remaining task summary.

## Optional (only after must-haves pass)
- [ ] Consider command palette, technical notes, cached stats, or guarded portfolio chat.

## Current findings
- Initialized Git because this folder had no repository; the original site is preserved in baseline commit `0af11e8` on main.
- The existing npm shim is broken; direct local Next.js execution works.
- Phase 1 foundation: 9 projects, 2 internships, 68 skills, 20 content gaps; schema and five rejection checks pass. Existing production build and separate strict typecheck pass.
- User confirmed TechSonix Jan–Mar 2025, remote preference, and AI Engineer PDF for both AI and GenAI downloads.
- Baseline mobile Lighthouse: Performance 75 / Accessibility 94 / Best Practices 96 / SEO 100. Single local production-export lab run; not field data.
- All 24 route/viewport checks completed; tablet overflow and theme restoration failure confirmed. No existing page/component was changed.
