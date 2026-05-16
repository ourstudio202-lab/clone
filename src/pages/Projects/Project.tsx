import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./Project.module.scss";
import { getProject, getOtherProjects } from "@/data/projects";
import { useReveal } from "@/hooks/useReveal";

export default function Project() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const project = getProject(slug);
  useReveal([slug]);

  useEffect(() => {
    if (!project) navigate("/work", { replace: true });
  }, [project, navigate]);

  if (!project) return null;
  const others = getOtherProjects(project.slug, 3);

  return (
    <>
      <Helmet>
        <title>{`The Design Elves | ${project.title}`}</title>
        <meta name="description" content={project.description.slice(0, 160)} />
      </Helmet>

      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={`${styles.title} fade-up`}>{project.title}</h1>
          <p className={`${styles.meta} fade-up stagger-1`}>{project.category}</p>
          <div className={`${styles.banner} fade-up stagger-2`}>
            <img src={project.bannerTop} alt={`${project.title} banner`} />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.text} fade-up`}>
            <p>{project.description}</p>
          </div>

          <div className={styles.grid}>
            {project.grid.map((src, i) => (
              <div key={i} className={`${styles.imgWrap} fade-up ${i % 2 ? "stagger-1" : ""}`}>
                <img src={src} alt={`${project.title} detail ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>

          <div className={`${styles.banner} fade-up`} style={{ marginTop: 0, aspectRatio: "21 / 9" }}>
            <img src={project.bannerBottom} alt={`${project.title} footer banner`} />
          </div>
        </div>
      </section>

      <section className={styles.more}>
        <div className={styles.container}>
          <div className={`${styles.moreHeader} fade-up`}>
            <h2>NEXT PROJECTS</h2>
            <Link to="/work" className={styles.seeAll}>
              SEE ALL WORKS
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
            </Link>
          </div>
          <div className={styles.next}>
            {others.map((p, i) => (
              <Link key={p.slug} to={`/projects/${p.slug}`} className={`${styles.card} fade-up ${i > 0 ? `stagger-${i}` : ""}`}>
                <div className={styles.cardImg}>
                  <img src={p.workThumb} alt={p.title} loading="lazy" />
                </div>
                <div className={styles.cardInfo}>
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
