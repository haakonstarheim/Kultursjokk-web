import type { Config } from "tailwindcss";

/**
 * Tailwind-konfigurasjon for Kultursjokk
 * ======================================
 *
 * Hele designsystemet lever her. Regelen er:
 * - Kun svart, hvitt og nyanser av grå — aldri farger.
 * - Skarpe hjørner (ingen rounded corners).
 * - Typografi gjør mesteparten av jobben.
 *
 * Fargepaletten er bevisst begrenset. Dersom du oppdager at du
 * trenger en tone som ikke finnes her, legg den inn som en ny
 * variant (f.eks. `ink-550`) framfor å bruke vilkårlige hex-verdier
 * ute i komponentene.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "ink" = svartskalaen vår. 0 = ren svart, 900 = dimmet lysgrå.
        // Ren hvit er bevisst ekskludert — paletten skal føles som
        // en mørk bunker opplyst av ett enslig lysstoffrør.
        ink: {
          0: "#000000",   // ren svart (hovedbakgrunn)
          50: "#060606",  // subtil overflate
          100: "#0B0B0B", // kort og seksjoner
          200: "#111111", // hover/aktiv overflate
          300: "#181818", // dividers
          400: "#202020", // sekundær overflate
          500: "#2C2C2C", // disabled
          600: "#404040", // meta / tertiær tekst (veldig dimmet)
          700: "#585858", // sekundær tekst
          800: "#787878", // mellomtekst
          900: "#A0A0A0", // primær tekst (dimmet grå — ingen hvit)
        },
      },
      fontFamily: {
        // Display-font: Anton. Brukes for store overskrifter.
        display: ["var(--font-anton)", "sans-serif"],
        // Brødtekst: Inter. Brukes for alt av lengre tekst.
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        // Monospace: JetBrains Mono. Brukes for datoer, metadata, labels.
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Egendefinerte størrelser for display-typografi.
        // Line-height er økt fra 0.82–0.9 til 1.0–1.05 slik at
        // overskrifter med flere linjer får ordentlig pusterom.
        "display-sm": ["clamp(3rem, 8vw, 5rem)", { lineHeight: "1.0", letterSpacing: "0.01em" }],
        "display-md": ["clamp(4rem, 12vw, 8rem)", { lineHeight: "1.0", letterSpacing: "0.01em" }],
        "display-lg": ["clamp(5rem, 16vw, 12rem)", { lineHeight: "1.05", letterSpacing: "0.01em" }],
      },
      letterSpacing: {
        // "wider" brukt for små labels/eyebrows
        "meta": "0.2em",
        "eyebrow": "0.3em",
      },
      borderRadius: {
        // Vi bruker ingen runde hjørner — men lar DEFAULT være 0
        // slik at Tailwind-klassen `rounded` gir null-radius.
        DEFAULT: "0",
        none: "0",
      },
      transitionTimingFunction: {
        // En strammere ease som passer den brutalistiske stilen
        "brutal": "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
