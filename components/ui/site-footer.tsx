/**
 * Global footer
 * =============
 *
 * Holdt med vilje minimal — en tynn linje med firma og år.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-ink-300 px-6 md:px-16 py-10 mt-32">
      <div className="flex flex-wrap justify-between gap-6 font-mono text-[10px] md:text-[11px] tracking-meta uppercase text-ink-700">
        <span>Kultursjokk AS — Ålesund</span>
        <span>© 2026</span>
      </div>
    </footer>
  );
}
