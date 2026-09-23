import Link from "next/link";
import styles from "./Header.module.css";
import { siteConfig } from "@/data/site";

const nav = [
  { href: "/#sobre", label: "sobre" },
  { href: "/#experiencia", label: "experiência" },
  { href: "/#projetos", label: "projetos" },
  { href: "/jogo-da-forca", label: "jogo da forca" }, // ADICIONADO: acesso à página do jogo.
  { href: "/#contato", label: "contato" },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="Página inicial">
          <span className={styles.logoPrompt}>&gt;~</span>
          <span className={styles.logoName}>{siteConfig.shortName.toLowerCase()}</span>
          <span className={styles.cursor} aria-hidden="true" />
        </Link>

        <nav className={styles.nav} aria-label="Navegação principal">
          {nav.map((item, i) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              <span className={styles.navIndex}>0{i + 1}.</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <a href={`mailto:${siteConfig.email}`} className={styles.cta}>
          contato
        </a>
      </div>
    </header>
  );
}
