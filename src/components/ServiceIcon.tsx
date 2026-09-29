const paths: Record<string, React.ReactNode> = {
  design: (
    <>
      <path d="M8 40 30 18l6 6-22 22H8z" />
      <path d="m27 21 6 6M34 14l4-4 6 6-4 4" />
      <circle cx="14" cy="14" r="5" />
    </>
  ),
  web: (
    <>
      <rect x="5" y="9" width="38" height="26" rx="3" />
      <path d="M5 16h38M17 42h14M24 35v7" />
      <path d="m19 22-4 4 4 4M29 22l4 4-4 4" />
    </>
  ),
  mobile: (
    <>
      <rect x="14" y="4" width="20" height="40" rx="4" />
      <path d="M21 9h6M22 39h4" />
      <rect x="18" y="15" width="12" height="9" rx="1.5" />
      <path d="M18 29h12M18 33h8" />
    </>
  ),
  ai: (
    <>
      <path d="M24 6v6M24 36v6M6 24h6M36 24h6" />
      <rect x="12" y="12" width="24" height="24" rx="5" />
      <path d="m20 30 4-12 4 12M21.5 26h5" />
    </>
  ),
  cloud: (
    <>
      <path d="M14 34a8 8 0 0 1-1-15.9A11 11 0 0 1 34 16a9 9 0 0 1 1 18z" />
      <path d="M24 26v14M19 35l5 5 5-5" />
    </>
  ),
  evolve: (
    <>
      <path d="M6 38 18 26l8 8 16-18" />
      <path d="M32 16h10v10" />
      <path d="M6 44h36" />
    </>
  ),
};

/** Line icon over a soft highlighter blob, echoing the hero marker. */
export function ServiceIcon({ name }: { name: string }) {
  return (
    <span className="relative inline-block size-14" aria-hidden>
      <span className="absolute top-5 -left-1 h-6 w-12 -rotate-6 rounded-full bg-marker/80" />
      <svg
        viewBox="0 0 48 48"
        className="relative size-14 text-ink"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths[name]}
      </svg>
    </span>
  );
}
