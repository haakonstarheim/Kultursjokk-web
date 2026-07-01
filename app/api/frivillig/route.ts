/**
 * API-route: frivilligpåmelding
 * =============================
 *
 * Rute: POST /api/frivillig
 *
 * Tar imot en frivilligpåmelding fra skjemaet, validerer den, og
 * leverer den på to kanaler:
 *
 *   1. E-post (Resend)         — en pen oppsummering sendes til
 *                                arrangementets ansvarlige
 *                                (Event.volunteerEmail).
 *   2. Google Sheet-logg       — samme data POST-es til en Google
 *                                Apps Script-webhook som legger den
 *                                til som en rad i et regneark.
 *
 * Begge kanaler er valgfrie via miljøvariabler. Er ingen konfigurert,
 * svarer route-en 500 slik at feilen oppdages tidlig. Er e-post
 * konfigurert men feiler, svarer vi 502 slik at brukeren kan prøve
 * igjen (vi vil ikke miste en påmelding i det stille).
 *
 * Sikkerhet / robusthet:
 *   - Honeypot-felt (`company`): fylles det ut, er det en bot →
 *     vi later som alt gikk bra, men dropper innsendingen.
 *   - Enkel rate-limiting pr. IP (best-effort, in-memory).
 *   - All input saneres til ren tekst før den havner i e-post-HTML
 *     (escapeHtml) for å unngå HTML/markup-injeksjon i innboksen.
 *
 * Miljøvariabler (se .env.local.example):
 *   RESEND_API_KEY            — API-nøkkel fra resend.com
 *   EMAIL_FROM                — verifisert avsender, f.eks.
 *                               "Kultursjokk <frivillig@kultursjokk.no>"
 *   GOOGLE_SHEET_WEBHOOK_URL  — URL til Apps Script-web-appen
 */

import { NextRequest, NextResponse } from "next/server";
import { getEventBySlug, getVolunteerShifts } from "@/lib/events";

// Kjør på Node-runtime (ikke Edge) — vi bruker vanlig fetch mot
// Resend, og Node-runtime er tryggest ift. Netlify sine functions.
export const runtime = "nodejs";

/* ── Typer ──────────────────────────────────────────────────── */

type Payload = {
  slug?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  ecName?: string;
  ecPhone?: string;
  ecRelation?: string;
  dietary?: string;
  shifts?: string[]; // liste av VolunteerShift.value
  notes?: string;
  consent?: boolean;
  company?: string; // honeypot — skal alltid være tom
};

/* ── Rate limiting (best-effort, in-memory) ─────────────────────
   Serverless-instanser er kortlivde, så dette stopper ikke en
   dedikert angriper — men det demper utilsiktet spam/dobbelt-
   klikk fra samme klient innenfor levetiden til en instans. */

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minutt
const RATE_LIMIT_MAX = 5; // maks 5 innsendinger pr. IP pr. vindu
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

/* ── Hjelpere ───────────────────────────────────────────────── */

/** Escaper HTML slik at brukerinput ikke kan injisere markup i e-posten. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Trimmer og begrenser en streng (unngår gigantiske felt). */
function clean(value: unknown, maxLen = 2000): string {
  return typeof value === "string" ? value.trim().slice(0, maxLen) : "";
}

/** Enkel e-postformat-sjekk. */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ── E-post-innhold ─────────────────────────────────────────── */

/**
 * Bygger en pen HTML-oppsummering av påmeldingen. Holdt enkelt og
 * e-post-vennlig (tabeller + inline-stiler), i en dempet, mørk
 * palett som nikker til Kultursjokk-estetikken uten å bli et
 * fullt nyhetsbrev.
 */
function buildEmailHtml(args: {
  eventTitle: string;
  fullName: string;
  email: string;
  phone: string;
  ecName: string;
  ecPhone: string;
  ecRelation: string;
  dietary: string;
  shiftTitles: string[];
  notes: string;
  submittedAt: string;
}): string {
  const {
    eventTitle,
    fullName,
    email,
    phone,
    ecName,
    ecPhone,
    ecRelation,
    dietary,
    shiftTitles,
    notes,
    submittedAt,
  } = args;

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #222;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #222;color:#eaeaea;font-size:15px;">${value || '<span style="color:#666;">—</span>'}</td>
    </tr>`;

  const chips = shiftTitles
    .map(
      (t) =>
        `<span style="display:inline-block;margin:2px 6px 2px 0;padding:5px 12px;border:1px solid #3a93d8;color:#9ecbef;font-size:13px;">${escapeHtml(
          t
        )}</span>`
    )
    .join("");

  return `
  <div style="background:#0b0b0b;padding:32px 0;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#111;border:1px solid #222;">
      <tr>
        <td style="padding:28px 24px 8px;">
          <p style="margin:0;color:#777;font-size:11px;letter-spacing:.25em;text-transform:uppercase;">Ny frivillig · ${escapeHtml(
            eventTitle
          )}</p>
          <h1 style="margin:8px 0 0;color:#fff;font-size:24px;">${escapeHtml(fullName)}</h1>
          <p style="margin:6px 0 0;color:#666;font-size:12px;">Mottatt ${escapeHtml(submittedAt)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 24px 4px;">
          <p style="margin:16px 0 6px;color:#888;font-size:11px;letter-spacing:.2em;text-transform:uppercase;">Ønskede vakter</p>
          <div>${chips || '<span style="color:#666;">Ingen valgt</span>'}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 8px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #222;">
            ${row("Navn", escapeHtml(fullName))}
            ${row("E-post", `<a href="mailto:${escapeHtml(email)}" style="color:#9ecbef;">${escapeHtml(email)}</a>`)}
            ${row("Telefon", escapeHtml(phone))}
            ${row("Nødkontakt", escapeHtml(ecName))}
            ${row("Nødkontakt tlf.", escapeHtml(ecPhone))}
            ${row("Relasjon", escapeHtml(ecRelation))}
            ${row("Kost / allergi", escapeHtml(dietary).replace(/\n/g, "<br>"))}
            ${row("Kommentar", escapeHtml(notes).replace(/\n/g, "<br>"))}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 24px 24px;">
          <p style="margin:0;color:#555;font-size:11px;line-height:1.6;">
            Sendt fra frivilligskjemaet på kultursjokk.no. Personopplysningene brukes kun til å organisere frivillige for dette arrangementet.
          </p>
        </td>
      </tr>
    </table>
  </div>`;
}

/** Ren tekst-variant (fallback for e-postklienter uten HTML). */
function buildEmailText(args: {
  eventTitle: string;
  fullName: string;
  email: string;
  phone: string;
  ecName: string;
  ecPhone: string;
  ecRelation: string;
  dietary: string;
  shiftTitles: string[];
  notes: string;
  submittedAt: string;
}): string {
  const l = (label: string, value: string) => `${label}: ${value || "—"}`;
  return [
    `NY FRIVILLIG — ${args.eventTitle}`,
    `Mottatt ${args.submittedAt}`,
    ``,
    `Ønskede vakter: ${args.shiftTitles.join(", ") || "Ingen valgt"}`,
    ``,
    l("Navn", args.fullName),
    l("E-post", args.email),
    l("Telefon", args.phone),
    l("Nødkontakt", args.ecName),
    l("Nødkontakt tlf.", args.ecPhone),
    l("Relasjon", args.ecRelation),
    l("Kost / allergi", args.dietary),
    l("Kommentar", args.notes),
  ].join("\n");
}

/* ── Leveringskanaler ───────────────────────────────────────── */

/** Sender oppsummerings-e-posten via Resend sitt REST-API. */
async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "Kultursjokk <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [opts.to],
      reply_to: opts.replyTo, // svar går direkte til den frivillige
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend svarte ${res.status}: ${detail}`);
  }
}

/** Logger påmeldingen til en Google Sheet via Apps Script-webhook. */
async function logToSheet(url: string, data: Record<string, unknown>): Promise<void> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Sheet-webhook svarte ${res.status}`);
  }
}

/* ── Handler ────────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  // Klient-IP (Netlify/Vercel setter x-forwarded-for).
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "For mange innsendinger. Vent litt og prøv igjen." },
      { status: 429 }
    );
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Ugyldig forespørsel." }, { status: 400 });
  }

  // Honeypot: en ekte bruker ser aldri dette feltet, så er det fylt
  // ut er det en bot. Vi svarer "ok" for ikke å avsløre fella.
  if (clean(body.company)) {
    return NextResponse.json({ ok: true });
  }

  // Finn arrangementet og mottakeren.
  const slug = clean(body.slug, 100);
  const event = getEventBySlug(slug);
  if (!event || !event.volunteerEmail) {
    return NextResponse.json(
      { ok: false, error: "Frivilligskjemaet er ikke åpent for dette arrangementet." },
      { status: 404 }
    );
  }

  // Saner og valider input.
  const fullName = clean(body.fullName, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const ecName = clean(body.ecName, 120);
  const ecPhone = clean(body.ecPhone, 40);
  const ecRelation = clean(body.ecRelation, 80);
  const dietary = clean(body.dietary, 500);
  const notes = clean(body.notes, 1000);
  const consent = body.consent === true;
  const shiftValues = Array.isArray(body.shifts) ? body.shifts.map((s) => clean(s, 60)) : [];

  const errors: string[] = [];
  if (!fullName) errors.push("navn");
  if (!isValidEmail(email)) errors.push("gyldig e-post");
  if (!phone) errors.push("telefon");
  if (!ecName) errors.push("nødkontakt");
  if (!ecPhone) errors.push("nødkontakt-telefon");
  if (shiftValues.length === 0) errors.push("minst én vakt");
  if (!consent) errors.push("samtykke");

  if (errors.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Mangler eller ugyldig: ${errors.join(", ")}.` },
      { status: 422 }
    );
  }

  // Oversett vakt-verdier til visningstitler.
  const shiftDefs = getVolunteerShifts(event);
  const shiftTitles = shiftValues
    .map((v) => shiftDefs.find((s) => s.value === v)?.title)
    .filter((t): t is string => Boolean(t));

  const submittedAt = new Intl.DateTimeFormat("nb-NO", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Oslo",
  }).format(new Date());

  const emailArgs = {
    eventTitle: event.title,
    fullName,
    email,
    phone,
    ecName,
    ecPhone,
    ecRelation,
    dietary,
    shiftTitles,
    notes,
    submittedAt,
  };

  const subject = `Frivillig · ${fullName} — ${event.title} (${shiftTitles.length} ${
    shiftTitles.length === 1 ? "vakt" : "vakter"
  })`;

  // Hvilke kanaler er konfigurert?
  const emailConfigured = Boolean(process.env.RESEND_API_KEY);
  const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  const sheetConfigured = Boolean(sheetUrl);

  if (!emailConfigured && !sheetConfigured) {
    // Ingen leveringskanal — konfigurasjonsfeil, ikke brukerens skyld.
    return NextResponse.json(
      { ok: false, error: "Skjemaet er ikke ferdig satt opp ennå. Ta kontakt med arrangøren." },
      { status: 500 }
    );
  }

  // Prøv e-post (primærkanal).
  let emailError: unknown = null;
  if (emailConfigured) {
    try {
      await sendEmail({
        to: event.volunteerEmail,
        subject,
        html: buildEmailHtml(emailArgs),
        text: buildEmailText(emailArgs),
        replyTo: email,
      });
    } catch (err) {
      emailError = err;
      console.error("Frivillig e-post feilet:", err);
    }
  }

  // Prøv Sheet-logg (sekundærkanal). Feiler den, logger vi bare —
  // vi vil ikke blokkere brukeren hvis e-posten gikk fint.
  if (sheetConfigured && sheetUrl) {
    try {
      await logToSheet(sheetUrl, {
        submittedAt,
        event: event.title,
        slug: event.slug,
        fullName,
        email,
        phone,
        ecName,
        ecPhone,
        ecRelation,
        dietary,
        shifts: shiftTitles.join(", "),
        notes,
      });
    } catch (err) {
      console.error("Frivillig Sheet-logg feilet:", err);
    }
  }

  // Er e-post primærkanalen og den feilet, be brukeren prøve igjen.
  if (emailConfigured && emailError) {
    return NextResponse.json(
      { ok: false, error: "Klarte ikke sende påmeldingen akkurat nå. Prøv igjen om litt." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
