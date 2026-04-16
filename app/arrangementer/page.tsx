import Image from "next/image";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { KORSA } from "@/lib/events";

/**
 * KORSA arrangementsside
 * ======================
 *
 * Rute: /billetter
 *
 * Minimalistisk, plakataktig side for KORSA-raves. Siden er
 * scrollbar, men bevisst kort — vi vil at besøkende skal få den
 * kritiske info-en raskt og deretter klikke seg videre til
 * ekstern billettløsning (Billetto).
 *
 * Seksjoner:
 *   01  Hero med KORSA-bildet + tittel + dato
 *   02  Kort beskrivelse (plakataktig setning)
 *   03  To-netters splitt — én kolonne per kveld
 *   04  Praktisk info
 *   05  CTA — Kjøp billett (ekstern lenke til Billetto)
 */

export const metadata: Metadata = {
  title: "KORSA — 01–02.05.2026",
  description:
    "To netter rave i Korsatunnelen. 1. mai: Drum & Bass. 2. mai: Techno. Ålesund.",
};

export default function BilletterPage() {
  return (
    <>
      <SiteHeader variant="solid" />

      <main className="min-h-screen">
        {/* ── 01 · HERO ─────────────────────────────────── */}
        <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
          <Image
            src={KORSA.heroImage}
            alt="Korsatunnelen — silhuett med armer i været"
            fill
            priority
            quality={85}
            className="object-cover object-center grayscale"
            sizes="100vw"
          />
          {/* Overlay for lesbarhet */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-ink-0/70 via-ink-0/40 to-ink-0"
          />

          <div className="relative z-10 flex h-full flex-col justify-end px-6 md:px-16 pb-16 md:pb-24">
            <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-700">
              Kommende arrangement
            </p>
            <h1 className="font-display text-[clamp(5rem,18vw,13rem)] leading-[0.92] uppercase text-ink-900 mt-4">
              Korsa
            </h1>
            <p className="mt-6 font-mono text-[11px] md:text-[13px] tracking-meta uppercase text-ink-800">
              {KORSA.dateRange} — {KORSA.venue}
            </p>
          </div>
        </section>

        {/* ── 02 · KORT BESKRIVELSE ─────────────────────── */}
        <section className="px-6 md:px-16 py-24 md:py-32 max-w-5xl">
          <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600">
            01 · Om arrangementet
          </p>
          <p className="mt-8 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1] uppercase text-ink-900">
            Rave i Korsatunnelen.
            <br />
            To netter. To sjangre.
            <br />
            KORSA.
          </p>
        </section>

        {/* ── 03 · TO-NETTERS SPLITT ────────────────────── */}
        <section className="px-6 md:px-16 pb-24 md:pb-32">
          <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600 mb-10">
            02 · Program
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-ink-300">
            {KORSA.nights.map((night, i) => (
              <div
                key={night.label}
                className={`py-12 md:py-16 ${
                  i === 0
                    ? "md:border-r md:border-ink-300 md:pr-12"
                    : "md:pl-12 border-t md:border-t-0 border-ink-300"
                }`}
              >
                <p className="font-mono text-[10px] tracking-meta uppercase text-ink-600">
                  {night.label} — {night.day}
                </p>
                <p className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.0] uppercase text-ink-900">
                  {night.genre}
                </p>
                <p className="mt-6 font-mono text-[11px] tracking-meta uppercase text-ink-800">
                  {night.date}
                </p>

                {/* Lineup — kort per DJ. Hvis `dj.image` er satt
                    rendres <Image />, ellers en svart plassholder-boks.
                    Alle bilder legges i gråskala for plakataktig uttrykk. */}
                <div className="mt-10 grid grid-cols-2 gap-4 md:gap-6">
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
                        <div className="relative aspect-square w-full overflow-hidden bg-ink-100 border border-ink-300 transition-opacity duration-300 group-hover:opacity-80">
                          {dj.image && (
                            <Image
                              src={dj.image}
                              alt={`Portrett — ${dj.name}`}
                              fill
                              className="object-cover object-center grayscale"
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
              </div>
            ))}
          </div>
        </section>

        {/* ── 04 · PRAKTISK INFO ─────────────────────────── */}
        <section className="px-6 md:px-16 pb-24 md:pb-32">
          <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600 mb-10">
            03 · Praktisk
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-ink-300 pt-10 font-mono text-[10px] md:text-[11px] tracking-meta uppercase">
            <InfoItem label="Dører" value={KORSA.doors} />
            <InfoItem label="Alder" value={KORSA.age} />
            <InfoItem label="Sjanger" value={KORSA.genres} />
            <InfoItem label="Lokasjon" value={KORSA.venue} />
          </div>
        </section>

        {/* ── 05 · CTA ───────────────────────────────────── */}
        <section className="px-6 md:px-16 pb-32 md:pb-40">
          <div className="border-t border-ink-300 pt-16 md:pt-24 flex flex-col items-start gap-10">
            <p className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] uppercase text-ink-900 max-w-3xl">
              Billetter selges via Billetto.
            </p>
            <a
              href={KORSA.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center border border-ink-900 px-12 py-6 font-mono text-[11px] md:text-[12px] tracking-meta uppercase text-ink-900 transition-colors duration-300 ease-brutal hover:bg-ink-900 hover:text-ink-0 min-w-[260px]"
            >
              Kjøp billett
            </a>
            <p className="font-mono text-[10px] tracking-meta uppercase text-ink-600">
              Lenken åpner billetto.no i ny fane
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

/**
 * Label + verdi i meta-rader. Samme utseende som forsiden.
 */
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-ink-600">{label}</div>
      <div className="mt-2 text-ink-900">{value}</div>
    </div>
  );
}
