import Reveal from "@/components/Reveal";
import SectionHeader from "./SectionHeader";
import styles from "./Contact.module.css";
import { siteConfig } from "@/data/site";

export default function Contact() {
  const socials = Object.values(siteConfig.socials);

  return (
    <section id="contato" className="section">
      <div className="container">
        <SectionHeader
          index="04"
          title="Contato"
          subtitle="Aberto a projetos, estágios, pesquisa e boas conversas sobre tecnologia."
        />

        <Reveal>
          <p className={styles.terminal}>
            <span className={styles.prompt}>&gt;~$</span> echo &quot;vamos conversar?&quot;
          </p>

          <a href={`mailto:${siteConfig.email}`} className={styles.email}>
            {siteConfig.email}
          </a>

          <p className={styles.blurb}>
            Respondo rápido — prometo. Também estou no{" "}
            {socials.map((s, i) => (
              <span key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  {s.label}
                </a>
                {i < socials.length - 1 && ", "}
              </span>
            ))}
            .
          </p>

          <p className={styles.location}>
            <span className={styles.locationMono}># {siteConfig.location}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
