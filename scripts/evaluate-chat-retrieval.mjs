import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import cases from "../tests/chat-retrieval-cases.json" with { type: "json" };
const modulePath = process.argv[2] || "server/chat-knowledge.mjs";
const { selectContext } = await import(pathToFileURL(path.resolve(modulePath)));
const records = cases.map(
  ({ question, history = [], expected, onlyProject }) => {
    const retrieved = selectContext(question, history).map((f) => f.id);
    return {
      question,
      expected,
      retrieved,
      pass:
        expected.every((id) => retrieved.includes(id)) &&
        (!onlyProject ||
          retrieved.every((id) => id.startsWith(onlyProject + "-"))),
    };
  },
);
const report = {
  method:
    "Fixed retrieval regression set; expected evidence within eight passages, plus project isolation where specified. Not end-to-end answer accuracy.",
  passed: records.filter((r) => r.pass).length,
  total: records.length,
  records,
};
console.log(JSON.stringify(report, null, 2));
if (process.argv[3])
  fs.writeFileSync(process.argv[3], JSON.stringify(report, null, 2) + "\n");
if (report.passed !== report.total) process.exitCode = 1;
