import fs from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";
if (fs.existsSync(".env")) process.loadEnvFile(".env");
const { handleChat } = await import(
  pathToFileURL(path.resolve(process.argv[2])).href
);
const output = process.argv[3];
const cases = [
  "Tell me about Nilesh",
  "hi",
  "How does DocMind work?",
  "Tell me about Nilesh",
  "What is Nilesh's expected salary?",
  "Tell me about Nilesh",
];
const records = [];
for (const [index, question] of cases.entries()) {
  const start = performance.now();
  let provider = null;
  const response = await handleChat(
    new Request("http://localhost/api/chat", {
      method: "POST",
      headers: {
        origin: "http://localhost",
        "content-type": "application/json",
      },
      body: JSON.stringify({ question, history: [] }),
    }),
    {
      ip: "benchmark",
      fetcher: async (url, init) => {
        const payload = JSON.parse(init.body),
          started = performance.now();
        const r = await fetch(url, init);
        const d = await r
          .clone()
          .json()
          .catch(() => ({}));
        provider = {
          ms: Math.round(performance.now() - started),
          status: r.status,
          requestBytes: Buffer.byteLength(init.body),
          model: payload.model,
          effort: payload.reasoning_effort || "default",
          promptTokens: d.usage?.prompt_tokens,
          completionTokens: d.usage?.completion_tokens,
          finishReason: d.choices?.[0]?.finish_reason,
        };
        return r;
      },
    },
  );
  const data = await response.json();
  const record = {
    index,
    question,
    ms: Number((performance.now() - start).toFixed(2)),
    status: response.status,
    success: response.ok && !!data.answer,
    sources: data.sources?.map((s) => s.id),
    error: data.error,
    provider,
    mode: response.headers.get("x-chat-mode"),
  };
  records.push(record);
  console.log(JSON.stringify(record));
  fs.writeFileSync(
    output,
    JSON.stringify(
      {
        measuredAt: new Date().toISOString(),
        method:
          "Same local Windows host calling the handler with real Groq requests; excludes Netlify/browser/network-to-site time.",
        records,
      },
      null,
      2,
    ),
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));
}
