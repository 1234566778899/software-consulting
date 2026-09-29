"use client";

import Image from "next/image";
import { useState } from "react";
import { VideoDialog } from "./VideoDialog";

type Props = {
  name: string;
  category: string;
  poster: string;
  video: string;
  viewLabel: string;
  url?: string;
  visitLabel: string;
  badge?: string;
  closeLabel: string;
  sizes: string;
  className?: string;
};

export function ProjectTile({ name, category, poster, video, viewLabel, url, visitLabel, badge, closeLabel, sizes, className = "" }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative block w-full overflow-hidden bg-night text-left focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-wine ${className}`}
        aria-label={`${name} — ${viewLabel}`}
      >
        <Image
          src={poster}
          alt=""
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-night/75 via-night/10 to-transparent" aria-hidden />
        {badge && (
          <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs text-ink backdrop-blur">
            {badge}
          </span>
        )}
        <span className="absolute top-4 right-4 flex -translate-y-1 items-center gap-2 rounded-full bg-wine px-4 py-2 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <svg viewBox="0 0 16 16" className="size-3" fill="currentColor" aria-hidden>
            <path d="M4 2.5v11l9-5.5z" />
          </svg>
          {viewLabel}
        </span>
        <span className="absolute inset-x-0 bottom-0 p-5 md:p-7">
          <span className="block font-serif text-3xl text-white md:text-4xl">{name}</span>
          <span className="mt-1 block text-sm text-white/75">{category}</span>
        </span>
      </button>
      <VideoDialog open={open} onClose={() => setOpen(false)} src={video} poster={poster} title={name} closeLabel={closeLabel} url={url} visitLabel={visitLabel} />
    </>
  );
}
