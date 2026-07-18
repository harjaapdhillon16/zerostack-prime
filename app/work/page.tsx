import type { Metadata } from "next";
import { BRAND, CONTACT, WORK, whatsappLink } from "@/lib/site";
import { Section } from "@/components/ui/section";
import { ArrowIcon, ButtonLink, WhatsAppIcon } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Work",
  description: `Products shipped by the team behind ${BRAND.name}, under ${BRAND.parent} — mobility, education, fintech, logistics, and more. No invented metrics, no borrowed logos.`,
};

export default function WorkPage() {
  return (
    <>
      <header className="relative overflow-hidden pb-14 pt-36 md:pb-20 md:pt-44">
        <div className="grid-backdrop absolute inset-0" aria-hidden="true" />
        <div className="shell relative">
          <Reveal>
            <p className="daytag">Track record</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-display mt-7 max-w-4xl">
              Shipped,
              <br />
              <span className="text-fg-muted">not promised.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lead mt-8 max-w-2xl text-fg-muted">
              {BRAND.name} is the fixed-price offer; the team behind it has been shipping
              products for years as{" "}
              <a
                href={BRAND.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg underline decoration-signal/50 underline-offset-4 transition-colors hover:decoration-signal"
              >
                {BRAND.parent}
              </a>
              . Everything below went to production under that name — same engineers, same
              stack, same standards.
            </p>
          </Reveal>
        </div>
      </header>

      <Section tight>
        <div className="shell">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {WORK.map((item, i) => (
              <Reveal key={item.name} delay={(i % 4) * 70}>
                <article className="card group flex h-full flex-col rounded-xl p-6 transition-colors duration-300 hover:border-signal/40">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-fg-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-muted">
                      {item.domain}
                    </span>
                  </div>
                  <h3 className="text-h3 mt-5">{item.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160}>
            <div className="mono-panel mt-6 rounded-xl px-7 py-6 text-[0.8125rem]">
              <p className="leading-relaxed text-fg-muted">
                <span className="text-signal">NOTE</span> — Case studies with numbers are shared
                on the first call; some are under NDA. We would rather show you the real thing
                in private than print an invented metric here.
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
            <h2 className="text-h2 mx-auto mt-6 max-w-3xl">Add yours to the list.</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lead mx-auto mt-6 max-w-xl text-fg-muted">
              The first call is 20 minutes. We will tell you which of these your product most
              resembles — and whether the fixed price fits it.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href={whatsappLink()} size="lg">
                <WhatsAppIcon />
                WhatsApp us the idea
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
