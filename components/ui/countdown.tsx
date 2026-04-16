"use client";

import { useEffect, useState } from "react";

/**
 * Countdown-timer
 * ===============
 *
 * Teller ned til en gitt dato og viser dager, timer, minutter.
 * Bruker client-side rendering (useEffect) for sanntidsoppdatering.
 * Etter at datoen er passert vises "Nå" i stedet for tall.
 */

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
};

function getTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  };
}

export function Countdown({ targetDate }: { targetDate: string }) {
  // targetDate format: "2026-05-01T22:00:00+02:00" (norsk tid)
  const target = new Date(targetDate);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    getTimeLeft(target)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 60_000); // oppdater hvert minutt

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <div>
        <div className="text-ink-600">Countdown</div>
        <div className="mt-2 text-ink-900">Nå</div>
      </div>
    );
  }

  const parts = [];
  if (timeLeft.days > 0) parts.push(`${timeLeft.days}d`);
  parts.push(`${timeLeft.hours}t`);
  parts.push(`${timeLeft.minutes}m`);

  return (
    <div>
      <div className="text-ink-600">Countdown</div>
      <div className="mt-2 text-ink-900">{parts.join(" : ")}</div>
    </div>
  );
}
