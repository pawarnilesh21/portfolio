import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (file.endsWith(".html")) files.push(file);
  }
}
walk("out");
const hashes = new Set();
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (!/\bsrc=/.test(match[1]) && match[2])
      hashes.add(
        "'sha256-" +
          crypto.createHash("sha256").update(match[2]).digest("base64") +
          "'",
      );
  }
}
const csp =
  "default-src 'self'; script-src 'self' " +
  [...hashes].join(" ") +
  "; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'none'; object-src 'none'";
const headers = {
  "Content-Security-Policy": csp,
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-Frame-Options": "DENY",
};
fs.writeFileSync(
  "out/_headers",
  "/*\n" +
    Object.entries(headers)
      .map(([k, v]) => "  " + k + ": " + v)
      .join("\n") +
    "\n/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable\n",
);
fs.writeFileSync("out/security-headers.json", JSON.stringify(headers));
const redirects = {
  about: "about",
  skills: "skills",
  achievements: "education",
  contact: "contact",
};
fs.writeFileSync(
  "out/_redirects",
  Object.entries(redirects)
    .flatMap(([r, s]) => [
      "/" + r + " /#" + s + " 301!",
      "/" + r + "/ /#" + s + " 301!",
    ])
    .join("\n") + "\n",
);
console.log(
  "Static hosting headers, CSP hashes and permanent redirects generated.",
);
