"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/lib/hooks";

/**
 * Scroll-in reveal. One component so every entrance on the site shares the
 * same distance, duration, and easing. CSS-only on purpose — with several
 * WebGL canvases on the page, the DOM motion layer should cost nothing.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  style,
}: {
  children: ReactNode;
  /** ms; cascade siblings in 60–90ms steps. */
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const { ref, inView } = useInView<HTMLDivElement>("-80px");

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translateY(${y}px)`,
        transition: `opacity 0.9s var(--ease-out-quint) ${delay}ms, transform 0.9s var(--ease-out-quint) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
