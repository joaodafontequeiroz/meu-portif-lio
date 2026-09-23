import styles from "./Footer.module.css";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.line}>
          <span className={styles.prompt}>&gt;~</span> designed &amp; built por{" "}
          <span className={styles.name}>{siteConfig.name}</span>
        </p>
        <p className={styles.meta}>
          Next.js · React · CSS Modules — {new Date().getFullYear()}
        </p>
        <p className={styles.meta}>
          {projects.length} projetos catalogados · <span className={styles.exit}>exit 0</span>
        </p>
      </div>
    </footer>
  );
}
