const fs = require("fs");
const path = require("path");
const { buildRouteMeta, loadBlogPosts } = require("./blog-utils");

const buildDir = path.resolve(__dirname, "..", "build");
const indexPath = path.join(buildDir, "index.html");

if (!fs.existsSync(indexPath)) {
  throw new Error("Build output not found. Run the app build before generating route shells.");
}

const baseHtml = fs.readFileSync(indexPath, "utf8");
const posts = loadBlogPosts();
const routes = buildRouteMeta(posts);

function escapeHtml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function injectSeo(html, route) {
  let updated = html;

  updated = updated
    .replace(/(href|src)="\.\/(static\/[^"]+)"/g, '$1="/$2"')
    .replace(/(href|src)="\.\/(favicon\.ico|manifest\.json|vh-02\.png)"/g, '$1="/$2"');

  updated = updated.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`);
  updated = updated.replace(
    /<meta name="description" content="[\s\S]*?"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(route.description)}" />`
  );
  updated = updated.replace(
    /<meta name="robots" content="[\s\S]*?"\s*\/?>/,
    `<meta name="robots" content="${escapeHtml(route.robots)}" />`
  );
  updated = updated.replace(
    /<meta name="keywords" content="[\s\S]*?"\s*\/?>/,
    `<meta name="keywords" content="${escapeHtml(route.keywords || "")}" />`
  );
  updated = updated.replace(
    /<meta property="og:title" content="[\s\S]*?"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`
  );
  updated = updated.replace(
    /<meta property="og:description" content="[\s\S]*?"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`
  );
  updated = updated.replace(
    /<meta property="og:url" content="[\s\S]*?"\s*\/?>/,
    `<meta property="og:url" content="${escapeHtml(route.canonicalUrl)}" />`
  );
  updated = updated.replace(
    /<meta property="og:type" content="[\s\S]*?"\s*\/?>/,
    `<meta property="og:type" content="${escapeHtml(route.type)}" />`
  );
  updated = updated.replace(
    /<meta property="og:image" content="[\s\S]*?"\s*\/?>/,
    `<meta property="og:image" content="${escapeHtml(route.image)}" />`
  );
  updated = updated.replace(
    /<meta name="twitter:title" content="[\s\S]*?"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
  );
  updated = updated.replace(
    /<meta name="twitter:description" content="[\s\S]*?"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
  );
  updated = updated.replace(
    /<meta name="twitter:image" content="[\s\S]*?"\s*\/?>/,
    `<meta name="twitter:image" content="${escapeHtml(route.image)}" />`
  );
  updated = updated.replace(
    /<link rel="canonical" href="[\s\S]*?"\s*\/?>/,
    `<link rel="canonical" href="${escapeHtml(route.canonicalUrl)}" />`
  );

  const structuredDataMarkup = (route.structuredData || [])
    .map(
      (entry) =>
        `<script type="application/ld+json" data-venomhunt-static="true">${JSON.stringify(entry)}</script>`
    )
    .join("");

  updated = updated.replace("</head>", `${structuredDataMarkup}</head>`);
  return updated;
}

function buildNoScriptMarkup(route) {
  if (route.path === "/blogs") {
    const links = posts
      .map(
        (post) =>
          `<li><a href="/blogs/${escapeHtml(post.slug)}">${escapeHtml(post.title)}</a><p>${escapeHtml(
            post.description
          )}</p></li>`
      )
      .join("");

    return `<noscript><main><h1>Venom Hunt Blog</h1><ul>${links}</ul></main></noscript>`;
  }

  if (route.post) {
    const paragraphs = route.post.body
      .map((item) => {
        if (item.startsWith("### ")) {
          return `<h2>${escapeHtml(item.replace(/^### /, ""))}</h2>`;
        }

        if (item.startsWith("- ")) {
          return `<p>${escapeHtml(item.replace(/^- /, ""))}</p>`;
        }

        return `<p>${escapeHtml(item)}</p>`;
      })
      .join("");

    return `<noscript><article><h1>${escapeHtml(route.post.title)}</h1>${paragraphs}</article></noscript>`;
  }

  return "";
}

function writeRouteHtml(routePath, html) {
  if (routePath === "/") {
    fs.writeFileSync(indexPath, html, "utf8");
    return;
  }

  const routeDir = path.join(buildDir, routePath.replace(/^\/+/, ""));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, "index.html"), html, "utf8");
}

routes.forEach((route) => {
  const withSeo = injectSeo(baseHtml, route);
  const withNoScript = withSeo.replace(
    '<div id="root"></div>',
    `${buildNoScriptMarkup(route)}<div id="root"></div>`
  );
  writeRouteHtml(route.path, withNoScript);
});

fs.writeFileSync(
  path.join(buildDir, "prerendered-routes.json"),
  JSON.stringify(routes.map((route) => route.path), null, 2),
  "utf8"
);
