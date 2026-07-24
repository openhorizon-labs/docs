import Link from 'next/link';
import { cn } from '@/lib/cn';

/* House primitives ported from openhorizon.so — square corners, emerald
   primary, mono technical accents. */

export function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="kbd ml-2.5 -mr-1">{children}</kbd>;
}

export function BtnPrimary({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={cn(
        'group inline-flex h-11 items-center justify-center bg-fd-primary px-5 text-sm font-medium text-fd-primary-foreground no-underline transition-colors hover:bg-[color-mix(in_srgb,var(--color-fd-primary)_88%,black)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]',
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function BtnSecondary({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={cn(
        'group inline-flex h-11 items-center justify-center border border-[var(--border-strong)] bg-fd-card px-5 text-sm font-medium text-fd-foreground no-underline transition-colors hover:border-fd-foreground/40 hover:bg-fd-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fd-foreground',
        className,
      )}
    >
      {children}
    </Link>
  );
}

/** Code-comment eyebrow — `// 01 · label`. */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn('eyebrow flex items-center gap-1.5 lowercase', className)}>
      <span className="text-[var(--brand)]" aria-hidden>
        {'//'}
      </span>
      {index && <span className="text-fd-foreground/45">{index} ·</span>}
      <span>{children}</span>
    </p>
  );
}

/** Animated corner-HUD frame with optional protruding annotation tabs. */
export function CornerFrame({
  children,
  tabs,
  className,
}: {
  children: React.ReactNode;
  tabs?: string[];
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      <span
        className="hud-corner -left-1.5 -top-1.5 border-l border-t"
        style={{ animationDelay: '0.05s' }}
        aria-hidden
      />
      <span
        className="hud-corner -right-1.5 -top-1.5 border-r border-t"
        style={{ animationDelay: '0.12s' }}
        aria-hidden
      />
      <span
        className="hud-corner -bottom-1.5 -left-1.5 border-b border-l"
        style={{ animationDelay: '0.19s' }}
        aria-hidden
      />
      <span
        className="hud-corner -bottom-1.5 -right-1.5 border-b border-r"
        style={{ animationDelay: '0.45s' }}
        aria-hidden
      />
      {tabs && tabs.length > 0 && (
        <div className="absolute -right-px top-6 z-10 hidden translate-x-full flex-col gap-1.5 pl-1.5 xl:flex">
          {tabs.map((t) => (
            <span key={t} className="annot-tab">
              {t}
            </span>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
