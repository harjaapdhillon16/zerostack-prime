"use client";

import { useEffect, useMemo, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/hooks";

/**
 * The scope terminal: a fake editor that types three real-looking files on a
 * loop — the scope lock, the schema, and a reviewed API route. This is the
 * "watch the work happen" moment of the page, so the content is written to
 * read like an actual engagement, not lorem code.
 */

type Span = [cls: string, text: string];
type Tab = { name: string; stamp: string; lines: Span[][] };

const K = "text-signal";       // keywords / structure
const S = "text-amber";        // strings / numbers / money
const C = "text-fg-faint";     // comments / chrome
const P = "text-fg";           // plain
const G = "text-signal";       // checkmarks
const R = "text-red";          // review fixes

const TABS: Tab[] = [
  {
    name: "scope.lock.md",
    stamp: "DISCOVERY COMPLETE · QUOTE FIXED",
    lines: [
      [[C, "# bazaar-app · scope lock"]],
      [[C, "owner: you · builder: zerostack"]],
      [[P, ""]],
      [[G, "[x] "], [P, "auth — phone OTP · roles: buyer / seller / admin"]],
      [[G, "[x] "], [P, "listings — create, search, filters, photos"]],
      [[G, "[x] "], [P, "orders — cart, checkout, live status"]],
      [[G, "[x] "], [P, "payments — razorpay, webhooks, refunds"]],
      [[G, "[x] "], [P, "admin — users, orders, payouts, exports"]],
      [[G, "[x] "], [P, "notifications — push + SMS on order events"]],
      [[P, ""]],
      [[P, "screens: "], [S, "24"], [P, " · tables: "], [S, "11"], [P, " · endpoints: "], [S, "38"]],
      [[P, "delivery: "], [S, "day 30"], [P, " · quote: "], [S, "fixed at discovery"]],
    ],
  },
  {
    name: "schema.sql",
    stamp: "MIGRATION 007 APPLIED",
    lines: [
      [[K, "create table"], [P, " orders ("]],
      [[P, "  id          "], [K, "uuid primary key"], [P, " "], [K, "default"], [P, " gen_random_uuid(),"]],
      [[P, "  buyer_id    "], [K, "uuid not null references"], [P, " users(id),"]],
      [[P, "  seller_id   "], [K, "uuid not null references"], [P, " users(id),"]],
      [[P, "  status      order_status "], [K, "not null default"], [P, " "], [S, "'placed'"], [P, ","]],
      [[P, "  total_inr   "], [K, "integer not null check"], [P, " (total_inr >= "], [S, "0"], [P, "),"]],
      [[P, "  placed_at   "], [K, "timestamptz not null default"], [P, " now()"]],
      [[P, ");"]],
      [[P, ""]],
      [[K, "create index"], [P, " orders_seller_status_idx"]],
      [[P, "  "], [K, "on"], [P, " orders (seller_id, status, placed_at "], [K, "desc"], [P, ");"]],
      [[C, "-- p95 seller dashboard query: 210ms → 4ms"]],
    ],
  },
  {
    name: "api/orders.ts",
    stamp: "✓ TYPECHECK · ✓ 14 TESTS · ✓ REVIEWED",
    lines: [
      [[C, "// AI drafted · engineer reviewed — "], [R, "2 fixes required"]],
      [[K, "export const"], [P, " createOrder = route({"]],
      [[P, "  body: "], [K, "OrderInput"], [C, ",        // zod, strict"]],
      [[P, "  auth: ["], [S, "\"buyer\""], [P, "],"]],
      [[P, "  handler: "], [K, "async"], [P, " ({ user, body, db }) => {"]],
      [[P, "    "], [K, "const"], [P, " order = "], [K, "await"], [P, " db.orders.create({"]],
      [[P, "      ...body,"]],
      [[P, "      buyerId: user.id,"]],
      [[P, "      status: "], [S, "\"placed\""], [P, ","]],
      [[P, "    });"]],
      [[P, "    "], [K, "await"], [P, " notify.seller(order.sellerId, order.id);"]],
      [[P, "    "], [K, "return"], [P, " Created(order);"]],
      [[P, "  },"]],
      [[P, "});"]],
    ],
  },
];

/** Character length of a tab, used to drive the typing counter. */
function tabLength(tab: Tab) {
  return tab.lines.reduce(
    (sum, line) => sum + line.reduce((s, [, text]) => s + text.length, 0) + 1,
    0,
  );
}

export function Terminal() {
  const { ref, inView } = useInView<HTMLDivElement>("-40px");
  const reducedMotion = useReducedMotion();
  const [tabIndex, setTabIndex] = useState(0);
  const [typed, setTyped] = useState(0);

  const tab = TABS[tabIndex];
  const total = useMemo(() => tabLength(tab), [tab]);
  const done = typed >= total;

  useEffect(() => {
    if (!inView || reducedMotion) return;

    if (!done) {
      // ~110 chars/sec: fast enough to feel machine-driven, slow enough to read.
      const interval = setInterval(() => setTyped((n) => n + 2), 18);
      return () => clearInterval(interval);
    }

    // Hold the finished file (and its stamp), then rotate to the next tab.
    const hold = setTimeout(() => {
      setTabIndex((i) => (i + 1) % TABS.length);
      setTyped(0);
    }, 3200);
    return () => clearTimeout(hold);
  }, [inView, reducedMotion, done]);

  // Reduced motion: show the first file complete, no loop.
  const budget = reducedMotion ? Number.POSITIVE_INFINITY : typed;

  let remaining = budget;
  const visibleLines = tab.lines.map((line) => {
    const spans: Span[] = [];
    for (const [cls, text] of line) {
      if (remaining <= 0) break;
      const slice = text.slice(0, Math.max(0, Math.min(text.length, remaining)));
      remaining -= text.length;
      if (slice) spans.push([cls, slice]);
    }
    remaining -= 1; // newline
    return spans;
  });

  return (
    <div ref={ref} className="mono-panel overflow-hidden rounded-xl text-[0.8125rem] leading-relaxed">
      {/* Chrome */}
      <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-red/70" />
          <span className="size-2.5 rounded-full bg-amber/70" />
          <span className="size-2.5 rounded-full bg-signal/70" />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {TABS.map((t, i) => (
            <span
              key={t.name}
              className={`whitespace-nowrap rounded px-2.5 py-1 text-[0.6875rem] transition-colors duration-300 ${
                i === tabIndex ? "border border-line bg-surface text-fg shadow-sm" : "text-fg-faint"
              }`}
            >
              {t.name}
            </span>
          ))}
        </div>
      </div>

      {/* Body — fixed height so tab switches don't reflow the page */}
      <div className="relative h-[21rem] overflow-hidden p-4 sm:h-[22rem] sm:p-5">
        <pre className="whitespace-pre-wrap break-words">
          {visibleLines.map((spans, i) => (
            <div key={i} className="min-h-[1.4em]">
              {spans.map(([cls, text], j) => (
                <span key={j} className={cls}>
                  {text}
                </span>
              ))}
              {/* Cursor sits at the end of the last visible line */}
              {!reducedMotion &&
              !done &&
              i === visibleLines.findLastIndex((s) => s.length > 0) ? (
                <span className="animate-blink ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-signal" />
              ) : null}
            </div>
          ))}
        </pre>

        {/* Completion stamp */}
        <div
          className={`absolute bottom-4 right-4 rounded border px-3 py-1.5 text-[0.6875rem] tracking-[0.14em] transition-all duration-500 [transition-timing-function:var(--ease-out-quint)] ${
            done || reducedMotion
              ? "translate-y-0 border-signal/40 bg-signal/10 text-signal opacity-100"
              : "translate-y-2 border-transparent opacity-0"
          }`}
        >
          {tab.stamp}
        </div>
      </div>

      {/* Status line */}
      <div className="flex items-center justify-between border-t border-line bg-surface-2 px-4 py-2.5 text-[0.6875rem] text-fg-faint">
        <span>
          zerostack · sprint <span className="text-signal">live</span>
        </span>
        <span className="daytag">day 0{tabIndex + 1} / 30</span>
      </div>
    </div>
  );
}
