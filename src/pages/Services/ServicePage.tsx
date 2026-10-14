import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Seo from "@/components/Seo/Seo";
import styles from "./Services.module.scss";
import {
  SERVICE_PAGES, getServicePage, breadcrumbSchema, faqSchema, serviceSchema,
} from "@/data/seo";
import { PROJECTS } from "@/data/projects";
import { useReveal } from "@/hooks/useReveal";

export default function ServicePage() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const service = getServicePage(slug);
  useReveal([slug]);

  useEffect(() => {
    if (!service) navigate("/services", { replace: true });
  }, [service, navigate]);

  if (!service) return null;
  const others = SERVICE_PAGES.filter((s) => s.slug !== service.slug);
  const path = `/services/${service.slug}`;

  return (
    <>
      <Seo
        title={service.title}
        description={service.description}
        path={path}
        image={service.img}
        schema={[
          serviceSchema(service),
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path },
          ]),
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.container}>
          <nav className={`${styles.crumbs} fade-up`} aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>/</span>
            <Link to="/services">Services</Link><span>/</span>
            <span>{service.navLabel}</span>
          </nav>
          <h1 className={`${styles.title} fade-up`}>{service.h1}</h1>
          <p className={`${styles.subtitle} fade-up stagger-1`}>{service.intro}</p>
          <Link to="/contact" className={`${styles.cta} fade-up stagger-2`}>Start a project</Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.container} ${styles.split}`}>
          <div className="fade-up">
            <span className={styles.label}>What we deliver</span>
            <ul className={styles.list}>
              {service.deliverables.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
          <div className="fade-up stagger-1">
            <img className={styles.image} src={service.img} alt={`${service.name} by The Design Elves, Pune`} loading="lazy" />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.container} ${styles.split}`}>
          <div className="fade-up">
            <span className={styles.label}>Who it’s for</span>
            <p className={styles.body}>{service.forWho}</p>
          </div>
          <div className="fade-up stagger-1">
            <span className={styles.label}>Why a Pune studio</span>
            <p className={styles.body}>
              We’re based in Pune, so local clients get in-person workshops and reviews, and we
              understand the market you’re selling into. We also work remotely with brands across India and abroad.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <span className={styles.label}>Selected work</span>
          <div className={styles.grid}>
            {PROJECTS.slice(0, 3).map((p) => (
              <Link key={p.slug} to={`/projects/${p.slug}`} className={`${styles.card} fade-up`}>
                <h3>{p.title}</h3>
                <p>{p.category}</p>
                <span className={styles.cardMore}>View project →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <span className={styles.label}>FAQ</span>
          <div className={styles.faq}>
            {service.faqs.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <span className={styles.label}>Other services</span>
          <div className={styles.grid}>
            {others.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className={`${styles.card} fade-up`}>
                <h3>{s.h1}</h3>
                <span className={styles.cardMore}>Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
