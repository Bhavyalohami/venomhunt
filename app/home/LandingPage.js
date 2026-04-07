import Link from "next/link";
import { Cal_Sans, Inter } from "next/font/google";
import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react";
import { blogPosts, formatBlogDate, getReadTimeLabel } from "../../src/lib/blogs";
import {
  aboutStats,
  budgetOptions,
  contactServices,
  faqs,
  heroTexts,
  portfolioSections,
  serviceGroups,
  socialLinks,
  testimonials,
} from "./content";
import styles from "./page.module.css";

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

function SectionHeader({ eyebrow, title, copy }) {
  return (
    <div className={styles.sectionHeader}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {copy ? <p className={styles.sectionCopy}>{copy}</p> : null}
    </div>
  );
}

export default function LandingPage() {
  const featuredBlogPosts = blogPosts.slice(0, 3);
  const heroLogos = [
    portfolioSections[2].items[2].image,
    portfolioSections[2].items[3].image,
    portfolioSections[2].items[7].image,
    portfolioSections[0].items[0].image,
  ];

  return (
    <main className={`${styles.page} ${calSans.variable} ${inter.variable}`}>
      <header className={styles.navShell}>
        <div className={styles.nav}>
          <a href="#home" className={styles.brandText}>
            <img src="/see11.png" alt="" className={styles.brandIcon} />
            Venom Hunt
          </a>
          <nav className={styles.navLinks} aria-label="Main navigation">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#blogs">Blogs</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href="#contact" className={styles.primaryButton}>
            Start a Project
          </a>
        </div>
      </header>

      <section id="home" className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Graphic Designer</p>
          <h1 className={styles.heroTitle}>
            Crafting memorable brand identities through strategic logo design.
          </h1>
          <p className={styles.heroLead}>{heroTexts.join(" • ")}</p>
          <p className={styles.heroBody}>
            I create distinctive logos that tell your brand&apos;s story, connect with your
            audience, and stand the test of time.
          </p>
          <div className={styles.heroActions}>
            <a href="#portfolio" className={styles.primaryButton}>
              View Portfolio
            </a>
            <a href="#contact" className={styles.secondaryButton}>
              Start a Project
            </a>
          </div>
        </div>

        <div className={styles.heroPanel}>
          <div className={styles.heroLogoGrid}>
            {heroLogos.map((image) => (
              <div key={image} className={styles.heroLogoTile}>
                <img src={image} alt="" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className={styles.section}>
        <SectionHeader
          eyebrow="Services"
          title="Design Services"
          copy="Comprehensive logo and brand identity solutions tailored to your needs."
        />
        <div className={styles.serviceGrid}>
          {serviceGroups.map((service) => (
            <article key={service.title} className={styles.card}>
              <p className={styles.cardLabel}>Service</p>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <ul className={styles.pointList}>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className={styles.section}>
        <div className={styles.aboutLayout}>
          <div>
            <SectionHeader
              eyebrow="About"
              title="About me"
              copy="Hi, I'm Venom, a professional logo designer with 10+ years of experience in custom logo design, brand identity, and mascots. I've helped over 13,000 clients build brands that stand out and sell. From hand-drawn logos to modern minimalist styles, I design with strategy, creativity, and purpose. Rated 4.9 stars on Fiverr, I’m here to turn your vision into a powerful brand. Let’s create something unforgettable."
            />
            <div className={styles.statsGrid}>
              {aboutStats.map((item) => (
                <div key={item.label} className={styles.metric}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <article className={`${styles.card} ${styles.approachCard}`}>
            <p className={styles.cardLabel}>Approach</p>
            <h3 className={styles.cardTitle}>My Approach</h3>
            <p className={styles.cardBody}>
              Venom Hunt is your one-stop creative hub with 3 powerhouse services: bold logo &
              brand identity design, eye-catching illustrations & mascots, and high-impact
              marketing visuals from flyers to packaging. Everything you need to make your brand
              unforgettable, all under one roof.
            </p>
            <div className={styles.contactList}>
              <a href="mailto:venomhunt123@gmail.com">
                <Mail size={16} />
                venomhunt123@gmail.com
              </a>
              <a href="tel:+919950531145">
                <Phone size={16} />
                +91 9950531145
              </a>
              <a href="https://www.fiverr.com/venom_hunt" target="_blank" rel="noreferrer">
                <ArrowUpRight size={16} />
                Start working on Fiverr
              </a>
            </div>
          </article>
        </div>
      </section>

      <section id="portfolio" className={styles.section}>
        <SectionHeader
          eyebrow="Portfolio"
          title="Logo Portfolio"
          copy="A selection of logos I've created for clients across various industries."
        />
        <div className={styles.portfolioSections}>
          {portfolioSections.map((section) => (
            <div key={section.title} className={styles.portfolioGroup}>
              <div className={styles.portfolioHeading}>
                <h3>{section.title}</h3>
              </div>
              <div className={styles.logoGrid}>
                {section.items.map((logo) => (
                  <article key={logo.id} className={styles.logoCard}>
                    <div className={styles.logoMedia}>
                      <img src={logo.image} alt={logo.name} />
                    </div>
                    <div className={styles.logoMeta}>
                      <h4>{logo.name}</h4>
                      <p>{logo.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials" className={styles.section}>
        <SectionHeader
          eyebrow="Testimonials"
          title="Client Testimonials"
          copy="What clients say about working with me on their logo design projects."
        />
        <div className={styles.testimonialGrid}>
          {testimonials.map((item) => (
            <article key={item.name} className={styles.testimonialCard}>
              <div className={styles.testimonialHeader}>
                <img src={item.avatar} alt={item.name} className={styles.avatar} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.role}</p>
                </div>
              </div>
              <p className={styles.quote}>&quot;{item.quote}&quot;</p>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className={styles.section}>
        <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className={styles.faqList}>
          {faqs.map((item) => (
            <article key={item.q} className={styles.faqCard}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="blogs" className={styles.section}>
        <SectionHeader
          eyebrow="Blogs"
          title="Branding Insights"
          copy="Insights on branding, logo design, and creative direction for businesses building a sharper visual identity."
        />
        <div className={styles.blogGrid}>
          {featuredBlogPosts.map((post) => (
            <Link key={post.slug} href={`/blogs/${post.slug}`} className={styles.blogCard}>
              <div className={styles.blogMedia}>
                <img src={post.image} alt={post.title} />
              </div>
              <div className={styles.blogContent}>
                <div className={styles.blogMeta}>
                  <span>{post.category}</span>
                  <span>{formatBlogDate(post.createdAt)}</span>
                  <span>{getReadTimeLabel(post)}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <span className={styles.inlineCta}>
                  Read article <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.blogActions}>
          <Link href="/blogs" className={styles.secondaryButton}>
            View all blogs
          </Link>
        </div>
      </section>

      <section id="contact" className={styles.section}>
        <div className={styles.contactShell}>
          <div className={styles.contactIntro}>
            <SectionHeader
              eyebrow="Contact"
              title="Start a Project"
              copy="Let's discuss your logo design needs. I'll get back to you within 24 hours."
            />
            <div className={styles.contactList}>
              <a href="mailto:venomhunt123@gmail.com">
                <Mail size={16} />
                venomhunt123@gmail.com
              </a>
              <a href="tel:+919950531145">
                <Phone size={16} />
                +91 9950531145
              </a>
              <a href="https://www.fiverr.com/venom_hunt" target="_blank" rel="noreferrer">
                <ArrowUpRight size={16} />
                Start working on Fiverr
              </a>
            </div>
          </div>

          <form className={styles.contactForm}>
            <div className={styles.formGrid}>
              <input name="name" placeholder="Name" />
              <input type="email" name="email" placeholder="Email" />
            </div>
            <div className={styles.formGrid}>
              <select name="service" defaultValue="">
                <option value="" disabled>
                  Choose Service
                </option>
                {contactServices.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select name="budget" defaultValue="">
                <option value="" disabled>
                  Budget Range
                </option>
                {budgetOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <textarea rows="6" name="message" placeholder="Tell me about your project and brand" />
            <button type="button" className={styles.primaryButton}>
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <a href="#home" className={styles.brandText}>
            <img src="/see11.png" alt="" className={styles.brandIcon} />
            Venom Hunt
          </a>
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
  );
}
