import Link from "next/link";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <Link href="/" className="wordmark">
          nilesh pawar<span>.</span>
        </Link>
        <span>Built with care. Kept honest.</span>
        <span className="mono">UPDATED OCT 2026 · © 2026</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
