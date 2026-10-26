import fs from "node:fs";
const origin = process.argv[2];
const output = process.argv[3];
if (!origin || !output || new URL(origin).protocol !== "https:")
  throw new Error(
    "Usage: node scripts/benchmark-chat.mjs https://site.example docs/evidence/output.json",
  );
const cases = [
  "Tell me about Nilesh",
  "hi",
  "How does DocMind work?",
  "Tell me about Nilesh",
  "How does DocMind work?",
  "Tell me about Nilesh",
];
const records = [];
for (const [index, question] of cases.entries()) {
  const start = performance.now();
  try {
    const r = await fetch(new URL("/api/chat", origin), {
      method: "POST",
      headers: {
        Origin: new URL(origin).origin,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, history: [] }),
      signal: AbortSignal.timeout(32_000),
    });
    const text = await r.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = {};
    }
    const record = {
      index,
      question,
      ms: Math.round(performance.now() - start),
      status: r.status,
      success: r.ok && !!data.answer,
      sources: data.sources?.map((s) => s.id) || [],
      error: data.error || (!r.ok ? text.slice(0, 200) : null),
      timing: r.headers.get("server-timing"),
      mode: r.headers.get("x-chat-mode"),
      version: r.headers.get("x-chat-version"),
      requestId: r.headers.get("x-nf-request-id"),
    };
    records.push(record);
    console.log(JSON.stringify(record));
  } catch (e) {
    const record = {
      index,
      question,
      ms: Math.round(performance.now() - start),
      success: false,
      error: e.name,
    };
    records.push(record);
    console.log(JSON.stringify(record));
  }
  fs.writeFileSync(
    output,
    JSON.stringify(
      {
        measuredAt: new Date().toISOString(),
        origin,
        method:
          "Sequential HTTP requests from the same Windows host; includes network and server time. Not a cold-start guarantee or field percentile.",
        records,
      },
      null,
      2,
    ),
  );
  await new Promise((resolve) => setTimeout(resolve, 1500));
}
