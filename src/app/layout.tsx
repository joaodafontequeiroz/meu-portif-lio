import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/data/site";
import RevealObserver from "@/components/RevealObserver";

const display = localFont({
  src: "./fonts/bricolage-grotesque-latin.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "100 900",
});

const body = localFont({
  src: "./fonts/inter-latin.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "100 900",
});

const mono = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "100 800",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "portfólio",
    "ciência da computação",
    "desenvolvedor",
    siteConfig.shortName,
  ],
  authors: [{ name: siteConfig.name }],
};

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
