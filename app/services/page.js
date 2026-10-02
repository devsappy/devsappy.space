import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import PageCta from '@/components/PageCta';
import Reveal from '@/components/Reveal';
import { person } from '@/lib/content';
import { services } from '@/lib/services';
import { abs, alternates, breadcrumbSchema, openGraph, PERSON_ID, twitter } from '@/lib/seo';

const title = 'Services — Web Development, Video Editing & 3D Websites';
const description = `Website development in Next.js and React, video editing in Premiere Pro and After Effects, and 3D websites in Three.js — by Sappy, ${person.city}.`;
const image = { url: '/og/services.jpg', alt: 'Services' };

export const metadata = {
  title,
  description,
  alternates: alternates('/services'),
  openGraph: openGraph({ path: '/services', title, description, image }),
  twitter: twitter({ title, description, image }),
};

export default function Services() {
  return (
    <main id="main" className="page page--mist" data-tone="light">
      <JsonLd
        data={[
          {
            '@type': 'CollectionPage',
            '@id': `${abs('/services')}#page`,
            name: 'Services',
            url: abs('/services'),
            about: { '@id': PERSON_ID },
            hasPart: services.map((s) => ({ '@id': `${abs(`/services/${s.slug}`)}#service` })),
          },
          breadcrumbSchema([{ name: 'Services', path: '/services' }]),
        ]}
      />
      <section className="wrap" data-clip="Services" data-clip-color="#D6E3F2" data-tone="light">
        <header className="page-head">
          <Breadcrumbs items={[{ name: 'Services', path: '/services' }]} />
          <Reveal as="p" className="label">Services</Reveal>
          <h1 className="page-title">
            <Reveal as="span" className="line">Build</Reveal>
            <Reveal as="span" className="line" delay={0.05}>&amp; cut</Reveal>
          </h1>
          <Reveal as="p" className="page-lead" delay={0.1}>
            Websites, 3D experiences and video — from one person in {person.city}, working with teams
            anywhere. When a project needs both a site and the film that launches it, they can come from
            the same hands.
          </Reveal>
        </header>

        <ul className="svc-index">
          {services.map((s, k) => (
            <Reveal as="li" key={s.slug} delay={k * 0.05}>
              <Link href={`/services/${s.slug}`} className="svc-row">
                <span className="svc-row-title">{s.title}</span>
                <span className="svc-row-lead">{s.lead}</span>
                <span className="svc-row-arrow" aria-hidden="true">→</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
      <PageCta />
    </main>
  );
}
