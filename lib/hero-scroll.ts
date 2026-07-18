/**
 * Shared scroll state for the pinned hero.
 *
 * The hero section's rAF driver writes progress here; the WebGL scene reads it
 * inside its own frame loop. A module singleton avoids threading refs through
 * the R3F canvas boundary and avoids React re-renders at scroll frequency.
 */
export const heroScroll = { p: 0 };

// Debug handle for driving/inspecting the scrub from the console.
if (typeof window !== "undefined") {
  (window as unknown as { __heroScroll: typeof heroScroll }).__heroScroll = heroScroll;
}
