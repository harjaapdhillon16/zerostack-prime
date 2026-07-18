import { OFFER, WORK } from "@/lib/site";

/**
 * The telemetry strip: a thin instrument readout between hero and body.
 * Left: static status chips. Right: shipped-product marquee inheriting the
 * parent company's track record.
 */
export function Telemetry() {
  const items = [...WORK, ...WORK]; // doubled for the seamless loop

  return (
    <div className="relative overflow-hidden border-y border-line bg-surface/60">
      <div className="shell flex flex-col gap-4 py-4 md:flex-row md:items-center md:gap-8">
        <div className="flex shrink-0 items-center gap-6 text-[0.6875rem] font-semibold uppercase tracking-[0.12em]">
          <span className="flex items-center gap-2 text-signal">
            <span className="size-1.5 rounded-full bg-signal" />
            slots limited
          </span>
          <span className="text-fg-faint">
            {OFFER.days}d · {OFFER.priceINR}
          </span>
        </div>

        <div
          className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
          aria-label="Products shipped by Prime Depth Labs"
        >
          <div className="animate-marquee flex w-max items-center">
            {items.map((w, i) => (
              <span
                key={`${w.name}-${i}`}
                className="mx-6 flex items-center gap-2.5 whitespace-nowrap text-xs font-medium text-fg-muted"
                aria-hidden={i >= WORK.length}
              >
                <span className="text-fg-faint">▸</span>
                <span className="font-display text-[0.8125rem] font-semibold">{w.name}</span>
                <span className="text-[0.625rem] font-semibold uppercase tracking-wider text-fg-faint">
                  {w.domain} · shipped
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
