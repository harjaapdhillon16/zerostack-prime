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
      {/* Living mesh gradient: a soft base wash, five colour fields drifting
          on long offset cycles, a white lift for depth, and film grain. */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(118deg, #fdf3e3 0%, #f8f6f0 30%, #f7f8fa 52%, #eef2f9 74%, #e9f8f2 100%)",
          }}
        />
        <div className="hero-blob hero-blob-a" style={{ left: "-24vmax", top: "-26vmax" }} />
        <div className="hero-blob hero-blob-b" style={{ right: "-20vmax", top: "-6vmax" }} />
        <div className="hero-blob hero-blob-c" style={{ right: "12%", top: "-32vmax" }} />
        <div className="hero-blob hero-blob-d" style={{ left: "26%", top: "-14vmax" }} />
        <div className="hero-blob hero-blob-e" style={{ left: "-14vmax", bottom: "-22vmax" }} />
        {/* Depth lift + a quiet floor for the text and stats band */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 65% at 72% 22%, rgba(255,255,255,0.55) 0%, transparent 62%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
        <div className="hero-grain absolute inset-0" />
      </div>

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
