# Chat latency investigation

## Confirmed findings

The deployed endpoint at https://pawarnilesh.netlify.app/api/chat returned a missing-key error for five of six requests in each baseline run. The greeting succeeded because it does not call Groq. These HTTP 503 durations are not successful answer benchmarks. The reported long timeout and failed fetch were not reproduced by these probes; a cold start or network problem remains unproven.

Adding a variable under Project configuration is the correct starting point. Its value must be available to Functions (or all scopes), in Production, and a new deploy must complete after the change. See [Netlify's environment-variable guidance](https://docs.netlify.com/build/functions/environment-variables/).

## Measured local results

Raw samples are in `evidence/chat-handler-before.json` and `evidence/chat-handler-after.json`. Same Windows host and real Groq key/model; measurements include handler execution and any Groq network request, but exclude browser, Netlify and network-to-site time. These are small sequential samples, not a load test or p95 estimate.

| Question | Before | After | Interpretation |
| --- | ---: | ---: | --- |
| Tell me about Nilesh | 627.83 ms | 2.15 ms | Median of three each; 625.68 ms / 99.66% reduction through approved local answers |
| How does DocMind work? | 1,966.72 ms | 2,170.06 ms | One uncached request each; 203.34 ms slower, no demonstrated improvement |
| Expected salary (refusal) | 717.71 ms | 712.95 ms | One each; difference too small to claim improvement |

Profile samples before: 976.35, 501.74, 627.83 ms. After: 24.57, 2.15, 1.22 ms. Profile responses retain the same approved source IDs. DocMind output tokens fell from 422 to 107, but that alone does not establish lower wall-clock latency.

## Module changes

- Knowledge: precompute the search index; ignore unrelated conversation history; retain history for reference questions. Exact profile/internship FAQs return reviewed passages without a provider request. Appended instructions do not match the FAQ shortcut.
- Groq: reduce prompt overhead, use low reasoning effort for the supported GPT-OSS models, and request three fixed evidence slots. Validate IDs and render only approved excerpts. Unsupported questions still receive a fixed refusal. See [Groq reasoning settings](https://console.groq.com/docs/reasoning).
- Cache: store only validated supported answers for five minutes, bounded to 200 entries per warm process, keyed by question, relevant history, context version, model and selected sources. This is not a shared cache across Netlify instances.
- Timeouts: provider budget reduced from 20 to 8 seconds; browser budget from 25 to 15 seconds. These are failure-wait ceilings, not measured response-time gains.
- Browser: prevent duplicate submissions, exclude failed questions from follow-up history, and recover cleanly from HTML gateway errors or fetch failures.
- Diagnostics: add response version/mode and Server-Timing headers; log timing/status metadata in Netlify without questions or keys. Distinguish missing configuration, rate limits, provider failure and incomplete output.

## Verification and remaining deployment work

Production export succeeded. All 12 server tests and 11 browser tests passed; typecheck, lint and formatting passed. Browser coverage includes four widths, themes, role lenses, resumes and chat recovery. Mock tests establish application behavior, not real-model accuracy across arbitrary questions.

Automatic approval review initially hit an account usage limit; it recovered on continuation. The additional benchmark completed: three interleaved uncached DocMind requests per version, same host/key/model. Before: 1229.82, 1337.59, 1309.36 ms; after: 529.36, 511.21, 471.56 ms. Medians: 1309.36 → 511.21 ms, a reduction of 798.15 ms (60.96%). All six responses returned approved DocMind sources, although the selected passages varied. See `evidence/chat-groq-comparison.json`. This small sample suggests a gain for this question, not a universal latency guarantee. The initial slower sample above is retained for transparency.

Code commit `805463d` was uploaded to GitHub main. After Netlify completes a deploy with the Functions key, run:

```powershell
node scripts/benchmark-chat.mjs https://pawarnilesh.netlify.app docs/evidence/chat-latency-after.json
```

Check that response headers identify `latency-v1`, supported answers have relevant citations, and no request returns `CHAT_NOT_CONFIGURED`. Deployment verification and a successful end-to-end before/after comparison remain pending; this report does not claim a Netlify speed improvement.

The first probe after push still reached the old handler (no version header), with five missing-key failures and one greeting success. It is saved as `evidence/chat-latency-deployment-pending.json`, not an after-deployment result. GitHub upload alone does not prove Netlify has published the new function.
