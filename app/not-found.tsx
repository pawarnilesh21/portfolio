import Link from "next/link";
export default function NotFound() {
  return (
    <section className="wrap route-fallback">
      <span className="eyebrow">404 / NOT FOUND</span>
      <h1>A different route.</h1>
      <p>That page isn’t here. The projects are a good place to start.</p>
      <Link href="/#work" className="button primary">
        Explore the work ↗
      </Link>
    </section>
  );
}
