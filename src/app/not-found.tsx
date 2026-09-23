import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <p className={styles.code}>
            <span className={styles.prompt}>$</span> cd <span className={styles.path}>/página</span>
          </p>
          <p className={styles.error}>bash: cd: página: No such file or directory</p>
          <h1 className={styles.title}>
            404<span className={styles.dot}>.</span>
          </h1>
          <p className={styles.hint}>Essa rota não existe (ainda).</p>
          <Link href="/" className="btn btnGhost">
            &lt;~ voltar ao início
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
