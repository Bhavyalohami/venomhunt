import { blogPosts, getBlogWordCount, getReadTimeLabel } from "../lib/blogs";

export const SITE_NAME = "Venom Hunt";
export const SITE_URL = "https://venomhunt.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/vh-02.png`;
export const DEFAULT_TITLE =
  "Venom Hunt | Graphic Designer in Jaipur for Logos, Branding, and Creative Design";
export const DEFAULT_DESCRIPTION =
  "Venom Hunt is a Jaipur-based graphic design studio creating logos, brand identities, illustrations, and marketing visuals for ambitious businesses.";
export const DEFAULT_KEYWORDS =
  "graphic designer in jaipur, creative agency in jaipur, logo designer in jaipur, branding studio jaipur, visual identity designer jaipur";

export function toAbsoluteUrl(path = "/") {
  if (!path || path === "/") return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildBreadcrumbList(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: toAbsoluteUrl("/vh-02.png"),
    },
    description: DEFAULT_DESCRIPTION,
    email: "venomhunt123@gmail.com",
    telephone: "+91-9950531145",
    areaServed: ["Jaipur", "Rajasthan", "India"],
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "en-IN",
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@id": `${SITE_URL}#organization`,
    },
  };
}

export function getHomePageStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    image: DEFAULT_OG_IMAGE,
    description: DEFAULT_DESCRIPTION,
    areaServed: {
      "@type": "City",
      name: "Jaipur",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.instagram.com/venomhunt_fiverr/",
      "https://www.youtube.com/@VenomSayss",
      "https://in.pinterest.com/venom_hunt/",
      "https://www.fiverr.com/venom_hunt",
    ],
  };
}

export function getBlogCollectionStructuredData(posts = blogPosts) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Venom Hunt Blog",
    description:
      "SEO-focused branding and design guides for businesses looking for a graphic designer or creative agency in Jaipur.",
    url: toAbsoluteUrl("/blogs"),
    publisher: {
      "@id": `${SITE_URL}#organization`,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.createdAt,
      dateModified: post.createdAt,
      image: [toAbsoluteUrl(post.image)],
      url: toAbsoluteUrl(`/blogs/${post.slug}`),
      author: {
        "@type": "Organization",
        name: post.author,
      },
    })),
  };
}

export function getBlogPostingStructuredData(post) {
  const minutes = Number.parseInt(getReadTimeLabel(post), 10) || 2;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: toAbsoluteUrl(`/blogs/${post.slug}`),
    headline: post.title,
    description: post.description,
    image: [toAbsoluteUrl(post.image)],
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    articleSection: post.category,
    wordCount: getBlogWordCount(post),
    timeRequired: `PT${minutes}M`,
    keywords: post.keywords.join(", "),
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@id": `${SITE_URL}#organization`,
    },
  };
}
