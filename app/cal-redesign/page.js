import LandingPage from "../home/LandingPage";
import StructuredData from "../../src/components/StructuredData";
import { toNextMetadata } from "../../src/seo/nextMetadata";
import { getHomeSeo } from "../../src/seo/routes";

const seo = getHomeSeo("/cal-redesign/");

export const metadata = toNextMetadata({
  ...seo,
  title: "Venom Hunt Cal Design",
});

export default function CalRedesignPage() {
  return (
    <>
      <StructuredData entries={seo.structuredData} />
      <LandingPage />
    </>
  );
}
