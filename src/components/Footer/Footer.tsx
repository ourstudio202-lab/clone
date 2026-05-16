import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.heading}>
            Let’s Make<br />it Happen!
          </h2>
          <Link to="/contact" className={styles.btn}>Contact Now</Link>
        </div>

        <div className={styles.right}>
          <div className={styles.contact}>
            <p>thedesignelves@gmail.com</p>
            <p>+91 9098111911</p>
          </div>
          <div className={styles.socials}>
            <a className={styles.social} aria-label="Instagram" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/the_design_elves?igsh=MWViMXo4Mnl3MWM3cw==">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a className={styles.social} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/the-design-elves/?viewAsMember=true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a className={styles.social} aria-label="Behance" target="_blank" rel="noopener noreferrer" href="https://www.behance.net/waddleco">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8.98 11.23a3.55 3.55 0 0 0 2.5-1.07 3.32 3.32 0 0 0 .86-2.28 3.2 3.2 0 0 0-1-2.41 3.84 3.84 0 0 0-2.66-.9H2v14.16h6.76a4 4 0 0 0 2.87-1 3.5 3.5 0 0 0 1-2.64 3.4 3.4 0 0 0-1-2.58 3.75 3.75 0 0 0-2.65-.9zm-3.6-4h2.7a1.64 1.64 0 0 1 1.25.4 1.44 1.44 0 0 1 .4 1.11 1.45 1.45 0 0 1-.41 1.09 1.7 1.7 0 0 1-1.26.4H5.38zm0 7v-3.34h3a1.86 1.86 0 0 1 1.37.45 1.62 1.62 0 0 1 .46 1.24 1.6 1.6 0 0 1-.46 1.22 1.88 1.88 0 0 1-1.37.43z" /><path d="M22 11.53c0-1.12-.26-2.09-.77-2.92a4.83 4.83 0 0 0-2.22-1.92 6.13 6.13 0 0 0-3.15-.4 5.92 5.92 0 0 0-3 .76 4.78 4.78 0 0 0-2 2.13 6.64 6.64 0 0 0-.7 3.12 6.64 6.64 0 0 0 .7 3.12 4.7 4.7 0 0 0 2 2.11 6.14 6.14 0 0 0 3.09.76 5.89 5.89 0 0 0 3-.77 4.54 4.54 0 0 0 2.05-2 5.35 5.35 0 0 0 .66-2.12h-3.41a1.94 1.94 0 0 1-.65 1.17 2 2 0 0 1-1.57.57 2 2 0 0 1-1.57-.6 2.37 2.37 0 0 1-.6-1.56H22v-.47zm-8.41-1.63a1.94 1.94 0 0 1 1.46-.62 2 2 0 0 1 1.51.58 2.27 2.27 0 0 1 .59 1.56h-4.14a2.22 2.22 0 0 1 .58-1.52z" /><path d="M15.42 4.41h5.84v2.54h-5.84z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
