import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WorksSection.module.scss";
import { PROJECTS } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const homeWorks = PROJECTS.slice(0, 4);

/* ─────────────────────────────────────────────────────────────
   Single project card — clip reveal + parallax + hover overlay
───────────────────────────────────────────────────────────── */
interface CardProps {
  project: (typeof homeWorks)[0];
  index: number;
}

function ProjectCard({ project, index }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);   // clip-path target
  const innerRef = useRef<HTMLDivElement>(null);   // parallax target
  const numRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const clip = clipRef.current;
    const inner = innerRef.current;
    const num = numRef.current;
    const title = titleRef.current;
    const cat = catRef.current;
    const line = lineRef.current;
    if (!card || !clip || !inner) return;

    const ctx = gsap.context(() => {
      /* ── 1. Image clip-path wipe (inset sweeps up) ── */
      gsap.fromTo(
        clip,
        { clipPath: "inset(100% 0 0 0 round 4px)" },
        {
          clipPath: "inset(0% 0 0 0 round 4px)",
          duration: 1.3,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            once: true,
          },
        }
      );

      /* ── 2. Image parallax (img moves slower than scroll) ── */
      gsap.fromTo(
        inner,
        { yPercent: 8 },
        {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      /* ── 3. Card number fade-slide ── */
      if (num) {
        gsap.fromTo(
          num,
          { opacity: 0, x: -12 },
          {
            opacity: 1, x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 82%", once: true },
          }
        );
      }

      /* ── 4. Separator line draw ── */
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power3.inOut",
            delay: 0.35,
            scrollTrigger: { trigger: card, start: "top 82%", once: true },
          }
        );
      }

      /* ── 5. Title clip-up reveal ── */
      if (title) {
        gsap.fromTo(
          title,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0, opacity: 1,
            duration: 0.85,
            ease: "power4.out",
            delay: 0.45,
            scrollTrigger: { trigger: card, start: "top 82%", once: true },
          }
        );
      }

      /* ── 6. Category fade ── */
      if (cat) {
        gsap.fromTo(
          cat,
          { opacity: 0, y: 10 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.6,
            scrollTrigger: { trigger: card, start: "top 82%", once: true },
          }
        );
      }
    }, card);

    return () => ctx.revert();
  }, []);

  const isOffset = index % 2 === 1;

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${isOffset ? styles.cardOffset : ""}`}
    >
      <Link to={`/projects/${project.slug}`} className={styles.cardLink}>

        {/* Index number */}
        <span ref={numRef} className={styles.cardNum}>
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Image — clip reveal wraps the parallax container */}
        <div ref={clipRef} className={styles.imageClip}>
          {/* Parallax container — slightly taller than clip box */}
          <div ref={innerRef} className={styles.imageInner}>
            <img src={project.thumb} alt={project.title} loading="lazy" className={styles.img} />
          </div>

          {/* Hover overlay */}
          <div className={styles.overlay}>
            <div className={styles.overlayContent}>
              <span className={styles.overlayLabel}>View Project</span>
              <svg
                width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <line x1="5" y1="19" x2="19" y2="5" />
                <polyline points="5 5 19 5 19 19" />
              </svg>
            </div>
          </div>
        </div>

        {/* Separator line */}
        <div ref={lineRef} className={styles.cardLine} />

        {/* Info */}
        <div className={styles.cardInfo}>
          <div className={styles.titleClip}>
            <div ref={titleRef} className={styles.cardTitle}>
              {project.title}
            </div>
          </div>
          <span ref={catRef} className={styles.cardCategory}>
            {project.category}
          </span>
        </div>

      </Link>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Works Section
───────────────────────────────────────────────────────────── */
export default function WorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const seeAllRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const head = headRef.current;
    const div = divRef.current;
    const seeAll = seeAllRef.current;
    if (!section || !head) return;

    const ctx = gsap.context(() => {
      /* ── Section heading: each word clips up ── */
      const words = head.querySelectorAll<HTMLSpanElement>(`.${styles.titleWord}`);
      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0, opacity: 1,
          duration: 1.0,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        }
      );

      /* ── "See all" fade ── */
      if (seeAll) {
        gsap.fromTo(
          seeAll,
          { opacity: 0, x: 16 },
          {
            opacity: 1, x: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.4,
            scrollTrigger: { trigger: section, start: "top 80%", once: true },
          }
        );
      }

      /* ── Divider line draw ── */
      if (div) {
        gsap.fromTo(
          div,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power4.inOut",
            delay: 0.2,
            scrollTrigger: { trigger: section, start: "top 80%", once: true },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>

        {/* ── Section head ── */}
        <div className={styles.sectionHead}>
          <h2 ref={headRef} className={styles.sectionTitle}>
            {"Our Works".split(" ").map((w, i) => (
              <span key={i} className={styles.titleWrap}>
                <span className={styles.titleWord}>{w}</span>
              </span>
            ))}
          </h2>

          <Link ref={seeAllRef} to="/work" className={styles.seeAll}>
            <span>See all works</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="19" x2="19" y2="5" />
              <polyline points="5 5 19 5 19 19" />
            </svg>
          </Link>
        </div>

        {/* ── Divider ── */}
        <div ref={divRef} className={styles.divider} />

        {/* ── Project grid ── */}
        <div className={styles.grid}>
          {homeWorks.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
