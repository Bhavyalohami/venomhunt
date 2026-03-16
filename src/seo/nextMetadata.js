function parseRobots(robots = "index,follow") {
  const normalized = robots.toLowerCase();
  return {
    index: normalized.includes("index") && !normalized.includes("noindex"),
    follow: normalized.includes("follow") && !normalized.includes("nofollow"),
  };
}

export function toNextMetadata(seo) {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords ? seo.keywords.split(",").map((item) => item.trim()) : undefined,
    alternates: {
      canonical: seo.canonicalUrl,
    },
    robots: parseRobots(seo.robots),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonicalUrl,
      siteName: "Venom Hunt",
      type: seo.type === "article" ? "article" : "website",
      images: seo.image ? [{ url: seo.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: seo.image ? [seo.image] : undefined,
    },
  };
}
