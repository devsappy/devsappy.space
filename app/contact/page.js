import Breadcrumbs from '@/components/Breadcrumbs';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import CopyEmail from '@/components/CopyEmail';
import Constellation from '@/components/Constellation';
import Reveal from '@/components/Reveal';
import { person } from '@/lib/content';
import { abs, alternates, breadcrumbSchema, openGraph, PERSON_ID, twitter } from '@/lib/seo';

const title = 'Contact — Hire a Web Developer & Video Editor';
const description =
  'Start a project with Saptarshi Chattopadhyay (Sappy) in Kolkata, India — websites and web apps, video editing and motion, or both. Replies usually within 24 hours.';
const image = { url: '/og/contact.jpg', alt: 'Contact Sappy' };

export const metadata = {
  title,
  description,
  alternates: alternates('/contact'),
  openGraph: openGraph({ path: '/contact', title, description, image }),
  twitter: twitter({ title, description, image }),
};

export default function Contact() {
  return (
    <main id="main" className="page page--night" data-tone="dark">
      <JsonLd
        data={[
          { '@type': 'ContactPage', '@id': `${abs('/contact')}#page`, url: abs('/contact'), name: title, about: { '@id': PERSON_ID } },
          breadcrumbSchema([{ name: 'Contact', path: '/contact' }]),
        ]}
      />
      <section className="wrap contact" data-clip="Contact" data-clip-color="#1B2A4A" data-tone="dark">
        <div className="contact-intro">
          <header className="page-head contact-head">
            <Breadcrumbs items={[{ name: 'Contact', path: '/contact' }]} />
            <Reveal as="p" className="label">Contact</Reveal>
            <h1 className="page-title page-title--contact">
              <Reveal as="span" className="line">Got a</Reveal>
              <Reveal as="span" className="line" delay={0.06}>project?</Reveal>
            </h1>
            <Reveal as="p" className="page-lead" delay={0.12}>
              Tell me about your idea and let’s build something people remember. I usually reply
              within 24 hours.
            </Reveal>
          </header>

          <Reveal as="dl" className="contact-details" delay={0.16}>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${person.email}`}>{person.email}</a>
                <CopyEmail email={person.email} />
              </dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{person.city}, {person.country} — working with teams anywhere</dd>
            </div>
            <div>
              <dt>Elsewhere</dt>
              <dd className="contact-elsewhere">
                <a href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                <a href={person.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              </dd>
            </div>
          </Reveal>
        </div>

        <Reveal className="contact-form-wrap" delay={0.1}>
          <ContactForm email={person.email} />
        </Reveal>
      </section>

      <section className="contact-sky" data-clip="Sky" data-clip-color="#14203A" data-tone="dark" aria-label="Saptarshi, the seven sages">
        <Reveal className="contact-sky-chart" as="div">
          <Constellation />
        </Reveal>
        <p className="endcard-caption wrap">
          <span lang="bn" className="bn">{person.bangla}</span>
          <span>Saptarshi — the seven sages. It’s what India calls the Big Dipper, and it’s my name.</span>
        </p>
      </section>
    </main>
  );
}
