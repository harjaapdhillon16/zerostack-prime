"use client";

import { useEffect, useRef } from "react";
import { BRAND, OFFER, whatsappLink, WORK } from "@/lib/site";
import { ButtonLink, WhatsAppIcon, ArrowIcon } from "@/components/ui/button";

/**
 * The enterprise hero: a clean pastel gradient field (no objects, no noise),
 * statement headline anchored lower-left, copy/CTA row, and a slim band of
 * stats and portfolio wordmarks. Entrance is a staggered rise; scrolling away
 * applies a gentle counter-parallax to the content.
 */

const STATS = [
  { value: `${OFFER.days} days`, label: "incl. store release management" },
  { value: OFFER.priceINR, label: "quote fixed at discovery" },
  { value: "100% yours", label: "code ownership from day one" },
] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const h = el.offsetHeight - window.innerHeight * 0.2;
      const p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;

      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${p * -38}px)`;
        contentRef.current.style.opacity = String(1 - p * 0.5);
      }
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
    <section
      ref={sectionRef}
      id="hero-light"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-fg"
    >
      {/* Straight gradient field: warm amber upper-left drifting through paper
          into cool teal lower-right. Calm, clean, nothing floating. */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(118deg, #ffedd2 0%, #f9f4ea 24%, #f7f8fa 46%, #e3eef8 72%, #d3f6ec 100%)",
        }}
      />
      {/* A soft radial lift so the field has depth without shapes. */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 78% 18%, rgba(255,255,255,0.65) 0%, transparent 60%)",
        }}
      />

      {/* Content, anchored to the lower half */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-1 flex-col justify-end will-change-transform"
      >
        <div className="shell w-full">
          <p
            className="animate-rise flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-fg-muted"
            style={{ animationDelay: "60ms" }}
          >
            <span className="size-1.5 rounded-full bg-signal" />
            {BRAND.name} · a {BRAND.parent} programme
          </p>

          <h1 className="animate-rise text-display mt-6 max-w-5xl" style={{ animationDelay: "140ms" }}>
            Your product, built
            <br />
            and live in {OFFER.days} days.
          </h1>

          <div
            className="animate-rise mt-10 flex flex-col gap-8 pb-12 md:flex-row md:items-end md:justify-between"
            style={{ animationDelay: "240ms" }}
          >
            <p className="text-lead max-w-lg text-fg-muted">
              Mobile app, admin panel, API, and database — engineered, quality-checked, and
              carried through App Store and Play Store release. A fixed quote of{" "}
              <span className="font-semibold text-fg">{OFFER.priceINR}</span>, agreed at
              discovery. You own every line.
            </p>

            <div className="flex shrink-0 flex-wrap items-center gap-5">
              <ButtonLink href={whatsappLink()} size="lg">
                <WhatsAppIcon />
                Book a discovery call
              </ButtonLink>
              <ButtonLink href="/how-it-works" variant="quiet" size="lg" className="group">
                How it works
                <ArrowIcon />
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Slim bottom band: inline stats + portfolio wordmarks */}
        <div className="shell">
          <div
            className="animate-rise flex flex-wrap items-center justify-between gap-x-10 gap-y-4 border-t border-line-strong py-6"
            style={{ animationDelay: "360ms" }}
          >
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {STATS.map((stat) => (
                <p key={stat.value} className="text-sm text-fg-muted">
                  <span className="font-display text-base font-bold text-fg">{stat.value}</span>
                  <span className="ml-2">{stat.label}</span>
                </p>
              ))}
            </div>

            <div className="hidden items-center gap-x-6 lg:flex">
              <span className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-fg-faint">
                Shipped by our team
              </span>
              {WORK.slice(0, 4).map((w) => (
                <span
                  key={w.name}
                  className="font-display text-[0.875rem] font-bold uppercase tracking-[0.04em] text-fg-faint/80"
                >
                  {w.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
