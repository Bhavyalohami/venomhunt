import { blogPosts } from "../lib/blogs";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  buildBreadcrumbList,
  getBlogCollectionStructuredData,
  getBlogPostingStructuredData,
  getHomePageStructuredData,
  getOrganizationJsonLd,
  getWebSiteJsonLd,
  toAbsoluteUrl,
} from "./site";

const ROUTE_KEYWORDS = {
  home: `${DEFAULT_KEYWORDS}, logo design jaipur, brand identity designer jaipur`,
  blogs:
    "graphic designer in jaipur blog, creative agency in jaipur blog, logo design jaipur tips, branding guides jaipur",
};

export function getHomeSeo(path = "/") {
  return {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    canonicalUrl: toAbsoluteUrl(path),
    image: DEFAULT_OG_IMAGE,
    type: "website",
    keywords: ROUTE_KEYWORDS.home,
    robots: "index,follow",
    structuredData: [getOrganizationJsonLd(), getWebSiteJsonLd(), getHomePageStructuredData()],
  };
}

export function getBlogsSeo(path = "/blogs") {
  return {
    title: "Venom Hunt Blog | Graphic Design, Branding, and Creative Agency Insights in Jaipur",
    description:
      "Read Venom Hunt articles on branding, logo design, and creative strategy for businesses looking for a graphic designer or creative agency in Jaipur.",
    canonicalUrl: toAbsoluteUrl(path),
    image: DEFAULT_OG_IMAGE,
    type: "website",
    keywords: ROUTE_KEYWORDS.blogs,
    robots: "index,follow",
    structuredData: [
      getBlogCollectionStructuredData(blogPosts),
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Blogs", path },
      ]),
    ],
  };
}

export function getBlogPostSeo(slug, path) {
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    const fallbackPath = path || `/blogs/${slug}`;
    return {
      title: "Blog Not Found | Venom Hunt",
      description:
        "This Venom Hunt article could not be found. Explore the latest Jaipur branding and design posts instead.",
      canonicalUrl: toAbsoluteUrl(fallbackPath),
      image: DEFAULT_OG_IMAGE,
      type: "website",
      robots: "noindex,follow",
      keywords: ROUTE_KEYWORDS.blogs,
    };
  }

  const postPath = path || `/blogs/${post.slug}`;
  return {
    title: `${post.title} | Venom Hunt`,
    description: post.description,
    canonicalUrl: toAbsoluteUrl(postPath),
    image: toAbsoluteUrl(post.image),
    type: "article",
    robots: "index,follow",
    keywords: [...post.keywords, post.category.toLowerCase(), "Venom Hunt"].join(", "),
    structuredData: [
      getBlogPostingStructuredData(post),
      buildBreadcrumbList([
        { name: "Home", path: "/" },
        { name: "Blogs", path: "/blogs" },
        { name: post.title, path: postPath },
      ]),
    ],
  };
}

export function getPreparedSeoRoutes() {
  const homeRoute = {
    path: "/",
    seo: getHomeSeo("/"),
    lastModified: blogPosts[0]?.createdAt || new Date().toISOString().split("T")[0],
    priority: "1.0",
    indexable: true,
    includeInSitemap: true,
  };

  const blogIndexRoute = {
    path: "/blogs",
    seo: getBlogsSeo("/blogs"),
    lastModified: blogPosts[0]?.createdAt || new Date().toISOString().split("T")[0],
    priority: "0.9",
    indexable: true,
    includeInSitemap: true,
  };

  const blogRoutes = blogPosts.map((post) => ({
    path: `/blogs/${post.slug}`,
    seo: getBlogPostSeo(post.slug),
    lastModified: post.createdAt,
    priority: "0.8",
    indexable: true,
    includeInSitemap: true,
  }));

  return [homeRoute, blogIndexRoute, ...blogRoutes];
}

export function getSitemapEntries() {
  return getPreparedSeoRoutes()
    .filter((route) => route.includeInSitemap && route.indexable)
    .map((route) => ({
      loc: route.seo.canonicalUrl,
      lastmod: route.lastModified,
      changefreq: route.path === "/" ? "weekly" : "daily",
      priority: route.priority,
    }));
}
