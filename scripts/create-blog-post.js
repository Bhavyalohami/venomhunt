const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "..", "src", "data", "blogs.json");

function getArg(name) {
  const prefix = `--${name}=`;
  const entry = process.argv.find((item) => item.startsWith(prefix));
  return entry ? entry.slice(prefix.length).trim() : "";
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const title = getArg("title");
const category = getArg("category") || "Brand Strategy";
const keyword = getArg("keyword");
const image =
  getArg("image") ||
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80";

if (!title) {
  throw new Error(
    'Missing `--title`. Example: npm run blog:draft -- --title="Best branding tips for Jaipur cafes" --category="Creative Agency" --keyword="creative agency in jaipur"'
  );
}

const raw = fs.readFileSync(filePath, "utf8");
const posts = JSON.parse(raw);
const createdAt = new Date().toISOString().split("T")[0];
const slug = slugify(title);

if (posts.some((post) => post.slug === slug)) {
  throw new Error(`A blog with slug "${slug}" already exists.`);
}

const draft = {
  slug,
  title,
  description: `Draft article for ${keyword || title}. Replace this summary before publishing.`,
  image,
  createdAt,
  author: "Venom Hunt",
  category,
  keywords: [keyword || title.toLowerCase(), "graphic designer in jaipur", "creative agency in jaipur"],
  body: [
    "Replace this intro with the real search intent and business context.",
    "### Add a clear section heading",
    "Replace this paragraph with useful original guidance.",
    "- Replace this bullet with a practical takeaway.",
  ],
};

posts.unshift(draft);
fs.writeFileSync(filePath, `${JSON.stringify(posts, null, 2)}\n`, "utf8");

console.log(`Created draft blog post: ${slug}`);
