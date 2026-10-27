# Portfolio V2 task tracker

Updated: 2026-10-25. Checked means completed; unchecked means remaining.
Scope: implement approved Direction A in the actual repository, preserve the original site, and use supplied evidence.

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
- [x] Receive user approval of Phase 1 and actual implementation.

## Phase 2 — Build after approval
- [x] Toolchain, strict type checking, formatting, and content validation.
- [x] Responsive shared layout, accessible navigation, and reliable themes.
- [x] Homepage: positioning, internships, featured work, skills, education, about, contact.
- [x] Balanced / SDE / AI / GenAI role lenses and resume downloads.
- [x] Evidence-based MDX case studies and architecture diagrams.
- [x] Earlier-work strip and legacy route handling.
- [x] Metadata, social previews, structured data, sitemap, robots, and headers.

## Phase 3 — Content polish
- [x] Review every claim against source evidence.
- [x] Replace unsupported copy and placeholders; keep all unresolved facts in CONTENT_TODO.
- [x] Validate resume variants, project links, and first-person writing.

## Phase 4 — QA and delivery
- [x] Lint, typecheck, content validation, build, and smoke tests.
- [x] Responsive checks at 360 / 768 / 1280 / 1920 px; keyboard and reduced-motion checks.
- [x] Mobile Lighthouse measurements and fixes; report actual scores and limitations.
- [x] CI, deployment configuration, README, and final report.
- [x] Supply working preview URL and completed/remaining task summary.

## Optional (only after must-haves pass)
- [ ] Consider command palette, technical notes, cached stats, or guarded portfolio chat.

## Current findings
- Initialized Git because this folder had no repository; the original site is preserved in baseline commit `0af11e8` on main.
- The existing npm shim is broken; direct local Next.js execution works.
- Phase 1 foundation: 9 projects, 2 internships, 68 skills, 20 content gaps; schema and five rejection checks pass. Existing production build and separate strict typecheck pass.
- User confirmed TechSonix Jan–Mar 2025, remote preference, and AI Engineer PDF for both AI and GenAI downloads.
- Baseline mobile Lighthouse: Performance 75 / Accessibility 94 / Best Practices 96 / SEO 100. Single local production-export lab run; not field data.
- All 24 route/viewport checks completed; tablet overflow and theme restoration failure confirmed. Original pages/components are preserved in Git and legacy/; V2 now replaces the active application.

## Delivery status
- Local implementation complete and preview running at http://127.0.0.1:3000/.
- Final checks: production build, lint, typecheck, formatting, content validation and all 7 Playwright tests pass.
- Final mobile Lighthouse: 97 performance / 100 accessibility / 100 best practices / 66 SEO (preview intentionally noindex).
- Public release remains pending a confirmed domain, dependency advisory remediation/re-audit, and source PDF corrections. See FINAL_REPORT.md.

## Requested visual refinement
- [x] Replace green theme with ivory/cobalt light mode and navy/periwinkle dark mode; match icon and social previews.
- [x] Increase body copy, navigation, buttons, labels and diagram text for readability.
- [x] Production build passed; 24 responsive checks across both themes passed; desktop and mobile screenshots reviewed.


## Portfolio chatbot
- [x] Bottom-right circular launcher and responsive chat panel with source links.
- [x] Single approved context file at content/chat-context.json.
- [x] Groq endpoint using server-only GROQ_API_KEY from existing .env.
- [x] Evidence-ID validation, fixed refusals, bounded context/history, request limits and sanitized errors.
- [x] Netlify function configuration and setup documentation.
- [x] Production build, 9 browser tests, 7 server tests, lint and formatting checks passed.
- [x] Three live grounding cases plus a real browser TechSonix dates/citation check passed.
- [ ] Verify the Netlify function on the eventual public deployment.

## Chat latency investigation — current status
- [x] Probe deployed endpoint: missing runtime key confirmed; greeting works.
- [x] Record real-Groq local baseline and optimized handler samples.
- [x] Add exact approved FAQ responses, precomputed retrieval and bounded answer cache.
- [x] Tighten timeouts, output validation, history handling and recoverable UI errors.
- [x] Add timing diagnostics without logging messages or credentials.
- [x] Pass 12 server tests, 11 browser tests, production build and typecheck.
- [x] Document measured gains and limitations in CHAT_LATENCY_REPORT.md.
- [x] Upload latency changes to main (805463d).
- [ ] Confirm completed Netlify deployment.
- [ ] Verify Functions/Production key on the new deployment and measure successful live answers.
- [x] Complete additional interleaved Groq comparison after approval review recovered: median 1309.36 → 511.21 ms.

## Local chatbot accuracy upgrade — 27 October 2026
- [x] Record a 24-case retrieval baseline (15/24).
- [x] Improve vocabulary matching, project isolation, comparisons and follow-up resolution.
- [x] Add grounded student FAQs and clarify ambiguous project references.
- [x] Strengthen evidence validation and context-based cache invalidation.
- [x] Pass all 24 retrieval checks and 17 server regression tests.
- [x] Complete final live-model checks: 14/14 passed with request pacing.
- [ ] Owner reviews local preview and CHAT_QUALITY_LOCAL.md.
- [x] Owner explicitly approved GitHub upload with commit message "Chatbot Improve" (27 October 2026).

- [x] Complete all 11 browser checks; fix a hardcoded test port and verify the affected case.

