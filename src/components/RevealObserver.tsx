"use client";

import { useEffect } from "react";

/**
 * Montado uma única vez no layout: adiciona `reveal-ready` ao <html>
 * (habilita os estilos de reveal só quando há JS) e observa todos os
 * [data-reveal] com um único IntersectionObserver, adicionando
 * `is-visible` quando cada elemento entra na viewport.
 */
export default function RevealObserver() {
  useEffect(() => {
    const docEl = document.documentElement;
    docEl.classList.add("reveal-ready");

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (els.length === 0) return;

    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
