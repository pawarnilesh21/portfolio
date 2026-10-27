# Local chatbot grounding upgrade — 27 October 2026

Initially prepared and tested locally. The owner approved publishing this upgrade with commit message "Chatbot Improve" on 27 October 2026. Netlify publication must be confirmed separately after the GitHub push.

## Changes

- Replaced flat keyword scoring with precomputed document-frequency-weighted matching. Rare terms carry more weight, and reviewed vocabulary expansions improve education, awards, location, work preferences and project-limit queries.
- Added alternate spellings for known entities, such as Doc Mind, Resolve Desk and Tech Sonix. Explicit project questions retrieve only that project's evidence. Comparisons distribute the eight available passages across named subjects.
- Resolve project follow-ups using the nearest named topic in the last two questions. A new named project supersedes the old topic. Missing or ambiguous singular project references prompt clarification without calling Groq.
- Added exact FAQs for approved location, college, CGPA, expected graduation, diploma percentage, achievements and remote preference. No new student facts, private records or unverified claims were added. Appended questions/instructions cannot use these exact-match shortcuts.
- Strengthened the evidence-selection prompt: distinguish current education from graduation, familiarity from implemented skills, local code from deployed features, and explicit limitations from missing evidence. Every factual part of a multi-part question needs support.
- Reject null, extra-field and wrong-project provider output. Render only approved passages and fixed source links; arbitrary model-authored prose still cannot reach the visitor.
- Hash the actual context content for cache invalidation, so correcting a fact invalidates cached selections even if the content date was not changed.

## Evaluation

The fixed 24-case retrieval regression set improved from 15/24 to 24/24. It checks whether expected passages are present in the eight-passage context, plus project isolation for selected follow-ups. This is a development regression set, not a held-out accuracy benchmark. Raw results are under `docs/evidence/chat-quality-retrieval-*.json`.

The opt-in live evaluation uses the local handler, real Groq and disabled answer caching. It checks expected source IDs, refusals and clarification. The initial run included one false refusal and three provider rate-limit failures; it is retained as `chat-quality-live-initial.json`. The final paced run passed 14/14 cases and is recorded separately as `chat-quality-live-local.json`. All 17 server regression tests passed; Browser checks initially passed all 11 cases but stalled during managed-server cleanup. A single-worker run against the existing preview passed 10 cases; the remaining case exposed a hardcoded test URL (3100). That test now uses the configured baseURL, and its targeted rerun passed (1/1), completing all 11 browser checks across the final runs. This is test portability, not a production UI change. These checks do not prove perfect semantic relevance or universal prompt-injection resistance.

Commands:

```powershell
node --test tests/chat-server.test.mjs
node scripts/evaluate-chat-retrieval.mjs
node scripts/evaluate-chat-quality.mjs docs/evidence/chat-quality-live-local.json
```

The final command loads the existing local `.env`, consumes Groq quota, and spaces cases 7.5 seconds apart. It never prints credentials. GitHub CI does not run real-provider evaluations.

## Review and limitations

Use http://127.0.0.1:3000/ while the local server is running. The endpoint identifies itself as `grounding-v2`. Try college/CGPA questions, alternate project spellings, a project follow-up, a question with a false premise, and an unsupported salary question.

Grounded answers remain approved excerpts, not fluent generated summaries. This preserves the strongest existing factual safeguard. Retrieval is lexical with vocabulary expansion, not vector RAG; unfamiliar paraphrases may still miss evidence. Only the last two successful questions are available for references. All facts reflect the reviewed portfolio sources, not fresh verification of external deployments. No new latency improvement is claimed for this accuracy-focused change.

No dependency, Next.js page, styling, resume or deployment configuration changes are included. A production frontend rebuild is unnecessary for these server-only changes; browser regression checks use the existing static export with the current local handler.





