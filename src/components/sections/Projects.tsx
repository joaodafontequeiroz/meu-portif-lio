import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeader from "./SectionHeader";
import styles from "./Projects.module.css";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export default function Projects() {
  return (
    <section id="projetos" className="section">
      <div className="container">
        <SectionHeader
          index="03"
          title="Projetos"
          subtitle="Uma seleção do que construí — clique em qualquer projeto para ver os detalhes."
        />

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 90}>
              <article
                className={`${styles.card} ${project.featured ? styles.featured : ""}`}
              >
                {/* link invisível que cobre o card inteiro → página do projeto */}
                <Link
                  href={`/projetos/${project.slug}`}
                  className={styles.cardLink}
                  aria-label={`Ver detalhes de ${project.title}`}
                />

                <div className={styles.cardTop}>
                  <span className={styles.folder} aria-hidden="true">
                    ./
                  </span>

                  <span className={styles.links}>
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkLabel}
                        title="Abrir repositório no GitHub"
                      >
                        repo ↗
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkLabel}
                        title="Abrir demo ao vivo"
                      >
                        demo ↗
                      </a>
                    )}
                  </span>
                </div>

                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.tagline}>{project.tagline}</p>

                <p className={styles.description}>{project.short}</p>

                <p className={styles.stack}>
                  <span className={styles.stackMono}>
                    [{project.category.toLowerCase()}]
                  </span>{" "}
                  {project.stack.join(" · ")}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className={styles.more}>
            <span className={styles.morePrompt}>&gt;~</span> mais experimentos no{" "}
            <a
              href={siteConfig.socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.moreLink}
            >
              GitHub
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
