import { Anton, Inter, JetBrains_Mono } from "next/font/google";

/**
 * Sentral font-import.
 * ====================
 *
 * Vi bruker `next/font/google` som automatisk self-hoster fontene
 * under bygg — det gir raskere lasting og bedre personvern (ingen
 * kall til Google ved sidebesøk).
 *
 * Variabler eksponeres som CSS custom properties og kobles til
 * Tailwind via `fontFamily`-seksjonen i `tailwind.config.ts`.
 */

// Display-font for store overskrifter (KORSA, seksjonstitler)
export const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

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
