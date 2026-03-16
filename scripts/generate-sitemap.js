const fs = require("fs");
const path = require("path");
const { getSitemapEntries, loadBlogPosts } = require("./blog-utils");

const buildDir = path.resolve(__dirname, "..", "build");

if (!fs.existsSync(buildDir)) {
  throw new Error("Build directory not found. Run the app build before generating the sitemap.");
}

const entries = getSitemapEntries(loadBlogPosts());

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(buildDir, "sitemap.xml"), sitemap, "utf8");
