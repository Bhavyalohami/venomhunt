import { notFound } from "next/navigation";

import { BlogPostPage, SiteFrame } from "../../../src/App";
import StructuredData from "../../../src/components/StructuredData";
import { blogPosts } from "../../../src/lib/blogs";
import { toNextMetadata } from "../../../src/seo/nextMetadata";
import { getBlogPostSeo } from "../../../src/seo/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) {
    return toNextMetadata(getBlogPostSeo(params.slug));
  }

  return toNextMetadata(getBlogPostSeo(post.slug, `/blogs/${post.slug}`));
}

export default function Page({ params }) {
  const post = blogPosts.find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
  }

  const seo = getBlogPostSeo(post.slug, `/blogs/${post.slug}`);

  return (
    <>
      <StructuredData entries={seo.structuredData} />
      <SiteFrame isHomePage={false}>
        <BlogPostPage slug={post.slug} disableClientSeo />
      </SiteFrame>
    </>
  );
}
