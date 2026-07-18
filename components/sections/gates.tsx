import { GATES } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";

export function QualityGates() {
  return (
    <Section>
      <div className="shell">
        <Reveal>
          <SectionHeading
            day="Day 21–26"
            label="Quality gates"
            title={
              <>
                Fast is easy.
                <br />
                Fast <em className="not-italic text-signal">and checked</em> is the product.
              </>
            }
            lead="Four gates stand between generated code and your repository. None of them can be argued with, including by us."
          />
        </Reveal>

        <div className="mt-14 divide-y divide-line border-y border-line">
          {GATES.map((gate, i) => (
            <Reveal key={gate.n} delay={i * 70}>
              <div className="group grid gap-4 py-8 md:grid-cols-[8rem_1fr_auto] md:items-baseline md:gap-10">
                <span className="numerals text-4xl text-fg-faint transition-colors duration-300 group-hover:text-signal md:text-5xl">
                  {gate.n}
                </span>
                <div>
                  <h3 className="text-h3">{gate.title}</h3>
                  <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-fg-muted">
                    {gate.body}
                  </p>
                </div>
                <span className="hidden text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-signal md:block">
                  gate · pass required
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
