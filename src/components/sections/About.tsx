import Reveal from "@/components/Reveal";
import SectionHeader from "./SectionHeader";
import styles from "./About.module.css";
import { education } from "@/data/resume";

export default function About() {
  return (
    <section id="sobre" className="section">
      <div className="container">
        <SectionHeader
          index="01"
          title="Sobre mim"
          subtitle="Quem eu sou, o que estudo e o que guia minhas escolhas como desenvolvedor."
        />

        <div className={styles.grid}>
          <Reveal>
            <div className={styles.text}>
              <p>
                Me chamo <strong>João Da Fonte Queiroz</strong>, moro na Região
                Metropolitana do Recife e sou estudante de <strong>Ciência da
                Computação na UNICAP</strong> (6º período). Tenho foco em
                desenvolvimento de software e resolução de problemas, com base
                sólida em Lógica de Programação, Orientação a Objetos e Bancos
                de Dados Relacionais.
              </p>
              <p>
                Possuo experiência prática em projetos acadêmicos e{" "}
                <strong>robótica inclusiva</strong>, aplicando conceitos de
                engenharia de software e arquitetura. Atualmente sou estagiário
                em Desenvolvimento de Software no <strong>SEBRAE</strong>,
                atuando com <strong>C#</strong>.
              </p>
              <p>
                Em constante aprendizado de novas tecnologias, busco expandir
                minha experiência na área.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <aside className={styles.card} aria-label="Formação acadêmica">
              <p className={styles.cardLabel}>educação</p>
              <h3 className={styles.degree}>{education.degree}</h3>
              <p className={styles.institution}>{education.institution}</p>

              <p className={styles.period}>
                <span className={styles.statusDot} aria-hidden="true" />
                {education.period} · {education.status}
              </p>

              <ul className={styles.highlights}>
                {education.highlights.map((item) => (
                  <li key={item} className={styles.highlight}>
                    <span className={styles.highlightArrow}>-&gt;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
