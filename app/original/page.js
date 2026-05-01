import { HomePage, SiteFrame } from "../../src/App";
import StructuredData from "../../src/components/StructuredData";
import { toNextMetadata } from "../../src/seo/nextMetadata";
import { getHomeSeo } from "../../src/seo/routes";

const seo = getHomeSeo("/original/");

export const metadata = toNextMetadata({
  ...seo,
  title: "Venom Hunt Original Design",
});

export default function OriginalDesignPage() {
  return (
    <>
      <StructuredData entries={seo.structuredData} />
      <SiteFrame isHomePage>
        <HomePage disableClientSeo />
      </SiteFrame>
    </>
  );
}
