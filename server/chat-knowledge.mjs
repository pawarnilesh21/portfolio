import context from "../content/chat-context.json" with { type: "json" };
export const refusal =
  "I’m not able to answer that from the information in Nilesh’s portfolio. Please ask about his documented projects, experience or education, or contact him directly.";
const facts = new Map(context.facts.map((f) => [f.id, f]));
const stopWords = new Set(
  "the a an is are was were be been to of in on at for and or with me tell about how what which who his he does do can you your i it this that please my work".split(
    " ",
  ),
);
const terms = (text) =>
  (text.toLowerCase().match(/[a-z0-9]+/g) || [])
    .filter((t) => t.length > 2 && !stopWords.has(t))
    .map((t) => t.replace(/s$/, ""));
const index = context.facts.map((f) => ({
  f,
  title: new Set(terms(f.title + " " + f.id)),
  text: new Set(terms(f.text)),
}));
export const contextVersion = context.updatedAt;
export function contextualHistory(question, history) {
  return /\b(it|its|they|their|them|that|those|this|he|his|him)\b/i.test(
    question,
  )
    ? history.slice(-2)
    : [];
}
export function selectContext(question, history = []) {
  const current = new Set(terms(question));
  if (current.has("experience")) current.add("internship");
  if (current.has("study") || current.has("college")) current.add("education");
  const previous = new Set(
    terms(contextualHistory(question, history).join(" ")),
  );
  const ranked = index
    .map(({ f, title, text }) => {
      let score = [...current].reduce(
        (s, t) => s + (title.has(t) ? 8 : text.has(t) ? 2 : 0),
        0,
      );
      score += [...previous].reduce(
        (s, t) => s + (title.has(t) ? 4 : text.has(t) ? 1 : 0),
        0,
      );
      if (current.has("project") && f.id.endsWith("-overview")) score += 10;
      return { f, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
  let size = 0;
  return ranked
    .slice(0, 8)
    .map((r) => r.f)
    .filter((f) => {
      size += f.text.length;
      return size <= 6000;
    });
}
export function groundedResponse(selection) {
  if (
    selection?.status !== "supported" ||
    !Array.isArray(selection.ids) ||
    selection.ids.length < 1 ||
    selection.ids.length > 3 ||
    selection.ids.some((id) => !facts.has(id))
  )
    return { answer: refusal, sources: [] };
  const selected = [...new Set(selection.ids)].map((id) => facts.get(id));
  return {
    answer: selected.map((f) => f.text).join("\n\n"),
    sources: selected.map(({ id, title, href }) => ({ id, title, href })),
  };
}
const curated = new Map([
  ["tell me about nilesh", ["profile", "availability", "contact"]],
  ["tell me about nilesh pawar", ["profile", "availability", "contact"]],
  ["who is nilesh", ["profile", "availability", "contact"]],
  ["who is nilesh pawar", ["profile", "availability", "contact"]],
  ["what is his internship experience", ["techsonix", "techking"]],
  ["what is nilesh’s internship experience", ["techsonix", "techking"]],
  ["what is nilesh's internship experience", ["techsonix", "techking"]],
]);
export function curatedResponse(question) {
  // Exact complete questions only: extra instructions or claims still require evaluation.
  const normalized = question
    .trim()
    .toLowerCase()
    .replace(/[.!?]+$/, "")
    .replace(/\s+/g, " ");
  const ids = curated.get(normalized);
  return ids ? groundedResponse({ status: "supported", ids }) : null;
}
