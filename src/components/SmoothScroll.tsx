"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

// html { scroll-padding-top } already reserves room for the fixed header; Lenis honours it.
const HEADER_OFFSET = 0;

/** Same inertia as the reference site: Lenis, duration 1.2 with an exponential ease-out. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
    });
    window.__lenis = lenis;

    // Same-page anchor links glide instead of jumping. Capture phase + preventDefault
    // runs before next/link, which then skips its own (instant) hash navigation.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!link || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const url = new URL(link.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const target = document.querySelector(decodeURIComponent(url.hash));
      if (!target) return;
      e.preventDefault();
      // Links in the full-screen menu fire while Lenis is paused (menu open): wait for it to close.
      const go = () => lenis.scrollTo(target as HTMLElement, { offset: HEADER_OFFSET, force: true });
      if (lenis.isStopped) setTimeout(go, 60);
      else go();
      history.replaceState(null, "", url.search + url.hash);
      window.dispatchEvent(new Event("cj:locationchange"));
    };
    document.addEventListener("click", onClick, true);

    // Arriving from another page with a hash.
    if (location.hash) {
      const target = document.querySelector(decodeURIComponent(location.hash));
      if (target) setTimeout(() => lenis.scrollTo(target as HTMLElement, { offset: HEADER_OFFSET, immediate: true }), 50);
    }

    return () => {
      document.removeEventListener("click", onClick, true);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
