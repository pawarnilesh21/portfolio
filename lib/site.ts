export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
export const description =
  "Nilesh Pawar — backend systems and grounded AI applications. Explore software engineering, RAG and agent projects, internships, and technical case studies.";
export const absolute = (path: string) =>
  siteUrl ? new URL(path, siteUrl).toString() : path;
