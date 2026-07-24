import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

const SITE_URL = 'https://docs.openhorizon.so';

// Generated at /sitemap.xml and referenced from /robots.ts. Lists the landing
// page and every docs page from the content source.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...source.getPages().map((page) => ({
      url: `${SITE_URL}${page.url}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: page.slugs.length === 0 ? 0.9 : 0.7,
    })),
  ];
}
