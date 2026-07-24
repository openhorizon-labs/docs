import { cn } from '@/lib/cn';

/** OpenHorizon mark — two pinched diagonals with flaring wings (a stylized
 *  "//"). Uses currentColor so callers tint it (emerald brand by default). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-[var(--brand)]', className)}
      role="img"
      aria-label="OpenHorizon"
    >
      <g stroke="currentColor" strokeWidth={5.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M34 13 L18 46" />
        <path d="M6 35 Q22 35 27 28" />
        <path d="M46 18 L30 51" />
        <path d="M58 29 Q42 29 37 36" />
      </g>
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark className="size-6" />
      <span className="font-serif text-[19px] font-medium leading-none tracking-[-0.01em]">
        OpenHorizon
      </span>
      <span className="tick border border-fd-border px-1.5 py-0.5 text-fd-muted-foreground">
        docs
      </span>
    </span>
  );
}
