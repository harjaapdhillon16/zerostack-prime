"use client";

import { useEffect, useRef } from "react";

/**
 * The day rail: a fixed hairline on the left edge that tracks scroll through
 * the entire page as days of the sprint. The fill climbs, the amber readout
 * counts DAY 00 → 31, and it works on every route — the whole site runs on
 * the same clock. Desktop only; imperative updates so it costs no renders.
 */
export function DayRail() {
  const fillRef = useRef<HTMLDivElement>(null);
  const puckRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLSpanElement>(null);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll-event driven — free while idle, immune to rAF throttling.
    const update = () => {
      const doc = document.documentElement;
      const span = doc.scrollHeight - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0;

      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
      if (puckRef.current) puckRef.current.style.top = `${8 + p * 84}%`;
      if (dayRef.current) dayRef.current.textContent = String(Math.round(p * 31)).padStart(2, "0");
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-y-0 left-5 z-40 hidden w-10 transition-opacity duration-700 lg:block"
      aria-hidden="true"
    >
      {/* Rail + fill */}
      <div className="absolute inset-y-[8%] left-1/2 w-px -translate-x-1/2 bg-line">
        <div
          ref={fillRef}
          className="h-full w-full origin-top bg-gradient-to-b from-signal/20 via-signal/70 to-signal"
          style={{ transform: "scaleY(0)" }}
        />
      </div>

      {/* Ticks every five days */}
      {Array.from({ length: 7 }, (_, i) => (
        <span
          key={i}
          className="absolute left-1/2 h-px w-2 -translate-x-1/2 bg-line-strong"
          style={{ top: `${8 + (i / 6) * 84}%` }}
        />
      ))}

      {/* Puck + readout */}
      <div ref={puckRef} className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top: "8%" }}>
        <div className="flex items-center gap-2">
          <span className="block size-2 rounded-full bg-amber" />
          <span className="whitespace-nowrap font-mono text-[0.625rem] tracking-[0.14em] text-fg-faint">
            DAY <span ref={dayRef} className="text-amber">00</span>
          </span>
        </div>
      </div>
    </div>
  );
}
