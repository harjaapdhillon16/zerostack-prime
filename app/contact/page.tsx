import type { Metadata } from "next";
import { BRAND, CONTACT, whatsappLink } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/section";
import { ArrowIcon, ButtonLink, WhatsAppIcon } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${BRAND.lockup} on WhatsApp, phone, or email. A 20-minute call, a written scope within 48 hours, and nothing due before you approve it.`,
};

type Channel = {
  label: string;
  value: string;
  note: string;
  href: string;
  external?: boolean;
};

const CHANNELS: Channel[] = [
  {
    label: "Call",
    value: CONTACT.phoneDisplay,
    note: "A direct line during working hours. If we are mid-build, WhatsApp gets the faster answer.",
    href: `tel:${CONTACT.phoneE164}`,
  },
  {
    label: "Email",
    value: CONTACT.email,
    note: "Best for longer briefs, documents, or an existing codebase you want assessed.",
    href: `mailto:${CONTACT.email}`,
  },
  {
    label: "Inquiry form",
    value: CONTACT.formUrl.replace("https://", ""),
    note: "A structured brief, if you prefer writing it all down first. Opens in a new tab.",
    href: CONTACT.formUrl,
    external: true,
  },
];

const STEPS = [
  {
    title: "A 20-minute call about the idea.",
    detail: "What it does, who it is for, how it earns. No slides on either side.",
  },
  {
    title: "A written scope and a fixed date, within 48 hours.",
    detail: "Every screen, table, and API route on paper. The document is the contract.",
  },
  {
    title: "You sign. We start.",
    detail:
      "Nothing is due before you approve the scope. Day one is the next open slot on the calendar.",
  },
];

export default function ContactPage() {
  return (
    <>
      <header className="relative overflow-hidden pb-14 pt-36 md:pb-20 md:pt-44">
        <div className="grid-backdrop absolute inset-0" aria-hidden="true" />
        <div className="shell relative">
          <Reveal>
            <p className="daytag">Day 00</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-display mt-7 max-w-4xl">
              Talk to a human,
              <br />
              <span className="text-fg-muted">today.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-lead mt-8 max-w-2xl text-fg-muted">
              No form gauntlet, no sales sequence. The person who answers is the person who will
              scope your build.
            </p>
          </Reveal>
        </div>
      </header>

      <Section tight>
        <div className="shell">
          <Reveal>
            <div className="card rounded-2xl border-signal/30 p-8 md:p-12">
              <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
                <div>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-signal">
                    Fastest
                  </p>
                  <h2 className="text-h2 mt-4">WhatsApp</h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-fg-muted">
                    Replies in minutes during {CONTACT.hours}. Send the idea in whatever shape
                    it is in — voice notes welcome.
                  </p>
                </div>
                <ButtonLink href={whatsappLink()} size="lg">
                  <WhatsAppIcon />
                  Message us on WhatsApp
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {CHANNELS.map((channel, i) => (
              <Reveal key={channel.label} delay={80 + i * 80}>
                <a
                  href={channel.href}
                  {...(channel.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="card group flex h-full flex-col rounded-xl p-6 transition-colors duration-300 hover:border-signal/40"
                >
                  <span className="label">{channel.label}</span>
                  <span className="mt-4 font-mono text-[0.9375rem] text-fg transition-colors duration-300 group-hover:text-signal">
                    {channel.value}
                  </span>
                  <span className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">
                    {channel.note}
                  </span>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-fg-faint">
                    Open
                    <ArrowIcon className="size-3.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={320}>
            <p className="mt-10 text-center font-mono text-xs text-fg-faint">
              {CONTACT.hours} · {CONTACT.location}
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tight className="bg-surface/30">
        <div className="shell grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeading
              label="What happens next"
              title="Three steps between here and day one."
              lead="No discovery phase, no proposal theatre. The call decides whether the fixed price fits; the document decides everything else."
            />
          </Reveal>

          <Reveal delay={120} y={32}>
            <ol className="mono-panel rounded-xl p-6 text-[0.8125rem] md:p-8">
              {STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className={`flex gap-5 ${
                    i > 0 ? "mt-6 border-t border-dashed border-line-strong pt-6" : ""
                  }`}
                >
                  <span className="text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1">
                    <span className="block text-fg">{step.title}</span>
                    <span className="mt-1.5 block leading-relaxed text-fg-muted">
                      {step.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
