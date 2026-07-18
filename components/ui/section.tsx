import type { ReactNode } from "react";

/** Shared vertical rhythm for every section on the site. */
export function Section({
  children,
  className = "",
  id,
  tight = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tight?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative ${tight ? "py-20 md:py-28" : "py-28 md:py-40"} ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Section heading. `day` is the amber sprint-marker that threads the whole
 * page — every section is an entry in the 30-day log.
 */
export function SectionHeading({
  day,
  label,
  title,
  lead,
  align = "left",
  className = "",
}: {
  /** e.g. "Day 01–03" — rendered as the amber day marker. */
  day?: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        {day ? (
          <>
            <span className="daytag">{day}</span>
            <span className="h-px w-6 bg-amber/40" />
          </>
        ) : (
          <span className="size-1.5 rounded-full bg-signal" />
        )}
        <span className="label">{label}</span>
      </div>
      <h2 className="text-h2 mt-6">{title}</h2>
      {lead ? <p className="text-lead mt-6 text-fg-muted">{lead}</p> : null}
    </div>
  );
}

/** Full-width hairline with a slow scanline sweep, separating major movements. */
export function Rule() {
  return (
    <div className="shell" aria-hidden="true">
      <div className="scanline h-px w-full opacity-60" />
    </div>
  );
}
