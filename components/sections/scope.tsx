import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { Terminal } from "@/components/terminal";

export function Scope() {
  return (
    <Section>
      <div className="shell grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Reveal>
            <SectionHeading
              day="Discovery · 3–4 days"
              label="Consulting & scope"
              title={
                <>
                  It starts with a document,
                  <br />
                  not a demo.
                </>
              }
              lead="Three to four days of discovery before the clock starts: we dig into the business, consult on the right build, and write every screen, table, and endpoint into a scope you sign. That document fixes your quote — and your date."
            />
          </Reveal>

          <Reveal delay={120}>
            <ul className="mt-10 space-y-4">
              {[
                ["Business deep-dive and solution consulting, before any payment", "01"],
                ["Screens, schema, and API surface — enumerated, not implied", "02"],
                ["A fixed quote (₹50,000–₹1,00,000) and a date you can put in a calendar", "03"],
              ].map(([text, n]) => (
                <li key={n} className="flex gap-4">
                  <span className="daytag mt-0.5 shrink-0">{n}</span>
                  <span className="text-[0.9575rem] leading-relaxed text-fg-muted">{text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={100} y={32}>
          <Terminal />
        </Reveal>
      </div>
    </Section>
  );
}
