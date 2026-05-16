import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Navbar.module.scss";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/contact", label: "Contact" },
];

interface NavbarProps {
  ready?: boolean;
}

const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1], // expo out
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Navbar({ ready = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <motion.header
      initial="hidden"
      animate={ready ? "visible" : "hidden"}
      variants={headerVariants}
      className={[
        styles.header,
        scrolled ? styles.scrolled : "",
      ].filter(Boolean).join(" ")}
    >
      <nav className={styles.navbar}>

        {/* ── Logo group ── */}
        <Link to="/" className={styles.logo} onClick={() => setOpen(false)}>
          <motion.div className={styles.logoWrapper} variants={itemVariants}>

            <div className={styles.logoClip}>
              <img
                src="/logo.png"
                alt="The Design Elves"
                className={styles.logoImg}
              />
            </div>

            <div className={styles.separator} />

            <div className={styles.subText}>
              {["CREATIVE", "DESIGN", "AGENCY"].map((word) => (
                <div key={word} className={styles.subTextClip}>
                  <span className={styles.subTextWord}>
                    {word}
                  </span>
                </div>
              ))}
            </div>

          </motion.div>
        </Link>

        {/* ── Desktop nav links ── */}
        <div className={`${styles.links} ${open ? styles.linksOpen : ""}`}>
          {links.map((l) => (
            <motion.div key={l.to} className={styles.linkClip} variants={itemVariants}>
              <NavLink
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) => isActive ? styles.active : undefined}
              >
                {l.label}
              </NavLink>
            </motion.div>
          ))}
        </div>

        {/* ── Mobile hamburger ── */}
        <motion.button
          variants={itemVariants}
          className={`${styles.toggle} ${open ? styles.toggleActive : ""}`}
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle Menu"
        >
          <span className={styles.line} />
          <span className={styles.line} />
          <span className={styles.line} />
        </motion.button>

      </nav>
    </motion.header>
  );
}
