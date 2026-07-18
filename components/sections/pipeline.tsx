import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { SceneCanvas } from "@/components/three/scene-canvas";
import { PipelineScene } from "@/components/three/pipeline-scene";

const GATES = [
  {
    code: "ai.generate()",
    color: "text-signal",
    title: "AI writes the volume",
    body: "CRUD, forms, types, migrations, test scaffolding — the repetitive mass of an application, produced at machine speed.",
  },
  {
    code: "engineer.review()",
    color: "text-amber",
    title: "Engineers reject the rest",
    body: "Every line is read by a human before merge. The red packets falling off the line are AI output that didn't survive review — you never see them.",
  },
  {
    code: "ci.test()",
    color: "text-fg",
    title: "CI gates every commit",
    body: "Type checks, unit tests, integration tests. A red build cannot deploy — including when we're the ones in a hurry.",
  },
];

export function Pipeline() {
  return (
    <Section className="overflow-hidden">
      <div className="shell">
        <Reveal>
          <SectionHeading
            day="Day 04–20"
            label="The line"
            align="center"
            title={
              <>
                Frontier AI throughput.
                <br />
                Engineering judgement.
              </>
            }
            lead="This is the machine that makes ₹50,000 in 30 days possible — and the reason it doesn't produce ₹50,000-in-30-days quality."
          />
        </Reveal>
      </div>

      {/* The pipeline, full-bleed */}
      <Reveal delay={100}>
        <div className="relative mt-4 h-[26rem] md:h-[30rem]">
          <SceneCanvas
            className="absolute inset-0"
            camera={{ position: [0, 0.4, 7.6], fov: 40 }}
            fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-signal/50 to-transparent" />
              </div>
            }
          >
            <PipelineScene />
          </SceneCanvas>
          {/* Edge fades so the line runs off-frame */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
        </div>
      </Reveal>

      <div className="shell">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
          {GATES.map((gate, i) => (
            <Reveal key={gate.code} delay={i * 90}>
              <div className="border-t border-line pt-6">
                <p className={`font-mono text-sm ${gate.color}`}>{gate.code}</p>
                <h3 className="text-h3 mt-3">{gate.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">{gate.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
