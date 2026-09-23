import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Scroll reveal sem custo de hidratação: renderiza apenas um <div data-reveal>
 * (componente de servidor). O <RevealObserver /> no layout observa todos os
 * [data-reveal] da página com um único IntersectionObserver e adiciona a
 * classe de visão — mesmo efeito visual, zero JS por instância.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <div
      data-reveal=""
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
