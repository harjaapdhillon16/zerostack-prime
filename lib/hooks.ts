"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True once the element has neared the viewport, and stays true.
 * Used to defer WebGL mounts and to fire reveal transitions exactly once.
 *
 * IntersectionObserver is the primary signal, but some embedded webviews
 * (WhatsApp / Instagram in-app browsers — a large share of this site's
 * audience) throttle or drop IO callbacks. A slow geometry poll backstops it
 * so content can never stay invisible: worst case, a reveal fires a beat late.
 */
export function useInView<T extends HTMLElement>(rootMargin = "250px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);

    // Backstop: a coarse rect check. The numeric margin only needs to roughly
    // match the IO rootMargin — precision is IO's job, this is the safety net.
    const margin = Number.parseInt(rootMargin, 10) || 0;
    const check = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + margin && rect.bottom > -margin) {
        setInView(true);
      }
    };
    const interval = window.setInterval(check, 700);
    const timeout = window.setTimeout(check, 120);

    return () => {
      observer.disconnect();
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [inView, rootMargin]);

  return { ref, inView };
}

/** Mirrors the OS "reduce motion" setting, live. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

export type DeviceTier = "unknown" | "low" | "high";

/**
 * Coarse capability guess used to scale particle counts and pixel ratio.
 * Deliberately crude — cores and memory are the only cheap synchronous
 * signals. A mid-range Android lands on "low" and gets a third of the
 * geometry, which is the difference between 60fps and a slideshow.
 */
export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("unknown");

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.innerWidth < 900;

    const weak = cores <= 4 || (memory !== undefined && memory <= 4) || (coarse && narrow);
    setTier(weak ? "low" : "high");
  }, []);

  return tier;
}

/** Scroll progress through an element: 0 as it enters, 1 as it leaves. */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const seen = window.innerHeight - rect.top;
      setProgress(Math.min(1, Math.max(0, seen / total)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}
