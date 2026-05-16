import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styles from "./Work.module.scss";
import { PROJECTS } from "@/data/projects";
import { useReveal } from "@/hooks/useReveal";

export default function Work() {
  useReveal([]);
  return (
    <>
      <Helmet>
        <title>The Design Elves | Work</title>
        <meta name="description" content="Selected works — branding, packaging, identity systems and digital experiences." />
      </Helmet>

      <section className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Works</h1>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {PROJECTS.map((p, i) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                className={`${styles.card} fade-up ${i > 0 ? `stagger-${Math.min(i % 4, 4)}` : ""}`}
              >
                <div className={styles.imgWrap}>
                  <img src={p.workThumb} alt={p.title} loading="lazy" />
                </div>
                <div className={styles.info}>
                  <h3>{p.title}</h3>
                  <p>{p.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
