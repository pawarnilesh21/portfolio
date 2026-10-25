# Nilesh Pawar — Portfolio V2

Responsive Next.js static portfolio with role lenses, evidence-backed MDX case studies, downloadable resumes, light/dark themes and static hosting headers.

## Run locally

Use Node 24 LTS and npm. Run `npm ci`, `npm run build`, then `npm start`. Open http://127.0.0.1:3000. For development use `npm run dev`.

On this Windows machine the npm shim is broken; invoke npm using `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run build` (replace `run build` with the desired npm arguments).

## Content and checks

Edit profile, skills and resume mappings in `content/portfolio.json`. Project files in `content/projects/` contain JSON frontmatter followed by MDX. The schema validates evidence references and publication rules. Only Tier A projects get case-study routes; candidate work stays private. Never put untrusted MDX in this repository: it runs during the build.

Run `npm run validate:content`, `npm run lint`, `npm run typecheck`, `npm run format:check`, and `npm test` after a production build. Tests use Edge locally and Chromium in CI. `PORT=3100` is reserved for the test server.

## Deploy

See [Netlify setup](docs/NETLIFY_SETUP.md) for the GitHub connection, root directory and secret environment variable settings.

Netlify configuration builds `out/` using Node 24. Set `NEXT_PUBLIC_SITE_URL` to the confirmed HTTPS production origin before building for release; preview builds intentionally disable indexing. The build creates social images, a sitemap, CSP hashes, security headers and legacy URL redirects. Other static hosts must apply equivalent rules from `out/_headers` and `out/_redirects`. A bare file server does not apply them automatically; the included local server does.

The portfolio itself requires no external fonts or analytics. The optional chat uses a server-only Groq key in `.env`; see `docs/CHATBOT.md`. The circular chat button appears on every page and uses `/api/chat` served locally or by a Netlify Function. Resume files are the supplied originals. AI and GenAI share the AI Engineer PDF as requested. The SDE PDF still contains the old TechSonix end date; the website uses the confirmed January–March 2025 dates.

Original components live in `legacy/` and the baseline Git commit. Progress and unresolved source questions are in `docs/TASKS.md` and `docs/CONTENT_TODO.md`. See `docs/FINAL_REPORT.md` for verification and delivery limits.
