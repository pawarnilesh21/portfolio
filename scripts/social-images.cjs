const fs = require("node:fs");
const sharp = require("sharp");
const esc = (s) =>
  s.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );
(async () => {
  fs.mkdirSync("public/og", { recursive: true });
  const entries = fs
    .readdirSync("content/projects")
    .filter((f) => f.endsWith(".mdx"))
    .map((f) =>
      JSON.parse(
        fs
          .readFileSync("content/projects/" + f, "utf8")
          .match(/^---\r?\n([\s\S]*?)\r?\n---/)[1],
      ),
    );
  entries.unshift({
    id: "home",
    title: "Backend systems.",
    focus: "Grounded AI. Built with intent.",
    category: "NILESH PAWAR / SOFTWARE & AI",
  });
  for (const p of entries) {
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#faf7f2"/><path d="M70 120h1060M70 530h1060" stroke="#dcdde5"/><text x="70" y="82" font-family="Arial" font-size="25" fill="#20263d" font-weight="bold">nilesh pawar.</text><text x="70" y="190" font-family="monospace" font-size="17" fill="#294fc9">' +
      esc(p.category) +
      '</text><text x="70" y="320" font-family="Arial" font-size="76" font-weight="bold" letter-spacing="-3" fill="#20263d">' +
      esc(p.title) +
      '</text><text x="70" y="395" font-family="Arial" font-size="35" fill="#294fc9">' +
      esc(p.focus) +
      '</text><text x="70" y="580" font-family="monospace" font-size="16" fill="#596075">PUNE, INDIA / OPEN TO REMOTE OPPORTUNITIES / 2027</text></svg>';
    await sharp(Buffer.from(svg))
      .png()
      .toFile(
        p.id === "home"
          ? "public/opengraph-image.png"
          : "public/og/" + p.id + ".png",
      );
  }
  console.log("Social images generated.");
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
