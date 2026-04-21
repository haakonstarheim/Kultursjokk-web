import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

/**
 * Sentral font-import.
 * ====================
 *
 * Display-fonten (Airstrike) er lokal (.ttf), resten bruker
 * `next/font/google` som self-hoster under bygg.
 *
 * Variabler eksponeres som CSS custom properties og kobles til
 * Tailwind via `fontFamily`-seksjonen i `tailwind.config.ts`.
 */

// Display-font for titler, DJ-navn og logo (Airstrike)
export const airstrike = localFont({
  src: "../public/fonts/airstrike.ttf",
  variable: "--font-display",
  display: "swap",
});

// Alias for bakoverkompatibilitet — alle steder som bruker `anton`
// peker nå til Airstrike uten at vi trenger endre importene overalt.
export const anton = airstrike;

// Brødtekst og UI-tekst
export const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Monospace for datoer, metadata og eyebrow-labels
export const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
