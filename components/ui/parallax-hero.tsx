"use client";

import { useEffect, useRef } from "react";

/**
 * ParallaxHero
 * ============
 *
 * Wrapper som gir barneelementet (bakgrunnsbilde) en subtil
 * parallax-effekt ved scroll. Bildet beveger seg saktere enn
 * resten av siden, noe som gir dybde.
 *
 * Bruker requestAnimationFrame for jevn ytelse — ingen
 * tredjeparts-biblioteker.
 *
 * `speed` styrer hvor mye bildet forskyves (0.3 = 30% av scroll).
 */

export function ParallaxHero({
  children,
  speed = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (el) {
            const scrollY = window.scrollY;
            el.style.transform = `translateY(${scrollY * speed}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
