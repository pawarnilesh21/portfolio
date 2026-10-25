import { LegacyRoute } from "@/components/legacy-route";
export const metadata = {
  title: "Skills",
  robots: { index: false, follow: true },
};
export default function Page() {
  return <LegacyRoute section="skills" title="Skills" />;
}
