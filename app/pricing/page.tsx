import type { Metadata } from "next";
import {
  BRAND,
  COMPARE,
  CONTACT,
  NOT_INCLUDED,
  OFFER,
  PAYMENT_TERMS,
  RECEIPT,
  whatsappLink,
} from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/section";
import { ArrowIcon, ButtonLink, WhatsAppIcon } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Pricing",
  description: `One flat ${OFFER.priceINR} for the app, admin panel, API, and database — itemized line by line, with what is not included stated just as plainly.`,
};

const LAST_COL = COMPARE.columns.length - 1;
const LAST_ROW = COMPARE.rows.length - 1;

export default function PricingPage() {
  return (
    <>
      <header className="relative overflow-hidden pb-14 pt-36 md:pb-20 md:pt-44">
        <div className="grid-backdrop absolute inset-0" aria-hidden="true" />
        <div className="shell relative">
          <Reveal>
            <p className="daytag">The receipt</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-display mt-7 max-w-4xl">
              One number.
              <br />
              <span className="text-fg-muted">It does not move.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lead mt-8 max-w-2xl text-fg-muted">
              {OFFER.priceINR} ({OFFER.priceUSDApprox}) for the app, the admin panel, the API,
              the database, and the keys to all of it. Fixed before we start, identical when we
              finish. If we misjudge the effort, the difference is ours.
            </p>
          </Reveal>
        </div>
      </header>

      <Section tight>
        <div className="shell">
          <Reveal y={32}>
            <div className="mono-panel mx-auto w-full max-w-2xl rounded-xl px-7 py-8 text-[0.875rem] shadow-[0_32px_90px_-28px_rgba(0,0,0,0.85)] md:px-10 md:py-10">
              <div className="text-center">
                <p className="text-base font-medium uppercase tracking-[0.3em] text-fg">
                  {BRAND.name}
                </p>
                <p className="mt-1.5 text-[0.625rem] uppercase tracking-[0.2em] text-fg-faint">
                  by {BRAND.parent} · fixed-fee build · itemized in full
                </p>
              </div>

              <div className="my-6 border-t border-dashed border-line-strong" />

              <table className="w-full">
                <tbody>
                  {RECEIPT.map((line) => (
                    <tr key={line.code} className="align-baseline">
                      <td className="py-1.5 pr-4 text-[0.6875rem] uppercase tracking-wider text-signal">
                        {line.code}
                      </td>
                      <td className="py-1.5 pr-4 leading-snug text-fg-muted">{line.item}</td>
                      <td className="py-1.5 text-right text-[0.6875rem] uppercase tracking-wider text-fg-faint">
                        incl.
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="my-6 border-t border-dashed border-line-strong" />

              <div className="flex items-baseline justify-between text-[0.6875rem] uppercase tracking-wider text-fg-faint">
                <span>Line items</span>
                <span>{String(RECEIPT.length).padStart(2, "0")} · all included</span>
              </div>
              <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <span className="text-[0.6875rem] uppercase tracking-[0.18em] text-fg">
                  Total · {OFFER.days} days · fixed
                </span>
                <span className="numerals amber-glow text-5xl text-amber md:text-6xl">
                  {OFFER.priceINR}
                </span>
              </div>
              <p className="mt-3 text-right text-[0.625rem] uppercase tracking-wider text-fg-faint">
                + GST · {OFFER.priceUSDApprox} · no hidden line items
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-fg-muted">
              {PAYMENT_TERMS}
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tight className="bg-surface/30">
        <div className="shell">
          <Reveal>
            <SectionHeading
              label="The edges"
              title="What is not included."
              lead="A fixed price only means something if its edges are drawn in ink. These are the edges — stated before you pay, not discovered after."
            />
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {NOT_INCLUDED.map((entry, i) => (
              <Reveal key={entry.item} delay={i * 70}>
                <article className="card h-full rounded-xl p-6">
                  <h3 className="text-h3">{entry.item}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{entry.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tight>
        <div className="shell">
          <Reveal>
            <SectionHeading
              label="The market"
              title="The same build, four ways to buy it."
              lead="Every route below can produce software. They differ in what you pay, when you launch, and who owns the result."
            />
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-14 overflow-x-auto">
              <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pr-4">
                      <span className="sr-only">Criterion</span>
                    </th>
                    {COMPARE.columns.map((col, c) => (
                      <th
                        key={col}
                        scope="col"
                        className={`px-4 py-3.5 text-left font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] ${
                          c === LAST_COL
                            ? "rounded-t-lg border-x border-t border-signal/40 bg-signal/[0.06] text-signal"
                            : "text-fg-faint"
                        }`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.rows.map((row, r) => (
                    <tr key={row.label}>
                      <th
                        scope="row"
                        className="border-t border-t-line py-4 pr-4 text-left font-mono text-[0.6875rem] font-normal uppercase tracking-[0.14em] text-fg-faint"
                      >
                        {row.label}
                      </th>
                      {row.values.map((value, c) => (
                        <td
                          key={`${row.label}-${COMPARE.columns[c]}`}
                          className={
                            c === LAST_COL
                              ? `border-x border-t border-t-line border-x-signal/40 bg-signal/[0.04] px-4 py-4 font-medium text-signal ${
                                  r === LAST_ROW
                                    ? "rounded-b-lg border-b border-b-signal/40"
                                    : ""
                                }`
                              : "border-t border-t-line px-4 py-4 text-fg-muted"
                          }
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-signal/40 bg-signal/[0.04] p-8 text-center md:p-10">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-signal">
                If we miss the date
              </p>
              <h3 className="text-h3 mt-4">
                We keep working, free, until the locked scope ships.
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-fg-muted">
                The date is our risk, not yours. It is also why we are strict about the scope
                document — the same rule that protects our schedule protects your delivery.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tight className="bg-surface/30">
        <div className="shell text-center">
          <Reveal>
            <p className="daytag">Day 00</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-h2 mx-auto mt-6 max-w-3xl">One message locks the price.</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lead mx-auto mt-6 max-w-xl text-fg-muted">
              The fee does not depend on how the call goes. Bring the idea; leave with a written
              scope and a fixed date within 48 hours.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href={whatsappLink()} size="lg">
                <WhatsAppIcon />
                WhatsApp us — claim the receipt
              </ButtonLink>
              <ButtonLink href="/how-it-works" variant="ghost" size="lg">
                How the 30 days run
                <ArrowIcon />
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-8 font-mono text-xs text-fg-faint">
              {CONTACT.hours} · the reply is a human
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
