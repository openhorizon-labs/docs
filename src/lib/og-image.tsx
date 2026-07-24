import { ImageResponse } from 'next/og';

/* Branded Open Graph renderer, ported from openhorizon.so — kraft canvas with
 * an engineering grid, emerald corner-HUD brackets, the // watermark, a mono
 * eyebrow, and a Newsreader serif headline. */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const KRAFT = '#f0eee6';
const INK = '#181613';
const MUTED = '#6b675e';
const BRAND = '#0c8457';
const LINE = 'rgba(24,22,19,0.12)';

/** Fetch a TTF from Google Fonts, subset to the glyphs we actually render so
 *  the OG bundle stays well under the 500KB Satori limit. No User-Agent →
 *  Google serves truetype, which Satori can parse. */
async function loadFont(query: string, text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${query}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((https:\/\/[^)]+)\) format\('(?:truetype|opentype)'\)/);
  if (!src) throw new Error(`OG font load failed: ${query}`);
  return (await fetch(src[1])).arrayBuffer();
}

export async function docsOgImage({
  title,
  kicker,
  label = 'DOCS',
}: {
  title: string;
  kicker: string;
  /** Corner/footer category, e.g. "DOCS". */
  label?: string;
}): Promise<ImageResponse> {
  const kickerUpper = kicker.toUpperCase();

  const serifText = title + 'OpenHorizon';
  const monoText =
    `${kickerUpper}${label}// openhorizon.so ABCDEFGHIJKLMNOPQRSTUVWXYZ ` +
    'abcdefghijklmnopqrstuvwxyz0123456789·—–.,:';

  const [serif, mono] = await Promise.all([
    loadFont('Newsreader:wght@500', serifText),
    loadFont('JetBrains+Mono:wght@500', monoText),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          backgroundColor: KRAFT,
          backgroundImage:
            'linear-gradient(rgba(24,22,19,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(24,22,19,0.045) 1px, transparent 1px)',
          backgroundSize: '90px 90px',
          padding: '64px 80px',
          fontFamily: 'JetBrains Mono',
        }}
      >
        {/* corner-HUD brackets — build each style with only defined props;
            Satori calls .trim() on style values, so undefined would crash it. */}
        {(
          [
            ['top', 'left'],
            ['top', 'right'],
            ['bottom', 'left'],
            ['bottom', 'right'],
          ] as const
        ).map(([v, h], i) => {
          const bracket = `3px solid ${BRAND}`;
          const style: Record<string, string | number> = {
            position: 'absolute',
            width: 26,
            height: 26,
            [v]: 34,
            [h]: 34,
            [v === 'top' ? 'borderTop' : 'borderBottom']: bracket,
            [h === 'left' ? 'borderLeft' : 'borderRight']: bracket,
          };
          return <div key={i} style={style} />;
        })}

        {/* large // watermark, right */}
        <svg
          width="520"
          height="520"
          viewBox="0 0 64 64"
          fill="none"
          style={{ position: 'absolute', top: 70, right: -40, opacity: 0.12 }}
        >
          <g stroke={BRAND} strokeWidth={5.6} strokeLinecap="round" strokeLinejoin="round">
            <path d="M34 13 L18 46" />
            <path d="M6 35 Q22 35 27 28" />
            <path d="M46 18 L30 51" />
            <path d="M58 29 Q42 29 37 36" />
          </g>
        </svg>

        {/* wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
            <g stroke={BRAND} strokeWidth={5.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M34 13 L18 46" />
              <path d="M6 35 Q22 35 27 28" />
              <path d="M46 18 L30 51" />
              <path d="M58 29 Q42 29 37 36" />
            </g>
          </svg>
          <span
            style={{
              fontFamily: 'Newsreader',
              fontSize: 32,
              fontWeight: 500,
              letterSpacing: -0.3,
              color: INK,
            }}
          >
            OpenHorizon
          </span>
        </div>

        {/* main block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
        >
          {/* eyebrow */}
          <div
            style={{
              display: 'flex',
              fontSize: 21,
              fontWeight: 500,
              letterSpacing: 3.6,
            }}
          >
            <span style={{ color: BRAND }}>{'//  '}</span>
            <span style={{ color: MUTED }}>{kickerUpper}</span>
          </div>

          {/* headline */}
          <div
            style={{
              display: 'flex',
              fontFamily: 'Newsreader',
              fontSize: title.length > 48 ? 62 : 76,
              fontWeight: 500,
              letterSpacing: -1.2,
              lineHeight: 1.08,
              color: INK,
              marginTop: 26,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        {/* footer rule */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `1px solid ${LINE}`,
            paddingTop: 22,
            fontSize: 19,
            fontWeight: 500,
          }}
        >
          <span style={{ color: INK, letterSpacing: 1 }}>docs.openhorizon.so</span>
          <span style={{ color: MUTED, letterSpacing: 2.5 }}>{label}</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Newsreader', data: serif, style: 'normal', weight: 500 },
        { name: 'JetBrains Mono', data: mono, style: 'normal', weight: 500 },
      ],
    },
  );
}
