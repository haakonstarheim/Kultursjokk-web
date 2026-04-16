import Image from "next/image";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { RESIDENTS, type Resident } from "@/lib/djs";

/**
 * Resident DJs-side
 * =================
 *
 * Rute: /resident-djs
 *
 * Plakataktig liste av Kultursjokks resident-DJer. Hver DJ får en
 * full-bredde-rad med portrett på den ene siden og navn + bio på den andre.
 * På desktop veksler retningen annenhver rad for å bryte monotonien;
 * på mobil stables alt i én kolonne.
 *
 * Struktur:
 *   01  Header-seksjon — eyebrow + stor "Resident DJs"-tittel + kort intro
 *   02  Liste av ResidentRow-komponenter (én per DJ)
 *   03  Site-footer
 */

export const metadata: Metadata = {
  title: "Resident DJs — Kultursjokk",
  description:
    "Kultursjokks resident-DJer. Garage, jazzhouse, drum & bass, techno, hardcore — et bredt spekter av lyd, én felles dansegulv-filosofi.",
};

export default function ResidentDjsPage() {
  return (
    <>
      <SiteHeader variant="solid" />

      <main className="min-h-screen">
        {/* ── 01 · HEADER-SEKSJON ─────────────────────────── */}
        <section className="px-6 md:px-16 pt-24 md:pt-32 pb-24 md:pb-32 max-w-6xl">
          <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600">
            Residents
          </p>
          <h1 className="mt-6 font-display text-[clamp(4rem,14vw,11rem)] leading-[0.92] uppercase text-ink-900">
            Resident
            <br />
            DJs
          </h1>
        </section>

        {/* ── 02 · LISTE ─────────────────────────────────── */}
        <section className="border-t border-ink-300">
          {RESIDENTS.map((dj, i) => (
            <ResidentRow key={dj.slug} dj={dj} index={i} />
          ))}
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

/**
 * Én rad per resident.
 *
 * Desktop:  bilde | tekst  (partall) / tekst | bilde (oddetall)
 * Mobil:    bilde over tekst
 *
 * Hvis `dj.image` mangler rendres en svart plassholder-boks med
 * nøyaktig samme aspect ratio, slik at layouten ikke kollapser.
 */
function ResidentRow({ dj, index }: { dj: Resident; index: number }) {
  // Snu retningen annenhver rad — men kun fra md og opp.
  // Mobil stables alltid i samme orden (bilde → tekst).
  const reversed = index % 2 === 1;

  return (
    <article
      className={`grid grid-cols-1 md:grid-cols-2 border-b border-ink-300 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Bilde / plassholder — wrappet i Instagram-lenke hvis tilgjengelig */}
      {dj.instagram ? (
        <a
          href={dj.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="relative aspect-square md:aspect-auto md:min-h-[560px] bg-ink-100 border-ink-300 md:border-r group"
        >
          {dj.image && (
            <Image
              src={dj.image}
              alt={`Portrett — ${dj.name}`}
              fill
              className="object-cover object-center grayscale transition-opacity duration-300 group-hover:opacity-80"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          )}
        </a>
      ) : (
        <div className="relative aspect-square md:aspect-auto md:min-h-[560px] bg-ink-100 border-ink-300 md:border-r">
          {dj.image ? (
            <Image
              src={dj.image}
              alt={`Portrett — ${dj.name}`}
              fill
              className="object-cover object-center grayscale"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          ) : (
            <div
              aria-label={`Plassholder — ${dj.name}`}
              className="absolute inset-0 bg-ink-100 flex items-end p-6 md:p-10"
            >
              <span className="font-mono text-[10px] tracking-meta uppercase text-ink-600">
                Bilde kommer
              </span>
            </div>
          )}
        </div>
      )}

      {/* Tekstblokk */}
      <div className="flex flex-col justify-center px-6 md:px-16 py-16 md:py-24">
        <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600">
          {String(index + 1).padStart(2, "0")} · Resident
        </p>
        <h2 className="mt-4 font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] uppercase text-ink-900">
          {dj.name}
        </h2>
        <p className="mt-6 font-mono text-[10px] md:text-[11px] tracking-meta uppercase text-ink-700">
          {dj.genres}
        </p>
        <p className="mt-10 max-w-xl text-base md:text-lg text-ink-800 leading-relaxed">
          {dj.bio}
        </p>
      </div>
    </article>
  );
}
