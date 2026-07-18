import { DELIVERABLES } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";

export function Ships() {
  return (
    <Section id="ships" className="bg-surface/30">
      <div className="shell">
        <Reveal>
          <SectionHeading
            day="Day 30"
            label="What ships"
            title="Not a prototype. The whole apparatus."
            lead="Day 30 hands over a running business system — the app your users touch, the panel you run it from, and the infrastructure both stand on."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DELIVERABLES.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <article className="card group relative h-full overflow-hidden rounded-xl p-6 transition-all duration-300 hover:border-signal/40">
                {/* Index tick */}
                <div className="flex items-center justify-between">
                  <span className="text-[0.6875rem] font-semibold text-fg-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="label !text-[0.5625rem] rounded border border-line px-2 py-1 transition-colors duration-300 group-hover:border-signal/40 group-hover:text-signal">
                    {item.meta}
                  </span>
                </div>
                <h3 className="text-h3 mt-5">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
