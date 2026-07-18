import { OFFER, PAYMENT_TERMS, RECEIPT, whatsappLink } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { ArrowIcon, ButtonLink, WhatsAppIcon } from "@/components/ui/button";

/**
 * Pricing as a printed receipt. A flat fee deserves a flat artifact: every
 * line item, one warm number at the bottom, nothing to hover over to discover.
 */
export function Receipt() {
  return (
    <Section className="bg-surface/30">
      <div className="shell grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
        <div>
          <Reveal>
            <SectionHeading
              day="Day 30"
              label="The receipt"
              title={
                <>
                  One quote.
                  <br />
                  Fixed at discovery.
                </>
              }
              lead="Your quote lands between ₹50,000 and ₹1,00,000 depending on scope — fixed in writing at the end of discovery, before any payment. If we misjudge the effort, that is our invoice to absorb — not yours."
            />
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 max-w-lg text-[0.9375rem] leading-relaxed text-fg-muted">
              {PAYMENT_TERMS}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href={whatsappLink()} size="lg">
                <WhatsAppIcon />
                Claim this receipt
              </ButtonLink>
              <ButtonLink href="/pricing" variant="ghost" size="lg">
                Full pricing detail
                <ArrowIcon />
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* The receipt itself */}
        <Reveal delay={100} y={32}>
          <div className="mx-auto w-full max-w-md">
            <div className="mono-panel relative rounded-t-xl px-7 pb-8 pt-7 text-[0.8125rem]">
              {/* Header */}
              <div className="text-center">
                <p className="text-[0.9375rem] font-medium tracking-[0.3em] text-fg">ZEROSTACK</p>
                <p className="mt-1.5 text-[0.625rem] uppercase tracking-[0.2em] text-fg-faint">
                  by Prime Depth Labs · fixed-fee build
                </p>
              </div>

              <div className="my-5 border-t border-dashed border-line-strong" />

              {/* Line items */}
              <table className="w-full">
                <tbody>
                  {RECEIPT.map((line) => (
                    <tr key={line.code} className="align-baseline">
                      <td className="py-[0.3rem] pr-3 text-[0.625rem] uppercase tracking-wider text-signal">
                        {line.code}
                      </td>
                      <td className="py-[0.3rem] pr-3 leading-snug text-fg-muted">{line.item}</td>
                      <td className="py-[0.3rem] text-right text-[0.625rem] uppercase tracking-wider text-fg-faint">
                        incl.
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="my-5 border-t border-dashed border-line-strong" />

              {/* Comparison + total */}
              <div className="flex items-baseline justify-between text-fg-faint">
                <span className="text-[0.6875rem] uppercase tracking-wider">Typical agency quote</span>
                <span className="line-through decoration-red/70">₹4,50,000+</span>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-[0.6875rem] uppercase tracking-[0.18em] text-fg">Total · {OFFER.days} days</span>
                <span className="numerals whitespace-nowrap text-2xl text-amber md:text-3xl">{OFFER.priceINR}</span>
              </div>
              <p className="mt-2 text-right text-[0.625rem] uppercase tracking-wider text-fg-faint">
                + GST · {OFFER.priceUSDApprox}
              </p>

              <div className="my-5 border-t border-dashed border-line-strong" />

              {/* Barcode */}
              <div
                className="h-9 w-full opacity-70"
                aria-hidden="true"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, var(--color-fg) 0 2px, transparent 2px 4px, var(--color-fg) 4px 7px, transparent 7px 9px, var(--color-fg) 9px 10px, transparent 10px 14px)",
                }}
              />
              <p className="mt-2 text-center text-[0.625rem] uppercase tracking-[0.3em] text-fg-faint">
                no hidden line items
              </p>
            </div>

            {/* Tear-off stub */}
            <div className="mono-panel rounded-b-xl border-t border-dashed border-line-strong px-7 py-4 text-center">
              <p className="text-[0.625rem] uppercase tracking-[0.25em] text-fg-faint">
                ✂ tear here — <span className="text-signal">keep the source code</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
