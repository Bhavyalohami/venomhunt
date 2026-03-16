import { HomePage, SiteFrame } from "../src/App";
import StructuredData from "../src/components/StructuredData";
import { toNextMetadata } from "../src/seo/nextMetadata";
import { getHomeSeo } from "../src/seo/routes";

const seo = getHomeSeo("/");

export const metadata = toNextMetadata(seo);
export const revalidate = 86400;

export default function Page() {
  return (
    <>
      <StructuredData entries={seo.structuredData} />
      <SiteFrame isHomePage>
        <HomePage disableClientSeo />
      </SiteFrame>
    </>
  );
}
