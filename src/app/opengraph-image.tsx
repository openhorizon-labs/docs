import { docsOgImage, OG_CONTENT_TYPE, OG_SIZE } from '@/lib/og-image';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'OpenHorizon Docs — The Cognitive Layer for Physical AI';

export default function Image() {
  return docsOgImage({
    title: 'The cognitive layer for physical AI',
    kicker: 'Documentation',
  });
}
