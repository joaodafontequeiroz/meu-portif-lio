import Reveal from "@/components/Reveal";
import SectionHeader from "./SectionHeader";
import styles from "./Experience.module.css";
import { experiences } from "@/data/resume";

export default function Experience() {
  return (
    <section id="experiencia" className="section">
      <div className="container">
        <SectionHeader
          index="02"
          title="Experiência"
          subtitle="Onde trabalhei, pesquisei e construí — dentro e fora da sala de aula."
        />

        <ol className={styles.list}>
          {experiences.map((exp, i) => (
            <Reveal key={exp.role} delay={i * 100}>
              <li className={styles.item}>
                <p className={styles.period}>{exp.period}</p>

                <div className={styles.body}>
                  <h3 className={styles.role}>
                    {exp.role} <span className={styles.at}>@</span>{" "}
                    <span className={styles.company}>{exp.company}</span>
                  </h3>
                  <p className={styles.description}>{exp.description}</p>

                  <ul className={styles.tags}>
                    {exp.tags.map((tag) => (
                      <li key={tag} className={styles.tag}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
