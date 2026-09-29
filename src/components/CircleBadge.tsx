"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

/** Circular text that rotates as the page scrolls (scroll-linked, like the reference's motion effects). */
export function CircleBadge({
  text,
  children,
  size = 120,
  className = "",
}: {
  text: string;
  children: ReactNode;
  size?: number;
  className?: string;
}) {
  const id = useId();
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      el.style.transform = `rotate(${window.scrollY * -0.12}deg)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span className={`relative inline-grid place-items-center ${className}`} style={{ width: size, height: size }}>
      <svg ref={ref} viewBox="0 0 120 120" className="absolute inset-0 size-full will-change-transform" aria-hidden>
        <defs>
          <path id={id} d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
        </defs>
        <text className="fill-current font-serif" fontSize="10.5">
          <textPath href={`#${id}`} textLength="292" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="grid size-[58%] place-items-center rounded-full border border-current">{children}</span>
    </span>
  );
}
