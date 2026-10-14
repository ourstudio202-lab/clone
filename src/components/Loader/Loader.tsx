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

        {/* ── Logo ── */}
        <div className={styles.logoWrap}>
          <img src="/logo-icon.png" alt="The Design Elves" className={styles.logoImg} />
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
