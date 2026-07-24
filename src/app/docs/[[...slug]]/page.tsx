import { getPageImageUrl, getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { Eyebrow } from '@/components/ui-bits';

const sectionLabels: Record<string, string> = {
  concepts: 'Core concepts',
};

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const isOverview = !params.slug?.length;
  const section = sectionLabels[params.slug?.[0] ?? ''] ?? 'Getting started';

  const body = (
    <MDX
      components={getMDXComponents({
        // this allows you to link to other pages with relative file paths
        a: createRelativeLink(source, page),
      })}
    />
  );

  if (isOverview) {
    // the Overview page brings its own hero — skip the standard title block
    return (
      <DocsPage full toc={[]}>
        <DocsBody>{body}</DocsBody>
      </DocsPage>
    );
  }

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <Eyebrow className="mb-0">{section}</Eyebrow>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover markdownUrl={markdownUrl} />
      </div>
      <DocsBody>{body}</DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}
