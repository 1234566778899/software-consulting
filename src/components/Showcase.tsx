"use client";

import { useEffect, useRef, useState } from "react";
import { VideoDialog } from "./VideoDialog";

type Props = {
  poster: string;
  video: string;
  label: string;
  cta: string;
  closeLabel: string;
  url?: string;
  visitLabel?: string;
};

/** Muted looping preview that plays only while visible, with a full video dialog. */
export function Showcase({ poster, video, label, cta, closeLabel, url, visitLabel }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? el.play().catch(() => {}) : el.pause()),
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (open) ref.current?.pause();
  }, [open]);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-night-2 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.7)]">
        <div className="flex h-10 items-center gap-2 border-b border-white/10 px-4">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 truncate text-xs text-white/40">{label}</span>
        </div>
        <div className="relative aspect-video">
          <video
            ref={ref}
            className="absolute inset-0 size-full object-cover"
            src={video}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            tabIndex={-1}
          />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group absolute inset-0 grid place-items-center bg-night/0 transition-colors hover:bg-night/30 focus-visible:bg-night/30 focus-visible:outline-none"
          >
            <span className="flex items-center gap-3 rounded-full bg-wine py-2 pr-6 pl-2 font-medium text-white shadow-lg transition-transform group-hover:scale-105">
              <span className="grid size-10 place-items-center rounded-full bg-white text-wine">
                <svg viewBox="0 0 16 16" className="ml-0.5 size-3.5" fill="currentColor" aria-hidden>
                  <path d="M4 2.5v11l9-5.5z" />
                </svg>
              </span>
              {cta}
            </span>
          </button>
        </div>
      </div>
      <VideoDialog open={open} onClose={() => setOpen(false)} src={video} poster={poster} title={label} closeLabel={closeLabel} url={url} visitLabel={visitLabel} />
    </>
  );
}
