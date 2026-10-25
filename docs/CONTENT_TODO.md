# Content decisions and open questions

Updated: 2026-10-25. No unresolved claim is silently promoted to verified content.

## Confirmed by the user in this chat

- TechSonix: **Jan 2025–Mar 2025**. The SDE PDF's February end date is superseded by this confirmation.
- Preferred work arrangement: **remote**. Relocation/on-site/hybrid availability is not claimed.
- AI and GenAI download: **NileshPawar_AiEngineerResume.pdf**. This supersedes the earlier intention to supply a separate GenAI file.
- Keep inventory P1–P5 priorities and the specified role-lens ordering.

## Reconciliation policy

All four resumes agree on expected graduation **2027**, diploma **2024 / 90.29%**, and CGPA **7**. The old portfolio's 2022 dates/93.06% are excluded from proposed content. Use the actual LinkedIn link from the AI resume; do not carry forward the old site's different handle or the SDE PDF placeholder. The primary AI resume is preferred, but repository contradictions stay explicit. No source PDFs were edited.

Claims carry source IDs, verification state, publication flags and notes in content/portfolio.json. Historical test runs include dates and scope; a source's report is not a new test result. “Familiar” means resume-listed without linked reviewed implementation evidence. Local code is not proof that the public demo has those features.

## Open TODO register

### profile-evidence — Profile

TODO(user): Confirm public internship certificate/LOR and achievement credential links; confirm CGPA scale. Resumes agree on expected 2027 and diploma 90.29% in 2024; old website says 93.06%/2022.

Hold back: Credential links and any grade scale beyond the stated CGPA 7.

### sde-pdf — Resume

TODO(user): Correct SDE PDF: TechSonix ends March 2025 (user-confirmed), replace LinkedIn placeholder, reconcile older project claims.

Hold back: Publishing the existing SDE PDF as fully reconciled.

### deploy — Deployment

TODO(user): Confirm final hosting account/domain; existing resume links to pawarnilesh.netlify.app, ownership and redeploy settings not yet verified.

Hold back: Production canonical URL and deployment.

### internship-metrics — Experience

TODO(user): Add measurable outcomes for both internships, if recorded; supply TechKing work mode. Do not manufacture percentages.

Hold back: Metric-backed internship claims and TechKing work mode.

### investify-version — Investify

TODO(user): Confirm whether case study should document the newer local version or currently public version. Public backend uses mock market data; newer local code uses provider integrations. Publish matching source only in a separately authorized project task.

Hold back: Treating local improvements as publicly deployed.

### investify-auth — Investify

TODO(user): Reconcile primary AI resume cookie/CSRF description with current local revocable bearer JWT sessions and older JWT/RBAC resume descriptions. Keep generic authentication copy until confirmed.

Hold back: Cookie-session, CSRF, three-role RBAC claims.

### investify-metrics — Investify

TODO(user): Reconcile 37 tests in AI resume with newer local verification counts; provide measured latency/users if available. Never reuse live landing-page assets/users/returns figures without evidence.

Hold back: Current aggregated test counts and product-success metrics.

### investify-demo — Investify

TODO(user): Provide approved demo access or a read-only walkthrough; confirm backend host and deployed commit. Live landing page alone does not verify protected flows.

Hold back: Backend/live-feature guarantees.

### blog-identity — AI Blog Generator

TODO(user): Confirm whether BlogStack and AI-Enable-Blog-Generator are intended as one project or distinct versions. Public code does not prove nested comments, likes or bookmarking.

Hold back: BlogStack-only features on the AI Blog Generator case study.

### blog-evaluation — AI Blog Generator

TODO(user): Add recorded generation quality checks, model availability check, latency/cost, retries/rate limits and a guest walkthrough; current code calls gemini-2.5-flash. Confirm backend host.

Hold back: Evaluation, model reliability, production rate limiting and visitor-access claims.

### hms-scope — HMS

TODO(user): Confirm separate backend repository if one exists. Current repository is a frontend state demo with bundled credentials, mock doctors/beds and in-memory data.

Hold back: MERN/backend, secure authentication and server real-time queue claims.

### eco-repo — ECO-BIN

TODO(user): Supply repository and contribution details. Confirm message delivery without sending a real message; only static landing scope verified.

Hold back: SQLite/booking/pickup/backend claims.

### dining-scope — Dining Master

TODO(user): Confirm scope and attribution. Public repository has no SQLite/admin/order backend. Correct broken contacts/assets in a separate project task.

Hold back: Restaurant management/backend claims.

### docmind-version — DocMind

TODO(user): Confirm use of current pgvector version over older ChromaDB resume; code supports pgvector. Keep superseded stack claims suppressed.

Hold back: Mixing ChromaDB and pgvector into one architecture.

### docmind-metrics — DocMind

TODO(user): Confirm historical date labels: 38 tests/78% were Sept 14; Sept 29 record has 52 passed, 3 skipped, 77%, different DB scope. Add representative RAG quality/latency/cost evaluation before claiming it.

Hold back: Current unlabeled counts or statistically meaningful answer-quality claims.

### resolvedesk-repo — ResolveDesk

TODO(user): Provide/publish a reviewable repository or approved demo recording; local implementation exists but no public repo was found.

Hold back: Public code link; never fabricate a GitHub URL.

### resolvedesk-eval — ResolveDesk

TODO(user): Reconcile resume's completed LangSmith evaluation claim with PHASES.md showing final live evaluation/handoff unfinished.

Hold back: Completed LangSmith evaluation, trace results and measured latency/token claims.

### study-version — StudyForge

TODO(user): Confirm StudyForge/AI Notes Generator identity and Streamlit versus React/Node resume stack. Repair stale README provider/setup and missing dotenv/PDF module requirements in the project repo.

Hold back: React/Node architecture, clean-clone reproducibility, evaluation claims.

### syncboard-version — SyncBoard

TODO(user): Provide the actual SyncBoard repository/live link or confirm its relationship to the JS Socket.IO candidate-guide repository. Verify TS/Zustand/Zod/offline-queue claims there.

Hold back: Advanced SyncBoard features and deployment claims.

### case-study-artifacts — Case studies

TODO(user): Provide approved screenshots/video, ownership details, actual decision rationale and missing metrics for each featured project. Architecture diagrams must follow the verified version.

Hold back: Invented trade-offs, visual results, outcomes or unverified roles.


## Nonblocking implementation policy

Build the site using only safe supported copy. Missing metrics stay in this register rather than becoming fake numbers. Do not expose internal TODO text to recruiters; omit the unsupported statistic or describe a limitation plainly. Generic internship bullets may ship while metrics remain missing. ResolveDesk can be described from local source, but its public repository button stays absent until a URL is supplied. SyncBoard stays out of the featured list until the matching code is confirmed. Missing production host/domain blocks publication, not local development.

