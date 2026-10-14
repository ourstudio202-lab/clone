import { Link } from "react-router-dom";
import Seo from "@/components/Seo/Seo";
import styles from "./Services.module.scss";
import { SERVICE_PAGES, breadcrumbSchema, faqSchema } from "@/data/seo";
import { useReveal } from "@/hooks/useReveal";

const FAQS = [
  {
    q: "What services does The Design Elves offer?",
    a: "The Design Elves is a design studio in Pune offering brand identity and logo design, packaging design, website design, UI/UX design, social media and ad creatives, and 3D & motion design.",
  },
  {
    q: "Where is The Design Elves located?",
    a: "The Design Elves is based in Pune, Maharashtra, India, and works with clients across Pune, Pimpri-Chinchwad, the rest of India and internationally.",
  },
  {
    q: "How do I start a project with The Design Elves?",
    a: "Email thedesignelves@gmail.com or call +91 9098111911 with a short description of your project. The studio replies within 24 hours to set up a discovery call.",
  },
];

export default function Services() {
  useReveal([]);
  return (
    <>
      <Seo
        title="Design Services in Pune | Branding, Packaging, Website & UI/UX | The Design Elves"
        description="Branding, logo, packaging, website, UI/UX, social media and 3D/motion design services from The Design Elves, an independent design studio in Pune."
        path="/services"
        schema={[
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]),
          faqSchema(FAQS),
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={`${styles.title} fade-up`}>Design services in Pune</h1>
          <p className={`${styles.subtitle} fade-up stagger-1`}>
            The Design Elves is an independent design studio in Pune. We build brands end to end —
            identity, packaging, websites, product interfaces and the content that keeps them visible.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {SERVICE_PAGES.map((s, i) => (
              <Link key={s.slug} to={`/services/${s.slug}`}
                className={`${styles.card} fade-up ${i > 0 ? `stagger-${Math.min(i % 3, 3)}` : ""}`}>
                <h2>{s.h1}</h2>
                <p>{s.intro}</p>
                <span className={styles.cardMore}>Explore {s.navLabel} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <span className={styles.label}>Questions</span>
          <div className={styles.faq}>
            {FAQS.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
