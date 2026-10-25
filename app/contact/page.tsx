import { LegacyRoute } from "@/components/legacy-route";
export const metadata = {
  title: "Contact",
  robots: { index: false, follow: true },
};
export default function Page() {
  return <LegacyRoute section="contact" title="Contact" />;
}
