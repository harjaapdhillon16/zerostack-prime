import { BRAND } from "@/lib/site";

/**
 * The mark: a progress bar filling left to right in three ticks — a sprint,
 * mid-execution. Inline SVG so it inherits currentColor and costs no request.
 */
export function LogoMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="10" width="24" height="8" rx="1.5" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
      <rect x="5" y="13" width="6" height="2" rx="0.5" fill="currentColor" />
      <rect x="12.5" y="13" width="6" height="2" rx="0.5" fill="currentColor" opacity="0.6" />
      <rect x="20" y="13" width="3" height="2" rx="0.5" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="size-7 text-signal" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.0625rem] font-semibold tracking-tight text-fg">
          {BRAND.name}
        </span>
        <span className="mt-1 whitespace-nowrap text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-fg-faint">
          by {BRAND.parent}
        </span>
      </span>
    </span>
  );
}
