import styles from "./Loader.module.scss";

const STUDIO_NAME = "The Design Elves";
const SUBTEXT     = "Creative  ·  Design  ·  Agency";

export default function Loader() {
  return (
    <div className={styles.loader} aria-hidden>
      <div className={styles.content}>

        {/* Logo */}
        <div className={styles.logoWrap}>
          <img src="/logo.png" alt="The Design Elves" className={styles.logoImg} />
        </div>

        {/* Studio name — each char rises */}
        <div className={styles.nameRow} aria-label={STUDIO_NAME}>
          {STUDIO_NAME.split("").map((ch, i) => (
            <span
              key={i}
              className={styles.nameChar}
              style={{ animationDelay: `${0.42 + i * 0.03}s` }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Subtext — each char fades up */}
        <div className={styles.subtextRow} aria-label={SUBTEXT}>
          {SUBTEXT.split("").map((ch, i) => (
            <span
              key={i}
              className={styles.subtextChar}
              style={{ animationDelay: `${1.0 + i * 0.022}s` }}
            >
              {ch}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}
