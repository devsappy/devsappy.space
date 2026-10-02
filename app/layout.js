import { Archivo, Martian_Mono, Anek_Bangla } from 'next/font/google';
import Header from '@/components/Header';
import SiteFooter from '@/components/SiteFooter';
import Timeline from '@/components/Timeline';
import SmoothScroll from '@/components/SmoothScroll';
import { person, experience, education } from '@/lib/content';
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
  'Saptarshi Chattopadhyay (Sappy) — full-stack engineer and video editor in India. Interactive web apps in React, Next.js, Three.js and FastAPI; edits and motion graphics in Premiere Pro and After Effects.';

export const metadata = {
  metadataBase: new URL(person.site),
  title: {
    default: 'Sappy — Saptarshi Chattopadhyay, full-stack engineer & video editor',
    template: '%s — Sappy',
  },
  description,
  applicationName: 'Sappy',
  authors: [{ name: person.name, url: person.site }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Sappy',
    title: 'Sappy — Saptarshi Chattopadhyay',
    description,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sappy — Saptarshi Chattopadhyay',
    description,
  },
};

export const viewport = {
  themeColor: '#D6E3F2',
  colorScheme: 'light',
};

const now = experience.find((e) => !e.end);

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: person.name,
  alternateName: person.short,
  url: person.site,
  image: `${person.site}/hero/still-1600.jpg`,
  jobTitle: 'Full-stack engineer and video editor',
  email: `mailto:${person.email}`,
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  worksFor: now ? { '@type': 'Organization', name: now.org } : undefined,
  alumniOf: education.map((e) => ({ '@type': 'EducationalOrganization', name: e.school })),
  sameAs: [person.linkedin, person.github],
  knowsAbout: ['React', 'Next.js', 'Three.js', 'GSAP', 'WebGL', 'Python', 'FastAPI', 'Adobe Premiere Pro', 'Adobe After Effects', 'Video editing'],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
