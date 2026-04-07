import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Cal_Sans, Inter } from "next/font/google";
import StructuredData from "../../src/components/StructuredData";
import { blogPosts, formatBlogDate, getReadTimeLabel } from "../../src/lib/blogs";
import { toNextMetadata } from "../../src/seo/nextMetadata";
import { getBlogsSeo } from "../../src/seo/routes";
import { socialLinks } from "../home/content";
import styles from "./blogs.module.css";

const seo = getBlogsSeo("/blogs");

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

export const metadata = toNextMetadata(seo);

export default function Page() {
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
              data-ga-location="blogs_header"
            >
              <img src="/see11.png" alt="" className={styles.brandIcon} />
              Venom Hunt
            </Link>
            <nav className={styles.navLinks} aria-label="Blog navigation">
              <a href="/#services" data-ga-event="nav_click" data-ga-label="services" data-ga-location="blogs_header">Services</a>
              <a href="/#about" data-ga-event="nav_click" data-ga-label="about" data-ga-location="blogs_header">About</a>
              <a href="/#portfolio" data-ga-event="nav_click" data-ga-label="portfolio" data-ga-location="blogs_header">Portfolio</a>
              <a href="/#testimonials" data-ga-event="nav_click" data-ga-label="testimonials" data-ga-location="blogs_header">Testimonials</a>
              <Link href="/blogs" data-ga-event="nav_click" data-ga-label="blogs" data-ga-location="blogs_header">Blogs</Link>
              <a href="/#contact" data-ga-event="nav_click" data-ga-label="contact" data-ga-location="blogs_header">Contact</a>
            </nav>
            <a
              href="/#contact"
              className={styles.primaryButton}
              data-ga-event="start_project_click"
              data-ga-label="blogs_header_start_project"
              data-ga-location="blogs_header"
            >
              Start a Project
            </a>
          </div>
        </header>

        <section className={styles.hero}>
          <p className={styles.eyebrow}>Blogs</p>
          <h1 className={styles.title}>Branding Insights</h1>
          <p className={styles.lead}>
            Insights on branding, logo design, and creative direction for businesses building a
            sharper visual identity.
          </p>
          <div className={styles.actions}>
            <Link
              href="/"
              className={styles.secondaryButton}
              data-ga-event="back_home_click"
              data-ga-label="blogs_back_home"
              data-ga-location="blogs_hero"
            >
              Back to home
            </Link>
            <a
              href="/#contact"
              className={styles.primaryButton}
              data-ga-event="start_project_click"
              data-ga-label="blogs_work_with_venom_hunt"
              data-ga-location="blogs_hero"
            >
              Work with Venom Hunt
            </a>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.blogGrid}>
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className={styles.blogCard}
                data-ga-event="blog_card_click"
                data-ga-label={post.slug}
                data-ga-location="blogs_index"
              >
                <div className={styles.blogMedia}>
                  <img src={post.image} alt={post.title} />
                </div>
                <div className={styles.blogInner}>
                  <div className={styles.metaRow}>
                    <span>{post.category}</span>
                    <span>{formatBlogDate(post.createdAt)}</span>
                    <span>{getReadTimeLabel(post)}</span>
                  </div>
                  <h2>{post.title}</h2>
                  <p className={styles.summary}>{post.description}</p>
                  <span className={styles.inlineCta}>
                    Read article <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <Link
              href="/"
              className={styles.brandText}
              data-ga-event="nav_click"
              data-ga-label="footer_home"
              data-ga-location="blogs_footer"
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
                  data-ga-location="blogs_footer"
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
