import Link from "next/link";
import StructuredData from "../src/components/StructuredData";
import { toNextMetadata } from "../src/seo/nextMetadata";
import { getHomeSeo } from "../src/seo/routes";
import styles from "./page.module.css";

const seo = getHomeSeo("/");

export const metadata = toNextMetadata(seo);

export default function Page() {
  const designs = [
    {
      title: "Cal Design",
      href: "/cal-redesign/",
      description: "The current production-style landing page with the Cal-inspired visual system.",
      preview: "/see11.png",
    },
    {
      title: "Original Design",
      href: "/original/",
      description: "The earlier animated Venom Hunt homepage with the full legacy sections.",
      preview: "/vh-02.png",
    },
    {
      title: "Apple Design",
      href: "/apple/",
      description: "The Apple-style portfolio direction with product-like pacing and category sections.",
      preview: "/Hero/image-1.jpg",
    },
  ];

  return (
    <>
      <StructuredData entries={seo.structuredData} />
      <main className={styles.page}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Venom Hunt Design Previews</p>
          <h1>Choose any of the three live designs.</h1>
          <p>
            The live link now opens this design selector first, so the Cal, original, and
            Apple-style versions are all reachable from the same place.
          </p>
        </section>

        <section className={styles.grid} aria-label="Design choices">
          {designs.map((design) => (
            <Link key={design.href} href={design.href} className={styles.card}>
              <span className={styles.media}>
                <img src={design.preview} alt="" />
              </span>
              <span className={styles.copy}>
                <strong>{design.title}</strong>
                <span>{design.description}</span>
              </span>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
