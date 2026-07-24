import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { CardArt, type ArtName } from '@/components/art';
import { InstallCmd } from '@/components/install-cmd';
import { BtnPrimary, BtnSecondary, CornerFrame, Eyebrow } from '@/components/ui-bits';

const pillars: {
  tick: string;
  art: ArtName;
  title: string;
  description: string;
  href: string;
}[] = [
  {
    tick: 'sense',
    art: 'perception',
    title: 'Perception',
    description:
      'Turn raw camera, lidar, and sensor streams into a structured understanding of objects, surfaces, and motion.',
    href: '/docs/concepts/perception',
  },
  {
    tick: 'remember',
    art: 'memory',
    title: 'Spatial memory',
    description:
      'A persistent map of places, things, and their relationships — so machines know where they are and what changed.',
    href: '/docs/concepts/spatial-memory',
  },
  {
    tick: 'reason',
    art: 'reasoning',
    title: 'Real-time reasoning',
    description:
      'Plan and act on live perception and memory with latency budgets that hold up on real hardware.',
    href: '/docs/concepts/reasoning',
  },
];

export default function HomePage() {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden">
      {/* engineering grid backdrop, faded */}
      <div
        aria-hidden
        className="bg-grid mask-radial pointer-events-none absolute inset-0 -z-10 opacity-70"
      />

      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
        <div className="animate-hero-rise" style={{ animationDelay: '0.05s' }}>
          <Eyebrow index="00">openhorizon documentation</Eyebrow>
        </div>

        <h1
          className="heading-1 animate-hero-rise mt-6 max-w-4xl"
          style={{ animationDelay: '0.1s' }}
        >
          Learn to give machines a <span className="serif-italic">mind</span> for the real world.
        </h1>

        <p
          className="large animate-hero-rise mt-6 max-w-2xl text-fd-muted-foreground"
          style={{ animationDelay: '0.15s' }}
        >
          Everything you need to build with OpenHorizon — perception, spatial memory, and real-time
          reasoning, from first install to production deployment.
        </p>

        <div
          className="animate-hero-rise mt-9 flex flex-wrap items-center gap-3"
          style={{ animationDelay: '0.2s' }}
        >
          <BtnPrimary href="/docs/quickstart">Get started</BtnPrimary>
          <BtnSecondary href="/docs">Browse the docs</BtnSecondary>
        </div>

        <div className="animate-hero-rise mt-5" style={{ animationDelay: '0.25s' }}>
          <InstallCmd />
        </div>

        {/* the cognition loop, three-up hairline row */}
        <div className="animate-hero-rise" style={{ animationDelay: '0.3s' }}>
          <CornerFrame tabs={['RT', '< 50MS', 'EDGE']} className="mt-14">
            <div className="grid gap-px overflow-hidden border border-fd-border bg-fd-border sm:grid-cols-3">
              {pillars.map((pillar) => (
                <Link
                  key={pillar.tick}
                  href={pillar.href}
                  className="group flex flex-col bg-fd-background no-underline"
                >
                  <CardArt name={pillar.art} className="aspect-[2/1] w-full" />
                  <div className="flex flex-1 flex-col p-5">
                    <p className="tick text-fd-muted-foreground">{pillar.tick}</p>
                    <h3 className="heading-6 mt-2 pr-6 text-fd-foreground">
                      {pillar.title}
                      <ChevronRight
                        className="ml-0.5 inline-block size-[20px] translate-y-px text-fd-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-fd-foreground"
                        aria-hidden
                      />
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-fd-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CornerFrame>
        </div>

        <p className="tick mt-10 text-center text-fd-muted-foreground">
          sense → remember → reason — the loop every openhorizon machine runs
        </p>
      </div>
    </main>
  );
}
