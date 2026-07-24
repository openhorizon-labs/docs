import { cn } from '@/lib/cn';

/* Card diagrams — miniature versions of the site's live "terminal" panels:
   dark surface-ink windows with mono chrome, viz-palette signals, and pure-CSS
   motion. One per pillar of the cognition loop, plus a quickstart terminal. */

function Panel({
  file,
  status,
  statusColor,
  children,
}: {
  file: string;
  status: string;
  statusColor: string;
  children: React.ReactNode;
}) {
  return (
    // leading-normal resets the docs prose line-height (28px) that would
    // otherwise inherit in and inflate the mono readouts
    <div className="surface-ink flex h-full w-full flex-col overflow-hidden text-left leading-normal">
      {/* window chrome */}
      <div className="flex shrink-0 items-center justify-between border-b border-fd-border px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 border border-fd-border" />
          <span className="size-1.5 border border-fd-border" />
          <span className="size-1.5 border border-fd-border" />
          <span className="ml-1.5 font-mono text-[9px] text-fd-muted-foreground">{file}</span>
        </div>
        <span
          className="flex items-center gap-1 font-mono text-[9px]"
          style={{ color: statusColor }}
        >
          <span
            className="animate-grid-cell inline-block size-1 rounded-full"
            style={{ background: statusColor }}
          />
          {status}
        </span>
      </div>
      <div className="bg-dots flex min-h-0 flex-1 flex-col justify-center gap-2 p-3.5">
        {children}
      </div>
    </div>
  );
}

const SENSORS = ['LIDAR', 'RGB-D', 'RADAR', 'IMU'] as const;

function PerceptionPanel() {
  return (
    <Panel file="perception.rt" status="live" statusColor="var(--viz-sky)">
      {SENSORS.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <span className="w-11 shrink-0 font-mono text-[9px] text-fd-muted-foreground">{s}</span>
          <span className="flex h-1.5 flex-1 items-center gap-[3px] overflow-hidden">
            {Array.from({ length: 22 }).map((_, j) => (
              <span
                key={j}
                className="animate-lane h-full w-[3px] shrink-0 bg-[var(--viz-sky)]"
                style={{ animationDelay: `${(i * 0.12 + j * 0.05).toFixed(2)}s` }}
              />
            ))}
          </span>
        </div>
      ))}
      <p className="mt-1 font-mono text-[9px] text-fd-muted-foreground">
        <span className="text-[var(--viz-sky)]">▸</span> 6 streams fused · 11.4ms
      </p>
    </Panel>
  );
}

function MemoryPanel() {
  /* a world-model occupancy grid — cells blink as observations commit */
  const lit: Record<number, string> = {
    5: 'var(--viz-violet)',
    12: 'var(--viz-violet)',
    18: 'var(--viz-emerald)',
    25: 'var(--viz-violet)',
    31: 'var(--viz-sky)',
    38: 'var(--viz-violet)',
    44: 'var(--viz-emerald)',
    51: 'var(--viz-violet)',
  };
  return (
    <Panel file="world_model.db" status="Δ commit" statusColor="var(--viz-violet)">
      <div className="grid grid-cols-14 gap-[3px]">
        {Array.from({ length: 56 }).map((_, i) => (
          <span
            key={i}
            className={cn('aspect-square w-full', lit[i] && 'animate-grid-cell')}
            style={{
              background: lit[i] ?? 'oklch(1 0 0 / 0.06)',
              animationDelay: lit[i] ? `${((i % 7) * 0.35).toFixed(2)}s` : undefined,
            }}
          />
        ))}
      </div>
      <p className="mt-1 font-mono text-[9px] text-fd-muted-foreground">
        <span className="text-[var(--viz-violet)]">▸</span> 3,214 objects · aisle_03 Δ committed
      </p>
    </Panel>
  );
}

function ReasoningPanel() {
  const TRACE = [
    { t: 'predict', v: '4 intents · 3.1ms', c: 'var(--viz-amber)' },
    { t: 'plan', v: '3 scored · best 0.92', c: 'var(--viz-amber)' },
    { t: 'act', v: 'trajectory dispatched', c: 'var(--viz-emerald)' },
  ] as const;
  return (
    <Panel file="planner.rt" status="policy ok" statusColor="var(--viz-amber)">
      <div className="space-y-1.5">
        {TRACE.map((e, i) => (
          <div
            key={e.t}
            className="exec-line flex items-baseline gap-2"
            style={{ animationDelay: `${i * 0.32}s` }}
          >
            <span className="font-mono text-[10px]" style={{ color: e.c }}>
              ▸ {e.t}
            </span>
            <span className="font-mono text-[10px] text-fd-muted-foreground">{e.v}</span>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <div className="mb-1 flex items-center justify-between font-mono text-[9px] text-fd-muted-foreground">
          <span>perceive → act latency</span>
          <span className="text-fd-foreground">11.4 ms</span>
        </div>
        <div className="h-1 w-full overflow-hidden bg-white/[0.06]">
          <div
            className="animate-meter h-full bg-gradient-to-r from-[var(--viz-sky)] via-[var(--viz-violet)] to-[var(--viz-emerald)]"
            style={{ ['--meter-target' as string]: '23%' }}
          />
        </div>
      </div>
    </Panel>
  );
}

function QuickstartPanel() {
  return (
    <Panel file="getting_started.sh" status="ready" statusColor="var(--viz-emerald)">
      <div className="space-y-1.5 font-mono text-[11px]">
        <p className="text-fd-muted-foreground">
          <span className="text-[var(--brand)]">$</span> pip install openhorizon
        </p>
        <p className="exec-line text-fd-muted-foreground" style={{ animationDelay: '0.4s' }}>
          <span className="text-[var(--viz-emerald)]">✓</span> openhorizon 0.1.0 installed
        </p>
        <p className="flex items-center gap-1 text-fd-foreground">
          <span className="text-[var(--brand)]">$</span> openhorizon run demo
          <span className="animate-caret inline-block h-[12px] w-[6px] bg-fd-foreground" />
        </p>
      </div>
    </Panel>
  );
}

export type ArtName = 'perception' | 'memory' | 'reasoning' | 'quickstart';

const artMap = {
  perception: PerceptionPanel,
  memory: MemoryPanel,
  reasoning: ReasoningPanel,
  quickstart: QuickstartPanel,
} satisfies Record<ArtName, () => React.ReactNode>;

export function CardArt({ name, className }: { name: ArtName; className?: string }) {
  const Art = artMap[name];
  return (
    <div className={cn('border-b border-fd-border', className)}>
      <Art />
    </div>
  );
}
