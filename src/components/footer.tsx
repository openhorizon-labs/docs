import Link from 'next/link';
import { LogoMark } from './logo';

/* Footer ported from openhorizon.so — "/ label" sections, legal bar, and the
   oversized emerald-hatched wordmark. */

const COLUMNS: { label: string; links: { label: string; href: string }[] }[] = [
  {
    label: 'docs',
    links: [
      { label: 'Overview', href: '/docs' },
      { label: 'Quickstart', href: '/docs/quickstart' },
      { label: 'Core concepts', href: '/docs/concepts/perception' },
    ],
  },
  {
    label: 'for machines',
    links: [
      { label: 'llms.txt', href: '/llms.txt' },
      { label: 'llms-full.txt', href: '/llms-full.txt' },
    ],
  },
  {
    label: 'company',
    links: [
      { label: 'openhorizon.so', href: 'https://openhorizon.so' },
      { label: 'Research', href: 'https://openhorizon.so/research' },
      { label: 'Blog', href: 'https://openhorizon.so/blogs' },
      { label: 'Contact', href: 'mailto:contact@openhorizon.so' },
    ],
  },
  {
    label: 'social',
    links: [
      { label: 'GitHub', href: 'https://github.com/openhorizon-labs' },
      { label: 'Twitter / X', href: 'https://x.com/OpenHorizonLabs' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/openhorizon-labs' },
    ],
  },
];

function FootLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow mb-5 flex items-center gap-1.5">
      <span className="text-[var(--brand)]" aria-hidden>
        /
      </span>
      {children}
    </p>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-fd-border">
      <div className="mx-auto max-w-6xl px-6 pt-16">
        {/* callout back to the platform these docs describe */}
        <div className="flex flex-col gap-4 border-b border-fd-border pb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <FootLabel>openhorizon</FootLabel>
            <p className="heading-3">Explore the runtime behind these docs.</p>
          </div>
          <Link
            href="https://openhorizon.so"
            className="group inline-flex items-center gap-1.5 font-mono text-sm text-fd-foreground"
          >
            openhorizon.so
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        {/* link columns */}
        <div className="grid grid-cols-2 gap-10 border-b border-fd-border py-12 sm:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.label}>
              <FootLabel>{col.label}</FootLabel>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="link-underline text-sm text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* brand + legal */}
        <div className="flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <LogoMark className="size-6" />
            <span className="font-serif text-[19px] font-medium leading-none tracking-[-0.01em]">
              OpenHorizon
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="font-mono text-xs text-fd-muted-foreground">
              © {new Date().getFullYear()} OpenHorizon Labs
            </span>
            <Link
              href="https://openhorizon.so/policy"
              className="text-xs text-fd-muted-foreground transition-colors hover:text-fd-foreground"
            >
              Policies
            </Link>
            <Link
              href="https://openhorizon.so"
              className="text-xs text-fd-muted-foreground transition-colors hover:text-fd-foreground"
            >
              openhorizon.so
            </Link>
          </div>
        </div>

        {/* oversized wordmark, filled with emerald hatch lines */}
        <svg
          aria-hidden
          viewBox="0 0 1200 196"
          preserveAspectRatio="xMidYMid meet"
          className="pointer-events-none block w-full select-none pb-2"
        >
          <defs>
            <pattern id="oh-hatch" width="10" height="9" patternUnits="userSpaceOnUse">
              <rect width="10" height="2.4" fill="var(--brand)" />
            </pattern>
          </defs>
          <text
            x="600"
            y="150"
            textAnchor="middle"
            textLength="1176"
            lengthAdjust="spacingAndGlyphs"
            fontFamily="var(--font-serif), Georgia, serif"
            fontWeight="500"
            fontSize="172"
            fill="url(#oh-hatch)"
          >
            OpenHorizon
          </text>
        </svg>
      </div>
    </footer>
  );
}
