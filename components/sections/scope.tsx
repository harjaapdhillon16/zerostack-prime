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
              day="Day 01–03"
              label="Scope lock"
              title={
                <>
                  It starts with a document,
                  <br />
                  not a demo.
                </>
              }
              lead="Before a line of code exists, every screen, table, and endpoint is written down and priced into the fixed fee. You sign it; we build exactly it. That document is why the price holds and the date holds."
            />
          </Reveal>

          <Reveal delay={120}>
            <ul className="mt-10 space-y-4">
              {[
                ["Screens, schema, and API surface — enumerated, not implied", "01"],
                ["A fixed delivery date you can put in a calendar", "02"],
                ["Change requests go to a follow-on sprint, never into your date", "03"],
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
