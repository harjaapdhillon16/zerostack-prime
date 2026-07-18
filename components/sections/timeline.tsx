"use client";

import { TIMELINE } from "@/lib/site";
import { useScrollProgress } from "@/lib/hooks";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";

/**
 * The 30-day track. A day ruler runs across the top with an amber playhead
 * driven by scroll — reading the section *is* scrubbing through the sprint.
 */
export function Timeline() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  // Map raw section progress onto the ruler with a little headroom either side.
  const played = Math.min(1, Math.max(0, progress * 1.45 - 0.18));

  return (
    <Section id="timeline">
      <div className="shell" ref={ref}>
        <Reveal>
          <SectionHeading
            day="Discovery + 30 days"
            label="The schedule"
            title="Every day, accounted for."
            lead="A 3–4 day discovery fixes the scope and the quote. Then the clock starts: the product is finished by day 20, and days 21–30 carry it through App Store and Play Store review to launch."
          />
        </Reveal>

        {/* Ruler */}
        <Reveal delay={100}>
          <div className="relative mt-14 select-none" aria-hidden="true">
            <div className="flex items-end justify-between">
              {Array.from({ length: 31 }, (_, day) => (
                <div key={day} className="flex flex-col items-center gap-2">
                  {day % 5 === 0 ? (
                    <span className="font-mono text-[0.625rem] text-fg-faint">
                      {String(day).padStart(2, "0")}
                    </span>
                  ) : null}
                  <span
                    className={`w-px ${day % 5 === 0 ? "h-4 bg-line-strong" : "h-2 bg-line"} ${
                      day / 30 <= played ? "!bg-amber/70" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
            {/* Track + playhead */}
            <div className="relative mt-1 h-px w-full bg-line">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber/20 to-amber"
                style={{ width: `${played * 100}%` }}
              />
              <div
                className="absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-amber shadow-sm"
                style={{ left: `calc(${played * 100}% - 5px)` }}
              />
            </div>
          </div>
        </Reveal>

        {/* Phases */}
        <div className="mt-14 grid gap-4 lg:grid-cols-5">
          {TIMELINE.map((phase, i) => (
            <Reveal key={phase.title} delay={i * 70}>
              <article className="card group flex h-full flex-col rounded-xl p-5 transition-colors duration-300 hover:border-signal/40">
                <p className="daytag">{phase.phase}</p>
                <h3 className="text-h3 mt-3">{phase.title}</h3>
                <p className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-fg-faint">
                  {phase.kicker}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted">{phase.body}</p>
                <ul className="mt-5 space-y-1.5 border-t border-line pt-4">
                  {phase.outputs.map((output) => (
                    <li key={output} className="flex items-center gap-2 font-mono text-[0.6875rem] text-fg-faint">
                      <span className="text-signal">✓</span>
                      {output}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
