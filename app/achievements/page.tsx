import { LegacyRoute } from "@/components/legacy-route";
export const metadata = {
  title: "Education & achievements",
  robots: { index: false, follow: true },
};
export default function Page() {
  return <LegacyRoute section="education" title="Education & achievements" />;
}
