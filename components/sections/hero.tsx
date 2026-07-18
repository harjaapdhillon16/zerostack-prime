"use client";

import { useEffect, useRef } from "react";
import { BRAND, OFFER, whatsappLink, WORK } from "@/lib/site";
import { heroScroll } from "@/lib/hero-scroll";
import { SceneCanvas } from "@/components/three/scene-canvas";
import { HeroScene } from "@/components/three/hero-scene";
import { ButtonLink, WhatsAppIcon, ArrowIcon } from "@/components/ui/button";

/**
 * The enterprise hero. The glass field is a full-bleed backdrop across the
 * whole frame — texture, not an object — and the composition anchors
 * lower-left: eyebrow, statement headline, then a copy/CTA row and a slim
 * stats-and-wordmarks band, in the register of the reference sites.
 */

const STATS = [
  { value: `${OFFER.days} days`, label: "fixed delivery date" },
  { value: `${OFFER.priceINR} flat`, label: "agreed in writing first" },
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
      heroScroll.p = p;

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
      {/* Full-bleed glass backdrop */}
      <SceneCanvas
        className="absolute inset-0"
        camera={{ position: [0, 0, 9], fov: 38 }}
        fallback={
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(118deg,#fff3dd_0%,#f7f8fa_38%,#e5eff8_66%,#ddfaf1_100%)]" />
            <div className="absolute left-[6%] top-[8%] h-64 w-48 rotate-[22deg] rounded-lg border border-white/70 bg-white/40" />
            <div className="absolute right-[10%] top-[14%] h-72 w-52 rotate-[22deg] rounded-lg border border-white/70 bg-white/35" />
          </div>
        }
      >
        <HeroScene />
      </SceneCanvas>

      {/* Legibility wash — bottom-weighted, where the type lives */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ink via-ink/70 to-transparent" />

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
              in the stores for a flat <span className="font-semibold text-fg">{OFFER.priceINR}</span>.
              You own every line.
            </p>

            <div className="flex shrink-0 flex-wrap items-center gap-5">
              <ButtonLink href={whatsappLink()} size="lg">
                <WhatsAppIcon />
                Book a build slot
              </ButtonLink>
              <ButtonLink href="/how-it-works" variant="quiet" size="lg" className="group">
                The 30-day plan
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
