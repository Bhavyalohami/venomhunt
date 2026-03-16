import { getPreparedSeoRoutes } from "../src/seo/routes";

export default function sitemap() {
  return getPreparedSeoRoutes()
    .filter((route) => route.includeInSitemap && route.indexable)
    .map((route) => ({
      url: route.seo.canonicalUrl,
      lastModified: route.lastModified,
      changeFrequency: route.path === "/" ? "weekly" : "daily",
      priority: Number(route.priority),
    }));
}
