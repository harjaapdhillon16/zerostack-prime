import { CONTACT, OFFER, whatsappLink } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { ButtonLink, WhatsAppIcon } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      {/* Pastel field, echoing the hero's light language. */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(118deg, #fff3dd 0%, #f7f8fa 40%, #e5eff8 68%, #ddfaf1 100%)",
        }}
      />
      <div className="grid-backdrop absolute inset-0" aria-hidden="true" />

      <div className="shell relative z-10 text-center">
        <Reveal>
          <p className="daytag">Day 31 · yours</p>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="text-display mx-auto mt-7 max-w-4xl">
            The next {OFFER.days} days
            <br />
            <span className="text-fg-muted">will pass either way.</span>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="text-lead mx-auto mt-8 max-w-xl text-fg-muted">
            On the other side of them you can have the same idea you have today — or an app
            in the stores, an admin panel on your laptop, and a repository with your name on it.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href={whatsappLink()} size="lg">
              <WhatsAppIcon />
              WhatsApp us — a reply in minutes
            </ButtonLink>
            <ButtonLink href={`tel:${CONTACT.phoneE164}`} variant="ghost" size="lg">
              or call {CONTACT.phoneDisplay}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-10 text-xs font-medium text-fg-faint">
            {CONTACT.hours} · limited slots per month · the reply is a human
          </p>
        </Reveal>
      </div>
    </section>
  );
}
