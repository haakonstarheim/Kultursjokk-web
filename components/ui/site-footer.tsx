import Link from "next/link";

/**
 * Global footer
 * =============
 *
 * Holdt med vilje minimal — firma, vilkårslenke og år.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-ink-300 px-6 md:px-16 py-10 mt-32">
      <div className="flex flex-wrap items-center justify-between gap-6 font-mono text-[10px] md:text-[11px] tracking-meta uppercase text-ink-700">
        <span>Kultursjokk AS — Ålesund</span>
        <div className="flex items-center gap-6">
          <Link href="/vilkar" className="hover:text-ink-900 transition-colors">
            Vilkår
          </Link>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
