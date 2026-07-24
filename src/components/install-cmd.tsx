'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

/** Copy-to-clipboard install command chip. */
export function InstallCmd({
  cmd = 'pip install openhorizon',
  className,
}: {
  cmd?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(cmd).then(
          () => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          },
          () => {},
        );
      }}
      className={cn(
        'group inline-flex cursor-pointer items-center gap-3 border border-[var(--border-strong)] bg-fd-card px-4 py-2.5 font-mono text-[13px] transition-colors hover:border-fd-foreground/40',
        className,
      )}
      aria-label={`Copy: ${cmd}`}
    >
      <span className="text-[var(--brand)]">$</span>
      <span className="text-fd-foreground">{cmd}</span>
      <span className="ml-1 text-[11px] uppercase tracking-widest text-fd-muted-foreground group-hover:text-fd-foreground">
        {copied ? 'copied' : 'copy'}
      </span>
    </button>
  );
}
