import Link from "next/link";

/**
 * Global topp-navigasjon
 * ======================
 *
 * Brukes på alle sider. Logoen venstre, tre lenker høyre.
 * Kontakt-lenken åpner e-post direkte.
 *
 * `variant` styrer om headeren ligger transparent oppå et
 * bakgrunnsbilde (forsiden) eller som en vanlig blokk (arrangementssider).
 */
export function SiteHeader({
  variant = "solid",
}: {
  variant?: "transparent" | "solid";
}) {
  const base =
    "flex items-center justify-between px-6 md:px-16 py-8 md:py-12";
  const bg =
    variant === "transparent"
      ? "relative z-20"
      : "relative z-20 bg-ink-0";

  return (
    <header className={`${base} ${bg}`}>
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
  );
}
