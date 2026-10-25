"use client";
import { useEffect } from "react";
export function LegacyRoute({
  section,
  title,
}: {
  section: string;
  title: string;
}) {
  useEffect(() => {
    window.location.replace("/#" + section);
  }, [section]);
  return (
    <section className="wrap route-fallback">
      <span className="eyebrow">PORTFOLIO V2</span>
      <h1>{title}</h1>
      <p>This section now lives on the main portfolio.</p>
      <a href={"/#" + section} className="button primary">
        Continue to {title} ↗
      </a>
    </section>
  );
}
