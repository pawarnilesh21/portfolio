import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Providers } from "@/components/providers";
import { PortfolioChat } from "@/components/portfolio-chat";
import { siteUrl, description } from "@/lib/site";
export const metadata: Metadata = {
  icons: { icon: "/icon.svg" },
  metadataBase: new URL(siteUrl || "http://127.0.0.1:3000"),
  title: {
    default: "Nilesh Pawar — Software & AI Engineer",
    template: "%s | Nilesh Pawar",
  },
  description,
  openGraph: {
    title: "Nilesh Pawar — Software & AI Engineer",
    description,
    type: "website",
    locale: "en_IN",
    images: ["/opengraph-image.png"],
  },
  twitter: { card: "summary_large_image" },
  robots: siteUrl
    ? { index: true, follow: true }
    : { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="top">
        <Providers>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <PortfolioChat />
        </Providers>
      </body>
    </html>
  );
}
