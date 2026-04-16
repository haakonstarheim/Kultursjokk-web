/**
 * Resident DJs — datafil
 * ======================
 *
 * Samme mønster som lib/events.ts: en type-trygg konstant som
 * lever her inntil vi eventuelt flytter den til et CMS eller DB.
 *
 * `image` er valgfri. Hvis den mangler rendres en svart plassholder
 * slik at layouten er konsistent fram til alle bilder finnes.
 */

export type Resident = {
  slug: string;
  name: string;
  genres: string; // Kort kommaseparert liste
  bio: string; // Full bio — vises i full lengde
  image?: string; // sti under /public (f.eks. "/images/djs/dvask.jpg")
  instagram?: string; // full URL til Instagram-profil
};

export const RESIDENTS: Resident[] = [
  {
    slug: "dvask",
    name: "Dvask",
    genres: "Garage, jazzhouse, vidt spekter",
    bio: "Dvask kan spille garage i 140 BPM én dag, og neste dag levere et fire timers jazzhouse-sett i flytsonen. Respekten for yrket står høyt. Om 70 år kan du finne ham bak vinylspillerne i en mørk kjeller i Berlin, eller i Ålesund, hvis drømmen går i oppfyllelse.",
    image: "/images/djs/dvask.jpg",
    instagram: "https://www.instagram.com/hakonbreivik/",
  },
  {
    slug: "burge",
    name: "Burge",
    genres: "Drum & Bass, techno",
    bio: "Burge er kjent for høy energi. Han spiller oftest Drum & Bass og techno i høyt tempo, og har spilt på raves, festivaler og events rundt om i landet. Settene hans er fulle av rytmer og groove som får dansegulvet til å bevege seg.",
    image: "/images/djs/burge.jpg",
    instagram: "https://www.instagram.com/djburge_/",
  },
  {
    slug: "kp",
    name: "KP",
    genres: "Hardtechno, hardcore, gabber, rawstyle",
    bio: "KP spiller hardtechno, hardcore, gabber og rawstyle. Høyt tempo, tunge kicks og mye energi. Musikk som bygger seg opp til det blir umulig å stå stille.",
    image: "/images/djs/kp.jpg",
    instagram: "https://www.instagram.com/solvevalderhaug/",
  },
  {
    slug: "baggy-jeans",
    name: "Dj Baggy Jeans",
    genres: "Bredt — alt med groove og bass",
    bio: "Baggy liker låter som lugger og basslines som bumper. Ingen sjanger er utelukket, men danseband skal man se langt etter.",
    image: "/images/djs/baggy-jeans.jpg",
    // ingen Instagram ennå
  },
];
