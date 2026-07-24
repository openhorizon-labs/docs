import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Hanken_Grotesk, JetBrains_Mono, Newsreader } from 'next/font/google';
import type { Metadata } from 'next';
import { appName } from '@/lib/shared';

// Same pairing as openhorizon.so:
//  · Newsreader — classic literary serif for display headings
//  · Hanken Grotesk — clean grotesque for body/UI
//  · JetBrains Mono — every technical accent (eyebrows, kbd, code)
const sans = Hanken_Grotesk({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const serif = Newsreader({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
});

const mono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    template: `%s — ${appName} Docs`,
    default: `${appName} Docs — The Cognitive Layer for Physical AI`,
  },
  description:
    'Documentation for OpenHorizon Labs: perception, spatial memory, and real-time reasoning that lets robots and autonomous machines understand and act in the physical world.',
  metadataBase: new URL('https://docs.openhorizon.so'),
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen font-sans antialiased">
        <RootProvider theme={{ enabled: false }}>{children}</RootProvider>
      </body>
    </html>
  );
}
