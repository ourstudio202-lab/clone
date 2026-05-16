import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Home.module.scss";
import { PROJECTS, SERVICES, HERO_POP_IMAGES } from "@/data/projects";
import { useReveal } from "@/hooks/useReveal";
import WorksSection from "@/components/WorksSection/WorksSection";
import AboutSection from "@/components/AboutSection/AboutSection";

gsap.registerPlugin(ScrollTrigger);

/* ── Bokeh canvas helper ───────────────────────────────────── */
function initBokeh(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  let W = 0, H = 0;
  let raf = 0;

  interface Particle {
    x: number; y: number; radius: number;
    opacity: number; vy: number; drift: number;
  }

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function spawn(): Particle {
    const radius = 1 + Math.random() * (Math.random() < 0.08 ? 110 : 5);
    return {
      x: W * (0.45 + Math.random() * 0.55),
      y: H * (Math.random()),
      radius,
      opacity: radius > 25
        ? 0.04 + Math.random() * 0.08
        : 0.15 + Math.random() * 0.45,
      vy: -(0.05 + Math.random() * 0.12),
      drift: (Math.random() - 0.5) * 0.25,
    };
  }

  resize();
  window.addEventListener("resize", resize);
  const particles: Particle[] = Array.from({ length: 110 }, () => spawn());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      if (p.radius > 20) {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        g.addColorStop(0, `rgba(210,198,180,${p.opacity})`);
        g.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,198,180,${p.opacity})`;
        ctx.fill();
      }
      p.y += p.vy;
      p.x += p.drift;
      p.opacity -= 0.0003;
      if (p.y + p.radius < 0 || p.opacity <= 0) Object.assign(p, spawn());
    }
    raf = requestAnimationFrame(draw);
  }
  draw();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
  };
}

interface HomeProps {
  ready?: boolean;
}

/* ── Component ─────────────────────────────────────────────── */
export default function Home({ ready = false }: HomeProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const popContainerRef = useRef<HTMLDivElement | null>(null);

  // text refs for GSAP
  const lineDesignRef = useRef<HTMLSpanElement | null>(null);
  const lineWithRef = useRef<HTMLSpanElement | null>(null);
  const lineIntentRef = useRef<HTMLSpanElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useReveal([]);

  /* Bokeh canvas */
  useEffect(() => {
    if (!canvasRef.current) return;
    return initBokeh(canvasRef.current);
  }, []);

  /* Hero GSAP animations — fire exactly when loader clears (ready = true)  */
  useEffect(() => {
    if (!ready) return;

    const lines = [lineDesignRef.current, lineWithRef.current, lineIntentRef.current];
    const faders = [subtitleRef.current, ctaRef.current];
    if (lines.some(el => !el) || faders.some(el => !el)) return;

    // Headline clip-reveal — immediate, no delay (page just became visible)
    gsap.fromTo(
      lines,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.18,
        delay: 0,
      }
    );

    // Subtitle + CTA fade in shortly after
    gsap.fromTo(
      faders,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.65,
      }
    );
  }, [ready]);

  /* Pop-image on mouse move + scroll parallax */
  useEffect(() => {
    if (!heroRef.current || !popContainerRef.current) return;
    const heroEl = heroRef.current;
    const popImages = Array.from(
      popContainerRef.current.querySelectorAll("img")
    ) as HTMLImageElement[];

    let currentIndex = 0, lastX = 0, lastY = 0;
    let activeImage: HTMLImageElement | null = null;
    let zIndexCounter = 1;
    const minDistance = 180;

    const onMove = (e: MouseEvent) => {
      if (lastX === 0 && lastY === 0) { lastX = e.clientX; lastY = e.clientY; return; }
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      if (Math.hypot(dx, dy) <= minDistance) return;
      lastX = e.clientX; lastY = e.clientY;

      const img = popImages[currentIndex];
      if (!img) return;
      if (activeImage && activeImage !== img)
        gsap.to(activeImage, { opacity: 0, scale: 0.92, duration: 0.4, ease: "power3.out", overwrite: "auto" });

      gsap.killTweensOf(img);
      const rect = heroEl.getBoundingClientRect();
      gsap.set(img, {
        x: e.clientX - rect.left - 120 + gsap.utils.random(-30, 30),
        y: e.clientY - rect.top - 150 + gsap.utils.random(-30, 30),
        rotation: gsap.utils.random(-5, 5),
        scale: 0.9, opacity: 0,
        zIndex: zIndexCounter++,
      });
      gsap.timeline()
        .to(img, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" })
        .to(img, { opacity: 0, scale: 0.92, duration: 0.4, ease: "power3.out" },
          `+=${gsap.utils.random(0.5, 0.8)}`);

      activeImage = img;
      currentIndex = (currentIndex + 1) % popImages.length;
    };

    const onLeave = () => {
      gsap.to(popImages, { opacity: 0, scale: 0.92, duration: 0.4, ease: "power3.out", overwrite: "auto" });
      lastX = 0; lastY = 0; activeImage = null;
    };

    heroEl.addEventListener("mousemove", onMove);
    heroEl.addEventListener("mouseleave", onLeave);

    const trigger = gsap.to(
      [`.${styles.heroContent}`, `.${styles.popImages}`],
      {
        scrollTrigger: {
          trigger: `.${styles.worksSection}`,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
        scale: 0.7, y: -60, opacity: 0.2, ease: "none",
      }
    ).scrollTrigger as ScrollTrigger;

    return () => {
      heroEl.removeEventListener("mousemove", onMove);
      heroEl.removeEventListener("mouseleave", onLeave);
      trigger?.kill();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>The Design Elves | Independent Design Studio</title>
        <meta name="description" content="An independent studio building brands that matter — branding, packaging, UI/UX, and cinematic digital experiences." />
      </Helmet>

      {/* ── Hero ── */}
      <section ref={heroRef} className={styles.hero}>
        {/* Bokeh canvas */}
        <img
          src="/images/homepage/LandingPageHeroImg.png"
          alt="Hero Background"
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay} />
        {/* <canvas ref={canvasRef} className={styles.bokehCanvas} /> */}
        {/* Pop images on mouse move */}
        {/* <div ref={popContainerRef} className={styles.popImages}>
          {HERO_POP_IMAGES.map((src, i) => (
            <img key={i} src={src} alt="" />
          ))}
        </div> */}
        {/* Text content */}
        <div className={styles.heroContent}>
          <div className={styles.headline}>

            <span className={styles.lineWrap}>
              <span ref={lineDesignRef} className={`${styles.lineInner} ${styles.wordDesign}`}>
                Design
              </span>
            </span>

            <span className={styles.lineWrap}>
              <em ref={lineWithRef} className={`${styles.lineInner} ${styles.wordWith}`}>
                with
              </em>
            </span>

            <span className={styles.lineWrap}>
              <span ref={lineIntentRef} className={`${styles.lineInner} ${styles.wordIntent}`}>
                Intent.
              </span>
            </span>

          </div>

          {/* Bottom row */}
          <div className={styles.heroBottom}>
            <p ref={subtitleRef} className={styles.heroSubtitle}>
              A creative design agency
              building iconic brands and<br />
              digital experiences that
              drive culture forward.
            </p>
            <div ref={ctaRef} className={styles.heroCta}>
              <span className={styles.ctaLabel}>View our work</span>
              <Link to="/work" className={styles.ctaCircle} aria-label="View our work">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="19" x2="19" y2="5" />
                  <polyline points="5 5 19 5 19 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>


      </section>

      {/* ── Selected Works ── */}
      {/* worksSection class keeps the hero scroll-parallax trigger alive */}
      <div className={styles.worksSection}>
        <WorksSection />
      </div>

      {/* ── Services ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.worksHeader} fade-up`} style={{ justifyContent: "flex-start" }}>
            <h2>Services</h2>
          </div>
          <div className={styles.servicesGrid}>
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className={`${styles.service} fade-up`}
              >
                <img className={styles.serviceBg} src={s.img} alt={s.title} loading="lazy" />
                <div className={styles.serviceOverlay} />
                <div className={styles.serviceContent}>
                  <div className={styles.serviceTop}>
                    <h3>{s.title}</h3>
                    <div className={styles.serviceIcon}>
                      <span className={styles.lineH} />
                      <span className={styles.lineV} />
                    </div>
                  </div>
                  <div className={styles.serviceDetails}>
                    <p>{s.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <AboutSection />
    </>
  );
}
