import { useEffect } from "react";

const MANAGED_ATTR = "data-venomhunt-seo";
const MANAGED_VALUE = "managed";

function ensureMeta(selector, createTag) {
  const existing = document.head.querySelector(selector);
  if (existing) return existing;

  const element = document.createElement("meta");
  createTag(element);
  element.setAttribute(MANAGED_ATTR, MANAGED_VALUE);
  document.head.appendChild(element);
  return element;
}

function setMetaByName(name, content) {
  if (!content) return;
  const meta = ensureMeta(`meta[name="${name}"]`, (element) => {
    element.setAttribute("name", name);
  });
  meta.setAttribute("content", content);
}

function setMetaByProperty(property, content) {
  if (!content) return;
  const meta = ensureMeta(`meta[property="${property}"]`, (element) => {
    element.setAttribute("property", property);
  });
  meta.setAttribute("content", content);
}

function setCanonical(href) {
  if (!href) return;
  const existing = document.head.querySelector('link[rel="canonical"]');
  const link = existing || document.createElement("link");
  link.setAttribute("rel", "canonical");
  link.setAttribute("href", href);
  link.setAttribute(MANAGED_ATTR, MANAGED_VALUE);
  if (!existing) {
    document.head.appendChild(link);
  }
}

export default function SeoHead({
  title,
  description,
  canonicalUrl,
  image,
  type = "website",
  robots = "index,follow",
  keywords = "",
  structuredData = [],
}) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    setMetaByName("description", description);
    setMetaByName("robots", robots);
    setMetaByName("keywords", keywords);
    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", title);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", image);
    setMetaByProperty("og:site_name", "Venom Hunt");
    setMetaByProperty("og:title", title);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:url", canonicalUrl);
    setMetaByProperty("og:type", type);
    setMetaByProperty("og:image", image);
    setCanonical(canonicalUrl);

    document.head
      .querySelectorAll(`script[${MANAGED_ATTR}="${MANAGED_VALUE}"][type="application/ld+json"]`)
      .forEach((node) => node.remove());

    structuredData
      .filter(Boolean)
      .forEach((entry) => {
        const script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.setAttribute(MANAGED_ATTR, MANAGED_VALUE);
        script.textContent = JSON.stringify(entry);
        document.head.appendChild(script);
      });
  }, [canonicalUrl, description, image, keywords, robots, structuredData, title, type]);

  return null;
}
