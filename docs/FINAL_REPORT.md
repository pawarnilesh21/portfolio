# Portfolio V2 delivery

Completed locally on 25 October 2026. Preview: http://127.0.0.1:3000/

## Delivered

- Actual application rebuilt with the approved editorial design: responsive layout, professional positioning, experience, projects, skills, education, about and contact.
- Balanced, Software, AI and GenAI lenses change project ordering, headline, skill emphasis and resume selection. AI and GenAI use the supplied AI Engineer resume.
- Five evidence-backed MDX case studies with architecture diagrams, source links and explicit scope limits. Earlier work remains available; unverified candidates are hidden.
- Reliable light/dark themes, mobile navigation, keyboard skip link, reduced-motion styling and useful server-rendered content without JavaScript.
- Downloadable original PDFs, optimized profile photo, social preview images, metadata, structured data, sitemap configuration, permanent legacy redirects and generated CSP/security headers.
- Strict content validation, leaner dependencies, formatting/lint configuration, production build, browser tests, CI and Netlify configuration. Original components are preserved under legacy/ and in baseline Git history.

## Verification

- Production static export: passed, 15 generated pages including metadata and legacy routes.
- ESLint, TypeScript, formatting: passed.
- Content schema and five invalid-content rejection checks: passed.
- Playwright: 7 tests passed. Includes seven routes at four widths (360, 768, 1280, 1920), role ordering, resume PDF bytes, theme persistence, keyboard entry, mobile navigation, profile image loading, no-JavaScript content, headers, redirects and 404 behavior.
- Desktop and mobile dark-theme screenshots visually reviewed.
- Final mobile Lighthouse: **Performance 97, Accessibility 100, Best Practices 100, SEO 66**. This is a single local simulated-throttling run, not field data. SEO is reduced because this preview intentionally blocks indexing until a production origin is configured. Results are recorded in `docs/evidence/v2-final-scores.json`.
- Fixed excess CSS generation by restricting Tailwind source scanning; added local gzip compression and improved muted-text contrast. System fonts avoid external font loading.

## Still required for public release

1. Confirm the production domain and set `NEXT_PUBLIC_SITE_URL`, then rebuild and verify the deployed site. No public deployment was performed.
2. Dependency advisory resolved during GitHub delivery preparation: Browserslist and related packages updated; npm reported zero vulnerabilities in the full install/update audit and production-only audit. Sharp is now an explicit pinned build dependency.
3. Source-content questions remain in `CONTENT_TODO.md`. The website uses the confirmed TechSonix January–March 2025 dates, but the original SDE PDF still contains the older end date and a LinkedIn placeholder. Supplied PDFs were not rewritten.

Optional enhancements (command palette, technical notes, portfolio chat) were not included in the core delivery. Source changes are saved in the working tree; no new implementation commit or remote push was performed in this resumed pass. CI is configured but has not run on a remote runner.

## Restart the preview

Run `npm start` after `npm run build`. On this machine use `node scripts/serve.mjs` directly if the npm shim fails. Open http://127.0.0.1:3000/. The preview is available while its local process remains running.

## Visual refinement after delivery
Applied the requested two changes: new ivory/cobalt and navy palettes, plus larger small text (body copy generally 16–18px). Rebuilt successfully and checked home, projects index and DocMind at 360/768/1280/1920px in both themes (24 checks, no horizontal overflow). Prior Lighthouse scores above describe the earlier palette build; they were not remeasured for this styling-only update.


## Portfolio chatbot delivery
Added a circular bottom-right assistant using Groq with the existing server-only .env key. Answers display approved excerpts and citations from content/chat-context.json; the model selects evidence IDs rather than authoring public factual claims. Irrelevant/unsupported requests are declined. Source selection is still fallible; no zero-hallucination guarantee is claimed.
Production build, 9 browser tests, 7 server tests, lint and formatting passed. Three live grounding checks passed, and the actual UI correctly answered the confirmed TechSonix internship dates with a citation. Groq token throttling was observed and addressed with bounded context selection and a clear retry message. The localhost server has the required network access and is running at http://127.0.0.1:3000/. Netlify deployment remains untested. See CHATBOT.md for maintenance and setup.


## GitHub/Netlify delivery preparation
Netlify configuration uses the repository root, Node 24, npm lockfile, static export, and a separate chat Function. Old root Bun/Tailwind configuration moved to legacy to avoid build detection conflicts. The current working files were scanned against the actual Groq key and common key patterns with no findings; .env remains Git-ignored. See NETLIFY_SETUP.md.
