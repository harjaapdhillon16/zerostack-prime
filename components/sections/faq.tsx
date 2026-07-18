import { FAQ } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";

export function Faq() {
  return (
    <Section id="faq">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Reveal>
              <SectionHeading
                day="Any day"
                label="Questions"
                title="Asked, answered, in writing."
                lead="The same questions come up on every first call. Here they are with the answers we give — including the uncomfortable ones."
              />
            </Reveal>
          </div>

          <div className="divide-y divide-line border-y border-line">
            {FAQ.map((item, i) => (
              <Reveal key={item.q} delay={Math.min(i * 40, 240)}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                    <span className="flex gap-4">
                      <span className="daytag mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display text-lg font-medium leading-snug text-fg transition-colors duration-200 group-hover:text-signal">
                        {item.q}
                      </span>
                    </span>
                    <span
                      className="relative mt-1 block size-4 shrink-0 text-fg-faint transition-transform duration-300 [transition-timing-function:var(--ease-out-quint)] group-open:rotate-45"
                      aria-hidden="true"
                    >
                      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
                      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                    </span>
                  </summary>
                  <p className="pb-7 pl-11 pr-10 text-[0.9375rem] leading-relaxed text-fg-muted">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
