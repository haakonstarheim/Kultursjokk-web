/**
 * Arrangementsdata
 * ================
 *
 * All arrangementsinfo ligger her som type-trygge konstanter. Vi har
 * ingen database ennå, så denne filen er "sannhetskilden". Når vi
 * senere får flere events kan den enkelt erstattes av et kall til
 * Supabase eller en CMS — grensesnittet (typene + helper-funksjonene
 * nederst) forblir det samme, så sidene trenger ikke endres.
 *
 * Arkitektur:
 *   - Hvert arrangement har en `status`: "upcoming" (kommende/aktivt)
 *     eller "past" (avsluttet/historikk).
 *   - `events`-arrayet er den fulle lista.
 *   - Helper-funksjonene `getUpcomingEvent()` og `getPastEvents()`
 *     lar sidene hente det de trenger uten å kjenne til rekkefølgen.
 */

/**
 * DJ-oppføring for en arrangements-lineup.
 * `image` er valgfri — mangler den, rendres en plassholder-boks
 * slik at layouten forblir konsistent fram til alle bilder finnes.
 */
export type Dj = {
  name: string;
  image?: string; // sti under /public, f.eks. "/images/djs/dvask.jpg"
  instagram?: string; // full URL til Instagram-profil
};

/**
 * En "natt"/kveld på et arrangement. Et arrangement kan ha flere
 * netter (f.eks. KORSA: én DnB-natt + én techno-natt) eller bare én
 * (f.eks. en all-nighter). `genre` er valgfri — droppes den, vises
 * bare lineup-en uten sjanger-overskrift.
 */
export type EventNight = {
  label: string; // "Natt 01"
  date: string; // "01.05.2026"
  day: string; // "Fredag"
  genre?: string; // "Drum & Bass" — valgfri
  lineup: Dj[];
};

export type Event = {
  slug: string;
  status: "upcoming" | "past"; // styrer om eventet vises som aktivt eller historikk
  title: string;
  subtitle?: string; // f.eks. "Forest All-Nighter"
  shortDescription: string;
  description: string;
  dateRange: string; // Kort visning: "25.07.2026"
  // ISO-tidspunkt for arrangementsstart (norsk tid). Brukes av
  // Countdown-komponenten. Valgfri — settes for kommende events.
  startsAt?: string; // "2026-07-25T22:00:00+02:00"
  doors: string; // "22:00 → 07:00"
  age: string; // "18+"
  venue: string; // "Secret location"
  genres?: string; // "DnB · Techno" — valgfri samlevisning
  heroImage: string; // sti under /public
  // Billettlenke. Valgfri — mangler den (eller er den tom) viser
  // sidene "Billetter slippes snart" i stedet for en aktiv knapp.
  ticketUrl?: string;
  nights: EventNight[];
};

/**
 * KONKRET × KULTURSJOKK — kommende arrangement (25.07.2026).
 * En skog-rave / all-nighter på hemmelig lokasjon.
 */
export const KONKRET: Event = {
  slug: "konkret-kultursjokk",
  status: "upcoming",
  title: "KONKRET × KULTURSJOKK",
  subtitle: "Forest All-Nighter",
  shortDescription:
    "Konkret × Kultursjokk inviterer til forest all-nighter på hemmelig lokasjon. Én natt, fire DJ-er, fra mørkets frembrudd til soloppgang.",
  description:
    "En all-nighter i skogen. Hemmelig lokasjon, sluppet til billettkjøpere før dørene åpner.",
  dateRange: "25.07.2026",
  startsAt: "2026-07-25T22:00:00+02:00",
  doors: "22:00 → 07:00",
  age: "18+", // gyldig legitimasjon kreves
  venue: "Secret location",
  // Plakatfil (Poster_09_Facebook_v3.png) kopieres inn som denne.
  heroImage: "/images/konkret-kultursjokk-2026.png",
  // Billetto — billettsalg live.
  ticketUrl:
    "https://billetto.no/e/konkret-x-kultursjokk-billetter-1958624?utm_source=organiser&utm_medium=share&utm_campaign=copy_link&utm_content=1",
  nights: [
    {
      label: "Natt 01",
      date: "25.07.2026",
      day: "Lørdag",
      // Ingen sjanger oppgitt — bevisst utelatt.
      lineup: [
        { name: "Anders Hajem (BCR)" },
        { name: "Betong", image: "/images/lineup/betong.jpg", instagram: "https://www.instagram.com/betong__/" },
        { name: "Nastex" },
        { name: "Valder" },
      ],
    },
  ],
};

/**
 * KORSA — avsluttet arrangement (01–02.05.2026). Beholdes som
 * historikk/dokumentasjon på /arrangementer.
 */
export const KORSA: Event = {
  slug: "korsa",
  status: "past",
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
  // Peker på KORSA 2026-plakaten som vises i historikk-seksjonen.
  heroImage: "/images/korsa-2026.jpg",
  ticketUrl:
    "https://billetto.no/e/korsa-billetter-1877450?utm_source=organiser&utm_medium=share&utm_campaign=copy_link&utm_content=1",
  nights: [
    {
      label: "Natt 01",
      date: "01.05.2026",
      day: "Fredag",
      genre: "Drum & Bass",
      lineup: [
        { name: "Dvask", image: "/images/djs/dvask.jpg", instagram: "https://www.instagram.com/hakonbreivik/" },
        { name: "Difee", image: "/images/lineup/difee.jpg", instagram: "https://www.instagram.com/difeemusic/" },
        { name: "Simon Peter", image: "/images/lineup/simon-peter.jpg", instagram: "https://www.instagram.com/dekallermegsimon/" },
        { name: "Burge", image: "/images/djs/burge.jpg", instagram: "https://www.instagram.com/djburge_/" },
      ],
    },
    {
      label: "Natt 02",
      date: "02.05.2026",
      day: "Lørdag",
      genre: "Techno",
      lineup: [
        { name: "Betong", image: "/images/lineup/betong.jpg", instagram: "https://www.instagram.com/betong__/" },
        {
          name: "Big Dick Bandido",
          image: "/images/lineup/bick-dick-bandido.jpg",
          instagram: "https://www.instagram.com/bigdickbandido/",
        },
        { name: "Amnesi", image: "/images/lineup/amnesi.jpg", instagram: "https://www.instagram.com/amnesi_no/" },
        { name: "KP", image: "/images/djs/kp.jpg", instagram: "https://www.instagram.com/solvevalderhaug/" },
      ],
    },
  ],
};

/**
 * Full liste over alle arrangementer. Rekkefølgen her er "nyeste
 * først" — kommende events øverst, deretter historikk.
 */
export const events: Event[] = [KONKRET, KORSA];

/**
 * Henter det kommende/aktive arrangementet (det første med
 * status "upcoming"), eller `null` hvis ingen er planlagt ennå.
 * Sidene bruker dette til å bestemme om forsiden skal vise et
 * arrangement eller et "Coming soon"-statement.
 */
export function getUpcomingEvent(): Event | null {
  return events.find((e) => e.status === "upcoming") ?? null;
}

/**
 * Henter alle avsluttede arrangementer (historikk), nyeste først.
 */
export function getPastEvents(): Event[] {
  return events.filter((e) => e.status === "past");
}

/**
 * Hjelper: har eventet en gyldig (ikke-tom) billettlenke?
 * Brukes for å velge mellom aktiv billettknapp og
 * "Billetter slippes snart"-tekst.
 */
export function hasTickets(event: Event): boolean {
  return typeof event.ticketUrl === "string" && event.ticketUrl.trim().length > 0;
}
