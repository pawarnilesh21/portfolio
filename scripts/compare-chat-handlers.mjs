import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
if (fs.existsSync(".env")) process.loadEnvFile(".env");
const modules = await Promise.all(
  process.argv
    .slice(2, 4)
    .map((p) => import(pathToFileURL(path.resolve(p)).href)),
);
const output = process.argv[4];
const records = [];
for (let round = 0; round < 3; round++) {
  for (const [version, module] of modules.entries()) {
    let provider;
    const start = performance.now();
    const response = await module.handleChat(
      new Request("http://localhost/api/chat", {
        method: "POST",
        headers: {
          origin: "http://localhost",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          question: "How does DocMind work?",
          history: [],
        }),
      }),
      {
        ip: "paired-benchmark",
        cache: new Map(),
        fetcher: async (...args) => {
          const r = await fetch(...args);
          const data = await r.clone().json();
          provider = {
            status: r.status,
            promptTokens: data.usage?.prompt_tokens,
            completionTokens: data.usage?.completion_tokens,
            queueMs: data.usage?.queue_time * 1000,
            inferenceMs: data.usage?.total_time * 1000,
          };
          return r;
        },
      },
    );
    const data = await response.json();
    const record = {
      round,
      version: version ? "after" : "before",
      ms: Number((performance.now() - start).toFixed(2)),
      status: response.status,
      grounded:
        response.ok && data.sources?.some((s) => s.id.startsWith("docmind-")),
      sources: data.sources?.map((s) => s.id),
      provider,
    };
    records.push(record);
    console.log(JSON.stringify(record));
    fs.writeFileSync(
      output,
      JSON.stringify(
        {
          measuredAt: new Date().toISOString(),
          method:
            "Three interleaved before/after DocMind requests from the same host, same key/model, cache disabled, real Groq. Includes network to Groq; excludes Netlify. Small sample, not p95.",
          records,
        },
        null,
        2,
      ),
    );
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}
