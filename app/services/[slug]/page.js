import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Faq from '@/components/Faq';
import Inline from '@/components/Inline';
import JsonLd from '@/components/JsonLd';
import PageCta from '@/components/PageCta';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import { person, projects } from '@/lib/content';
import { posts } from '@/lib/journal';
import { services, getService } from '@/lib/services';
import { alternates, breadcrumbSchema, openGraph, serviceSchemas, twitter } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const s = getService(params.slug);
  if (!s) return {};
  const image = { url: `/og/services-${s.slug}.jpg`, alt: s.title };
  return {
    title: s.metaTitle,
    description: s.description,
    alternates: alternates(`/services/${s.slug}`),
    openGraph: openGraph({ path: `/services/${s.slug}`, title: s.metaTitle, description: s.description, image }),
    twitter: twitter({ title: s.metaTitle, description: s.description, image }),
  };
}

// Journal posts that belong with each service.
const READING = {
  'website-development': ['the-future-of-web-development-with-nextjs', 'design-systems-why-you-need-one'],
  'video-editing': ['mastering-video-editing-for-the-web', 'keying-a-title-behind-a-portrait'],
  '3d-websites': ['keying-a-title-behind-a-portrait', 'building-a-scrubbable-page-timeline'],
};

export default function ServicePage({ params }) {
  const s = getService(params.slug);
  if (!s) notFound();
  const related = s.related.map((slug) => projects.find((p) => p.slug === slug)).filter(Boolean);
  const reading = (READING[s.slug] || []).map((slug) => posts.find((p) => p.slug === slug)).filter(Boolean);
  const others = services.filter((o) => o.slug !== s.slug);
  const crumbs = [
    { name: 'Services', path: '/services' },
    { name: s.title, path: `/services/${s.slug}` },
  ];

  return (
    <main id="main" className="page page--mist svc" data-tone="light">
      <JsonLd data={[...serviceSchemas(s), breadcrumbSchema(crumbs)]} />

      <section className="wrap svc-head" data-clip="Service" data-clip-color="#D6E3F2" data-tone="light">
        <Breadcrumbs items={crumbs} />
        <Reveal as="p" className="label">Services</Reveal>
        <h1 className="page-title svc-title">
          <Reveal as="span" className="line">{s.title}</Reveal>
        </h1>
        <div className="svc-intro">
          <Reveal as="p" className="svc-lead" delay={0.06}>{s.lead}</Reveal>
          <Reveal className="svc-side" delay={0.1}>
            <p className="svc-answer">{s.answer}</p>
            <div className="svc-actions">
              <Link href="/contact" className="button button--solid">
                <span>Start a project</span>
                <span aria-hidden="true">→</span>
              </Link>
              <a className="svc-mail" href={`mailto:${person.email}`}>{person.email}</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="wrap svc-scope" data-clip="Scope" data-clip-color="#BFD2E8" data-tone="light" aria-labelledby="scope-h">
        <Reveal as="h2" id="scope-h" className="svc-h2">What you get</Reveal>
        <ul className="svc-deliverables">
          {s.deliverables.map(([title, text], k) => (
            <Reveal as="li" key={title} delay={k * 0.04}>
              <h3>{title}</h3>
              <p><Inline text={text} /></p>
            </Reveal>
          ))}
        </ul>
      </section>

      {related.length > 0 && (
        <section className="svc-work" data-clip="Work" data-clip-color="#2B3E5E" data-tone="dark" aria-labelledby="work-h">
          <div className="wrap">
            <Reveal as="h2" id="work-h" className="svc-h2">Selected work</Reveal>
            <div className="pcards">
              {related.map((p) => (
                <Reveal key={p.slug}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {s.credential && (
        <section className="svc-work svc-credential" data-clip="Experience" data-clip-color="#2B3E5E" data-tone="dark" aria-labelledby="cred-h">
          <div className="wrap svc-credential-inner">
            <Reveal as="h2" id="cred-h" className="svc-h2">Experience</Reveal>
            <Reveal className="cred">
              <p className="cred-when">{s.credential.period}</p>
              <p className="cred-role">{s.credential.role}</p>
              <p className="cred-org">{s.credential.org}</p>
              <p className="cred-text">{s.credential.text}</p>
            </Reveal>
            {person.reel ? (
              <Reveal as="p" className="cred-reel">
                <a href={person.reel} target="_blank" rel="noopener noreferrer">Watch the showreel ↗</a>
              </Reveal>
            ) : (
              <Reveal as="p" className="cred-reel">
                Every project recording on this site was captured, cut and encoded for the web —{' '}
                <Link href="/#work">watch them on the home page</Link>.
              </Reveal>
            )}
          </div>
        </section>
      )}

      <section className="wrap svc-process" data-clip="Process" data-clip-color="#D6E3F2" data-tone="light" aria-labelledby="process-h">
        <Reveal as="h2" id="process-h" className="svc-h2">How it works</Reveal>
        <ol className="steps">
          {s.process.map(([title, text], k) => (
            <Reveal as="li" key={title} delay={k * 0.05}>
              <span className="step-n" aria-hidden="true">{String(k + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal as="p" className="svc-tools">
          <span className="label">Tools</span> {s.tools.join(' · ')}
        </Reveal>
      </section>

      <section className="wrap svc-faq" data-clip="FAQ" data-clip-color="#BFD2E8" data-tone="light" aria-labelledby="faq-h">
        <Reveal as="h2" id="faq-h" className="svc-h2">Questions</Reveal>
        <Faq items={s.faq} />
      </section>

      <section className="wrap svc-more" data-tone="light" aria-label="More">
        {reading.length > 0 && (
          <div>
            <p className="label">Further reading</p>
            <ul>
              {reading.map((p) => (
                <li key={p.slug}><Link href={`/blog/${p.slug}`}>{p.title}</Link></li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <p className="label">Other services</p>
          <ul>
            {others.map((o) => (
              <li key={o.slug}><Link href={`/services/${o.slug}`}>{o.title}</Link></li>
            ))}
          </ul>
        </div>
      </section>

      <PageCta />
    </main>
  );
}
