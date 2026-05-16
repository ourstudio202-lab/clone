import styles from "./Loader.module.scss";

const STUDIO_NAME = "The Design Elves";
const SUBTEXT     = "Creative  ·  Design  ·  Agency";

export default function Loader() {
  return (
    <div className={styles.loader} aria-hidden>

      {/* ── Progress line — fills across the full intro duration ── */}
      <div className={styles.progressBar} />

      {/* ── Ambient glow ── */}
      <div className={styles.glow} />

      <div className={styles.content}>

        {/* ── Logo with drawing ring ── */}
        <div className={styles.logoWrap}>
          {/* SVG ring that traces around the logo */}
          <svg className={styles.logoRing} viewBox="0 0 110 110" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="55" cy="55" r="52"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="0.75" />
            <circle className={styles.ringTrace} cx="55" cy="55" r="52"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="0.75"
              strokeLinecap="round" />
          </svg>
          <img src="/logo.png" alt="The Design Elves" className={styles.logoImg} />
        </div>

        {/* ── Studio name — each char clips up ── */}
        <div className={styles.nameRow} aria-label={STUDIO_NAME}>
          {STUDIO_NAME.split("").map((ch, i) => (
            <span
              key={i}
              className={styles.nameChar}
              style={{ animationDelay: `${1.0 + i * 0.065}s` }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* ── Divider that extends ── */}
        <div className={styles.divider} />

        {/* ── Subtext — each char fades up ── */}
        <div className={styles.subtextRow} aria-label={SUBTEXT}>
          {SUBTEXT.split("").map((ch, i) => (
            <span
              key={i}
              className={styles.subtextChar}
              style={{ animationDelay: `${2.5 + i * 0.048}s` }}
            >
              {ch}
            </span>
          ))}
        </div>

      </div>

      {/* ── Bottom label ── */}
      <div className={styles.footerLabel}>
        <span className={styles.footerText}>Est. 2024</span>
        <span className={styles.footerText}>Independent Studio</span>
      </div>

    </div>
  );
}
