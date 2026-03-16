import blogData from "../data/blogs.json";

export const BLOG_AUTOMATION_REQUIREMENTS = [
  "Use a descriptive slug built around a real Jaipur search intent.",
  "Keep the title and description specific enough to stand alone in Google results.",
  "Set createdAt in YYYY-MM-DD format so sitemap and structured data stay valid.",
  "Add a representative image URL and a relevant category.",
  "Write enough body content to satisfy the search intent instead of publishing thin posts.",
];

export const blogPosts = blogData;

export function getBlogWordCount(post) {
  return post.body.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

export function getReadTimeLabel(post) {
  const minutes = Math.max(2, Math.ceil(getBlogWordCount(post) / 180));
  return `${minutes} min read`;
}

export function formatBlogDate(dateString) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}

export function buildBlogContentBlocks(body = []) {
  const blocks = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: "list", items: listItems });
      listItems = [];
    }
  };

  body.forEach((entry) => {
    if (entry.startsWith("### ")) {
      flushList();
      blocks.push({ type: "heading", content: entry.replace(/^### /, "") });
      return;
    }

    if (entry.startsWith("- ")) {
      listItems.push(entry.replace(/^- /, ""));
      return;
    }

    flushList();
    blocks.push({ type: "paragraph", content: entry });
  });

  flushList();
  return blocks;
}
