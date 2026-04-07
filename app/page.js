import LandingPage from "./home/LandingPage";
import StructuredData from "../src/components/StructuredData";
import { toNextMetadata } from "../src/seo/nextMetadata";
import { getHomeSeo } from "../src/seo/routes";

const seo = getHomeSeo("/");

export const metadata = toNextMetadata(seo);

export default function Page() {
  return (
    <>
      <StructuredData entries={seo.structuredData} />
      <LandingPage />
    </>
  );
}
