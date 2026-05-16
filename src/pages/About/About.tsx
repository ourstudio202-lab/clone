import { Helmet } from "react-helmet-async";
import styles from "./About.module.scss";
import { useReveal } from "@/hooks/useReveal";

const approach = [
  { n: "01", title: "We start with “why”", text: ["Before colors. Before layouts. Before anything.", "If the idea isn’t clear, no amount of design will fix it."] },
  { n: "02", title: "We remove before we add", text: ["Good design isn’t about adding more.", "It’s about knowing what to take away."] },
  { n: "03", title: "We design for real people", text: ["Not designers. Not trends.", "Actual humans who don’t have time to figure things out."] },
  { n: "04", title: "We make it feel right", text: ["There’s logic. And then there’s feel.", "The best design? You just trust it."] },
];

export default function About() {
  useReveal([]);
  return (
    <>
      <Helmet>
        <title>The Design Elves | About</title>
        <meta name="description" content="An independent creative studio built on one belief — design should work, not just exist." />
      </Helmet>

      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={`${styles.title} fade-up`}>
            We don’t just make things look good.<br />
            We make them make sense.
          </h1>
          <p className={`${styles.subtitle} fade-up stagger-1`}>
            Design Elves is a creative studio built on one simple belief —<br />
            design should work, not just exist.
          </p>
        </div>
      </section>

      <section className={styles.approach}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {approach.map((a, i) => (
              <div key={a.n} className={`${styles.card} fade-up ${i > 0 ? `stagger-${Math.min(i, 4)}` : ""}`}>
                <span className={styles.number}>{a.n}</span>
                <h3 className={styles.cardTitle}>{a.title}</h3>
                <p className={styles.cardText}>
                  {a.text[0]}<br /><br />{a.text[1]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
