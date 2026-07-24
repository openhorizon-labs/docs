import Link from 'next/link';
import { cn } from '@/lib/cn';
import { CardArt, type ArtName } from './art';
import { BtnPrimary, BtnSecondary, Eyebrow } from './ui-bits';

/* Building blocks for the docs Overview page — house-style hero and
   illustrated cards, all outside the prose styles. */

export function DocsHero({
  eyebrow,
  title,
  accent,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="not-prose mb-12 mt-2">
      <Eyebrow index="00">{eyebrow}</Eyebrow>
      <h1 className="heading-2 mt-5 max-w-3xl">
        {title} {accent ? <span className="serif-italic">{accent}</span> : null}
      </h1>
      <p className="large mt-5 max-w-2xl text-fd-muted-foreground">{subtitle}</p>
      {children ? <div className="mt-7 flex flex-wrap items-center gap-3">{children}</div> : null}
    </header>
  );
}

export function BtnLink({
  href,
  children,
  variant = 'secondary',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}) {
  const Cmp = variant === 'primary' ? BtnPrimary : BtnSecondary;
  const external = !href.startsWith('/');
  return (
    <Cmp href={href} external={external}>
      {children}
    </Cmp>
  );
}

export function HubGrid({ columns = 2, children }: { columns?: 2 | 3; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'not-prose grid gap-px overflow-hidden border border-fd-border bg-fd-border leading-normal',
        columns === 2 ? 'md:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3',
      )}
    >
      {children}
    </div>
  );
}

export function HubCard({
  href,
  art,
  tick,
  title,
  description,
}: {
  href: string;
  art: ArtName;
  tick?: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col bg-fd-background no-underline transition-colors hover:bg-fd-card"
    >
      <CardArt name={art} className="aspect-[2/1] w-full" />
      <div className="flex flex-1 flex-col p-5">
        {tick ? <span className="tick text-fd-muted-foreground">{tick}</span> : null}
        <span className="heading-6 mt-2 text-fd-foreground">{title}</span>
        <span className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">{description}</span>
      </div>
    </Link>
  );
}
