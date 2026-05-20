import Image from "next/image";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { FadeIn } from "@/components/ui/fade-in";
import { ParallaxHero } from "@/components/ui/parallax-hero";
import { KORSA } from "@/lib/events";

/**
 * Arrangementer
 * =============
 *
 * Rute: /arrangementer
 *
 * Etter at KORSA (01–02.05.2026) ble gjennomført, fungerer denne
 * siden som en plakat-aktig historikkoversikt. KORSA vises som
 * "Tidligere arrangement" — bildet, lineup-en og praktisk info
 * beholdes som dokumentasjon, men ekstern billettsalg er fjernet.
 *
 * Når neste arrangement bookes vil seksjonsstrukturen bli:
 *   01  Hero (kommende)
 *   02  Aktivt arrangement
 *   03  Historikk
 *
 * Inntil videre starter siden direkte på historikk-seksjonen,
 * men beholder samme typografi og rytme som tidligere versjon.
 */

export const metadata: Metadata = {
  title: "Arrangementer — Kultursjokk",
  description:
    "Tidligere og kommende arrangementer i regi av Kultursjokk. Neste arrangement annonseres snart.",
};

export default function ArrangementerPage() {
  return (
    <>
      <SiteHeader variant="solid" />

      <main className="min-h-screen">
        {/* ── 01 · HERO ─────────────────────────────────── */}
        {/* Hero-seksjonen viser "Coming soon" som plakat-statement.
            Vi har bevisst valgt å beholde KORSA-bildet som bakgrunn
            for visuell kontinuitet med forsiden. */}
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
          {/* Overlay for lesbarhet */}
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

        {/* ── 02 · HISTORIKK-INTRO ─────────────────────── */}
        <FadeIn>
          <section className="px-6 md:px-16 py-24 md:py-32 max-w-5xl">
            <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600">
              01 · Historikk
            </p>
            <p className="mt-8 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1] uppercase text-ink-900">
              Tidligere arrangementer.
            </p>
          </section>
        </FadeIn>

        {/* ── 03 · KORSA — TIDLIGERE ARRANGEMENT ─────── */}
        {/* KORSA vises som avsluttet arrangement. Bildet er oppdatert
            til "korsa-2026.jpg" (lokal fil i public/images/) og
            "Avsluttet" markeres tydelig i eyebrow-feltet. */}
        <FadeIn>
          <section className="px-6 md:px-16 pb-16 md:pb-24">
            <div className="border-t border-ink-300 pt-12 md:pt-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
                {/* Venstre kolonne — bilde */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-100 border border-ink-300">
                  <Image
                    src={KORSA.heroImage}
                    alt={`Plakat — ${KORSA.title} ${KORSA.dateRange}`}
                    fill
                    quality={85}
                    className="object-cover object-center grayscale"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>

                {/* Høyre kolonne — meta */}
                <div className="flex flex-col">
                  <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600">
                    Avsluttet — {KORSA.dateRange}
                  </p>
                  <h2 className="mt-4 font-display text-[clamp(3.5rem,10vw,7rem)] leading-[0.95] uppercase text-ink-900">
                    {KORSA.title}
                  </h2>
                  <p className="mt-6 font-mono text-[11px] md:text-[13px] tracking-meta uppercase text-ink-800">
                    {KORSA.venue}
                  </p>
                  <p className="mt-6 text-base md:text-lg text-ink-800 max-w-md leading-relaxed">
                    {KORSA.shortDescription}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── 04 · TO-NETTERS LINEUP (DOKUMENTASJON) ────── */}
        <FadeIn>
          <section className="px-6 md:px-16 pb-24 md:pb-32">
            <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600 mb-10">
              02 · Lineup
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

                  {/* Lineup — kort per DJ. Klikkbare når Instagram-profil
                      er knyttet til. Alle bilder vises i gråskala for
                      konsistent plakat-uttrykk. */}
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
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* ── 05 · PRAKTISK INFO (HISTORIKK) ─────────────── */}
        <FadeIn>
          <section className="px-6 md:px-16 pb-32 md:pb-40">
            <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600 mb-10">
              03 · Detaljer
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-ink-300 pt-10 font-mono text-[10px] md:text-[11px] tracking-meta uppercase">
              <InfoItem label="Dører" value={KORSA.doors} />
              <InfoItem label="Alder" value={KORSA.age} />
              <InfoItem label="Sjanger" value={KORSA.genres} />
              <InfoItem label="Lokasjon" value={KORSA.venue} />
            </div>
          </section>
        </FadeIn>
      </main>

      <SiteFooter />
    </>
  );
}

/**
 * Label + verdi i meta-rader. Samme utseende som tidligere.
 */
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-ink-600">{label}</div>
      <div className="mt-2 text-ink-900">{value}</div>
    </div>
  );
}
