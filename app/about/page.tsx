import { LegacyRoute } from "@/components/legacy-route";
export const metadata = {
  title: "About",
  robots: { index: false, follow: true },
};
export default function Page() {
  return <LegacyRoute section="about" title="About" />;
}
