import styles from "./Hero.module.css";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Introdução">
      {/* fundo: schema relacional abstrato — tabelas, FKs e dados fluindo */}
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.glow} />

        <svg className={styles.schema} viewBox="0 0 700 700" fill="none">
          {/* conectores (FKs) */}
          <path className={styles.link} d="M230 120 H330 V216 H430" />
          <path className={styles.link} d="M525 274 V499 H490" />
          <path className={styles.link} d="M135 196 V499 H300" />

          <text x="338" y="208" className={styles.fk}>1:n</text>
          <text x="532" y="400" className={styles.fk}>n:1</text>
          <text x="142" y="400" className={styles.fk}>n:m</text>

          {/* pacotes de dados viajando pelas conexões */}
          <circle className={styles.flowDot} r="3">
            <animateMotion dur="5s" repeatCount="indefinite" path="M230 120 H330 V216 H430" />
          </circle>
          <circle className={styles.flowDot} r="2.5">
            <animateMotion dur="6s" begin="1.5s" repeatCount="indefinite" path="M525 274 V499 H490" />
          </circle>
          <circle className={styles.flowDot} r="3">
            <animateMotion dur="7s" begin="3s" repeatCount="indefinite" path="M135 196 V499 H300" />
          </circle>

          {/* tabela: usuarios */}
          <g>
            <rect x="40" y="82" width="190" height="116" className={styles.tableBox} />
            <rect x="40" y="82" width="190" height="28" className={styles.tableHead} />
            <text x="52" y="100" className={styles.tableTitle}>usuarios</text>
            <line x1="40" y1="132" x2="230" y2="132" className={styles.rowLine} />
            <line x1="40" y1="154" x2="230" y2="154" className={styles.rowLine} />
            <line x1="40" y1="176" x2="230" y2="176" className={styles.rowLine} />
            <text x="52" y="126" className={styles.cell}>id serial pk</text>
            <text x="52" y="148" className={styles.cell}>nome text</text>
            <text x="52" y="170" className={styles.cell}>email text</text>
            <text x="52" y="192" className={styles.cell}>criado_em date</text>
          </g>

          {/* tabela: projetos */}
          <g>
            <rect x="430" y="180" width="190" height="94" className={styles.tableBox} />
            <rect x="430" y="180" width="190" height="28" className={styles.tableHead} />
            <text x="442" y="198" className={styles.tableTitle}>projetos</text>
            <line x1="430" y1="230" x2="620" y2="230" className={styles.rowLine} />
            <line x1="430" y1="252" x2="620" y2="252" className={styles.rowLine} />
            <text x="442" y="224" className={styles.cell}>id serial pk</text>
            <text x="442" y="246" className={styles.cell}>titulo text</text>
            <text x="442" y="268" className={styles.cell}>stack text[]</text>
          </g>

          {/* tabela: tecnologias */}
          <g>
            <rect x="300" y="460" width="190" height="94" className={styles.tableBox} />
            <rect x="300" y="460" width="190" height="28" className={styles.tableHead} />
            <text x="312" y="478" className={styles.tableTitle}>tecnologias</text>
            <line x1="300" y1="510" x2="490" y2="510" className={styles.rowLine} />
            <line x1="300" y1="532" x2="490" y2="532" className={styles.rowLine} />
            <text x="312" y="504" className={styles.cell}>id serial pk</text>
            <text x="312" y="526" className={styles.cell}>nome text</text>
            <text x="312" y="548" className={styles.cell}>desde int</text>
          </g>
        </svg>
      </div>

      <div className={`container ${styles.inner}`}>
        <p className={styles.kicker}>
          <span className={styles.kickerLine} aria-hidden="true" />
          {siteConfig.role} — UNICAP
        </p>

        <h1 className={styles.name}>
          {siteConfig.name}
          <span className={styles.dot}>.</span>
        </h1>

        <p className={styles.lead}>
          Estudante de Ciência da Computação na UNICAP e estagiário de
          Desenvolvimento de Software no SEBRAE. Foco em{" "}
          <span className={styles.accentText}>resolução de problemas</span>,{" "}
          <span className={styles.accentText}>orientação a objetos</span> e{" "}
          <span className={styles.accentText}>bancos de dados relacionais</span>.
        </p>

        <div className={styles.actions}>
          <a href="#projetos" className="btn btnSolid">
            ver projetos
          </a>
          <a href="#contato" className="btn btnGhost">
            entrar em contato
          </a>
        </div>

        <p className={styles.meta}>
          <span className={styles.metaMono}>$ ls projetos/ | wc -l</span>
          <span className={styles.metaResult}>&rarr; {projects.length}</span>
        </p>
      </div>
    </section>
  );
}
