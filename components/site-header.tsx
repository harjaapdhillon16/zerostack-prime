"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BRAND, NAV, OFFER, whatsappLink } from "@/lib/site";
import { Logo } from "./logo";
import { ButtonLink, WhatsAppIcon } from "./ui/button";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 [transition-timing-function:var(--ease-out-quint)] ${
          scrolled ? "border-b border-line bg-ink/85 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" aria-label={BRAND.lockup} onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-[0.9375rem] text-fg-muted transition-colors duration-200 hover:bg-carbon/[0.05] hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink href={whatsappLink()} size="md" className="max-sm:hidden">
              <WhatsAppIcon />
              Book a slot
            </ButtonLink>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex size-11 items-center justify-center rounded-full border border-line-strong text-fg lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div className={`fixed inset-0 z-40 lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/90 backdrop-blur-xl transition-opacity duration-400 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav className="relative flex h-full flex-col justify-center px-8" aria-label="Mobile">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-5 font-display text-3xl tracking-tight text-fg transition-all duration-500 [transition-timing-function:var(--ease-out-quint)]"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(14px)",
                transitionDelay: `${open ? 90 + i * 55 : 0}ms`,
              }}
            >
              {item.label}
            </Link>
          ))}

          <div
            className="mt-10 transition-all duration-500"
            style={{ opacity: open ? 1 : 0, transitionDelay: `${open ? 90 + NAV.length * 55 : 0}ms` }}
          >
            <ButtonLink href={whatsappLink()} size="lg" className="w-full">
              <WhatsAppIcon />
              Book a slot — {OFFER.priceINR}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </>
  );
}
