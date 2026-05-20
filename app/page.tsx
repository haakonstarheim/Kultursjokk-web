import Image from "next/image";
import Link from "next/link";

/**
 * Landing page — forside
 * ======================
 *
 * Dette er en bevisst single-screen-side: alt som betyr noe
 * skal være synlig uten at brukeren trenger å scrolle. Siden
 * fungerer som et plakat-statement for Kultursjokk.
 *
 * KORSA (01–02.05.2026) er nå avsluttet. Inntil neste arrangement
 * er booket viser forsiden et "Next event — Coming soon"-statement.
 * Bakgrunnsbildet fra KORSA beholdes for visuell kontinuitet —
 * det skaper assosiasjoner til det forrige raven og bygger forventning.
 *
 * Layout:
 *   ┌────────────────────────────────────────┐
 *   │  KULTURSJOKK        nav nav nav        │  <- header
 *   │                                        │
 *   │  Next event                            │  <- eyebrow
 *   │  Coming soon                           │  <- hero
 *   │                                        │
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
                (/arrangementer). Inntil videre viser den historikk. */}
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
            "Coming soon" står som plakat-statement uten lenke,
            siden vi ikke har et arrangement å lenke til enda. */}
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

        {/* Footer — bevisst tom for å holde fokus på hero-statementet.
            Beholder en tynn linje på toppen av footer-området slik at
            layouten føles balansert mot header-en. */}
        <footer className="border-t border-ink-400 pt-6">
          <p className="font-mono text-[10px] tracking-meta uppercase text-ink-600">
            Følg med — neste arrangement annonseres her
          </p>
        </footer>
      </div>
    </div>
  );
}
