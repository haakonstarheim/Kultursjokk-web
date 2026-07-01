"use client";

import { useState } from "react";
import type { VolunteerShift } from "@/lib/events";

/**
 * VolunteerForm
 * =============
 *
 * Client-komponent: selve frivilligskjemaet. Samler inn påmeldingen,
 * validerer på klienten (rask tilbakemelding) og POST-er den til
 * /api/frivillig, som gjør den «ekte» valideringen og leveringen.
 *
 * Bevisste valg:
 *   - Ingen ID-/dokumentopplasting. Legitimasjon sjekkes fysisk i
 *     døra — vi vil ikke samle inn eller sende sensitive dokumenter.
 *   - Honeypot-felt (`company`) skjult for mennesker, felle for bots.
 *   - Suksess vises som en egen tilstand (skjemaet byttes ut) slik at
 *     brukeren tydelig ser at påmeldingen gikk gjennom.
 *   - Stil: samme mørke palett og typografi som resten av siden
 *     (ink-skalaen + mono-labels), ingen farger.
 */

// Delte utility-klasser for felt (holder JSX-en ren).
const inputCls =
  "w-full bg-ink-100 border border-ink-300 px-4 py-3 text-ink-900 text-sm " +
  "placeholder:text-ink-600 focus:border-ink-800 focus:outline-none transition-colors";
const labelCls =
  "block font-mono text-[10px] tracking-meta uppercase text-ink-700 mb-2";

export function VolunteerForm({
  slug,
  shifts,
}: {
  slug: string;
  shifts: VolunteerShift[];
}) {
  // Tekstfelter samlet i ett state-objekt.
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    ecName: "",
    ecPhone: "",
    ecRelation: "",
    dietary: "",
    notes: "",
    company: "", // honeypot
  });
  const [selectedShifts, setSelectedShifts] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const toggleShift = (value: string) =>
    setSelectedShifts((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    // Rask klient-validering (serveren validerer uansett på nytt).
    if (!form.fullName.trim()) return setErrorMsg("Fyll inn navn.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setErrorMsg("Fyll inn en gyldig e-post.");
    if (!form.phone.trim()) return setErrorMsg("Fyll inn telefonnummer.");
    if (!form.ecName.trim() || !form.ecPhone.trim()) return setErrorMsg("Fyll inn nødkontakt med navn og telefon.");
    if (selectedShifts.length === 0) return setErrorMsg("Velg minst én vakt du kan ta.");
    if (!consent) return setErrorMsg("Du må godta personvern­vilkårene for å melde deg på.");

    setStatus("submitting");
    try {
      const res = await fetch("/api/frivillig", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, ...form, shifts: selectedShifts, consent }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Noe gikk galt. Prøv igjen om litt.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Fikk ikke kontakt med serveren. Sjekk nettforbindelsen og prøv igjen.");
    }
  }

  /* ── Suksess-tilstand ─────────────────────────────────────── */
  if (status === "success") {
    return (
      <div className="border border-ink-300 bg-ink-100 px-6 md:px-12 py-16 text-center">
        <p className="font-mono text-[10px] tracking-eyebrow uppercase text-ink-600">
          Påmelding mottatt
        </p>
        <p className="mt-6 font-display text-[clamp(2rem,6vw,3.5rem)] leading-[1.05] uppercase text-ink-900">
          Takk, {form.fullName.split(" ")[0] || "du"}.
        </p>
        <p className="mx-auto mt-6 max-w-md text-base text-ink-800 leading-relaxed">
          Vi har fått påmeldingen din. Vaktansvarlig tar kontakt på{" "}
          <span className="text-ink-900">{form.email}</span> med endelige tider nærmere arrangementet.
        </p>
        <a
          href="/arrangementer"
          className="mt-10 inline-block border border-ink-900 px-9 py-4 font-mono text-[12px] tracking-meta uppercase text-ink-900 transition-colors hover:bg-ink-900 hover:text-ink-0"
        >
          Tilbake til arrangementer
        </a>
      </div>
    );
  }

  /* ── Skjema ───────────────────────────────────────────────── */
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-16">
      {/* 01 · Personalia */}
      <fieldset className="border-0 p-0 m-0">
        <legend className="mb-8 font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600">
          01 · Om deg
        </legend>
        <div className="space-y-6">
          <div>
            <label htmlFor="fullName" className={labelCls}>Fullt navn *</label>
            <input id="fullName" name="fullName" type="text" autoComplete="name" required
              value={form.fullName} onChange={update("fullName")} className={inputCls} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className={labelCls}>E-post *</label>
              <input id="email" name="email" type="email" autoComplete="email" required
                value={form.email} onChange={update("email")} className={inputCls} />
            </div>
            <div>
              <label htmlFor="phone" className={labelCls}>Telefon *</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" required
                value={form.phone} onChange={update("phone")} className={inputCls} />
            </div>
          </div>
        </div>
      </fieldset>

      {/* 02 · Nødkontakt */}
      <fieldset className="border-0 p-0 m-0">
        <legend className="mb-8 font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600">
          02 · Nødkontakt
        </legend>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="ecName" className={labelCls}>Navn *</label>
              <input id="ecName" name="ecName" type="text" required
                value={form.ecName} onChange={update("ecName")} className={inputCls} />
            </div>
            <div>
              <label htmlFor="ecPhone" className={labelCls}>Telefon *</label>
              <input id="ecPhone" name="ecPhone" type="tel" required
                value={form.ecPhone} onChange={update("ecPhone")} className={inputCls} />
            </div>
          </div>
          <div>
            <label htmlFor="ecRelation" className={labelCls}>Relasjon til deg</label>
            <input id="ecRelation" name="ecRelation" type="text" placeholder="f.eks. forelder, partner, venn"
              value={form.ecRelation} onChange={update("ecRelation")} className={inputCls} />
          </div>
        </div>
      </fieldset>

      {/* 03 · Kost / allergi */}
      <fieldset className="border-0 p-0 m-0">
        <legend className="mb-8 font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600">
          03 · Kost og allergier
        </legend>
        <div>
          <label htmlFor="dietary" className={labelCls}>Kostbehov eller allergier</label>
          <textarea id="dietary" name="dietary" rows={2} placeholder="f.eks. vegetar, glutenfri, nøtteallergi, ingen"
            value={form.dietary} onChange={update("dietary")} className={inputCls} />
        </div>
      </fieldset>

      {/* 04 · Vaktvalg */}
      <fieldset className="border-0 p-0 m-0">
        <legend className="mb-3 font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600">
          04 · Vakter *
        </legend>
        <p className="mb-8 text-sm text-ink-700 max-w-lg leading-relaxed">
          Kryss av alt du kan stille på. Vaktansvarlig bekrefter nøyaktige tider nærmere arrangementet.
        </p>
        <div className="space-y-4">
          {shifts.map((shift) => {
            const checked = selectedShifts.includes(shift.value);
            return (
              <label
                key={shift.value}
                className={`flex cursor-pointer items-start gap-4 border px-5 py-5 transition-colors ${
                  checked ? "border-ink-800 bg-ink-200" : "border-ink-300 bg-ink-100 hover:border-ink-500"
                }`}
              >
                <input
                  type="checkbox"
                  name="shift"
                  value={shift.value}
                  checked={checked}
                  onChange={() => toggleShift(shift.value)}
                  className="mt-1 h-4 w-4 shrink-0 accent-ink-900"
                />
                <span className="flex-1">
                  <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="font-display text-lg uppercase text-ink-900">{shift.title}</span>
                    <span className="font-mono text-[10px] tracking-meta uppercase text-ink-600">{shift.window}</span>
                  </span>
                  <span className="mt-2 block text-sm text-ink-700 leading-relaxed">{shift.description}</span>
                </span>
              </label>
            );
          })}
        </div>
        <div className="mt-6">
          <label htmlFor="notes" className={labelCls}>
            Noe vaktansvarlig bør vite? (foretrukken rolle, tilgjengelighet o.l.)
          </label>
          <textarea id="notes" name="notes" rows={3}
            value={form.notes} onChange={update("notes")} className={inputCls} />
        </div>
      </fieldset>

      {/* 05 · Samtykke */}
      <fieldset className="border-0 p-0 m-0">
        <legend className="mb-8 font-mono text-[10px] md:text-[11px] tracking-eyebrow uppercase text-ink-600">
          05 · Personvern
        </legend>
        <label className="flex cursor-pointer items-start gap-4">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-ink-900" />
          <span className="text-sm text-ink-700 leading-relaxed">
            Jeg samtykker til at Kultursjokk lagrer opplysningene mine for å organisere frivillige til dette
            arrangementet. Opplysningene deles ikke videre og slettes etter arrangementet. Se våre{" "}
            <a href="/vilkar" className="text-ink-900 underline hover:text-ink-800">vilkår</a>.
          </span>
        </label>
      </fieldset>

      {/* Honeypot — skjult for mennesker, felle for bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">La dette feltet stå tomt</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off"
          value={form.company} onChange={update("company")} />
      </div>

      {/* Feilmelding + innsending */}
      <div className="border-t border-ink-300 pt-10">
        {errorMsg && (
          <p role="alert" className="mb-6 font-mono text-[11px] tracking-meta uppercase text-ink-900">
            ⚠ {errorMsg}
          </p>
        )}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-block border border-ink-900 px-9 py-4 font-mono text-[12px] tracking-meta uppercase text-ink-900 transition-colors hover:bg-ink-900 hover:text-ink-0 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {status === "submitting" ? "Sender…" : "Send påmelding"}
        </button>
        <p className="mt-6 max-w-md font-mono text-[10px] tracking-meta uppercase text-ink-600 leading-relaxed">
          Ta med gyldig legitimasjon til arrangementet — ID sjekkes i døra, ikke her.
        </p>
      </div>
    </form>
  );
}
