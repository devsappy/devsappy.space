import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import CareerTracks from '@/components/CareerTracks';
import JsonLd from '@/components/JsonLd';
import PageCta from '@/components/PageCta';
import Reveal from '@/components/Reveal';
import { person, experience, education, services, clients, period } from '@/lib/content';
import { services as servicePages } from '@/lib/services';
import { abs, alternates, breadcrumbSchema, openGraph, PERSON_ID, SITE_UPDATED, twitter } from '@/lib/seo';

const title = 'About Saptarshi Chattopadhyay — Web Developer & Video Editor';
const description =
  'Saptarshi Chattopadhyay (Sappy): full-stack engineer and video editor in Kolkata — Multiplier AI, Vibe Engine AI, OD Solution, Brainly; B.Tech at IEM Kolkata.';
const image = { url: '/og/sappy.jpg', alt: 'About Saptarshi Chattopadhyay' };

export const metadata = {
  title,
  description,
  alternates: alternates('/sappy'),
  openGraph: openGraph({ path: '/sappy', title, description, image, type: 'profile', firstName: 'Saptarshi', lastName: 'Chattopadhyay', username: 'devsappy' }),
  twitter: twitter({ title, description, image }),
};

export default function About() {
  const roles = [
    ...experience.map((e) => ({ key: e.role + e.org, what: e.role, where: e.org, when: period(e.start, e.end), desc: e.desc })),
    ...education.map((e) => ({ key: e.degree, what: e.degree, where: e.school, when: period(e.start, e.end) })),
  ];

  return (
    <main id="main" className="page page--mist" data-tone="light">
      <JsonLd
        data={[
          {
            '@type': 'ProfilePage',
            '@id': `${abs('/sappy')}#page`,
            url: abs('/sappy'),
            name: title,
            dateModified: `${SITE_UPDATED}T09:00:00+05:30`,
            mainEntity: { '@id': PERSON_ID },
            primaryImageOfPage: abs('/hero/portrait-1200.webp'),
          },
          breadcrumbSchema([{ name: 'About', path: '/sappy' }]),
        ]}
      />
      <section className="wrap about" data-clip="About" data-clip-color="#D6E3F2" data-tone="light">
        <header className="page-head about-head">
          <Breadcrumbs items={[{ name: 'About', path: '/sappy' }]} />
          <Reveal as="p" className="label">About</Reveal>
          <h1 className="page-title page-title--name">
            <Reveal as="span" className="line">Saptarshi</Reveal>
            <Reveal as="span" className="line" delay={0.06}>Chattopadhyay</Reveal>
          </h1>
          <Reveal as="p" className="about-bn bn" lang="bn" delay={0.12}>{person.banglaFull}</Reveal>
        </header>

        <div className="about-grid">
          <Reveal as="figure" className="about-portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/portrait-1200.webp"
              srcSet="/hero/portrait-720.webp 720w, /hero/portrait-1200.webp 1200w"
              sizes="(max-width: 860px) 100vw, 40vw"
              alt={`${person.name} in a plaid shirt on a misty hillside, looking to the left`}
              loading="lazy"
            />
            <figcaption>Nikon D7200 · graded for this site</figcaption>
          </Reveal>

          <div className="about-bio">
            <Reveal as="p" className="about-lead">
              Hi, I’m Saptarshi Chattopadhyay — Sappy to most people — a full-stack engineer and video
              editor based in {person.city}, {person.country}.
            </Reveal>
            <Reveal as="p" delay={0.05}>
              I build interactive, performant web applications end to end: React, Next.js and Tailwind
              CSS on the frontend, Three.js and GSAP for immersive 3D and motion, and Python with
              FastAPI on the backend. I’m currently applying that background to research and
              development work, moving between research, implementation and delivery.
            </Reveal>
            <Reveal as="p" delay={0.1}>
              Alongside development I work with AI/LLM integrations (Groq API), edit video and motion
              graphics in Adobe Premiere Pro and After Effects, and check everything I ship across
              devices and browsers before release.
            </Reveal>
          </div>
        </div>
      </section>

      <section className="career" data-clip="Career" data-clip-color="#2B3E5E" data-tone="dark" aria-labelledby="career-title">
        <div className="wrap">
          <Reveal as="p" className="label">Career</Reveal>
          <Reveal as="h2" id="career-title" className="career-title" delay={0.05}>
            Four tracks, often running at once.
          </Reveal>
          <Reveal className="career-tracks" delay={0.1}>
            <CareerTracks />
          </Reveal>
          <ol className="career-list">
            {roles.map((r) => (
              <Reveal as="li" key={r.key}>
                <span className="career-when">{r.when}</span>
                <span className="career-what">{r.what}</span>
                <span className="career-where">{r.where}</span>
                {r.desc && <span className="career-desc">{r.desc}</span>}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap services" data-clip="Services" data-clip-color="#BFD2E8" data-tone="light" aria-labelledby="services-title">
        <Reveal as="p" className="label" id="services-title">What I do</Reveal>
        <ul className="services-list">
          {services.map((s, i) => (
            <Reveal as="li" key={s} delay={i * 0.03}>{s}</Reveal>
          ))}
        </ul>
        <Reveal as="p" className="services-clients">
          Worked with {clients.slice(0, -1).join(', ')} and {clients[clients.length - 1]}. Hiring?{' '}
          {servicePages.map((s, k) => (
            <span key={s.slug}>
              {k > 0 && (k === servicePages.length - 1 ? ' or ' : ', ')}
              <Link href={`/services/${s.slug}`}>{s.title.toLowerCase()}</Link>
            </span>
          ))}
          .
        </Reveal>
      </section>

      <PageCta />
    </main>
  );
}
