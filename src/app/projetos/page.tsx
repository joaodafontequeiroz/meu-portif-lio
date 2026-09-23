import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import styles from "./projetos.module.css";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `Projetos — ${siteConfig.name}`,
  description:
    "Todos os projetos: web, dados, Java, hardware e experimentos 3D no navegador.",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <Reveal>
            <p className={styles.kicker}>
              <span className={styles.prompt}>&gt;~$</span> ls ./projetos --all
            </p>
            <h1 className={styles.title}>
              Projetos<span className={styles.dot}>.</span>
            </h1>
            <p className={styles.subtitle}>
              {projects.length} projetos — de sistemas web a hardware, passando
              por bancos de dados e 3D no navegador.
            </p>
          </Reveal>

          <div className={styles.table}>
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={Math.min(i * 60, 300)}>
                <Link
                  href={`/projetos/${project.slug}`}
                  className={styles.row}
                >
                  <span className={styles.index}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className={styles.nameCell}>
                    <span className={styles.name}>{project.title}</span>
                    <span className={styles.tagline}>{project.tagline}</span>
                  </span>

                  <span className={styles.category}>
                    [{project.category.toLowerCase()}]
                  </span>

                  <span className={styles.year}>{project.year}</span>

                  <span className={styles.arrow} aria-hidden="true">
                    -&gt;
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
