import { createHash } from "node:crypto";
import context from "../content/chat-context.json" with { type: "json" };
export const refusal =
  "I’m not able to answer that from the information in Nilesh’s portfolio. Please ask about his documented projects, experience or education, or contact him directly.";
const facts = new Map(context.facts.map((f) => [f.id, f]));
// Aliases improve recall without creating new portfolio facts.
const entities = [
  ["docmind", /\bdoc\s*mind\b/i],
  ["investify", /\binvestify\b/i],
  ["resolvedesk", /\bresolve\s*desk\b/i],
  ["hms-portal", /\b(hms(?:\s+portal)?|hospital management)\b/i],
  ["ai-blog-generator", /\b(ai blog generator|blog generator|blogstack)\b/i],
  ["studyforge", /\b(study\s*forge|ai notes generator)\b/i],
  ["dining-master", /\bdining master\b/i],
  ["eco-bin", /\beco[ -]?bin\b/i],
  ["techsonix", /\btech\s*sonix\b/i],
  ["techking", /\btech\s*king\b/i],
];
const mentioned = (text) =>
  entities.filter(([, re]) => re.test(text)).map(([id]) => id);
const belongs = (f, id) => f.id === id || f.id.startsWith(id + "-");
const stopWords = new Set(
  "the a an is are was were be been to of in on at for and or with me tell about how what which who his he does do can you your i it this that please my work nilesh pawar its they their them those has have did will would".split(
    " ",
  ),
);
const terms = (text) =>
  (text.toLowerCase().match(/[a-z0-9+#]+/g) || [])
    .filter((t) => t.length > 1 && !stopWords.has(t))
    .map((t) => (t.length > 4 ? t.replace(/s$/, "") : t));
const aliases = [
  [/\b(located|location|based|live|lives|city)\b/i, ["pune"]],
  [
    /\b(college|university|studying|studies|academic|education|degree)\b/i,
    ["education", "engineering"],
  ],
  [/\b(graduat\w*|cgpa|gpa|bachelor)\b/i, ["bachelor", "expected", "cgpa"]],
  [/\b(diploma|polytechnic|percentage)\b/i, ["diploma"]],
  [
    /\b(award\w*|won|hackathon|achievement\w*)\b/i,
    ["achievement", "techmantra"],
  ],
  [/\b(led|leadership|team size)\b/i, ["led", "member"]],
  [/\b(remote\w*|work preference)\b/i, ["preference", "remote"]],
  [/\b(contact|reach|email|recruiter)\b/i, ["contact"]],
  [/\b(experience|intern\w*)\b/i, ["internship"]],
  [/\b(database|storage|store|persist\w*)\b/i, ["stores", "data"]],
  [/\b(rag|retriev\w*)\b/i, ["retrieval", "augmented"]],
  [
    /\b(limit\w*|drawback\w*|shortcoming\w*)\b/i,
    ["limits", "scanned", "scope"],
  ],
  [
    /\b(deploy\w*|publicly|production)\b/i,
    ["deployment", "status", "code", "public"],
  ],
];
const index = context.facts.map((f) => ({
  f,
  title: new Set(terms(f.title + " " + f.id)),
  text: new Set(terms(f.text)),
}));
const frequency = new Map();
for (const { title, text } of index)
  for (const t of new Set([...title, ...text]))
    frequency.set(t, (frequency.get(t) || 0) + 1);
// Hash the actual content so editing a fact invalidates cached answers even if its date is unchanged.
export const contextVersion = createHash("sha256")
  .update(JSON.stringify(context))
  .digest("hex");
export function contextualHistory(question, history) {
  if (mentioned(question).length) return [];
  if (
    !/\b(it|its|they|their|them|that|those|this|he|his|him)\b/i.test(question)
  )
    return [];
  // The nearest named topic wins over an older topic. Never treat history as evidence.
  const recent = history.slice(-2);
  for (let i = recent.length - 1; i >= 0; i--)
    if (mentioned(recent[i]).length) return recent.slice(i);
  return recent;
}
export function clarificationResponse(question, history = []) {
  if (
    mentioned(question).length ||
    !/\b(it|its|that project|this project)\b/i.test(question)
  )
    return null;
  const topics = mentioned(contextualHistory(question, history).join(" "));
  if (topics.length === 1) return null;
  return {
    answer:
      topics.length > 1
        ? "Which project do you mean? Please include its name so I can use the correct sources."
        : "Which project are you asking about? Please include its name so I can check the portfolio sources.",
    sources: [],
  };
}
export function selectContext(question, history = []) {
  const current = new Set(terms(question));
  for (const [pattern, expansion] of aliases)
    if (pattern.test(question))
      for (const t of terms(expansion.join(" "))) current.add(t);
  const effectiveHistory = contextualHistory(question, history);
  const topics = mentioned(question).length
    ? mentioned(question)
    : mentioned(effectiveHistory.join(" "));
  const previous = new Set(terms(effectiveHistory.join(" ")));
  const ranked = index
    .filter(({ f }) => !topics.length || topics.some((id) => belongs(f, id)))
    .map(({ f, title, text }) => {
      const scoreTerms = (tokens) =>
        [...tokens].reduce((score, t) => {
          const rarity = Math.log(
            1 + index.length / (1 + (frequency.get(t) || 0)),
          );
          return score + rarity * (title.has(t) ? 3 : text.has(t) ? 1 : 0);
        }, 0);
      let score = scoreTerms(current) + scoreTerms(previous) * 0.25;
      if (topics.length) score += 1;
      if (current.has("project") && f.id.endsWith("-overview")) score += 8;
      return { f, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
  // Reserve evidence for each explicitly compared topic before filling the remaining slots.
  const chosen = [];
  if (topics.length > 1) {
    const groups = topics.map((id) => ranked.filter(({ f }) => belongs(f, id)));
    for (let depth = 0; depth < 8; depth++)
      for (const group of groups)
        if (group[depth] && !chosen.includes(group[depth]))
          chosen.push(group[depth]);
  }
  for (const row of ranked) if (!chosen.includes(row)) chosen.push(row);
  let size = 0;
  const result = [];
  for (const { f } of chosen) {
    if (result.length === 8) break;
    if (size + f.text.length > 6000) continue;
    size += f.text.length;
    result.push(f);
  }
  return result;
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
  ["where is nilesh located", ["profile"]],
  ["where is nilesh based", ["profile"]],
  ["where does nilesh live", ["profile"]],
  ["what is nilesh's education", ["education-0", "education-1"]],
  ["where does nilesh study", ["education-0"]],
  ["which college does nilesh attend", ["education-0"]],
  ["what is nilesh's cgpa", ["education-0"]],
  ["when will nilesh graduate", ["education-0"]],
  ["what is nilesh's diploma percentage", ["education-1"]],
  ["what are nilesh's achievements", ["achievement-0", "achievement-1"]],
  ["does nilesh prefer remote work", ["availability"]],
]);
export function curatedResponse(question) {
  // Exact complete questions only: extra instructions or claims still require evaluation.
  const normalized = question
    .trim()
    .toLowerCase()
    .replace(/’/g, "'")
    .replace(/[.!?]+$/, "")
    .replace(/\s+/g, " ");
  const ids = curated.get(normalized);
  return ids ? groundedResponse({ status: "supported", ids }) : null;
}
