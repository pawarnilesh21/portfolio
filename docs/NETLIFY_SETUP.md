# Connect GitHub to Netlify

Repository: https://github.com/pawarnilesh21/portfolio

1. In Netlify, import this existing GitHub repository and select the `main` branch.
2. Use the repository root as the base directory. Remove any old `client` or `server` base/package-directory setting.
3. The checked-in `netlify.toml` supplies build command `npm run build`, publish directory `out`, functions directory `netlify/functions`, Node 24 and static-export adapter settings.
4. Add `GROQ_API_KEY` as a secret environment variable available to **Functions**. Never prefix it with `NEXT_PUBLIC_`. Add `GROQ_MODEL=openai/gpt-oss-20b` for Functions, or leave it unset to use that default. Do not upload `.env`.
5. Once Netlify assigns the site's domain, add `NEXT_PUBLIC_SITE_URL=https://YOUR-SITE.netlify.app` (or your confirmed custom domain) for **Builds**, then redeploy. This enables indexing and generates the sitemap/social URLs for the real domain. Leave previews without a production origin if they should remain noindex.
6. Verify the home page, a `/projects/docmind/` case-study route, resume downloads, theme switching, and the circular chatbot. Ask a documented question and an unsupported question.

GitHub Actions runs formatting, lint, content validation, chat server tests, build, typecheck and browser tests on pushes and pull requests. No Groq key is required for CI; those tests mock the provider. Netlify's Git integration automatically builds/deploys changes pushed to `main` after the repository is connected. These are separate pipelines: GitHub Actions does not gate Netlify deploys by default. Enable a required-check deployment policy in your hosting workflow if you need that gate.

The repository's previous `client/server` implementation remains available in Git history. The current app is at the root. A copy of the earlier local portfolio components is under `legacy/` and excluded from the active build.
## If greetings work but project answers fail

`GROQ_MODEL` is a public model identifier, not a secret. A confirmed deployment failure flagged its value (`openai/gpt-oss-20b`) in documentation and the server default after it was configured as secret in Netlify. `netlify.toml` excludes only `GROQ_MODEL` from value scanning using `SECRETS_SCAN_OMIT_KEYS`. API-key scanning and smart detection remain enabled; no paths are excluded. When creating this optional variable, leave “Contains secret values” unchecked. Keep `GROQ_API_KEY` secret.

In Project configuration → Environment variables, confirm `GROQ_API_KEY` has a nonempty Production value available to Functions (or all scopes). A build-only value is insufficient. Trigger a new production deploy after changing it; an existing function deployment will not acquire the new value automatically. Do not share the key in screenshots or chat.

After deploying the latency update, `/api/chat` responses include `X-Chat-Version: latency-v1`. `CHAT_NOT_CONFIGURED` means the function still cannot see the key. `PROVIDER_UNAVAILABLE` with `provider-auth` in function logs means Groq rejected authentication. The log metadata never includes the key. See [Netlify documentation](https://docs.netlify.com/build/functions/environment-variables/).
