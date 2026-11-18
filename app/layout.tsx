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
    default: "Kultursjokk",
    template: "%s — Kultursjokk",
  },
  description:
    "Kultursjokk er et eventkollektiv i Ålesund som skaper unike musikk- og kulturarrangementer i utradisjonelle lokasjoner.",
  metadataBase: new URL("https://kultursjokk.no"),
  keywords: [
    "Kultursjokk",
    "KORSA",
    "rave",
    "Ålesund",
    "Korsatunnelen",
    "drum and bass",
    "techno",
    "festival",
    "konsert",
  ],
  openGraph: {
    title: "Kultursjokk",
    description:
      "Kultursjokk er et eventkollektiv i Ålesund som skaper unike musikk- og kulturarrangementer i utradisjonelle lokasjoner.",
    locale: "nb_NO",
    type: "website",
    siteName: "Kultursjokk",
    images: [
      {
        url: "/images/korsa-hero.jpg",
        alt: "Kultursjokk — rave i Korsatunnelen, Ålesund",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kultursjokk",
    description:
      "Kultursjokk er et eventkollektiv i Ålesund som skaper unike musikk- og kulturarrangementer i utradisjonelle lokasjoner.",
    images: ["/images/korsa-hero.jpg"],
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
