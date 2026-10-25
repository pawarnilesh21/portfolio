import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createGzip } from "node:zlib";
import { handleChat } from "../server/chat.mjs";
if (fs.existsSync(".env")) process.loadEnvFile(".env");
const port = Number(process.env.PORT || 3000),
  root = path.resolve("out");
const headers = fs.existsSync(path.join(root, "security-headers.json"))
  ? JSON.parse(
      fs.readFileSync(path.join(root, "security-headers.json"), "utf8"),
    )
  : {};
const redirects = {
  about: "about",
  skills: "skills",
  achievements: "education",
  contact: "contact",
};
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".xml": "application/xml",
  ".ico": "image/x-icon",
};
http
  .createServer(async (req, res) => {
    for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/api/chat") {
      try {
        const request = new Request(
          "http://" + req.headers.host + "/api/chat",
          {
            method: req.method,
            headers: req.headers,
            ...(req.method !== "GET" && req.method !== "HEAD"
              ? { body: req, duplex: "half" }
              : {}),
          },
        );
        const response = await handleChat(request, {
          ip: req.socket.remoteAddress,
        });
        res.writeHead(response.status, Object.fromEntries(response.headers));
        res.end(await response.text());
      } catch {
        res
          .writeHead(400, { "Content-Type": "application/json" })
          .end(JSON.stringify({ error: "Invalid chat request." }));
      }
      return;
    }
    let pathname;
    try {
      pathname = decodeURIComponent(url.pathname);
    } catch {
      res.writeHead(400).end();
      return;
    }
    const redirect = redirects[pathname.replace(/^\/|\/$/g, "")];
    if (redirect) {
      res.writeHead(301, { Location: "/#" + redirect }).end();
      return;
    }
    let file = path.resolve(root, "." + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403).end();
      return;
    }
    try {
      if (fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    } catch {}
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.statusCode = 404;
      file = path.join(root, "404.html");
    }
    if (!fs.existsSync(file)) {
      res.end("Build the site first.");
      return;
    }
    res.setHeader(
      "Content-Type",
      types[path.extname(file)] || "application/octet-stream",
    );
    if (pathname.startsWith("/_next/static/"))
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    const compressible = /\.(html|js|css|json|svg|txt|xml)$/.test(file);
    if (compressible && /\bgzip\b/.test(req.headers["accept-encoding"] || "")) {
      res.setHeader("Content-Encoding", "gzip");
      res.setHeader("Vary", "Accept-Encoding");
      fs.createReadStream(file).pipe(createGzip()).pipe(res);
    } else {
      fs.createReadStream(file).pipe(res);
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log("Portfolio: http://127.0.0.1:" + port),
  );
