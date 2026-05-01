import Link from "next/link";
import {
  aboutStats,
  faqs,
  portfolioSections,
  serviceGroups,
  testimonials,
} from "../home/content";
import styles from "./page.module.css";

export const metadata = {
  title: "Venom Hunt Apple Design",
  description: "Apple-style Venom Hunt portfolio design preview.",
};

const featuredItems = [
  portfolioSections[2].items[0],
  portfolioSections[0].items[2],
  portfolioSections[1].items[7],
];

export default function AppleDesignPage() {
  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <Link href="/" className={styles.brand}>Venom Hunt</Link>
        <nav aria-label="Apple preview navigation">
          <a href="#services">Services</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Apple-style portfolio preview</p>
          <h1>Logo design that feels clear, premium, and built to last.</h1>
          <p>
            Venom Hunt creates logo systems, brand identity, illustrations, and visual design for
            businesses that want to look established from day one.
          </p>
          <div className={styles.actions}>
            <a href="#portfolio">View Portfolio</a>
            <a href="#contact">Start a Project</a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <img src="/Hero/image-1.jpg" alt="Venom Hunt design work" />
        </div>
      </section>

      <section className={styles.stats} aria-label="Venom Hunt stats">
        {aboutStats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section id="services" className={styles.section}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Services</p>
          <h2>Focused creative systems, not disconnected deliverables.</h2>
        </div>
        <div className={styles.serviceGrid}>
          {serviceGroups.map((service) => (
            <article key={service.title} className={styles.card}>
              <h3>{service.title}</h3>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="portfolio" className={`${styles.section} ${styles.dark}`}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Portfolio</p>
          <h2>Three signature directions from the current portfolio.</h2>
          <p>Character mascot, hand-drawn watercolor, and modern minimalist identity work.</p>
        </div>
        <div className={styles.featureGrid}>
          {featuredItems.map((item) => (
            <article key={item.image} className={styles.workCard}>
              <div>
                <img src={item.image} alt={item.name} />
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="reviews" className={styles.section}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Reviews</p>
          <h2>What current clients are already saying.</h2>
        </div>
        <div className={styles.reviewGrid}>
          {testimonials.map((item) => (
            <article key={item.name} className={styles.card}>
              <p>&quot;{item.quote}&quot;</p>
              <h3>{item.name}</h3>
              <span>{item.role}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>FAQ</p>
          <h2>Short answers to common buying questions.</h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((item) => (
            <article key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className={`${styles.section} ${styles.contact}`}>
        <p className={styles.eyebrow}>Contact</p>
        <h2>Start a project with Venom Hunt.</h2>
        <div className={styles.contactLinks}>
          <a href="mailto:venomhunt123@gmail.com">venomhunt123@gmail.com</a>
          <a href="tel:+919950531145">+91 9950531145</a>
          <a href="https://www.fiverr.com/venom_hunt" target="_blank" rel="noreferrer">
            Fiverr Profile
          </a>
        </div>
      </section>
    </main>
  );
}
