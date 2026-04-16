/**
 * Arrangementsdata
 * ================
 *
 * Så lenge vi bare har ett arrangement (KORSA) og ingen database,
 * ligger all info her som en type-trygg konstant. Når vi senere får
 * flere events kan denne filen enkelt erstattes av et kall til
 * Supabase eller en CMS — grensesnittet forblir det samme.
 */

/**
 * DJ-oppføring for en arrangements-lineup.
 * `image` er valgfri — mangler den, rendres en plassholder-boks
 * slik at layouten forblir konsistent fram til alle bilder finnes.
 */
export type Dj = {
  name: string;
  image?: string; // sti under /public, f.eks. "/images/djs/dvask.jpg"
};

export type EventNight = {
  label: string; // "Natt 01"
  date: string; // "01.05.2026"
  day: string; // "Fredag"
  genre: string; // "Drum & Bass"
  lineup: Dj[];
};

export type Event = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  dateRange: string; // Kort visning: "01–02.05.2026"
  doors: string; // "22:00 → 04:00"
  age: string; // "20+"
  venue: string; // "Korsatunnelen, Ålesund"
  genres: string; // "DnB · Techno"
  heroImage: string; // sti under /public
  ticketUrl: string;
  nights: EventNight[];
};

export const KORSA: Event = {
  slug: "korsa",
  title: "KORSA",
  shortDescription:
    "To netter i Korsatunnelen — Ålesund. 1. mai: Drum & Bass. 2. mai: Techno.",
  description:
    "Et rave i Korsatunnelen. To netter, to sjangre, ett rom.",
  dateRange: "01–02.05.2026",
  doors: "22:00 → 04:00",
  age: "20+",
  venue: "Korsatunnelen, Ålesund",
  genres: "DnB · Techno",
  heroImage: "/images/korsa-hero.jpg",
  ticketUrl:
    "https://billetto.no/e/korsa-billetter-1877450?utm_source=organiser&utm_medium=share&utm_campaign=copy_link&utm_content=1",
  nights: [
    {
      label: "Natt 01",
      date: "01.05.2026",
      day: "Fredag",
      genre: "Drum & Bass",
      lineup: [
        { name: "Dvask", image: "/images/djs/dvask.jpg" },
        { name: "Difee", image: "/images/lineup/difee.jpg" },
        { name: "Simon Peter", image: "/images/lineup/simon-peter.jpg" },
        { name: "Burge", image: "/images/djs/burge.jpg" },
      ],
    },
    {
      label: "Natt 02",
      date: "02.05.2026",
      day: "Lørdag",
      genre: "Techno",
      lineup: [
        { name: "Betong", image: "/images/lineup/betong.jpg" },
        {
          name: "Bick Dick Bandido",
          image: "/images/lineup/bick-dick-bandido.jpg",
        },
        { name: "Amnesi", image: "/images/lineup/amnesi.jpg" },
        { name: "KP", image: "/images/djs/kp.jpg" },
      ],
    },
  ],
};
