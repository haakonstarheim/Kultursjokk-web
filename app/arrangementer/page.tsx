import Image from "next/image";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { FadeIn } from "@/components/ui/fade-in";
import { ParallaxHero } from "@/components/ui/parallax-hero";
import { Countdown } from "@/components/ui/countdown";
import {
  getUpcomingEvent,
  getPastEvents,
  hasTickets,
  acceptsVolunteers,
  type Event,
} from "@/lib/events";

/**
 * Arrangementer
 * =============
 *
 * Rute: /arrangementer
 *
 * Datadrevet side med tre logiske deler:
 *   01  Hero          — det kommende arrangementet som plakat-statement
 *   02  Aktivt        — lineup, praktisk info og billettknapp
 *   03  Historikk     — tidligere arrangementer (KORSA m.fl.)
 *
 * Strukturen tåler vekst: legger man til flere "upcoming"/"past"
 * events i lib/events.ts, plukker denne siden dem opp automatisk.
 */

export const metadata: Metadata = {
  title: "Arrangementer — Kultursjokk",
  description:
    "Kommende og tidligere arrangementer i regi av Kultursjokk. Neste arrangement: KONKRET × KULTURSJOKK — Forest All-Nighter, 25.07.2026.",
};

export default function ArrangementerPage() {
  const upcoming = getUpcomingEvent();
  const past = getPastEvents();

  return (
    <>
      <SiteHeader variant="solid" />

      <main className="min-h-screen">
        {upcoming ? (
          <UpcomingSections event={upcoming} />
        ) : (
          <ComingSoonHero />
        )}

        {/* ── HISTORIKK ─────────────────────────────────────── */}
        {past.length > 0 && (
          <FadeIn>
            <section className="px-6 md:px-16 pt-24 md:pt-32 pb-2 max-w-5xl">
              <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600">
                Historikk
              </p>
              <p className="mt-8 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1] uppercase text-ink-900">
                Tidligere arrangementer.
              </p>
            </section>
          </FadeIn>
        )}

        {past.map((event) => (
          <PastEventBlock key={event.slug} event={event} />
        ))}
      </main>

      <SiteFooter />
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   KOMMENDE ARRANGEMENT
   ════════════════════════════════════════════════════════════ */

function UpcomingSections({ event }: { event: Event }) {
  const ticketsLive = hasTickets(event);

  return (
    <>
      {/* ── 01 · HERO (plakat) ──────────────────────────────────
          Hele plakaten vises (object-contain) uten gradient, slik at
          tittel, lineup og info er synlig — plakaten er kunstverket. */}
      <section className="relative w-full bg-ink-0 px-6 md:px-16 pt-6 md:pt-10">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-2xl">
          <Image
            src={event.heroImage}
            alt={`Plakat — ${event.title}${event.subtitle ? ` · ${event.subtitle}` : ""}`}
            fill
            priority
            quality={90}
            className="object-contain"
            sizes="(min-width: 768px) 42rem, 100vw"
          />
        </div>
        {/* h1 skjult visuelt — plakaten viser tittelen — men beholdt
            for dokumentstruktur og skjermlesere. */}
        <h1 className="sr-only">
          {event.title}
          {event.subtitle ? ` — ${event.subtitle}` : ""}
        </h1>
      </section>

      {/* ── 02 · INTRO + COUNTDOWN ──────────────────────────── */}
      <FadeIn>
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-4xl">
          <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600">
            Kommende arrangement · {event.title}
          </p>
          {event.subtitle && (
            <p className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.0] uppercase text-ink-900">
              {event.subtitle}
            </p>
          )}
          <p className="mt-8 text-base md:text-lg text-ink-800 max-w-xl leading-relaxed">
            {event.shortDescription}
          </p>
          {event.startsAt && (
            <div className="mt-12 border-t border-ink-300 pt-8 font-mono text-[11px] tracking-meta uppercase">
              <Countdown targetDate={event.startsAt} />
            </div>
          )}
        </section>
      </FadeIn>

      {/* ── 03 · LINEUP ─────────────────────────────────────── */}
      <FadeIn>
        <section className="px-6 md:px-16 pb-24 md:pb-32">
          <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600 mb-10">
            02 · Lineup
          </p>
          <NightsGrid event={event} />
        </section>
      </FadeIn>

      {/* ── 04 · PRAKTISK INFO + BILLETTER ──────────────────── */}
      <FadeIn>
        <section className="px-6 md:px-16 pb-24 md:pb-32">
          <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600 mb-10">
            03 · Detaljer
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-ink-300 pt-10 font-mono text-[10px] md:text-[11px] tracking-meta uppercase">
            <InfoItem label="Dato" value={event.dateRange} />
            <InfoItem label="Dører" value={event.doors} />
            <InfoItem label="Alder" value={event.age} />
            <InfoItem label="Lokasjon" value={event.venue} />
          </div>

          <div className="mt-16 border-t border-ink-300 pt-12 flex flex-col items-start gap-5">
            {ticketsLive ? (
              <>
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-ink-900 px-9 py-4 font-mono text-[12px] tracking-meta uppercase text-ink-900 transition-colors hover:bg-ink-900 hover:text-ink-0"
                >
                  Kjøp billetter
                </a>
                <p className="font-mono text-[10px] tracking-meta uppercase text-ink-600">
                  Billettsalg via Billetto · Ved kjøp gjelder våre{" "}
                  <a href="/vilkar" className="text-ink-800 hover:text-ink-900 underline">
                    vilkår
                  </a>
                </p>
              </>
            ) : (
              <>
                <span className="inline-block border border-ink-500 px-9 py-4 font-mono text-[12px] tracking-meta uppercase text-ink-600">
                  Billetter slippes snart
                </span>
                <p className="font-mono text-[10px] tracking-meta uppercase text-ink-600">
                  Følg{" "}
                  <a
                    href="https://www.instagram.com/kultursjokk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-800 hover:text-ink-900 underline"
                  >
                    @kultursjokk
                  </a>{" "}
                  for billettslipp
                </p>
              </>
            )}
          </div>

          {/* Frivillig-CTA — vises kun når arrangementet tar imot
              frivillige (Event.volunteerEmail er satt). Lenker til
              det arrangements-spesifikke frivilligskjemaet. */}
          {acceptsVolunteers(event) && (
            <div className="mt-12 border-t border-ink-300 pt-12 flex flex-col items-start gap-4">
              <a
                href={`/arrangementer/${event.slug}/frivillig`}
                className="inline-block border border-ink-500 px-9 py-4 font-mono text-[12px] tracking-meta uppercase text-ink-800 transition-colors hover:border-ink-900 hover:text-ink-900"
              >
                Bli frivillig
              </a>
              <p className="font-mono text-[10px] tracking-meta uppercase text-ink-600">
                Vil du jobbe på arrangementet? Meld deg som frivillig — velg vaktene du kan ta.
              </p>
            </div>
          )}
        </section>
      </FadeIn>
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   HISTORIKK
   ════════════════════════════════════════════════════════════ */

function PastEventBlock({ event }: { event: Event }) {
  return (
    <>
      {/* Tidligere arrangement — plakat + meta */}
      <FadeIn>
        <section className="px-6 md:px-16 pt-12 md:pt-16 pb-16 md:pb-24">
          <div className="border-t border-ink-300 pt-12 md:pt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-100 border border-ink-300">
                <Image
                  src={event.heroImage}
                  alt={`Plakat — ${event.title} ${event.dateRange}`}
                  fill
                  quality={85}
                  className="object-cover object-center grayscale"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>

              <div className="flex flex-col">
                <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600">
                  Avsluttet — {event.dateRange}
                </p>
                <h2 className="mt-4 font-display text-[clamp(3.5rem,10vw,7rem)] leading-[0.95] uppercase text-ink-900">
                  {event.title}
                </h2>
                <p className="mt-6 font-mono text-[11px] md:text-[13px] tracking-meta uppercase text-ink-800">
                  {event.venue}
                </p>
                <p className="mt-6 text-base md:text-lg text-ink-800 max-w-md leading-relaxed">
                  {event.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Lineup (dokumentasjon) */}
      <FadeIn>
        <section className="px-6 md:px-16 pb-24 md:pb-32">
          <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600 mb-10">
            Lineup
          </p>
          <NightsGrid event={event} />
        </section>
      </FadeIn>

      {/* Praktisk info */}
      <FadeIn>
        <section className="px-6 md:px-16 pb-24 md:pb-32">
          <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600 mb-10">
            Detaljer
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-ink-300 pt-10 font-mono text-[10px] md:text-[11px] tracking-meta uppercase">
            <InfoItem label="Dører" value={event.doors} />
            <InfoItem label="Alder" value={event.age} />
            <InfoItem label="Sjanger" value={event.genres ?? "—"} />
            <InfoItem label="Lokasjon" value={event.venue} />
          </div>
        </section>
      </FadeIn>
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   DELTE KOMPONENTER
   ════════════════════════════════════════════════════════════ */

/**
 * Lineup-grid. Rendrer alle netter for et event. Når eventet bare
 * har én natt, vises den i full bredde; ved flere netter deles de
 * i to kolonner (som KORSA).
 */
function NightsGrid({ event }: { event: Event }) {
  const single = event.nights.length === 1;

  // Har alle DJ-ene i en natt portrettbilde? I så fall vises et
  // bilde-grid. Mangler noen bilder (typisk for nyannonserte events),
  // viser vi i stedet en ren, typografisk navneliste — det ser
  // bevisst ut framfor tomme bokser, og artistene er alltid synlige.

  return (
    <div
      className={`grid grid-cols-1 ${single ? "" : "md:grid-cols-2"} border-t border-ink-300`}
    >
      {event.nights.map((night, i) => (
        <div
          key={night.label}
          className={
            single
              ? "py-12 md:py-16"
              : `py-12 md:py-16 ${
                  i === 0
                    ? "md:border-r md:border-ink-300 md:pr-12"
                    : "md:pl-12 border-t md:border-t-0 border-ink-300"
                }`
          }
        >
          {/* Enkeltkvelds-arrangement: dropp "Natt 01"-labelen (kan
              forveksles med en dato). Vis bare ukedagen. Flernatts-
              arrangementer (f.eks. KORSA) beholder "Natt 01/02". */}
          <p className="font-mono text-[10px] tracking-meta uppercase text-ink-600">
            {single ? night.day : `${night.label} — ${night.day}`}
          </p>
          {night.genre && (
            <p className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.0] uppercase text-ink-900">
              {night.genre}
            </p>
          )}
          <p className="mt-6 font-mono text-[11px] tracking-meta uppercase text-ink-800">
            {night.date}
          </p>

          {night.lineup.every((dj) => dj.image) ? (
            /* Alle har bilde → bilde-grid (gråskala, fargelegges ved hover). */
            <div
              className={`mt-10 grid gap-4 md:gap-6 ${
                single ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2"
              }`}
            >
              {night.lineup.map((dj) => {
                const Wrapper = dj.instagram
                  ? ({ children, className }: { children: React.ReactNode; className?: string }) => (
                      <a href={dj.instagram} target="_blank" rel="noopener noreferrer" className={`${className} group`}>{children}</a>
                    )
                  : ({ children, className }: { children: React.ReactNode; className?: string }) => (
                      <div className={className}>{children}</div>
                    );

                return (
                  <Wrapper key={dj.name} className="flex flex-col">
                    <div className="relative aspect-square w-full overflow-hidden bg-ink-100 border border-ink-300">
                      {dj.image && (
                        <Image
                          src={dj.image}
                          alt={`Portrett — ${dj.name}`}
                          fill
                          className="object-cover object-center grayscale transition-all duration-500 ease-brutal group-hover:grayscale-0 group-hover:scale-105"
                          sizes="(min-width: 768px) 20vw, 45vw"
                        />
                      )}
                    </div>
                    <p className="mt-3 font-display text-lg md:text-xl uppercase text-ink-900 leading-tight">
                      {dj.name}
                    </p>
                  </Wrapper>
                );
              })}
            </div>
          ) : (
            /* Mangler bilder → typografisk navneliste (plakat-stil).
               Hvert navn er klikkbart når Instagram-profil finnes. */
            <ul className="mt-10 flex flex-col border-t border-ink-300">
              {night.lineup.map((dj) => {
                const inner = (
                  <span className="font-display text-[clamp(2rem,6vw,3.5rem)] leading-[1.05] uppercase text-ink-900 transition-colors group-hover:text-ink-700">
                    {dj.name}
                  </span>
                );
                return (
                  <li
                    key={dj.name}
                    className="border-b border-ink-300 py-4 md:py-5"
                  >
                    {dj.instagram ? (
                      <a
                        href={dj.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-baseline gap-3"
                      >
                        {inner}
                        <span className="font-mono text-[10px] tracking-meta uppercase text-ink-600">
                          ↗
                        </span>
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * "Coming soon"-hero brukt på /arrangementer dersom det ikke finnes
 * et kommende arrangement (fallback mellom to events).
 */
function ComingSoonHero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      <ParallaxHero className="absolute inset-0 -top-[15%] h-[130%]">
        <Image
          src="/images/korsa-hero.jpg"
          alt="Korsatunnelen — silhuett med armer i været"
          fill
          priority
          quality={85}
          className="object-cover object-center grayscale"
          sizes="100vw"
        />
      </ParallaxHero>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink-0/70 via-ink-0/40 to-ink-0"
      />
      <div className="relative z-10 flex h-full flex-col justify-end px-6 md:px-16 pb-16 md:pb-24">
        <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-700">
          Next event
        </p>
        <h1 className="font-display text-[clamp(5rem,18vw,13rem)] leading-[0.92] uppercase text-ink-900 mt-4">
          Coming soon
        </h1>
        <p className="mt-6 font-mono text-[11px] md:text-[13px] tracking-meta uppercase text-ink-800">
          Følg med — neste arrangement annonseres snart
        </p>
      </div>
    </section>
  );
}

/**
 * Label + verdi i meta-rader.
 */
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-ink-600">{label}</div>
      <div className="mt-2 text-ink-900">{value}</div>
    </div>
  );
}
