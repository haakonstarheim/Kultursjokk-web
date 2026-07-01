import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/ui/site-header";
import { SiteFooter } from "@/components/ui/site-footer";
import { FadeIn } from "@/components/ui/fade-in";
import { VolunteerForm } from "@/components/ui/volunteer-form";
import {
  events,
  getEventBySlug,
  acceptsVolunteers,
  getVolunteerShifts,
} from "@/lib/events";

/**
 * Frivilligskjema pr. arrangement
 * ===============================
 *
 * Rute: /arrangementer/[slug]/frivillig
 *
 * Én skjemaside pr. arrangement. Slug-en avgjør hvilket arrangement
 * (og dermed hvilken mottaker-e-post) påmeldingen tilhører — så
 * lenken du deler blir arrangements-spesifikk:
 *   /arrangementer/konkret-kultursjokk/frivillig
 *
 * Tar arrangementet ikke imot frivillige (mangler volunteerEmail),
 * returnerer siden 404.
 */

// Pre-render skjemaet statisk for arrangementer som tar imot
// frivillige. Selve innsendingen går via /api/frivillig (dynamisk).
export function generateStaticParams() {
  return events.filter(acceptsVolunteers).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Frivillig — Kultursjokk" };
  return {
    title: `Bli frivillig — ${event.title}`,
    description: `Meld deg som frivillig til ${event.title}. Velg vakt, så tar vaktansvarlig kontakt med endelige tider.`,
    // Intern påmeldingsside — ikke noe vi vil ha i søkeresultater.
    robots: { index: false, follow: false },
  };
}

export default async function VolunteerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  // Ukjent arrangement, eller ett som ikke tar imot frivillige → 404.
  if (!event || !acceptsVolunteers(event)) {
    notFound();
  }

  const shifts = getVolunteerShifts(event);

  return (
    <>
      <SiteHeader variant="solid" />

      <main className="min-h-screen">
        {/* ── Intro ─────────────────────────────────────────── */}
        <FadeIn>
          <section className="px-6 md:px-16 pt-16 md:pt-24 pb-12 md:pb-16 max-w-3xl">
            <p className="font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600">
              Bli frivillig · {event.title}
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.0] uppercase text-ink-900">
              Jobb med oss
            </h1>
            <p className="mt-8 text-base md:text-lg text-ink-800 max-w-xl leading-relaxed">
              Vil du være med å skape {event.title}? Frivillige er ryggraden i alt vi gjør — fra rigging til
              siste nedrigg. Fyll ut skjemaet, velg vaktene du kan ta, så tar vaktansvarlig kontakt med
              endelige tider.
            </p>
            <div className="mt-10 border-t border-ink-300 pt-8 font-mono text-[10px] md:text-[11px] tracking-meta uppercase text-ink-600">
              <span className="text-ink-800">{event.dateRange}</span>
              <span className="mx-3 text-ink-500">·</span>
              <span>{event.venue}</span>
              <span className="mx-3 text-ink-500">·</span>
              <span>{event.age}</span>
            </div>
          </section>
        </FadeIn>

        {/* ── Skjema ────────────────────────────────────────── */}
        <FadeIn>
          <section className="px-6 md:px-16 pb-24 md:pb-32 max-w-3xl">
            <VolunteerForm slug={event.slug} shifts={shifts} />
          </section>
        </FadeIn>
      </main>

      <SiteFooter />
    </>
  );
}
