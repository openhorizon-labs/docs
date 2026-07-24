# OpenHorizon Docs

Documentation site for [OpenHorizon Labs](https://openhorizon.so) — the cognitive layer
for physical AI. Built with [Next.js 16](https://nextjs.org) and
[Fumadocs](https://fumadocs.dev), styled to match the OpenHorizon brand.

## Development

```bash
bun install
bun run dev
```

Open http://localhost:3000 — the docs live under `/docs`.

## Writing docs

Content lives in `content/docs` as MDX. Each folder can have a `meta.json` controlling
sidebar order and section titles. Pages support Fumadocs components out of the box
(`Cards`, `Callout`, tabbed code blocks, and more) plus Lucide icons via the `icon`
frontmatter field.

```
content/docs/
├── index.mdx            # Introduction
├── quickstart.mdx
├── meta.json            # sidebar order
└── concepts/
    ├── perception.mdx
    ├── spatial-memory.mdx
    └── reasoning.mdx
```

## What's included

- **Brand theme** — the exact openhorizon.so system: kraft-paper canvas, emerald
  primary, square corners, Newsreader serif display + Hanken Grotesk + JetBrains Mono,
  light-only with no theme switcher (`src/app/global.css`)
- **Landing page** — `src/app/(home)/page.tsx`
- **Full-text search** — Orama, at `⌘K` (`src/app/api/search/route.ts`)
- **OG images** — generated per page at `/og/docs/...`
- **LLM-ready output** — `/llms.txt`, `/llms-full.txt`, and per-page markdown at
  `/llms.mdx/docs/...`

## Useful commands

| Command | What it does |
| --- | --- |
| `bun run dev` | Start the dev server |
| `bun run build` | Production build |
| `bun run start` | Serve the production build |
| `bun run types:check` | Regenerate MDX types and type-check |
| `bun run lint` | Lint |
