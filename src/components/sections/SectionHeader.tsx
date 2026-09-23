import Reveal from "@/components/Reveal";
import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  index: string;
  title: string;
  subtitle?: string;
};

/** Cabeçalho padrão das seções: índice monospace + título grande. */
export default function SectionHeader({ index, title, subtitle }: SectionHeaderProps) {
  return (
    <Reveal>
      <header className={styles.header}>
        <p className={styles.index}>
          <span className={styles.slash}>&gt;</span> {index}
        </p>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </header>
    </Reveal>
  );
}
