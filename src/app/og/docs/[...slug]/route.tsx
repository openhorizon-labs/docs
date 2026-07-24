import { getPageImageUrl, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { docsOgImage } from '@/lib/og-image';

export const revalidate = false;

const sectionKickers: Record<string, string> = {
  concepts: 'Core concepts',
};

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const pageSlugs = slug.slice(0, -1);
  const page = source.getPage(pageSlugs);
  if (!page) notFound();

  const kicker =
    pageSlugs.length === 0
      ? 'Documentation'
      : (sectionKickers[pageSlugs[0]] ?? 'Getting started');

  return docsOgImage({ title: page.data.title, kicker });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImageUrl(page).segments,
  }));
}
