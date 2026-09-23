import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import styles from "./projeto.module.css";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${siteConfig.name}`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <Reveal>
            <nav className={styles.breadcrumb} aria-label="Voltar">
              <Link href="/projetos" className={styles.back}>
                <span className={styles.backPrompt}>&lt;~</span> todos os projetos
              </Link>
            </nav>

            <p className={styles.meta}>
              <span className={styles.category}>
                [{project.category.toLowerCase()}]
              </span>
              <span>{project.year}</span>
            </p>

            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.tagline}>{project.tagline}</p>

            {(project.repo || project.link) && (
              <div className={styles.actions}>
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btnSolid"
                  >
                    ver código
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btnGhost"
                  >
                    demo ao vivo
                  </a>
                )}
              </div>
            )}
          </Reveal>

          <Reveal delay={100}>
            <div className={styles.content}>
              <div>
                <h2 className={styles.heading}>
                  <span className={styles.headingMark}>//</span> sobre o projeto
                </h2>
                <p className={styles.description}>{project.description}</p>
              </div>

              <aside className={styles.stackCard}>
                <p className={styles.stackLabel}>stack</p>
                <ul className={styles.stackList}>
                  {project.stack.map((tech) => (
                    <li key={tech} className={styles.stackItem}>
                      <span className={styles.stackArrow}>-&gt;</span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </Reveal>

          <nav className={styles.pager} aria-label="Navegação entre projetos">
            {prev ? (
              <Link href={`/projetos/${prev.slug}`} className={styles.pagerLink}>
                <span className={styles.pagerDir}>&lt;-</span> {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/projetos/${next.slug}`}
                className={`${styles.pagerLink} ${styles.pagerNext}`}
              >
                {next.title} <span className={styles.pagerDir}>-&gt;</span>
              </Link>
            )}
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
