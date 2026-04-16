import Image from "next/image";
import Link from "next/link";
import { KORSA } from "@/lib/events";

/**
 * Landing page — forside
 * ======================
 *
 * Dette er en bevisst single-screen-side: alt som betyr noe
 * skal være synlig uten at brukeren trenger å scrolle. Siden
 * fungerer som et plakat-statement for Kultursjokk og løfter
 * fram det aktuelle arrangementet (KORSA) over alt annet.
 *
 * Layout:
 *   ┌────────────────────────────────────────┐
 *   │  KULTURSJOKK        nav nav nav        │  <- header
 *   │                                        │
 *   │  Eyebrow                                │
 *   │  KORSA                                 │  <- hero (event navn)
 *   │  Rave i Korsatunnelen — Ålesund        │
 *   │                                        │
 *   │  dato  dører  sjanger  [Kjøp billett]  │  <- footer/meta
 *   └────────────────────────────────────────┘
 *
 * Bakgrunn: KORSA-bildet, mørk overlay for lesbarhet.
 * Høyde: 100dvh (dynamic viewport — funker på mobil).
 * Overflow: skjult — siden skal aldri scrolle.
 */
export default function LandingPage() {
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-ink-0">
      {/* ── Bakgrunnsbilde ─────────────────────────────────── */}
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
        {/* Dobbel overlay: mørk gradient nedenfra + generell dimming
            slik at teksten alltid er lesbar uansett viewport-høyde */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-ink-0/80 via-ink-0/60 to-ink-0/95"
        />
        <div aria-hidden className="absolute inset-0 bg-ink-0/40" />
      </div>

      {/* ── Innhold (grid) ─────────────────────────────────── */}
      <div className="relative z-10 flex h-full flex-col px-6 py-8 md:px-16 md:py-12">
        {/* Header / navigasjon */}
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
            {/* Arrangementer peker til intern arrangementsside
                (/arrangementer), som igjen har knapp til ekstern Billetto. */}
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

        {/* Hero — sentrert vertikalt.
            KORSA-tittelen er en lenke til /arrangementer slik at hele
            plakaten fungerer som klikkbar inngang til arrangementsiden. */}
        <section className="flex flex-1 items-center">
          <div className="max-w-4xl">
            <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-700">
              Kommende arrangement — {KORSA.dateRange}
            </p>
            <Link
              href="/arrangementer"
              aria-label={`Gå til arrangementsiden for ${KORSA.title}`}
              className="group inline-block mt-4 md:mt-6"
            >
              <h1 className="font-display text-[clamp(4.5rem,16vw,11rem)] leading-[0.95] uppercase text-ink-900 transition-opacity duration-300 group-hover:opacity-80">
                {KORSA.title}
              </h1>
            </Link>
            <p className="mt-4 md:mt-6 text-base md:text-xl text-ink-800 max-w-lg leading-relaxed">
              To netter i Korsatunnelen — Ålesund.
              <br className="hidden md:block" />
              1. mai: Drum &amp; Bass. 2. mai: Techno.
            </p>
          </div>
        </section>

        {/* Footer — arrangementsmeta + CTA */}
        <footer className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-t border-ink-400 pt-6">
          <div className="grid grid-cols-3 gap-4 md:gap-10 font-mono text-[10px] tracking-meta uppercase">
            <MetaItem label="Dato" value={KORSA.dateRange} />
            <MetaItem label="Dører" value={KORSA.doors} />
            <MetaItem label="Sjanger" value={KORSA.genres} />
          </div>

          <a
            href={KORSA.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center border border-ink-900 px-8 py-4 font-mono text-[11px] tracking-meta uppercase text-ink-900 transition-colors duration-300 ease-brutal hover:bg-ink-900 hover:text-ink-0 md:min-w-[220px]"
          >
            Kjøp billett
          </a>
        </footer>
      </div>
    </div>
  );
}

/**
 * Liten hjelpekomponent for meta-felt i footeren.
 * Holder label og verdi konsistente på tvers av bruksområder.
 */
function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-ink-600">{label}</div>
      <div className="mt-2 text-ink-900">{value}</div>
    </div>
  );
}
