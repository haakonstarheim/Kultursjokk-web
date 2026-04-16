"use client";

import { useEffect, useRef, useState } from "react";

/**
 * FadeIn
 * ======
 *
 * Wrapper-komponent som fader inn barn-elementet når det
 * scroller inn i viewport. Bruker IntersectionObserver for
 * å unngå scroll-event-lytting og er dermed performant.
 *
 * Props:
 *   delay  — forsinkelse i ms før animasjonen starter (default 0)
 *   className — ekstra klasser på wrapper-diven
 */

export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // Kun animere én gang
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
