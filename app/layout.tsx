import type { Metadata } from "next";
import { anton, inter, jetbrainsMono } from "./fonts";
import "./globals.css";

/**
 * Root layout
 * ===========
 *
 * Denne filen omslutter alle sider. Her setter vi:
 * - HTML lang="nb" (norsk bokmål)
 * - Font-variabler på <html>-taggen slik at Tailwind kan bruke dem
 * - Globale metadata (tittel, beskrivelse, favicon)
 */

export const metadata: Metadata = {
  title: {
    default: "Kultursjokk — Alternative opplevelser",
    template: "%s — Kultursjokk",
  },
  description:
    "Kultursjokk er et eventkollektiv i Ålesund som skaper unike musikk- og kulturarrangementer i utradisjonelle lokasjoner.",
  metadataBase: new URL("https://kultursjokk.no"),
  openGraph: {
    title: "Kultursjokk",
    description: "Alternative opplevelser. Uforglemmelige øyeblikk.",
    locale: "nb_NO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="nb"
      className={`${anton.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-ink-0 text-ink-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
