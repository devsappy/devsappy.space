import { Archivo, Martian_Mono, Anek_Bangla } from 'next/font/google';
import Header from '@/components/Header';
import SiteFooter from '@/components/SiteFooter';
import Timeline from '@/components/Timeline';
import SmoothScroll from '@/components/SmoothScroll';
import JsonLd from '@/components/JsonLd';
import { person } from '@/lib/content';
import { openGraph, personSchema, twitter, websiteSchema } from '@/lib/seo';
import './globals.css';

// One family across widths: expanded for titles, normal for reading, condensed for labels.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
});

const mono = Martian_Mono({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-mono',
  display: 'swap',
});

// One static weight: the Bengali is a name, not running text (49 KB vs 437 KB variable).
const bangla = Anek_Bangla({
  subsets: ['bengali'],
  weight: '500',
  variable: '--font-bangla',
  display: 'swap',
  preload: false,
});

const description =
  'Saptarshi Chattopadhyay (Sappy) — freelance web developer and video editor in Kolkata, India. Websites in Next.js, React and Three.js; video in Premiere Pro.';

// Search engines may show large image previews, full snippets and video previews.
const verification = {
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
  ...(process.env.BING_SITE_VERIFICATION ? { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } } : {}),
};

export const metadata = {
  metadataBase: new URL(person.site),
  title: {
    default: 'Sappy — Freelance Web Developer & Video Editor in Kolkata, India',
    template: '%s — Sappy',
  },
  description,
  applicationName: 'Sappy',
  authors: [{ name: person.name, url: person.site }],
  creator: person.name,
  publisher: person.name,
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  ...(Object.keys(verification).length ? { verification } : {}),
  openGraph: openGraph({ path: '/', title: 'Sappy — Saptarshi Chattopadhyay', description }),
  twitter: twitter({ title: 'Sappy — Saptarshi Chattopadhyay', description }),
};

export const viewport = {
  themeColor: '#D6E3F2',
  colorScheme: 'light',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${mono.variable} ${bangla.variable}`}>
      <body>
        <SmoothScroll />
        <Header />
        {children}
        <SiteFooter />
        <Timeline />
        <JsonLd data={[websiteSchema(), personSchema()]} />
      </body>
    </html>
  );
}
