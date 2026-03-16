const fs = require("fs");
const path = require("path");

const SITE_URL = "https://venomhunt.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/vh-02.png`;

function toAbsoluteUrl(targetPath = "/") {
  if (!targetPath || targetPath === "/") return SITE_URL;
  if (targetPath.startsWith("http://") || targetPath.startsWith("https://")) return targetPath;
  return `${SITE_URL}${targetPath.startsWith("/") ? targetPath : `/${targetPath}`}`;
}

function loadBlogPosts() {
  const filePath = path.resolve(__dirname, "..", "src", "data", "blogs.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const posts = JSON.parse(raw);
  validatePosts(posts);
  return posts;
}

function getWordCount(post) {
  return post.body.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

function getReadTimeLabel(post) {
  const minutes = Math.max(2, Math.ceil(getWordCount(post) / 180));
  return `${minutes} min read`;
}

function buildRouteMeta(posts) {
  return [
    {
      path: "/",
      title: "Venom Hunt | Graphic Designer in Jaipur for Logos, Branding, and Creative Design",
      description:
        "Venom Hunt is a Jaipur-based graphic design studio creating logos, brand identities, illustrations, and marketing visuals for ambitious businesses.",
      canonicalUrl: toAbsoluteUrl("/"),
      image: DEFAULT_OG_IMAGE,
      type: "website",
      robots: "index,follow",
      keywords:
        "graphic designer in jaipur, creative agency in jaipur, logo designer in jaipur, branding studio jaipur, visual identity designer jaipur",
      structuredData: [
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Venom Hunt",
          url: SITE_URL,
          logo: DEFAULT_OG_IMAGE,
        },
        {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Venom Hunt",
          url: SITE_URL,
          areaServed: "Jaipur",
          description:
            "Jaipur-based graphic design studio for logos, branding, illustrations, and marketing creatives.",
        },
      ],
      lastModified: posts[0]?.createdAt || new Date().toISOString().split("T")[0],
      priority: "1.0",
    },
    {
      path: "/blogs",
      title: "Venom Hunt Blog | Graphic Design, Branding, and Creative Agency Insights in Jaipur",
      description:
        "Read Venom Hunt articles on branding, logo design, and creative strategy for businesses looking for a graphic designer or creative agency in Jaipur.",
      canonicalUrl: toAbsoluteUrl("/blogs"),
      image: DEFAULT_OG_IMAGE,
      type: "website",
      robots: "index,follow",
      keywords:
        "graphic designer in jaipur blog, creative agency in jaipur blog, logo design jaipur tips, branding guides jaipur",
      structuredData: [
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Venom Hunt Blog",
          url: toAbsoluteUrl("/blogs"),
          blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.createdAt,
            dateModified: post.createdAt,
            image: [toAbsoluteUrl(post.image)],
            url: toAbsoluteUrl(`/blogs/${post.slug}`),
          })),
        },
      ],
      lastModified: posts[0]?.createdAt || new Date().toISOString().split("T")[0],
      priority: "0.9",
    },
    ...posts.map((post) => ({
      path: `/blogs/${post.slug}`,
      title: `${post.title} | Venom Hunt`,
      description: post.description,
      canonicalUrl: toAbsoluteUrl(`/blogs/${post.slug}`),
      image: toAbsoluteUrl(post.image),
      type: "article",
      robots: "index,follow",
      keywords: post.keywords.join(", "),
      structuredData: [
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.createdAt,
          dateModified: post.createdAt,
          image: [toAbsoluteUrl(post.image)],
          mainEntityOfPage: toAbsoluteUrl(`/blogs/${post.slug}`),
          articleSection: post.category,
          wordCount: getWordCount(post),
          timeRequired: `PT${Number.parseInt(getReadTimeLabel(post), 10) || 2}M`,
          keywords: post.keywords.join(", "),
          author: {
            "@type": "Organization",
            name: post.author,
          },
        },
      ],
      lastModified: post.createdAt,
      priority: "0.8",
      post,
    })),
  ];
}

function getSitemapEntries(posts = loadBlogPosts()) {
  return buildRouteMeta(posts).map((route) => ({
    loc: route.canonicalUrl,
    lastmod: route.lastModified,
    changefreq: route.path === "/" ? "weekly" : "daily",
    priority: route.priority,
  }));
}

function validatePosts(posts) {
  const requiredFields = [
    "slug",
    "title",
    "description",
    "image",
    "createdAt",
    "author",
    "category",
    "keywords",
    "body",
  ];
  const seenSlugs = new Set();

  posts.forEach((post, index) => {
    requiredFields.forEach((field) => {
      if (
        post[field] == null ||
        (typeof post[field] === "string" && post[field].trim() === "") ||
        (Array.isArray(post[field]) && post[field].length === 0)
      ) {
        throw new Error(`Blog post at index ${index} is missing required field "${field}".`);
      }
    });

    if (!/^\d{4}-\d{2}-\d{2}$/.test(post.createdAt)) {
      throw new Error(`Blog post "${post.slug}" must use YYYY-MM-DD createdAt.`);
    }

    if (seenSlugs.has(post.slug)) {
      throw new Error(`Duplicate blog slug detected: "${post.slug}".`);
    }

    seenSlugs.add(post.slug);
  });
}

module.exports = {
  SITE_URL,
  DEFAULT_OG_IMAGE,
  buildRouteMeta,
  getReadTimeLabel,
  getSitemapEntries,
  loadBlogPosts,
  toAbsoluteUrl,
};
