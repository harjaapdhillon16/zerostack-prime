import type { ReactNode } from "react";

/**
 * Shared scaffolding for the legal pages (/privacy, /terms, /refunds).
 * Server components only — plain markup styled with the site utilities.
 */

/** Page frame: "Legal" daytag, title, updated stamp, and the prose column. */
export function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="pb-24 pt-36">
      <div className="shell">
        <div className="max-w-3xl">
          <p className="daytag">Legal</p>
          <h1 className="text-h2 mt-6">{title}</h1>
          <p className="mt-5 font-mono text-xs text-fg-faint">
            Last updated: {updated}
          </p>
          <div className="mt-16 space-y-14">{children}</div>
        </div>
      </div>
    </div>
  );
}

/** Numbered section: mono index, heading, then the paragraph flow. */
export function LegalSection({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-signal">{n}</span>
        <h2 className="text-h3">{title}</h2>
      </div>
      <div className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed text-fg-muted [&_a]:text-fg [&_a]:underline [&_a]:decoration-fg-faint [&_a]:underline-offset-4 [&_a:hover]:decoration-signal [&_strong]:font-medium [&_strong]:text-fg">
        {children}
      </div>
    </section>
  );
}

/** Class string for bulleted lists inside a LegalSection. */
export const legalList = "list-disc space-y-2 pl-5 marker:text-signal";
