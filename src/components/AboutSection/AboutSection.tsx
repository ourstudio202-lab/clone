import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

/* ── Marquee text ── */
const MARQUEE_ITEMS = [
  "The Design Elves",
  "Creative Studio",
  "Branding",
  "Packaging",
  "UI / UX",
  "Motion",
  "Digital Experiences",
  "Brand Identity",
];

/* ── Heading words with line breaks preserved ── */
const HEADING_LINES = [
  ["We", "are", "an", "independent"],
  ["design", "studio", "building"],
  ["brands", "that", "matter."],
];

export default function AboutSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const labelRef    = useRef<HTMLSpanElement>(null);
  const labelLineRef= useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const divTopRef   = useRef<HTMLDivElement>(null);
  const detailsRef  = useRef<HTMLDivElement>(null);
  const divBotRef   = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section  = sectionRef.current;
    const label    = labelRef.current;
    const labelLine= labelLineRef.current;
    const heading  = headingRef.current;
    const divTop   = divTopRef.current;
    const details  = detailsRef.current;
    const divBot   = divBotRef.current;
    const cta      = ctaRef.current;
    if (!section || !heading) return;

    const ease      = [0.16, 1, 0.3, 1] as const;
    const easeSwift = [0.76, 0, 0.24, 1] as const;

    const ctx = gsap.context(() => {

      /* ── 1. Section marker: label fades right, line draws ── */
      const tl1 = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });
      if (label)     tl1.fromTo(label,     { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: 0.65, ease });
      if (labelLine) tl1.fromTo(labelLine, { scaleX: 0 },           { scaleX: 1, duration: 1.1, ease },     "<0.05");

      /* ── 2. Heading — each word clips up through overflow:hidden ── */
      const words = heading.querySelectorAll<HTMLSpanElement>(`.${styles.word}`);
      gsap.fromTo(
        words,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0, opacity: 1,
          duration: 1.05,
          ease,
          stagger: { each: 0.072, from: "start" },
          scrollTrigger: { trigger: heading, start: "top 80%", once: true },
        }
      );

      /* ── 3. Top divider draws left → right ── */
      if (divTop) {
        gsap.fromTo(divTop, { scaleX: 0 }, {
          scaleX: 1, duration: 1.3, ease: easeSwift,
          scrollTrigger: { trigger: divTop, start: "top 88%", once: true },
        });
      }

      /* ── 4. Detail columns: labels + underlines + body ── */
      if (details) {
        const colLabels = details.querySelectorAll<HTMLElement>(`.${styles.detailLabel}`);
        const colLines  = details.querySelectorAll<HTMLElement>(`.${styles.detailLabelLine}`);
        const colBodies = details.querySelectorAll<HTMLElement>(`.${styles.detailBody}`);

        gsap.fromTo(colLabels, { opacity: 0, y: 14 }, {
          opacity: 1, y: 0, duration: 0.7, ease, stagger: 0.1,
          scrollTrigger: { trigger: details, start: "top 82%", once: true },
        });
        gsap.fromTo(colLines, { scaleX: 0 }, {
          scaleX: 1, duration: 0.85, ease, stagger: 0.1, delay: 0.18,
          scrollTrigger: { trigger: details, start: "top 82%", once: true },
        });
        gsap.fromTo(colBodies, { opacity: 0, y: 22 }, {
          opacity: 1, y: 0, duration: 0.9, ease, stagger: 0.12, delay: 0.35,
          scrollTrigger: { trigger: details, start: "top 82%", once: true },
        });
      }

      /* ── 5. Bottom divider ── */
      if (divBot) {
        gsap.fromTo(divBot, { scaleX: 0 }, {
          scaleX: 1, duration: 1.3, ease: easeSwift,
          scrollTrigger: { trigger: divBot, start: "top 92%", once: true },
        });
      }

      /* ── 6. CTA row ── */
      if (cta) {
        gsap.fromTo(cta, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.9, ease,
          scrollTrigger: { trigger: cta, start: "top 90%", once: true },
        });
      }

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>

        {/* ── Section marker ─────────────────────────────────── */}
        <div className={styles.marker}>
          <span ref={labelRef} className={styles.markerLabel}>About</span>
          <div  ref={labelLineRef} className={styles.markerLine} />
        </div>

        {/* ── Manifesto heading ──────────────────────────────── */}
        <h2 ref={headingRef} className={styles.heading} aria-label="We are an independent design studio building brands that matter.">
          {HEADING_LINES.map((line, li) => (
            <span key={li} className={styles.line}>
              {line.map((word, wi) => (
                <span key={wi} className={styles.wordWrap}>
                  <span className={styles.word}>{word}</span>
                </span>
              ))}
            </span>
          ))}
        </h2>

        {/* ── Top divider ────────────────────────────────────── */}
        <div ref={divTopRef} className={styles.divider} />

        {/* ── Two-column detail block ────────────────────────── */}
        <div ref={detailsRef} className={styles.details}>

          <div className={styles.detailCol}>
            <span className={styles.detailLabel}>What We Do</span>
            <div  className={styles.detailLabelLine} />
            <p    className={styles.detailBody}>
              Branding, Packaging, UI&thinsp;/&thinsp;UX Design,
              and cinematic digital experiences — we craft every
              touchpoint with intention.
            </p>
          </div>

          <div className={styles.detailDividerV} />

          <div className={styles.detailCol}>
            <span className={styles.detailLabel}>Our Approach</span>
            <div  className={styles.detailLabelLine} />
            <p    className={styles.detailBody}>
              We blend minimal aesthetics with sharp, functional
              strategy to create work that doesn't just look good —
              it makes sense and drives results.
            </p>
          </div>

        </div>

        {/* ── Bottom divider ─────────────────────────────────── */}
        <div ref={divBotRef} className={styles.divider} />

        {/* ── CTA ────────────────────────────────────────────── */}
        <div ref={ctaRef} className={styles.cta}>
          <p className={styles.ctaText}>
            Curious about who we are and how we work?
          </p>
          <Link to="/about" className={styles.ctaLink}>
            <span>Our Story</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="19" x2="19" y2="5" />
              <polyline points="5 5 19 5 19 19" />
            </svg>
          </Link>
        </div>

      </div>

      {/* ── Infinite marquee ───────────────────────────────────── */}
      <div className={styles.marqueeWrap} aria-hidden>
        <div className={styles.marqueeTrack}>
          {/* Doubled for seamless loop */}
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>
              {item}
              <span className={styles.marqueeDot}>·</span>
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
