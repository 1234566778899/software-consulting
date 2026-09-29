"use client";

import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  src: string;
  poster: string;
  title: string;
  closeLabel: string;
  url?: string;
  visitLabel?: string;
};

/** Full-screen modal that plays a project video with native controls. */
export function VideoDialog({
  open,
  onClose,
  src,
  poster,
  title,
  closeLabel,
  url,
  visitLabel,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
      className="m-auto w-[min(92vw,1200px,calc((100dvh-7rem)*16/9))] max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-night/90 backdrop:backdrop-blur-sm"
      aria-label={title}
    >
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="truncate font-serif text-2xl text-white">{title}</p>
        <div className="flex shrink-0 items-center gap-2">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-wine px-4 py-1.5 text-sm text-white transition-colors hover:bg-wine-deep"
            >
              {visitLabel} ↗
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/30 px-4 py-1.5 text-sm text-white/90 transition-colors hover:bg-white hover:text-ink"
          >
            {closeLabel} <span aria-hidden>×</span>
          </button>
        </div>
      </div>
      {open && (
        <video
          className="aspect-video w-full rounded-2xl bg-black"
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
        />
      )}
    </dialog>
  );
}
