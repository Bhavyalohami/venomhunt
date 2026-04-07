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
            <Link href="/" className={styles.brandText}>
              <img src="/see11.png" alt="" className={styles.brandIcon} />
              Venom Hunt
            </Link>
            <nav className={styles.navLinks} aria-label="Blog navigation">
              <a href="/#services">Services</a>
              <a href="/#about">About</a>
              <a href="/#portfolio">Portfolio</a>
              <a href="/#testimonials">Testimonials</a>
              <Link href="/blogs">Blogs</Link>
              <a href="/#contact">Contact</a>
            </nav>
            <a href="/#contact" className={styles.primaryButton}>
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
            <Link href="/" className={styles.secondaryButton}>
              Back to home
            </Link>
            <a href="/#contact" className={styles.primaryButton}>
              Work with Venom Hunt
            </a>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.blogGrid}>
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blogs/${post.slug}`} className={styles.blogCard}>
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
            <Link href="/" className={styles.brandText}>
              <img src="/see11.png" alt="" className={styles.brandIcon} />
              Venom Hunt
            </Link>
            <p>© {new Date().getFullYear()} Venom Hunt. All rights reserved.</p>
            <div className={styles.footerLinks}>
              {socialLinks.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
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
