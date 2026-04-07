import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Cal_Sans, Inter } from "next/font/google";

import StructuredData from "../../../src/components/StructuredData";
import { blogPosts, buildBlogContentBlocks, formatBlogDate, getReadTimeLabel } from "../../../src/lib/blogs";
import { toNextMetadata } from "../../../src/seo/nextMetadata";
import { getBlogPostSeo } from "../../../src/seo/routes";
import { socialLinks } from "../../home/content";
import styles from "../blogs.module.css";

export const dynamicParams = false;

const calSans = Cal_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  adjustFontFallback: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  adjustFontFallback: false,
});

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) {
    return toNextMetadata(getBlogPostSeo(slug));
  }

  return toNextMetadata(getBlogPostSeo(post.slug, `/blogs/${post.slug}`));
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const post = blogPosts.find((item) => item.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const seo = getBlogPostSeo(post.slug, `/blogs/${post.slug}`);
  const contentBlocks = buildBlogContentBlocks(post.body);
  const relatedPosts = blogPosts
    .filter((item) => item.slug !== post.slug)
    .sort((left, right) => {
      const leftScore = Number(left.category === post.category);
      const rightScore = Number(right.category === post.category);
      if (leftScore !== rightScore) return rightScore - leftScore;
      return right.createdAt.localeCompare(left.createdAt);
    })
    .slice(0, 3);

  return (
    <>
      <StructuredData entries={seo.structuredData} />
      <main className={`${styles.page} ${calSans.variable} ${inter.variable}`}>
        <header className={styles.navShell}>
          <div className={styles.nav}>
            <Link
              href="/"
              className={styles.brandText}
              data-ga-event="nav_click"
              data-ga-label="brand_home"
              data-ga-location="blog_article_header"
            >
              <img src="/see11.png" alt="" className={styles.brandIcon} />
              Venom Hunt
            </Link>
            <nav className={styles.navLinks} aria-label="Blog article navigation">
              <a href="/#services" data-ga-event="nav_click" data-ga-label="services" data-ga-location="blog_article_header">Services</a>
              <a href="/#about" data-ga-event="nav_click" data-ga-label="about" data-ga-location="blog_article_header">About</a>
              <Link href="/blogs" data-ga-event="view_all_blogs_click" data-ga-label="article_nav_all_blogs" data-ga-location="blog_article_header">All Blogs</Link>
              <a href="/#portfolio" data-ga-event="nav_click" data-ga-label="portfolio" data-ga-location="blog_article_header">Portfolio</a>
              <a href="/#testimonials" data-ga-event="nav_click" data-ga-label="testimonials" data-ga-location="blog_article_header">Testimonials</a>
              <a href="/#contact" data-ga-event="nav_click" data-ga-label="contact" data-ga-location="blog_article_header">Contact</a>
            </nav>
            <a
              href="/#contact"
              className={styles.primaryButton}
              data-ga-event="start_project_click"
              data-ga-label="article_header_start_project"
              data-ga-location="blog_article_header"
            >
              Start a Project
            </a>
          </div>
        </header>

        <article className={styles.articlePage}>
          <section className={styles.articleHero}>
            <p className={styles.eyebrow}>{post.category}</p>
            <h1 className={styles.articleTitle}>{post.title}</h1>
            <div className={styles.meta}>
              <span>{post.author}</span>
              <span>{formatBlogDate(post.createdAt)}</span>
              <span>{getReadTimeLabel(post)}</span>
            </div>
            <p className={styles.articleSummary}>{post.description}</p>
            <div className={styles.articleImage}>
              <img src={post.image} alt={post.title} />
            </div>
          </section>

          <section className={styles.articleBody}>
            <div className={styles.body}>
              {contentBlocks.map((block, index) => {
                if (block.type === "heading") {
                  return <h2 key={`${post.slug}-heading-${index}`}>{block.content}</h2>;
                }

                if (block.type === "list") {
                  return (
                    <ul key={`${post.slug}-list-${index}`}>
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  );
                }

                return <p key={`${post.slug}-paragraph-${index}`}>{block.content}</p>;
              })}
            </div>
          </section>

          <section className={styles.relatedSection}>
            <div className={styles.relatedHeader}>
              <div>
                <p className={styles.eyebrow}>More posts</p>
                <h2>More from Venom Hunt</h2>
              </div>
              <Link
                href="/blogs"
                className={styles.secondaryButton}
                data-ga-event="view_all_blogs_click"
                data-ga-label="article_related_view_all_blogs"
                data-ga-location="blog_article_related"
              >
                View all blogs
              </Link>
            </div>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blogs/${relatedPost.slug}`}
                  className={styles.relatedCard}
                  data-ga-event="blog_card_click"
                  data-ga-label={relatedPost.slug}
                  data-ga-location="blog_article_related"
                >
                  <p className={styles.relatedMeta}>{relatedPost.category}</p>
                  <h3>{relatedPost.title}</h3>
                  <p>{relatedPost.description}</p>
                  <span className={styles.inlineCta}>
                    Read article <ArrowRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </article>

        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <Link
              href="/"
              className={styles.brandText}
              data-ga-event="nav_click"
              data-ga-label="footer_home"
              data-ga-location="blog_article_footer"
            >
              <img src="/see11.png" alt="" className={styles.brandIcon} />
              Venom Hunt
            </Link>
            <p>© {new Date().getFullYear()} Venom Hunt. All rights reserved.</p>
            <div className={styles.footerLinks}>
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  data-ga-event="social_click"
                  data-ga-label={item.label.toLowerCase()}
                  data-ga-location="blog_article_footer"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
