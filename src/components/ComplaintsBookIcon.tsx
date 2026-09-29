/** Open-book pictogram used for the Complaints Book notice (Anexo III, D.S. 011-2011-PCM). */
export function ComplaintsBookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden>
      <path d="M24 12c-4-3-10-4-18-3v27c8-1 14 0 18 3 4-3 10-4 18-3V9c-8-1-14 0-18 3z" />
      <path d="M24 12v27M11 17c3 0 6 .6 8 1.6M11 23c3 0 6 .6 8 1.6M29 18.6c2-1 5-1.6 8-1.6M29 24.6c2-1 5-1.6 8-1.6" />
    </svg>
  );
}
