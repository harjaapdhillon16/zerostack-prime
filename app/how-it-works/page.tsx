import type { Metadata } from "next";
import { CONTACT, OFFER, TIMELINE, whatsappLink } from "@/lib/site";
import { Rule, Section, SectionHeading } from "@/components/ui/section";
import { ArrowIcon, ButtonLink, WhatsAppIcon } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "How it works",
  description: `A 3–4 day discovery fixes the scope and your quote, then the ${OFFER.days}-day clock starts: foundation, build, and QA finish the product by day ${OFFER.buildDays}; days 21–${OFFER.days} carry it through App Store and Play Store release.`,
};

/** The three things the schedule needs from the client's side. */
const ASKS = [
  {
    title: "About two hours, early",
    body:
      "A few hours of discovery calls across days 1–4, before the clock starts. We arrive with the questions prepared; you arrive knowing your business. That is the entire meeting load — the rest is ours.",
  },
  {
    title: "A decision-maker on WhatsApp",
    body:
      "One person who can say yes or no within a working day. Decisions routed through a committee are how thirty-day builds become ninety-day ones.",
  },
  {
    title: "Accounts in your name",
    body:
      "Store developer accounts and third-party signups — payments, SMS, maps — are opened under your name so you own them from day one. We guide the setup, screen by screen.",
  },
];

const CHANGE_STEPS = [
  "It is written down the day it arrives, so nothing is lost.",
  "It is scoped and quoted, in writing, as a follow-on sprint.",
  "The current build keeps its date. Day 30 does not move.",
];

export default function HowItWorksPage() {
  return (
    <>
      <header className="relative overflow-hidden pb-14 pt-36 md:pb-20 md:pt-44">
        <div className="grid-backdrop absolute inset-0" aria-hidden="true" />
        <div className="shell relative">
          <Reveal>
            <p className="daytag">The programme</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-display mt-7 max-w-4xl">
              Thirty days,
              <br />
              <span className="text-fg-muted">one phase at a time.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lead mt-8 max-w-2xl text-fg-muted">
              The {OFFER.days}-day figure is scheduling, not bravado. Five phases, each with a
              fixed window and a defined output list, and no gaps between them. This page walks
              the whole track.
            </p>
          </Reveal>
        </div>
      </header>

      {TIMELINE.map((phase, i) => (
        <Section key={phase.title} tight className={i % 2 === 1 ? "bg-surface/30" : ""}>
          <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
              <SectionHeading
                day={phase.phase}
                label={phase.kicker}
                title={phase.title}
                lead={phase.body}
              />
            </Reveal>

            <Reveal delay={120} y={32} className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="mono-panel rounded-xl p-6 text-[0.8125rem] md:p-8">
                <div className="flex items-baseline justify-between border-b border-dashed border-line-strong pb-4">
                  <span className="label">Output log</span>
                  <span className="text-[0.625rem] uppercase tracking-[0.16em] text-fg-faint">
                    {String(phase.outputs.length).padStart(2, "0")} items
                  </span>
                </div>
                <ul className="mt-5 space-y-3.5">
                  {phase.outputs.map((output, n) => (
                    <li key={output} className="flex items-baseline gap-4">
                      <span className="text-[0.625rem] tracking-[0.18em] text-fg-faint">
                        {String(n + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-fg-muted">{output}</span>
                      <span className="text-signal" aria-hidden="true">
                        ✓
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Section>
      ))}

      <Rule />

      <Section tight>
        <div className="shell">
          <Reveal>
            <SectionHeading
              label="Your side of the schedule"
              title="What we need from you."
              lead="Thirty days works because both sides show up. Your part is small, but it is not zero — and it is all listed here."
            />
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {ASKS.map((ask, i) => (
              <Reveal key={ask.title} delay={i * 80}>
                <article className="card h-full rounded-xl p-6">
                  <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-signal">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-h3 mt-4">{ask.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{ask.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section tight className="bg-surface/30">
        <div className="shell grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              label="Change control"
              title="The scope is locked. That is the feature."
              lead="Around day 18 you will have a new idea — building clarifies thinking, and we count on it. What we do not do is fold that idea into a sprint that was priced and dated without it. The document is the contract."
            />
          </Reveal>

          <Reveal delay={120} y={32}>
            <div className="mono-panel rounded-xl p-6 text-[0.8125rem] md:p-8">
              <p className="label">When a new idea arrives mid-build</p>
              <ol className="mt-5 space-y-4">
                {CHANGE_STEPS.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="text-signal">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 leading-relaxed text-fg-muted">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 border-t border-dashed border-line-strong pt-4">
                <p className="text-[0.6875rem] leading-relaxed text-fg-faint">
                  The rule is not there to sell you a second sprint. Every mid-flight change
                  reopens the schedule, and the date is the thing you bought. Defects in the
                  locked scope are ours to fix at no charge — that is not a change, that is the
                  contract.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Rule />

      <Section tight>
        <div className="shell text-center">
          <Reveal>
            <p className="daytag">Day 00 · the scope call</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-h2 mx-auto mt-6 max-w-3xl">
              The programme starts with a 20-minute call.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lead mx-auto mt-6 max-w-xl text-fg-muted">
              Bring the idea in whatever shape it is in. If the fixed price is wrong for it, we
              say so on that call — not after a deposit.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href={whatsappLink()} size="lg">
                <WhatsAppIcon />
                WhatsApp us the idea
              </ButtonLink>
              <ButtonLink href="/pricing" variant="ghost" size="lg">
                See the full receipt
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
