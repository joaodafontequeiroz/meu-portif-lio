import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Forca from "@/components/Forca";
import styles from "./forca.module.css";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: `Jogo da Forca — ${siteConfig.name}`,
  description:
    "Jogo da forca em React — temas de tecnologia, teclado virtual e boneco em ASCII art. Feito para este portfólio.",
};

export default function ForcaPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <Reveal>
            <p className={styles.kicker}>
              <span className={styles.prompt}>&gt;~$</span> ./jogo-da-forca --start
            </p>

            <h1 className={styles.title}>
              Jogo da Forca<span className={styles.cursor}>_</span>
            </h1>

            <p className={styles.subtitle}>
              Digite no teclado físico ou use o teclado virtual. Você tem{" "}
              <span className={styles.accentText}>6 erros</span> antes do boneco
              completar — dica sempre incluída.
            </p>

            <Forca />
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
