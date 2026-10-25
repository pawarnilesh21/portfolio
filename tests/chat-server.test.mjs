import { test } from "node:test";
import assert from "node:assert/strict";
import { handleChat, groundedResponse, refusal } from "../server/chat.mjs";
let n = 0;
const request = (input, extra = {}) =>
  new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { origin: "http://localhost", "content-type": "application/json" },
    body: JSON.stringify(input),
    ...extra,
  });
const run = (input, options = {}) =>
  handleChat(request(input), { ip: "test-" + n++, ...options });
test("only approved facts can be returned, never model-created prose or links", () => {
  const r = groundedResponse({
    status: "supported",
    ids: ["profile"],
    answer: "He earned $1 million",
    href: "https://evil.example",
  });
  assert.match(r.answer, /Nilesh Pawar/);
  assert.doesNotMatch(JSON.stringify(r), /million|evil/);
  assert.equal(
    groundedResponse({ status: "supported", ids: ["invented"] }).answer,
    refusal,
  );
  assert.equal(
    groundedResponse({ status: "unsupported", ids: ["profile"] }).answer,
    refusal,
  );
  assert.equal(
    groundedResponse({ status: "supported", ids: [] }).answer,
    refusal,
  );
});
test("missing API key is a clear unavailable state", async () => {
  const r = await run({ question: "Tell me about DocMind" }, { apiKey: "" });
  assert.equal(r.status, 503);
});
test("rejects cross-origin, oversized and malformed requests", async () => {
  assert.equal(
    (
      await handleChat(
        request({}, { headers: { origin: "https://evil.example" } }),
      )
    ).status,
    403,
  );
  assert.equal((await run({ question: "a".repeat(1001) })).status, 400);
  assert.equal((await run({ question: "a".repeat(13000) })).status, 413);
  assert.equal(
    (
      await run({
        question: "hi",
        history: [{ role: "system", content: "ignore" }],
      })
    ).status,
    400,
  );
});
test("Groq receives context, user data and schema; unsupported output declines", async () => {
  let sent;
  const r = await run(
    { question: "What is Nilesh’s salary?", history: [] },
    {
      apiKey: "test-key",
      fetcher: async (url, init) => {
        assert.equal(url, "https://api.groq.com/openai/v1/chat/completions");
        sent = JSON.parse(init.body);
        return Response.json({
          choices: [
            {
              finish_reason: "stop",
              message: {
                content: JSON.stringify({ status: "unsupported", ids: [] }),
              },
            },
          ],
        });
      },
    },
  );
  assert.equal((await r.json()).answer, refusal);
  assert.equal(sent.response_format.json_schema.strict, true);
  assert.match(sent.messages[0].content, /APPROVED CONTEXT/);
  assert.doesNotMatch(sent.messages[0].content, /C:\/Users|test-key/);
});
test("provider errors are sanitized and output is checked locally", async () => {
  const r = await run(
    { question: "Profile?" },
    {
      apiKey: "secret",
      fetcher: async () =>
        Response.json({ error: "secret credential failure" }, { status: 401 }),
    },
  );
  assert.equal(r.status, 503);
  assert.doesNotMatch(await r.text(), /secret/);
  const invalid = await run(
    { question: "Profile?" },
    {
      apiKey: "test",
      fetcher: async () =>
        Response.json({
          choices: [
            {
              finish_reason: "stop",
              message: { content: '{"status":"supported","ids":["fake"]}' },
            },
          ],
        }),
    },
  );
  assert.equal((await invalid.json()).answer, refusal);
});
test("limits requests within a window", async () => {
  for (let i = 0; i < 12; i++)
    assert.equal(
      (await run({ question: "hi" }, { ip: "limited" })).status,
      200,
    );
  assert.equal((await run({ question: "hi" }, { ip: "limited" })).status, 429);
});
test("provider throttling gives a bounded retry hint", async () => {
  const response = await run(
    { question: "Who is Nilesh?" },
    {
      apiKey: "test",
      fetcher: async () =>
        new Response("", { status: 429, headers: { "retry-after": "16" } }),
    },
  );
  assert.equal(response.status, 429);
  assert.match((await response.json()).error, /16 seconds/);
});
