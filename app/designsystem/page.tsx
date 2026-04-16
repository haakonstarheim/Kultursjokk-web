/**
 * Designsystem-demo
 * =================
 *
 * Denne siden er ikke den endelige forsiden — den er en
 * "kontaktark" som viser alle byggeklossene i designsystemet
 * vårt: farger, typografi, labels, dividers og metadata-stil.
 *
 * Formålet er at vi skal se og godkjenne det visuelle språket
 * før vi bygger selve forsiden i Fase 2.
 */

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen px-6 py-20 md:px-16 md:py-32">
      {/* ---------- Intro ---------- */}
      <header className="max-w-5xl border-b border-ink-300 pb-12 mb-24">
        <p className="font-mono text-xs tracking-eyebrow uppercase text-ink-700">
          Kultursjokk / Designsystem v0.2
        </p>
        {/* leading-[1.05] gir display-overskriften nok pusterom
            mellom linjene uten at den blir oppstykket */}
        <h1 className="font-display text-display-md leading-[1.05] mt-6 uppercase text-ink-900">
          Svart.<br />Grått.<br />Ingenting&nbsp;mer.
        </h1>
        <p className="mt-8 max-w-xl text-ink-700 text-base leading-relaxed">
          Dette er byggeklossene for nettsiden. Hver komponent og
          typografisk variant er bygget kun av svart og nyanser av grå.
          Ren hvit er bevisst ekskludert — paletten skal føles som en
          mørk bunker opplyst av ett enslig lysstoffrør.
        </p>
      </header>

      {/* ---------- Fargeskala ---------- */}
      <section className="mb-24">
        <SectionTitle number="01" title="Fargeskala" />
        <div className="grid grid-cols-2 md:grid-cols-6 gap-px bg-ink-300 border border-ink-300">
          {[
            { name: "ink-0", hex: "#000000", bg: "bg-ink-0", text: "text-ink-900" },
            { name: "ink-100", hex: "#0B0B0B", bg: "bg-ink-100", text: "text-ink-900" },
            { name: "ink-300", hex: "#181818", bg: "bg-ink-300", text: "text-ink-900" },
            { name: "ink-500", hex: "#2C2C2C", bg: "bg-ink-500", text: "text-ink-900" },
            { name: "ink-700", hex: "#585858", bg: "bg-ink-700", text: "text-ink-0" },
            { name: "ink-900", hex: "#A0A0A0", bg: "bg-ink-900", text: "text-ink-0" },
          ].map((c) => (
            <div
              key={c.name}
              className={`${c.bg} ${c.text} aspect-square p-4 flex flex-col justify-between`}
            >
              <span className="font-mono text-[10px] tracking-meta uppercase">
                {c.name}
              </span>
              <span className="font-mono text-[10px] tracking-meta uppercase">
                {c.hex}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Typografi ---------- */}
      <section className="mb-24">
        <SectionTitle number="02" title="Typografi" />

        <div className="space-y-16">
          <div>
            <MetaLabel>Display / Anton</MetaLabel>
            <p className="font-display text-display-lg uppercase mt-4 text-ink-900">KORSA</p>
          </div>

          <div>
            <MetaLabel>Display / Anton — medium</MetaLabel>
            <p className="font-display text-display-md uppercase mt-4 text-ink-900">
              Rave i tunnelen
            </p>
          </div>

          <div>
            <MetaLabel>Heading / Inter 700</MetaLabel>
            <p className="text-3xl md:text-4xl font-bold mt-4 tracking-tight text-ink-900 leading-tight">
              Alternative opplevelser.<br />Uforglemmelige øyeblikk.
            </p>
          </div>

          <div>
            <MetaLabel>Body / Inter 400</MetaLabel>
            <p className="mt-4 max-w-xl text-ink-800 leading-relaxed">
              Kultursjokk AS er et eventkollektiv basert i Ålesund som
              skaper unike musikk- og kulturarrangementer utenfor det
              etablerte. Vi aktiverer utradisjonelle lokasjoner —
              tunneler, lagerlokaler, natur — og kuraterer helhetlige
              opplevelser med lyd, lys og visuell identitet.
            </p>
          </div>

          <div>
            <MetaLabel>Meta / JetBrains Mono</MetaLabel>
            <p className="mt-4 font-mono text-xs tracking-meta uppercase text-ink-700">
              14.02.2026 — Korsatunnelen — Ålesund — 22:00
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Knapp & interaksjon ---------- */}
      <section className="mb-24">
        <SectionTitle number="03" title="Interaksjon" />
        <div className="flex flex-wrap gap-6">
          <button className="group relative border border-ink-900 px-8 py-4 font-mono text-xs tracking-meta uppercase text-ink-900 transition-colors duration-300 ease-brutal hover:bg-ink-900 hover:text-ink-0">
            Kjøp billett
          </button>
          <button className="group relative border border-ink-500 px-8 py-4 font-mono text-xs tracking-meta uppercase text-ink-700 transition-colors duration-300 ease-brutal hover:border-ink-900 hover:text-ink-900">
            Les mer
          </button>
          <a
            href="#"
            className="group inline-flex items-center gap-3 font-mono text-xs tracking-meta uppercase text-ink-700 hover:text-ink-900 transition-colors"
          >
            <span className="h-px w-8 bg-ink-700 group-hover:bg-ink-900 transition-colors" />
            Se alle arrangementer
          </a>
        </div>
      </section>

      {/* ---------- Arrangementskort ---------- */}
      <section className="mb-24">
        <SectionTitle number="04" title="Arrangementskort" />
        <article className="border-t border-ink-300 pt-8 max-w-3xl">
          <p className="font-mono text-xs tracking-eyebrow uppercase text-ink-700">
            Kommende arrangement — 01
          </p>
          <h3 className="font-display text-display-md uppercase mt-6 text-ink-900">
            KORSA
          </h3>
          <p className="mt-4 text-xl text-ink-900">
            Rave i Korsatunnelen — Ålesund
          </p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-[11px] tracking-meta uppercase border-t border-ink-300 pt-6">
            <div>
              <div className="text-ink-600">Dato</div>
              <div className="mt-2 text-ink-900">14.02.2026</div>
            </div>
            <div>
              <div className="text-ink-600">Dører</div>
              <div className="mt-2 text-ink-900">22:00</div>
            </div>
            <div>
              <div className="text-ink-600">Sjanger</div>
              <div className="mt-2 text-ink-900">Techno / DnB</div>
            </div>
            <div>
              <div className="text-ink-600">Alder</div>
              <div className="mt-2 text-ink-900">20+</div>
            </div>
          </div>
        </article>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-ink-300 pt-10 mt-32">
        <div className="flex flex-wrap justify-between gap-6 font-mono text-[11px] tracking-meta uppercase text-ink-700">
          <span>Kultursjokk AS — Ålesund</span>
          <span>Designsystem v0.2 — Fase 1</span>
        </div>
      </footer>
    </main>
  );
}

/* ---------- Hjelpekomponenter ---------- */

function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-6 mb-10 border-b border-ink-300 pb-4">
      <span className="font-mono text-xs tracking-meta uppercase text-ink-600">
        {number}
      </span>
      <h2 className="font-mono text-xs tracking-meta uppercase text-ink-900">
        {title}
      </h2>
    </div>
  );
}

function MetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] tracking-meta uppercase text-ink-600">
      {children}
    </span>
  );
}
