# Portfolio assistant

The bottom-right chat uses Groq as the inference provider (not xAI Grok). Default model: `openai/gpt-oss-20b`, which supports strict structured outputs. No SDK dependency is needed; the server uses fetch.

## Activate locally

1. Open `.env` in this repository. Paste the key after `GROQ_API_KEY=`. Never use a `NEXT_PUBLIC_` prefix for it and never paste it into chat or commit it.
2. Restart `node scripts/serve.mjs` (or `npm start`). The local server loads `.env` at startup. No rebuild is needed for a key change.
3. Open http://127.0.0.1:3000/ and click the circular chat button. Ask about DocMind, internships, education and unsupported topics such as salary or the weather.

`npm run dev` serves the Next.js static UI only; use `npm run build` followed by `npm start` to test the integrated chat endpoint. The API is not a Next.js route because this project uses static export.

## Context and grounding

Edit `content/chat-context.json` to maintain the single approved context file. It contains public profile facts and excerpts from existing portfolio case studies, including limitations and version distinctions. It excludes candidate projects, unpublished claims, private filesystem paths and secrets. First-person excerpts quote Nilesh rather than impersonating a new conversation with him. Review this file whenever portfolio content changes; it is deliberately not overwritten by builds.

The server ranks the approved context by question terms (including the last two questions for references), sends up to eight relevant passages capped at 6,000 text characters, plus the current question and up to six previous user questions to Groq. If no passage matches, it declines without an API call. This bounded retrieval reduces token use but may abstain on paraphrases it does not recognize. The model can return only a supported/unsupported decision and source IDs. The server independently checks the IDs and displays the complete approved passages and fixed source links, never model-authored answer text. Invalid evidence fails closed; out-of-context questions receive a fixed refusal. This prevents invented facts in free-form generated prose, but semantic source selection can still be wrong. No claim of perfect relevance or zero hallucination is made. Groq is not being fine-tuned; this is inference with supplied context.

Messages stay in browser memory until reload/clear. The app does not persist or log message bodies or keys. Questions and context are sent to Groq; its account data policy applies. Clear chat resets local history. Provider errors are sanitized, requests/timeouts/output are bounded, and the endpoint rejects cross-origin requests. The in-memory local throttle permits 12 requests per minute per IP; it resets on server restart and is not a distributed quota.

## Hosting

Netlify's `netlify/functions/chat.mjs` maps `/api/chat` to the shared server module and configures platform rate limiting. Set `GROQ_API_KEY` in the deployed function's environment (not browser/build-public variables). Keep Groq account spending limits appropriate for a public endpoint. Local live provider checks passed using the existing .env key. Netlify function deployment remains unverified. Static-only hosts need an equivalent server endpoint; uploading `out/` alone does not activate AI chat.

## Checks

`npm run test:chat` exercises server grounding, request validation, missing-key handling, sanitized upstream errors and throttling with mocked provider responses. `npm test` includes chat opening, focus restoration, source links, mobile fit and recoverable error UI. Mocked tests establish application behavior, not real-model factual relevance. Run node scripts/check-chat-live.mjs for three live checks (uses the server-side key and consumes Groq quota). The supported DocMind question, unsupported salary question, and unrelated instruction-override question passed on 25 October 2026. This small sample is not a broad model-quality benchmark.

References: [Groq structured outputs](https://console.groq.com/docs/structured-outputs), [Netlify function API](https://docs.netlify.com/build/functions/api/).
