import { STACK } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/reveal";
import { SceneCanvas } from "@/components/three/scene-canvas";
import { StackScene } from "@/components/three/stack-scene";

const LAYER_LEGEND = [
  ["APP", "React Native"],
  ["ADMIN", "React"],
  ["API", "Node.js"],
  ["DATA", "PostgreSQL"],
] as const;

export function Stack() {
  return (
    <Section className="bg-surface/30">
      <div className="shell grid items-center gap-14 lg:grid-cols-2">
        {/* The exploded stack */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative h-[24rem] md:h-[30rem]">
            <SceneCanvas
              className="absolute inset-0"
              camera={{ position: [3.4, 2.2, 5.6], fov: 40 }}
              fallback={<div className="grid-backdrop absolute inset-0" />}
            >
              <StackScene />
            </SceneCanvas>

            {/* Layer legend pinned to the scene */}
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fg-faint">
              {LAYER_LEGEND.map(([tag, tech]) => (
                <span key={tag} className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-signal">{tag}</span> {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <SectionHeading
              day="One stack"
              label="The machine"
              title="Boring technology. Deliberately."
              lead="Every build ships on the same four strata. Not because we can't do exotic — because a stack this proven is what makes thirty days honest, and what makes your product hireable-for later."
            />
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {STACK.map((item, i) => (
              <Reveal key={item.name} delay={i * 60}>
                <div className="card group rounded-lg p-4 transition-colors duration-300 hover:border-signal/40">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-base font-semibold">{item.name}</h3>
                    <span className="label !text-[0.5625rem]">{item.role}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-fg-muted">{item.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
