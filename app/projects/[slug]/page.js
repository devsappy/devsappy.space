import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import CaseMonitor from '@/components/CaseMonitor';
import JsonLd from '@/components/JsonLd';
import PageCta from '@/components/PageCta';
import Reveal from '@/components/Reveal';
import { projects, domainOf } from '@/lib/content';
import { projectDetails } from '@/lib/projects-detail';
import { services } from '@/lib/services';
import { alternates, breadcrumbSchema, openGraph, projectSchemas, twitter } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.path }));
}

const find = (path) => projects.find((p) => p.path === path);

export function generateMetadata({ params }) {
  const p = find(params.slug);
  if (!p) return {};
  const title = `${p.title} — ${p.kind} built with ${p.stack.filter((s) => s !== 'Vite').join(' & ')}`;
  // Keep meta descriptions inside the ~160 characters results pages show.
  const description = [`${p.summary} Case study by Saptarshi Chattopadhyay (Sappy).`, `${p.summary} Case study by Sappy.`, p.summary].find((d) => d.length <= 160) || p.summary;
  const image = { url: `/og/projects-${p.path}.jpg`, alt: `${p.title} — case study` };
  return {
    title,
    description,
    alternates: alternates(`/projects/${p.path}`),
    openGraph: openGraph({ path: `/projects/${p.path}`, title: `${p.title} — case study`, description, image }),
    twitter: twitter({ title: `${p.title} — case study`, description, image }),
  };
}

export default function CaseStudy({ params }) {
  const p = find(params.slug);
  if (!p) notFound();
  const d = projectDetails[p.slug] || {};
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const relatedServices = services.filter((s) => s.related.includes(p.slug));

  return (
    <main id="main" className="page page--dusk case" data-tone="dark">
      <JsonLd
        data={[
          ...projectSchemas(p, d),
          breadcrumbSchema([
            { name: 'Work', path: '/projects' },
            { name: p.title, path: `/projects/${p.path}` },
          ]),
        ]}
      />

      <section className="wrap case-head" data-clip="Shot" data-clip-color="#2B3E5E" data-tone="dark">
        <Breadcrumbs items={[{ name: 'Work', path: '/projects' }, { name: p.title, path: `/projects/${p.path}` }]} />
        <Reveal as="p" className="label">
          {p.kind}
          {p.client && p.client !== p.title ? ` · for ${p.client}` : ''}
        </Reveal>
        <h1 className="page-title case-title">
          <Reveal as="span" className="line">{p.title}</Reveal>
        </h1>
        <div className="case-intro">
          <Reveal as="p" className="page-lead" delay={0.08}>{p.summary}</Reveal>
          <Reveal className="case-actions" delay={0.12}>
            <a className="button button--light" href={p.url} target="_blank" rel="noopener noreferrer">
              <span>Open {domainOf(p.url)}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <CaseMonitor project={p} />
        </Reveal>
      </section>

      {d.overview && (
        <section className="wrap case-overview" data-clip="Overview" data-clip-color="#22324C" data-tone="dark" aria-labelledby="overview-h">
          <Reveal as="h2" id="overview-h" className="label">Overview</Reveal>
          <div className="case-overview-grid">
            <div className="case-copy">
              {d.overview.map((t, k) => (
                <Reveal as="p" key={k} delay={k * 0.05}>{t}</Reveal>
              ))}
            </div>
            {d.highlights && (
              <ul className="case-highlights">
                {d.highlights.map((h, k) => (
                  <Reveal as="li" key={h.title} delay={k * 0.06}>
                    <h3>{h.title}</h3>
                    <p>{h.text}</p>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {d.stills && d.stills.length > 0 && (
        <section className="case-stills" data-clip="Stills" data-clip-color="#1E2B42" data-tone="dark" aria-labelledby="stills-h">
          <div className="wrap">
            <Reveal as="h2" id="stills-h" className="label">Stills from the live site</Reveal>
          </div>
          <div className="case-stills-grid wrap">
            {d.stills.map((s) => (
              <Reveal as="figure" key={s.src} className="case-still">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.alt} width={1200} height={750} loading="lazy" decoding="async" />
                {s.caption && <figcaption>{s.caption}</figcaption>}
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="wrap case-specs" data-clip="Specs" data-clip-color="#262A33" data-tone="dark" aria-labelledby="specs-h">
        <Reveal as="h2" id="specs-h" className="label">Technical specs</Reveal>
        <dl className="specs">
          <div>
            <dt>Live site</dt>
            <dd><a href={p.url} target="_blank" rel="noopener noreferrer">{domainOf(p.url)} ↗</a></dd>
          </div>
          {d.pageTitle && (
            <div>
              <dt>Page title</dt>
              <dd>{d.pageTitle}</dd>
            </div>
          )}
          <div>
            <dt>Type</dt>
            <dd>{p.kind}</dd>
          </div>
          <div>
            <dt>Built with</dt>
            <dd>{p.stack.join(', ')}</dd>
          </div>
          {d.specs && d.specs.typefaces && d.specs.typefaces.length > 0 && (
            <div>
              <dt>Typefaces</dt>
              <dd>{d.specs.typefaces.join(', ')}</dd>
            </div>
          )}
          {d.specs && d.specs.palette && d.specs.palette.length > 0 && (
            <div>
              <dt>Palette</dt>
              <dd className="swatches">
                {d.specs.palette.map((c) => (
                  <span key={c} className="swatch">
                    <i style={{ background: c }} aria-hidden="true" />
                    {c.toUpperCase()}
                  </span>
                ))}
              </dd>
            </div>
          )}
          {d.specs && d.specs.sections && d.specs.sections.length > 0 && (
            <div>
              <dt>On the page</dt>
              <dd>{d.specs.sections.join(' · ')}</dd>
            </div>
          )}
          <div>
            <dt>Recording</dt>
            <dd>Captured from the live site at 1440×900 · H.264, 1200 px, 25 fps · 14 s</dd>
          </div>
        </dl>
        {relatedServices.length > 0 && (
          <p className="case-services">
            Related services:{' '}
            {relatedServices.map((s, k) => (
              <span key={s.slug}>
                {k > 0 && ', '}
                <Link href={`/services/${s.slug}`}>{s.title.toLowerCase()}</Link>
              </span>
            ))}
            .
          </p>
        )}
      </section>

      <section className="case-next" data-clip="Next" data-clip-color="#2B3E5E" data-tone="dark" aria-labelledby="next-h">
        <Link href={`/projects/${next.path}`} className="case-next-link wrap">
          <span className="label" id="next-h">Next project</span>
          <span className="case-next-title">{next.title}</span>
          <span className="case-next-kind">{next.kind}</span>
          <span className="case-next-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/work/${next.slug}.webp`} alt="" width={1200} height={750} loading="lazy" decoding="async" />
          </span>
        </Link>
      </section>

      <PageCta />
    </main>
  );
}
