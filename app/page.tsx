import Image from "next/image";
import Link from "next/link";
import { getUpcomingEvent, hasTickets } from "@/lib/events";

/**
 * Landing page — forside
 * ======================
 *
 * Bevisst single-screen-side: alt som betyr noe skal være synlig
 * uten å scrolle. Siden fungerer som et plakat-statement for det
 * kommende arrangementet.
 *
 * Datadrevet: vi henter det kommende arrangementet fra lib/events.
 *   - Finnes et "upcoming"-event  → forsiden viser plakat + CTA.
 *   - Finnes ingen               → vi faller tilbake til
 *                                   "Coming soon"-statementet.
 *
 * Plakaten (med innbakt tittel/lineup) brukes som full-bleed
 * bakgrunn. Vi legger derfor IKKE en duplikat-tittel oppå — kun en
 * tynn CTA-stripe nederst med dato, sted og billettknapp.
 *
 * Layout:
 *   ┌────────────────────────────────────────┐
 *   │  KULTURSJOKK        nav nav nav        │  <- header
 *   │                                        │
 *   │            (plakat-bakgrunn)           │
 *   │                                        │
 *   │  Next event · dato · sted              │  <- meta
 *   │  [ Kjøp billetter ]  Mer info →        │  <- CTA
 *   └────────────────────────────────────────┘
 */
export default function LandingPage() {
  const event = getUpcomingEvent();

  // ── Fallback: ingen kommende arrangementer ─────────────────
  // Beholder det opprinnelige "Coming soon"-statementet slik at
  // forsiden alltid ser komplett ut mellom to arrangementer.
  if (!event) {
    return (
      <div className="relative h-[100dvh] w-full overflow-hidden bg-ink-0">
        <div className="absolute inset-0">
          <Image
            src="/images/korsa-hero.jpg"
            alt="Korsatunnelen — person med armene i været"
            fill
            priority
            quality={85}
            className="object-cover object-center grayscale"
            sizes="100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-ink-0/80 via-ink-0/60 to-ink-0/95"
          />
          <div aria-hidden className="absolute inset-0 bg-ink-0/40" />
        </div>

        <div className="relative z-10 flex h-full flex-col px-6 py-8 md:px-16 md:py-12">
          <SiteNav />
          <section className="flex flex-1 items-center">
            <div className="max-w-4xl">
              <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-700">
                Next event
              </p>
              <h1 className="font-display text-[clamp(4.5rem,16vw,11rem)] leading-[0.95] uppercase text-ink-900 mt-4 md:mt-6">
                Coming soon
              </h1>
            </div>
          </section>
          <footer className="border-t border-ink-400 pt-6">
            <p className="font-mono text-[10px] tracking-meta uppercase text-ink-600">
              Følg med — neste arrangement annonseres her
            </p>
          </footer>
        </div>
      </div>
    );
  }

  // ── Aktivt arrangement ─────────────────────────────────────
  const ticketsLive = hasTickets(event);

  // Layout: header øverst, HELE plakaten i midten (object-contain, så
  // ingenting beskjæres — artistene er alltid synlige), CTA nederst.
  // Ingen gradient over bildet: plakaten vises rent som kunstverket.
  return (
    <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-ink-0 px-6 py-8 md:px-16 md:py-12">
      <SiteNav />

      {/* Skjult h1 for SEO/skjermlesere — plakaten viser tittelen
          visuelt, men dokumentet trenger en tekstlig overskrift. */}
      <h1 className="sr-only">
        {event.title}
        {event.subtitle ? ` — ${event.subtitle}` : ""}
      </h1>

      {/* Plakat — fyller plassen mellom header og CTA. `object-contain`
          + relativ wrapper sørger for at hele plakaten vises uansett
          skjermformat. Plakaten beholdes i farge. */}
      <div className="relative min-h-0 flex-1 py-6 md:py-8">
        <Image
          src={event.heroImage}
          alt={`Plakat — ${event.title}${event.subtitle ? ` · ${event.subtitle}` : ""}`}
          fill
          priority
          quality={90}
          className="object-contain"
          sizes="100vw"
        />
      </div>

      {/* CTA-stripe nederst */}
      <footer className="border-t border-ink-400 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <p className="font-mono text-[11px] md:text-[13px] tracking-meta uppercase text-ink-900">
            {event.dateRange} · {event.doors} · {event.venue}
          </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            {ticketsLive ? (
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-ink-900 px-7 py-3 font-mono text-[11px] tracking-meta uppercase text-ink-900 transition-colors hover:bg-ink-900 hover:text-ink-0"
              >
                Kjøp billetter
              </a>
            ) : (
              <span className="inline-block border border-ink-500 px-7 py-3 font-mono text-[11px] tracking-meta uppercase text-ink-600">
                Billetter slippes snart
              </span>
            )}

            <Link
              href="/arrangementer"
              className="font-mono text-[11px] tracking-meta uppercase text-ink-800 transition-colors hover:text-ink-900"
            >
              Mer info →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * Forsidens egen header/nav.
 * (Forsiden bruker ikke den globale SiteHeader fordi den ligger
 * transparent oppå plakaten med egen padding-rytme.)
 */
function SiteNav() {
  return (
    <header className="flex items-center justify-between">
      <Link
        href="/"
        className="font-display text-xl md:text-2xl uppercase tracking-wide text-ink-900 hover:text-ink-900 transition-colors"
      >
        Kultursjokk
      </Link>

      <nav className="flex items-center gap-6 md:gap-10 font-mono text-[10px] md:text-[11px] tracking-meta uppercase">
        <Link
          href="/resident-djs"
          className="text-ink-800 hover:text-ink-900 transition-colors"
        >
          Resident&nbsp;DJs
        </Link>
        <Link
          href="/arrangementer"
          className="text-ink-800 hover:text-ink-900 transition-colors"
        >
          Arrangementer
        </Link>
        <a
          href="mailto:haakonstarheim@gmail.com"
          className="text-ink-800 hover:text-ink-900 transition-colors"
        >
          Kontakt
        </a>
      </nav>
    </header>
  );
}
