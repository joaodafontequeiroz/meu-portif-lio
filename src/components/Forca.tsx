"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./Forca.module.css";

const MAX_ERRORS = 6;
const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

const WORDS: ReadonlyArray<{ word: string; hint: string }> = [
  { word: "algoritmo", hint: "conceito" },
  { word: "compilador", hint: "ferramenta" },
  { word: "recursao", hint: "conceito" },
  { word: "javascript", hint: "linguagem" },
  { word: "typescript", hint: "linguagem" },
  { word: "python", hint: "linguagem" },
  { word: "java", hint: "linguagem" },
  { word: "hardware", hint: "sistema" },
  { word: "kernel", hint: "sistema" },
  { word: "deploy", hint: "devops" },
  { word: "cache", hint: "conceito" },
  { word: "latencia", hint: "redes" },
  { word: "middleware", hint: "arquitetura" },
  { word: "framework", hint: "ferramenta" },
  { word: "fullstack", hint: "perfil" },
  { word: "open source", hint: "cultura" },
  { word: "machine learning", hint: "ia" },
  { word: "banco de dados", hint: "dados" },
  { word: "estrutura de dados", hint: "conceito" },
  { word: "docker", hint: "ferramenta" },
  { word: "webgl", hint: "graficos 3d" },
  { word: "rfid", hint: "hardware" },
  { word: "tabela hash", hint: "estrutura de dados" },
  { word: "portfolio", hint: "voce esta aqui" },
  { word: "api", hint: "web" }, // ADICIONADO: completar a lista mínima de palavras.
  { word: "frontend", hint: "desenvolvimento" },
  { word: "backend", hint: "desenvolvimento" },
  { word: "database", hint: "dados" },
  { word: "servidor", hint: "infraestrutura" },
  { word: "git", hint: "versionamento" },
  { word: "github", hint: "versionamento" },
  { word: "linux", hint: "sistema" },
  { word: "terminal", hint: "ferramenta" },
  { word: "interface", hint: "software" },
  { word: "objeto", hint: "programacao" },
  { word: "classe", hint: "programacao" },
];

/** Estágios do boneco — índice = número de erros (0..6). */
const STAGES = [
`
  +---+
  |   |
      |
      |
      |
      |
=========`,
`
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
`
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
`
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
`
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
`
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
`
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`,
];

type Status = "playing" | "won" | "lost";
type Stats = { wins: number; losses: number; streak: number; best: number };

const FIRST_WORD = WORDS[0]; // determinística na 1ª render (evita mismatch SSR)

export default function Forca() {
  const [entry, setEntry] = useState(FIRST_WORD);
  const [used, setUsed] = useState<string[]>([]);
  const [stats, setStats] = useState<Stats>({ wins: 0, losses: 0, streak: 0, best: 0 });

  const { word, hint } = entry;
  const errors = used.filter((l) => !word.includes(l)).length;
  const won = word.split("").every((c) => c === " " || used.includes(c));
  const lost = errors >= MAX_ERRORS;
  const status: Status = lost ? "lost" : won ? "won" : "playing";
  const finished = status !== "playing";

  const guess = useCallback(
    (letter: string) => {
      if (finished || used.includes(letter)) return;
      const nextUsed = [...used, letter];
      const nextErrors = nextUsed.filter((l) => !word.includes(l)).length;
      const nextWon = word
        .split("")
        .every((c) => c === " " || nextUsed.includes(c));
      const nextLost = nextErrors >= MAX_ERRORS;

      setUsed(nextUsed);
      if (nextWon) {
        setStats((s) => ({
          ...s,
          wins: s.wins + 1,
          streak: s.streak + 1,
          best: Math.max(s.best, s.streak + 1),
        }));
      } else if (nextLost) {
        setStats((s) => ({ ...s, losses: s.losses + 1, streak: 0 }));
      }
    },
    [used, finished, word]
  );

  const restart = useCallback(() => {
    let next = WORDS[Math.floor(Math.random() * WORDS.length)];
    if (WORDS.length > 1 && next.word === word) {
      next = WORDS[(WORDS.indexOf(next) + 1) % WORDS.length];
    }
    setEntry(next);
    setUsed([]);
  }, [word]);

  // teclado físico
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Enter" && finished) {
        restart();
        return;
      }
      const k = e.key.toLowerCase();
      if (k.length === 1 && k >= "a" && k <= "z") guess(k);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [guess, finished, restart]);

  // placar persistido no navegador
  useEffect(() => {
    try {
      const raw = localStorage.getItem("forca-stats");
      if (raw) setStats(JSON.parse(raw) as Stats);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("forca-stats", JSON.stringify(stats));
    } catch {}
  }, [stats]);

  return (
    <div className={styles.game}>
      <div className={styles.statusBar} aria-live="polite">
        <span>
          <span className={styles.prompt}>$</span> ./forca --jogar
        </span>
        <span>
          erros:{" "}
          <span className={errors >= 4 ? styles.danger : styles.accent}>
            {errors}/{MAX_ERRORS}
          </span>
        </span>
        <span>
          dica: <span className={styles.accent}>[{hint}]</span>
        </span>
      </div>

      <div className={styles.board}>
        <pre
          className={`${styles.gallows} ${status === "lost" ? styles.gallowsLost : ""}`}
          aria-hidden="true"
        >
          {STAGES[errors]}
        </pre>

        <div className={styles.right}>
          <div className={styles.wordRow}>
            {word.split("").map((ch, i) => {
              if (ch === " ") return <span key={i} className={styles.wordGap} />;
              const revealed = used.includes(ch) || status === "lost";
              const missed = status === "lost" && !used.includes(ch);
              return (
                <span
                  key={i}
                  className={[
                    styles.slot,
                    revealed ? styles.slotOn : "",
                    missed ? styles.slotMiss : "",
                  ].join(" ")}
                >
                  {revealed ? ch : ""}
                </span>
              );
            })}
          </div>

          <div className={styles.keyboard} role="group" aria-label="Teclado virtual">
            {ALPHABET.map((letter) => {
              const isUsed = used.includes(letter);
              const hit = isUsed && word.includes(letter);
              const miss = isUsed && !word.includes(letter);
              return (
                <button
                  key={letter}
                  type="button"
                  className={[
                    styles.key,
                    hit ? styles.keyHit : "",
                    miss ? styles.keyMiss : "",
                  ].join(" ")}
                  onClick={() => guess(letter)}
                  disabled={isUsed || finished}
                  aria-label={`Letra ${letter}${hit ? " — correta" : miss ? " — não existe" : ""}`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {finished && (
        <div className={styles.result} role="status">
          {status === "won" ? (
            <p className={styles.resultLine}>
              <span className={styles.accent}>✔ vitória</span> — palavra:{" "}
              <span className={styles.resultWord}>{word}</span>
            </p>
          ) : (
            <p className={styles.resultLine}>
              <span className={styles.danger}>✘ game over</span> — a palavra era{" "}
              <span className={styles.resultWord}>{word}</span>
            </p>
          )}
          <button type="button" className="btn btnSolid" onClick={restart}>
            novo jogo (enter)
          </button>
        </div>
      )}

      <p className={styles.statsLine}>
        vitórias: <span className={styles.accent}>{stats.wins}</span> · derrotas:{" "}
        <span className={styles.danger}>{stats.losses}</span> · sequência:{" "}
        <span className={styles.accent}>{stats.streak}</span> · recorde: {stats.best}
        <span className={styles.statsHint}>{" // salvo no seu navegador"}</span>
      </p>
    </div>
  );
}
